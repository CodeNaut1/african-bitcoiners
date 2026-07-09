import type { Payload } from 'payload'
import path from 'path'

const AC_CDN_HOST_RE =
  /(?:activehosted\.com|content\.app-us\d+\.com|\.api-us\d+\.com|emails\.activecampaign\.com)/i

const IMAGE_EXT_RE = /\.(jpe?g|png|gif|webp)(\?|$)/i

function isActiveCampaignCdnUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return AC_CDN_HOST_RE.test(parsed.hostname) || AC_CDN_HOST_RE.test(parsed.pathname)
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

function mimeFromFilename(filename: string): string {
  const ext = path.extname(filename).toLowerCase()
  switch (ext) {
    case '.png':
      return 'image/png'
    case '.gif':
      return 'image/gif'
    case '.webp':
      return 'image/webp'
  }
  return 'image/jpeg'
}

async function downloadImage(url: string): Promise<{ buffer: Buffer; filename: string; mimetype: string } | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(30000) })
    if (!res.ok) return null

    const buffer = Buffer.from(await res.arrayBuffer())
    if (buffer.length === 0 || buffer.length > 1048576) return null

    const filename = filenameFromUrl(url)
    const contentType = res.headers.get('content-type')?.split(';')[0]?.trim()
    const mimetype =
      contentType && contentType.startsWith('image/') ? contentType : mimeFromFilename(filename)

    return { buffer, filename, mimetype }
  } catch (err) {
    console.warn('[ac/import-images] download failed:', url, err)
    return null
  }
}

export async function rewriteActiveCampaignImageUrls(
  html: string,
  payload: Payload,
): Promise<string> {
  const urlCache = new Map<string, string>()
  const imgSrcRe = /<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi
  const bgUrlRe = /url\(\s*['"]?([^'")]+)['"]?\s*\)/gi

  const urls = new Set<string>()

  for (const match of html.matchAll(imgSrcRe)) {
    if (match[1] && isActiveCampaignCdnUrl(match[1])) urls.add(match[1])
  }
  for (const match of html.matchAll(bgUrlRe)) {
    if (match[1] && isActiveCampaignCdnUrl(match[1])) urls.add(match[1])
  }

  for (const originalUrl of urls) {
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
      if (newUrl) urlCache.set(originalUrl, newUrl)
    } catch (err) {
      console.warn('[ac/import-images] upload failed:', originalUrl, err)
    }
  }

  let result = html
  for (const [oldUrl, newUrl] of urlCache) {
    result = result.split(oldUrl).join(newUrl)
  }

  return result
}
