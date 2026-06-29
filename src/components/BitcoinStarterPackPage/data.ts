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
    title: 'Bitcoin for Beginners Course',
    description:
      "You've heard of Bitcoin. Now understand it. Our free course explains everything in plain English, no jargon.",
    href: '/learn-bitcoin/free-bitcoin-course',
    image: `${R2}/uploads/2025/04/Start-Here-Bitcoin-for-Beginners-Course.png`,
    imageWidth: 545,
    imageHeight: 348,
  },
  {
    title: 'Bitcoin Starter Book',
    description: 'A short, visual guide that helps you fall in love with Bitcoin—made for Africans, by Africans.',
    href: '/bitcoin-africas-guide-to-freedom-money',
    image: `${R2}/uploads/2025/04/Start-Here-Bitcoin-Starter-Book.png`,
    imageWidth: 545,
    imageHeight: 348,
  },
  {
    title: 'Million Sats Savings Challenge',
    description:
      "Think you can save a million sats? Join the challenge that's helping Africans build wealth their way.",
    href: '/save-bitcoin/million-sat-challenge',
    image: `${R2}/uploads/2025/04/Start-Here-Million-Sats-Challenge.png`,
    imageWidth: 545,
    imageHeight: 348,
  },
  {
    title: 'Recommended Bitcoin and Lightning Wallets',
    description:
      "Not all wallets are created equal. Here's how to choose one that works in Africa and keeps your sats safe.",
    href: '/save-bitcoin/recommended-bitcoin-and-lightning-wallets',
    image: `${R2}/uploads/2025/04/Start-Here-Recommended-Wallets.png`,
    imageWidth: 545,
    imageHeight: 348,
  },
  {
    title: 'Bitcoin Learning Resources',
    description: 'Articles, videos, and tools to learn at your own pace, because everyone starts somewhere.',
    href: '/learn-bitcoin/bitcoin-learning-resources',
    image: `${R2}/uploads/2025/04/Start-Here-Bitcoin-Learning-Resources.png`,
    imageWidth: 545,
    imageHeight: 348,
  },
]

export const LINKS = {
  feedbackBounty: '/earn-bitcoin/1000-sats-feedback-bounty',
}
