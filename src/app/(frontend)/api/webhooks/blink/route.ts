import { type NextRequest, NextResponse } from 'next/server'
import { verifyWebhook } from '@/lib/blink'
import { sendEmail } from '@/lib/email'
import { getNotificationGroup } from '@/lib/email-config'

export const dynamic = 'force-dynamic'

function adminDonationEmail(event: any) {
  const meta = event.data?.metadata ?? event.metadata ?? {}
  const amount = event.data?.settlementAmount ?? event.data?.amount ?? '?'
  const donorName = meta.donorName ?? 'Anonymous'
  const donorEmail = meta.donorEmail ?? ''
  const message = meta.message ?? ''

  return {
    subject: `New Donation Received — ${amount} sats`,
    html: `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;padding:24px;">
      <h2 style="color:#253343;">New Donation — African Bitcoiners</h2>
      <table style="border-collapse:collapse;width:100%;max-width:500px;">
        <tr><td style="padding:8px;font-weight:bold;color:#667085;width:120px;">Amount</td><td style="padding:8px;">${amount} sats</td></tr>
        <tr><td style="padding:8px;font-weight:bold;color:#667085;">Donor</td><td style="padding:8px;">${donorName}</td></tr>
        ${donorEmail ? `<tr><td style="padding:8px;font-weight:bold;color:#667085;">Email</td><td style="padding:8px;">${donorEmail}</td></tr>` : ''}
        ${message ? `<tr><td style="padding:8px;font-weight:bold;color:#667085;">Message</td><td style="padding:8px;">${message}</td></tr>` : ''}
      </table>
    </body></html>`,
  }
}

function donorThankYouEmail(donorName: string, amount: string) {
  return {
    subject: 'Thank You for Your Bitcoin Donation — African Bitcoiners',
    html: `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#FFF9F5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;border:1px solid #E5E7EB;max-width:600px;width:100%;">
        <tr><td style="background:#253343;padding:32px 40px;text-align:center;">
          <p style="margin:0;color:#F7931A;font-size:13px;letter-spacing:3px;font-weight:bold;">AFRICAN BITCOINERS</p>
          <h1 style="margin:12px 0 0;color:#fff;font-size:24px;">Thank You!</h1>
        </td></tr>
        <tr><td style="padding:40px;">
          <p style="color:#2F2614;font-size:16px;">Dear <strong>${donorName}</strong>,</p>
          <p style="color:#333;font-size:15px;line-height:1.7;">
            Thank you for your generous donation of <strong>${amount} sats</strong> to African Bitcoiners. Your support helps us continue building Bitcoin education across Africa.
          </p>
          <p style="color:#333;font-size:15px;line-height:1.7;">Together, we are building a Bitcoin-native generation across the continent. 🌍</p>
          <hr style="border:none;border-top:1px solid #E5E7EB;margin:24px 0;">
          <p style="color:#333;font-size:14px;">With gratitude,<br><strong style="color:#253343;">The African Bitcoiners Team</strong></p>
        </td></tr>
        <tr><td style="background:#F9FAFB;padding:20px 40px;text-align:center;border-top:1px solid #E5E7EB;">
          <p style="margin:0;font-size:12px;color:#9CA3AF;">African Bitcoiners · <a href="https://bitcoiners.africa" style="color:#F7931A;text-decoration:none;">bitcoiners.africa</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`,
  }
}

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

    const sensitiveTeam = getNotificationGroup('sensitive')
    if (sensitiveTeam.length) {
      const tpl = adminDonationEmail(event)
      await sendEmail(sensitiveTeam, tpl.subject, tpl.html)
    }

    if (donorEmail) {
      const tpl = donorThankYouEmail(donorName, amount)
      await sendEmail([donorEmail], tpl.subject, tpl.html)
    }
  }

  return NextResponse.json({ received: true })
}
