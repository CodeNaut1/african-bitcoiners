const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export type SpendCard = {
  title: string
  description: string
  image: string
  imageWidth: number
  imageHeight: number
  href: string
}

export const CARDS: SpendCard[] = [
  {
    title: 'Bitcoiners Map',
    description: 'Find physical stores and businesses around you where you can spend Bitcoin',
    image: `${R2}/uploads/2024/11/Spend-Bitcoin-Bitcoiners-Map.png`,
    imageWidth: 341,
    imageHeight: 240,
    href: '/spend-bitcoin/bitcoiners-map',
  },
  {
    title: 'Places To Spend Sats Online',
    description: 'Find a list of online stores where you can purchase goods and services with Bitcoin.',
    image: `${R2}/uploads/2024/11/Spend-Bitcoin-Places-to-Spend-Bitcoin.png`,
    imageWidth: 340,
    imageHeight: 240,
    href: '/spend-bitcoin/places-to-spend-bitcoin',
  },
]

export const LINKS = {
  feedbackBounty: '/earn-bitcoin/1000-sats-feedback-bounty',
}

export const SEO = {
  title: 'Spend Bitcoin',
  description:
    'Find vendors and services that accept Bitcoin as payment. Explore the Bitcoiners Map and places to spend sats online across Africa.',
}
