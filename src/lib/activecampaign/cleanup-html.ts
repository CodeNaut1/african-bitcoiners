/**
 * Strip ActiveCampaign email chrome from newsletter HTML so it renders cleanly on the site.
 * Conservative: only removes tracking pixels and specific AC boilerplate.
 */

const FOOTER_MARKER_RE = /Sent to:|%SENDER-INFO-SINGLELINE%|%SENDER-INFO%|%EMAIL%|%UNSUBSCRIBELINK%|manage\s+preferences|unsubscribe/i

function removeLastFooterTable(html: string): string {
  if (!FOOTER_MARKER_RE.test(html)) return html

  const tables = [...html.matchAll(/<table\b[\s\S]*?<\/table>/gi)]
  if (!tables.length) return html

  for (let i = tables.length - 1; i >= 0; i--) {
    const match = tables[i]
    if (match && FOOTER_MARKER_RE.test(match[0])) {
      return html.slice(0, match.index!) + html.slice(match.index! + match[0].length)
    }
  }

  return html
}

function trimTrailingEmptyElements(html: string): string {
  let cleaned = html
  cleaned = cleaned.replace(/(<br\s*\/?>[\s\n]*)+$/gi, '')
  cleaned = cleaned.replace(/(<p>[\s\n]*<\/p>[\s\n]*)+$/gi, '')
  return cleaned.trim()
}

export function cleanupActiveCampaignHtml(html: string): string {
  if (!html) return ''

  let cleaned = html

  // Remove tracking pixels (1x1 images)
  cleaned = cleaned.replace(/<img[^>]*(?:width\s*=\s*["']1["']|height\s*=\s*["']1["'])[^>]*\/?>/gi, '')

  // Remove AC placeholder blocks (%EMAIL%, %SENDER-INFO%, etc)
  cleaned = cleaned.replace(/<[^>]*>[\s]*%[A-Z_-]+%[\s]*<\/[^>]*>/gi, '')
  cleaned = cleaned.replace(/%EMAIL%/g, '')
  cleaned = cleaned.replace(/%SENDER-INFO-SINGLELINE%/g, '')
  cleaned = cleaned.replace(/%SENDER-INFO%/g, '')

  // Remove "View in browser" links
  cleaned = cleaned.replace(/<a[^>]*>[^<]*view[^<]*in[^<]*browser[^<]*<\/a>/gi, '')

  // Remove unsubscribe/manage preferences links
  cleaned = cleaned.replace(/<a[^>]*>[^<]*unsubscribe[^<]*<\/a>/gi, '')
  cleaned = cleaned.replace(/<a[^>]*>[^<]*manage[^<]*preferences[^<]*<\/a>/gi, '')

  // Remove "Sent to:" line and surrounding footer rows/cells
  cleaned = cleaned.replace(/Sent to:[\s]*/gi, '')
  cleaned = cleaned.replace(
    /<tr[^>]*>[\s\S]*?(?:Sent to:|%SENDER-INFO%|%SENDER-INFO-SINGLELINE%|%EMAIL%)[\s\S]*?<\/tr>/gi,
    '',
  )
  cleaned = cleaned.replace(
    /<(?:p|div|td)[^>]*>[\s\S]*?(?:Sent to:|%SENDER-INFO%|%SENDER-INFO-SINGLELINE%)[\s\S]*?<\/(?:p|div|td)>/gi,
    '',
  )

  cleaned = removeLastFooterTable(cleaned)
  cleaned = trimTrailingEmptyElements(cleaned)

  return cleaned
}
