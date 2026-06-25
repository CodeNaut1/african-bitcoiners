/**
 * Strips broken Gravity Forms HTML from rich content blocks and replaces
 * each form with <!-- FORM_PLACEHOLDER: [form-type] --> markers.
 *
 * Usage: pnpm strip:gforms
 */

import { getPayload } from 'payload'
import config from '@/payload.config'

const PLACEHOLDER = (formType: string) => `<!-- FORM_PLACEHOLDER: ${formType} -->`

const GF_WRAPPER_START =
  /<div[^>]*class\s*=\s*['"][^'"]*\bgf_browser[\w-]*[^'"]*['"][^>]*>/gi

function findMatchingCloseDiv(html: string, openTagEnd: number): number {
  let depth = 1
  let i = openTagEnd
  const openRe = /<div[\s>]/gi
  const closeRe = /<\/div>/gi

  while (i < html.length && depth > 0) {
    openRe.lastIndex = i
    closeRe.lastIndex = i
    const openMatch = openRe.exec(html)
    const closeMatch = closeRe.exec(html)

    if (!closeMatch) return -1

    if (openMatch && openMatch.index < closeMatch.index) {
      depth++
      i = openMatch.index + openMatch[0].length
    } else {
      depth--
      if (depth === 0) return closeMatch.index + closeMatch[0].length
      i = closeMatch.index + closeMatch[0].length
    }
  }

  return -1
}

function guessFormType(blockHtml: string, pageSlug?: string, pageTitle?: string): string {
  const lower = blockHtml.toLowerCase()
  const context = `${pageSlug ?? ''} ${pageTitle ?? ''} ${lower}`.toLowerCase()
  const action = blockHtml.match(/action\s*=\s*['"]([^'"]+)['"]/i)?.[1]?.toLowerCase() ?? ''

  if (
    context.includes('newsletter') ||
    action.includes('newsletter') ||
    lower.includes('sign me up') ||
    lower.includes('weekly newsletter')
  ) {
    return 'newsletter-signup'
  }

  if (
    context.includes('feedback') ||
    context.includes('bounty') ||
    lower.includes('feedback title') ||
    lower.includes('1000 sats')
  ) {
    return 'feedback-bounty'
  }

  if (
    context.includes('course') ||
    context.includes('free-bitcoin-course') ||
    lower.includes('course signup') ||
    lower.includes('start learning')
  ) {
    return 'course-signup'
  }

  if (
    context.includes('donat') ||
    context.includes('support-us') ||
    lower.includes('donate') ||
    lower.includes('lightning address') ||
    lower.includes('btcpay')
  ) {
    return 'donation'
  }

  if (
    context.includes('contact') ||
    context.includes('connect-with-us') ||
    lower.includes('your message') ||
    lower.includes('get in touch')
  ) {
    return 'contact'
  }

  return 'unknown'
}

function stripStandaloneGform(html: string, removed: string[], pageSlug?: string, pageTitle?: string): string {
  const formStart = /<form[^>]*\bgform\b[^>]*>/gi
  let result = html
  let match: RegExpExecArray | null

  while ((match = formStart.exec(result)) !== null) {
    const start = match.index
    const formOpenEnd = start + match[0].length
    const formClose = result.indexOf('</form>', formOpenEnd)
    if (formClose === -1) break

    const block = result.slice(start, formClose + 7)
    const formType = guessFormType(block, pageSlug, pageTitle)
    removed.push(`standalone <form class="gform"> → ${formType}`)
    result = result.slice(0, start) + PLACEHOLDER(formType) + result.slice(formClose + 7)
    formStart.lastIndex = start + PLACEHOLDER(formType).length
  }

  return result
}

function stripGravityForms(
  html: string,
  pageSlug?: string,
  pageTitle?: string,
): { html: string; removed: string[] } {
  const removed: string[] = []
  let result = html

  // Remove [gravityform ...] shortcode remnants
  result = result.replace(/\[gravityform[^\]]*\]/gi, (m) => {
    removed.push(`shortcode: ${m.slice(0, 60)}`)
    return PLACEHOLDER(guessFormType(m, pageSlug, pageTitle))
  })

  // Remove gf_browser wrapper divs (outermost GF container)
  GF_WRAPPER_START.lastIndex = 0
  let wrapperMatch: RegExpExecArray | null

  while ((wrapperMatch = GF_WRAPPER_START.exec(result)) !== null) {
    const start = wrapperMatch.index
    const openTagEnd = start + wrapperMatch[0].length
    const end = findMatchingCloseDiv(result, openTagEnd)
    if (end === -1) break

    const block = result.slice(start, end)
    const formType = guessFormType(block, pageSlug, pageTitle)
    const snippet = block.slice(0, 120).replace(/\s+/g, ' ')
    removed.push(`gf_browser wrapper (${formType}): ${snippet}…`)
    result = result.slice(0, start) + PLACEHOLDER(formType) + result.slice(end)
    GF_WRAPPER_START.lastIndex = start + PLACEHOLDER(formType).length
  }

  // Fallback: any remaining gform_wrapper without gf_browser
  const wrapperOnly =
    /<div[^>]*class\s*=\s*['"][^'"]*\bgform_wrapper\b[^'"]*['"][^>]*>/gi
  wrapperOnly.lastIndex = 0

  while ((wrapperMatch = wrapperOnly.exec(result)) !== null) {
    const start = wrapperMatch.index
    const openTagEnd = start + wrapperMatch[0].length
    const end = findMatchingCloseDiv(result, openTagEnd)
    if (end === -1) break

    const block = result.slice(start, end)
    const formType = guessFormType(block, pageSlug, pageTitle)
    removed.push(`gform_wrapper (${formType})`)
    result = result.slice(0, start) + PLACEHOLDER(formType) + result.slice(end)
    wrapperOnly.lastIndex = start + PLACEHOLDER(formType).length
  }

  result = stripStandaloneGform(result, removed, pageSlug, pageTitle)

  // Clean up empty GF ajax frames / scripts left behind
  result = result.replace(/<iframe[^>]*name\s*=\s*['"]gform_ajax_frame[^'"]*['"][^>]*>\s*<\/iframe>/gi, '')
  result = result.replace(/<script[^>]*gform[^>]*>[\s\S]*?<\/script>/gi, '')

  return { html: result, removed }
}

type RichContentRow = {
  id: number
  raw_html: string
  slug?: string
  title?: string
  source: 'pages' | 'versions'
}

async function run() {
  const payload = await getPayload({ config })
  const pool = (payload.db as any).pool as {
    query: (sql: string, params?: unknown[]) => Promise<{ rows: RichContentRow[] }>
  }

  const { rows: pageRows } = await pool.query(`
    SELECT b.id, b.raw_html, p.slug, p.title, 'pages' as source
    FROM pages_blocks_rich_content b
    JOIN pages p ON p.id = b._parent_id
    WHERE b.raw_html ILIKE '%gform%'
       OR b.raw_html ILIKE '%gravityform%'
       OR b.raw_html ILIKE '%gf_browser%'
  `)

  const { rows: versionRows } = await pool.query(`
    SELECT b.id, b.raw_html, p.version_slug as slug, p.version_title as title, 'versions' as source
    FROM _pages_v_blocks_rich_content b
    JOIN _pages_v p ON p.id = b._parent_id
    WHERE b.raw_html ILIKE '%gform%'
       OR b.raw_html ILIKE '%gravityform%'
       OR b.raw_html ILIKE '%gf_browser%'
  `).catch(() => ({ rows: [] as RichContentRow[] }))

  const allRows = [...pageRows, ...versionRows]
  console.log(`Found ${allRows.length} rich content block(s) with Gravity Forms markup\n`)

  let updated = 0

  for (const row of allRows) {
    const { html, removed } = stripGravityForms(row.raw_html, row.slug, row.title)
    if (html === row.raw_html) continue

    const table =
      row.source === 'versions' ? '_pages_v_blocks_rich_content' : 'pages_blocks_rich_content'

    await pool.query(`UPDATE ${table} SET raw_html = $1 WHERE id = $2`, [html, row.id])

    const label = row.slug ? `/${row.slug}/` : `block ${row.id}`
    console.log(`✓ ${label} (${row.source}, block id ${row.id})`)
    for (const item of removed) {
      console.log(`    - ${item}`)
    }
    console.log('')
    updated++
  }

  console.log(`Done — updated ${updated} block(s).`)

  await payload.db.destroy?.()
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
