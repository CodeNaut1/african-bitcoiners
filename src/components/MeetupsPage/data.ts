const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const IMG = {
  hero: `${R2}/uploads/2024/06/African_Bitcoiners_meetups-2.png`,
  heroWidth: 1656,
  heroHeight: 732,
}

/** Per-card image framing — mirrors Elementor widget CSS on the WP page. */
export type MeetupImageFrame = {
  /** Fixed frame height in px (WP uses explicit heights on several banners/logos). */
  height?: number
  /** Centered logo with constrained width (e.g. BitcoinJHB at 61%). */
  maxWidthPercent?: number
  centered?: boolean
  /** Display at intrinsic width — not stretched to card width (e.g. BitDevs Abuja logo). */
  intrinsic?: boolean
  objectFit?: 'cover' | 'contain'
}

export type MeetupCard = {
  title: string
  /** Banner/logo URL (R2 or Payload `/api/media/file/…`) */
  image: string
  imageWidth: number
  imageHeight: number
  imageFrame?: MeetupImageFrame
  date: string
  /** Optional time line (shown under date with a clock icon) */
  time?: string
  location: string
  ctaText: string
  ctaHref: string
  linkText: string
  linkHref: string
  about: string
}

export type MeetupSection = {
  title: string
  cards: MeetupCard[]
}

export const COPY = {
  heroTitle: 'African Bitcoin Meetups and Events',
  heroParagraphs: [
    'Welcome to the hub of Bitcoin meetups on the continent!',
    'Here you\u2019ll find a growing list of grassroots gatherings where Bitcoiners connect, learn, and build.',
    '\uD83D\uDFE0 Newest meetups are listed at the top.\nCheck back regularly to discover what\u2019s happening near you \u2014 or get inspired to start one!',
  ],
  heroCta: 'I would like to host an event',
  listingFormTitle: 'Let us know about any Bitcoin meetups anywhere in Africa.',
  bountyTitle: 'Get 1,000 sats for your brilliant ideas!',
  bountyText:
    'Have a genius idea or spot something in our African Bitcoiners initiatives that could be even better? Submit your feedback to us and we\u2019re excited to reward you for them.',
  bountyCta: 'Get Started',
  bountyHref: '/1000-sats-feedback-bounty/',
  hostFormTitle: 'Please let us know your location and proposed meetup details',
  attendFormTitle: 'Please add your details to the Bitcoin meetup database',
}

export const SECTIONS: MeetupSection[] = [
  {
    title: 'Upcoming Meetups',
    cards: [
      {
        title: 'BitDevs Mauritius × OSGuild Genesis Workshop',
        image: 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/mauritius-bitdevs.jpeg',
        imageWidth: 1200,
        imageHeight: 630,
        imageFrame: { height: 220, objectFit: 'cover' },
        date: 'July 25th, 2026',
        time: 'All day (in-person)',
        location: 'Workshop17, Telfair, Moka, Mauritius',
        ctaText: 'Register here',
        ctaHref: 'https://workshop.osguild.dev',
        linkText: 'Event page',
        linkHref: 'https://workshop.osguild.dev',
        about:
          'In-person Bitcoin and open-source training from BitDevs Mauritius and OSGuild, supported by Btrust. Hands-on sessions on open-source contribution, Bitcoin tooling, and builder workflows — an entry point for developers and students into Africa\u2019s BitDevs ecosystem.',
      },
      {
        title: 'Rust for Bitcoin 2.0 — TheBuidl',
        image: 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/Rust_For_Bitcoin_2.0.jpeg',
        imageWidth: 1500,
        imageHeight: 500,
        imageFrame: { height: 220, objectFit: 'cover' },
        date: 'July 28th – October 4th, 2026',
        time: '10-week hybrid program',
        location: 'Kaduna, Nigeria + virtual',
        ctaText: 'Apply here',
        ctaHref: 'https://thebuidl.org/rust-for-bitcoin',
        linkText: 'Event page',
        linkHref: 'https://thebuidl.org/rust-for-bitcoin',
        about:
          'Intensive 10-week hybrid training by TheBuidl, sponsored by Btrust. Bitcoin protocol internals, Rust for systems development, Lightning fundamentals, live node access via Bitrpc, and a pathway into Bitcoin open-source contribution. Limited spots.',
      },
    ],
  },
  {
    title: 'Weekly Meetups',
    cards: [
      {
        title: 'Bitcoin Plett',
        image: `${R2}/uploads/elementor/thumbs/plett-r44hxfkoow53wh5sz271dceyfh5v2hkzxbqyc3aiik.jpeg`,
        imageWidth: 640,
        imageHeight: 390,
        date: 'Tuesdays',
        location: 'Plettenberg Bay, South Africa',
        ctaText: 'Contact person',
        ctaHref: 'mailto:community@bitcoiners.africa',
        linkText: 'Follow Bitcoin Plett on X for more information.',
        linkHref: 'https://x.com/BitcoinPlett',
        about: 'Weekly meetings every Tuesday in Plettenberg Bay to meet, mingle and educate.',
      },
      {
        title: 'Bitcoin Watch Party',
        image: `${R2}/uploads/elementor/thumbs/watchpartycouple-scaled-qh22h3bq3lxcnx49qdp5botqmqeumkitxcb5w1igb4.jpg`,
        imageWidth: 600,
        imageHeight: 360,
        date: 'Wednesdays',
        location: 'Discord Channel',
        ctaText: 'Contact person',
        ctaHref: 'mailto:community@bitcoiners.africa',
        linkText: 'Join on Discord',
        linkHref: 'https://discord.gg/wcsfGRs3mt',
        about:
          'Join the African Bitcoiners Discord community every Wednesday for the Bitcoin Watch Party! Don\u2019t miss out on the chance to learn and connect with fellow Bitcoin enthusiasts. See you there!',
      },
      {
        title: 'African Bitcoiners Book Club',
        image: `${R2}/uploads/2023/09/bookclub_header.png`,
        imageWidth: 3600,
        imageHeight: 1200,
        date: 'Fridays',
        location: 'Discord Channel',
        ctaText: 'Contact person',
        ctaHref: 'mailto:community@bitcoiners.africa',
        linkText: 'Join on Discord',
        linkHref: 'https://discord.gg/wcsfGRs3mt',
        about:
          'Join us every Friday at 6 pm UTC in our Discord Community for an engaging session! We are currently discussing \u201cBroken Money\u201d by Lyn Alden. It\u2019s a fantastic opportunity to connect and delve into fascinating Bitcoin and money concepts together.',
      },
      {
        title: 'Bitcoin for Fairness Zambia Bitcoin Meetup',
        image: `${R2}/uploads/2024/05/African_bitcoiners_bff_meetup.png`,
        imageWidth: 1022,
        imageHeight: 367,
        date: 'Saturdays',
        location: 'Lusaka, Zambia',
        ctaText: 'Contact person',
        ctaHref: 'mailto:community@bitcoiners.africa',
        linkText: 'Get directions to the meetup location',
        linkHref: 'https://maps.app.goo.gl/QaprmtRQpB46Qe1u7',
        about:
          'Join the Bitcoin-only educational Meetups, monthly at Scallywags Cafe in Lusaka. Come engage in exciting discussions about Bitcoin, covering everything from the basics to latest news and developments. Whether you\u2019re a beginner or an experienced enthusiast, everyone is invited. It\u2019s also a great chance to connect and network with like-minded individuals who share same passion for Bitcoin!',
      },
      {
        title: 'Bitcoin Loxion Weekly Meetup',
        image: `${R2}/uploads/2024/06/Bitcoin-Loxion-Meetup.jpg`,
        imageWidth: 1500,
        imageHeight: 500,
        date: 'Thursdays',
        location: 'Khayelitsha, Cape Town',
        ctaText: 'Contact person',
        ctaHref: 'https://x.com/BitcoinLoxion',
        linkText: 'Get directions to the meetup location',
        linkHref: 'https://maps.app.goo.gl/sfXL81fBB5pbSRCZA',
        about:
          'If you\u2019re new to Bitcoin, Bitcoin Loxion\u2019s weekly Bitcoin meetup in Khayelitsha Cape Town is a great place to learn. Join them every Thursday at 18:00 for an enriching Bitcoin experience. Send them a DM on Twitter to learn more!',
      },
    ],
  },
  {
    title: 'Monthly / Irregular Meetups',
    cards: [
      {
        title: 'BitcoinJHB',
        image: `${R2}/uploads/2024/06/Bitcoin-Johannesburg.png`,
        imageWidth: 400,
        imageHeight: 400,
        imageFrame: { height: 309, maxWidthPercent: 61, centered: true, objectFit: 'contain' },
        date: 'Every +-2 months.',
        location: 'Johannesburg, South Africa',
        ctaText: 'Contact person',
        ctaHref: 'mailto:community@bitcoiners.africa',
        linkText: 'Follow BitcoinJHB on X for more information.',
        linkHref: 'https://x.com/BitcoinJHB',
        about:
          'Building a strong community of bitcoiners in Johannesburg, South Africa. Let the sats flow. Meetups every +-2 months.',
      },
      {
        title: 'Monthly Bitcoin Meetup: Cape Town',
        image: `${R2}/uploads/2024/05/bitcoin_capetwon_meetup.png`,
        imageWidth: 393,
        imageHeight: 137,
        imageFrame: { height: 314, objectFit: 'cover' },
        date: 'Every First Thursday of the month',
        location: 'Wiggle Car Hire',
        ctaText: 'Contact person',
        ctaHref: 'mailto:community@bitcoiners.africa',
        linkText: 'Get directions to the meetup location',
        linkHref: 'https://maps.app.goo.gl/BYHD1RBqykdmP7jy6',
        about:
          'Join the exciting monthly Bitcoin meetup in Capetown, South Africa! Engage in thrilling discussions about all things Bitcoin, from the latest news to technical analysis. Whether you\u2019re a beginner or a seasoned pro, everyone is invited to come and expand their knowledge. This is also a fantastic opportunity to connect and network with fellow Bitcoin enthusiasts in the area. See you there!',
      },
      {
        title: 'Monthly Bitcoin Meetup: Stellenbosch',
        image: `${R2}/uploads/2024/03/African-Bitcoiners_Stellenbosch_Meetup_logo-e1717509925368.jpg`,
        imageWidth: 400,
        imageHeight: 200,
        date: 'Every 2nd Thursday of the month',
        location: 'Vendetta\u2019s Pizzeria, Hamman Street, Stellenbosch, Cape Town.',
        ctaText: 'Contact person',
        ctaHref: 'https://twitter.com/btc_stellies',
        linkText: 'Get directions to the meetup location',
        linkHref: 'https://maps.app.goo.gl/K4ET5ZoeGaXvQHgU7',
        about:
          'Join the discussion of all things Bitcoin every first Thursday of the month at Vendetta\u2019s Pizzeria, Hamman Street, Stellenbosch, Cape Town. More details.',
      },
    ],
  },
  {
    title: 'Tech/Developer Meetups',
    cards: [
      {
        title: 'BitDevs Abuja',
        image: `${R2}/uploads/2024/06/Bitdevs-abuja.jpg`,
        imageWidth: 213,
        imageHeight: 213,
        imageFrame: { intrinsic: true, centered: true },
        date: 'Last Saturdays of the month',
        location: 'Abuja, Nigeria',
        ctaText: 'Learn More',
        ctaHref: 'https://bitdevsabuja.org/',
        linkText: 'Follow BitDevs Abuja on X for more information.',
        linkHref: 'https://x.com/BitDevsAbuja',
        about:
          'BitDevs is a community for Bitcoin developers or individuals in Bitcoin Development to come together to discuss and participate in technical discussions.',
      },
      {
        title: 'Bitdevs Accra',
        image: `${R2}/uploads/2025/03/bitdevs-accra.jpg`,
        imageWidth: 1500,
        imageHeight: 500,
        imageFrame: { height: 192, objectFit: 'cover' },
        date: 'Last Saturdays of the month',
        location: 'Accra, Ghana',
        ctaText: 'Learn More',
        ctaHref: 'https://x.com/bitdevsAccra',
        linkText: 'Follow BitDevs Accra on X for more information.',
        linkHref: 'https://x.com/bitdevsAccra',
        about:
          'BitDevsAccra is a community in Ghana for those interested in discussing and participating in the research and development of Bitcoin and related protocols.',
      },
      {
        title: 'BitDevs Lagos',
        image: `${R2}/uploads/2025/03/bitdevs-lagos.jpg`,
        imageWidth: 1500,
        imageHeight: 500,
        imageFrame: { height: 298, objectFit: 'cover' },
        date: 'Last Saturdays of the month',
        location: 'Lagos, Nigeria',
        ctaText: 'Learn More',
        ctaHref: 'https://www.bitdevslagos.org/',
        linkText: 'Follow BitDevs Lagos on X for more information.',
        linkHref: 'https://x.com/BitDevsLagos',
        about:
          'Bitdev Lagos is a community of Bitcoin developers working together to foster innovation and collaboration in Nigeria',
      },
      {
        title: 'BitDevs Nairobi',
        image: `${R2}/uploads/2024/06/Bitdevs-nairobi.jpg`,
        imageWidth: 400,
        imageHeight: 400,
        imageFrame: { height: 288, objectFit: 'contain' },
        date: 'Last Saturdays of the month',
        location: 'Nairobi, Kenya',
        ctaText: 'Learn More',
        ctaHref: 'https://t.co/j6pewGRcff',
        linkText: 'Follow BitDevs Nairobi on X for more information.',
        linkHref: 'https://x.com/BitDevsNBO',
        about:
          'Bitdevs Nairobi is a community of Bitcoin developers and Bitcoin tech enthusiasts from Kenya, specifically in the capital city of Nairobi.',
      },
      {
        title: 'BitDevs Joburg',
        image: `${R2}/uploads/2025/04/bitdevsjoburg.jpg`,
        imageWidth: 1500,
        imageHeight: 500,
        date: 'Last Saturdays of the month',
        location: 'Johannesburg, South Africa',
        ctaText: 'Learn More',
        ctaHref: 'https://bitdevs.joburg/',
        linkText: 'Follow BitDevs Joburg on X for more information.',
        linkHref: 'https://x.com/BitDevsJHB',
        about:
          'A Johannesburg BitDevs community meet-up with socratic style seminars diving into new developments in Bitcoin.',
      },
    ],
  },
]
