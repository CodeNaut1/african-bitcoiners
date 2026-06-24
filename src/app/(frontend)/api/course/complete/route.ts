import { type NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, uniqueCode, score, scorePercent, lang, deliveryMethod } = body

    if (typeof scorePercent !== 'number') {
      return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 })
    }

    const passed = scorePercent >= 70
    const payload = await getPayload({ config: configPromise })
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? ''

    const completion = await (payload.create as any)({
      collection: 'course-completions',
      data: {
        name: name ?? 'Course Participant',
        email: email ?? undefined,
        uniqueCode: uniqueCode ?? undefined,
        score,
        scorePercent,
        courseLang: lang ?? 'English',
        deliveryMethod,
        completionDate: new Date().toISOString(),
        ipAddress: ip,
        tierLevel: 'ba',
      },
      overrideAccess: true,
    })

    return NextResponse.json({ ok: true, passed, certNumber: completion.certNumber })
  } catch (err) {
    console.error('[course/complete]', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
