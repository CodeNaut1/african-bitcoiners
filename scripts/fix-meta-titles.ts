/**
 * fix-meta-titles.ts
 *
 * Resolves Yoast %%placeholder%% titles and normalizes all page/post meta titles
 * to "{Page Title} - African Bitcoiners" (homepage: "African Bitcoiners - Bringing Freedom to Africa").
 *
 * Usage: pnpm fix:meta [--dry-run]
 */

import { getPayload } from 'payload'
import config from '@/payload.config'
import { formatDocumentTitle } from '../src/utilities/formatMetaTitle'

const DRY_RUN = process.argv.includes('--dry-run')

async function fixMetaTitles() {
  if (DRY_RUN) console.log('[dry-run mode — no writes]\n')

  const payload = await getPayload({ config })

  let pagesFixed = 0
  const allPages = await payload.find({
    collection: 'pages',
    limit: 2000,
    pagination: false,
    depth: 0,
    overrideAccess: true,
    select: { id: true, title: true, slug: true, meta: true } as any,
  })

  for (const page of allPages.docs) {
    const current = (page as any).meta?.title ?? ''
    const next = formatDocumentTitle({
      metaTitle: current,
      pageTitle: page.title,
      slug: page.slug,
    })

    if (current === next) continue

    console.log(`  [page] ${page.slug}: "${current}" → "${next}"`)

    if (!DRY_RUN) {
      await payload.update({
        collection: 'pages',
        id: page.id,
        data: { meta: { ...(page as any).meta, title: next } } as any,
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
    }
    pagesFixed++
  }

  let postsFixed = 0
  const allPosts = await payload.find({
    collection: 'posts',
    limit: 2000,
    pagination: false,
    depth: 0,
    overrideAccess: true,
    select: { id: true, title: true, slug: true, meta: true } as any,
  })

  for (const post of allPosts.docs) {
    const current = (post as any).meta?.title ?? ''
    const next = formatDocumentTitle({
      metaTitle: current,
      pageTitle: post.title,
      slug: post.slug,
    })

    if (current === next) continue

    if (postsFixed < 5) {
      console.log(`  [post] ${post.slug}: "${current}" → "${next}"`)
    }

    if (!DRY_RUN) {
      await (payload.update as any)({
        collection: 'posts',
        id: post.id,
        data: { meta: { ...(post as any).meta, title: next } },
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
    }
    postsFixed++
  }

  console.log(`
─────────────────────────────────────────
Pages fixed  : ${pagesFixed}
Posts fixed  : ${postsFixed}
Total        : ${pagesFixed + postsFixed}
${DRY_RUN ? '(DRY RUN — no writes)' : '✓ Done'}
`)

  await payload.db.destroy?.()
  process.exit(0)
}

fixMetaTitles().catch((err) => {
  console.error(err)
  process.exit(1)
})
