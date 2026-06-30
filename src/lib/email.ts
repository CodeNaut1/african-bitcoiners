import { google } from 'googleapis'

const DELEGATED_USER = process.env.GMAIL_DELEGATED_USER ?? 'hello@bitcoiners.africa'
const FROM_NAME = 'African Bitcoiners'

/** RFC 2047 encode header values containing non-ASCII characters (e.g. emoji in subjects). */
function encodeRFC2047(value: string): string {
  if (/^[\x00-\x7F]*$/.test(value)) return value
  return `=?UTF-8?B?${Buffer.from(value, 'utf-8').toString('base64')}?=`
}

function formatFromHeader(fromName: string, email: string): string {
  const name = fromName.trim() || FROM_NAME
  return `${name} <${email}>`
}

function getGmailClient() {
  const email = process.env.GMAIL_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GMAIL_PRIVATE_KEY?.replace(/\\n/g, '\n')
  if (!email || !privateKey) return null

  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/gmail.send'],
    subject: process.env.GMAIL_DELEGATED_USER,
  })
  return google.gmail({ version: 'v1', auth })
}

function buildRawMessage(
  to: string[],
  subject: string,
  htmlBody: string,
  fromName = FROM_NAME,
): string {
  const toLine = to.join(', ')
  // RFC 2822 message — all recipients in one To: header (not BCC)
  const mime = [
    `From: ${formatFromHeader(fromName, DELEGATED_USER)}`,
    `To: ${toLine}`,
    `Subject: ${encodeRFC2047(subject)}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    Buffer.from(htmlBody, 'utf-8').toString('base64'),
  ].join('\r\n')

  return Buffer.from(mime).toString('base64url')
}

type SendEmailOptions = {
  fromName?: string
}

/**
 * Send an HTML email via Gmail API (domain-wide delegation).
 * All recipients are included in a single To: header — they see each other.
 */
export async function sendEmail(
  to: string[],
  subject: string,
  htmlBody: string,
  options?: SendEmailOptions,
): Promise<void> {
  if (!to.length) return

  const gmail = getGmailClient()
  if (!gmail) {
    console.log(`[email:stub] To: ${to.join(', ')} | Subject: ${subject}`)
    return
  }

  try {
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: buildRawMessage(to, subject, htmlBody, options?.fromName ?? FROM_NAME),
      },
    })
  } catch (err: any) {
    console.error('[email] Gmail API error:', err.message)
  }
}
