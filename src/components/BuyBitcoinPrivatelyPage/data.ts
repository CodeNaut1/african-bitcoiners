const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const LINKS = {
  feedbackBounty: '/earn-bitcoin/1000-sats-feedback-bounty',
  recommendedWallets: '/save-bitcoin/recommended-bitcoin-and-lightning-wallets',
}

export const IMG = {
  hero: `${R2}/uploads/2025/05/Where-to-Buy-Bitcoin-Anonymously-In-Africa-min.png`,
  card: `${R2}/uploads/2024/11/Save-Bitcoin-Buying-Bitcoin-P2P.png`,
}

export const INTRO_PARAGRAPHS = [
  'Privacy is a basic right, and when it comes to money, it matters more than ever. For many Africans, buying Bitcoin through platforms that demand ID documents feels just like opening a bank account. It links your personal identity to every transaction and leaves your financial history exposed.',
  'If we care about protecting our freedom and staying in control of our money, we need better options.',
  'That\u2019s why we\u2019ve created this list: to help you find trusted, low-KYC or no-KYC ways to buy Bitcoin privately across Africa without giving up your identity in the process.',
]

export const TABLE_COLUMNS = [
  { key: 'platform', label: 'Platform' },
  { key: 'about', label: 'About' },
  { key: 'device', label: 'Desktop/Mobile' },
  { key: 'os', label: 'Supported OS' },
  { key: 'fees', label: 'Fees' },
  { key: 'bitcoinOnly', label: 'Bitcoin Only' },
  { key: 'lightning', label: 'Lightning Support' },
] as const

export type Platform = {
  name: string
  href: string
  about: string
  device: string
  os: string
  fees: string
  bitcoinOnly: boolean
  lightning: boolean
}

export const PLATFORMS: Platform[] = [
  {
    name: 'Vexl',
    href: 'https://vexl.it/',
    about: 'Vexl is a non-custodial P2P Bitcoin exchange prioritizing privacy and trust.',
    device: 'Mobile Only',
    os: 'iOS, Android',
    fees: 'No fees',
    bitcoinOnly: true,
    lightning: true,
  },
  {
    name: 'Noones',
    href: 'https://noones.com/en',
    about:
      'A P2P platform promoting non-KYC trading for users valuing privacy. (KYC may be triggered after a certain limit.)',
    device: 'Both',
    os: 'Web Browser, iOS, Android',
    fees: '0.5% for bank transfers, 1% for credit/debit card sellers',
    bitcoinOnly: true,
    lightning: true,
  },
  {
    name: 'Peach Bitcoin',
    href: 'https://peachbitcoin.com/',
    about: 'Peach Bitcoin is a simple Bitcoin P2P app, ideal for new users and experienced traders.',
    device: 'Mobile',
    os: 'iOS, Android',
    fees: '2% of total amount traded',
    bitcoinOnly: true,
    lightning: false,
  },
  {
    name: 'Bisq',
    href: 'https://bisq.network/',
    about: 'Bisq is a decentralized P2P exchange prioritizing privacy and censorship resistance.',
    device: 'Both',
    os: 'Windows, macOS, Linux, iOS, Android',
    fees: '0.65% (0.075% maker, 0.575% taker)',
    bitcoinOnly: true,
    lightning: false,
  },
  {
    name: 'Robosats',
    href: 'https://learn.robosats.com/',
    about: 'RoboSats is a Lightning-focused P2P platform using robot avatars for anonymous trades.',
    device: 'Desktop',
    os: 'Web Browser',
    fees: '0.2% (The taker pays 0.175% and the maker pays 0.025%).',
    bitcoinOnly: true,
    lightning: true,
  },
  {
    name: 'Hodl Hodl',
    href: 'https://hodlhodl.com/',
    about: 'Hodl Hodl is a global Bitcoin P2P marketplace with multisig escrow and no KYC.',
    device: 'Both',
    os: 'Web Browser',
    fees: '0.5% & 0.45%(for referrals that registered with a referral code)',
    bitcoinOnly: true,
    lightning: false,
  },
]

export const SEO = {
  hub: {
    title: 'Buying Bitcoin Peer to Peer',
    description:
      'Discover trusted peer-to-peer platforms to buy Bitcoin privately in Africa. Compare fees, devices, and Lightning support.',
  },
  standalone: {
    title: 'Where to Buy Bitcoin Privately in Africa',
    description:
      'Learn how to buy Bitcoin anonymously in Africa using safe, privacy-focused methods. Discover trusted platforms, practical tips, and tools for staying private while going Bitcoin.',
  },
}
