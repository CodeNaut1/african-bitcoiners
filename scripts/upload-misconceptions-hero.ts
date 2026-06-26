import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'

const WP_URL =
  'https://bitcoiners.africa/wp-content/uploads/2024/04/African-Bitcoiners_Bitoin_Misconceptions_hero.png'
const KEY = 'uploads/2024/04/African-Bitcoiners_Bitoin_Misconceptions_hero.png'

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

  try {
    await s3.send(new HeadObjectCommand({ Bucket: BUCKET, Key: KEY }))
    console.log('Already exists:', KEY)
    return
  } catch {
    // upload
  }

  const res = await fetch(WP_URL)
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${WP_URL}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: KEY,
      Body: buf,
      ContentType: 'image/png',
      ContentLength: buf.length,
    }),
  )
  console.log('Uploaded', KEY, buf.length, 'bytes')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
