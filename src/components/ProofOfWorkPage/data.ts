const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const IMG = {
  metricsBg: `${R2}/uploads/2026/05/Metrics-bg.png`,
  bitcoinKeys: `${R2}/uploads/2026/05/Bitcoin-keys.png`,
  bitcoinFlower: `${R2}/uploads/2026/05/bitcoin-flower.png`,
  supportQr: `${R2}/uploads/2022/10/African-Bitcoiners-QR-code.png`,
  afrHero: `${R2}/uploads/2026/05/AFR-Hero.png`,
  bfbHero: `${R2}/uploads/2026/05/BFB-Hero.png`,
  tbtHero: `${R2}/uploads/2026/05/TBT-Hero.png`,
  s2dHero: `${R2}/uploads/2026/05/S2D-Herio.png`,
  ecosystemHero: `${R2}/uploads/2026/05/Ecosystem-hero.png`,
  directoryHero: `${R2}/uploads/2026/05/ab-directory2.png`,
  newsMockup: `${R2}/uploads/2026/05/Africa-bitcoin-news-mockup.png`,
  zapads: `${R2}/uploads/2026/05/zapads.png`,
  lnMarketplace: `${R2}/uploads/2026/05/ln-marketplace.png`,
} as const

export const RECEIPT_METRICS = [
  { label: 'Bootcamp graduates', value: '500+' },
  { label: 'Countries reached', value: '14' },
  { label: 'Newsletters Sent', value: '178' },
  { label: 'Developers trained', value: '500+' },
  { label: 'Book clubs hosted', value: '170' },
  { label: 'Products shipped', value: '10+' },
  { label: 'Community', value: '10k+' },
  { label: 'Years of building', value: '4' },
  { label: 'Projects tracked', value: '170+' },
] as const

export const PROJECTS = [
  {
    title: 'Africa Free Routing',
    description: 'Lightning developer bootcamps and infrastructure making Bitcoin more accessible across Africa',
    href: 'https://freerouting.africa/',
    image: IMG.afrHero,
    width: 473,
    height: 350,
  },
  {
    title: 'Bitcoin for Beginners Course',
    titleLines: ['Bitcoin for Beginners', 'Course'],
    description: 'Delivered across 3 modes including Email, website and Telegram',
    descriptionHtml: 'Delivered across 3 modes including <strong>Email</strong>, <strong>website</strong> and <strong>Telegram</strong>',
    href: '/learn-bitcoin/free-bitcoin-course/',
    image: IMG.bfbHero,
    width: 450,
    height: 342,
  },
  {
    title: 'The Bitcoiner Test',
    description:
      'Industry-standard Bitcoin knowledge assessment used across 21+ countries. Helping companies identify real Bitcoin talent',
    href: 'https://bitcoinertest.com/',
    image: IMG.tbtHero,
    width: 473,
    height: 350,
  },
  {
    title: 'Sats2Data',
    description: 'Buy airtime and data using Bitcoin across 40 African countries',
    href: 'https://sats2data.africa/',
    image: IMG.s2dHero,
    width: 452,
    height: 344,
  },
  {
    title: 'African Bitcoin Ecosystem',
    titleLines: ['African Bitcoin', 'Ecosystem'],
    description: 'Quarterly research mapping Bitcoin-only projects across Africa',
    href: '/african-bitcoin-ecosystem/',
    image: IMG.ecosystemHero,
    width: 952,
    height: 694,
  },
  {
    title: 'Live Directory',
    description:
      'A dynamic, continuously updated database of African Bitcoin projects — making discovery, connection, and collaboration easier.',
    href: 'https://directory.bitcoiners.africa/',
    image: IMG.directoryHero,
    width: 464,
    height: 340,
  },
  {
    title: 'Africa Bitcoin News',
    description:
      'A Bitcoin-only media platform covering news, insights, and stories shaping Bitcoin adoption across Africa',
    href: 'https://bitcoinnews.africa/',
    image: IMG.newsMockup,
    width: 808,
    height: 612,
  },
  {
    title: 'Zapads',
    description: 'Enabling AI agents to pay for other AI agent services using Bitcoin',
    href: 'https://www.zapads.ai/',
    image: IMG.zapads,
    width: 450,
    height: 297,
  },
  {
    title: 'Lightning Developer Bootcamps',
    titleLines: ['Lightning Developer', 'Bootcamps'],
    description:
      'Hands-on training equipping African developers to build real-world Bitcoin and Lightning applications',
    href: 'https://freerouting.africa/bootcamps/',
    image: IMG.lnMarketplace,
    width: 482,
    height: 354,
  },
] as const

export const TESTIMONIALS = [
  {
    quote:
      'We really wanted to share what Africa Free Routing Bootcamp has done to get our community growing. The bootcamp is actually the biggest catalyst of our growth and the most exciting highlight so far.',
    name: 'Bicoin Zambia',
    initials: 'BZ',
    color: '#FCB33D',
  },
  {
    quote:
      "Massive! Thanks for being a torch bearer of Bitcoin across the continent! Appreciate all you've done.",
    name: 'Tando',
    initials: 'T',
    color: '#F58C00',
  },
  {
    quote:
      'Visit http://bitcoiners.africa to learn about Bitcoin, which is free for all Africans. Significant efforts have been made to empower Africans financially. Thanks to the founders of African Bitcoiners; the African Bitcoin Ecosystem is blessed.',
    name: 'Aliyu',
    initials: 'A',
    color: '#2E7D32',
  },
  {
    quote: 'Really love the new interactive African Bitcoin Ecosystem by @afribitcoiners! Well done!',
    name: 'Trezor Academy',
    initials: 'T',
    color: '#FFA726',
  },
  {
    quote: "I highly recommend this [2] anyone especially if you're learning on this one.",
    name: '@Scarlette_Melon',
    initials: 'S',
    color: '#FF6F00',
  },
] as const

export const SUPPORT_BULLETS = [
  'Funds free Bitcoin education across Africa',
  'Supports Lightning Developer Bootcamps',
  'Builds tools for real Bitcoin usage',
  'Expands access in underserved communities',
] as const
