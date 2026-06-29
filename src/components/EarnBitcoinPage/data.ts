const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export type EarnCard = {
  title: string
  description: string
  image: string
  imageWidth: number
  imageHeight: number
  href: string
}

export const CARDS: EarnCard[] = [
  {
    title: 'Find Places to Earn Sats',
    description:
      'Find a list of sites that will reward you sats for completing tasks, reading, playing games and so much more.',
    image: `${R2}/uploads/2024/11/how-to-earn-bitcoin-rewards-e1732001749845.png`,
    imageWidth: 1789,
    imageHeight: 1260,
    href: '/earn-bitcoin/places-to-earn-sats',
  },
  {
    title: 'Find Bitcoiner Jobs',
    description: 'Find African Bitcoin talents for your vacant roles or find jobs where you get paid in Bitcoin.',
    image: `${R2}/uploads/2024/11/Earn-Bitcoin-African-Bitcoiners-Jobs.png`,
    imageWidth: 340,
    imageHeight: 240,
    href: '/earn-bitcoin/bitcoiner-jobs',
  },
  {
    title: '1000 Sats Feedback Bounty',
    description: 'Have a genius idea or spot something wrong on our website? Let us know and get rewarded.',
    image: `${R2}/uploads/2024/11/Earn-Bitcoin-1000-Sats-Feedback-Bounty.png`,
    imageWidth: 340,
    imageHeight: 240,
    href: '/earn-bitcoin/1000-sats-feedback-bounty',
  },
]

export const LINKS = {
  feedbackBounty: '/earn-bitcoin/1000-sats-feedback-bounty',
}
