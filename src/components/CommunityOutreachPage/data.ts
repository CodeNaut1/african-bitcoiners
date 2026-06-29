const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export type OutreachCard = {
  title: string
  description: string
  image: string
  imageWidth: number
  imageHeight: number
  href: string
}

export const CARDS: OutreachCard[] = [
  {
    title: 'Community Builders Initiative',
    description:
      'Empower passionate Bitcoiners to grow local communities through meetups and orange-pilling events across Africa.',
    image: `${R2}/uploads/2025/04/Start-Here-Community-Builders-Initiative.png`,
    imageWidth: 545,
    imageHeight: 348,
    href: '/african-bitcoiners-community-builders',
  },
  {
    title: 'Bitcoin Meetups',
    description:
      'Find or start a meetup near you. Real connections are one of the most powerful tools for Bitcoin adoption in Africa.',
    image: `${R2}/uploads/2024/11/Community-African-Bitcoin-Meetups.png`,
    imageWidth: 340,
    imageHeight: 240,
    href: '/bitcoin-meetups',
  },
  {
    title: 'Bitcoin Education Partnership',
    description:
      'Partner with us to bring Bitcoin education to your organisation, school, or community group across the continent.',
    image: `${R2}/uploads/2025/04/Start-Here-Bitcoin-Education-Partnership.png`,
    imageWidth: 545,
    imageHeight: 348,
    href: '/bitcoin-education-partnership',
  },
  {
    title: 'Africa Bitcoin Ecosystem',
    description:
      'Explore projects, communities, and businesses building on Bitcoin across Africa — and find your place in the network.',
    image: `${R2}/uploads/2024/11/Community-Africa-Bitcoin-Ecosystem.png`,
    imageWidth: 340,
    imageHeight: 240,
    href: '/african-bitcoin-ecosystem',
  },
  {
    title: 'Connect with Us',
    description:
      'Reach out to collaborate, host an event, or bring African Bitcoiners to your community. We would love to hear from you.',
    image: `${R2}/uploads/2024/11/Community-Most-Impactful-African-Bitcoiner.png`,
    imageWidth: 341,
    imageHeight: 240,
    href: '/about-us/connect-with-us',
  },
]

export const LINKS = {
  community: '/community',
  newsletter: '/bitcoin-newsletter',
  feedbackBounty: '/earn-bitcoin/1000-sats-feedback-bounty',
}
