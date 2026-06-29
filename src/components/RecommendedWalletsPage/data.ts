const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const LINKS = {
  keepBitcoin: '/learn-bitcoin/how-to-keep-bitcoin-in-your-head',
  freeCourse: '/learn-bitcoin/free-bitcoin-course',
  feedbackBounty: '/earn-bitcoin/1000-sats-feedback-bounty',
}

export const PREFERRED_DESKTOP_HREF = 'https://sparrowwallet.com'
export const PREFERRED_MOBILE_HREF = 'https://phoenix.acinq.co/'

export const IMG = {
  hero: `${R2}/uploads/2024/03/African-Bitcoiners_Recommended-Wallets-hero.png`,
  checkmark: `${R2}/uploads/2024/03/checkmark-icon.png`,
  cancel: `${R2}/uploads/2024/03/X-cancel_icon.png`,
  info: `${R2}/uploads/2024/03/information-icon.png`,
  preferredDesktop: `${R2}/uploads/2024/03/Most-Preferred-Desktop-Wallet.png`,
  preferredMobile: `${R2}/uploads/2024/03/Most-Preferred-Mobile-Wallet.png`,
  sparrow: `${R2}/uploads/2023/01/Sparrow-wallet-300x150.png`,
  wasabi: `${R2}/uploads/2023/01/Wasabi-300x158.png`,
  green: `${R2}/uploads/2024/03/Green-Wallet-Logo.png`,
  armory: `${R2}/uploads/2024/03/Armory_Wallet_Logo.png`,
  electrum: `${R2}/uploads/2024/03/Electrum_Wallet_Logo.png`,
  phoenix: `${R2}/uploads/2024/03/Phoenix_Wallet_Logo.png`,
  aqua: `${R2}/uploads/2024/03/AQUA_Wallet_Logo.png`,
  breez: `${R2}/uploads/2024/03/Breez_Wallet_Logo.png`,
  zeus: `${R2}/uploads/2024/03/Zeus_Wallet_Logo.png`,
  blue: `${R2}/uploads/2024/03/Blue_Wallet_Logo.png`,
}

export type BoolCell = boolean | 'both'

export type DesktopWallet = {
  href: string
  logo: string
  logoAlt: string
  description: string
  kycFree: boolean
  coinControl: boolean
  coinJoin: boolean
  multiSig: boolean
  lightning: boolean
}

export type MobileWallet = {
  href: string
  logo: string
  logoAlt: string
  description: string
  kycFree: boolean
  coinControl: boolean
  nonCustodial: boolean
  iosAndroid: 'Both'
  lightning: boolean
}

export const DESKTOP_COLUMNS = [
  {
    key: 'kycFree' as const,
    label: 'KYC FREE',
    tooltip:
      "KYC means whether there's need for any ID verifications before you can use this wallet",
  },
  {
    key: 'coinControl' as const,
    label: 'Coin Control',
    tooltip:
      'A feature that lets users select specific UTXOs (unspent transaction outputs) in their wallet to use for a transaction, giving them greater control over fees, privacy, and spending.',
  },
  {
    key: 'coinJoin' as const,
    label: 'Coin Join',
    tooltip:
      'This feature allows users to decide to batch their transactions or join their transactions with other transactions published at the same time. This helps imporve privacy and reduce transaction tracking',
  },
  {
    key: 'multiSig' as const,
    label: 'Multi-Sig Feature',
    tooltip:
      'Multi-sig feature simply means that this wallets gives users the ability to have wallets where two or more persons can sign before a transaction is completed',
  },
  {
    key: 'lightning' as const,
    label: 'Lightning',
    tooltip:
      'Wallets with lightning checked supports the second layer of the Bitcoin network called lightning network',
  },
]

export const MOBILE_COLUMNS = [
  {
    key: 'kycFree' as const,
    label: 'KYC FREE',
    tooltip:
      "KYC means whether there's need for any ID verifications before you can use this wallet",
  },
  {
    key: 'coinControl' as const,
    label: 'Coin Control',
    tooltip:
      "This feature enable users to chose which Bitcoin address balance in their wallet through which they'll send funds out",
  },
  {
    key: 'nonCustodial' as const,
    label: 'Non-Custodial',
    tooltip: 'Non custodial means users are fully in control of their wallet and funds',
  },
  {
    key: 'iosAndroid' as const,
    label: 'IOS/Android',
    tooltip:
      'This shows if this wallet is available on the apple mobile phones and android mobile phones',
  },
  {
    key: 'lightning' as const,
    label: 'Lightning',
    tooltip:
      'Wallets with lightning checked supports the second layer of Bitcoin network called lightning network',
  },
]

export const DESKTOP_WALLETS: DesktopWallet[] = [
  {
    href: 'https://sparrowwallet.com',
    logo: IMG.sparrow,
    logoAlt: 'Sparrow wallet logo',
    description:
      'The Bitcoiners wallet. Nothing comes close to this sophisticated desktop wallet when it comes to cold storing your precious Bitcoin. A great UX for users looking for complete control over their Bitcoin storage and transactions.',
    kycFree: true,
    coinControl: true,
    coinJoin: true,
    multiSig: true,
    lightning: false,
  },
  {
    href: 'https://wasabiwallet.io/',
    logo: IMG.wasabi,
    logoAlt: 'wasabi wallet logo',
    description: 'Relatively easy to use. Simple UI. Gives users ability to control coin movements.',
    kycFree: true,
    coinControl: true,
    coinJoin: true,
    multiSig: false,
    lightning: false,
  },
  {
    href: 'https://play.google.com/store/apps/details?id=com.greenaddress.greenbits_android_wallet&hl=en&gl=US',
    logo: IMG.green,
    logoAlt: 'Green wallet logo',
    description:
      'A very simple desktop wallet. Green wallet also supports the liquid network, a Bitcoin side chain that helps in scaling Bitcoin payments.',
    kycFree: true,
    coinControl: false,
    coinJoin: false,
    multiSig: false,
    lightning: false,
  },
  {
    href: 'https://www.bitcoinarmory.com/',
    logo: IMG.armory,
    logoAlt: 'Armory wallet logo',
    description: 'An outstanding wallet however it might be a little difficult for new Bitcoiners.',
    kycFree: true,
    coinControl: true,
    coinJoin: true,
    multiSig: true,
    lightning: false,
  },
  {
    href: 'https://electrum.org/',
    logo: IMG.electrum,
    logoAlt: 'Electrum Wallet Logo',
    description:
      'Electrum wallet is one of the oldest desktop Bitcoin wallets and has recently added lightning support although this can be tricky at times.',
    kycFree: true,
    coinControl: false,
    coinJoin: false,
    multiSig: true,
    lightning: true,
  },
]

export const MOBILE_WALLETS: MobileWallet[] = [
  {
    href: 'https://phoenix.acinq.co/',
    logo: IMG.phoenix,
    logoAlt: 'Phoenix Wallet logo',
    description:
      'Phoenix offers a non-custodial Lightning experience with an excellent user interface. While the fees can be a bit high, its ease of use and straightforward setup make up for it.',
    kycFree: true,
    coinControl: false,
    nonCustodial: true,
    iosAndroid: 'Both',
    lightning: true,
  },
  {
    href: 'https://aquawallet.io/',
    logo: IMG.aqua,
    logoAlt: 'AQUA Wallet logo',
    description:
      'Aqua Wallet is easy to navigate for users of all experience levels, offering strong privacy features. It also supports Liquid Bitcoin, a second-layer protocol designed to enhance Bitcoin scalability. However, it may occasionally struggle with Lightning payments.',
    kycFree: true,
    coinControl: false,
    nonCustodial: true,
    iosAndroid: 'Both',
    lightning: true,
  },
  {
    href: 'https://breez.technology/',
    logo: IMG.breez,
    logoAlt: 'Breez Wallet logo',
    description:
      ' Breez features a straightforward and user-friendly interface that makes navigation effortless. It offers moderately affordable Lightning channel setups, supporting both on-chain and invoice payments. However, like Aqua, it can occasionally face challenges in completing certain Lightning payments.',
    kycFree: true,
    coinControl: false,
    nonCustodial: true,
    iosAndroid: 'Both',
    lightning: true,
  },
  {
    href: 'https://zeusln.com/',
    logo: IMG.zeus,
    logoAlt: 'Zeus Wallet logo',
    description:
      'Blue Wallet is an excellent choice for on-chain storage and transactions on mobile. It supports multisig setups, and while Lightning support isn\u2019t native, you can connect to your node\u2019s LNDHub or any external node for Lightning functionality.',
    kycFree: true,
    coinControl: true,
    nonCustodial: true,
    iosAndroid: 'Both',
    lightning: true,
  },
  {
    href: 'https://bluewallet.io/',
    logo: IMG.blue,
    logoAlt: 'Blue Wallet logo',
    description:
      'Blue wallet is the best mobile wallet for on chain storage and transactions. It also has multisig support and while lightning support is not native you can connect to the LNDHub of your node or any external node.',
    kycFree: true,
    coinControl: true,
    nonCustodial: true,
    iosAndroid: 'Both',
    lightning: false,
  },
]
