/**
 * fix-meta-titles.ts
 *
 * One-time cleanup: WordPress Yoast SEO placeholder tokens (%%title%%, %%sep%%, etc.)
 * imported into meta_title fields need to be resolved to real values.
 *
 * Strategy: any meta_title containing %% is replaced with "{title} — African Bitcoiners"
 * (consistent with what the seed script sets for new content).
 *
 * Usage: pnpm exec tsx --env-file=.env scripts/fix-meta-titles.ts [--dry-run]
 */

import { getPayload } from 'payload'
import config from '@/payload.config'

const DRY_RUN = process.argv.includes('--dry-run')

async function fixMetaTitles() {
  if (DRY_RUN) console.log('[dry-run mode — no writes]\n')

  const payload = await getPayload({ config })

  // ── Pages ─────────────────────────────────────────────────────────────────
  const allPages = await payload.find({
    collection: 'pages',
    limit: 2000,
    pagination: false,
    depth: 0,
    overrideAccess: true,
    select: { id: true, title: true, meta: true } as any,
  })

  let pagesFixed = 0
  for (const page of allPages.docs) {
    const metaTitle = (page as any).meta?.title ?? ''
    if (!metaTitle.includes('%%')) continue

    const newTitle = `${page.title} — African Bitcoiners`
    console.log(`  [page #${page.id}] "${metaTitle}" → "${newTitle}"`)

    if (!DRY_RUN) {
      await payload.update({
        collection: 'pages',
        id: page.id,
        data: { meta: { ...(page as any).meta, title: newTitle } } as any,
        overrideAccess: true,
      })
    }
    pagesFixed++
  }

  // ── Posts ─────────────────────────────────────────────────────────────────
  const allPosts = await payload.find({
    collection: 'posts',
    limit: 2000,
    pagination: false,
    depth: 0,
    overrideAccess: true,
    select: { id: true, title: true, meta: true } as any,
  })

  let postsFixed = 0
  for (const post of allPosts.docs) {
    const metaTitle = (post as any).meta?.title ?? ''
    if (!metaTitle.includes('%%')) continue

    const newTitle = `${post.title} — African Bitcoiners`
    if (pagesFixed + postsFixed < 5 || postsFixed % 50 === 0) {
      console.log(`  [post #${post.id}] "${metaTitle}" → "${newTitle}"`)
    }

    if (!DRY_RUN) {
      await (payload.update as any)({
        collection: 'posts',
        id: post.id,
        data: { meta: { ...(post as any).meta, title: newTitle } },
        overrideAccess: true,
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
