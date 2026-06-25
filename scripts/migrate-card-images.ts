/**
 * Migrates per-card images for the section landing pages from the live
 * WordPress site (bitcoiners.africa) into R2 + Payload Media, then attaches
 * each Media to the matching card in the page's cardGrid block.
 *
 * Cards are matched to the live "image-box" widgets by order (the order is
 * identical between Payload and the live site). Images reused across multiple
 * cards are uploaded only once and the same Media id is shared.
 *
 * Usage: pnpm tsx scripts/migrate-card-images.ts
 */

import { getPayload } from 'payload'
import config from '@/payload.config'

// about-us is intentionally excluded: its live page is a custom editorial
// layout (vision/goal/team sections), not a card grid, so there are no
// per-card images that map cleanly to its Payload cards.
const PAGE_SLUGS = ['learn-bitcoin', 'earn-bitcoin', 'save-bitcoin', 'spend-bitcoin', 'community']

const MATCH_THRESHOLD = 0.5

// Known correct matches the fuzzy matcher narrowly misses (live card title
// differs from the Payload card title). Keyed by page slug → card title →
// live image filename.
const MANUAL_OVERRIDES: Record<string, Record<string, string>> = {
  'save-bitcoin': {
    'Where to Buy Bitcoin Privately': 'Save-Bitcoin-Buying-Bitcoin-P2P.png',
    'Bitcoin Cold Storage Guide': 'Save-Bitcoin-How-to-Setup-a-Bitcoin-cold-storage.png',
  },
}

const STOPWORDS = new Set(
  'to the a an of your for we are is us and in on with how find explained you page visit africa african bitcoin bitcoiners bitcoiner sats sat only our'.split(
    ' ',
  ),
)

function titleTokens(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter((t) => t && !STOPWORDS.has(t))
}

function tokenMatch(a: string, b: string): boolean {
  return a === b || (a.length >= 3 && b.length >= 3 && (a.startsWith(b) || b.startsWith(a)))
}

/** Recall-oriented token-overlap score between two titles (0..1). */
function titleScore(a: string, b: string): number {
  const A = titleTokens(a)
  const B = titleTokens(b)
  if (!A.length || !B.length) return 0
  const hitA = A.filter((x) => B.some((y) => tokenMatch(x, y))).length
  const hitB = B.filter((y) => A.some((x) => tokenMatch(x, y))).length
  return Math.max(hitA / A.length, hitB / B.length)
}

function bestMatch(cardTitle: string, boxes: LiveBox[]): { box: LiveBox; score: number } | null {
  let best: { box: LiveBox; score: number } | null = null
  for (const box of boxes) {
    const score = titleScore(cardTitle, box.title)
    if (!best || score > best.score) best = { box, score }
  }
  return best
}

const MIME_TYPES: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif',
}

type LiveBox = { title: string; img: string }

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
}

/** Parse Elementor image-box widgets (title + image src) in document order. */
function parseImageBoxes(html: string): LiveBox[] {
  const chunks = html.split('elementor-widget-image-box').slice(1)
  const boxes: LiveBox[] = []
  for (const chunk of chunks) {
    const imgMatch = chunk.match(/<img[^>]*?\ssrc="([^"]+)"/i)
    const titleMatch = chunk.match(/elementor-image-box-title[^>]*>(.*?)<\/h\d>/is)
    if (!imgMatch) continue
    const img = imgMatch[1]
    if (!/wp-content\/uploads/.test(img)) continue
    boxes.push({ title: titleMatch ? stripTags(titleMatch[1]) : '', img })
  }
  return boxes
}

async function fetchLive(slug: string): Promise<string> {
  const url = `https://bitcoiners.africa/${slug}/`
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 AfricanBitcoiners-Migration/1.0' },
    signal: AbortSignal.timeout(60_000),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return res.text()
}

function guessMime(filename: string, contentType: string | null): string {
  if (contentType?.startsWith('image/')) return contentType.split(';')[0]
  const ext = filename.split('.').pop()?.toLowerCase() ?? ''
  return MIME_TYPES[ext] ?? 'application/octet-stream'
}

async function downloadFile(url: string) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'AfricanBitcoiners-Migration/1.0' },
    signal: AbortSignal.timeout(60_000),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const filename = decodeURIComponent(new URL(url).pathname.split('/').pop() ?? 'image.png')
  return { buffer, filename, mimetype: guessMime(filename, res.headers.get('content-type')) }
}

type Payload = Awaited<ReturnType<typeof getPayload>>

async function findMediaByFilename(payload: Payload, filename: string) {
  const result = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
    overrideAccess: true,
  })
  return result.docs[0] ?? null
}

/** Upload an image from a URL once; reuse existing Media when present. */
async function uploadFromUrl(payload: Payload, url: string, alt: string): Promise<number> {
  const filename = decodeURIComponent(new URL(url).pathname.split('/').pop() ?? 'image.png')
  const existing = await findMediaByFilename(payload, filename)
  if (existing) {
    console.log(`    ↷ exists: ${filename} (id ${existing.id})`)
    return existing.id as number
  }
  console.log(`    ↓ downloading: ${filename}`)
  const { buffer, mimetype } = await downloadFile(url)
  const media = await payload.create({
    collection: 'media',
    data: { alt },
    file: { data: buffer, name: filename, mimetype, size: buffer.length },
    overrideAccess: true,
  })
  console.log(`    ✓ uploaded: ${filename} (id ${media.id})`)
  return media.id as number
}

async function run() {
  const payload = await getPayload({ config })
  const urlToMediaId = new Map<string, number>()

  for (const slug of PAGE_SLUGS) {
    console.log(`\n=== ${slug} ===`)

    let html: string
    try {
      html = await fetchLive(slug)
    } catch (err) {
      console.warn(`  ⚠ could not fetch live page: ${(err as Error).message}`)
      continue
    }
    const boxes = parseImageBoxes(html)
    console.log(`  live image-box widgets: ${boxes.length}`)

    const pageResult = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
      overrideAccess: true,
    })
    if (pageResult.totalDocs === 0) {
      console.warn(`  ⚠ page not found in Payload`)
      continue
    }
    const page = pageResult.docs[0]
    const content = [...((page.content ?? []) as any[])]
    const cardGrid = content.find((b) => b.blockType === 'cardGrid')
    if (!cardGrid || !Array.isArray(cardGrid.cards)) {
      console.warn(`  ⚠ no cardGrid block`)
      continue
    }
    const cards = cardGrid.cards as any[]
    console.log(`  payload cards: ${cards.length}`)

    const overrides = MANUAL_OVERRIDES[slug] ?? {}

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i]

      const overrideFile = overrides[card.title]
      if (overrideFile) {
        const existing = await findMediaByFilename(payload, overrideFile)
        if (existing) {
          card.image = existing.id
          console.log(`    [${i}] ${card.title}  ←  (override) ${overrideFile} (media ${existing.id})`)
          continue
        }
        const box = boxes.find((b) => b.img.endsWith(overrideFile))
        if (box) {
          const mediaId = await uploadFromUrl(payload, box.img, card.title)
          urlToMediaId.set(box.img, mediaId)
          card.image = mediaId
          console.log(`    [${i}] ${card.title}  ←  (override) ${overrideFile} (media ${mediaId})`)
          continue
        }
        console.warn(`    [${i}] ${card.title}: override ${overrideFile} not found — falling back to fuzzy match`)
      }

      const match = bestMatch(card.title || '', boxes)
      if (!match || match.score < MATCH_THRESHOLD) {
        // Clear any previously (incorrectly) assigned image.
        card.image = null
        console.warn(
          `    [${i}] ${card.title}: no confident match (best ${match ? match.score.toFixed(2) : '—'}) — left without image`,
        )
        continue
      }
      const box = match.box
      let mediaId = urlToMediaId.get(box.img)
      if (!mediaId) {
        mediaId = await uploadFromUrl(payload, box.img, card.title || box.title || 'Card image')
        urlToMediaId.set(box.img, mediaId)
      }
      card.image = mediaId
      console.log(
        `    [${i}] ${card.title}  ←  ${box.title} (score ${match.score.toFixed(2)}, media ${mediaId})`,
      )
    }

    await (payload.update as any)({
      collection: 'pages',
      id: page.id,
      data: { content, _status: 'published' },
      overrideAccess: true,
    })
    console.log(`  ✓ page updated (id ${page.id})`)
  }

  console.log('\nDone. Unique images uploaded/reused:', urlToMediaId.size)
  await payload.db.destroy?.()
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
