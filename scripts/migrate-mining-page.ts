/**
 * Migrates the "Bitcoin Mining in Africa" page to match the live WordPress version:
 *   1. Uploads all page images (hero, section illustrations, org logos) from the
 *      live WP site into R2 + Payload Media (deduped by filename).
 *   2. Upserts the mining-orgs collection with the real WP directory data + logos.
 *   3. Rewrites the page content blocks with the real WP copy + wired images.
 *
 * Usage: pnpm tsx --env-file=.env scripts/migrate-mining-page.ts
 */

import { getPayload } from 'payload'
import config from '@/payload.config'

type Payload = Awaited<ReturnType<typeof getPayload>>

const WP = 'https://bitcoiners.africa/wp-content/uploads'
const REPORT_PDF = `${WP}/2025/08/African-Bitcoiners-Mining-Report-2025-Latest-OFFICIAL.pdf`

const MIME: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  svg: 'image/svg+xml',
}

// ── Images to migrate ──────────────────────────────────────────────────────
const IMAGES: Record<string, { url: string; alt: string }> = {
  heroBg: { url: `${WP}/2025/03/Bitcoin-Mining-in-Africa-hero-bg.png`, alt: 'Bitcoin mining hardware in Africa' },
  landscape: { url: `${WP}/2025/03/Bitcoin-Mining-Lanscape_11zon.png`, alt: 'African landscape powering Bitcoin mining' },
  miningRig: { url: `${WP}/2025/03/mining-rig-illustr-1.png`, alt: 'Bitcoin mining rig illustration' },
  bigblock: { url: `${WP}/2025/03/Big-Block-DC-Bitcoin-removebg-preview.png`, alt: 'Big Block DC Bitcoin logo' },
  hashlabs: { url: `${WP}/2024/06/hashlabs-mining.jpg`, alt: 'Hashlabs Mining logo' },
  qrb: { url: `${WP}/2024/06/QRB_logo.png`, alt: 'QRB Labs logo' },
  westdata: { url: `${WP}/2024/10/West-Data-Group-logo.jpg`, alt: 'West Data Group logo' },
  quantum: { url: `${WP}/2024/06/Quantum-Hash.jpg`, alt: 'Quantum Hash logo' },
  namibia: { url: `${WP}/2024/03/African-Bitcoiners_Bitcoin-Mining-Namibia_logo.jpg`, alt: 'Bitcoin Mining Namibia logo' },
  trojan: { url: `${WP}/2024/03/African-Bitcoiners_Trojan-Mining-Nigeria-logo.jpg`, alt: 'Trojan Mining logo' },
  shuga: { url: `${WP}/2024/06/Shuga-Mine.jpg`, alt: 'Shuga Mines logo' },
  nrg: { url: `${WP}/2025/03/NGR-Bloom-Bitcoin-mining.webp`, alt: 'NRG Bloom logo' },
  gridless: { url: `${WP}/2024/03/African-Bitcoiners_Gridless-mining-logo.jpg`, alt: 'Gridless logo' },
  gama: { url: `${WP}/2024/10/GAMA-African-Bitcoin-Mining-Summit.jpg`, alt: 'GAMA Africa logo' },
}

// ── Mining orgs (in WP display order) ───────────────────────────────────────
const ORGS: {
  name: string
  country: string
  countryFlagCode?: string
  description: string
  websiteURL?: string
  twitterURL?: string
  logoKey: keyof typeof IMAGES
}[] = [
  {
    name: 'Big Block DC Bitcoin',
    country: 'Democratic Republic of Congo',
    countryFlagCode: 'CD',
    description:
      "Located in the Democratic Republic of Congo, Big Block DC Bitcoin utilizes Africa's rich hydroelectric power to mine Bitcoin sustainably.",
    websiteURL: 'https://www.bdatacenter.fr/',
    twitterURL: 'https://twitter.com/BigBlock_DC',
    logoKey: 'bigblock',
  },
  {
    name: 'Hashlabs Mining',
    country: 'Ethiopia',
    countryFlagCode: 'ET',
    description:
      "A leader in Ethiopia's mining sector, Hashlabs Mining is leveraging low-cost hydropower to drive cost-efficient Bitcoin mining.",
    websiteURL: 'https://www.hashlabsmining.io/',
    twitterURL: 'https://twitter.com/HashlabsMining',
    logoKey: 'hashlabs',
  },
  {
    name: 'QRB Labs',
    country: 'Ethiopia',
    countryFlagCode: 'ET',
    description:
      "QRB Labs specializes in optimizing Bitcoin mining operations in Ethiopia, tapping into the country's renewable energy resources.",
    websiteURL: 'https://www.qrb-labs.com/',
    twitterURL: 'https://x.com/qrb_labs',
    logoKey: 'qrb',
  },
  {
    name: 'West Data Group',
    country: 'Ethiopia',
    countryFlagCode: 'ET',
    description:
      "With a focus on energy-efficient Bitcoin mining, West Data Group is one of Ethiopia's key players in the industry.",
    websiteURL: 'http://www.westdataholding.com/',
    twitterURL: 'https://x.com/WestDataGroup',
    logoKey: 'westdata',
  },
  {
    name: 'Quantum Hash',
    country: 'Zambia',
    countryFlagCode: 'ZM',
    description:
      "Quantum Hash leverages Zambia's geothermal and hydro resources to power its mining operations, offering a greener alternative to traditional mining.",
    websiteURL: 'https://quantumhash.co/',
    twitterURL: 'https://x.com/QuantumHashCo',
    logoKey: 'quantum',
  },
  {
    name: 'Bitcoin Mining Namibia',
    country: 'Namibia',
    countryFlagCode: 'NA',
    description:
      "Operating in Namibia, this initiative utilizes solar and wind energy to power Bitcoin mining in one of Africa's sunniest regions.",
    websiteURL: 'https://linktr.ee/btcnamibia',
    twitterURL: 'https://twitter.com/BTCMiningNam',
    logoKey: 'namibia',
  },
  {
    name: 'Trojan Mining',
    country: 'Nigeria',
    countryFlagCode: 'NG',
    description:
      'Trojan Mining is another key player in Nigeria, utilizing hydroelectric and off-grid energy solutions to mine Bitcoin sustainably.',
    websiteURL: 'https://www.trojanmining.com/',
    twitterURL: 'https://twitter.com/TrojanMining',
    logoKey: 'trojan',
  },
  {
    name: 'Shuga Mines',
    country: 'Nigeria',
    countryFlagCode: 'NG',
    description:
      'Shuga Mines is at the forefront of Bitcoin mining in Nigeria, working with grid operators and renewable energy sources to enhance mining efficiency.',
    websiteURL: 'https://shugamine.com/',
    twitterURL: 'https://twitter.com/ShugaMines',
    logoKey: 'shuga',
  },
  {
    name: 'NRG Bloom',
    country: 'Nigeria',
    countryFlagCode: 'NG',
    description:
      'NRG Bloom is repurposing wasted energy for sustainable Bitcoin mining, empowering African communities with clean power and social impact.',
    websiteURL: 'https://www.nrgbloom.com',
    twitterURL: 'https://x.com/NRGBloom',
    logoKey: 'nrg',
  },
  {
    name: 'Gridless',
    country: 'Pan-African',
    description:
      'Gridless is revolutionizing Bitcoin mining in Kenya by integrating small-scale mining operations into rural energy projects, bringing electricity to underserved communities.',
    websiteURL: 'https://gridlesscompute.com/',
    twitterURL: 'https://twitter.com/GridlessCompute',
    logoKey: 'gridless',
  },
  {
    name: 'GAMA Africa',
    country: 'GAMA Africa',
    description:
      'GAMA Africa is a pan-African mining initiative, bringing together stakeholders from across the continent to drive Bitcoin mining innovation and sustainability.',
    websiteURL: 'https://www.gama.africa/',
    logoKey: 'gama',
  },
]

// ── Lexical helpers ─────────────────────────────────────────────────────────
const txt = (text: string, format = 0) => ({
  type: 'text',
  text,
  format,
  style: '',
  mode: 'normal',
  detail: 0,
  version: 1,
})

const para = (children: any[]) => ({
  type: 'paragraph',
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr',
  textFormat: 0,
  children,
})

const heading = (text: string, tag = 'h2') => ({
  type: 'heading',
  tag,
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr',
  children: [txt(text)],
})

const link = (label: string, url: string) => ({
  type: 'link',
  version: 3,
  format: '',
  indent: 0,
  direction: 'ltr',
  fields: { linkType: 'custom', newTab: true, url },
  children: [txt(label)],
})

const root = (children: any[]) => ({
  root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children },
})

const advantage = (lead: string, rest: string) => para([txt(`${lead} `, 1), txt(`– ${rest}`)])

async function findByFilename(payload: Payload, filename: string) {
  const r = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
    overrideAccess: true,
  })
  return r.docs[0] ?? null
}

async function uploadImage(payload: Payload, url: string, alt: string) {
  const filename = decodeURIComponent(new URL(url).pathname.split('/').pop() ?? 'image')
  const existing = await findByFilename(payload, filename)
  if (existing) return existing
  const res = await fetch(url, {
    headers: { 'User-Agent': 'AfricanBitcoiners-Migration/1.0' },
    signal: AbortSignal.timeout(60_000),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const ext = filename.split('.').pop()?.toLowerCase() ?? 'png'
  return payload.create({
    collection: 'media',
    data: { alt },
    file: { data: buffer, name: filename, mimetype: MIME[ext] ?? 'image/png', size: buffer.length },
    overrideAccess: true,
  })
}

async function upsertOrg(payload: Payload, data: any) {
  const existing = await payload.find({
    collection: 'mining-orgs',
    where: { name: { equals: data.name } },
    limit: 1,
    overrideAccess: true,
  })
  if (existing.docs[0]) {
    return payload.update({
      collection: 'mining-orgs',
      id: existing.docs[0].id,
      data,
      overrideAccess: true,
    })
  }
  return payload.create({ collection: 'mining-orgs', data, overrideAccess: true })
}

async function run() {
  const payload = await getPayload({ config })

  // 1. Upload all images
  console.log('── Uploading images ──')
  const media: Record<string, any> = {}
  for (const [key, img] of Object.entries(IMAGES)) {
    const m = await uploadImage(payload, img.url, img.alt)
    media[key] = m
    console.log(`  ${key.padEnd(10)} -> ${(m as any).url}`)
  }

  // 2. Upsert mining orgs (sequential to preserve createdAt ordering = WP order)
  console.log('\n── Upserting mining orgs ──')
  for (const org of ORGS) {
    const logo = media[org.logoKey]
    const { logoKey, ...rest } = org
    await upsertOrg(payload, { ...rest, isActive: true, logoImage: logo?.id })
    console.log(`  ${org.name}`)
  }

  // 3. Rewrite page content
  console.log('\n── Updating page content ──')
  const pages = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'bitcoin-mining-in-africa' } },
    limit: 1,
    overrideAccess: true,
  })
  const page = pages.docs[0]
  if (!page) throw new Error('Page bitcoin-mining-in-africa not found')

  const content = [
    {
      blockType: 'hero',
      layout: 'text-left-image-right',
      heading: "Unlocking Africa's Potential in *Bitcoin Mining*",
      subheading: root([
        para([
          txt(
            'Africa is emerging as a powerhouse in the global Bitcoin mining landscape, leveraging abundant renewable energy sources and growing technological ecosystems. With rising interest from international investors and local innovators, the continent presents a unique opportunity for cost-efficient and sustainable Bitcoin mining. Would you like to list a Bitcoin mining organisation?',
          ),
        ]),
      ]),
      backgroundType: 'dark',
      images: [{ image: media.heroBg.id, alt: IMAGES.heroBg.alt }],
      links: [
        {
          link: {
            type: 'custom',
            newTab: true,
            url: REPORT_PDF,
            label: 'Download Africa Bitcoin Mining Report 2025',
            appearance: 'default',
          },
        },
      ],
    },
    {
      blockType: 'miningDirectory',
      heading: 'Key Bitcoin Mining Operations In Africa',
      subheading:
        'From hydro-powered mining farms to solar-driven data centers, these companies are pioneering Bitcoin mining across Africa.',
      groupByCountry: true,
      showAddListingButton: true,
      addListingUrl: '#mining-form',
    },
    {
      blockType: 'richContent',
      backgroundColor: 'cream',
      imagePosition: 'left',
      sideImage: media.landscape.id,
      content: root([
        heading('Why Africa? A Unique Advantage in Bitcoin Mining'),
        advantage(
          'Abundant Renewable Energy',
          'With vast hydro, solar, wind, and geothermal resources, Africa offers some of the most cost-effective and sustainable mining conditions.',
        ),
        advantage(
          'Lower Energy Costs',
          'Electricity costs in certain African countries range from as low as $0.03/kWh, making Bitcoin mining in those regions significantly more profitable.',
        ),
        advantage(
          'Regulatory Flexibility',
          'Unlike North America or China, Africa provides a more adaptable regulatory environment, allowing early movers to shape the mining industry.',
        ),
        advantage(
          'Economic Growth & Electrification',
          'Many mining operations are contributing to rural electrification projects, bringing steady power to local communities for the first time.',
        ),
        para([link('Download Africa Bitcoin Mining Report 2025', REPORT_PDF)]),
      ]),
    },
    {
      blockType: 'richContent',
      backgroundColor: 'white',
      imagePosition: 'right',
      sideImage: media.miningRig.id,
      content: root([
        heading('Investing in the Future of Bitcoin Mining in Africa'),
        para([
          txt(
            "With global energy costs rising and Bitcoin's mining difficulty increasing, Africa stands out as an attractive destination for Bitcoin miners looking to maximize profits while embracing sustainability. Whether you're a miner, investor, or policymaker, Africa is the frontier of the next Bitcoin mining revolution.",
          ),
        ]),
        para([link('Download Africa Bitcoin Mining Report 2025', REPORT_PDF)]),
      ]),
    },
    {
      blockType: 'formEmbed',
      formType: 'mining-directory',
      heading: 'Submit a Mining Organization in Africa',
      subheading: 'Know a Bitcoin mining operation in Africa that should be listed here?',
      backgroundColor: 'cream',
    },
  ]

  await payload.update({
    collection: 'pages',
    id: page.id,
    data: { content: content as any },
    overrideAccess: true,
  })
  console.log('  Page content updated.')

  console.log('\nDone.')
  await payload.db.destroy?.()
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
