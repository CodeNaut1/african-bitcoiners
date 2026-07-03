import { type NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { addContactForForm } from '@/lib/activecampaign'
import { processCourseCompletion } from '@/lib/course-completion'
import { normalizeCourseLanguage } from '@/lib/certificate-shared'
import {
  FAILED_QUIZ_FORM_SLUG,
  FINAL_QUIZ_PASS_THRESHOLD,
  getFinalQuizAcSlug,
} from '@/lib/quiz-shared'

export const dynamic = 'force-dynamic'

const TELEGRAM_SCORE_URL = 'https://telegram-course-app.onrender.com/receive-data'

type FinalQuizBody = {
  email?: string
  uniqueId?: string
  totalScore?: number
  scorePercentage?: number
  language?: 'en' | 'fr'
  variant?: 'email' | 'telegram'
  passed?: boolean
}

async function lookupParticipant(
  payload: Awaited<ReturnType<typeof getPayload>>,
  email?: string,
  uniqueId?: string,
): Promise<{ name: string; email?: string }> {
  if (email) {
    const result = await payload.find({
      collection: 'course-signups',
      where: { email: { equals: email } },
      limit: 1,
      overrideAccess: true,
    })
    const signup = result.docs[0] as { name?: string; email?: string } | undefined
    if (signup?.name) {
      return { name: signup.name, email: signup.email ?? email }
    }
    return { name: 'Course Participant', email }
  }

  if (uniqueId) {
    const result = await payload.find({
      collection: 'course-signups',
      where: { uniqueCode: { equals: uniqueId } },
      limit: 1,
      overrideAccess: true,
    })
    const signup = result.docs[0] as { name?: string; email?: string | null } | undefined
    if (signup?.name) {
      return { name: signup.name, email: signup.email ?? undefined }
    }
  }

  return { name: 'Course Participant' }
}

async function syncTelegramScore(uniqueId: string, totalScore: number, scorePercentage: number) {
  try {
    const res = await fetch(TELEGRAM_SCORE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uniqueId, totalScore, scorePercentage }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('[final-quiz] Telegram score sync failed:', res.status, text.slice(0, 200))
    }
  } catch (err) {
    console.error('[final-quiz] Telegram score sync error:', (err as Error).message)
  }
}

function buildRedirectUrl(params: {
  passed: boolean
  totalScore: number
  scorePercentage: number
  email?: string
  uniqueId?: string
  certNumber?: string
}): string {
  const { passed, totalScore, scorePercentage, email, uniqueId, certNumber } = params
  const query = new URLSearchParams({
    score: String(totalScore),
    percent: String(scorePercentage),
  })

  if (email) query.set('email', email)
  if (uniqueId) query.set('uniqueId', uniqueId)
  if (certNumber) query.set('cert', certNumber)

  return passed ? `/final-quiz-passed?${query.toString()}` : `/final-quiz-failed?${query.toString()}`
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as FinalQuizBody
    const {
      email,
      uniqueId,
      totalScore,
      scorePercentage,
      language = 'en',
      variant,
    } = body

    if (variant !== 'email' && variant !== 'telegram') {
      return NextResponse.json({ error: 'Invalid variant.' }, { status: 400 })
    }

    if (typeof totalScore !== 'number' || typeof scorePercentage !== 'number') {
      return NextResponse.json({ error: 'Invalid score data.' }, { status: 400 })
    }

    if (variant === 'email' && !email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }

    if (variant === 'telegram' && !uniqueId) {
      return NextResponse.json({ error: 'Unique ID is required.' }, { status: 400 })
    }

    const passed = scorePercentage >= FINAL_QUIZ_PASS_THRESHOLD
    const payload = await getPayload({ config: configPromise })
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? ''
    const participant = await lookupParticipant(payload, email, uniqueId)
    const acEmail = email ?? participant.email
    let certNumber: string | undefined

    if (passed) {
      const acSlug = getFinalQuizAcSlug('passed', language)
      if (acEmail) {
        await addContactForForm(acEmail, participant.name, acSlug, payload)
      }

      const { completion } = await processCourseCompletion(payload, {
        email: variant === 'email' ? email : undefined,
        uniqueCode: variant === 'telegram' ? uniqueId : undefined,
        name: participant.name,
        score: totalScore,
        scorePercent: scorePercentage,
        language: normalizeCourseLanguage(language === 'fr' ? 'French' : 'English'),
        variant,
        ipAddress: ip,
      })

      certNumber = completion.certNumber

      if (variant === 'telegram' && uniqueId) {
        await syncTelegramScore(uniqueId, totalScore, scorePercentage)
      }
    } else {
      const acSlug = getFinalQuizAcSlug('failed', language)
      if (acEmail) {
        await addContactForForm(acEmail, participant.name, acSlug, payload)
      }

      await payload.create({
        collection: 'form-submissions',
        data: {
          formName: 'Failed Final Quiz',
          formSlug: FAILED_QUIZ_FORM_SLUG,
          data: {
            email: email ?? participant.email ?? null,
            uniqueId: uniqueId ?? null,
            totalScore,
            scorePercentage,
            language,
            variant,
          },
          submittedAt: new Date().toISOString(),
          ipAddress: ip,
          status: 'active',
        },
        overrideAccess: true,
      })
    }

    return NextResponse.json({
      ok: true,
      passed,
      certNumber,
      redirectUrl: buildRedirectUrl({
        passed,
        totalScore,
        scorePercentage,
        email: variant === 'email' ? email : undefined,
        uniqueId: variant === 'telegram' ? uniqueId : undefined,
        certNumber,
      }),
    })
  } catch (err) {
    console.error('[course/final-quiz]', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
