/**
 * bulk-seo-update.ts
 *
 * Updates meta.title and meta.description for pages in the SEO checklist.
 *
 * Usage: pnpm seo:bulk [--dry-run]
 */

import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { getPayload } from 'payload'

import config from '@/payload.config'
import { SEO_PAGE_DATA } from '../src/lib/seo-page-data'
import { formatDocumentTitle } from '../src/utilities/formatMetaTitle'

const DRY_RUN = process.argv.includes('--dry-run')
const BASE_URL = 'https://bitcoiners.africa'

async function bulkSeoUpdate() {
  if (DRY_RUN) console.log('[dry-run mode — no writes]\n')

  const payload = await getPayload({ config })
  const rows: string[] = ['Title,URL,Meta Description']

  let updated = 0
  let missing = 0

  for (const [slug, seo] of Object.entries(SEO_PAGE_DATA)) {
    const url = slug === 'home' ? BASE_URL : `${BASE_URL}/${slug}`
    const escaped = `"${seo.description.replace(/"/g, '""')}"`
    rows.push(`"${seo.title.replace(/"/g, '""')}",${url},${escaped}`)

    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
      pagination: false,
      depth: 0,
      overrideAccess: true,
      select: { id: true, title: true, slug: true, meta: true } as any,
    })

    const page = result.docs[0]
    if (!page) {
      console.log(`  [skip] no Payload page: ${slug}`)
      missing++
      continue
    }

    const metaTitle = formatDocumentTitle({
      metaTitle: seo.title,
      pageTitle: page.title,
      slug,
    })

    const currentDesc = (page as any).meta?.description ?? ''
    if (currentDesc === seo.description && (page as any).meta?.title === metaTitle) {
      continue
    }

    console.log(`  [update] ${slug}`)
    console.log(`    title: ${metaTitle}`)
    console.log(`    desc:  ${seo.description.slice(0, 80)}…`)

    if (!DRY_RUN) {
      await payload.update({
        collection: 'pages',
        id: page.id,
        data: {
          meta: {
            ...(page as any).meta,
            title: metaTitle,
            description: seo.description,
          },
        } as any,
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
    }

    updated++
  }

  const csvPath = resolve(process.cwd(), 'ab-seo-meta-descriptions.csv')
  writeFileSync(csvPath, rows.join('\n'), 'utf8')

  console.log(`\n✓ ${updated} page(s) ${DRY_RUN ? 'would be ' : ''}updated`)
  console.log(`  ${missing} slug(s) not in Payload (code-only routes)`)
  console.log(`  CSV exported → ${csvPath}`)

  await payload.db.destroy?.()
  process.exit(0)
}

bulkSeoUpdate().catch((err) => {
  console.error(err)
  process.exit(1)
})
