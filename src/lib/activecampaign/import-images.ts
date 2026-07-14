import type { Payload } from 'payload'
import path from 'path'

const IMAGE_EXT_RE = /\.(jpe?g|png|gif|webp|svg)(\?|$)/i

const IMG_SRC_RE = /<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi

function shouldMirrorImage(url: string): boolean {
  try {
    const parsed = new URL(url)
    if (!parsed.protocol.startsWith('http')) return false

    const r2Base = (process.env.R2_PUBLIC_URL ?? '').replace(/\/$/, '')
    if (r2Base && url.startsWith(r2Base)) return false

    const serverUrl = (process.env.NEXT_PUBLIC_SERVER_URL ?? '').replace(/\/$/, '')
    if (serverUrl && url.startsWith(serverUrl)) return false

    return true
  } catch {
    return false
  }
}

function filenameFromUrl(url: string): string {
  try {
    const parsed = new URL(url)
    const base = path.basename(parsed.pathname).split('?')[0]
    if (base && IMAGE_EXT_RE.test(base)) return base
  } catch {
    // fall through
  }
  return `ac-import-${Date.now()}.jpg`
}

function mimeFromFilename(filename: string, contentType: string | null): string {
  if (contentType?.startsWith('image/')) return contentType.split(';')[0]!.trim()

  const ext = path.extname(filename).toLowerCase()
  switch (ext) {
    case '.png':
      return 'image/png'
    case '.gif':
      return 'image/gif'
    case '.webp':
      return 'image/webp'
    case '.svg':
      return 'image/svg+xml'
  }
  return 'image/jpeg'
}

async function downloadImage(
  url: string,
): Promise<{ buffer: Buffer; filename: string; mimetype: string } | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(30000) })
    if (!res.ok) {
      console.warn('[ac/import-images] download failed:', url, res.status)
      return null
    }

    const buffer = Buffer.from(await res.arrayBuffer())
    if (buffer.length === 0) {
      console.warn('[ac/import-images] empty response:', url)
      return null
    }

    if (buffer.length > 1048576) {
      console.warn('[ac/import-images] image exceeds 1MB, keeping original URL:', url)
      return null
    }

    const filename = filenameFromUrl(url)
    const mimetype = mimeFromFilename(filename, res.headers.get('content-type'))

    return { buffer, filename, mimetype }
  } catch (err) {
    console.warn('[ac/import-images] download failed:', url, err)
    return null
  }
}

function collectImageUrls(html: string): string[] {
  const urls = new Set<string>()

  for (const match of html.matchAll(IMG_SRC_RE)) {
    const src = match[1]?.trim()
    if (src && shouldMirrorImage(src)) urls.add(src)
  }

  return [...urls]
}

export async function rewriteActiveCampaignImageUrls(
  html: string,
  payload: Payload,
): Promise<string> {
  const urlCache = new Map<string, string>()

  for (const originalUrl of collectImageUrls(html)) {
    if (urlCache.has(originalUrl)) continue

    const downloaded = await downloadImage(originalUrl)
    if (!downloaded) continue

    try {
      const media = await payload.create({
        collection: 'media',
        data: {
          alt: downloaded.filename,
        },
        file: {
          data: downloaded.buffer,
          mimetype: downloaded.mimetype,
          name: downloaded.filename,
          size: downloaded.buffer.length,
        },
        overrideAccess: true,
      })

      const newUrl = (media as { url?: string }).url
      if (newUrl) {
        urlCache.set(originalUrl, newUrl)
      }
    } catch (err) {
      console.warn('[ac/import-images] upload failed, keeping original URL:', originalUrl, err)
    }
  }

  let result = html
  for (const [oldUrl, newUrl] of urlCache) {
    result = result.split(oldUrl).join(newUrl)
  }

  return result
}
