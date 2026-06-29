import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'

const WP = 'https://bitcoiners.africa/wp-content/uploads'
const FILES = [
  '2025/12/abubakar-kalil-e1764943505492.png',
  '2025/12/Carel-van-Wyk-e1764932098210.png',
  '2025/12/hermann-vivier.png',
  '2025/12/bernard.png',
  '2025/12/Janet-MIAB.png',
  '2025/12/Femi-Longe-MIAB.png',
  '2025/12/Ronnie-MIAB.png',
  '2025/11/Sabina-MIAB.png',
  '2025/11/Heritage-MIAB.png',
  '2025/11/Nourou-MIAB.png',
  '2025/11/Alphonse-MIAB.png',
  '2025/11/Brindon-MIAB.png',
  '2025/11/Prince_MIAB-removebg-preview-e1763728448271.png',
  '2025/11/Felix-MIAB.png',
  '2025/11/Theophilus-MIAB.png',
  '2025/11/Mawufemor-Kofi-Folivi-MIAB.png',
  '2025/11/Gleen-Jooste-MIAB.png',
  '2025/11/Gloire-MIAB.png',
  '2025/11/Nzonda-image.png',
  '2025/11/Belyi_MIAB-image-2-e1762945471730.png',
  '2025/11/Grant-Gombwa-MIAB-image.png',
  '2025/11/image-scaled.png',
  '2025/11/Frame-1000008239.png',
  '2024/10/Trezor_Academy_Logo_Black.svg',
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
