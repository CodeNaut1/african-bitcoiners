import { type NextRequest, NextResponse } from 'next/server'
import { createLnInvoice } from '@/lib/blink'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const { sats, name, email, message } = await req.json()

  if (!sats || typeof sats !== 'number' || sats < 1) {
    return NextResponse.json({ error: 'sats must be a positive integer' }, { status: 400 })
  }

  // Persist donation intent
  try {
    const payload = await getPayload({ config: configPromise })
    await payload.create({
      collection: 'form-submissions',
      data: {
        formName: 'donation',
        formSlug: 'donation',
        data: { sats, name, email, message },
        submittedAt: new Date().toISOString(),
        status: 'active',
      },
    })
  } catch (err) {
    console.error('[donation/create-invoice] DB save failed:', err)
  }

  try {
    const memo = [
      'Donation to African Bitcoiners',
      name ? `from ${name}` : '',
      message ? `— ${message}` : '',
    ]
      .filter(Boolean)
      .join(' ')

    const invoice = await createLnInvoice(sats, memo)
    return NextResponse.json({ ok: true, ...invoice })
  } catch (err: any) {
    console.error('[donation/create-invoice]', err.message)
    return NextResponse.json({ error: err.message }, { status: 502 })
  }
}
