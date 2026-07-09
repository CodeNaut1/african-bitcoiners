/**
 * Strip ActiveCampaign email chrome from newsletter HTML so it renders cleanly on the site.
 */

const TRACKING_PIXEL_RE =
  /<img\b[^>]*(?:\bwidth\s*=\s*["']?1["']?|\bheight\s*=\s*["']?1["']?|display\s*:\s*none|visibility\s*:\s*hidden)[^>]*>/gi

const HIDDEN_ELEMENT_RE =
  /<(?:div|span|p|table|tr|td)[^>]*(?:display\s*:\s*none|visibility\s*:\s*hidden|max-height\s*:\s*0|font-size\s*:\s*0|line-height\s*:\s*0|opacity\s*:\s*0)[^>]*>[\s\S]*?<\/(?:div|span|p|table|tr|td)>/gi

const UNSUBSCRIBE_LINK_RE =
  /<a\b[^>]*href\s*=\s*["'][^"']*(?:unsubscribe|optout|opt-out|manage.?preferences|list-manage|email-preferences)[^"']*["'][^>]*>[\s\S]*?<\/a>/gi

const VIEW_IN_BROWSER_LINK_RE =
  /<a\b[^>]*>[\s\S]*?(?:view\s+(?:in\s+)?(?:browser|web)|view\s+online|web\s+version|having\s+trouble\s+viewing)[\s\S]*?<\/a>/gi

const AC_FOOTER_BLOCK_RE =
  /<(?:div|table|tr|td|p)[^>]*>[\s\S]*?(?:activecampaign|update\s+(?:your\s+)?(?:subscription\s+)?preferences|you(?:'|&#8217;)re\s+receiving\s+this\s+email|sent\s+to\s+%EMAIL%|powered\s+by\s+activecampaign|stop\s+future\s+emails)[\s\S]*?<\/(?:div|table|tr|td|p)>/gi

const AC_HEADER_BLOCK_RE =
  /<(?:div|table|tr|td|p)[^>]*>[\s\S]*?(?:view\s+(?:in\s+)?(?:browser|web)|view\s+online|web\s+version)[\s\S]*?<\/(?:div|table|tr|td|p)>/gi

const COMMENT_RE = /<!--[\s\S]*?-->/g
const SCRIPT_STYLE_RE = /<(?:script|style)[\s\S]*?<\/(?:script|style)>/gi

function extractBodyContent(html: string): string {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)
  if (bodyMatch?.[1]) return bodyMatch[1].trim()

  const withoutHead = html.replace(/<head[\s\S]*?<\/head>/i, '').trim()
  return withoutHead
}

function removeEmptyWrappers(html: string): string {
  let result = html
  let previous = ''

  while (result !== previous) {
    previous = result
    result = result
      .replace(/<(?:div|span|p|td|tr|table)\b[^>]*>\s*<\/(?:div|span|p|td|tr|table)>/gi, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  }

  return result
}

export function cleanupActiveCampaignHtml(html: string): string {
  if (!html?.trim()) return ''

  let cleaned = extractBodyContent(html)
  cleaned = cleaned.replace(COMMENT_RE, '')
  cleaned = cleaned.replace(SCRIPT_STYLE_RE, '')
  cleaned = cleaned.replace(TRACKING_PIXEL_RE, '')
  cleaned = cleaned.replace(HIDDEN_ELEMENT_RE, '')
  cleaned = cleaned.replace(UNSUBSCRIBE_LINK_RE, '')
  cleaned = cleaned.replace(VIEW_IN_BROWSER_LINK_RE, '')
  cleaned = cleaned.replace(AC_HEADER_BLOCK_RE, '')
  cleaned = cleaned.replace(AC_FOOTER_BLOCK_RE, '')
  cleaned = cleaned.replace(
    /<a\b[^>]*href\s*=\s*["'][^"']*%UNSUBSCRIBELINK%[^"']*["'][^>]*>[\s\S]*?<\/a>/gi,
    '',
  )
  cleaned = cleaned.replace(
    /<a\b[^>]*href\s*=\s*["'][^"']*%WEBVERSION%[^"']*["'][^>]*>[\s\S]*?<\/a>/gi,
    '',
  )
  cleaned = removeEmptyWrappers(cleaned)

  return cleaned.trim()
}
