import type { CountryEntry } from '@/components/AfricanBitcoinCommunitiesPage/data'

const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const IMG = {
  heroBg: `${R2}/uploads/2023/11/Top-21-African-Bitcoin-Countries-banner2.png`,
}

export const LINKS = {
  directory: 'https://directory.bitcoiners.africa',
  ecosystem: '/african-bitcoin-ecosystem',
  feedbackBounty: '/earn-bitcoin/1000-sats-feedback-bounty',
}

export type CountryDetail = {
  name: string
  cardTitle: string
  code: string
  description: string
}

export const COUNTRIES: CountryDetail[] = [
  {
    name: 'Nigeria',
    cardTitle: 'Nigeria',
    code: 'NG',
    description:
      "Discover Nigeria's bustling Bitcoin ecosystem, a center of Bitcoin innovation and adoption in West Africa. Check out the meetups, pioneering startups, and the many communities driving the adoption of Bitcoin for financial empowerment.",
  },
  {
    name: 'Kenya',
    cardTitle: 'Kenya',
    code: 'KE',
    description:
      'Step into Kenya, where Bitcoin adoption is redefining financial systems. Kenyan Bitcoiners are a passionate bunch and they are building communities driving Bitcoin innovation and accessibility.',
  },
  {
    name: 'Ghana',
    cardTitle: 'Ghana',
    code: 'GH',
    description:
      "Checkout Ghana's Bitoin ecosystem, where communities thrive on financial empowerment. Check out the meetups, projects, and the communities driving the Ghanian Bitcoin revolution.",
  },
  {
    name: 'Zimbabwe',
    cardTitle: 'Zimbabwe',
    code: 'ZW',
    description:
      "Its no surprise to see the growth in Zimbabwe's Bitcoin landscape. Explore communities and initiatives that are fostering financial inclusion through Bitcoin in Zimbabwe.",
  },
  {
    name: 'South Africa',
    cardTitle: 'South Africa',
    code: 'ZA',
    description:
      'Uncover the dynamic landscape of Bitcoin in South Africa, where projects, communities and a robust network of enthusiasts thrive. Check out the community shaping the future of finance.',
  },
  {
    name: 'Uganda',
    cardTitle: 'Uganda',
    code: 'UG',
    description:
      'Bitcoin has incredible potential in Uganda! Check out the transformative projects, inclusive communities, and Bitcoin meetups thriving in Uganda.',
  },
  {
    name: 'Tanzania',
    cardTitle: 'Tanzania',
    code: 'TZ',
    description:
      'Check out the Bitcoin ecosystem in Tanzania. See the growing landscape and the projects and communities driving Bitcoin innovation and inclusive financial access in the country.',
  },
  {
    name: 'Zambia',
    cardTitle: 'Zambia',
    code: 'ZM',
    description:
      'Check out the footprint of the Bitcoin revolution in Zambia! Discover the transformative projects, inclusive communities, and engaging meetups that are spear heading Bitcoin adoption.',
  },
  {
    name: 'Ethiopia',
    cardTitle: 'Ethiopia',
    code: 'ET',
    description:
      "Discover Ethiopia's evolving Bitcoin ecosystem. Check out the communities embracing the power of Bitcoin and the projects that are driving Bitcoin adoption.",
  },
  {
    name: 'Benin',
    cardTitle: 'Benin',
    code: 'BJ',
    description:
      "Check out Bitcoin's impact in Benin! Discover the projects, communities, and meetups from this country. Explore the evolving world of Bitcoin in Benin.",
  },
  {
    name: 'Cameroon',
    cardTitle: 'Cameroon',
    code: 'CM',
    description:
      "Check out Bitcoin's impact in Cameroon! Discover the innovative projects, communities, and meetups that are rewriting history and fostering the Bitcoin revolution in Cameroon.",
  },
  {
    name: 'Namibia',
    cardTitle: 'Namibia',
    code: 'NA',
    description:
      'Bitcoin is also taking a bold step in Namibia! Explore the Bitcoin projects, communities, and meetups. Discover Namibia and check out the thriving Bitcoin landscape in Namibia now!',
  },
  {
    name: 'Malawi',
    cardTitle: 'Malawi',
    code: 'MW',
    description:
      'Discover how Bitcoin is evolving in Malawi! Check out the exciting projects, vibrant communities, and meetups in the country. Explore!',
  },
  {
    name: 'Togo',
    cardTitle: 'Togo',
    code: 'TG',
    description:
      "Check out Bitcoin's influence in Botswana! Discover innovative projects, communities, and engaging meetups. Step into the evolving world of Bitcoin in Botswana today",
  },
  {
    name: 'Eritrea',
    cardTitle: 'Eritrea',
    code: 'ER',
    description:
      "Check out Bitcoin's influence in Botswana! Discover innovative projects, communities, and engaging meetups. Step into the evolving world of Bitcoin in Botswana today",
  },
  {
    name: 'Sudan',
    cardTitle: 'Sudan',
    code: 'SD',
    description:
      'Uncover the dynamic landscape of Bitcoin in Sudan, where projects and communities are springing up. Check out the community shaping the future of finance.',
  },
  {
    name: 'Ivory Coast',
    cardTitle: 'Ivory Coast',
    code: 'CI',
    description:
      "Check out the growth in Ivory Coast's Bitcoin landscape. Explore communities and initiatives that are fostering financial inclusion through Bitcoin in Ivory Coast.",
  },
  {
    name: 'Senegal',
    cardTitle: 'Senegal',
    code: 'SN',
    description:
      'Bitcoin has incredible potential in Senegal! Check out the innovative projects, Bitcoin communities, and Bitcoin meetups thriving in Senegal.',
  },
  {
    name: 'DR Congo',
    cardTitle: 'Democratic Republic of Congo',
    code: 'CD',
    description:
      'Discover the Bitcoin revolution in the DRC! Checkout the projects, communities.',
  },
  {
    name: 'Liberia',
    cardTitle: 'Liberia',
    code: 'LR',
    description:
      "Check out Bitcoin's impact in Liberia! Discover innovative projects, communities, and meetups in the country. Uncover the dynamic Bitcoin ecosystem.",
  },
]

export const COUNTRY_CAROUSEL_ITEMS: CountryEntry[] = COUNTRIES.map((country) => ({
  name: country.name,
  code: country.code,
  href: LINKS.directory,
}))

export const COPY = {
  heroTitle: 'Our Top 21 African Bitcoin Countries',
  heroIntro:
    "Explore our top 21 countries leading the charge towards financial freedom and equality through Bitcoin. Each nation's unique initiatives and thriving communities pave the way for a decentralized financial landscape.",
  submitHeading:
    'Share any local Bitcoin meetups, mining operations, communities or general initiatives you know of in any of these countries, to contribute to their growing Bitcoin ecosystem!',
  submitBody:
    'Know a Bitcoin community, project, or meetup that should be featured? Submit it through our African Bitcoin ecosystem directory.',
  submitCta: 'Submit a platform',
  ecosystemCta: 'View ecosystem map',
  bountyTitle: 'Get 1,000 sats for your brilliant ideas!',
  bountyText:
    "Have a genius idea or spot something in our African Bitcoiners initiatives that could be even better? Submit your feedback to us and we're excited to reward you for them.",
  bountyCta: 'Get Started',
}

export const SEO = {
  title: 'Top 21 African Bitcoin Countries - African Bitcoiners',
  description: COPY.heroIntro,
}
