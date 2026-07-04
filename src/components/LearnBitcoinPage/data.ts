const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export type LearnCard = {
  title: string
  description: string
  image: string
  imageWidth: number
  imageHeight: number
  href: string
}

export const CARDS: LearnCard[] = [
  {
    title: 'Free Bitcoin for Beginners Course',
    description:
      'Learn about the fundamentals of Bitcoin with our Free Bitcoin For Beginners course. The course runs for 21 days.',
    image: `${R2}/uploads/2024/11/Learn-Bitcoin-Bitcoin-for-Beginners-Course.png`,
    imageWidth: 341,
    imageHeight: 240,
    href: '/learn-bitcoin/free-bitcoin-course',
  },
  {
    title: 'Top 10 Bitcoin Misconceptions Explained',
    description:
      'We aim to dispel misconceptions and reveal Bitcoin\u2019s true role in Africa\u2019s financial landscape.',
    image: `${R2}/uploads/2024/11/Learn-Bitcoin-Top-10-Bitcoin-Misconceptions.png`,
    imageWidth: 341,
    imageHeight: 240,
    href: '/learn-bitcoin/top-10-bitcoin-misconceptions',
  },
  {
    title: 'Bitcoin for Kids',
    description:
      'Secure the next generation by teaching them about Bitcoin, here is a list of Bitcoin learning resources for Kids.',
    image: `${R2}/uploads/2024/11/Learn-Bitcoin-Bitcoin-for-Kids.png`,
    imageWidth: 341,
    imageHeight: 240,
    href: '/learn-bitcoin/bitcoin-for-kids',
  },
  {
    title: 'Bitcoin Learning Resources',
    description:
      'To fully understand Bitcoin, you need to commit to 100 hours of learning. Find the list of best learning resources here.',
    image: `${R2}/uploads/2024/11/Learn-Bitcoin-Bitcoin-Learning-Resources.png`,
    imageWidth: 341,
    imageHeight: 240,
    href: '/learn-bitcoin/bitcoin-learning-resources',
  },
  {
    title: 'Keeping Bitcoin in your head',
    description:
      'Writing down your seed phrase on paper leaves it vulnerable to theft or loss. Learn how to secure your Bitcoin!',
    image: `${R2}/uploads/2024/11/Learn-Bitcoin-Why-Bitcoin-Only.png`,
    imageWidth: 341,
    imageHeight: 240,
    href: '/learn-bitcoin/how-to-keep-bitcoin-in-your-head',
  },
  {
    title: 'African Language Resources',
    description:
      'Language is not a barrier to learning Bitcoin. Find Bitcoin learning resources in diverse African languages.',
    image: `${R2}/uploads/2024/11/Learn-Bitcoin-African-Language-Resources.png`,
    imageWidth: 341,
    imageHeight: 240,
    href: '/learn-bitcoin/african-language-resources',
  },
  {
    title: 'Why Bitcoin Only',
    description:
      'Satisfy your curiosity and find out why we are totally and irrevocably focused on Bitcoin only.',
    image: `${R2}/uploads/2024/11/Learn-Bitcoin-Why-Bitcoin-Only.png`,
    imageWidth: 341,
    imageHeight: 240,
    href: '/learn-bitcoin/why-bitcoin-only',
  },
  {
    title: 'Bitcoin White Paper',
    description:
      'Read the Bitcoin White Paper the first publication that changed the future of money forever.',
    image: `${R2}/uploads/2024/11/Learn-Bitcoin-Bitcoin-Whitepaper.png`,
    imageWidth: 341,
    imageHeight: 240,
    href: '/learn-bitcoin/bitcoin-whitepaper',
  },
]

export const LINKS = {
  feedbackBounty: '/earn-bitcoin/1000-sats-feedback-bounty',
}

export const SEO = {
  title: 'Learn Bitcoin',
  description:
    'Start your Bitcoin education journey with African Bitcoiners. Learn about Bitcoin, blockchain, and cryptocurrencies and how they can empower people in Africa.',
}
