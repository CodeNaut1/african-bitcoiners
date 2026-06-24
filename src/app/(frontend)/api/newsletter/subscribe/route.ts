import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { addContactForForm } from '@/lib/activecampaign'

export async function POST(req: NextRequest) {
  try {
    const { name, email, country } = await req.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    await payload.create({
      collection: 'form-submissions',
      data: {
        formName: 'newsletter-signup',
        formSlug: 'newsletter-signup',
        data: { name, email, country },
        submittedAt: new Date().toISOString(),
        status: 'active',
      },
    })

    await addContactForForm(email, name ?? '', 'newsletter-signup', payload)

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error('[newsletter/subscribe]', err)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
