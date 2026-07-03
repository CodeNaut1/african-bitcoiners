import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { generateUniqueCode, generateUniqueTelegramCode } from '@/lib/generateUniqueCode'
import { syncActiveCampaignForCourseSignup } from '@/lib/activecampaign'
import {
  isTelegramCourseSignupFormSlug,
  resolveCourseSignupFormSlug,
} from '@/lib/course-signup-shared'
import {
  buildFormSubmitResponse,
  handleFormSettingsPostSubmit,
} from '@/lib/form-settings'
import { buildCourseErrorUrl } from '@/lib/course-quiz-validation-shared'
import { emailCourseSignupExists } from '@/lib/course-quiz-validation'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, country, howHeard, courseLang, deliveryMethod, honey, formSlug } = body

    if (honey) return NextResponse.json({ ok: true })

    if (!name || !courseLang || !deliveryMethod) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    const payload = await getPayload({ config })
    const resolvedFormSlug = resolveCourseSignupFormSlug(deliveryMethod, courseLang, formSlug)
    console.log('[course-signup] formSlug being used:', resolvedFormSlug)
    const isTelegramVariant = isTelegramCourseSignupFormSlug(resolvedFormSlug)

    if (isTelegramVariant) {
      const uniqueCode = await generateUniqueTelegramCode(payload)

      await (payload.create as (args: {
        collection: 'course-signups'
        data: Record<string, unknown>
        overrideAccess: boolean
      }) => Promise<unknown>)({
        collection: 'course-signups',
        data: {
          name,
          email: email || null,
          country,
          uniqueCode,
          courseLang,
          deliveryMethod: 'telegram',
          signupDate: new Date().toISOString(),
          ipAddress: req.headers.get('x-forwarded-for') ?? '',
        },
        overrideAccess: true,
      })

      const submissionData = {
        name,
        email: email || '',
        country,
        howHeard,
        courseLang,
        deliveryMethod: 'telegram',
        uniqueCode,
      }

      const formConfig = await handleFormSettingsPostSubmit(resolvedFormSlug, submissionData)
      const language = resolvedFormSlug === 'course-signup-telegram-french' ? 'fr' : 'en'

      return NextResponse.json({
        ...buildFormSubmitResponse(resolvedFormSlug, formConfig),
        code: uniqueCode,
        uniqueCode,
        name,
        language,
      })
    }

    const trimmedEmail = typeof email === 'string' ? email.trim() : ''
    if (
      (resolvedFormSlug === 'course-signup-english' || resolvedFormSlug === 'course-signup-french') &&
      trimmedEmail
    ) {
      const duplicate = await emailCourseSignupExists(payload, trimmedEmail)
      if (duplicate) {
        const redirectUrl = buildCourseErrorUrl('duplicate-signup')
        return NextResponse.json(
          { error: true, reason: 'duplicate-signup', redirectUrl },
          { status: 409 },
        )
      }
    }

    const uniqueCode = generateUniqueCode(7)

    await (payload.create as any)({
      collection: 'course-signups',
      data: {
        name,
        email: trimmedEmail || null,
        country,
        uniqueCode,
        courseLang,
        deliveryMethod,
        signupDate: new Date().toISOString(),
        ipAddress: req.headers.get('x-forwarded-for') ?? '',
      },
      overrideAccess: true,
    })

    const submissionData = {
      name,
      email: trimmedEmail || '',
      country,
      howHeard,
      courseLang,
      deliveryMethod,
      uniqueCode,
    }

    await syncActiveCampaignForCourseSignup(trimmedEmail, name, courseLang, payload)

    const formConfig = await handleFormSettingsPostSubmit(resolvedFormSlug, submissionData)

    const telegramDeepLink =
      deliveryMethod === 'telegram'
        ? `https://t.me/bitcoin_for_beginners_course_bot/?start=${btoa(`${name}:${uniqueCode}:${courseLang}`)}`
        : null

    return NextResponse.json({
      ...buildFormSubmitResponse(resolvedFormSlug, formConfig),
      uniqueCode,
      telegramDeepLink,
    })
  } catch (err: any) {
    console.error('[course/signup]', err)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
