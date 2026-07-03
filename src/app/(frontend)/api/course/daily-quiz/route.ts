import { type NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { sendFormNotifications } from '@/lib/form-notifications'
import { isValidDailyQuizDay } from '@/lib/quiz-shared'

export const dynamic = 'force-dynamic'

type DailyQuizBody = {
  day?: number
  email?: string
  language?: string
  score?: number
  totalQuestions?: number
  answers?: Array<{
    questionId: number
    selected: string
    correct: string
  }>
}

async function lookupCourseSignupName(
  payload: Awaited<ReturnType<typeof getPayload>>,
  email: string,
): Promise<string> {
  if (!email) return ''

  const result = await payload.find({
    collection: 'course-signups',
    where: { email: { equals: email } },
    limit: 1,
    overrideAccess: true,
  })

  const signup = result.docs[0] as { name?: string } | undefined
  return signup?.name?.trim() ?? ''
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as DailyQuizBody
    const day = Number(body.day)
    const email = String(body.email ?? '').trim()
    const language = body.language === 'fr' ? 'fr' : 'en'
    const score = Number(body.score)
    const totalQuestions = Number(body.totalQuestions)
    const answers = Array.isArray(body.answers) ? body.answers : []

    if (!isValidDailyQuizDay(day)) {
      return NextResponse.json({ message: 'Invalid day' }, { status: 400 })
    }

    if (!Number.isFinite(score) || !Number.isFinite(totalQuestions)) {
      return NextResponse.json({ message: 'Invalid score' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? ''
    const name = await lookupCourseSignupName(payload, email)

    const submissionData = {
      name,
      email,
      day,
      score,
      totalQuestions,
      language,
      answers,
    }

    await payload.create({
      collection: 'form-submissions',
      data: {
        formName: `Day ${day} Quiz`,
        formSlug: 'daily-quiz',
        data: submissionData,
        submittedAt: new Date().toISOString(),
        ipAddress: ip,
        status: 'active',
      },
      overrideAccess: true,
    })

    await sendFormNotifications('daily-quiz', submissionData)

    return NextResponse.json({ ok: true, score, totalQuestions })
  } catch (err) {
    console.error('[daily-quiz]', err)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
