const ENTITY_MAP: Record<string, string> = {
  '&nbsp;': ' ',
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#8217;': '\u2019',
  '&#8216;': '\u2018',
  '&#8220;': '\u201C',
  '&#8221;': '\u201D',
  '&#8230;': '\u2026',
}

/** ~72 chars per line in the archive column at 17px — 4 lines minimum. */
const MIN_ARCHIVE_LINES = 4
const CHARS_PER_LINE = 72
const MIN_ARCHIVE_CHARS = MIN_ARCHIVE_LINES * CHARS_PER_LINE
const MAX_ARCHIVE_CHARS = 400

export function decodeHtmlEntities(text: string): string {
  return text.replace(/&(#x?[0-9a-fA-F]+|\w+);/g, (match) => ENTITY_MAP[match] ?? match)
}

export function stripHtml(html: string): string {
  return decodeHtmlEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  )
}

function extractParagraphTexts(html: string): string[] {
  const paragraphs: string[] = []

  for (const match of html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)) {
    const text = stripHtml(match[1])
    if (text) paragraphs.push(text)
  }

  return paragraphs
}

function truncateAtWord(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text

  const slice = text.slice(0, maxLength)
  const lastSpace = slice.lastIndexOf(' ')
  return lastSpace > MIN_ARCHIVE_CHARS ? slice.slice(0, lastSpace) : slice
}

function buildExcerptFromParagraphs(paragraphs: string[]): string {
  if (!paragraphs.length) return ''

  let excerpt = ''

  for (let i = 0; i < paragraphs.length; i++) {
    excerpt = excerpt ? `${excerpt} ${paragraphs[i]}` : paragraphs[i]

    const hasMinChars = excerpt.length >= MIN_ARCHIVE_CHARS
    const hasMinParagraphs = i >= MIN_ARCHIVE_LINES - 1

    if (hasMinChars && hasMinParagraphs) break
    if (i === paragraphs.length - 1) break
  }

  return truncateAtWord(excerpt, MAX_ARCHIVE_CHARS)
}

type ExcerptSource = {
  excerpt?: string | null
  rawHtml?: string | null
}

/** Archive teaser: at least the first 4 lines of body copy (matches WP archive depth). */
export function getArchiveExcerpt(post: ExcerptSource): string {
  const paragraphs = post.rawHtml ? extractParagraphTexts(post.rawHtml) : []
  const fromHtml = buildExcerptFromParagraphs(paragraphs)

  if (post.excerpt?.trim()) {
    const stored = post.excerpt.trim()
    if (stored.length >= MIN_ARCHIVE_CHARS) return truncateAtWord(stored, MAX_ARCHIVE_CHARS)
    if (fromHtml.length > stored.length) return fromHtml
    return stored
  }

  return fromHtml
}
