/**
 * import-pages.ts
 *
 * Full WordPress → Payload page import from scripts/exports/pages.json.
 *
 * - Builds compound slugs from WP parent + slug (e.g. learn-bitcoin/free-bitcoin-course)
 * - Maps WP homepage (african-bitcoiners) → Payload slug "home" (served at /)
 * - Updates existing pages in place — never creates duplicates
 * - Replaces content with WP rawHtml (full HTML structure)
 * - Applies url-mapping.json for migrated images when present
 *
 * Usage:
 *   pnpm import:pages              # full overwrite import
 *   pnpm import:pages --dry-run
 *   pnpm import:pages --skip-existing   # only placeholder/empty pages (legacy behaviour)
 */

import { getPayload } from 'payload'
import config from '@/payload.config'
import fs from 'fs'
import path from 'path'

import { HOME_PAGE_SLUG, LEGACY_HOME_SLUG } from '../src/utilities/homePage'
import { formatDocumentTitle } from '../src/utilities/formatMetaTitle'

const EXPORT_DIR = path.join(import.meta.dirname, 'exports')
const PAGES_FILE = path.join(EXPORT_DIR, 'pages.json')
const URL_MAP_FILE = path.join(EXPORT_DIR, 'url-mapping.json')
const PLACEHOLDER_TEXT = 'Content to be migrated from WordPress'

const args = process.argv.slice(2)
const SKIP_EXISTING = args.includes('--skip-existing')
const DRY_RUN = args.includes('--dry-run')

const IMPORT_CTX = { disableRevalidate: true }

interface WPPage {
  postId: number
  title: string
  slug: string
  status: string
  parentSlug: string | null
  content: string
  excerpt: string
  meta: Record<string, string>
}

function getPayloadSlug(wp: WPPage): string {
  if (wp.slug === LEGACY_HOME_SLUG) return HOME_PAGE_SLUG
  if (wp.parentSlug) return `${wp.parentSlug}/${wp.slug}`
  return wp.slug
}

function aliasSlugs(wp: WPPage): string[] {
  const target = getPayloadSlug(wp)
  const aliases = new Set<string>([target, wp.slug])
  if (wp.parentSlug) aliases.add(`${wp.parentSlug}/${wp.slug}`)
  if (wp.slug === LEGACY_HOME_SLUG) aliases.add(LEGACY_HOME_SLUG)
  return [...aliases]
}

function sortParentsFirst(pages: WPPage[]): WPPage[] {
  return [...pages].sort((a, b) => {
    const depth = (p: WPPage) => (getPayloadSlug(p).match(/\//g) || []).length
    return depth(a) - depth(b)
  })
}

function replaceImageUrls(html: string, urlMap: Record<string, string>): string {
  let result = html
  for (const [old, newUrl] of Object.entries(urlMap)) {
    result = result.split(old).join(newUrl)
  }
  return result
}

function makeRichContentBlock(html: string) {
  return {
    blockType: 'richContent',
    rawHtml: html,
    backgroundColor: 'white',
  }
}

function isPlaceholderContent(blocks: any[]): boolean {
  if (!blocks || blocks.length === 0) return true
  if (blocks.length === 1 && blocks[0].blockType === 'richContent') {
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
    console.error('pages.json not found. Run pnpm export:wp first.')
    process.exit(1)
  }

  const urlMap: Record<string, string> = fs.existsSync(URL_MAP_FILE)
    ? JSON.parse(fs.readFileSync(URL_MAP_FILE, 'utf-8'))
    : {}

  const wpPages = sortParentsFirst(JSON.parse(fs.readFileSync(PAGES_FILE, 'utf-8')) as WPPage[])
  console.log(`Loaded ${wpPages.length} WP pages`)
  if (!Object.keys(urlMap).length) {
    console.warn('⚠  No url-mapping.json — image URLs will remain as WP originals. Run pnpm import:media when ready.')
  }

  const payload = await getPayload({ config })

  const allPages = await payload.find({
    collection: 'pages',
    limit: 5000,
    pagination: false,
    depth: 0,
    select: { id: true, slug: true, title: true, content: true },
  })

  const bySlug = new Map<string, { id: string | number; title: string; content: unknown }>()
  for (const p of allPages.docs) {
    if (p.slug) bySlug.set(p.slug, { id: p.id, title: p.title as string, content: (p as any).content })
  }

  let created = 0
  let updated = 0
  let skipped = 0
  let deleted = 0
  const failures: Array<{ slug: string; title: string; error: string }> = []

  for (const wpPage of wpPages) {
    const { slug: wpSlug, title, content, excerpt, meta, parentSlug } = wpPage
    if (!wpSlug) {
      skipped++
      continue
    }

    const targetSlug = getPayloadSlug(wpPage)
    const aliases = aliasSlugs(wpPage)

    try {
      const matches = aliases
        .map((s) => bySlug.get(s))
        .filter((m): m is NonNullable<typeof m> => Boolean(m))

      const uniqueById = new Map<string | number, (typeof matches)[0]>()
      for (const m of matches) uniqueById.set(m.id, m)

      let keeperId: string | number | null = null
      for (const alias of aliases) {
        const hit = bySlug.get(alias)
        if (hit) {
          keeperId = hit.id
          break
        }
      }

      if (keeperId && uniqueById.size > 1) {
        for (const [id] of uniqueById) {
          if (id === keeperId) continue
          const dupSlug = [...bySlug.entries()].find(([, v]) => v.id === id)?.[0]
          if (DRY_RUN) {
            console.log(`  [dry-run] Would delete duplicate: ${dupSlug} (#${id})`)
          } else {
            await payload.delete({ collection: 'pages', id, context: IMPORT_CTX })
            if (dupSlug) bySlug.delete(dupSlug)
            deleted++
          }
        }
      }

      const keeper = keeperId ? uniqueById.get(keeperId) : null

      if (keeper && SKIP_EXISTING && !isPlaceholderContent((keeper.content as any[]) ?? [])) {
        skipped++
        console.log(`  ⏭  Skip    ${targetSlug}`)
        continue
      }

      const html = replaceImageUrls(content || '', urlMap)
      const seoTitle = formatDocumentTitle({
        metaTitle: meta['_yoast_wpseo_title'],
        pageTitle: title,
        slug: targetSlug,
      })
      const seoDesc = meta['_yoast_wpseo_metadesc'] || excerpt || ''
      const parentId = parentSlug ? bySlug.get(parentSlug)?.id : undefined

      const data = {
        title,
        slug: targetSlug,
        content: [makeRichContentBlock(html)],
        meta: { title: seoTitle, description: seoDesc },
        ...(parentId !== undefined && { parent: parentId }),
        _status: 'published' as const,
      }

      if (DRY_RUN) {
        console.log(`  [dry-run] ${keeper ? 'Update' : 'Create'} ${targetSlug} (wp: ${wpSlug})`)
        keeper ? updated++ : created++
        continue
      }

      if (keeper) {
        await payload.update({
          collection: 'pages',
          id: keeper.id,
          data: data as any,
          context: IMPORT_CTX,
        })
        for (const alias of aliases) {
          if (bySlug.get(alias)?.id === keeper.id) bySlug.delete(alias)
        }
        bySlug.set(targetSlug, { id: keeper.id, title, content: data.content })
        updated++
        console.log(`  ✎  Updated  ${targetSlug}`)
      } else {
        const newPage = await payload.create({
          collection: 'pages',
          data: data as any,
          context: IMPORT_CTX,
        })
        bySlug.set(targetSlug, { id: newPage.id, title, content: data.content })
        created++
        console.log(`  ✚  Created  ${targetSlug}`)
      }
    } catch (err: any) {
      const message = err?.message ?? String(err)
      failures.push({ slug: targetSlug, title, error: message })
      console.error(`  ✗  FAILED   ${targetSlug}: ${message.slice(0, 150)}`)
    }
  }

  console.log(`
─────────────────────────────────────────
Created   : ${created}
Updated   : ${updated}
Deleted   : ${duplicatesLabel(deleted)}
Skipped   : ${skipped}
Failed    : ${failures.length}
WP pages  : ${wpPages.length}
`)
  if (failures.length > 0) {
    console.log('Failed pages:')
    for (const f of failures) {
      console.log(`  • ${f.slug} (${f.title})`)
      console.log(`    ${f.error.slice(0, 200)}`)
    }
  }

  await payload.db.destroy?.()
  process.exit(failures.length > 0 ? 1 : 0)
}

function duplicatesLabel(n: number): string {
  return n > 0 ? `${n} duplicates removed` : '0'
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
