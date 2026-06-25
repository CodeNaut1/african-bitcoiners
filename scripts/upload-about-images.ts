/**
 * Uploads the About Us page images from the live WordPress site into
 * R2 + Payload Media, and prints the resulting public URLs so they can be
 * referenced by the custom About page component.
 *
 * Usage: pnpm tsx --env-file=.env scripts/upload-about-images.ts
 */

import { getPayload } from 'payload'
import config from '@/payload.config'

const WP = 'https://bitcoiners.africa/wp-content/uploads'

const IMAGES: { key: string; url: string; alt: string }[] = [
  { key: 'hero', url: `${WP}/2024/03/African-Bitcoiners_About-Us-Page-hero-image.png`, alt: 'African Bitcoiners community' },
  { key: 'visionIcon', url: `${WP}/2023/12/Our-Vision-Icon.png`, alt: 'Our vision' },
  { key: 'visionImage', url: `${WP}/2024/03/African-Bitcoiners_Our-Vision-Image.png`, alt: 'Freedom in Africa' },
  { key: 'goalIcon', url: `${WP}/2023/12/Our-Crazy-Goal-Icon.png`, alt: 'Our crazy goal' },
  { key: 'goalImage', url: `${WP}/2024/03/African-Bitcoiners_Our-Crazy-Goal-Image.png`, alt: 'Celebrating together' },
  { key: 'teamImage', url: `${WP}/2024/04/African_Bitcoiners_Generic_Partnership_page_image1-920x1024.png`, alt: 'The African Bitcoiners team' },
  { key: 'vector1', url: `${WP}/2023/12/About-us-page-vector.png`, alt: '' },
  { key: 'vector2', url: `${WP}/2023/12/About-us-page-vector-2.png`, alt: '' },
]

const MIME: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
}

type Payload = Awaited<ReturnType<typeof getPayload>>

async function findByFilename(payload: Payload, filename: string) {
  const r = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
    overrideAccess: true,
  })
  return r.docs[0] ?? null
}

async function upload(payload: Payload, url: string, alt: string) {
  const filename = decodeURIComponent(new URL(url).pathname.split('/').pop() ?? 'image.png')
  const existing = await findByFilename(payload, filename)
  if (existing) return existing
  const res = await fetch(url, {
    headers: { 'User-Agent': 'AfricanBitcoiners-Migration/1.0' },
    signal: AbortSignal.timeout(60_000),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const ext = filename.split('.').pop()?.toLowerCase() ?? 'png'
  const media = await payload.create({
    collection: 'media',
    data: { alt },
    file: { data: buffer, name: filename, mimetype: MIME[ext] ?? 'image/png', size: buffer.length },
    overrideAccess: true,
  })
  return media
}

async function run() {
  const payload = await getPayload({ config })
  const out: Record<string, string> = {}
  for (const img of IMAGES) {
    try {
      const m = await upload(payload, img.url, img.alt)
      out[img.key] = (m as any).url
      console.log(`${img.key}: ${(m as any).url}`)
    } catch (err) {
      console.warn(`${img.key}: FAILED ${(err as Error).message}`)
    }
  }
  console.log('\nJSON:\n' + JSON.stringify(out, null, 2))
  await payload.db.destroy?.()
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
