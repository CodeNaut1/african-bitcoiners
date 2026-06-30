import { type NextRequest, NextResponse } from 'next/server'
import { verifyWebhook } from '@/lib/blink'
import { handleFormSettingsPostSubmit } from '@/lib/form-settings'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const svixId = req.headers.get('svix-id') ?? ''
  const svixTimestamp = req.headers.get('svix-timestamp') ?? ''
  const svixSignature = req.headers.get('svix-signature') ?? ''

  if (!verifyWebhook(rawBody, svixId, svixTimestamp, svixSignature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let event: any
  try {
    event = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Blink sends type: "transaction.settled" or similar
  const type: string = event.type ?? event.eventType ?? ''
  if (type.includes('settled') || type.includes('paid')) {
    const meta = event.data?.metadata ?? event.metadata ?? {}
    const donorName: string = meta.donorName ?? 'Anonymous'
    const donorEmail: string | undefined = meta.donorEmail
    const amount = String(event.data?.settlementAmount ?? event.data?.amount ?? '')
    const message = meta.message ?? ''

    const payload = await getPayload({ config })
    await handleFormSettingsPostSubmit(
      'donation',
      {
        name: donorName,
        email: donorEmail ?? '',
        amount,
        message,
      },
      payload,
    )
  }

  return NextResponse.json({ received: true })
}
