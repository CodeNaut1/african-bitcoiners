import { google } from 'googleapis'

const DELEGATED_USER = process.env.GMAIL_DELEGATED_USER ?? 'hello@bitcoiners.africa'
const FROM_NAME = 'African Bitcoiners'

function getGmailClient() {
  const email = process.env.GMAIL_SERVICE_ACCOUNT_EMAIL
  const key = (process.env.GMAIL_PRIVATE_KEY ?? '').replace(/\\n/g, '\n')
  if (!email || !key) return null

  const auth = new google.auth.JWT({
    email,
    key,
    scopes: ['https://mail.google.com/'],
    subject: DELEGATED_USER,
  })
  return google.gmail({ version: 'v1', auth })
}

function buildRawMessage(to: string[], subject: string, htmlBody: string): string {
  const toLine = to.join(', ')
  // RFC 2822 message — all recipients in one To: header (not BCC)
  const mime = [
    `From: ${FROM_NAME} <${DELEGATED_USER}>`,
    `To: ${toLine}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=utf-8',
    'Content-Transfer-Encoding: base64',
    '',
    Buffer.from(htmlBody).toString('base64'),
  ].join('\r\n')

  return Buffer.from(mime).toString('base64url')
}

/**
 * Send an HTML email via Gmail API (domain-wide delegation).
 * All recipients are included in a single To: header — they see each other.
 */
export async function sendEmail(to: string[], subject: string, htmlBody: string): Promise<void> {
  if (!to.length) return

  const gmail = getGmailClient()
  if (!gmail) {
    console.log(`[email:stub] To: ${to.join(', ')} | Subject: ${subject}`)
    return
  }

  try {
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: buildRawMessage(to, subject, htmlBody) },
    })
  } catch (err: any) {
    console.error('[email] Gmail API error:', err.message)
  }
}
