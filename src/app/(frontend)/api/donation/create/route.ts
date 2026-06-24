import { type NextRequest, NextResponse } from 'next/server'
import { createLnInvoice } from '@/lib/blink'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const dynamic = 'force-dynamic'

// Legacy endpoint kept for backward compat — prefer /api/donation/create-invoice
export async function POST(req: NextRequest) {
  const { amount, currency, name, email, message } = await req.json()

  if (!amount) {
    return NextResponse.json({ error: 'amount is required' }, { status: 400 })
  }

  try {
    const payload = await getPayload({ config: configPromise })
    await payload.create({
      collection: 'form-submissions',
      data: {
        formName: 'donation',
        formSlug: 'donation',
        data: { amount, currency, name, email, message },
        submittedAt: new Date().toISOString(),
        status: 'active',
      },
    })
  } catch (err) {
    console.error('[donation/create] DB save failed:', err)
  }

  try {
    const sats = Number(amount)
    const memo = `Donation to African Bitcoiners${name ? ` from ${name}` : ''}`
    const invoice = await createLnInvoice(sats, memo)
    return NextResponse.json({ ok: true, ...invoice })
  } catch (err: any) {
    console.error('[donation/create]', err.message)
    return NextResponse.json({
      ok: true,
      checkoutLink: null,
      message: 'Donation intent recorded. We will be in touch.',
    })
  }
}
