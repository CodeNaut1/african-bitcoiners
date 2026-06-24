import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3'
import { createReadStream, statSync } from 'fs'
import { readdir } from 'fs/promises'
import { join, relative, extname } from 'path'
import { homedir } from 'os'

const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.pdf'])
const CONCURRENCY = 10
const SOURCE_ROOT = join(homedir(), 'Downloads', 'wp-content-uploads')
const UPLOADS_DIR = SOURCE_ROOT

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
  process.env.R2_ENDPOINT ??
  `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`

const s3 = new S3Client({
  region: 'auto',
  endpoint,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

const BUCKET = process.env.R2_BUCKET!

async function walkDir(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const files: string[] = []
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walkDir(full)))
    } else if (ALLOWED_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      files.push(full)
    }
  }
  return files
}

async function existsInR2(key: string): Promise<boolean> {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }))
    return true
  } catch {
    return false
  }
}

async function uploadFile(filePath: string): Promise<'uploaded' | 'skipped' | 'failed'> {
  // key = "uploads/2024/06/photo.jpg"
  const key = 'uploads/' + relative(SOURCE_ROOT, filePath).replace(/\\/g, '/')

  try {
    if (await existsInR2(key)) return 'skipped'

    const ext = extname(filePath).toLowerCase()
    const contentType = MIME_TYPES[ext] ?? 'application/octet-stream'
    const { size } = statSync(filePath)

    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: createReadStream(filePath),
        ContentType: contentType,
        ContentLength: size,
      }),
    )
    return 'uploaded'
  } catch (err) {
    console.error(`  FAILED: ${key}`, (err as Error).message)
    return 'failed'
  }
}

async function run() {
  if (!process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY || !BUCKET) {
    console.error('Missing R2 credentials. Check R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET in .env')
    process.exit(1)
  }

  console.log(`Scanning ${UPLOADS_DIR} …`)
  const files = await walkDir(UPLOADS_DIR)
  const total = files.length
  console.log(`Found ${total} media files. Starting upload with concurrency=${CONCURRENCY}…\n`)

  let uploaded = 0
  let skipped = 0
  let failed = 0
  let processed = 0

  // Process in batches of CONCURRENCY
  for (let i = 0; i < files.length; i += CONCURRENCY) {
    const batch = files.slice(i, i + CONCURRENCY)
    const results = await Promise.all(batch.map(uploadFile))

    for (const result of results) {
      processed++
      if (result === 'uploaded') uploaded++
      else if (result === 'skipped') skipped++
      else failed++
    }

    process.stdout.write(`\rUploaded ${uploaded}/${total} files  (skipped ${skipped}, failed ${failed}) …`)
  }

  console.log(`\n\n─────────────────────────────────────────`)
  console.log(`Total files  : ${total}`)
  console.log(`Uploaded     : ${uploaded}`)
  console.log(`Skipped      : ${skipped}`)
  console.log(`Failed       : ${failed}`)
  console.log(`─────────────────────────────────────────`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
