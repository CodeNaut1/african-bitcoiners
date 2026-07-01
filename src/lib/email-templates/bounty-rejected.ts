import { wrapEmail } from './wrapper'

function bountyIdBlock(entryId?: number): string {
  if (entryId == null) return ''
  return `<p style="margin:0 0 20px;font-size:14px;color:#667085;"><strong>Bounty ID:</strong> #${entryId}</p>`
}

export function bountyRejectedEmail({
  name,
  feedbackTitle,
  entryId,
}: {
  name: string
  feedbackTitle: string
  entryId?: number
}): { subject: string; html: string } {
  const body = `
    <p style="color:#2F2614;font-size:16px;margin:0 0 16px;">Hi <strong>${name}</strong>,</p>
    <p style="color:#333;font-size:15px;line-height:1.7;margin:0 0 20px;">
      Thank you for submitting your feedback to African Bitcoiners. We appreciate every suggestion our community shares with us.
    </p>
    ${bountyIdBlock(entryId)}
    <div style="background:#FFF9F5;border:1px solid #E5E7EB;border-radius:8px;padding:20px;margin:0 0 24px;">
      <p style="margin:0 0 8px;font-size:13px;color:#667085;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">Your Feedback</p>
      <p style="margin:0;font-size:15px;color:#253343;font-weight:600;">${feedbackTitle}</p>
    </div>
    <p style="color:#333;font-size:15px;line-height:1.7;margin:0 0 20px;">
      After careful review, your submission was not accepted because it was not relatable, specific, or actionable enough for our current bounty criteria.
    </p>
    <p style="color:#333;font-size:15px;line-height:1.7;margin:0;">
      We still value your input and encourage you to keep sharing ideas. Every piece of feedback helps us build a stronger Bitcoin community across Africa.
    </p>
  `

  return {
    subject: 'Update on Your Feedback Submission',
    html: wrapEmail(body, 'Update on your feedback submission'),
  }
}
