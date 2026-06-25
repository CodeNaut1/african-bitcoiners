/**
 * Uploads the Free Bitcoin Course page images from the live WordPress site
 * into R2 + Payload Media, and prints the resulting public URLs.
 *
 * Usage: pnpm tsx --env-file=.env scripts/upload-course-images.ts
 */

import { getPayload } from 'payload'
import config from '@/payload.config'

const IMAGES: { key: string; url: string; alt: string }[] = [
  { key: 'avatars', url: 'https://bitcoiners.africa/wp-content/uploads/2026/01/People-count-avatar.png', alt: 'Course graduates' },
  { key: 'eclipse', url: 'https://bitcoiners.africa/wp-content/uploads/2026/01/Eclipse-image.png', alt: '' },
  { key: 'heroImage', url: 'https://bitcoiners.africa/wp-content/uploads/2026/01/BFB-course-side-image.png', alt: 'Learn Bitcoin online' },
  { key: 'whatToGet', url: 'https://bitcoiners.africa/wp-content/uploads/2026/01/What-to-get-image.png', alt: 'What you will get from the course' },
  { key: 'ipaybtc', url: 'https://bitcoiners.africa/wp-content/uploads/2025/04/iPayBTC_Logo_Blue-scaled.png', alt: 'iPayBTC' },
  { key: 'citrusrate', url: 'https://bitcoiners.africa/wp-content/uploads/2024/10/Citrusrate.jpg', alt: 'Citrusrate' },
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
