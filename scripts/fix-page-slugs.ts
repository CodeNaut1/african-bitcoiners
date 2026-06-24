/**
 * fix-page-slugs.ts
 *
 * One-time cleanup for the slug mismatch introduced by the WP content import.
 *
 * Problem:
 *   Steps 11-12 created sub-pages with compound slugs like
 *     "learn-bitcoin/top-10-bitcoin-misconceptions"
 *   The WP importer created new pages with short slugs like
 *     "top-10-bitcoin-misconceptions"
 *   The [slug]/[subpage] route only finds pages by compound slug, so the
 *   old placeholder pages are still what visitors see.
 *
 * Fix:
 *   For every WP-imported page with a short slug that has a matching old
 *   compound-slug placeholder:
 *     1. Delete the old placeholder
 *     2. Update the imported page's slug to the compound form
 *     3. Set the parent relationship on the imported page
 *
 * Usage: pnpm exec tsx --env-file=.env scripts/fix-page-slugs.ts
 *        pnpm exec tsx --env-file=.env scripts/fix-page-slugs.ts --dry-run
 */

import { getPayload } from 'payload'
import config from '@/payload.config'
import fs from 'fs'
import path from 'path'

const PAGES_FILE = path.join(import.meta.dirname, 'exports/pages.json')
const DRY_RUN = process.argv.includes('--dry-run')

interface WPPage {
  slug: string
  parentSlug: string | null
}

async function main() {
  if (DRY_RUN) console.log('[dry-run mode — no writes]\n')

  // Build slug → parentSlug map from WP export
  const wpPages: WPPage[] = JSON.parse(fs.readFileSync(PAGES_FILE, 'utf-8'))
  const wpParent: Record<string, string> = {}
  for (const p of wpPages) {
    if (p.parentSlug) wpParent[p.slug] = p.parentSlug
  }

  const payload = await getPayload({ config })

  // Fetch every page in one shot
  const allPages = await payload.find({
    collection: 'pages',
    limit: 5000,
    pagination: false,
    depth: 0,
    select: { slug: true, id: true, title: true } as any,
  })

  // slug → { id, title } lookup
  const bySlug: Record<string, { id: string | number; title: string }> = {}
  for (const p of allPages.docs) {
    if (p.slug) bySlug[p.slug] = { id: p.id, title: p.title as string }
  }

  let merged = 0
  let noPlaceholder = 0
  let skipped = 0

  // Process every short-slug page that has a WP parent
  for (const page of allPages.docs) {
    const slug = page.slug as string
    if (!slug || slug.includes('/')) { skipped++; continue }

    const parentSlug = wpParent[slug]
    if (!parentSlug) { skipped++; continue }

    const compoundSlug = `${parentSlug}/${slug}`
    const placeholder = bySlug[compoundSlug]

    const parentPage = bySlug[parentSlug]
    const parentId = parentPage?.id

    if (DRY_RUN) {
      if (placeholder) {
        console.log(`  [dry-run] ${slug} → ${compoundSlug}  (delete old #${placeholder.id})`)
      } else {
        console.log(`  [dry-run] ${slug} → ${compoundSlug}  (rename only, no placeholder)`)
      }
      merged++
      continue
    }

    // 1. Delete old placeholder if one exists
    if (placeholder) {
      await payload.delete({ collection: 'pages', id: placeholder.id })
    } else {
      noPlaceholder++
    }

    // 2. Update imported page: new compound slug + parent link
    await payload.update({
      collection: 'pages',
      id: page.id,
      data: {
        slug: compoundSlug,
        ...(parentId !== undefined && { parent: parentId }),
      } as any,
    })

    // Keep bySlug in sync so subsequent iterations are consistent
    bySlug[compoundSlug] = { id: page.id, title: page.title as string }
    delete bySlug[slug]

    console.log(`  ✓  ${slug} → ${compoundSlug}`)
    merged++
  }

  console.log(`
─────────────────────────────────────────
Renamed        : ${merged}
No placeholder : ${noPlaceholder}
Skipped        : ${skipped}
`)

  await payload.db.destroy?.()
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
