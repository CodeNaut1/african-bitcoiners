const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export type CommunityCard = {
  title: string
  description: string
  image: string
  imageWidth: number
  imageHeight: number
  imageFit?: 'cover' | 'contain'
  imagePosition?: 'top' | 'center'
  href?: string
  years?: { year: number; href: string }[]
}

export const CARDS: CommunityCard[] = [
  {
    title: 'Africa Bitcoin Ecosystem (Live Directory)',
    description: 'Get a visual breakdown of Bitcoin projects, communities, and initiatives across the continent.',
    image: `${R2}/uploads/2024/11/Community-Africa-Bitcoin-Ecosystem.png`,
    imageWidth: 340,
    imageHeight: 240,
    href: '/african-bitcoin-ecosystem',
  },
  {
    title: 'Most Impactful African Bitcoiners',
    description: 'Join us in recognizing their impact and supporting the next wave of African Bitcoin pioneers.',
    image: `${R2}/uploads/2024/11/Community-Most-Impactful-African-Bitcoiner.png`,
    imageWidth: 341,
    imageHeight: 240,
    years: [
      { year: 2022, href: '/the-most-impactful-african-bitcoiners-of-2022' },
      { year: 2023, href: '/the-most-impactful-african-bitcoiners-of-2023' },
      { year: 2024, href: '/the-most-impactful-african-bitcoiners-of-2024' },
    ],
  },
  {
    title: 'African Bitcoin Treasury Manifesto',
    description: 'A manifesto for forward thinking entrepreneurs ready to lead Africa\u2019s financial future.',
    image: `${R2}/uploads/2025/09/side-image-manifesto.png`,
    imageWidth: 584,
    imageHeight: 897,
    imageFit: 'cover',
    imagePosition: 'top',
    href: '/african-bitcoin-treasury-manifesto',
  },
  {
    title: 'African Bitcoin Meetups',
    description: 'Bitcoin meetups are one of the most potent tools for Bitcoin education and adoption in Africa.',
    image: `${R2}/uploads/2024/11/Community-African-Bitcoin-Meetups.png`,
    imageWidth: 340,
    imageHeight: 240,
    href: '/bitcoin-meetups',
  },
  {
    title: 'Most Impactful Bitcoiner Nomination',
    description: 'Join us in recognizing their impact and supporting the next wave of African Bitcoin pioneers.',
    image: `${R2}/uploads/2024/11/Community-Most-Impactful-African-Bitcoiner.png`,
    imageWidth: 341,
    imageHeight: 240,
    href: '/most-impactful-nominations',
  },
]

export const LINKS = {
  feedbackBounty: '/earn-bitcoin/1000-sats-feedback-bounty',
}
