const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

const img = (path: string) => `${R2}/uploads/${path}`

export const IMG = {
  heroBg: img('2024/03/African-Bitcoiners_Projects_hero_banner.png'),
}

export type ProjectEntry = {
  name: string
  description: string
  image: string
  href: string
  imageFit?: 'cover' | 'contain'
}

export const PROJECTS: ProjectEntry[] = [
  {
    name: 'Africa Free Routing',
    description:
      'This is a bitcoin lightning project that facilitates bitcoin payment and peer to peer exchange across Africa utilizing the lightning technology. Africa Free Routing has her nodes in a few major cities of Africa and are rapidly expanding their node reach.',
    image: img('2024/03/African-Bitcoiners_Africa-Free-Routing_logo.png'),
    href: 'https://freerouting.africa/',
    imageFit: 'contain',
  },
  {
    name: 'Gorilla Sats',
    description:
      'Gorilla Sats is a leading Bitcoin company based in Uganda, with a mission to drive the adoption of Bitcoin and foster a Bitcoin-centric economy. Their secure, localized platform facilitates Bitcoin transactions, empowering individuals and businesses with decentralized finance.',
    image: img('2024/03/African-Bitcoiners_Gorilla-Sats-logo.jpg'),
    href: 'https://gorilla-sats.com/#home',
  },
  {
    name: 'The Bitcoiner Test',
    description:
      "The Bitcoiner Test, anchored by the mantra 'don't trust, verify.' is the ultimate verification for genuine Bitcoin enthusiasts. Whether hiring or joining a Bitcoin team, prove you know your Bitcoin knowledge and get an industry recognised certification.",
    image: img('2024/03/African-Bitcoiners_The-Bitcoiner-Test-logo.png'),
    href: 'https://bitcoinertest.com/',
    imageFit: 'contain',
  },
  {
    name: 'Citrusrate',
    description:
      "Citrusrate is a Bitcoin web solution that helps you get real-time bitcoin price rates data in 22 African currencies. With it's user-friendly interface and comprehensive data, you can track bitcoin prices in your local currency and stay ahead of the bitcoin market.",
    image: img('2024/10/Citrusrate.jpg'),
    href: 'https://citrusrate.com/',
  },
  {
    name: 'Bitnob',
    description:
      'Bitnob is a Bitcoin Financial services firm that helps in routing easy, fast and reliable payments in and out of Africa. They provide a way to transact in Bitcoin (buy and sell), offering users the ability to save in both Bitcoin and USD. Further, they run a virtual card issuance service.',
    image: img('2024/03/African-Bitcoiners_bitnob_logo.jpg'),
    href: 'https://bitnob.com/',
  },
  {
    name: 'BitcoinOnly',
    description:
      'BitcoinOnly is a South African based Bitcoin firm that offers Bitcoin hardware services, ranging from hardware wallets to seed back up devices etc. They also facilitate bitcoin payment systems and can offer professional advice on Bitcoin related matters.',
    image: img('2024/03/African-Bitcoiners_Bitcoin-Only-logo.webp'),
    href: 'https://bitcoinonly.io/',
    imageFit: 'contain',
  },
  {
    name: 'Flash',
    description:
      'Flash Bitcoin is a bitcoin firm which offers buying and selling of Bitcoin to mostly French speaking African countries. They leverage the lightning network to run their services seamlessly.',
    image: img('2024/03/Africa-Bitcoiners_Flash-Bitcoin-logo.jpg'),
    href: 'https://bitcoinflash.xyz/',
  },
  {
    name: 'Bitcoin Mining Namibia',
    description:
      'As the Name implies, Bitcoin Mining Namibia is a Bitcoin Mining project running in Namibia. They run onsite mining, sells of ASIC machines and home installations, mining profitability calculator etc.',
    image: img('2024/03/African-Bitcoiners_Bitcoin-Mining-Namibia_logo.jpg'),
    href: 'https://linktr.ee/btcnamibia',
  },
  {
    name: 'Easy Sats',
    description:
      'Easy sats is an interesting bitcoin firm that offers quite a variety of services. They bring the knowledge of bitcoin to the masses through production of bitcoin education materials, they make bitcoin easily & readily accessible to an average African.',
    image: img('2024/03/African-Bitcoiners_Easy-Sats-Logo.webp'),
    href: 'https://tnnbtjongarero.wixsite.com/okinent',
    imageFit: 'contain',
  },
  {
    name: 'Trojan Minning Nigeria',
    description:
      'Trojan Mining, based in Nigeria, provides Bitcoin mining lessons and mining farms setup services.',
    image: img('2024/03/African-Bitcoiners_Trojan-Mining-Nigeria-logo.jpg'),
    href: 'https://www.trojanmining.com/',
  },
  {
    name: 'Sats2Data',
    description:
      'Sats2Data offers a fast, innovative way for Africans to buy airtime and data bundles using Bitcoin in just 60 seconds, showcasing practical Bitcoin use cases.',
    image: img('2024/03/African-Bitcoiners_Sats2data-logo-white-1.png'),
    href: 'https://sats2data.africa/',
    imageFit: 'contain',
  },
  {
    name: 'ipayBTC',
    description:
      'IpayBTC is only present on Twitter. Their Bio display that they facilitate sending and receiving bitcoin.',
    image: img('2024/03/African-Bitcoiners_ipayBTC-logo.jpg'),
    href: 'https://ipaybtc.app/',
  },
  {
    name: 'Cashwyre',
    description:
      'Cashwyre is a Bitcoin tech firm that offers easy Bitcoin buying solution on their website, enabling send and receive money within Africa with zero charges.',
    image: img('2024/03/African-Bitcoiners_Cashwyre-logo.jpg'),
    href: 'https://cashwyre.io/',
    imageFit: 'contain',
  },
]

export const LINKS = {
  feedbackBounty: '/earn-bitcoin/1000-sats-feedback-bounty',
  submitProject: '/african-bitcoin-ecosystem',
  ecosystem: '/african-bitcoin-ecosystem',
}

export const SEO = {
  title: 'African Bitcoin Projects',
  description:
    'Explore the top African Bitcoin projects that are reshaping the Bitcoin ecosystem across the continent. From pioneering startups to innovative tools built for Africa.',
}
