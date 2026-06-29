const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export type ResourceCard = {
  title: string
  description: string
  href: string
  image: string
  imageWidth: number
  imageHeight: number
  external?: boolean
}

export const CARDS: ResourceCard[] = [
  {
    title: 'The Bitcoiner Test Technical',
    description: 'A challenge for serious Bitcoiners. Take this test to prove your deep knowledge.',
    href: 'https://bitcoinertest.com/',
    image: `${R2}/uploads/2025/04/Start-Here-The-Bitcoiner-Test.png`,
    imageWidth: 414,
    imageHeight: 265,
    external: true,
  },
  {
    title: 'Bitcoin Mining in Africa',
    description: 'Understand how mining powers the Bitcoin network and why Africa could be the future of it.',
    href: '/bitcoin-mining-in-africa',
    image: `${R2}/uploads/2025/04/Start-Here-Bitcoin-Mining-in-Africa.png`,
    imageWidth: 545,
    imageHeight: 348,
  },
  {
    title: 'African Bitcoin Ecosystem',
    description: 'From grassroots devs to global impact, see how Africa is building on Bitcoin.',
    href: '/african-bitcoin-ecosystem',
    image: `${R2}/uploads/2025/04/Start-Here-Africa-Bitcoin-Ecosystem.png`,
    imageWidth: 545,
    imageHeight: 348,
  },
  {
    title: 'Bitcoin Education Partnership',
    description: 'Got feedback? Earn Bitcoin by helping us improve. Your voice = 1000 sats.',
    href: '/bitcoin-education-partnership',
    image: `${R2}/uploads/2025/04/Start-Here-Bitcoin-Education-Partnership.png`,
    imageWidth: 545,
    imageHeight: 348,
  },
  {
    title: 'African Bitcoiners Graduate Program',
    description: 'Looking for a career in Bitcoin? Our program opens doors to work with leading companies in the space.',
    href: '/graduate-program',
    image: `${R2}/uploads/2025/04/Start-Here-Graduate-Program.png`,
    imageWidth: 545,
    imageHeight: 348,
  },
  {
    title: 'Community Builders Initiative',
    description: "You've got the passion, now get the tools. Help us grow the movement across Africa.",
    href: '/african-bitcoiners-community-builders',
    image: `${R2}/uploads/2025/04/Start-Here-Community-Builders-Initiative.png`,
    imageWidth: 545,
    imageHeight: 348,
  },
  {
    title: 'Where to Spend Bitcoin In Africa',
    description:
      "Already stacking sats? Here's where you can actually use them, restaurants, stores, and services that accept Bitcoin near you.",
    href: '/spend-bitcoin/places-to-spend-bitcoin',
    image: `${R2}/uploads/2025/04/Start-Here-Spend-Bitcoin-in-Africa.png`,
    imageWidth: 545,
    imageHeight: 348,
  },
]

export const LINKS = {
  feedbackBounty: '/earn-bitcoin/1000-sats-feedback-bounty',
}
