/**
 * List published pages missing SEO meta title or description.
 * Usage: pnpm exec tsx --env-file=.env scripts/audit-seo.ts
 */

import { getPayload } from 'payload'
import config from '@payload-config'

async function main() {
  const payload = await getPayload({ config })

  const pages = await payload.find({
    collection: 'pages',
    limit: 500,
    pagination: false,
    depth: 0,
    overrideAccess: true,
    where: { _status: { equals: 'published' } },
    sort: 'slug',
  })

  const missing = pages.docs.filter((p) => {
    const meta = (p as { meta?: { title?: string; description?: string } }).meta
    return !meta?.title?.trim() || !meta?.description?.trim()
  })

  console.log(`Published pages: ${pages.docs.length}`)
  console.log(`Missing meta title or description: ${missing.length}\n`)

  for (const p of missing) {
    const meta = (p as { meta?: { title?: string; description?: string } }).meta
    console.log(
      `- ${p.slug}\n    title: ${meta?.title?.trim() ? 'OK' : 'MISSING'}\n    desc:  ${meta?.description?.trim() ? 'OK' : 'MISSING'}`,
    )
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
