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
    title: 'The Bitcoiner Test Non Technical',
    description: 'Curious how much you know? Take our 21minutes spit-fire quiz.',
    href: 'https://bitcoinertest.com/',
    image: `${R2}/uploads/2025/04/Start-Here-The-Bitcoiner-Test.png`,
    imageWidth: 414,
    imageHeight: 265,
    external: true,
  },
  {
    title: 'How to Set Up Your Bitcoin Cold Storage for Free',
    description:
      "You don't need a fancy device to secure your Bitcoin. We'll show you how to do it safely, step by step.",
    href: '/save-bitcoin/how-to-setup-your-bitcoin-cold-storage-for-free',
    image: `${R2}/uploads/2025/04/Start-Here-Setup-Bitcoin-Cold-Storage.png`,
    imageWidth: 545,
    imageHeight: 348,
  },
  {
    title: 'How to Keep Bitcoin in Your Head',
    description: "Learn how to memorize your keys. Seriously. It's simpler than you think, and powerful.",
    href: '/learn-bitcoin/how-to-keep-bitcoin-in-your-head',
    image: `${R2}/uploads/2025/04/Start-Here-Keep-Bitcoin-in-Your-Head.png`,
    imageWidth: 545,
    imageHeight: 348,
  },
  {
    title: '1000 Sats Feedback Bounty',
    description: 'Got feedback? Earn Bitcoin by helping us improve. Your voice = 1000 sats.',
    href: '/earn-bitcoin/1000-sats-feedback-bounty',
    image: `${R2}/uploads/2025/04/Start-Here-Feedback-Bounty.png`,
    imageWidth: 545,
    imageHeight: 348,
  },
  {
    title: 'Bitcoin Meetups',
    description: 'Real people, real connections. Find a local Bitcoin meetup and feel the energy of the movement.',
    href: '/bitcoin-meetups',
    image: `${R2}/uploads/2025/04/Start-Here-Bitcoin-Meetups.png`,
    imageWidth: 545,
    imageHeight: 348,
  },
  {
    title: 'Earning Bitcoin',
    description: 'Looking to earn sats with your skills? Start here, safe, simple, and scam-free.',
    href: '/earn-bitcoin/places-to-earn-sats',
    image: `${R2}/uploads/2025/04/Start-Here-Earn-in-Bitcoin.png`,
    imageWidth: 545,
    imageHeight: 348,
  },
  {
    title: 'Joining the African Bitcoiners Community',
    description: "You don't have to walk this journey alone. Connect with Bitcoiners across the continent.",
    href: '/community',
    image: `${R2}/uploads/2025/04/Start-Here-Join-Community.png`,
    imageWidth: 545,
    imageHeight: 348,
  },
]

export const LINKS = {
  feedbackBounty: '/earn-bitcoin/1000-sats-feedback-bounty',
}
