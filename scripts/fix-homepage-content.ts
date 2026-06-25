/**
 * Updates homepage CMS content and footer links to match the live WordPress site.
 *
 * Usage: pnpm fix:homepage
 */

import { getPayload } from 'payload'
import config from '@/payload.config'

const WP_BASE = 'https://bitcoiners.africa/wp-content/uploads'

const CARD_IMAGES = [
  { title: 'Learn Bitcoin', url: `${WP_BASE}/2026/05/Learn-Bitcoin.png`, alt: 'Learn Bitcoin card background' },
  { title: 'Earn Bitcoin', url: `${WP_BASE}/2026/05/Earn-Bitcoin.png`, alt: 'Earn Bitcoin card background' },
  { title: 'Save Bitcoin', url: `${WP_BASE}/2026/05/Save-Bitcoin.png`, alt: 'Save Bitcoin card background' },
  { title: 'Spend Bitcoin', url: `${WP_BASE}/2026/05/Spend-Bitcoin.png`, alt: 'Spend Bitcoin card background' },
]

const MIME_TYPES: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
}

function makeLexical(text: string) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            { type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
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

  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`)

  const buffer = Buffer.from(await response.arrayBuffer())
  const filename = decodeURIComponent(new URL(url).pathname.split('/').pop() ?? 'image.png')
  return { buffer, filename, mimetype: guessMime(filename, response.headers.get('content-type')) }
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
    file: { data: buffer, name: filename, mimetype, size: buffer.length },
    overrideAccess: true,
  })

  console.log(`  ✓ Uploaded: ${alt} (id: ${media.id})`)
  return media.id as number
}

async function run() {
  const payload = await getPayload({ config })

  console.log('Uploading journey card images…\n')
  const cardMediaIds = new Map<string, number>()
  for (const card of CARD_IMAGES) {
    const id = await uploadFromUrl(payload, card.url, card.alt)
    cardMediaIds.set(card.title, id)
  }

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
      block.backgroundType = 'dark'
      block.eyebrow = 'Get Daily Africa Bitcoin Only News'
      block.eyebrowUrl = 'https://bitcoinnews.africa/'
      block.eyebrowNewTab = true
      block.subheading = makeLexical(
        'Learn Bitcoin. Earn sats. Build your future. Join thousands of Africans taking control of their money.',
      )
      block.links = [
        {
          link: {
            type: 'custom',
            label: 'Start your Bitcoin Journey',
            url: '/learn-bitcoin/free-bitcoin-course/',
            newTab: false,
            appearance: 'default',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Support Our Mission',
            url: '/about-us/support-us/',
            newTab: false,
            appearance: 'outline',
          },
        },
      ]
    }

    if (block.blockType === 'cardGrid' && Array.isArray(block.cards)) {
      block.eyebrow = 'Your Bitcoin Journey Starts here'
      block.columns = '2'
      for (const card of block.cards) {
        const mediaId = cardMediaIds.get(card.title)
        if (mediaId) card.image = mediaId
        if (card.title === 'Learn Bitcoin') {
          card.description = makeLexical('Free, simple, practical education built for Africans')
        }
        if (card.title === 'Earn Bitcoin') {
          card.description = makeLexical('Free, simple, practical education built for Africans')
        }
        if (card.title === 'Save Bitcoin') {
          card.description = makeLexical('Free, simple, practical education built for Africans')
        }
        if (card.title === 'Spend Bitcoin') {
          card.description = makeLexical('Use Bitcoin in real life across Africa')
        }
      }
    }

    if (block.blockType === 'statsBar' && Array.isArray(block.stats)) {
      block.stats = [
        { value: '10k+', label: 'COMMUNITY' },
        { value: '170+', label: 'AFRICAN BITCOIN PROJECTS TRACKED' },
        { value: '12', label: 'BOOTCAMPS ACROSS AFRICA' },
      ]
    }

    if (block.blockType === 'productsGrid' && Array.isArray(block.products)) {
      const descriptions: Record<string, string> = {
        'Africa Bitcoin News': 'Stay updated with Bitcoin-only news, insights, and stories from across Africa',
        'Africa Free Routing':
          'Lightning developer bootcamps and infrastructure making Bitcoin more accessible across Africa',
        'African Bitcoin Live Directory': 'Choose 170+ Bitcoin projects across Africa',
        'The Bitcoiner Test': 'Prove your Bitcoin knowledge to employers',
        Sats2Data: 'Use Bitcoin in everyday life',
        Zapads: 'Enable AI agents to pay for other AI agent services using Bitcoin',
      }
      for (const product of block.products) {
        if (descriptions[product.name]) product.description = descriptions[product.name]
        product.primaryButtonLabel = 'VISIT WEBSITE'
      }
    }

    if (block.blockType === 'supportSection') {
      block.heading = 'Support Our Mission'
      block.description =
        'Help us onboard millions of Africans to Bitcoin through education, tools, and community.'
      block.bulletPoints = [
        { point: 'Funds free Bitcoin education across Africa' },
        { point: 'Supports Lightning Developer Bootcamps' },
        { point: 'Builds tools for real Bitcoin usage' },
        { point: 'Expands access in underserved communities' },
      ]
      block.primaryButtonLabel = 'Support Our Mission'
      block.primaryButtonUrl = '/about-us/support-us/'
      block.secondaryButtonLabel = 'Partner With Us'
      block.secondaryButtonUrl = '/bitcoin-education-partnership/'
      block.backgroundColor = 'white'
      block.qrCaption = 'Scan to donate Bitcoin'
    }

    if (block.blockType === 'newsletterSignup') {
      block.heading = 'Get Involved'
      block.subheading =
        'Be part of the revolution. Sign up for our newsletter to stay informed, or explore partnership opportunities to support our mission of spreading Bitcoin across Africa.'
      block.buttonLabel = 'Sign me up!'
      block.backgroundColor = 'dark'
    }
  }

  await (payload.update as any)({
    collection: 'pages',
    id: home.id,
    data: { content, _status: 'published' },
    overrideAccess: true,
  })

  console.log(`\nHomepage updated (id: ${home.id})`)

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const footerPayload = {
    quickLinks: [
      { label: 'INFLATION SIMULATOR', url: '/save-bitcoin/bitcoin-inflation-simulator/' },
      { label: 'AFRICA BITCOIN NEWS', url: 'https://bitcoinnews.africa/' },
      { label: 'BITCOIN STARTER BOOK', url: '/bitcoin-africas-guide-to-freedom-money/' },
      { label: 'BITCOIN MINING', url: '/bitcoin-mining-in-africa/' },
    ],
    utilityLinks: [
      { label: 'FAQs', url: '/about-us/faqs/' },
      { label: 'SITEMAP', url: '/page-sitemap.xml' },
      { label: 'SUPPORT US', url: '/about-us/support-us/' },
      { label: 'BITCOIN TEST', url: 'https://bitcoinertest.com/' },
    ],
  }

  // Update via Payload directly (works when Next.js is not running)
  await payload.updateGlobal({ slug: 'footer', data: footerPayload })

  // Also PATCH via local API so Next.js cache tags revalidate when dev server is running
  try {
    const res = await fetch(`${serverUrl.replace(/\/$/, '')}/api/globals/footer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(footerPayload),
    })
    if (res.ok) console.log('Footer revalidated via Next.js API')
  } catch {
    // dev server may not be running
  }

  console.log('Footer links updated')

  await payload.db.destroy?.()
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
