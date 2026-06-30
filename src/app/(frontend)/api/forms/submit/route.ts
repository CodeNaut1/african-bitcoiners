import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import type { Payload } from 'payload'
import { appendRow, SHEET_IDS } from '@/lib/google-sheets'
import { syncActiveCampaignForSubmission } from '@/lib/activecampaign'
import { sendEmail } from '@/lib/email'
import { getNotificationGroup, type NotificationGroupType } from '@/lib/email-config'
import { notificationEmail, wrapEmail } from '@/lib/email-templates/wrapper'
import {
  buildNpsFeedbackNotificationBody,
  getFormConfigBySlug,
} from '@/lib/form-notifications'
import {
  buildFormSubmitResponse,
  handleFormSettingsPostSubmit,
  resolveFormSlug,
} from '@/lib/form-settings'

async function notifyGroup(
  group: NotificationGroupType,
  subject: string,
  data: Record<string, unknown>,
) {
  const recipients = getNotificationGroup(group)
  if (!recipients.length) return
  await sendEmail(recipients, subject, notificationEmail(subject, data))
}

const GRADUATE_PROGRAM_DUPLICATE_MESSAGE =
  'This email has already been used to apply for the Graduate Program. Each email can only be used once per application cycle.'

async function hasGraduateProgramSubmission(payload: Payload, email: string): Promise<boolean> {
  const normalized = email.trim().toLowerCase()
  if (!normalized) return false

  const { docs } = await payload.find({
    collection: 'form-submissions',
    where: { formSlug: { equals: 'graduate-program' } },
    limit: 5000,
    overrideAccess: true,
  })

  return docs.some(
    (doc) =>
      String((doc.data as Record<string, unknown>)?.email ?? '')
        .trim()
        .toLowerCase() === normalized,
  )
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { formType, data } = body as { formType: string; data: Record<string, unknown> }

    if (data.honey) {
      return NextResponse.json({ ok: true })
    }

    if (!formType || typeof formType !== 'string') {
      return NextResponse.json({ message: 'Missing formType' }, { status: 400 })
    }

    const payload = await getPayload({ config })
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? ''
    const formSlug = resolveFormSlug(formType)
    const str = (v: unknown) => String(v ?? '')

    if (formType === 'graduate-programme') {
      const email = str(data.email).trim()
      if (await hasGraduateProgramSubmission(payload, email)) {
        return NextResponse.json({ message: GRADUATE_PROGRAM_DUPLICATE_MESSAGE }, { status: 409 })
      }
    }

    await payload.create({
      collection: 'form-submissions',
      data: {
        formName: formType,
        formSlug,
        data,
        submittedAt: new Date().toISOString(),
        ipAddress: ip,
        status: 'active',
      },
    })

    const now = new Date().toISOString()

    switch (formType) {
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
        break
      }

      case 'bitcoin-for-her': {
        await notifyGroup('general', `Bitcoin for Her signup — ${str(data.name)}`, data)
        break
      }

      case 'volunteer': {
        await appendRow(SHEET_IDS.volunteers, 'Sheet1', [
          now, str(data.name), str(data.email), str(data.country), str(data.skills), str(data.motivation),
        ])
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
        break
      }

      case 'course-feedback': {
        await appendRow(SHEET_IDS['bfb-feedback'], 'Sheet1', [
          now, str(data.email), str(data.day), str(data.clarity), str(data.usefulness), str(data.difficulty), str(data.improvement),
        ])
        break
      }

      case 'nps':
        await appendRow(SHEET_IDS.nps, 'Sheet1', [
          now,
          str(data.context ?? data.sourceForm),
          str(data.npsScore ?? data.score),
          str(data.reason ?? data.feedback),
          str(data.contextRating),
          str(data.improvement ?? data.feedback),
          str(data.email),
        ])
        await notifyGroup('general', `New NPS response — score ${str(data.npsScore)}`, data)
        break

      case 'nps-feedback': {
        const sourceFormSlug = str(data.sourceFormSlug)
        const sourceFormTitle = str(data.sourceFormTitle) || sourceFormSlug
        const sourceConfig = sourceFormSlug ? await getFormConfigBySlug(sourceFormSlug) : undefined

        await appendRow(SHEET_IDS.nps, 'Sheet1', [
          now,
          sourceFormSlug,
          sourceFormTitle,
          str(data.recommendScore),
          str(data.recommendReason),
          str(data.processScore),
          str(data.processReason),
          str(data.improvementAdvice),
        ])

        if (sourceConfig?.teamNotificationEnabled !== false) {
          const group = (sourceConfig?.teamEmailGroup ?? 'general') as NotificationGroupType
          const recipients = getNotificationGroup(group)

          if (recipients.length) {
            const subject = `NPS Feedback: ${sourceFormTitle}`
            const body = buildNpsFeedbackNotificationBody(sourceFormTitle, data)
            await sendEmail(recipients, subject, wrapEmail(body, subject))
          }
        }

        return NextResponse.json({
          ok: true,
          formSlug: 'nps-feedback',
          redirectToConfirmation: false,
          confirmationHeading: 'Thank you for your feedback! 🙏',
        })
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
        break
      }

      case 'page-comment': {
        await notifyGroup('general', `New page comment on ${str(data.pageSlug)}`, data)
        break
      }

      case 'donation':
        break

      default:
        break
    }

    await syncActiveCampaignForSubmission(formType, data, payload)

    const formConfig = await handleFormSettingsPostSubmit(formSlug, data)

    return NextResponse.json(buildFormSubmitResponse(formSlug, formConfig))
  } catch (err: any) {
    console.error('[forms/submit]', err)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
