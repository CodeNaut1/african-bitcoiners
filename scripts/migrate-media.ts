/**
 * migrate-media.ts
 *
 * Downloads media files from bitcoiners.africa/wp-content/uploads/...
 * and saves them to public/images/wp-content/ (preserving path structure).
 * Generates scripts/exports/url-mapping.json for use by import scripts.
 *
 * For production: set STORAGE_ADAPTER=r2 and the R2_* env vars.
 * Currently saves to local public/images/wp-content/ for dev.
 *
 * Usage: pnpm import:media
 *        pnpm import:media --limit=100   (download first N files only)
 *        pnpm import:media --skip-existing (skip already-downloaded files)
 */

import fs from 'fs'
import path from 'path'

const EXPORT_DIR = path.join(import.meta.dirname, 'exports')
const PUBLIC_DIR = path.join(import.meta.dirname, '..', 'public')
const MEDIA_FILE = path.join(EXPORT_DIR, 'media.json')
const URL_MAP_FILE = path.join(EXPORT_DIR, 'url-mapping.json')

interface MediaItem {
  postId: number
  attachmentUrl: string
}

interface UrlMapping {
  [oldUrl: string]: string
}

const args = process.argv.slice(2)
const limitArg = args.find((a) => a.startsWith('--limit='))
const LIMIT = limitArg ? parseInt(limitArg.split('=')[1], 10) : Infinity
const SKIP_EXISTING = args.includes('--skip-existing')
const CONCURRENCY = 5

async function downloadFile(url: string, destPath: string): Promise<void> {
  fs.mkdirSync(path.dirname(destPath), { recursive: true })

  const response = await fetch(url, {
    headers: { 'User-Agent': 'AfricanBitcoiners-Migration/1.0' },
    signal: AbortSignal.timeout(30_000),
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`)
  }

  const buffer = Buffer.from(await response.arrayBuffer())
  fs.writeFileSync(destPath, buffer)
}

function urlToLocalPath(url: string): string {
  // https://bitcoiners.africa/wp-content/uploads/2022/08/home2.jpg
  // → public/images/wp-content/uploads/2022/08/home2.jpg
  const parsed = new URL(url)
  return path.join(PUBLIC_DIR, 'images', parsed.pathname)
}

function urlToPublicPath(url: string): string {
  const parsed = new URL(url)
  return `/images${parsed.pathname}`
}

async function runConcurrent<T>(
  items: T[],
  concurrency: number,
  fn: (item: T, index: number) => Promise<void>,
): Promise<void> {
  let idx = 0
  async function worker() {
    while (idx < items.length) {
      const i = idx++
      await fn(items[i], i)
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker))
}

async function main() {
  if (!fs.existsSync(MEDIA_FILE)) {
    console.error(`media.json not found. Run pnpm export:wp first.`)
    process.exit(1)
  }

  const mediaItems: MediaItem[] = JSON.parse(fs.readFileSync(MEDIA_FILE, 'utf-8'))
  const toProcess = mediaItems.slice(0, LIMIT)

  // Load existing URL map
  const urlMap: UrlMapping = fs.existsSync(URL_MAP_FILE)
    ? JSON.parse(fs.readFileSync(URL_MAP_FILE, 'utf-8'))
    : {}

  let downloaded = 0
  let skipped = 0
  let failed = 0

  await runConcurrent(toProcess, CONCURRENCY, async (item, i) => {
    const url = item.attachmentUrl
    if (!url) return

    const localPath = urlToLocalPath(url)
    const publicPath = urlToPublicPath(url)

    if (SKIP_EXISTING && fs.existsSync(localPath)) {
      urlMap[url] = publicPath
      skipped++
      return
    }

    try {
      await downloadFile(url, localPath)
      urlMap[url] = publicPath
      downloaded++
      if ((downloaded + skipped) % 50 === 0) {
        process.stdout.write(`  ${downloaded + skipped}/${toProcess.length} done\r`)
      }
    } catch (err: any) {
      failed++
      console.warn(`  ✗ [${i + 1}] ${url}: ${err.message}`)
    }
  })

  fs.writeFileSync(URL_MAP_FILE, JSON.stringify(urlMap, null, 2))

  console.log(`\n✅ Downloaded: ${downloaded} | Skipped: ${skipped} | Failed: ${failed}`)
  console.log(`   URL mapping saved to scripts/exports/url-mapping.json`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
