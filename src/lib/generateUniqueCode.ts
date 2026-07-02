import type { Payload } from 'payload'

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function generateUniqueCode(length = 7): string {
  let code = ''
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  for (const byte of array) {
    code += CHARS[byte % CHARS.length]
  }
  return code
}

export async function generateUniqueTelegramCode(
  payload: Payload,
  length = 8,
  maxAttempts = 12,
): Promise<string> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const code = generateUniqueCode(length)
    const existing = await payload.find({
      collection: 'course-signups',
      where: { uniqueCode: { equals: code } },
      limit: 1,
      overrideAccess: true,
    })

    if (existing.totalDocs === 0) {
      return code
    }
  }

  throw new Error('Failed to generate a unique Telegram course code')
}
