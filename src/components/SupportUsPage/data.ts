const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const IMG = {
  heroHandshake: `${R2}/uploads/2026/02/imageeee.png`,
  onchainQr: `${R2}/uploads/2024/06/African-Bitcoiners-onchain-QR-code.png`,
} as const

export const BTC_ADDRESS = 'bc1qvwujdx605fke4wr4uzpsdvj0pd4dzw6pf3d03x'

export const SPONSORSHIP_DECK_URL = `${R2}/uploads/2026/01/African-Bitcoiners-sponsorship-deck-Final.pdf`

export const COPY = {
  heroTitle: 'Support Us',
  heroParagraphs: [
    'Be a donor! We are a small bootstrapped team and can use all the help we can get.',
    'To support us in our Mission of bringing freedom to Africa through Bitcoin you can make a donation either on chain or via a lightning payment below.',
    'Thank you, we appreciate every little contribution we receive.',
  ],
  lightning: {
    title: 'Lightning Payment',
    description: 'Make an instant donation to us using the Lightning Network.',
  },
  onchain: {
    title: 'Onchain Payment',
    description: 'Support us by sending Bitcoin directly to our donation wallet.',
    copyLabel: 'Copy BTC Address',
  },
  sponsor: {
    title: 'Become a Sponsor',
    titleHref: '/about-us/african-bitcoiners-proof-of-work/',
    description:
      'If you are a Bitcoin only organisation (no crypto please), join us in making significant impact on the African Bitcoin space while enhancing your brand\u2019s visibility.',
    buttonLabel: 'Download our Sponsorship Deck',
  },
  form: {
    sectionTitle:
      'Before you proceed, please drop your details. This is to enable us reach out to thank you.',
  },
} as const
