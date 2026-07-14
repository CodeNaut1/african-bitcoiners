/**
 * Sets meta.image on every Payload page to the AB official logo.
 *
 * Usage: pnpm seo:default-image
 */

import { getPayload } from 'payload'

import config from '@/payload.config'
import { DEFAULT_OG_IMAGE } from '../src/lib/seo-og-images'

const FILENAME = 'African-Bitcoiners-official_logo-1024x1024.png'
const ALT = 'African Bitcoiners official logo'

async function ensureLogoMedia(payload: Awaited<ReturnType<typeof getPayload>>): Promise<number> {
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: FILENAME } },
    limit: 1,
    overrideAccess: true,
  })

  if (existing.docs[0]) {
    console.log(`✓ Media found: ${FILENAME} (id ${existing.docs[0].id})`)
    return existing.docs[0].id as number
  }

  console.log(`↓ Downloading ${FILENAME}…`)
  const res = await fetch(DEFAULT_OG_IMAGE, {
    headers: { 'User-Agent': 'AfricanBitcoiners-SEO/1.0' },
    signal: AbortSignal.timeout(60_000),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${DEFAULT_OG_IMAGE}`)

  const buffer = Buffer.from(await res.arrayBuffer())
  const media = await payload.create({
    collection: 'media',
    data: { alt: ALT },
    file: {
      data: buffer,
      name: FILENAME,
      mimetype: 'image/png',
      size: buffer.length,
    },
    overrideAccess: true,
  })

  console.log(`✓ Uploaded ${FILENAME} (id ${media.id})`)
  return media.id as number
}

async function run() {
  const payload = await getPayload({ config })
  const mediaId = await ensureLogoMedia(payload)

  const pool = (payload.db as { pool?: { query: (sql: string, params?: unknown[]) => Promise<{ rowCount: number }> } }).pool
  if (pool) {
    const result = await pool.query(
      `UPDATE pages SET meta_image_id = $1 WHERE meta_image_id IS DISTINCT FROM $1`,
      [mediaId],
    )
    console.log(`\n✓ ${result.rowCount} page(s) updated via SQL (media id ${mediaId})`)
    await payload.db.destroy?.()
    process.exit(0)
  }

  const { docs: pages } = await payload.find({
    collection: 'pages',
    limit: 500,
    pagination: false,
    depth: 0,
    overrideAccess: true,
    select: { id: true, slug: true, meta: true } as any,
  })

  let updated = 0
  let skipped = 0

  for (const page of pages) {
    const current = (page as any).meta?.image
    const currentId = typeof current === 'object' ? current?.id : current
    if (currentId === mediaId) {
      skipped++
      continue
    }

    await payload.update({
      collection: 'pages',
      id: page.id,
      data: {
        meta: {
          ...(page as any).meta,
          image: mediaId,
        },
      } as any,
      overrideAccess: true,
      context: { disableRevalidate: true },
    })
    updated++
  }

  console.log(`\n✓ ${updated} page(s) updated, ${skipped} already had the logo`)
  await payload.db.destroy?.()
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
