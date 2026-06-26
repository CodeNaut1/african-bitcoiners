const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const POSTS_PER_PAGE = 5

export const PROMO_CARDS = [
  {
    title: "Connect to Africa's Favourite Lightning Node Network.",
    href: 'https://freerouting.africa',
    image: `${R2}/uploads/2022/08/Africa-Free-Routing-300x300.png`,
    imageWidth: 300,
    imageHeight: 300,
    alt: "Africa's first free lightning routing node",
  },
  {
    title: 'Earn and Learn with our Bitcoin for Beginners Course',
    href: '/learn-bitcoin/free-bitcoin-course',
    image: `${R2}/uploads/2022/08/bitcoin-1-300x300.png`,
    imageWidth: 300,
    imageHeight: 300,
    alt: 'Bitcoin course',
  },
  {
    title: 'Africa\u2019s Fastest way to top-up your phone',
    image: `${R2}/uploads/2024/03/African-Bitcoiners_Sats2data-logo-white-1-300x300.png`,
    imageWidth: 300,
    imageHeight: 300,
    alt: 'African-Bitcoiners Sats2data logo',
  },
] as const
