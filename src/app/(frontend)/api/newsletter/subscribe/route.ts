import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import {
  buildFormSubmitResponse,
  handleFormSettingsPostSubmit,
} from '@/lib/form-settings'

export async function POST(req: NextRequest) {
  try {
    const { name, email, country, honey } = await req.json()

    if (honey) return NextResponse.json({ ok: true })

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 })
    }

    const payload = await getPayload({ config })
    const submissionData = { name: name ?? '', email, country: country ?? '' }

    await payload.create({
      collection: 'form-submissions',
      data: {
        formName: 'newsletter-signup',
        formSlug: 'newsletter-signup',
        data: submissionData,
        submittedAt: new Date().toISOString(),
        ipAddress: req.headers.get('x-forwarded-for') ?? '',
        status: 'active',
      },
    })

    const formConfig = await handleFormSettingsPostSubmit('newsletter-signup', submissionData, payload)

    return NextResponse.json(buildFormSubmitResponse('newsletter-signup', formConfig))
  } catch (err: any) {
    console.error('[newsletter/subscribe]', err)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
