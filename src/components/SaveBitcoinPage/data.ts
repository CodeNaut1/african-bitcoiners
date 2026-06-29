const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export type SaveCard = {
  title: string
  description: string
  image: string
  imageWidth: number
  imageHeight: number
  href: string
}

export const CARDS: SaveCard[] = [
  {
    title: 'African Currency vs Bitcoin Simulator',
    description:
      'Discover how inflation has silently destroyed your wealth and see what Bitcoin could have done instead',
    image: `${R2}/uploads/elementor/thumbs/side-image-bitcoin-vs-inflation-rbhzu575cbf2kbk2ody7s0kdi93y3ms3ekk15oy2he.png`,
    imageWidth: 340,
    imageHeight: 240,
    href: '/save-bitcoin/bitcoin-inflation-simulator',
  },
  {
    title: 'Bitcoin Wallets We Recommend',
    description:
      'Find out the best Bitcoin and Lightning wallets, their unique features, and our choicest wallet.',
    image: `${R2}/uploads/2024/11/Save-Bitcoin-Recommended-Bitcoin-Wallets.png`,
    imageWidth: 340,
    imageHeight: 240,
    href: '/save-bitcoin/recommended-bitcoin-and-lightning-wallets',
  },
  {
    title: 'Buying Bitcoin Peer 2 Peer',
    description:
      'Want to buy Bitcoin in Africa but not sure where to start? We recommend doing it peer-to peer, it is more private.',
    image: `${R2}/uploads/2024/11/Save-Bitcoin-Buying-Bitcoin-P2P.png`,
    imageWidth: 340,
    imageHeight: 240,
    href: '/save-bitcoin/buying-bitcoin-peer-to-peer',
  },
  {
    title: '5 Year Bitcoin Savings Calculator',
    description:
      "Calculate your savings' purchasing power growth with monthly Bitcoin investments over 5 years.",
    image: `${R2}/uploads/2024/11/Save-Bitcoin-5-Years-Savings-Calculator.png`,
    imageWidth: 340,
    imageHeight: 240,
    href: '/save-bitcoin/5-year-bitcoin-savings-calculator',
  },
  {
    title: 'Backup Your Bitcoin Seed Phrase',
    description:
      'Learn the best practices for securing your private keys and how to safeguard your seed phrase.',
    image: `${R2}/uploads/2024/11/Save-Bitcoin-How-to-Setup-a-Bitcoin-cold-storage.png`,
    imageWidth: 340,
    imageHeight: 240,
    href: '/save-bitcoin/how-to-setup-your-bitcoin-cold-storage-for-free',
  },
  {
    title: 'Bitcoin to Fiat Converter',
    description:
      'Discover the real-time and accurate prices of Bitcoin in over 20 African Countries local currency.',
    image: `${R2}/uploads/2024/11/Save-Bitcoin-Bitcoin-to-Fiat-Converter.png`,
    imageWidth: 340,
    imageHeight: 240,
    href: '/save-bitcoin/bitcoin-to-fiat-converter',
  },
]

export const LINKS = {
  feedbackBounty: '/earn-bitcoin/1000-sats-feedback-bounty',
}

export const SEO = {
  title: 'Save Bitcoin - African Bitcoiners',
  description:
    'Learn how to save Bitcoin with African Bitcoiners. Find out about the best practices and tools to store your Bitcoin securely and protect your wealth.',
}
