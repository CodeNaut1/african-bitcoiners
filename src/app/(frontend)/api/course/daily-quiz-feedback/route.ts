import { type NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { sendFormNotifications } from '@/lib/form-notifications'
import { isValidDailyQuizDay } from '@/lib/quiz-shared'

export const dynamic = 'force-dynamic'

type DailyQuizFeedbackBody = {
  day?: number
  email?: string
  language?: string
  understandingRating?: string
  explanationRating?: string
  contentRating?: string
  improvementAdvice?: string | null
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as DailyQuizFeedbackBody
    const day = Number(body.day)
    const email = String(body.email ?? '').trim()
    const language = body.language === 'fr' ? 'fr' : 'en'

    if (!isValidDailyQuizDay(day)) {
      return NextResponse.json({ message: 'Invalid day' }, { status: 400 })
    }

    if (!body.understandingRating || !body.explanationRating || !body.contentRating) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? ''

    const submissionData = {
      email,
      day,
      language,
      understandingRating: body.understandingRating,
      explanationRating: body.explanationRating,
      contentRating: body.contentRating,
      improvementAdvice: body.improvementAdvice ?? null,
    }

    await payload.create({
      collection: 'form-submissions',
      data: {
        formName: `Day ${day} Quiz Feedback`,
        formSlug: 'daily-quiz-feedback',
        data: submissionData,
        submittedAt: new Date().toISOString(),
        ipAddress: ip,
        status: 'active',
      },
      overrideAccess: true,
    })

    await sendFormNotifications('daily-quiz-feedback', submissionData)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[daily-quiz-feedback]', err)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
