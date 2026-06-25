/**
 * Downloads homepage images from the live WordPress site, uploads them to Payload
 * Media, and wires them into the Home page blocks (Hero, ProductsGrid, SupportSection).
 *
 * Usage: pnpm restore:homepage-images
 */

import { getPayload } from 'payload'
import config from '@/payload.config'

const WP_BASE = 'https://bitcoiners.africa/wp-content/uploads'

const HERO_IMAGE = {
  url: `${WP_BASE}/2026/05/AB-hero-image.png`,
  alt: 'African Bitcoiners community hero collage',
}

const PRODUCT_MOCKUPS: Array<{ productName: string; url: string; alt: string }> = [
  {
    productName: 'Africa Bitcoin News',
    url: `${WP_BASE}/2026/05/Africa-bitcoin-news-mockup.png`,
    alt: 'Africa Bitcoin News website mockup',
  },
  {
    productName: 'Africa Free Routing',
    url: `${WP_BASE}/2026/05/Africa-freerouting-mockup.png`,
    alt: 'Africa Free Routing website mockup',
  },
  {
    productName: 'African Bitcoin Live Directory',
    url: `${WP_BASE}/2026/05/African-bitcoin-live-directory-mockup.png`,
    alt: 'African Bitcoin Live Directory website mockup',
  },
  {
    productName: 'The Bitcoiner Test',
    url: `${WP_BASE}/2026/05/The-Bitcoinertest-mockup.png`,
    alt: 'The Bitcoiner Test website mockup',
  },
  {
    productName: 'Sats2Data',
    url: `${WP_BASE}/2026/05/sats2data-mockup.png`,
    alt: 'Sats2Data website mockup',
  },
  {
    productName: 'Zapads',
    url: `${WP_BASE}/2026/05/zapads-mockup.png`,
    alt: 'Zapads website mockup',
  },
]

const QR_CODE = {
  url: `${WP_BASE}/2022/10/African-Bitcoiners-QR-code.png`,
  alt: 'support QR code',
}

const MIME_TYPES: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif',
  svg: 'image/svg+xml',
}

function guessMime(filename: string, contentType: string | null): string {
  if (contentType?.startsWith('image/')) return contentType.split(';')[0]
  const ext = filename.split('.').pop()?.toLowerCase() ?? ''
  return MIME_TYPES[ext] ?? 'application/octet-stream'
}

async function downloadFile(url: string): Promise<{ buffer: Buffer; filename: string; mimetype: string }> {
  const response = await fetch(url, {
    headers: { 'User-Agent': 'AfricanBitcoiners-Migration/1.0' },
    signal: AbortSignal.timeout(60_000),
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`)
  }

  const buffer = Buffer.from(await response.arrayBuffer())
  const filename = decodeURIComponent(new URL(url).pathname.split('/').pop() ?? 'image.png')
  const mimetype = guessMime(filename, response.headers.get('content-type'))

  return { buffer, filename, mimetype }
}

async function findMediaByAlt(payload: Awaited<ReturnType<typeof getPayload>>, alt: string) {
  const result = await payload.find({
    collection: 'media',
    where: { alt: { equals: alt } },
    limit: 1,
    overrideAccess: true,
  })
  return result.docs[0] ?? null
}

async function uploadFromUrl(
  payload: Awaited<ReturnType<typeof getPayload>>,
  url: string,
  alt: string,
): Promise<number> {
  const existing = await findMediaByAlt(payload, alt)
  if (existing) {
    console.log(`  ↷ Already in Media: ${alt} (id: ${existing.id})`)
    return existing.id as number
  }

  console.log(`  ↓ Downloading: ${url}`)
  const { buffer, filename, mimetype } = await downloadFile(url)

  const media = await payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data: buffer,
      name: filename,
      mimetype,
      size: buffer.length,
    },
    overrideAccess: true,
  })

  console.log(`  ✓ Uploaded: ${alt} (id: ${media.id})`)
  return media.id as number
}

async function ensureHeroEyebrowColumns(payload: Awaited<ReturnType<typeof getPayload>>) {
  const pool = payload.db.pool as { query: (sql: string) => Promise<unknown> }
  await pool.query('ALTER TABLE pages_blocks_hero ADD COLUMN IF NOT EXISTS eyebrow_url varchar')
  await pool.query(
    'ALTER TABLE pages_blocks_hero ADD COLUMN IF NOT EXISTS eyebrow_new_tab boolean DEFAULT true',
  )
  await pool.query('ALTER TABLE _pages_v_blocks_hero ADD COLUMN IF NOT EXISTS eyebrow_url varchar')
  await pool.query(
    'ALTER TABLE _pages_v_blocks_hero ADD COLUMN IF NOT EXISTS eyebrow_new_tab boolean DEFAULT true',
  )
}

async function run() {
  const payload = await getPayload({ config })

  await ensureHeroEyebrowColumns(payload)

  console.log('Uploading homepage images to Payload Media…\n')

  const heroMediaId = await uploadFromUrl(payload, HERO_IMAGE.url, HERO_IMAGE.alt)

  const productMediaIds = new Map<string, number>()
  for (const product of PRODUCT_MOCKUPS) {
    const id = await uploadFromUrl(payload, product.url, product.alt)
    productMediaIds.set(product.productName, id)
  }

  const qrMediaId = await uploadFromUrl(payload, QR_CODE.url, QR_CODE.alt)

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
    overrideAccess: true,
  })

  if (result.totalDocs === 0) {
    console.error('Home page not found (slug: "home"). Aborting.')
    await payload.db.destroy?.()
    process.exit(1)
  }

  const home = result.docs[0]
  const content = [...(home.content ?? [])] as any[]

  for (const block of content) {
    if (block.blockType === 'hero') {
      block.eyebrow = 'Get Daily Africa Bitcoin Only News'
      block.eyebrowUrl = 'https://bitcoinnews.africa/'
      block.eyebrowNewTab = true
      block.images = [{ image: heroMediaId, alt: HERO_IMAGE.alt }]
    }

    if (block.blockType === 'productsGrid' && Array.isArray(block.products)) {
      for (const product of block.products) {
        const mediaId = productMediaIds.get(product.name)
        if (mediaId) {
          product.mockupImage = mediaId
        }
      }
    }

    if (block.blockType === 'supportSection') {
      block.qrCodeImage = qrMediaId
      block.qrCaption = 'Scan to donate Bitcoin'
    }
  }

  await (payload.update as any)({
    collection: 'pages',
    id: home.id,
    data: {
      content,
      _status: 'published',
    },
    overrideAccess: true,
  })

  console.log(`\nHomepage updated (id: ${home.id}) — hero, ${productMediaIds.size} product mockups, QR code wired up.`)

  await payload.db.destroy?.()
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
