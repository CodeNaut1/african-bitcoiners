import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'

const WP = 'https://bitcoiners.africa/wp-content/uploads'
const FILES = [
  '2025/01/African-Bitcoiners-Hall-of-fame-bg.png',
  '2025/01/Farida-Nabourema.png',
  '2025/01/Kgothatso-Ngako.png',
  '2025/01/Lorraine-Marcel.png',
  '2025/12/hall-of-fame-abubakar.png',
  '2026/01/hall-of-fame-abubakar-square-879x1024.png',
  '2025/01/Lorraine-Marcel-full.png',
  '2025/01/Kgothatso-Ngako-full.png',
  '2025/01/Farida-Nabourema-full.png',
]

function contentType(path: string) {
  if (path.endsWith('.svg')) return 'image/svg+xml'
  if (path.endsWith('.png')) return 'image/png'
  if (path.endsWith('.jpg') || path.endsWith('.jpeg')) return 'image/jpeg'
  return 'application/octet-stream'
}

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

  for (const rel of FILES) {
    const key = `uploads/${rel}`
    try {
      await s3.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }))
      console.log('skip', key)
      continue
    } catch {
      // upload
    }
    const url = `${WP}/${rel}`
    const res = await fetch(url)
    if (!res.ok) {
      console.error('FAIL fetch', url, res.status)
      continue
    }
    const buf = Buffer.from(await res.arrayBuffer())
    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: buf,
        ContentType: contentType(rel),
        ContentLength: buf.length,
      }),
    )
    console.log('uploaded', key, buf.length)
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
