import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'

const WP = 'https://bitcoiners.africa/wp-content/uploads'
const FILES = [
  '2024/06/African_Bitcoiners_meetups-2.png',
  '2023/09/bookclub_header.png',
  '2024/03/African-Bitcoiners_Stellenbosch_Meetup_logo-e1717509925368.jpg',
  '2024/05/African_bitcoiners_bff_meetup.png',
  '2024/05/bitcoin_capetwon_meetup.png',
  '2024/06/Bitcoin-Johannesburg.png',
  '2024/06/Bitcoin-Loxion-Meetup.jpg',
  '2024/06/Bitdevs-abuja.jpg',
  '2024/06/Bitdevs-nairobi.jpg',
  '2025/03/bitdevs-accra.jpg',
  '2025/03/bitdevs-lagos.jpg',
  '2025/04/bitdevsjoburg.jpg',
  'elementor/thumbs/Bitcoin-Nairobi-rnr4cacu9ot7bvukjwlbjednoqhsrooasn32lpcvc0.jpeg',
  'elementor/thumbs/bitcoin-nairobi-conference-e1779311948106-rnr574g7968otnki8uwrzlboedir9ev647p98kf6p8.jpeg',
  'elementor/thumbs/Bitcoin-Mastermind-2026-rnr5lcq9xqi3yudzedve30z8zsdbt9l0bp34xajd0g.jpg',
  'elementor/thumbs/plett-r44hxfkoow53wh5sz271dceyfh5v2hkzxbqyc3aiik.jpeg',
  'elementor/thumbs/watchpartycouple-scaled-qh22h3bq3lxcnx49qdp5botqmqeumkitxcb5w1igb4.jpg',
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
