import { wrapEmail } from './wrapper'

function bountyIdBlock(entryId?: number): string {
  if (entryId == null) return ''
  return `<p style="margin:0 0 20px;font-size:14px;color:#667085;"><strong>Bounty ID:</strong> #${entryId}</p>`
}

export function bountyAcceptedEmail({
  name,
  feedbackTitle,
  entryId,
  voucherCode,
}: {
  name: string
  feedbackTitle: string
  entryId?: number
  voucherCode: string | null
}): { subject: string; html: string } {
  const voucherSection = voucherCode
    ? `<p style="color:#333;font-size:15px;line-height:1.7;margin:0 0 20px;">As a thank you, here is your <strong>1,000 sats reward</strong>:</p>
          <div style="background:#253343;border-radius:8px;padding:24px;text-align:center;margin:0 0 24px;">
            <p style="margin:0 0 8px;color:#FD5A47;font-size:12px;letter-spacing:2px;font-weight:bold;">YOUR VOUCHER CODE</p>
            <p style="margin:0;color:#ffffff;font-size:18px;font-weight:bold;font-family:monospace;letter-spacing:1px;word-break:break-all;">${voucherCode}</p>
          </div>
          <p style="color:#333;font-size:14px;line-height:1.7;margin:0 0 8px;"><strong>How to redeem in Wallet of Satoshi:</strong></p>
          <ol style="color:#333;font-size:14px;line-height:1.9;margin:0 0 24px;padding-left:20px;">
            <li>Open Wallet of Satoshi</li>
            <li>Tap the paste icon and paste your voucher code</li>
            <li>Tap OK to receive your 1,000 sats</li>
          </ol>`
    : `<p style="color:#333;font-size:15px;line-height:1.7;margin:0 0 24px;">Your feedback was accepted. Our team will follow up with your voucher reward shortly.</p>`

  const body = `
    <p style="color:#2F2614;font-size:16px;margin:0 0 16px;">Hi <strong>${name}</strong>,</p>
    <p style="color:#333;font-size:15px;line-height:1.7;margin:0 0 20px;">
      Congratulations!! Your feedback was selected and has been <strong>accepted</strong>. We truly appreciate you taking the time to help us improve African Bitcoiners.
    </p>
    ${bountyIdBlock(entryId)}
    <div style="background:#FFF9F5;border:1px solid #E5E7EB;border-radius:8px;padding:20px;margin:0 0 24px;">
      <p style="margin:0 0 8px;font-size:13px;color:#667085;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">Your Feedback</p>
      <p style="margin:0;font-size:15px;color:#253343;font-weight:600;">${feedbackTitle}</p>
    </div>
    ${voucherSection}
    <p style="color:#667085;font-size:13px;line-height:1.7;margin:0;">
      Thank you for helping us build a better Bitcoin community for Africa.
    </p>
  `

  return {
    subject: 'Congratulations!! Your Feedback Was Selected 🤩',
    html: wrapEmail(body, 'Your feedback was accepted'),
  }
}
