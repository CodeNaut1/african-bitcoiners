import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import { addContactForForm } from '@/lib/activecampaign'
import { appendRow, SHEET_IDS } from '@/lib/google-sheets'
import { sendEmail } from '@/lib/email'
import { getNotificationGroup, type NotificationGroupType } from '@/lib/email-config'
import { notificationEmail } from '@/lib/email-templates/wrapper'

async function notifyGroup(
  group: NotificationGroupType,
  subject: string,
  data: Record<string, unknown>,
) {
  const recipients = getNotificationGroup(group)
  if (!recipients.length) return
  await sendEmail(recipients, subject, notificationEmail(subject, data))
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { formType, data } = body as { formType: string; data: Record<string, unknown> }

    if (data.honey) {
      return NextResponse.json({ ok: true }) // silently discard spam
    }

    if (!formType || typeof formType !== 'string') {
      return NextResponse.json({ message: 'Missing formType' }, { status: 400 })
    }

    const payload = await getPayload({ config })
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? ''

    // Always persist a generic record
    await payload.create({
      collection: 'form-submissions',
      data: {
        formName: formType,
        formSlug: formType,
        data,
        submittedAt: new Date().toISOString(),
        ipAddress: ip,
        status: 'active',
      },
    })

    const now = new Date().toISOString()
    const str = (v: unknown) => String(v ?? '')

    switch (formType) {
      case 'contact-general': {
        await notifyGroup('general', `New contact message from ${str(data.name)}`, data)
        break
      }

      case 'newsletter-signup': {
        await addContactForForm(str(data.email), str(data.name), 'newsletter-signup', payload)
        break
      }

      case 'savings-challenge': {
        await addContactForForm(str(data.email), str(data.name), 'savings-challenge', payload)
        break
      }

      case 'bitcoin-for-her': {
        await addContactForForm(str(data.email), str(data.name), 'bitcoin-for-her', payload)
        if (data.newsletterConsent) {
          await addContactForForm(str(data.email), str(data.name), 'newsletter-signup', payload)
        }
        await notifyGroup('general', `Bitcoin for Her signup — ${str(data.name)}`, data)
        break
      }

      case 'job-submission': {
        await (payload.create as any)({
          collection: 'jobs',
          data: {
            title: str(data.jobTitle) || 'Untitled',
            company: str(data.companyName),
            companyDescription: str(data.companyDescription),
            websiteURL: str(data.website),
            location: str(data.location),
            type: (data.jobType as any) || 'full-time',
            contactEmail: str(data.contactEmail),
            contactName: str(data.contactName),
            isActive: false,
          },
        })
        await notifyGroup('general', `New job submission: ${str(data.jobTitle)}`, data)
        break
      }

      case 'map-location': {
        const extras = [
          data.socialMedia ? `Social: ${str(data.socialMedia)}` : '',
          data.message ? `Message: ${str(data.message)}` : '',
        ]
          .filter(Boolean)
          .join('\n')
        await (payload.create as any)({
          collection: 'map-locations',
          data: {
            merchantName: str(data.merchantName),
            description: [str(data.description), extras].filter(Boolean).join('\n\n'),
            websiteURL: str(data.website),
            address: str(data.address),
            email: str(data.email),
            phone: str(data.phone),
            acceptsLightning: data.acceptsLightning === 'Yes' || Boolean(data.acceptsLightning),
          },
          overrideAccess: true,
        })
        await notifyGroup('community', `New map location: ${str(data.merchantName)}`, data)
        if (data.newsletter && data.email) {
          await addContactForForm(str(data.email), str(data.merchantName), 'map-location', payload)
        }
        break
      }

      case 'map-experience': {
        await appendRow(SHEET_IDS.nps, 'Sheet1', [
          now,
          str(data.context),
          str(data.npsScore),
          str(data.reason),
          str(data.contextRating),
          [str(data.applicationReason), str(data.improvement)].filter(Boolean).join(' | '),
          '',
        ])
        await notifyGroup('general', `New map experience feedback — NPS ${str(data.npsScore)}`, data)
        break
      }

      case 'donation-feedback': {
        await appendRow(SHEET_IDS.nps, 'Sheet1', [
          now,
          str(data.context),
          str(data.npsScore),
          str(data.reason),
          str(data.contextRating),
          [str(data.donationReason), str(data.improvement)].filter(Boolean).join(' | '),
          '',
        ])
        await notifyGroup('general', `New donation feedback — NPS ${str(data.npsScore)}`, data)
        break
      }

      case 'final-quiz-passed': {
        await appendRow(SHEET_IDS.nps, 'Sheet1', [
          now,
          'final-quiz-passed',
          str(data.recommendScore),
          str(data.recommendReason),
          str(data.understandingScore),
          [str(data.understandingReason), str(data.improvementAdvice)].filter(Boolean).join(' | '),
          str(data.email),
        ])
        if (data.email) {
          await addContactForForm(str(data.email), '', 'final-quiz-passed', payload)
        }
        await notifyGroup('general', `Final quiz passed feedback — NPS ${str(data.recommendScore)}`, data)
        break
      }

      case 'final-quiz-failed': {
        await appendRow(SHEET_IDS.nps, 'Sheet1', [
          now,
          'final-quiz-failed',
          str(data.recommendScore),
          str(data.recommendReason),
          str(data.understandingScore),
          [str(data.understandingReason), str(data.improvementAdvice)].filter(Boolean).join(' | '),
          str(data.email),
        ])
        if (data.email) {
          await addContactForForm(str(data.email), '', 'final-quiz-failed', payload)
        }
        await notifyGroup('general', `Final quiz failed feedback — NPS ${str(data.recommendScore)}`, data)
        break
      }

      case 'meetup-submission': {
        await (payload.create as any)({
          collection: 'meetup-submissions',
          data: {
            meetupName: str(data.meetupName),
            description: str(data.description),
            location: str(data.location),
            startDate: data.startDate ? str(data.startDate) : undefined,
            time: str(data.time),
            contactName: str(data.contactName),
            contactEmail: str(data.contactEmail),
          },
          overrideAccess: true,
        })
        await notifyGroup('community', `New meetup submission: ${str(data.meetupName)}`, data)
        break
      }

      case 'meetup-host-proposal':
      case 'meetup-database': {
        await notifyGroup('community', `New meetup form (${formType}): ${str(data.name ?? data.meetupName)}`, data)
        break
      }

      case 'volunteer': {
        await appendRow(SHEET_IDS.volunteers, 'Sheet1', [
          now, str(data.name), str(data.email), str(data.country), str(data.skills), str(data.motivation),
        ])
        await notifyGroup('community', `New volunteer application: ${str(data.name)}`, data)
        break
      }

      case 'feedback-rating': {
        await (payload.create as any)({
          collection: 'feedback-bounties',
          data: {
            name: str(data.name),
            email: str(data.email),
            feedbackTitle: str(data.feedbackTitle),
            category: str(data.category),
            description: str(data.description),
            feedbackBefore: str(data.feedbackBefore) || 'no',
            status: 'Pending',
            rewardStatus: 'Pending',
            lastActivity: now,
          },
          overrideAccess: true,
        })
        await appendRow(SHEET_IDS['feedback-bounties'], 'Sheet1', [
          now, str(data.name), str(data.email), str(data.category), str(data.feedbackTitle), str(data.description),
        ])
        await notifyGroup('general', `New feedback bounty: ${str(data.feedbackTitle)}`, data)
        break
      }

      case 'course-feedback': {
        await appendRow(SHEET_IDS['bfb-feedback'], 'Sheet1', [
          now, str(data.email), str(data.day), str(data.clarity), str(data.usefulness), str(data.difficulty), str(data.improvement),
        ])
        break
      }

      case 'quiz': {
        // Daily quiz score — no sheet sync needed, record already saved to form-submissions
        break
      }

      case 'nps': {
        await appendRow(SHEET_IDS.nps, 'Sheet1', [
          now, str(data.context), str(data.npsScore), str(data.reason), str(data.contextRating), str(data.improvement), str(data.email),
        ])
        await notifyGroup('general', `New NPS response — score ${str(data.npsScore)}`, data)
        break
      }

      case 'graduate-programme': {
        await notifyGroup('community', `New graduate program application: ${str(data.name)}`, data)
        if (data.email) {
          await addContactForForm(str(data.email), str(data.name ?? ''), 'graduate-programme', payload)
        }
        break
      }

      case 'partnership-inquiry': {
        await notifyGroup('general', `New partnership inquiry: ${str(data.organizationName)}`, data)
        if (data.email) {
          await addContactForForm(str(data.email), str(data.contactName ?? data.name ?? ''), 'education-partnership', payload)
        }
        break
      }

      case 'mining-directory': {
        await notifyGroup('community', `New mining org submission: ${str(data.organizationName)}`, data)
        break
      }

      case 'organization-activity-update': {
        await notifyGroup(
          'community',
          `Organization activity update — ${str(data.organizationName)} (${str(data.stillActive)})`,
          data,
        )
        break
      }

      case 'job-application-signup': {
        await notifyGroup(
          'community',
          `Job application — ${str(data.role)} — ${str(data.name)} (${str(data.country)})`,
          data,
        )
        await addContactForForm(str(data.email), str(data.name), 'job-application-signup', payload)
        break
      }

      case 'places-earn': {
        await notifyGroup('community', `New place to earn sats: ${str(data.companyName)}`, data)
        if (data.newsletter && data.contactEmail) {
          await addContactForForm(str(data.contactEmail), str(data.companyName), 'places-earn', payload)
        }
        break
      }

      case 'places-spend': {
        await notifyGroup('community', `New place to spend: ${str(data.merchantName)}`, data)
        if (data.newsletter && data.contactEmail) {
          await addContactForForm(str(data.contactEmail), str(data.merchantName), 'places-spend', payload)
        }
        break
      }

      case 'page-comment': {
        await notifyGroup('general', `New page comment on ${str(data.pageSlug)}`, data)
        break
      }

      case 'donation':
        // Donation handled by /api/donation/create — this path only logs the intent
        break

      default:
        // Unknown form types still get saved to form-submissions above
        break
    }

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error('[forms/submit]', err)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
