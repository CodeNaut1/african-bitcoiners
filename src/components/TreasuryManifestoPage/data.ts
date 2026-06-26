const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const IMG = {
  cover: `${R2}/uploads/2025/09/manifesto-front-page-ui.png`,
  icons: [
    `${R2}/uploads/2025/09/icon-1.png`,
    `${R2}/uploads/2025/09/icon-2.png`,
    `${R2}/uploads/2025/09/icon-3.png`,
    `${R2}/uploads/2025/09/icon-4.png`,
    `${R2}/uploads/2025/09/icon-5.png`,
    `${R2}/uploads/2025/09/icon-6.png`,
  ],
  personas: [
    `${R2}/uploads/2025/09/CEO-image.png`,
    `${R2}/uploads/2025/09/CFO-image.png`,
    `${R2}/uploads/2025/09/entrepreneur.png`,
    `${R2}/uploads/2025/09/NGO-image.png`,
    `${R2}/uploads/2025/09/Educator-image.png`,
  ],
}

export const LINKS = {
  pdf: `${R2}/uploads/2025/09/African-Bitcoin-Treasury-Manisfesto.pdf`,
  page: 'https://bitcoiners.africa/african-bitcoin-treasury-manifesto/',
  email: 'mailto:sarahwhite@bitcoiners.africa',
}

export const LEARN_ITEMS = [
  'Why Bitcoin is the most powerful reserve asset of our time',
  'Real examples of companies like MicroStrategy and MetaPlanet',
  'How African businesses are already leading in adoption',
  'A step-by-step strategy to build your own Bitcoin reserve',
  'How to manage risk, regulation, and volatility',
  'How to communicate your Bitcoin strategy to stakeholders',
]

export const PERSONAS = [
  {
    title: 'CEO',
    description: 'looking to future-proof your company',
    image: IMG.personas[0],
    width: 555,
    height: 940,
  },
  {
    title: 'CFO',
    description: 'managing inflation-exposed reserves',
    image: IMG.personas[1],
    width: 278,
    height: 577,
  },
  {
    title: 'Entrepreneur',
    description: 'seeking an edge in uncertain times',
    image: IMG.personas[2],
    width: 279,
    height: 633,
    featured: true,
  },
  {
    title: 'NGO',
    description: 'or mission-aligned org holding funds long term',
    image: IMG.personas[3],
    width: 279,
    height: 574,
  },
  {
    title: 'Educator',
    description: 'or advocate promoting Bitcoin adoption in Africa',
    image: IMG.personas[4],
    width: 279,
    height: 449,
  },
]

export const SHARE = {
  title: 'Manifesto Heading',
  description: 'Manifesto text body',
}
