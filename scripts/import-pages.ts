/**
 * import-pages.ts
 *
 * Imports WP pages from scripts/exports/pages.json into the Payload Pages collection.
 * - Skips pages that already have real block content (non-placeholder).
 * - For pages with placeholder content, replaces them with a RichContent block
 *   containing the raw WP HTML in the rawHtml field.
 * - The Lexical `content` field is always set to an empty-but-valid root so
 *   Payload's required-field validation passes; rawHtml handles actual rendering.
 * - Errors on individual pages are caught and logged; import continues.
 *
 * Usage: pnpm import:pages
 *        pnpm import:pages --force     (overwrite even pages with real content)
 *        pnpm import:pages --dry-run   (print what would happen, no writes)
 */

import { getPayload } from 'payload'
import config from '@/payload.config'
import fs from 'fs'
import path from 'path'

const EXPORT_DIR = path.join(import.meta.dirname, 'exports')
const PAGES_FILE = path.join(EXPORT_DIR, 'pages.json')
const URL_MAP_FILE = path.join(EXPORT_DIR, 'url-mapping.json')
const PLACEHOLDER_TEXT = 'Content to be migrated from WordPress'

const args = process.argv.slice(2)
const FORCE = args.includes('--force')
const DRY_RUN = args.includes('--dry-run')

interface WPPage {
  postId: number
  title: string
  slug: string
  status: string
  postDate: string
  postModified: string
  parentId: number
  parentSlug: string | null
  content: string
  excerpt: string
  meta: Record<string, string>
}


function replaceImageUrls(html: string, urlMap: Record<string, string>): string {
  let result = html
  for (const [old, newUrl] of Object.entries(urlMap)) {
    result = result.split(old).join(newUrl)
  }
  return result
}

/**
 * Build a RichContent block that stores WP HTML.
 * content is set to an empty Lexical root (valid, passes required check).
 * rawHtml carries the actual HTML for dangerouslySetInnerHTML rendering.
 */
function makeRichContentBlock(html: string) {
  return {
    blockType: 'richContent',
    rawHtml: html,
    backgroundColor: 'white',
  }
}

function isPlaceholderContent(blocks: any[]): boolean {
  if (!blocks || blocks.length === 0) return false
  if (blocks.length === 1 && blocks[0].blockType === 'richContent') {
    // A block with rawHtml already set counts as migrated content — don't overwrite
    if (blocks[0].rawHtml) return false
    const content = blocks[0].content
    if (!content) return true
    const text = content?.root?.children?.[0]?.children?.[0]?.text ?? ''
    return text.includes(PLACEHOLDER_TEXT)
  }
  return false
}

async function main() {
  if (!fs.existsSync(PAGES_FILE)) {
    console.error(`pages.json not found. Run pnpm export:wp first.`)
    process.exit(1)
  }

  const urlMap: Record<string, string> = fs.existsSync(URL_MAP_FILE)
    ? JSON.parse(fs.readFileSync(URL_MAP_FILE, 'utf-8'))
    : {}

  const wpPages: WPPage[] = JSON.parse(fs.readFileSync(PAGES_FILE, 'utf-8'))
  console.log(`Loaded ${wpPages.length} WP pages`)

  const payload = await getPayload({ config })

  // Pre-load slug → Payload page ID for parent resolution
  const existingPages = await payload.find({
    collection: 'pages',
    limit: 2000,
    pagination: false,
    select: { slug: true, id: true },
  })
  const slugToId: Record<string, string | number> = {}
  for (const p of existingPages.docs) {
    if (p.slug) slugToId[p.slug] = p.id
  }

  let created = 0
  let updated = 0
  let skipped = 0
  const failures: Array<{ slug: string; title: string; error: string }> = []

  for (const wpPage of wpPages) {
    const { slug, title, content, excerpt, meta, parentSlug } = wpPage

    if (!slug) {
      skipped++
      continue
    }

    try {
      const html = replaceImageUrls(content || '', urlMap)
      const seoTitle = meta['_yoast_wpseo_title'] || ''
      const seoDesc = meta['_yoast_wpseo_metadesc'] || excerpt || ''
      const parentId = parentSlug ? slugToId[parentSlug] : undefined

      const existing = await payload.find({
        collection: 'pages',
        where: { slug: { equals: slug } },
        limit: 1,
        pagination: false,
      })
      const existingPage = existing.docs[0]

      if (existingPage) {
        const existingBlocks = (existingPage as any).content ?? []
        const isPlaceholder = isPlaceholderContent(existingBlocks)

        if (!isPlaceholder && !FORCE) {
          skipped++
          console.log(`  ⏭  Skip    ${slug}`)
          continue
        }

        if (DRY_RUN) {
          console.log(`  [dry-run] Would update: ${slug}`)
          updated++
          continue
        }

        await payload.update({
          collection: 'pages',
          id: existingPage.id,
          data: {
            title,
            content: html ? [makeRichContentBlock(html)] : existingBlocks,
            meta: { title: seoTitle || title, description: seoDesc },
            ...(parentId && { parent: parentId }),
            _status: 'published',
          } as any,
        })
        updated++
        console.log(`  ✎  Updated  ${slug}`)
      } else {
        if (DRY_RUN) {
          console.log(`  [dry-run] Would create: ${slug}`)
          created++
          continue
        }

        const newPage = await payload.create({
          collection: 'pages',
          data: {
            title,
            slug,
            content: [makeRichContentBlock(html || '')],
            meta: { title: seoTitle || title, description: seoDesc },
            ...(parentId && { parent: parentId }),
            _status: 'published',
          } as any,
        })
        slugToId[slug] = newPage.id
        created++
        console.log(`  ✚  Created  ${slug}`)
      }
    } catch (err: any) {
      const message = err?.message ?? String(err)
      failures.push({ slug, title, error: message })
      console.error(`  ✗  FAILED   ${slug}: ${message.slice(0, 120)}`)
    }
  }

  console.log(`\n─────────────────────────────────────────`)
  console.log(`✅ Created: ${created}  Updated: ${updated}  Skipped: ${skipped}  Failed: ${failures.length}`)
  if (failures.length > 0) {
    console.log(`\nFailed pages:`)
    for (const f of failures) {
      console.log(`  • ${f.slug} (${f.title})`)
      console.log(`    ${f.error.slice(0, 200)}`)
    }
  }

  process.exit(failures.length > 0 ? 1 : 0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
