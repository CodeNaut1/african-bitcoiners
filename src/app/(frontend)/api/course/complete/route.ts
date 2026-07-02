import { type NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { processCourseCompletion } from '@/lib/course-completion'
import { normalizeCourseLanguage } from '@/lib/certificate-shared'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      email?: string
      uniqueCode?: string
      name?: string
      score?: number
      scorePercent?: number
      language?: string
      variant?: 'email' | 'telegram'
    }

    const { email, uniqueCode, name, score, scorePercent, language, variant } = body

    if (typeof score !== 'number' || typeof scorePercent !== 'number') {
      return NextResponse.json({ error: 'Invalid score data.' }, { status: 400 })
    }

    if (variant === 'email' && !email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }

    if (variant === 'telegram' && !uniqueCode) {
      return NextResponse.json({ error: 'Unique code is required.' }, { status: 400 })
    }

    if (!variant) {
      return NextResponse.json({ error: 'Variant is required.' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? ''

    const { completion } = await processCourseCompletion(payload, {
      email,
      uniqueCode,
      name,
      score,
      scorePercent,
      language: normalizeCourseLanguage(language),
      variant,
      ipAddress: ip,
    })

    return NextResponse.json({
      ok: true,
      certNumber: completion.certNumber,
      certHash: completion.certHash,
    })
  } catch (err) {
    console.error('[course/complete]', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
