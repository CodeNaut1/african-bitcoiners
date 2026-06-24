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
