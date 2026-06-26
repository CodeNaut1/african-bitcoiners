import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'
import { readFileSync, statSync } from 'fs'
import { join } from 'path'

const SOURCE_DIR = '/tmp'
const FILES = [
  'img1.png',
  'img-2.png',
  'img-3.png',
  'img-4.png',
  'img5.png',
  'img7.png',
  'img9.png',
]

async function run() {
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

  for (const file of FILES) {
    const key = `uploads/2022/10/${file}`
    const filePath = join(SOURCE_DIR, file)
    try {
      await s3.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }))
      console.log('Exists:', key)
      continue
    } catch {
      // upload
    }
    const buf = readFileSync(filePath)
    const { size } = statSync(filePath)
    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: buf,
        ContentType: 'image/png',
        ContentLength: size,
      }),
    )
    console.log('Uploaded:', key, size, 'bytes')
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
