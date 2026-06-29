const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const IMG = {
  heroBg: `${R2}/uploads/2024/03/African-Bitcoiners_Bitcoin-for-her-hero_background_banner.png`,
  sarah: `${R2}/uploads/2024/03/African-Bitcoiners_Sarah_White.png`,
  noble: `${R2}/uploads/2024/03/African-Bitcoiners_Bitcoin-for-her-speaker_Noble.png`,
  annie: `${R2}/uploads/2024/03/African-Bitcoiners_Bitcoin-for-her-speaker_Annie.png`,
}

export const META_ITEMS = [
  { icon: 'bookmark' as const, label: 'Empowering African Women with Bitcoin.' },
  { icon: 'calendar' as const, label: '29th September, 3pm UTC.' },
  { icon: 'pin' as const, label: 'Twitter Space Event' },
]

export const SPEAKERS = [
  {
    name: 'Sarah White',
    role: 'Operations Manager, African Bitcoiners.',
    image: IMG.sarah,
    imageWidth: '82%',
    twitter: 'https://twitter.com/IamWhiteSarah',
  },
  {
    name: 'Noble Nyangoma',
    role: 'CEO  Bitcoin Innovation Hub',
    image: IMG.noble,
    imageWidth: '35%',
    twitter: 'https://x.com/N_Nyangoma?s=20',
  },
  {
    name: 'Annie Banywesize',
    role: 'Communications and graphic designer specialist',
    image: IMG.annie,
    imageWidth: '52%',
    twitter: 'https://x.com/AnnieBanywesize?s=20',
  },
]

export const BODY_PARAGRAPHS = [
  'In a world where opportunities are often skewed and barriers seem insurmountable, we rise with an unwavering determination to empower women in the African Bitcoin space. Welcome to "Bitcoin for Her," a resounding call to break down walls, shatter glass ceilings, and forge a new era of inclusion and prosperity. We believe in the immense potential of African women to revolutionize the Bitcoin landscape, and it is our mission to amplify their voices, unleash their genius, and pave the way for a future where gender is no longer a barrier but a catalyst for boundless innovation and growth.',
  'Together, let us build a community that not only celebrates the power of Bitcoin but also fosters a collective strength where women in Africa rise as leaders, pioneers, and visionaries in this transformative digital frontier. Join us in this extraordinary journey of empowerment as we ignite a movement that will shape the very foundation of the African Bitcoin space forever.',
  'Extend this invitation to your loved ones, because together, we can uplift and empower our entire community. Let\'s build a brighter future by fostering financial literacy and empowerment.',
  'Join us and be part of a movement that is reshaping the financial landscape of Africa. Your future awaits – claim it now and pave your path to financial empowerment!',
]

export const SEO = {
  title: 'Bitcoin for Her: Empowering African Women with Bitcoin - African Bitcoiners',
  description:
    'Empower African women with Bitcoin at "Bitcoin for Her": Join our transformative Twitter Space event and ignite a movement of inclusion, innovation, and prosperity.',
}
