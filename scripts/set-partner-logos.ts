/**
 * Replaces the placeholder partner logos with the real brand logos and wires
 * everything the Partners Carousel needs straight into the CMS:
 *   - uploads each real logo into the Media collection (stored on R2)
 *   - points each Partner's `logoImage` at the new media doc
 *   - sets `logoWidth` to the display width used by the carousel
 *
 * Source images are the R2 equivalents of the original WordPress uploads
 * (wp-content/uploads/… → <R2_PUBLIC_URL>/uploads/…).
 *
 * Usage: pnpm tsx --env-file=.env scripts/set-partner-logos.ts
 */

import { getPayload } from 'payload'
import config from '@/payload.config'

const R2_BASE = (process.env.R2_PUBLIC_URL ?? 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev').replace(/\/$/, '')

const PARTNER_LOGOS: { match: string; path: string; width: number; alt: string }[] = [
  { match: 'hrf', path: 'uploads/2024/11/HRF-logo.png', width: 250, alt: 'Human Rights Foundation' },
  { match: 'ipaybtc', path: 'uploads/2026/05/iPayBTC_Logo_Blue-scaled-bw.webp', width: 250, alt: 'iPayBTC' },
  { match: 'citrusrate', path: 'uploads/2025/01/Citrusrate-logo-BW.png', width: 200, alt: 'Citrusrate' },
  { match: 'trezor', path: 'uploads/2024/10/Trezor_Academy_Logo_Black.svg', width: 270, alt: 'Trezor Academy' },
  { match: 'btrust', path: 'uploads/2025/06/btrust-1.png', width: 270, alt: 'Btrust' },
]

const MIME: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  svg: 'image/svg+xml',
}

type Payload = Awaited<ReturnType<typeof getPayload>>

async function findMediaByFilename(payload: Payload, filename: string) {
  const r = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
    overrideAccess: true,
  })
  return r.docs[0] ?? null
}

async function uploadLogo(payload: Payload, path: string, alt: string) {
  const filename = decodeURIComponent(path.split('/').pop() ?? 'logo.png')
  const existing = await findMediaByFilename(payload, filename)
  if (existing) return existing

  const url = `${R2_BASE}/${path}`
  const res = await fetch(url, { signal: AbortSignal.timeout(60_000) })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const ext = filename.split('.').pop()?.toLowerCase() ?? 'png'

  return payload.create({
    collection: 'media',
    data: { alt },
    file: { data: buffer, name: filename, mimetype: MIME[ext] ?? 'application/octet-stream', size: buffer.length },
    overrideAccess: true,
  })
}

async function run() {
  const payload = await getPayload({ config })

  const partners = await payload.find({ collection: 'partners', limit: 100, overrideAccess: true })

  for (const logo of PARTNER_LOGOS) {
    const partner = (partners.docs as any[]).find((p) =>
      String(p.name ?? '').toLowerCase().replace(/[^a-z0-9]/g, '').includes(logo.match),
    )
    if (!partner) {
      console.warn(`No partner matched "${logo.match}" — skipping`)
      continue
    }

    try {
      const media = await uploadLogo(payload, logo.path, logo.alt)
      await payload.update({
        collection: 'partners',
        id: partner.id,
        data: { logoImage: (media as any).id, logoWidth: logo.width },
        overrideAccess: true,
      })
      console.log(`✓ ${partner.name} → ${(media as any).url} (width ${logo.width})`)
    } catch (err) {
      console.warn(`✗ ${partner.name}: ${(err as Error).message}`)
    }
  }

  await payload.db.destroy?.()
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
