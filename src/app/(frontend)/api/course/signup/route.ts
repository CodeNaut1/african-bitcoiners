import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { generateUniqueCode } from '@/lib/generateUniqueCode'
import { addContactForForm } from '@/lib/activecampaign'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, country, howHeard, courseLang, deliveryMethod, honey } = body

    if (honey) return NextResponse.json({ ok: true }) // honeypot

    if (!name || !courseLang || !deliveryMethod) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    const uniqueCode = generateUniqueCode(7)
    const payload = await getPayload({ config })

    await (payload.create as any)({
      collection: 'course-signups',
      data: {
        name,
        email: email || null,
        country,
        uniqueCode,
        courseLang,
        deliveryMethod,
        signupDate: new Date().toISOString(),
        ipAddress: req.headers.get('x-forwarded-for') ?? '',
      },
      overrideAccess: true,
    })

    if (email) {
      const slug = courseLang === 'fr' ? 'course-signup-french' : 'course-signup-english'
      await addContactForForm(email, name, slug, payload)
    }

    const telegramDeepLink =
      deliveryMethod === 'telegram'
        ? `https://t.me/bitcoin_for_beginners_course_bot/?start=${btoa(`${name}:${uniqueCode}:${courseLang}`)}`
        : null

    return NextResponse.json({ ok: true, uniqueCode, telegramDeepLink })
  } catch (err: any) {
    console.error('[course/signup]', err)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
