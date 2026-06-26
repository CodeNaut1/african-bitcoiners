const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const IMG = {
  heroBg: `${R2}/uploads/2025/03/Bitcoin-Mining-in-Africa-hero-bg.png`,
  landscape: `${R2}/uploads/2025/03/Bitcoin-Mining-Lanscape_11zon.png`,
  miningRig: `${R2}/uploads/2025/03/mining-rig-illustr-1.png`,
}

export const LINKS = {
  reportPdf: `${R2}/uploads/2025/08/African-Bitcoiners-Mining-Report-2025-Latest-OFFICIAL.pdf`,
  ecosystem: '/african-bitcoin-ecosystem/',
  form: '#form',
}

export const COPY = {
  heroTitle: 'Unlocking Africa’s Potential in',
  heroTitleAccent: 'Bitcoin Mining',
  heroBody:
    'Africa is emerging as a powerhouse in the global Bitcoin mining landscape, leveraging abundant renewable energy sources and growing technological ecosystems. With rising interest from international investors and local innovators, the continent presents a unique opportunity for cost-efficient and sustainable Bitcoin mining.',
  heroListLink: 'Would you like to list a Bitcoin mining organisation?',
  reportCta: 'Download  Africa Bitcoin Mining Report 2025',
  directoryTitle: 'Key Bitcoin Mining Operations In Africa',
  directoryIntro:
    'From hydro-powered mining farms to solar-driven data centers, these companies are pioneering Bitcoin mining across Africa',
  whyTitle: 'Why Africa? A Unique Advantage in Bitcoin Mining',
  investingTitle: 'Investing in the Future of Bitcoin Mining in Africa',
  investingBody:
    'With global energy costs rising and Bitcoin’s mining difficulty increasing, Africa stands out as an attractive destination for Bitcoin miners looking to maximize profits while embracing sustainability. Whether you’re a miner, investor, or policymaker,',
  investingHighlight: 'Africa is the frontier of the next Bitcoin mining revolution.',
  investingListLink: 'Click here to list a Bitcoin mining organisation.',
  formTitle: 'Submit a Mining Organization in Africa',
}

export const ADVANTAGES = [
  {
    title: 'Abundant Renewable Energy',
    description:
      'With vast hydro, solar, wind, and geothermal resources, Africa offers some of the most cost-effective and sustainable mining conditions.',
  },
  {
    title: 'Lower Energy Costs',
    description:
      'Electricity costs in certain African countries range from as low as $0.03/kWh, making Bitcoin mining in those regions significantly more profitable.',
  },
  {
    title: 'Regulatory Flexibility',
    description:
      'Unlike North America or China, Africa provides a more adaptable regulatory environment, allowing early movers to shape the mining industry.',
  },
  {
    title: 'Economic Growth & Electrification',
    description:
      'Many mining operations are contributing to rural electrification projects, bringing steady power to local communities for the first time.',
  },
]

export type MiningOrg = {
  name: string
  description: string
  logo: string
  website?: string
  twitter?: string
}

export type MiningCountryGroup = {
  country: string
  flag?: string
  orgs: MiningOrg[]
}

export const COUNTRY_GROUPS: MiningCountryGroup[] = [
  {
    country: 'Democratic Republic of Congo',
    flag: '🇨🇩',
    orgs: [
      {
        name: 'Big Block DC Bitcoin',
        logo: `${R2}/uploads/2025/03/Big-Block-DC-Bitcoin-removebg-preview.png`,
        description:
          'Located in the Democratic Republic of Congo, Big Block DC Bitcoin utilizes Africa’s rich hydroelectric power to mine Bitcoin sustainably.',
        website: 'https://www.bdatacenter.fr/',
        twitter: 'https://twitter.com/BigBlock_DC',
      },
    ],
  },
  {
    country: 'Ethiopia',
    flag: '🇪🇹',
    orgs: [
      {
        name: 'Hashlabs Mining',
        logo: `${R2}/uploads/2024/06/hashlabs-mining.jpg`,
        description:
          'A leader in Ethiopia’s mining sector, Hashlabs Mining is leveraging low-cost hydropower to drive cost-efficient Bitcoin mining.',
        website: 'https://www.hashlabsmining.io/',
        twitter: 'https://twitter.com/HashlabsMining',
      },
      {
        name: 'QRB Labs',
        logo: `${R2}/uploads/2024/06/QRB_logo.png`,
        description:
          'QRB Labs specializes in optimizing Bitcoin mining operations in Ethiopia, tapping into the country’s renewable energy resources.',
        website: 'https://www.qrb-labs.com/',
        twitter: 'https://x.com/qrb_labs',
      },
      {
        name: 'West Data Group',
        logo: `${R2}/uploads/2024/10/West-Data-Group-logo.jpg`,
        description:
          'With a focus on energy-efficient Bitcoin mining, West Data Group is one of Ethiopia’s key players in the industry.',
        website: 'http://www.westdataholding.com/',
        twitter: 'https://x.com/WestDataGroup',
      },
    ],
  },
  {
    country: 'Zambia',
    flag: '🇿🇲',
    orgs: [
      {
        name: 'Quantum Hash',
        logo: `${R2}/uploads/2024/06/Quantum-Hash.jpg`,
        description:
          'Quantum Hash leverages Zambia’s geothermal and hydro resources to power its mining operations, offering a greener alternative to traditional mining.',
        website: 'https://quantumhash.co/',
        twitter: 'https://x.com/QuantumHashCo',
      },
    ],
  },
  {
    country: 'Namibia',
    flag: '🇳🇦',
    orgs: [
      {
        name: 'Bitcoin Mining Namibia',
        logo: `${R2}/uploads/2024/03/African-Bitcoiners_Bitcoin-Mining-Namibia_logo.jpg`,
        description:
          'Operating in Namibia, this initiative utilizes solar and wind energy to power Bitcoin mining in one of Africa’s sunniest regions',
        website: 'https://linktr.ee/btcnamibia',
        twitter: 'https://twitter.com/BTCMiningNam',
      },
    ],
  },
  {
    country: 'Nigeria',
    flag: '🇳🇬',
    orgs: [
      {
        name: 'Trojan Mining',
        logo: `${R2}/uploads/2024/03/African-Bitcoiners_Trojan-Mining-Nigeria-logo.jpg`,
        description:
          'Trojan Mining is another key player in Nigeria, utilizing hydroelectric and off-grid energy solutions to mine Bitcoin sustainably.',
        website: 'https://www.trojanmining.com/',
        twitter: 'https://twitter.com/TrojanMining',
      },
      {
        name: 'Shuga Mines',
        logo: `${R2}/uploads/2024/06/Shuga-Mine.jpg`,
        description:
          'Shuga Mines is at the forefront of Bitcoin mining in Nigeria, working with grid operators and renewable energy sources to enhance mining efficiency.',
        website: 'https://shugamine.com/',
        twitter: 'https://twitter.com/ShugaMines',
      },
      {
        name: 'NRG Bloom',
        logo: `${R2}/uploads/2025/03/NGR-Bloom-Bitcoin-mining.webp`,
        description:
          'Ngr Bloom is repurposing wasted energy for sustainable Bitcoin mining, empowering African communities with clean power and social impact.',
        website: 'https://www.nrgbloom.com',
        twitter: 'https://x.com/NRGBloom',
      },
    ],
  },
  {
    country: 'Pan-African',
    orgs: [
      {
        name: 'Gridless',
        logo: `${R2}/uploads/2024/03/African-Bitcoiners_Gridless-mining-logo.jpg`,
        description:
          'Gridless is revolutionizing Bitcoin mining in Kenya by integrating small-scale mining operations into rural energy projects, bringing electricity to underserved communities.',
        website: 'https://gridlesscompute.com/',
        twitter: 'https://twitter.com/GridlessCompute',
      },
    ],
  },
  {
    country: 'GAMA Africa',
    orgs: [
      {
        name: 'GAMA Africa',
        logo: `${R2}/uploads/2024/10/GAMA-African-Bitcoin-Mining-Summit.jpg`,
        description:
          'GAMA Africa is a pan-African mining initiative, bringing together stakeholders from across the continent to drive Bitcoin mining innovation and sustainability.',
        website: 'https://www.gama.africa/',
        twitter: 'https://twitter.com/GAMA_alliance',
      },
    ],
  },
]
