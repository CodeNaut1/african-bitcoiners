const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

const img = (path: string) => `${R2}/uploads/${path}`

export const IMG = {
  heroBg: img('2024/03/African-Bitcoiners_Bitcoin-communities-hero-banner.png'),
}

export type CommunityEntry = {
  name: string
  description: string
  image: string
  href: string
  imageFit?: 'cover' | 'contain'
}

export type CountryEntry = {
  name: string
  code: string
  href: string
}

export const COUNTRIES: CountryEntry[] = [
  { name: 'Nigeria', code: 'NG', href: '/top-african-bitcoin-countries-nigeria' },
  { name: 'Kenya', code: 'KE', href: '/top-african-bitcoin-countries-kenya' },
  { name: 'Ghana', code: 'GH', href: '/top-african-bitcoin-countries-ghana' },
  { name: 'Zimbabwe', code: 'ZW', href: '/top-african-bitcoin-countries-zimbabwe' },
  { name: 'South Africa', code: 'ZA', href: '/top-african-bitcoin-countries-south-africa' },
  { name: 'Tanzania', code: 'TZ', href: '/top-african-bitcoin-countries-tanzania' },
  { name: 'Uganda', code: 'UG', href: '/top-african-bitcoin-countries-uganda' },
  { name: 'Ethiopia', code: 'ET', href: '/top-african-bitcoin-countries-ethiopia' },
  { name: 'Egypt', code: 'EG', href: '/top-african-bitcoin-countries-egypt' },
  { name: 'Zambia', code: 'ZM', href: '/top-african-bitcoin-countries-zambia' },
  { name: 'Cameroon', code: 'CM', href: '/top-african-bitcoin-countries-cameroon' },
  { name: 'Namibia', code: 'NA', href: '/top-african-bitcoin-countries-namibia' },
  { name: 'Morocco', code: 'MA', href: '/top-african-bitcoin-countries-morocco' },
  { name: 'Seychelles', code: 'SC', href: '/top-african-bitcoin-countries-seychelles' },
  { name: 'Botswana', code: 'BW', href: '/top-african-bitcoin-countries-botswana' },
  { name: 'Sudan', code: 'SD', href: '/top-african-bitcoin-countries-sudan' },
  { name: 'Ivory Coast', code: 'CI', href: '/top-african-bitcoin-countries-ivory-coast' },
  { name: 'Senegal', code: 'SN', href: '/top-african-bitcoin-countries-senegal' },
  { name: 'Democratic Republic of Congo', code: 'CD', href: '/top-african-bitcoin-countries-democratic-republic-of-congo' },
  { name: 'Liberia', code: 'LR', href: '/top-african-bitcoin-countries-liberia' },
  { name: 'Benin', code: 'BJ', href: '/top-african-bitcoin-countries-benin' },
]

export const COMMUNITIES: CommunityEntry[] = [
  {
    name: 'Togo Bitcoin Community',
    description:
      "Togo Bitcoin Community is the country's first Bitcoin training center. They promote Bitcoin adoption through conferences, developer meetups, education programs, and real-world Bitcoin payments for goods and services.",
    image: img('2024/10/Togo-Bitcoin-Community.jpg'),
    href: 'https://x.com/togobitcoin',
  },
  {
    name: 'Bitcoin Nakfa',
    description:
      'Bitcoin Nakfa offers free Bitcoin education for Eritreans through translated resources, Telegram communities, and home-based peer training. Despite strict local restrictions, they build grassroots awareness one household at a time.',
    image: img('2024/06/Bitcoin-nakfa.jpg'),
    href: 'http://t.me/bitcoinnakfa',
  },
  {
    name: 'Abidjan Bitcoin Meetup',
    description:
      'Abidjan Bitcoin Meetup is a growing community in Ivory Coast focused on meetups, education and Bitcoin awareness.',
    image: img('2024/06/Abidjan-Bitcoin.jpg'),
    href: 'https://btcmap.org/community/abidjan-bitcoin',
  },
  {
    name: 'BitcoinZAR',
    description:
      "BitcoinZAR is South Africa's hub for Bitcoin enthusiasts, offering support and comprehensive resources for everything from Bitcoin fundamentals to wallet setup and peer-to-peer trading.",
    image: img('2024/03/African-Bitcoiners_BitcoinZAR-Community_logo.jpg'),
    href: 'https://www.bitcoinzar.co.za/',
  },
  {
    name: 'BitBiashara',
    description:
      'BitBiashara empowers business owners in Kenya by teaching them how to use Bitcoin in everyday operations from education to practical integration in commerce.',
    image: img('2024/06/BitBiashara.jpg'),
    href: 'https://twitter.com/BitcoinWitsand',
  },
  {
    name: 'Bitcoin Senegal',
    description:
      'Bitcoin Senegal is a vibrant Bitcoin community in Senegal, passionate about exploring various aspects of Bitcoin and its impact on society and the world. They are also the organisers of dakarbtcdays, an event that celebrates Bitcoin in the region.',
    image: img('2024/03/African-Bitcoiners_Bitcoin-Senegal-Community-logo.jpg'),
    href: 'https://twitter.com/bitcoin_sen?s=20',
  },
  {
    name: 'Bitcoin Benin',
    description:
      'Bitcoin Benin is a dynamic Community working for a healthy and rapid adoption of Bitcoin in Benin and in West Africa. Education first, they strive to empower individuals with the knowledge and tools to navigate the world of Bitcoin confidently.',
    image: img('2024/03/African-Bitcoiners_Bitcoin-Benin-Community_logo.jpg'),
    href: 'https://twitter.com/BitcoinBenin?s=20',
  },
  {
    name: 'Bitcoin Nairobi',
    description:
      "Bitcoin Nairobi is pioneering Kenya's Bitcoin circular economy initiative. At Bitcoin Nairobi, we believe in a future where Bitcoin is more than just a digital currency; it's a tool for empowerment, innovation, and financial freedom.",
    image: img('2024/10/Bitcoin-Nairobi.jpg'),
    href: 'https://www.btcnairobi.com',
  },
  {
    name: 'Afribit',
    description:
      "Afribit works to onboard merchants and consumers in Kibera to Bitcoin and Lightning, with a long-term vision of building a community Bitcoin bank using Galoy's open-source stack.",
    image: img('2024/10/AfriBit.jpg'),
    href: 'https://afribit.africa',
  },
  {
    name: 'Bitcoin Anambra',
    description:
      'Bitcoin Anambra is building a grassroots circular Bitcoin economy in Anambra State, Nigeria; focused on real-world adoption and community empowerment.',
    image: img('2024/10/Bitcoin-Anambra.jpg'),
    href: 'http://x.com/bitcoinanambra',
  },
  {
    name: 'Calabar Bitcoin Club',
    description:
      'Based in Cross River State, Nigeria, Calabar Bitcoin Club is building a community-led circular economy through Bitcoin education, adoption, and real-world integration.',
    image: img('2025/04/Y5ZPhTwP_400x400.jpg'),
    href: 'https://x.com/BitcoinCalabar',
  },
  {
    name: 'Luminous Exchange',
    description:
      'Luminous Exchange promotes Bitcoin education across Nigeria through social media awareness, conferences, and local events; with a focus on building a circular Bitcoin economy in Atan, Ogun State.',
    image: img('2024/06/Luminous-exchange.jpg'),
    href: 'https://twitter.com/LumiExc',
  },
  {
    name: 'Bitcoin FRENZY STACK',
    description:
      'Bitcoin Frenzy Stack is a youth-led community using Bitcoin as a tool for empowerment, financial education, and self-reliance across Nigeria.',
    image: img('2025/01/Bitcoin-Frenzy.jpg'),
    href: 'https://x.com/BTC_FrenzyStack?s=09',
  },
  {
    name: 'Bit-Fitness',
    description:
      'Bit-Fitness combines Bitcoin education with sports and wellness; promoting health, financial empowerment and community through fitness-based learning experiences.',
    image: img('2025/03/bit-fitness.jpg'),
    href: 'https://x.com/blaisepeter6?s=21',
  },
  {
    name: 'Bitcoin Business Network',
    description:
      'The Bitcoin Business Network (BBN) is a dynamic platform that connects businesses and consumers through the power of Bitcoin. BBN empowers businesses with modern payment solutions and educates consumers, fostering a circular economy where Bitcoin thrives as a standard means of exchange.',
    image: img('2024/10/Bitcoin-Business-Network.jpg'),
    href: 'https://x.com/bbn_21m?s=21',
  },
  {
    name: 'WeDoBitcoin',
    description:
      'WeDoBitcoin is a business directory and map of owner-operated and small businesses in South Africa that accept Bitcoin for payment. It helps onboard local merchants and supports the Bitcoin circular economy, especially in the Garden Route region of South Africa.',
    image: img('2025/03/WeDoBitcoin.jpg'),
    href: 'https://wedobitcoin.co.za',
  },
  {
    name: 'Bitcoin Victoria Falls',
    description:
      'Bitcoin Victoria Falls is a circular Bitcoin economy based in Livingstone, Zambia focused on education, merchant adoption, and financial empowerment. Part of the Mi Primer Bitcoin Light Node Network.',
    image: img('2024/06/Bitcoin-Victoria-Falls.jpg'),
    href: 'https://x.com/bitcoinvicfalls?s=21',
  },
  {
    name: 'Fedi',
    description:
      "Fedi is on a mission to empower humanity through freedom technology. They are doing this by building the world's first decentralized super app with freedom tech at its core: Bitcoin, Lightning, Fedimint, Nostr, Matrix. These protocols empower users to take full ownership of their digital and financial lives, promoting resiliency, sovereignty, and prosperity.",
    image: img('2024/10/Fedi.jpg'),
    href: 'https://www.fedi.xyz',
  },
  {
    name: 'BTC Sudan',
    description:
      'BTC_Sudan, founded by Sudan Hodl, is dedicated to educating Sudanese youth about Bitcoin. In our journey, we have successfully assisted hundreds of individuals, businesses, and NGOs in adopting Bitcoin.',
    image: img('2024/03/African-Bitcoiners_BTC-Sudan-community-logo.jpg'),
    href: 'https://x.com/btc_sudan?s=21',
  },
  {
    name: 'Bitcoin Togo',
    description:
      'Bitcoin Togo is a community dedicated to Bitcoin developers and individuals interested in Bitcoin development. They provide a space for technical discussions, knowledge sharing, and collaboration around building and contributing to Bitcoin technologies.',
    image: img('2024/10/Togo-Bitcoin-Community.jpg'),
    href: 'https://x.com/togobitcoin?s=21',
  },
  {
    name: 'Bitcoin Zambia',
    description:
      'Bitcoin Zambia is a community dedicated to spreading Bitcoin education and adoption through grassroots initiatives, workshops, and regular meetups that connect and empower people with Bitcoin knowledge.',
    image: img('2025/01/Bitcoin-for-Fairness-Zambia.jpg'),
    href: 'https://bitcoinzambia.org',
    imageFit: 'contain',
  },
]

export const DEV_COMMUNITIES: CommunityEntry[] = [
  {
    name: 'BitDevs',
    description:
      'Bitdev is a Bitcoin community that focuses on teaching young Africans about bitcoin development. They are raising future and reliable developers (in every corner of the world) who can go on to become Bitcoin core contributors and possibly maintainers.',
    image: img('2024/03/African-Bitcoiners_bitdevs-communities-logo.png'),
    href: 'https://builders.btrust.tech/',
    imageFit: 'contain',
  },
  {
    name: 'BTrust Builders',
    description:
      'Btrsut builders, formerly Qala, is a dedicated community and organization that focuses on training and molding sound bitcoin and lightning developers who stand out and contribute effectively to the bitcoin ecosystem.',
    image: img('2024/03/African-Bitcoiners_Btrust-builders-logo.jpg'),
    href: 'https://builders.btrust.tech/',
  },
  {
    name: 'DigiOats',
    description:
      'DigiOats champions Bitcoin research and education, hosting numerous workshops and forums in Nigeria. Their efforts extend across the continent, nurturing a broad-based understanding of Bitcoin.',
    image: img('2024/03/African-Bitcoiners_Digioats_logo.jpg'),
    href: 'https://digioats.io/',
  },
  {
    name: 'Crack The Orange',
    description:
      'Crack The Orange is a Bitcoin community and scholarship program founded by renowned African Bitcoiner Anita Posch, also known for Bitcoin For Fairness. It focuses on funding aspiring Bitcoin educators and developers in Africa and the Global South, aiming to discover and support talented individuals either entering or advancing in the Bitcoin development field.',
    image: img('2024/03/African-Bitcoiners_Crack_The_Orange_Logo.png'),
    href: 'https://my.cracktheorange.com/',
    imageFit: 'contain',
  },
]

export const LINKS = {
  feedbackBounty: '/earn-bitcoin/1000-sats-feedback-bounty',
  submitCommunity: '/african-bitcoin-ecosystem',
  ecosystem: '/african-bitcoin-ecosystem',
}

export const SEO = {
  title: 'Local African Bitcoin Communities - African Bitcoiners',
  description:
    'Discover vibrant Bitcoin communities across Africa — from local meetups and circular economies to developer networks building the future of Bitcoin on the continent.',
}
