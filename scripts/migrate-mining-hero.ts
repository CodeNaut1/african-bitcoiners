/**
 * Converts the "Bitcoin Mining in Africa" hero to a full-width background-image layout
 * and migrates the Mining Report PDF off the old WordPress uploads onto R2.
 *
 *   1. Uploads the report PDF from WP into R2 + Payload Media (deduped by filename).
 *   2. Repoints every reference to the WP PDF (hero button + section links) to the R2 URL.
 *   3. Switches the hero block to the "background" layout using the already-migrated R2 hero image.
 *
 * Usage: pnpm tsx --env-file=.env scripts/migrate-mining-hero.ts
 */

import { getPayload } from 'payload'
import config from '@/payload.config'

type Payload = Awaited<ReturnType<typeof getPayload>>

const WP_PDF =
  'https://bitcoiners.africa/wp-content/uploads/2025/08/African-Bitcoiners-Mining-Report-2025-Latest-OFFICIAL.pdf'
const HERO_IMAGE_FILENAME = 'Bitcoin-Mining-in-Africa-hero-bg.png'

async function findByFilename(payload: Payload, filename: string) {
  const r = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
    overrideAccess: true,
  })
  return r.docs[0] ?? null
}

async function run() {
  const payload = await getPayload({ config })

  // 1. Upload the report PDF to R2/Media.
  const pdfFilename = decodeURIComponent(new URL(WP_PDF).pathname.split('/').pop()!)
  let pdf = await findByFilename(payload, pdfFilename)
  if (!pdf) {
    const res = await fetch(WP_PDF, {
      headers: { 'User-Agent': 'AfricanBitcoiners-Migration/1.0' },
      signal: AbortSignal.timeout(120_000),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${WP_PDF}`)
    const buffer = Buffer.from(await res.arrayBuffer())
    pdf = await payload.create({
      collection: 'media',
      data: { alt: 'African Bitcoiners Mining Report 2025' },
      file: { data: buffer, name: pdfFilename, mimetype: 'application/pdf', size: buffer.length },
      overrideAccess: true,
    })
  }
  const R2_PDF = (pdf as { url: string }).url
  console.log('Report PDF:', R2_PDF)

  // 2. Look up the already-migrated hero background image.
  const heroImg = await findByFilename(payload, HERO_IMAGE_FILENAME)
  if (!heroImg) throw new Error(`Hero image ${HERO_IMAGE_FILENAME} not found in Media`)
  console.log('Hero image:', (heroImg as { url: string }).url)

  // 3. Load the page (depth 0 so upload fields stay as IDs we can write back).
  const pages = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'bitcoin-mining-in-africa' } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  const page = pages.docs[0]
  if (!page) throw new Error('Page bitcoin-mining-in-africa not found')

  // Repoint every WP-PDF reference to R2 across all blocks (hero link + rich-text link nodes).
  let content = JSON.parse(JSON.stringify(page.content).split(WP_PDF).join(R2_PDF))

  // Switch the hero block to the background-image layout.
  // 'text-overlay' is the stored enum value the component renders as the "background" layout.
  for (const block of content) {
    if (block.blockType === 'hero') {
      block.layout = 'text-overlay'
      block.backgroundType = 'image'
      block.backgroundImage = (heroImg as { id: number }).id
      block.images = []
    }
  }

  await payload.update({
    collection: 'pages',
    id: page.id,
    data: { content },
    overrideAccess: true,
  })
  console.log('Page updated: hero → background layout, all report links → R2.')

  await payload.db.destroy?.()
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
