const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const PARTICIPANT_COUNT = 631

export const LINKS = {
  savingsCalculator: '/save-bitcoin/5-year-bitcoin-savings-calculator',
  feedbackBounty: '/earn-bitcoin/1000-sats-feedback-bounty',
}

export const IMG = {
  heroBanner: `${R2}/uploads/2024/03/African-Bitcoiners_Million-Sat-Challenge-hero_banner.png`,
  decentralized: `${R2}/uploads/2024/03/African-Bitcoiners_Million_Sat_Challenge_vector_decentralized.png`,
  deflationary: `${R2}/uploads/2024/03/African-Bitcoiners_Million-Sat-Challenge-vector_deflationary.png`,
  increasedSavings: `${R2}/uploads/2024/03/African-Bitcoiners_Million-Sat-Challenge-vector-increased_savings.png`,
  accessibility: `${R2}/uploads/2024/03/African-Bitcoiners_Million-Sat-Challenge-vector-Accessibility.png`,
  altEconomy: `${R2}/uploads/2024/03/African-Bitcoiners_Million-Sat-Challenge-vector-alt_economy.png`,
  privacy: `${R2}/uploads/2024/03/African-Bitcoiners_Million-Sat-Challenge-vector-privacy.png`,
  hardToSteal: `${R2}/uploads/2024/03/African-Bitcoiners_Million-Sat-Challenge-vector-hard_to_steal.png`,
  lifetimeOpportunity: `${R2}/uploads/2024/03/African-Bitcoiners_Million-Sat-Challenge-vector-Lifetime_opportunity.png`,
  satsking: `${R2}/uploads/2025/07/Satskings.png`,
  anonymous: `${R2}/uploads/2025/07/Anonymous.png`,
  harounKoala: `${R2}/uploads/2025/07/MSC-Feedback-avatar.png`,
}

/** Country list matches Gravity Form 93 on WP (including non-African options). */
export const MSC_COUNTRIES = [
  'Angola',
  'Algeria',
  'Benin',
  'Botswana',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cameroon',
  'Central African Republic (CAR)',
  'Chad',
  'Comoros',
  'Congo',
  'Democratic Republic of the  Congo',
  "Republic of the Cote d'Ivoire",
  'Djibouti',
  'Egypt',
  'Equatorial Guinea',
  'Eritrea',
  'Eswatini',
  'Ethiopia',
  'Gabon',
  'Gambia',
  'Ghana',
  'Guinea',
  'Guinea-Bissau',
  'Kenya',
  'Lesotho',
  'Liberia',
  'Libya',
  'Madagascar',
  'Malawi',
  'Mali',
  'Mauritania',
  'Mauritius',
  'Morocco',
  'Mozambique',
  'Namibia',
  'Niger',
  'Nigeria',
  'Rwanda',
  'Sao Tome and Principe',
  'Senegal',
  'Seychelles',
  'Sierra Leone',
  'Somalia',
  'South Africa',
  'South Sudan',
  'Sudan',
  'Tanzania',
  'Togo',
  'Tunisia',
  'Uganda',
  'Zambia',
  'Zimbabwe',
  'Antarctica',
  'Asia',
  'Australia',
  'Europe',
  'North America',
  'South America',
]

export const WHY_BITCOIN_CARDS = [
  {
    title: 'Decentralized and Secure',
    text: 'Bitcoin is a decentralized currency that uses cryptography to secure transactions and control the creation of new units. Bitcoin is not subject to control by governments or financial institutions, unlike traditional currencies, making it resistant to censorship.',
    icon: IMG.decentralized,
    alt: 'Million Sat Challenge- Vector Decentralized',
  },
  {
    title: 'Deflationary asset',
    text: 'Bitcoin has a limited supply of 21 million coins, which means that it cannot be inflated like fiat currencies. This means its value may increase over time due to its scarcity, making Bitcoin a deflationary asset.',
    icon: IMG.deflationary,
    alt: 'Million Sat Challenge- Vector Deflationary',
  },
  {
    title: 'Increased savings value',
    text: 'While Bitcoin is volatile, it\u2019s value goes up over the long term helping boost your savings.',
    icon: IMG.increasedSavings,
    alt: 'Million Sat Challenge- Vector Increased Savings',
  },
  {
    title: 'Accessibility',
    text: 'Bitcoin is accessible to anyone with an internet connection and can be bought and sold on a variety of online exchanges. This makes it easy for anyone to invest in Bitcoin and potentially benefit from its growth.',
    icon: IMG.accessibility,
    alt: 'Million Sat Challenge- Vector Accessibility',
  },
  {
    title: 'Alternative Economy',
    text: 'Bitcoin provides you with an alternative savings currency outside of your country\u2019s economy, allowing you to diversify your savings across different asset classes and guard against inflation or currency depreciation.',
    icon: IMG.altEconomy,
    alt: 'Million Sat Challenge- Vector Alternative Economy',
  },
  {
    title: 'Privacy',
    text: 'Bitcoin transactions are pseudonymous, which means that your identity is not revealed during transactions. This offers you a level of privacy for your savings, with no one monitoring how much you have saved.',
    icon: IMG.privacy,
    alt: 'Million Sat Challenge- Vector Privacy',
  },
  {
    title: 'Hard to steal',
    text: 'Hard to Steal: Because you can keep your Bitcoin life savings in 12 words in your head, it is very hard to steal. People won\u2019t even know its there!',
    icon: IMG.hardToSteal,
    alt: 'Million Sat Challenge- Vector Hard to steal',
  },
  {
    title: 'Opportunity of a lifetime',
    text: 'Bitcoin is the future and yet less than 1% of the world understands it. What an opportunity for Africans to leapfrog the rest of the world!!',
    icon: IMG.lifetimeOpportunity,
    alt: 'Million Sat Challenge- Vector Opportunity of a lifetime',
  },
] as const

export const TESTIMONIALS = [
  {
    name: 'Satsking',
    image: IMG.satsking,
    preview:
      'I saved consistently but didn\u2019t reach my full goal. My dream is to become the first young Bitcoin millionaire. At times, I lost discipline and found it difficult to keep saving my sats. I stayed focused on my goal. Over time, my savings kept growing.',
    full: 'I saved consistently but didn\u2019t reach my full goal. My dream is to become the first young Bitcoin millionaire. At times, I lost discipline and found it difficult to keep saving my sats. I stayed focused on my goal. Over time, my savings kept growing.',
  },
  {
    name: 'Anonymous',
    image: IMG.anonymous,
    preview:
      'I joined the Million Sats Saving Challenge when Bitcoin was at $15,000. I consistently saved 10% of my income throughout 2022 and 2023. Fast forward to today \u2014 my savings are now over 0.1 BTC.',
    full: 'I joined the Million Sats Saving Challenge when Bitcoin was at $15,000. I consistently saved 10% of my income throughout 2022 and 2023. Fast forward to today \u2014 my savings are now over 0.1 BTC.',
  },
  {
    name: 'Haroun Koala',
    image: IMG.harounKoala,
    preview:
      'Yes! I have reached the 1 million sats goal. I have always wanted to be a millionaire, and from the very beginning, I have seen Bitcoin as a grassroots form of money \u2014 by the people, for the masses.',
    full: `Yes! I have reached the 1 million sats goal. I have always wanted to be a millionaire, and from the very beginning, I have seen Bitcoin as a grassroots form of money — by the people, for the masses.

How did I achieve this?
I stayed disciplined and did not spend my stack.,
I remained focused on my goal from the start.

My message to others:
Keep stacking and you will reach your goals. Regular encouragement really helps — keep the positive messages coming!

Keep stacking and you will reach your goals. Regular encouragement really helps — keep the positive messages coming!`,
  },
] as const
