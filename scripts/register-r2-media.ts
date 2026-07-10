/**
 * register-r2-media.ts
 *
 * Registers R2 bucket objects as Payload Media entries so they appear in the
 * admin media picker. INSERT only — never updates or deletes existing entries.
 *
 * Usage:
 *   pnpm register:media --cleanup
 *   pnpm register:media --dry-run
 *   pnpm register:media --limit=50
 *   pnpm register:media
 */

import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3'
import path from 'path'
import { getPayload } from 'payload'
import type { Payload } from 'payload'

import config from '@/payload.config'

const args = process.argv.slice(2)
const DRY_RUN = args.includes('--dry-run')
const CLEANUP = args.includes('--cleanup')
const limitArg = args.find((arg) => arg.startsWith('--limit='))
const LIMIT = limitArg ? Number.parseInt(limitArg.split('=')[1] ?? '', 10) : Infinity
const BATCH_SIZE = 100

const SIZE_VARIANT_FILENAME_RE = /-\d+x\d+\.\w+$/

const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.pdf'])

const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
}

const endpoint =
  process.env.R2_ENDPOINT ?? `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`

const s3 = new S3Client({
  region: 'auto',
  endpoint,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

const BUCKET = process.env.R2_BUCKET!
const R2_PUBLIC_URL = (process.env.R2_PUBLIC_URL ?? '').replace(/\/$/, '')

type R2Object = {
  key: string
  size: number
}

type MediaEntry = {
  key: string
  filename: string
  mimeType: string
  url: string
  size: number
}

function parseR2Key(key: string, size: number): MediaEntry | null {
  if (key.endsWith('/')) return null

  const ext = path.posix.extname(key).toLowerCase()
  if (!ALLOWED_EXTENSIONS.has(ext)) return null

  const basename = path.posix.basename(key)
  const dir = path.posix.dirname(key)
  // No prefix column in this project's media table — use the full R2 key as
  // filename for nested paths so filenames stay unique and URLs resolve correctly.
  const filename = dir === '.' ? basename : key
  const mimeType = MIME_TYPES[ext] ?? 'application/octet-stream'
  const url = `${R2_PUBLIC_URL}/${key}`

  return { key, filename, mimeType, url, size }
}

function mediaDocToR2Key(doc: {
  filename?: string | null
  url?: string | null
}): string | null {
  if (doc.url && R2_PUBLIC_URL && doc.url.startsWith(`${R2_PUBLIC_URL}/`)) {
    return doc.url.slice(R2_PUBLIC_URL.length + 1)
  }

  if (doc.filename) {
    return doc.filename
  }

  return null
}

async function listAllR2Objects(): Promise<R2Object[]> {
  const objects: R2Object[] = []
  let continuationToken: string | undefined

  do {
    const response = await s3.send(
      new ListObjectsV2Command({
        Bucket: BUCKET,
        ContinuationToken: continuationToken,
      }),
    )

    for (const item of response.Contents ?? []) {
      if (item.Key) {
        objects.push({ key: item.Key, size: item.Size ?? 0 })
      }
    }

    continuationToken = response.IsTruncated ? response.NextContinuationToken : undefined
    process.stdout.write(`\rListed ${objects.length.toLocaleString()} R2 objects…`)
  } while (continuationToken)

  process.stdout.write('\n')
  return objects
}

async function loadExistingMedia(payload: Payload) {
  const existingKeys = new Set<string>()
  let page = 1

  while (true) {
    const result = await payload.find({
      collection: 'media',
      page,
      limit: 500,
      depth: 0,
      overrideAccess: true,
      pagination: true,
      select: {
        filename: true,
        url: true,
      },
    })

    for (const doc of result.docs) {
      const key = mediaDocToR2Key(doc as { filename?: string; url?: string })
      if (key) existingKeys.add(key)
    }

    if (!result.hasNextPage) break
    page++
  }

  return { existingKeys }
}

let loggedFirstInsert = false

async function registerMediaEntry(payload: Payload, entry: MediaEntry) {
  const now = new Date().toISOString()
  const insertData = {
    alt: path.posix.basename(entry.key),
    filename: entry.filename,
    mimeType: entry.mimeType,
    filesize: entry.size,
    url: entry.url,
    createdAt: now,
    updatedAt: now,
  }

  if (!loggedFirstInsert) {
    console.log('[register:media] Creating entry with:', JSON.stringify(insertData, null, 2))
    loggedFirstInsert = true
  }

  // payload.create() requires a file upload and validates filename uniqueness via
  // field hooks — bypass with a direct DB insert for pre-existing R2 objects.
  await payload.db.create({
    collection: 'media',
    data: insertData,
  })
}

async function cleanupVariantEntries(payload: Payload) {
  const toDelete: Array<string | number> = []
  let page = 1

  while (true) {
    const result = await payload.find({
      collection: 'media',
      page,
      limit: 500,
      depth: 0,
      overrideAccess: true,
      pagination: true,
      select: {
        id: true,
        filename: true,
      },
    })

    for (const doc of result.docs) {
      if (doc.filename && SIZE_VARIANT_FILENAME_RE.test(doc.filename)) {
        toDelete.push(doc.id)
      }
    }

    if (!result.hasNextPage) break
    page++
  }

  for (const id of toDelete) {
    await payload.delete({
      collection: 'media',
      id,
      overrideAccess: true,
    })
  }

  console.log(`[register:media] Cleaned up ${toDelete.length.toLocaleString()} variant entries`)
}

async function main() {
  if (!process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY || !BUCKET) {
    console.error('Missing R2 credentials. Set R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET.')
    process.exit(1)
  }

  if (!R2_PUBLIC_URL) {
    console.error('Missing R2_PUBLIC_URL in .env')
    process.exit(1)
  }

  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}${Number.isFinite(LIMIT) ? `, limit=${LIMIT}` : ''}`)

  const payload = await getPayload({ config })

  if (CLEANUP) {
    await cleanupVariantEntries(payload)
    await payload.db.destroy?.()
    process.exit(0)
  }

  const sample = await payload.find({
    collection: 'media',
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  if (sample.docs[0]) {
    console.log('Sample existing Media entry format:')
    console.log(JSON.stringify(sample.docs[0], null, 2))
  } else {
    console.log('No existing Media entries found — new rows will use standard upload fields.')
  }

  console.log('\nLoading existing Media records from database…')
  const { existingKeys } = await loadExistingMedia(payload)
  console.log(`Found ${existingKeys.size.toLocaleString()} registered R2 keys in database.`)

  console.log(`\nListing objects in R2 bucket "${BUCKET}"…`)
  const r2Objects = await listAllR2Objects()
  console.log(`Found ${r2Objects.length.toLocaleString()} total R2 objects.`)

  const toRegister: MediaEntry[] = []
  let skippedVariants = 0

  for (const object of r2Objects) {
    if (existingKeys.has(object.key)) continue

    const parsed = parseR2Key(object.key, object.size)
    if (!parsed) continue

    if (SIZE_VARIANT_FILENAME_RE.test(parsed.filename)) {
      skippedVariants++
      continue
    }

    toRegister.push(parsed)
  }

  console.log(
    `[register:media] Skipped ${skippedVariants.toLocaleString()} size variants, ${toRegister.length.toLocaleString()} originals to process`,
  )

  const batch = toRegister.slice(0, Number.isFinite(LIMIT) ? LIMIT : toRegister.length)
  console.log(
    `\n${batch.length.toLocaleString()} object(s) to register (${(toRegister.length - batch.length).toLocaleString()} remaining after limit).`,
  )

  if (batch.length === 0) {
    console.log('Nothing to do.')
    await payload.db.destroy?.()
    process.exit(0)
  }

  let registered = 0
  let failed = 0

  for (let offset = 0; offset < batch.length; offset += BATCH_SIZE) {
    const chunk = batch.slice(offset, offset + BATCH_SIZE)

    for (const entry of chunk) {
      try {
        if (DRY_RUN) {
          console.log(`[dry-run] would register: ${entry.key}`)
        } else {
          await registerMediaEntry(payload, entry)
        }
        registered++
      } catch (err) {
        failed++
        console.error(`FAILED: ${entry.key}`, err instanceof Error ? err.message : err)
      }
    }

    const processed = Math.min(offset + chunk.length, batch.length)
    console.log(
      `Progress: ${processed.toLocaleString()}/${batch.length.toLocaleString()} processed (${registered.toLocaleString()} ${DRY_RUN ? 'would register' : 'registered'}, ${failed.toLocaleString()} failed)`,
    )
  }

  console.log('\nDone.')
  console.log(`${DRY_RUN ? 'Would register' : 'Registered'}: ${registered.toLocaleString()}`)
  console.log(`Failed: ${failed.toLocaleString()}`)
  console.log(`Skipped (already in database): ${(r2Objects.length - toRegister.length).toLocaleString()}`)

  await payload.db.destroy?.()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
