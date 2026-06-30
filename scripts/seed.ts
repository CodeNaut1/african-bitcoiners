import { getPayload } from 'payload'
import config from '@/payload.config'
import { seedFormSettings } from './seed-form-settings'

function makeSVGLogo(name: string, bg = '#FD5A47'): Buffer {
  const safe = name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60" viewBox="0 0 200 60"><rect width="200" height="60" fill="${bg}" rx="4"/><text x="100" y="38" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" font-weight="bold" fill="white">${safe}</text></svg>`
  return Buffer.from(svg, 'utf-8')
}

function makeLexical(text: string) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            { type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

async function seed() {
  const payload = await getPayload({ config })

  payload.logger.info('Seeding globals...')

  // ── Site Settings ───────────────────────────────────────────────────────────
  await (payload.updateGlobal as any)({
    slug: 'site-settings',
    data: {
      siteName: 'African Bitcoiners',
      tagline: 'Your Bitcoin Journey Starts Here',
      siteDescription:
        'African Bitcoiners is a Bitcoin education and adoption platform dedicated to building a Bitcoin-friendly Africa.',
      socialLinks: [
        { platform: 'twitter', url: 'https://twitter.com/AfricanBitcoins' },
        { platform: 'instagram', url: 'https://www.instagram.com/africanbitcoiners/' },
        { platform: 'facebook', url: 'https://www.facebook.com/AfricanBitcoiners' },
        { platform: 'linkedin', url: 'https://www.linkedin.com/company/african-bitcoiners' },
        { platform: 'telegram', url: 'https://t.me/africanbitcoiners' },
        { platform: 'whatsapp', url: 'https://chat.whatsapp.com/africanbitcoiners' },
        { platform: 'nostr', url: 'https://njump.me/africanbitcoiners' },
      ],
      chatbot: {
        chatbotEnabled: true,
        chatbotApiUrl: process.env.NEXT_PUBLIC_CHATBOT_API_URL || '',
        chatbotLogUrl: process.env.NEXT_PUBLIC_CHATBOT_LOG_URL || '',
      },
      analytics: {
        analyticsEnabled: true,
        gtmId: process.env.NEXT_PUBLIC_GTM_ID || 'GTM-P3M4DLWQ',
        ga4Id: process.env.NEXT_PUBLIC_GA4_ID || '',
      },
      donationBTCPayLink: process.env.BTCPAY_DONATION_URL || '',
    },
  })

  payload.logger.info('✓ Site Settings seeded')

  // ── Header Navigation ───────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        { label: 'Home', type: 'link', url: '/' },
        {
          label: 'Learn',
          type: 'dropdown',
          children: [
            { label: 'Free Bitcoin Course', url: '/learn-bitcoin/free-bitcoin-course/' },
            { label: 'Top 10 Bitcoin Misconceptions', url: '/learn-bitcoin/top-10-bitcoin-misconceptions/' },
            { label: 'Bitcoin for Kids', url: '/learn-bitcoin/bitcoin-for-kids/' },
            { label: 'Bitcoin Learning Resources', url: '/learn-bitcoin/bitcoin-learning-resources/' },
            { label: 'African Language Resources', url: '/learn-bitcoin/african-language-resources/' },
            { label: 'Why Bitcoin Only', url: '/learn-bitcoin/why-bitcoin-only/' },
            { label: 'Bitcoin White Paper', url: '/learn-bitcoin/bitcoin-whitepaper/' },
          ],
        },
        {
          label: 'Earn',
          type: 'dropdown',
          children: [
            { label: '1000 Sats Feedback Bounty', url: '/earn-bitcoin/1000-sats-feedback-bounty/' },
            { label: 'African Bitcoiner Jobs', url: '/earn-bitcoin/bitcoiner-jobs/' },
            { label: 'Places to Earn Sats', url: '/earn-bitcoin/places-to-earn-sats/' },
          ],
        },
        {
          label: 'Save',
          type: 'dropdown',
          children: [
            { label: 'Bitcoin Inflation Simulator', url: '/save-bitcoin/bitcoin-inflation-simulator/' },
            { label: 'Million Sat Challenge', url: '/save-bitcoin/million-sat-challenge/' },
            { label: 'Recommended Wallets', url: '/save-bitcoin/recommended-bitcoin-and-lightning-wallets/' },
            { label: 'Buying Bitcoin Peer to Peer', url: '/save-bitcoin/buying-bitcoin-peer-to-peer/' },
            { label: '5-Year Savings Calculator', url: '/save-bitcoin/5-year-bitcoin-savings-calculator/' },
            { label: 'Bitcoin Cold Storage Guide', url: '/save-bitcoin/how-to-setup-your-bitcoin-cold-storage-for-free/' },
            { label: 'Bitcoin to Fiat Converter', url: '/save-bitcoin/bitcoin-to-fiat-converter/' },
          ],
        },
        {
          label: 'Spend',
          type: 'dropdown',
          children: [
            { label: 'Bitcoiners Map', url: '/spend-bitcoin/bitcoiners-map/' },
            { label: 'Places to Spend Sats', url: '/spend-bitcoin/places-to-spend-bitcoin/' },
          ],
        },
        {
          label: 'Community',
          type: 'dropdown',
          children: [
            { label: 'Most Impactful African Bitcoiners', url: '/the-most-impactful-african-bitcoiners-of-2025/' },
            { label: 'African Bitcoin Ecosystem', url: '/african-bitcoin-ecosystem/' },
            { label: 'Treasury Manifesto', url: '/african-bitcoin-treasury-manifesto/' },
            { label: 'Bitcoin Mining', url: '/bitcoin-mining-in-africa/' },
            { label: 'Hall of Fame', url: '/hall-of-fame/' },
            { label: 'Bitcoin Meetups', url: '/bitcoin-meetups/' },
            { label: 'Newsletter', url: '/bitcoin-newsletter/' },
          ],
        },
        {
          label: 'About',
          type: 'dropdown',
          children: [
            { label: 'About Us', url: '/about-us/' },
            { label: 'Support Us', url: '/about-us/support-us/' },
            { label: 'Proof of Work', url: '/about-us/african-bitcoiners-proof-of-work/' },
            { label: 'Our Team', url: '/about-us/our-team/' },
            { label: 'Connect with Us', url: '/about-us/connect-with-us/' },
            { label: 'FAQs', url: '/about-us/faqs/' },
          ],
        },
      ],
    },
  })

  payload.logger.info('✓ Header navigation seeded')

  // ── Footer ──────────────────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      description:
        'African Bitcoiners is a Bitcoin education and adoption platform dedicated to building a Bitcoin-friendly Africa.',
      quickLinks: [
        { label: 'INFLATION SIMULATOR', url: '/save-bitcoin/bitcoin-inflation-simulator/' },
        { label: 'AFRICA BITCOIN NEWS', url: 'https://bitcoinnews.africa/' },
        { label: 'BITCOIN STARTER BOOK', url: '/bitcoin-africas-guide-to-freedom-money/' },
        { label: 'BITCOIN MINING', url: '/bitcoin-mining-in-africa/' },
      ],
      utilityLinks: [
        { label: 'FAQs', url: '/about-us/faqs/' },
        { label: 'SITEMAP', url: '/page-sitemap.xml' },
        { label: 'SUPPORT US', url: '/about-us/support-us/' },
        { label: 'BITCOIN TEST', url: 'https://bitcoinertest.com/' },
      ],
      copyrightText: `© ${new Date().getFullYear()} African Bitcoiners. All rights reserved.`,
    },
  })

  payload.logger.info('✓ Footer seeded')

  // ── Partners ─────────────────────────────────────────────────────────────────
  const existingPartners = await payload.find({ collection: 'partners', limit: 1 })
  if (existingPartners.totalDocs === 0) {
    payload.logger.info('Seeding partners...')

    const partnerDefs = [
      { name: 'HRF', color: '#2B4899', url: 'https://hrf.org', width: 100 },
      { name: 'iPayBTC', color: '#F7931A', url: 'https://ipaybtc.com', width: 110 },
      { name: 'Citrusrate', color: '#28A745', url: 'https://citrusrate.com', width: 120 },
      { name: 'Trezor Academy', color: '#1D2951', url: 'https://trezor.io/learn', width: 140 },
      { name: 'BTrust', color: '#F05A28', url: 'https://btrust.tech', width: 100 },
    ]

    for (const p of partnerDefs) {
      const svg = makeSVGLogo(p.name, p.color)
      const media = await payload.create({
        collection: 'media',
        data: { alt: `${p.name} logo` },
        file: {
          data: svg,
          name: `logo-${p.name.toLowerCase().replace(/[\s]+/g, '-')}.svg`,
          mimetype: 'image/svg+xml',
          size: svg.length,
        },
      })
      await payload.create({
        collection: 'partners',
        data: {
          name: p.name,
          logoImage: media.id,
          websiteURL: p.url,
          logoWidth: p.width,
        },
      })
    }

    payload.logger.info('✓ Partners seeded')
  } else {
    payload.logger.info('Partners already seeded — skipping')
  }

  // ── Testimonials ─────────────────────────────────────────────────────────────
  const existingTestimonials = await payload.find({ collection: 'testimonials', limit: 1 })
  if (existingTestimonials.totalDocs === 0) {
    payload.logger.info('Seeding testimonials...')

    const testimonialDefs = [
      {
        text: 'African Bitcoiners has been instrumental in helping our community understand and adopt Bitcoin. Their educational resources are top-notch!',
        name: 'Bitcoin Zambia',
        initial: 'B',
        avatarColor: '#F7931A',
      },
      {
        text: "Thanks to African Bitcoiners, I was able to learn about Bitcoin and start using Lightning for my everyday transactions. Truly life-changing!",
        name: 'Tando',
        initial: 'T',
        avatarColor: '#253343',
      },
      {
        text: "The resources provided by African Bitcoiners have been invaluable. I've learned so much about how Bitcoin can protect my savings from inflation.",
        name: 'Aliyu',
        initial: 'A',
        avatarColor: '#FD5A47',
      },
      {
        text: 'Trezor Academy is proud to partner with African Bitcoiners in spreading Bitcoin education across the continent. Together we are making a real difference.',
        name: 'Trezor Academy',
        initial: 'T',
        avatarColor: '#1D2951',
      },
      {
        text: 'African Bitcoiners is doing incredible work to bring Bitcoin adoption to Africa. Their newsletter keeps me updated on all the latest developments across the continent.',
        name: '@Scarlette_Melon',
        initial: 'S',
        avatarColor: '#FF8C00',
      },
    ]

    for (const t of testimonialDefs) {
      await payload.create({
        collection: 'testimonials',
        data: t,
      })
    }

    payload.logger.info('✓ Testimonials seeded')
  } else {
    payload.logger.info('Testimonials already seeded — skipping')
  }

  // ── Homepage Page ─────────────────────────────────────────────────────────────
  // Real homepage uses slug "home", served at /.
  payload.logger.info('✓ Homepage seed skipped (slug: home)')
  if (false as boolean) {
  const existingHome = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })

  const homeData = {
    title: 'Home',
    _status: 'published' as const,
    meta: {
      title: 'African Bitcoiners — Bringing Freedom to Africa through Bitcoin',
      description:
        'African Bitcoiners is a Bitcoin education and adoption platform dedicated to building a Bitcoin-friendly Africa. Learn, earn, save, and spend Bitcoin.',
    },
    content: [
      // 1. Hero
      {
        blockType: 'hero',
        layout: 'text-left-image-right',
        heading: 'Bringing Freedom to Africa through Bitcoin',
        subheading: makeLexical(
          "We educate, connect, and empower Africans to take control of their financial future using Bitcoin — the world's hardest money.",
        ),
        links: [
          {
            link: {
              type: 'custom',
              label: 'Start your Bitcoin Journey',
              url: '/learn-bitcoin/free-bitcoin-course/',
              newTab: false,
              appearance: 'default',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Support Our Mission',
              url: '/about-us/support-us/',
              newTab: false,
              appearance: 'outline',
            },
          },
        ],
        backgroundType: 'cream',
        images: [],
      },

      // 2. Partners Carousel
      {
        blockType: 'partnersCarousel',
        heading: 'Trusted by builders, educators, and Bitcoin leaders across Africa',
        useGlobalPartners: true,
        speed: 'normal',
      },

      // 3. Card Grid — Your Bitcoin Journey
      {
        blockType: 'cardGrid',
        eyebrow: 'Your Bitcoin Journey Starts Here',
        heading: 'How Can We Help You?',
        columns: '2',
        variant: 'orange-accent',
        cards: [
          {
            eyebrow: '📚',
            title: 'Learn Bitcoin',
            description: makeLexical(
              'Start your Bitcoin education journey with our free beginner course and resources tailored for Africans.',
            ),
            linkLabel: 'Start Learning →',
            linkUrl: '/learn-bitcoin/',
            linkNewTab: false,
          },
          {
            eyebrow: '💰',
            title: 'Earn Bitcoin',
            description: makeLexical(
              'Discover ways to earn Bitcoin through jobs, freelance work, and our 1,000 sats feedback bounty program.',
            ),
            linkLabel: 'Start Earning →',
            linkUrl: '/earn-bitcoin/',
            linkNewTab: false,
          },
          {
            eyebrow: '🔐',
            title: 'Save Bitcoin',
            description: makeLexical(
              'Learn how to securely store and grow your Bitcoin savings — protecting your wealth from inflation.',
            ),
            linkLabel: 'Start Saving →',
            linkUrl: '/save-bitcoin/',
            linkNewTab: false,
          },
          {
            eyebrow: '🛍️',
            title: 'Spend Bitcoin',
            description: makeLexical(
              'Find merchants and platforms where you can spend Bitcoin across Africa and beyond.',
            ),
            linkLabel: 'Start Spending →',
            linkUrl: '/spend-bitcoin/',
            linkNewTab: false,
          },
        ],
      },

      // 4. Stats Bar
      {
        blockType: 'statsBar',
        backgroundColor: 'dark',
        stats: [
          { value: '10k+', label: 'COMMUNITY' },
          { value: '170+', label: 'AFRICAN BITCOIN PROJECTS TRACKED' },
          { value: '12', label: 'BOOTCAMPS ACROSS AFRICA' },
        ],
      },

      // 5. Products Grid
      {
        blockType: 'productsGrid',
        eyebrow: 'OUR PRODUCTS',
        heading: 'Built for Real Impact',
        products: [
          {
            name: 'Africa Bitcoin News',
            tagline: 'Your daily Bitcoin briefing for Africa',
            description:
              'Stay up to date with the latest Bitcoin news, adoption stories, and market updates across Africa.',
            primaryButtonLabel: 'VISIT WEBSITE',
            primaryButtonUrl: 'https://africanbitcoinnews.com',
            features: [
              { feature: 'Daily Bitcoin news for Africa' },
              { feature: 'Community stories and interviews' },
              { feature: 'Market analysis and education' },
            ],
          },
          {
            name: 'Africa Free Routing',
            tagline: 'Free Lightning routing for African nodes',
            description:
              'A dedicated Lightning Network routing node providing free routing services to African Bitcoin nodes.',
            primaryButtonLabel: 'VISIT WEBSITE',
            primaryButtonUrl: 'https://amboss.space',
            features: [
              { feature: 'Free routing for African nodes' },
              { feature: 'Lightning Network infrastructure' },
              { feature: 'Supporting African Bitcoin ecosystem' },
            ],
          },
          {
            name: 'African Bitcoin Live Directory',
            tagline: 'The most comprehensive African Bitcoin directory',
            description:
              'A live-updated directory of 170+ Bitcoin projects, communities, educators, and businesses across Africa.',
            primaryButtonLabel: 'VISIT WEBSITE',
            primaryButtonUrl: '/african-bitcoin-ecosystem/',
            features: [
              { feature: '170+ African Bitcoin projects' },
              { feature: 'Searchable and filterable' },
              { feature: 'Updated in real-time' },
            ],
          },
          {
            name: 'The Bitcoiner Test',
            tagline: 'Test your Bitcoin knowledge',
            description:
              "A fun interactive quiz to test how much you know about Bitcoin — and learn what you don't.",
            primaryButtonLabel: 'VISIT WEBSITE',
            primaryButtonUrl: 'https://thebitcoinertest.com',
            features: [
              { feature: 'Interactive Bitcoin quiz' },
              { feature: 'Learn as you play' },
              { feature: 'Share your score' },
            ],
          },
          {
            name: 'Sats2Data',
            tagline: 'Buy mobile data with Bitcoin',
            description:
              'Buy mobile data and airtime across Africa using Bitcoin Lightning Network payments.',
            primaryButtonLabel: 'VISIT WEBSITE',
            primaryButtonUrl: 'https://sats2data.com',
            features: [
              { feature: 'Buy data with Lightning' },
              { feature: 'Works across Africa' },
              { feature: 'Instant top-up' },
            ],
          },
          {
            name: 'Zapads',
            tagline: 'Bitcoin-powered advertising platform',
            description:
              'An advertising platform where advertisers pay with Bitcoin and publishers earn sats.',
            primaryButtonLabel: 'VISIT WEBSITE',
            primaryButtonUrl: 'https://zapads.net',
            features: [
              { feature: 'Pay and earn in sats' },
              { feature: 'Privacy-first advertising' },
              { feature: 'Lightning-powered' },
            ],
          },
        ],
      },

      // 6. Testimonials Carousel
      {
        blockType: 'testimonialsCarousel',
        heading: 'Community Feedback & Testimonials',
        useGlobalTestimonials: true,
        backgroundColor: 'cream',
      },

      // 7. Support Section
      {
        blockType: 'supportSection',
        eyebrow: 'Support Us',
        heading: 'Support Our Mission',
        description:
          'African Bitcoiners is a community-funded Bitcoin education platform. Your support helps us create free resources, run bootcamps, and grow Bitcoin adoption across Africa.',
        bulletPoints: [
          { point: 'Fund free Bitcoin education for Africans' },
          { point: 'Support our 1,000 Sats Feedback Bounty program' },
          { point: 'Help us run Bitcoin bootcamps across Africa' },
          { point: 'Keep our tools and directory free for everyone' },
        ],
        primaryButtonLabel: 'Donate Now',
        primaryButtonUrl: '/about-us/support-us/',
        secondaryButtonLabel: 'Learn More',
        secondaryButtonUrl: '/about-us/',
        backgroundColor: 'cream',
      },

      // 8. Newsletter Signup
      {
        blockType: 'newsletterSignup',
        heading: 'Get Involved',
        subheading:
          'Join 10,000+ Africans learning about Bitcoin. Get our weekly newsletter with the latest news, education, and opportunities across Africa.',
        buttonLabel: 'Sign me up!',
        backgroundColor: 'dark',
        successMessage: "You're on the list! Check your inbox for a confirmation email.",
      },
    ] as any,
  }

  if (existingHome.totalDocs === 0) {
    payload.logger.info('Seeding homepage...')
    await payload.create({ collection: 'pages', data: { slug: 'home', ...homeData } })
    payload.logger.info('✓ Homepage seeded')
  } else {
    payload.logger.info('Updating homepage with custom block composition...')
    await (payload.update as any)({ collection: 'pages', id: existingHome.docs[0].id, data: homeData })
    payload.logger.info('✓ Homepage updated')
  }
  }

  // ── Section Landing Pages ───────────────────────────────────────────────────
  payload.logger.info('Seeding section landing pages...')

  type CardDef = { title: string; description: string; url: string }
  type SectionPageDef = {
    title: string
    slug: string
    heroHeading: string
    heroSubtitle: string
    cards: CardDef[]
    ctaHeading: string
    ctaSubheading?: string
    ctaVariant: 'orange' | 'dark' | 'light'
    ctaPrimaryLabel: string
    ctaPrimaryUrl: string
    ctaSecondaryLabel?: string
    ctaSecondaryUrl?: string
  }

  const sectionPageDefs: SectionPageDef[] = [
    // ── Learn Bitcoin ──
    {
      title: 'Learn Bitcoin',
      slug: 'learn-bitcoin',
      heroHeading: 'LEARN BITCOIN',
      heroSubtitle:
        'Your Bitcoin education starts here. From free beginner courses to advanced resources, we have everything you need to understand and use Bitcoin.',
      cards: [
        {
          title: 'Free Bitcoin Course',
          description:
            'Start your Bitcoin journey with our free beginner course, designed specifically for Africans.',
          url: '/learn-bitcoin/free-bitcoin-course/',
        },
        {
          title: 'Top 10 Bitcoin Misconceptions',
          description: 'Clear up the most common myths and misconceptions about Bitcoin.',
          url: '/learn-bitcoin/top-10-bitcoin-misconceptions/',
        },
        {
          title: 'Bitcoin for Kids',
          description: 'Fun and engaging Bitcoin education resources designed for younger learners.',
          url: '/learn-bitcoin/bitcoin-for-kids/',
        },
        {
          title: 'Bitcoin Learning Resources',
          description: 'A curated collection of the best Bitcoin learning materials available.',
          url: '/learn-bitcoin/bitcoin-learning-resources/',
        },
        {
          title: 'Keeping Bitcoin in Your Head',
          description: 'Learn how to memorize your seed phrase and keep your Bitcoin truly secure.',
          url: '/learn-bitcoin/how-to-keep-bitcoin-in-your-head/',
        },
        {
          title: 'African Language Resources',
          description:
            'Bitcoin educational content in African languages including Hausa, Swahili, Amharic, and more.',
          url: '/learn-bitcoin/african-language-resources/',
        },
        {
          title: 'Why Bitcoin Only',
          description:
            'Understand why Bitcoin is the only cryptocurrency worth your attention and savings.',
          url: '/learn-bitcoin/why-bitcoin-only/',
        },
        {
          title: 'Bitcoin White Paper',
          description:
            "Read and understand Satoshi Nakamoto's original Bitcoin white paper.",
          url: '/learn-bitcoin/bitcoin-whitepaper/',
        },
      ],
      ctaHeading: 'Get 1,000 Sats for Your Brilliant Ideas!',
      ctaSubheading:
        'Found an error? Have a suggestion for new content? Submit your feedback and earn 1,000 sats.',
      ctaVariant: 'orange',
      ctaPrimaryLabel: 'Submit Feedback',
      ctaPrimaryUrl: '/earn-bitcoin/1000-sats-feedback-bounty/',
    },

    // ── Earn Bitcoin ──
    {
      title: 'Earn Bitcoin',
      slug: 'earn-bitcoin',
      heroHeading: 'EARN IN BITCOIN',
      heroSubtitle: 'Find out some of the ways you can earn in Bitcoin',
      cards: [
        {
          title: 'Find Places to Earn Sats',
          description:
            'Find a list of sites that will reward you sats for completing tasks, reading, playing games and so much more.',
          url: '/earn-bitcoin/places-to-earn-sats/',
        },
        {
          title: 'Find Bitcoiner Jobs',
          description: 'Find African Bitcoin talents for your vacant roles or find jobs where you get paid in Bitcoin.',
          url: '/earn-bitcoin/bitcoiner-jobs/',
        },
        {
          title: '1000 Sats Feedback Bounty',
          description: 'Have a genius idea or spot something wrong on our website? Let us know and get rewarded.',
          url: '/earn-bitcoin/1000-sats-feedback-bounty/',
        },
      ],
      ctaHeading: 'Get 1,000 sats for your brilliant ideas!',
      ctaSubheading:
        'Have a genius idea or spot something in our African Bitcoiners initiatives that could be even better? Submit your feedback to us and we\u2019re excited to reward you for them.',
      ctaVariant: 'orange',
      ctaPrimaryLabel: 'Get Started',
      ctaPrimaryUrl: '/earn-bitcoin/1000-sats-feedback-bounty/',
    },

    // ── Save Bitcoin ──
    {
      title: 'Save Bitcoin',
      slug: 'save-bitcoin',
      heroHeading: 'SAVE BITCOIN',
      heroSubtitle:
        'Protect your savings from inflation by holding Bitcoin. Learn how to buy, store, and grow your Bitcoin securely.',
      cards: [
        {
          title: 'Bitcoin Inflation Simulator',
          description:
            'See how Bitcoin would have protected your savings compared to your local currency over any time period.',
          url: '/save-bitcoin/bitcoin-inflation-simulator/',
        },
        {
          title: 'Million Sat Challenge',
          description: 'Join thousands of Africans saving their first million satoshis.',
          url: '/save-bitcoin/million-sat-challenge/',
        },
        {
          title: 'Recommended Wallets',
          description: 'Find the best Bitcoin and Lightning wallets for safe and secure storage.',
          url: '/save-bitcoin/recommended-bitcoin-and-lightning-wallets/',
        },
        {
          title: 'Buying Bitcoin Peer 2 Peer',
          description:
            'Want to buy Bitcoin in Africa but not sure where to start? We recommend doing it peer-to peer, it is more private.',
          url: '/save-bitcoin/buying-bitcoin-peer-to-peer/',
        },
        {
          title: '5-Year Savings Calculator',
          description: 'Calculate how much your Bitcoin savings could be worth in 5 years.',
          url: '/save-bitcoin/5-year-bitcoin-savings-calculator/',
        },
        {
          title: 'Bitcoin Cold Storage Guide',
          description: 'Learn how to set up free and secure Bitcoin cold storage step-by-step.',
          url: '/save-bitcoin/how-to-setup-your-bitcoin-cold-storage-for-free/',
        },
        {
          title: 'Bitcoin to Fiat Converter',
          description:
            'Convert Bitcoin to your local African currency in real-time.',
          url: '/save-bitcoin/bitcoin-to-fiat-converter/',
        },
      ],
      ctaHeading: 'Protect Your Wealth from Inflation',
      ctaSubheading:
        'Bitcoin has outperformed every African currency over the last decade. Start saving today.',
      ctaVariant: 'orange',
      ctaPrimaryLabel: 'Try the Inflation Simulator',
      ctaPrimaryUrl: '/save-bitcoin/bitcoin-inflation-simulator/',
      ctaSecondaryLabel: 'Take the Million Sat Challenge',
      ctaSecondaryUrl: '/save-bitcoin/million-sat-challenge/',
    },

    // ── Spend Bitcoin ──
    {
      title: 'Spend Bitcoin',
      slug: 'spend-bitcoin',
      heroHeading: 'SPENDING YOUR BITCOIN',
      heroSubtitle: 'Find vendors and services that accept Bitcoin as payment!',
      cards: [
        {
          title: 'Bitcoiners Map',
          description: 'Find physical stores and businesses around you where you can spend Bitcoin',
          url: '/spend-bitcoin/bitcoiners-map/',
        },
        {
          title: 'Places To Spend Sats Online',
          description: 'Find a list of online stores where you can purchase goods and services with Bitcoin.',
          url: '/spend-bitcoin/places-to-spend-bitcoin/',
        },
      ],
      ctaHeading: 'Accept Bitcoin in Your Business',
      ctaSubheading:
        'Join the growing network of African businesses accepting Bitcoin payments and get listed on our map.',
      ctaVariant: 'dark',
      ctaPrimaryLabel: 'Join the Bitcoiners Map',
      ctaPrimaryUrl: '/spend-bitcoin/bitcoiners-map/',
    },

    // ── Community ──
    {
      title: 'Community',
      slug: 'community',
      heroHeading: 'COMMUNITY',
      heroSubtitle:
        'A Bitcoin community bringing Freedom to Africa through Bitcoin. We help to onboard new African users and guide them safely on their Bitcoin journey from earning sats to self custody.',
      cards: [
        {
          title: 'Africa Bitcoin Ecosystem (Live Directory)',
          description:
            'Get a visual breakdown of Bitcoin projects, communities, and initiatives across the continent.',
          url: '/african-bitcoin-ecosystem/',
        },
        {
          title: 'Most Impactful African Bitcoiners',
          description:
            'Join us in recognizing their impact and supporting the next wave of African Bitcoin pioneers.',
          url: '/the-most-impactful-african-bitcoiners-of-2024/',
        },
        {
          title: 'African Bitcoin Treasury Manifesto',
          description:
            'A manifesto for forward thinking entrepreneurs ready to lead Africa\u2019s financial future.',
          url: '/african-bitcoin-treasury-manifesto/',
        },
        {
          title: 'African Bitcoin Meetups',
          description:
            'Bitcoin meetups are one of the most potent tools for Bitcoin education and adoption in Africa.',
          url: '/bitcoin-meetups/',
        },
        {
          title: 'Most Impactful Bitcoiner Nomination',
          description:
            'Join us in recognizing their impact and supporting the next wave of African Bitcoin pioneers.',
          url: '/most-impactful-nominations/',
        },
      ],
      ctaHeading: 'Get 1,000 sats for your brilliant ideas!',
      ctaSubheading:
        'Have a genius idea or spot something in our African Bitcoiners initiatives that could be even better? Submit your feedback to us and we\u2019re excited to reward you for them.',
      ctaVariant: 'orange',
      ctaPrimaryLabel: 'Get Started',
      ctaPrimaryUrl: '/earn-bitcoin/1000-sats-feedback-bounty/',
    },

    // ── About Us ──
    {
      title: 'About Us',
      slug: 'about-us',
      heroHeading: 'ABOUT US',
      heroSubtitle:
        'African Bitcoiners is on a mission to bring Bitcoin freedom to every corner of Africa through education, community, and open-source tools.',
      cards: [
        {
          title: 'Support Us',
          description:
            'Your support helps us keep Bitcoin education free and accessible for all Africans.',
          url: '/about-us/support-us/',
        },
        {
          title: 'Proof of Work',
          description:
            'See what we have built — our track record of Bitcoin education and adoption work across Africa.',
          url: '/about-us/african-bitcoiners-proof-of-work/',
        },
        {
          title: 'African Bitcoiners Turns 3',
          description:
            'Celebrating 3 years of building the Bitcoin ecosystem in Africa.',
          url: '/african-bitcoiners-turns-3/',
        },
        {
          title: 'Our Team',
          description: 'Meet the dedicated people behind African Bitcoiners.',
          url: '/about-us/our-team/',
        },
        {
          title: 'Connect with Us',
          description:
            'Get in touch with us on your preferred platform — Telegram, WhatsApp, Nostr, and more.',
          url: '/about-us/connect-with-us/',
        },
        {
          title: 'Why We Are Private',
          description:
            'Learn why we prioritize privacy in everything we do and how it protects our community.',
          url: '/about-us/why-we-are-private/',
        },
        {
          title: 'Newsletter Archive',
          description:
            'Browse our full archive of Bitcoin newsletters delivered to African Bitcoiners every week.',
          url: '/bitcoin-newsletter/',
        },
        {
          title: 'FAQs',
          description: 'Find answers to the most frequently asked questions about African Bitcoiners.',
          url: '/faqs/',
        },
        {
          title: 'About African Bitcoiners',
          description:
            'Learn more about our mission, vision, and what drives us to build Bitcoin adoption in Africa.',
          url: '/about-us/about-african-bitcoiners/',
        },
      ],
      ctaHeading: 'Support Our Mission',
      ctaSubheading:
        'African Bitcoiners is community-funded. Your support keeps Bitcoin education free for everyone.',
      ctaVariant: 'orange',
      ctaPrimaryLabel: 'Donate Now',
      ctaPrimaryUrl: '/about-us/support-us/',
      ctaSecondaryLabel: 'Learn More',
      ctaSecondaryUrl: '/about-us/african-bitcoiners-proof-of-work/',
    },
  ]

  for (const def of sectionPageDefs) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: def.slug } },
      limit: 1,
    })

    const sectionContent = [
      {
        blockType: 'hero',
        layout: 'centered',
        heading: def.heroHeading,
        subheading: makeLexical(def.heroSubtitle),
        links: [],
        backgroundType: 'white',
        images: [],
      },
      {
        blockType: 'cardGrid',
        columns: '3',
        variant: 'default',
        cards: def.cards.map((card) => ({
          title: card.title,
          description: makeLexical(card.description),
          linkLabel: 'Visit page →',
          linkUrl: card.url,
          linkNewTab: false,
        })),
      },
      {
        blockType: 'ctaBanner',
        heading: def.ctaHeading,
        subheading: def.ctaSubheading,
        variant: def.ctaVariant,
        primaryButtonLabel: def.ctaPrimaryLabel,
        primaryButtonUrl: def.ctaPrimaryUrl,
        secondaryButtonLabel: def.ctaSecondaryLabel,
        secondaryButtonUrl: def.ctaSecondaryUrl,
        align: 'center',
      },
    ] as any

    const sectionMeta = {
      title: `${def.title} — African Bitcoiners`,
      description: def.heroSubtitle,
    }

    if (existing.totalDocs > 0) {
      await (payload.update as any)({
        collection: 'pages',
        id: existing.docs[0].id,
        data: {
          title: def.title,
          _status: 'published',
          template: 'section-landing',
          meta: sectionMeta,
          content: sectionContent,
        },
      })
      payload.logger.info(`✓ Updated section page: /${def.slug}/`)
      continue
    }

    await payload.create({
      collection: 'pages',
      data: {
        title: def.title,
        slug: def.slug,
        _status: 'published',
        template: 'section-landing',
        meta: sectionMeta,
        content: sectionContent,
      },
    })

    payload.logger.info(`✓ Created section page: /${def.slug}/`)
  }

  payload.logger.info('✓ Section landing pages seeded')

  // ── Content Sub-Pages ────────────────────────────────────────────────────────
  payload.logger.info('Seeding content sub-pages...')

  // Build parent ID map (slug → DB id)
  const parentSlugs = [
    'learn-bitcoin',
    'earn-bitcoin',
    'save-bitcoin',
    'spend-bitcoin',
    'community',
    'about-us',
    'stale-pages-not-indexed',
  ]
  const parentIdMap: Record<string, number> = {}
  for (const s of parentSlugs) {
    const r = await payload.find({ collection: 'pages', where: { slug: { equals: s } }, limit: 1 })
    if (r.docs[0]) parentIdMap[s] = r.docs[0].id as number
  }

  type SubPageDef = {
    title: string
    slug: string            // full slug as stored (e.g. "learn-bitcoin/free-bitcoin-course" or "hall-of-fame")
    template?: string
    parentKey?: string       // key into parentIdMap
    meta?: string           // optional meta description override
  }

  const subPageDefs: SubPageDef[] = [
    // ── Learn ──
    { title: 'Free Bitcoin for Beginners Course',        slug: 'learn-bitcoin/free-bitcoin-course',              template: 'course',        parentKey: 'learn-bitcoin' },
    { title: 'Académie Bitcoin Afrique',                 slug: 'academie-bitcoin-afrique',                                                  parentKey: 'learn-bitcoin' },
    { title: 'Bitcoin for Kids',                         slug: 'learn-bitcoin/bitcoin-for-kids',                                            parentKey: 'learn-bitcoin' },
    { title: "Bitcoin: Africa's Guide to Freedom Money", slug: 'bitcoin-africas-guide-to-freedom-money',                                    parentKey: 'learn-bitcoin' },
    { title: 'Bitcoin Learning Resources',               slug: 'learn-bitcoin/bitcoin-learning-resources',                                  parentKey: 'learn-bitcoin' },
    { title: 'African Language Resources',               slug: 'learn-bitcoin/african-language-resources',                                  parentKey: 'learn-bitcoin' },
    { title: 'Bitcoin Education Partnership',            slug: 'bitcoin-education-partnership',                  template: 'partnership',   parentKey: 'learn-bitcoin' },
    { title: 'Keeping Bitcoin in Your Head',             slug: 'learn-bitcoin/how-to-keep-bitcoin-in-your-head',                           parentKey: 'learn-bitcoin' },
    { title: 'Top 10 Bitcoin Misconceptions',            slug: 'learn-bitcoin/top-10-bitcoin-misconceptions',                              parentKey: 'learn-bitcoin' },
    { title: 'Why Bitcoin Only',                         slug: 'learn-bitcoin/why-bitcoin-only',                                           parentKey: 'learn-bitcoin' },
    { title: 'Bitcoin White Paper',                      slug: 'learn-bitcoin/bitcoin-whitepaper',                                         parentKey: 'learn-bitcoin' },
    { title: 'Northern Nigeria Bitcoin Seminar',         slug: 'learn-bitcoin/northern-nigeria-bitcoin-seminar',                           parentKey: 'learn-bitcoin' },

    // ── Earn ──
    { title: '1000 Sats Feedback Bounty',                slug: 'earn-bitcoin/1000-sats-feedback-bounty',        template: 'bounty',        parentKey: 'earn-bitcoin' },
    { title: 'African Bitcoiner Jobs',                   slug: 'earn-bitcoin/bitcoiner-jobs',                                              parentKey: 'earn-bitcoin' },
    { title: 'Places to Earn Sats',                      slug: 'earn-bitcoin/places-to-earn-sats',                                         parentKey: 'earn-bitcoin' },

    // ── Save ──
    { title: 'Bitcoin Inflation Simulator',              slug: 'save-bitcoin/bitcoin-inflation-simulator',                                 parentKey: 'save-bitcoin' },
    { title: 'Million Sat Challenge',                    slug: 'save-bitcoin/million-sat-challenge',                                       parentKey: 'save-bitcoin' },
    { title: 'Recommended Bitcoin and Lightning Wallets',slug: 'save-bitcoin/recommended-bitcoin-and-lightning-wallets',                  parentKey: 'save-bitcoin' },
    { title: 'Buying Bitcoin Peer to Peer',              slug: 'save-bitcoin/buying-bitcoin-peer-to-peer',                                parentKey: 'save-bitcoin' },
    { title: 'Where to Buy Bitcoin Privately in Africa', slug: 'where-to-buy-bitcoin-privately-in-africa',                                 parentKey: 'save-bitcoin' },
    { title: '5-Year Bitcoin Savings Calculator',        slug: 'save-bitcoin/5-year-bitcoin-savings-calculator',                          parentKey: 'save-bitcoin' },
    { title: 'Bitcoin Cold Storage Guide',               slug: 'save-bitcoin/how-to-setup-your-bitcoin-cold-storage-for-free',            parentKey: 'save-bitcoin' },
    { title: 'Bitcoin to Fiat Converter',                slug: 'save-bitcoin/bitcoin-to-fiat-converter',                                  parentKey: 'save-bitcoin' },

    // ── Spend ──
    { title: 'Bitcoiners Map',                           slug: 'spend-bitcoin/bitcoiners-map',                                            parentKey: 'spend-bitcoin' },
    { title: 'Places to Spend Bitcoin',                  slug: 'spend-bitcoin/places-to-spend-bitcoin',                                   parentKey: 'spend-bitcoin' },

    // ── Community (mostly root-level WP URLs) ──
    { title: 'Most Impactful African Bitcoiners 2025',   slug: 'the-most-impactful-african-bitcoiners-of-2025', template: 'miab',          parentKey: 'community' },
    { title: 'Most Impactful African Bitcoiners 2024',   slug: 'the-most-impactful-african-bitcoiners-of-2024', template: 'miab',          parentKey: 'community' },
    { title: 'Most Impactful African Bitcoiners 2023',   slug: 'the-most-impactful-african-bitcoiners-of-2023', template: 'miab',          parentKey: 'community' },
    { title: 'Most Impactful African Bitcoiners 2022',   slug: 'the-most-impactful-african-bitcoiners-of-2022', template: 'miab',          parentKey: 'community' },
    { title: 'African Bitcoin Ecosystem',                slug: 'african-bitcoin-ecosystem',                                                parentKey: 'community' },
    { title: 'African Bitcoin Treasury Manifesto',       slug: 'african-bitcoin-treasury-manifesto',                                       parentKey: 'community' },
    { title: 'Bitcoin Mining in Africa',                 slug: 'bitcoin-mining-in-africa',                      template: 'mining',        parentKey: 'community' },
    { title: 'Hall of Fame',                             slug: 'hall-of-fame',                                                             parentKey: 'community' },
    { title: 'Bitcoin Meetups',                          slug: 'bitcoin-meetups',                                                          parentKey: 'community' },

    // ── About ──
    { title: 'Support Us',                               slug: 'about-us/support-us',                                                      parentKey: 'about-us' },
    { title: 'African Bitcoiners Proof of Work',         slug: 'about-us/african-bitcoiners-proof-of-work',     template: 'proof-of-work', parentKey: 'about-us' },
    { title: 'African Bitcoiners Turns 3',               slug: 'african-bitcoiners-turns-3',                                               parentKey: 'about-us' },
    { title: 'Our Team',                                 slug: 'about-us/our-team',                                                        parentKey: 'about-us' },
    { title: 'Connect with Us',                          slug: 'about-us/connect-with-us',                                                 parentKey: 'about-us' },
    { title: 'Why We Are Private',                       slug: 'about-us/why-we-are-private',                                              parentKey: 'about-us' },
    { title: 'FAQs',                                     slug: 'faqs',                                                                     parentKey: 'about-us' },

    // ── Standalone ──
    { title: 'Graduate Program',                         slug: 'graduate-program' },
    { title: 'African Bitcoiners Community Builders',    slug: 'african-bitcoiners-community-builders' },
    { title: 'Bitcoin Expert Pack',                        slug: 'bitcoin-expert-pack' },
    { title: 'Bitcoin Intermediate Pack',                  slug: 'bitcoin-intermediate-pack' },
    { title: 'Bitcoin Starter Pack',                       slug: 'bitcoin-starter-pack' },
    { title: 'Btrust Partnership',                         slug: 'btrust-partners-with-africa-freee-routing' },
    { title: 'Donation Confirmation',                    slug: 'donation-confirmation' },
    { title: 'Error',                                    slug: 'error' },
    { title: 'Get Certificate',                          slug: 'get-certificate' },
    { title: 'Get Certificate (Telegram)',               slug: 'get-certificate-tg' },
    { title: 'Final Quiz Passed',                        slug: 'final-quiz-passed' },
    { title: 'Final Quiz Passed (Telegram)',             slug: 'final-quiz-passed-tg' },
    { title: 'Final Quiz Failed',                        slug: 'final-quiz-failed' },
    {
      title: 'Step-by-Step Guide for Nostr',
      slug: 'step-by-step-guide-for-nostr',
      meta: 'Empower yourself with Nostr for Bitcoin as we guide you through the process of setting it up. Gain confidence in managing your Bitcoin transactions as you embark on your Bitcoin journey today!',
    },
    { title: 'Bitcoin for Her',                          slug: 'her' },
    { title: 'Community Outreach',                       slug: 'community-outreach' },
    { title: 'Feedback Bounty Matrix',                   slug: 'feedback-bounty-matrix' },
    {
      title: 'Organization Activity Update',
      slug: 'organization-activity-update',
      meta: 'Bitcoin Organization Activity Form — update whether your Bitcoin-focused organization is still active.',
    },
    {
      title: 'ZZZ- STALE PAGES - NOT INDEXED',
      slug: 'stale-pages-not-indexed',
      meta: 'Stale pages not indexed by search engines.',
    },
    {
      title: 'Local African Bitcoin Communities',
      slug: 'stale-pages-not-indexed/african-bitcoin-communities',
      parentKey: 'stale-pages-not-indexed',
      meta: 'Discover vibrant Bitcoin communities across Africa — local meetups, circular economies, and developer networks.',
    },
    {
      title: 'African Bitcoin Projects',
      slug: 'stale-pages-not-indexed/african-bitcoin-projects',
      parentKey: 'stale-pages-not-indexed',
      meta: 'Explore the top African Bitcoin projects reshaping the Bitcoin ecosystem across the continent.',
    },
    {
      title: 'Junior Copywriter and Community Manager',
      slug: 'stale-pages-not-indexed/junior-copywriter-and-community-manager',
      parentKey: 'stale-pages-not-indexed',
      meta: 'WE ARE HIRING! Junior Copywriter and Community Manager — Full time, Remote. Join the African Bitcoiners team.',
    },
    {
      title: 'Junior PHP Coder',
      slug: 'stale-pages-not-indexed/junior-php-coder',
      parentKey: 'stale-pages-not-indexed',
      meta: 'WE ARE HIRING! Junior PHP Developer — Full time, Remote. Must be a young African Bitcoiner living in Africa.',
    },
    {
      title: 'UX Designer',
      slug: 'stale-pages-not-indexed/ux-designer',
      parentKey: 'stale-pages-not-indexed',
      meta: 'WE ARE HIRING! UX Designer — Full time, Remote. Must be a young African Bitcoiner living in Africa.',
    },
    {
      title: 'The Great African Bitcoin Survey',
      slug: 'stale-pages-not-indexed/the-great-african-bitcoin-survey',
      parentKey: 'stale-pages-not-indexed',
      meta: 'The Great African Bitcoin Survey has evolved into our Live Directory. Explore Bitcoin organizations across Africa.',
    },
    {
      title: 'Top 21 African Bitcoin Countries',
      slug: 'stale-pages-not-indexed/top-21-african-bitcoin-countries',
      parentKey: 'stale-pages-not-indexed',
      meta: 'Explore our top 21 countries leading the charge towards financial freedom and equality through Bitcoin.',
    },
  ]

  const placeholderContent = [
    {
      blockType: 'richContent',
      content: makeLexical('Content to be migrated from WordPress.'),
      backgroundColor: 'white',
    },
  ] as any

  // Cleanup: delete pages that were incorrectly seeded (slashes stripped from slug by default slugify)
  for (const def of subPageDefs) {
    if (!def.slug.includes('/')) continue
    // Default Payload slugify strips non-word, non-hyphen chars, producing e.g. "learn-bitcoinfree-bitcoin-course"
    const wrongSlug = def.slug
      .trim()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
      .toLowerCase()
    const wrong = await payload.find({ collection: 'pages', where: { slug: { equals: wrongSlug } }, limit: 1 })
    if (wrong.docs[0]) {
      await (payload.delete as any)({ collection: 'pages', id: wrong.docs[0].id })
      payload.logger.info(`Cleaned up wrongly-slugged page: ${wrongSlug}`)
    }
  }

  let createdCount = 0
  let skippedCount = 0

  for (const def of subPageDefs) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: def.slug } },
      limit: 1,
    })

    if (existing.totalDocs > 0) {
      skippedCount++
      if (!def.slug.includes('/')) {
        parentIdMap[def.slug] = existing.docs[0].id as number
      }
      continue
    }

    const parentId: number | undefined = def.parentKey ? parentIdMap[def.parentKey] : undefined

    const doc = await payload.create({
      collection: 'pages',
      data: {
        title: def.title,
        slug: def.slug,
        _status: 'published',
        ...(def.template ? { template: def.template as any } : {}),
        ...(parentId ? { parent: parentId } : {}),
        meta: {
          title: `${def.title} — African Bitcoiners`,
          description: def.meta || `${def.title} on African Bitcoiners.`,
        },
        content: placeholderContent,
      },
    })

    if (!def.slug.includes('/')) {
      parentIdMap[def.slug] = doc.id as number
    }

    createdCount++
  }

  payload.logger.info(`✓ Content sub-pages seeded: ${createdCount} created, ${skippedCount} skipped`)

  // ── Newsletter Posts ─────────────────────────────────────────────────────────
  payload.logger.info('Seeding newsletter posts...')

  const postDefs = [
    {
      title: 'MSC |20th June 2026 | Bitcoin Crosses $100k: What This Means for Africa',
      slug: 'msc-20-june-2026',
      category: 'weekly-newsletter' as const,
      publishedDate: '2026-06-20T08:00:00.000Z',
      excerpt:
        'This week: Bitcoin hits a major milestone, African exchanges see record volume, and our community celebrates 10,000 members.',
      body: `Bitcoin crossed $100,000 this week — a moment many in our community have been waiting for. African exchanges saw record trading volumes, with Nigeria, Kenya, and South Africa leading the surge.\n\nThis edition covers: the impact on African savers, which local exchanges handled the volume best, job opportunities in the space, and upcoming meetups across the continent.`,
    },
    {
      title: 'MSC |13th June 2026 | Lightning Network Reaches Every African Capital',
      slug: 'msc-13-june-2026',
      category: 'weekly-newsletter' as const,
      publishedDate: '2026-06-13T08:00:00.000Z',
      excerpt:
        'The Lightning Network now has routing nodes in every African capital city. Here is what that means for instant, cheap Bitcoin payments across the continent.',
      body: `Africa Free Routing has completed its expansion — there is now a Lightning node in every African capital city. Instant, near-zero-cost Bitcoin payments are now possible from Cairo to Cape Town.\n\nThis week we cover the technical details of the expansion, interviews with node operators, and how merchants can start accepting Lightning payments today.`,
    },
    {
      title: 'Saturday Stacker | Your Action Step: Set Up a Hardware Wallet This Weekend',
      slug: 'saturday-stacker-hardware-wallet-weekend',
      category: 'saturday-stacker' as const,
      publishedDate: '2026-06-14T06:00:00.000Z',
      excerpt:
        'This Saturday: protect your Bitcoin with a hardware wallet. Step-by-step guide, recommended devices, and how to verify your setup.',
      body: `Your Saturday Action Step: Set up a hardware wallet today.\n\nIf your Bitcoin is on an exchange, it is not your Bitcoin. This weekend, take sovereignty of your sats. We walk you through choosing a device, setting it up safely, and verifying your seed phrase backup.\n\nQuote of the Week: "Not your keys, not your coins." — Andreas Antonopoulos`,
    },
  ]

  let postsCreated = 0
  let postsSkipped = 0

  for (const def of postDefs) {
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: def.slug } },
      limit: 1,
    })

    if (existing.totalDocs > 0) {
      postsSkipped++
      continue
    }

    await payload.create({
      collection: 'posts',
      data: {
        title: def.title,
        slug: def.slug,
        category: def.category,
        publishedDate: def.publishedDate,
        excerpt: def.excerpt,
        _status: 'published',
        content: makeLexical(def.body) as any,
        meta: {
          title: `${def.title} — African Bitcoiners`,
          description: def.excerpt,
        },
      },
    })

    postsCreated++
  }

  payload.logger.info(`✓ Newsletter posts seeded: ${postsCreated} created, ${postsSkipped} skipped`)

  // ── Special Pages ─────────────────────────────────────────────────────────────
  payload.logger.info('Seeding special page content...')

  const L = makeLexical

  type SpecialPage = {
    slug: string
    title: string
    template?: string
    meta?: { title: string; description: string }
    content: any[]
  }

  const specialPages: SpecialPage[] = [
    // ── 1. BFB Course ──────────────────────────────────────────────────────────
    {
      slug: 'learn-bitcoin/free-bitcoin-course',
      title: 'Free Bitcoin for Beginners Course',
      template: 'course',
      meta: {
        title: 'Free Bitcoin Course for Africans — African Bitcoiners',
        description: 'Join thousands of Africans learning Bitcoin for free. No experience needed. English & French, email & Telegram.',
      },
      content: [
        {
          blockType: 'hero',
          layout: 'centered',
          eyebrow: 'LEARN BITCOIN',
          heading: 'The Free Bitcoin Course for Africans',
          subheading: L('Join thousands of Africans learning Bitcoin — completely free. No experience needed. Study in English or French, via email or Telegram.'),
          links: [
            { link: { type: 'custom', label: 'Start Learning Free', url: '#course-signup', newTab: false, appearance: 'default' } },
          ],
          backgroundType: 'cream',
          images: [],
        },
        {
          blockType: 'statsBar',
          backgroundColor: 'dark',
          stats: [
            { value: '652+', label: 'GRADUATES' },
            { value: '4.8 ★', label: 'AVERAGE RATING' },
            { value: '100%', label: 'FREE FOREVER' },
          ],
        },
        {
          blockType: 'courseModal',
          triggerLabel: 'Start learning for free ↓',
          variant: 'primary-orange',
          layout: 'inline',
          websiteUrl: 'https://course.bitcoiners.africa',
        },
        {
          blockType: 'cardGrid',
          eyebrow: "WHAT YOU'LL GET",
          heading: 'Everything You Need to Start Your Bitcoin Journey',
          columns: '2',
          variant: 'default',
          cards: [
            { title: 'Bitcoin Fundamentals', description: L('Understand what Bitcoin is, why it was created, and how it works from first principles.') },
            { title: 'Lightning Network Basics', description: L('Learn how the Lightning Network enables fast, cheap Bitcoin payments across Africa.') },
            { title: 'Wallet Setup & Security', description: L('Set up your first Bitcoin wallet safely and learn best practices for protecting your sats.') },
            { title: 'Earn Sats as You Learn', description: L('Complete quizzes and activities to earn real Bitcoin sats throughout the course.') },
          ],
        },
        {
          blockType: 'partnersCarousel',
          heading: 'Our Partners',
          useGlobalPartners: true,
          speed: 'normal',
        },
        {
          blockType: 'ctaBanner',
          heading: 'Ready to Begin Your Bitcoin Journey?',
          subheading: 'Join 652 graduates who have already taken the first step. The course is completely free.',
          variant: 'orange',
          primaryButtonLabel: 'Claim Your Free Spot',
          primaryButtonUrl: '#course-signup',
          align: 'center',
        },
        {
          blockType: 'courseModal',
          triggerLabel: 'Claim your free spot ↓',
          variant: 'white-outline',
          layout: 'inline',
          websiteUrl: 'https://course.bitcoiners.africa',
        },
      ],
    },

    // ── 2. Feedback Bounty ──────────────────────────────────────────────────────
    {
      slug: 'earn-bitcoin/1000-sats-feedback-bounty',
      title: '1,000 Sats Feedback Bounty',
      template: 'bounty',
      meta: {
        title: 'Earn 1,000 Sats for Your Feedback — African Bitcoiners',
        description: 'Found an error? Have an idea? Share your feedback and earn 1,000 sats (real Bitcoin).',
      },
      content: [
        {
          blockType: 'hero',
          layout: 'centered',
          eyebrow: 'EARN BITCOIN',
          heading: 'Earn 1,000 Sats for Your Feedback',
          subheading: L('Found an error? Have a suggestion? We pay 1,000 sats (real Bitcoin) for every valuable piece of feedback — no experience needed.'),
          links: [
            { link: { type: 'custom', label: 'Submit Feedback', url: '/earn-bitcoin/1000-sats-feedback-bounty/#feedback-form', newTab: false, appearance: 'default' } },
            { link: { type: 'custom', label: 'View Bounty Matrix', url: '/feedback-bounty-matrix/', newTab: false, appearance: 'outline' } },
          ],
          backgroundType: 'orange',
          images: [],
        },
        {
          blockType: 'richContent',
          content: L("What's the deal? We are building a Bitcoin education platform for Africa — and we want your help to make it better. Every time you find a mistake, a broken link, a confusing explanation, or have an idea for a new page, we pay you 1,000 sats directly to your Bitcoin wallet. It's that simple."),
          backgroundColor: 'white',
        },
        {
          blockType: 'cardGrid',
          eyebrow: 'WHY JOIN',
          heading: 'Why You Should Join the Party',
          columns: '3',
          variant: 'default',
          cards: [
            { title: 'Real Bitcoin Rewards', description: L('Every approved submission earns you 1,000 sats sent directly to your Lightning wallet. No gift cards, no points — real Bitcoin.') },
            { title: 'Help Build Africa\'s Bitcoin Future', description: L('Your feedback directly improves the quality of Bitcoin education for millions of Africans. You make a real difference.') },
            { title: 'No Skills Required', description: L('You don\'t need to be a developer or Bitcoin expert. Just use the site, notice something, and report it. That\'s it.') },
          ],
        },
        {
          blockType: 'processSteps',
          eyebrow: 'HOW IT WORKS',
          heading: 'How to Participate',
          variant: 'numbered',
          backgroundColor: 'cream',
          steps: [
            { number: 1, title: 'Find Something to Improve', description: L('Browse the site and look for errors, broken links, confusing text, missing content, or good ideas.') },
            { number: 2, title: 'Check the Bounty Matrix', description: L('Visit the Bounty Matrix to see which types of feedback qualify and what the reward is for each.'), linkText: 'View Bounty Matrix', linkURL: '/feedback-bounty-matrix/' },
            { number: 3, title: 'Submit Your Feedback', description: L('Fill in the feedback form with your finding, your Lightning address, and any relevant details.') },
            { number: 4, title: 'Get Paid in Sats', description: L('Our team reviews your submission and sends 1,000 sats to your Lightning wallet within 48 hours if approved.') },
          ],
        },
        {
          blockType: 'ctaBanner',
          heading: 'Ready to Make a Difference?',
          subheading: 'Submit your feedback and earn sats while helping build Africa\'s Bitcoin education platform.',
          variant: 'dark',
          primaryButtonLabel: 'Submit Feedback',
          primaryButtonUrl: '#feedback-form',
          secondaryButtonLabel: 'View Bounty Matrix',
          secondaryButtonUrl: '/feedback-bounty-matrix/',
          align: 'center',
        },
        {
          blockType: 'formEmbed',
          formType: 'feedback-rating',
          heading: 'Submit Your Feedback',
          subheading: 'Tell us what you found and where your Lightning address is.',
          backgroundColor: 'cream',
        },
      ],
    },

    // ── 3. Proof of Work ────────────────────────────────────────────────────────
    {
      slug: 'about-us/african-bitcoiners-proof-of-work',
      title: 'African Bitcoiners Proof of Work',
      template: 'proof-of-work',
      meta: {
        title: 'African Bitcoiners Proof of Work — Impact Report',
        description: 'Our mission, initiatives, and impact across Africa — documented openly for the community.',
      },
      content: [
        {
          blockType: 'hero',
          layout: 'centered',
          eyebrow: 'ABOUT US',
          heading: 'African Bitcoiners Proof of Work',
          subheading: L('Three years of building, educating, and connecting Bitcoiners across Africa. Here is our open record.'),
          links: [
            { link: { type: 'custom', label: 'Support Our Mission', url: '/about-us/support-us/', newTab: false, appearance: 'default' } },
          ],
          backgroundType: 'dark',
          images: [],
        },
        {
          blockType: 'missionStatements',
          spacing: 'large',
          statements: [
            {
              eyebrow: 'OUR MISSION',
              heading: L('We believe Bitcoin is the most powerful tool for financial freedom in Africa.'),
              textColor: 'dark',
            },
            {
              eyebrow: 'WHY THIS PAGE EXISTS',
              heading: L('We are accountable to our community. This page documents everything we have built, every life we have touched, and every satoshi we have spent in service of Bitcoin adoption across Africa.'),
              textColor: 'dark',
            },
          ],
        },
        {
          blockType: 'productsGrid',
          eyebrow: 'OUR INITIATIVES',
          heading: 'What We Have Built',
          products: [
            {
              name: 'Bitcoin for Beginners Course',
              tagline: 'Free Bitcoin Education',
              description: '652+ graduates learning Bitcoin for free in English and French.',
              badge: 'Free',
              primaryButtonLabel: 'Start Course',
              primaryButtonUrl: '/learn-bitcoin/free-bitcoin-course/',
            },
            {
              name: 'African Bitcoin Directory',
              tagline: '170+ Projects Tracked',
              description: 'The most comprehensive directory of Bitcoin projects, companies, and communities in Africa.',
              badge: 'Live',
              primaryButtonLabel: 'Explore Directory',
              primaryButtonUrl: 'https://directory.bitcoiners.africa',
            },
            {
              name: 'Africa Free Routing',
              tagline: 'Lightning Network Infrastructure',
              description: 'Lightning routing nodes in every African capital, enabling cheap instant Bitcoin payments.',
              badge: 'Active',
              primaryButtonLabel: 'Learn More',
              primaryButtonUrl: 'https://freerouting.africa',
            },
            {
              name: 'Bitcoin Bootcamps',
              tagline: '12 Across Africa',
              description: 'In-person Bitcoin bootcamps delivered across 12 African countries in partnership with local communities.',
              primaryButtonLabel: 'View Events',
              primaryButtonUrl: '/community/bitcoin-meetups/',
            },
            {
              name: 'MIAB — Most Impactful African Bitcoiners',
              tagline: 'Annual Recognition Programme',
              description: 'Celebrating and amplifying the most impactful Bitcoin advocates across the African continent.',
              primaryButtonLabel: 'View 2025 List',
              primaryButtonUrl: '/the-most-impactful-african-bitcoiners-of-2025/',
            },
            {
              name: 'Weekly Bitcoin Newsletter',
              tagline: '250+ Editions',
              description: 'Weekly African Bitcoin news, job listings, events, and community updates delivered every Monday.',
              badge: 'Free',
              primaryButtonLabel: 'Subscribe',
              primaryButtonUrl: '/bitcoin-newsletter/',
            },
          ],
        },
        {
          blockType: 'testimonialsCarousel',
        },
        {
          blockType: 'supportSection',
          eyebrow: 'Support Us',
          heading: 'Help Us Keep Bitcoin Education Free in Africa',
          description: 'African Bitcoiners runs on Bitcoin donations. Every sat you send keeps the course free, the newsletter running, and the community growing.',
          bulletPoints: [
            { point: 'Keep the Bitcoin course free for all Africans' },
            { point: 'Fund new bootcamps across the continent' },
            { point: 'Maintain Lightning infrastructure in every African capital' },
            { point: 'Support the weekly newsletter and community' },
          ],
          primaryButtonLabel: 'Donate Bitcoin',
          primaryButtonUrl: '/about-us/support-us/',
          backgroundColor: 'cream',
        },
      ],
    },

    // ── 4. MIAB 2025 ────────────────────────────────────────────────────────────
    {
      slug: 'the-most-impactful-african-bitcoiners-of-2025',
      title: 'The Most Impactful African Bitcoiners of 2025',
      template: 'miab',
      meta: {
        title: 'Most Impactful African Bitcoiners 2025 — MIAB',
        description: 'The 2025 list of the most impactful Bitcoin advocates across the African continent.',
      },
      content: [
        {
          blockType: 'hero',
          layout: 'centered',
          eyebrow: 'MIAB 2025',
          heading: 'The Most Impactful African Bitcoiners of 2025',
          subheading: L('Celebrating the Bitcoin advocates, educators, builders, and community leaders making the biggest difference across Africa.'),
          links: [
            { link: { type: 'custom', label: 'Nominate for 2026', url: '/community/african-bitcoin-community/', newTab: false, appearance: 'default' } },
          ],
          backgroundType: 'dark',
          images: [],
        },
        {
          blockType: 'peopleShowcase',
          year: 2025,
          heading: 'The 2025 Nominees',
          layout: 'grid-2col',
          showYearNav: true,
          otherYears: [
            { year: 2024, url: '/the-most-impactful-african-bitcoiners-of-2024/' },
            { year: 2023, url: '/the-most-impactful-african-bitcoiners-of-2023/' },
          ],
          backgroundColor: 'cream',
        },
        {
          blockType: 'ctaBanner',
          heading: 'Know Someone Who Deserves to Be on This List?',
          subheading: 'Nominate an impactful African Bitcoiner for the 2026 MIAB list.',
          variant: 'orange',
          primaryButtonLabel: 'Submit a Nomination',
          primaryButtonUrl: '/community/african-bitcoin-community/',
          align: 'center',
        },
      ],
    },

    // ── 4d. MIAB 2024 ───────────────────────────────────────────────────────────
    {
      slug: 'the-most-impactful-african-bitcoiners-of-2024',
      title: 'The Most Impactful African Bitcoiners of 2024',
      template: 'miab',
      meta: {
        title: 'The Most Impactful African Bitcoiners of 2024 - African Bitcoiners',
        description:
          'Uncover the stories of the top 21 African Bitcoin trailblazers revolutionizing Bitcoin and financial liberation in Africa.',
      },
      content: [
        {
          blockType: 'hero',
          layout: 'centered',
          eyebrow: 'MIAB 2024',
          heading: 'The Most Impactful African Bitcoiners of 2024',
          subheading: L(
            'Meet Africa’s trailblazers shaping the continent’s financial future — leaders, educators, and innovators whose Proof of Work for 2024 has driven Bitcoin’s promise of freedom and economic empowerment.',
          ),
          links: [],
          backgroundType: 'cream',
          images: [],
        },
        {
          blockType: 'peopleShowcase',
          year: 2024,
          heading: 'The 2024 Nominees',
          layout: 'grid-2col',
          showYearNav: true,
          otherYears: [
            { year: 2025, url: '/the-most-impactful-african-bitcoiners-of-2025/' },
            { year: 2023, url: '/the-most-impactful-african-bitcoiners-of-2023/' },
            { year: 2022, url: '/the-most-impactful-african-bitcoiners-of-2022/' },
          ],
          backgroundColor: 'cream',
        },
      ],
    },

    // ── 4c. MIAB 2023 ───────────────────────────────────────────────────────────
    {
      slug: 'the-most-impactful-african-bitcoiners-of-2023',
      title: 'The Most Impactful African Bitcoiners of 2023',
      template: 'miab',
      meta: {
        title: 'The Most Impactful African Bitcoiners of 2023 - African Bitcoiners',
        description:
          'Uncover the stories of the top 21 African Bitcoin trailblazers revolutionizing Bitcoin and financial liberation in Africa.',
      },
      content: [
        {
          blockType: 'hero',
          layout: 'centered',
          eyebrow: 'MIAB 2023',
          heading: 'The Most Impactful African Bitcoiners of 2023',
          subheading: L(
            'These inspiring heroes are reshaping Africa’s financial landscape — nominated by Africans across the continent for their tireless efforts in driving Bitcoin education and adoption.',
          ),
          links: [],
          backgroundType: 'cream',
          images: [],
        },
        {
          blockType: 'peopleShowcase',
          year: 2023,
          heading: 'The 2023 Nominees',
          layout: 'grid-2col',
          showYearNav: true,
          otherYears: [
            { year: 2025, url: '/the-most-impactful-african-bitcoiners-of-2025/' },
            { year: 2024, url: '/the-most-impactful-african-bitcoiners-of-2024/' },
            { year: 2022, url: '/the-most-impactful-african-bitcoiners-of-2022/' },
          ],
          backgroundColor: 'cream',
        },
      ],
    },

    // ── 4b. MIAB 2022 ───────────────────────────────────────────────────────────
    {
      slug: 'the-most-impactful-african-bitcoiners-of-2022',
      title: 'The Most Impactful African Bitcoiners of 2022',
      template: 'miab',
      meta: {
        title: 'The Most Impactful African Bitcoiners of 2022 - African Bitcoiners',
        description:
          'Discover the impact of 21 African bitcoiners making waves in Bitcoin news. These individuals are not only passionate about Bitcoin but are also using it to bring freedom to Africans.',
      },
      content: [
        {
          blockType: 'hero',
          layout: 'centered',
          eyebrow: 'MIAB 2022',
          heading: 'The Most Impactful African Bitcoiners of 2022',
          subheading: L(
            'These fine folk have been an inspiration to ourselves and our community — passionate about using Bitcoin to bring freedom to the people of Africa.',
          ),
          links: [],
          backgroundType: 'cream',
          images: [],
        },
        {
          blockType: 'peopleShowcase',
          year: 2022,
          heading: 'The 2022 Nominees',
          layout: 'grid-2col',
          showYearNav: true,
          otherYears: [
            { year: 2025, url: '/the-most-impactful-african-bitcoiners-of-2025/' },
            { year: 2024, url: '/the-most-impactful-african-bitcoiners-of-2024/' },
            { year: 2023, url: '/the-most-impactful-african-bitcoiners-of-2023/' },
          ],
          backgroundColor: 'cream',
        },
      ],
    },

    // ── 5. Mining Page ──────────────────────────────────────────────────────────
    {
      slug: 'bitcoin-mining-in-africa',
      title: 'Bitcoin Mining in Africa',
      template: 'mining',
      meta: {
        title: 'Bitcoin Mining in Africa — Directory & Guide',
        description: 'The most comprehensive directory of Bitcoin mining operations across Africa, grouped by country.',
      },
      content: [
        {
          blockType: 'hero',
          layout: 'centered',
          eyebrow: 'BITCOIN MINING',
          heading: 'Bitcoin Mining in Africa',
          subheading: L('Africa is uniquely positioned for Bitcoin mining — abundant renewable energy, growing infrastructure, and a young technical workforce. Here are the operations leading the way.'),
          links: [
            { link: { type: 'custom', label: 'Submit a Mining Org', url: '#mining-form', newTab: false, appearance: 'default' } },
          ],
          backgroundType: 'dark',
          images: [],
        },
        {
          blockType: 'miningDirectory',
          heading: 'Key Bitcoin Mining Operations in Africa',
          subheading: 'Verified mining operations grouped by country.',
          groupByCountry: true,
          showAddListingButton: true,
          addListingUrl: '#mining-form',
        },
        {
          blockType: 'cardGrid',
          eyebrow: 'WHY AFRICA',
          heading: 'Why Africa is the Future of Bitcoin Mining',
          columns: '3',
          variant: 'default',
          cards: [
            { title: 'Abundant Renewable Energy', description: L('Massive untapped hydro, solar, and geothermal energy potential across the continent, much of it stranded and cheap.') },
            { title: 'Growing Infrastructure', description: L('Rapid expansion of internet connectivity and power infrastructure creates new opportunities for mining operations.') },
            { title: 'Strategic Time Zones', description: L('African time zones provide natural hash rate distribution across the Bitcoin network, improving global decentralization.') },
          ],
        },
        {
          blockType: 'formEmbed',
          formType: 'mining-directory',
          heading: 'Submit a Mining Organization',
          subheading: 'Know a Bitcoin mining operation in Africa that should be listed here?',
          backgroundColor: 'cream',
        },
      ],
    },

    // ── 6. Education Partnership ────────────────────────────────────────────────
    {
      slug: 'bitcoin-education-partnership',
      title: 'Bitcoin Education Partnership',
      template: 'partnership',
      meta: {
        title: 'Bitcoin Education Partnership — African Bitcoiners',
        description: 'Partner with African Bitcoiners to bring Bitcoin education to your community, school, or organisation.',
      },
      content: [
        {
          blockType: 'hero',
          layout: 'centered',
          eyebrow: 'PARTNERSHIPS',
          heading: 'Bitcoin Education Partnership',
          subheading: L('Partner with African Bitcoiners to bring world-class Bitcoin education to your community, university, or organisation across Africa.'),
          links: [
            { link: { type: 'custom', label: 'Apply for Partnership', url: '#partnership-form', newTab: false, appearance: 'default' } },
          ],
          backgroundType: 'dark',
          images: [],
        },
        {
          blockType: 'partnersCarousel',
          heading: 'Our Current Partners',
          useGlobalPartners: true,
          speed: 'normal',
        },
        {
          blockType: 'cardGrid',
          eyebrow: 'WHY PARTNER WITH US',
          heading: 'What You Get as a Partner',
          columns: '3',
          variant: 'default',
          cards: [
            { title: 'Co-branded Education', description: L('Your brand alongside African Bitcoiners on all course materials, certificates, and communications.') },
            { title: 'Community Access', description: L('Direct access to our community of 10,000+ African Bitcoiners for events, hiring, and outreach.') },
            { title: 'Impact Reports', description: L('Monthly reports on learner progress, engagement, and Bitcoin adoption metrics from your cohort.') },
            { title: 'Curriculum Input', description: L('Help shape the Bitcoin curriculum to reflect the needs of your specific community or region.') },
            { title: 'Lightning Integration', description: L('Integrate your products and services into the course reward system — pay graduates in your sats.') },
            { title: 'Certificate Branding', description: L('Graduate certificates carry your partner logo, recognised across the African Bitcoin community.') },
          ],
        },
        {
          blockType: 'pricingTiers',
          eyebrow: 'PARTNERSHIP PLANS',
          heading: 'Choose Your Partnership Level',
          subheading: 'Monthly or yearly billing — cancel anytime. All plans include core features.',
          currency: 'sats',
          tiers: [
            {
              name: 'Basic',
              monthlyPrice: 0,
              yearlyPrice: 0,
              description: 'For community groups and small organisations.',
              features: [
                { feature: 'Co-branded course page', included: true },
                { feature: 'Community spotlight post', included: true },
                { feature: 'Monthly impact report', included: true },
                { feature: 'Certificate branding', included: false },
                { feature: 'Curriculum input', included: false },
                { feature: 'Lightning integration', included: false },
              ],
              buttonText: 'Apply Free',
              buttonLink: '#partnership-form',
              isHighlighted: false,
            },
            {
              name: 'Advanced',
              monthlyPrice: 500000,
              yearlyPrice: 4166000,
              description: 'For NGOs, universities, and growing organisations.',
              features: [
                { feature: 'Co-branded course page', included: true },
                { feature: 'Community spotlight post', included: true },
                { feature: 'Monthly impact report', included: true },
                { feature: 'Certificate branding', included: true },
                { feature: 'Curriculum input', included: true },
                { feature: 'Lightning integration', included: false },
              ],
              buttonText: 'Apply Now',
              buttonLink: '#partnership-form',
              isHighlighted: true,
              badge: 'Most Popular',
            },
            {
              name: 'Premium',
              monthlyPrice: 1000000,
              yearlyPrice: 8330000,
              description: 'For established organisations with strategic goals.',
              features: [
                { feature: 'Co-branded course page', included: true },
                { feature: 'Community spotlight post', included: true },
                { feature: 'Monthly impact report', included: true },
                { feature: 'Certificate branding', included: true },
                { feature: 'Curriculum input', included: true },
                { feature: 'Lightning integration', included: true },
              ],
              buttonText: 'Contact Us',
              buttonLink: '#partnership-form',
              isHighlighted: false,
              badge: 'Best Value',
            },
          ],
        },
        {
          blockType: 'ctaBanner',
          heading: 'Ready to Bring Bitcoin Education to Your Community?',
          subheading: 'Apply for a partnership and our team will be in touch within 48 hours.',
          variant: 'orange',
          primaryButtonLabel: 'Apply for Partnership',
          primaryButtonUrl: '#partnership-form',
          align: 'center',
        },
        {
          blockType: 'formEmbed',
          formType: 'partnership-inquiry',
          heading: 'Partnership Application',
          subheading: 'Tell us about your organisation and how you\'d like to partner.',
          backgroundColor: 'cream',
        },
      ],
    },

    // ── 7. Bitcoin for Kids ─────────────────────────────────────────────────────
    {
      slug: 'learn-bitcoin/bitcoin-for-kids',
      title: 'Bitcoin for Kids',
      meta: {
        title: 'Bitcoin for Kids — Free & Paid Resources for Young Learners',
        description: 'Free and paid Bitcoin education resources for children and young learners across Africa.',
      },
      content: [
        {
          blockType: 'hero',
          layout: 'centered',
          eyebrow: 'LEARN BITCOIN',
          heading: 'Bitcoin for Kids',
          subheading: L('Fun, engaging Bitcoin education resources designed for children and young learners. Start their Bitcoin journey early.'),
          links: [
            { link: { type: 'custom', label: 'Explore Free Resources', url: '#free-resources', newTab: false, appearance: 'default' } },
          ],
          backgroundType: 'cream',
          images: [],
        },
        {
          blockType: 'cardGrid',
          eyebrow: 'FREE RESOURCES',
          heading: 'Free Bitcoin Learning Materials for Kids',
          columns: '3',
          variant: 'default',
          cards: [
            { title: 'Bitcoin for Kids — Free PDF Guide', description: L('A beginner-friendly PDF guide explaining Bitcoin in simple language for children aged 8 and above.'), linkLabel: 'Download Free', linkUrl: '/learn-bitcoin/bitcoin-for-kids/#pdf' },
            { title: 'Why Bitcoin Matters — Video Series', description: L('Short animated videos explaining why Bitcoin is important for Africa, designed for children and teenagers.'), linkLabel: 'Watch Free', linkUrl: '#videos' },
            { title: 'Bitcoin Storybooks (Swahili & English)', description: L('Beautifully illustrated storybooks teaching Bitcoin concepts through African stories. Available to read online free.'), linkLabel: 'Read Online', linkUrl: '#storybooks' },
            { title: 'Kids Quiz — Earn Sats!', description: L('A fun Bitcoin quiz for children. Answer correctly and earn real sats sent to your parent\'s Lightning wallet.'), linkLabel: 'Take the Quiz', linkUrl: '#quiz' },
          ],
        },
        {
          blockType: 'richContent',
          content: L('Featured: Veintiuno — Bitcoin Books for Kids. Veintiuno is a publisher specialising in Bitcoin books for children. Their books are available in multiple African languages and are used in our partner schools across the continent.'),
          backgroundColor: 'cream',
        },
        {
          blockType: 'cardGrid',
          eyebrow: 'PAID RESOURCES',
          heading: 'Premium Bitcoin Learning Resources',
          columns: '3',
          variant: 'default',
          cards: [
            { title: 'Satoshi\'s Secret — Kids Novel', description: L('An adventure novel following a young African girl who discovers Bitcoin and uses it to help her community.'), linkLabel: 'Buy Now', linkUrl: '#buy' },
            { title: 'Bitcoin Activity Book', description: L('Puzzles, mazes, and activities teaching Bitcoin concepts to children aged 6–12.'), linkLabel: 'Buy Now', linkUrl: '#buy' },
            { title: 'Family Bitcoin Course', description: L('A 5-week structured course you can do together as a family. Includes workbooks and weekly Zoom sessions.'), linkLabel: 'Enroll', linkUrl: '#enroll' },
          ],
        },
        {
          blockType: 'ctaBanner',
          heading: 'Get 1,000 Sats for Your Feedback',
          subheading: 'Know a Bitcoin resource for kids we\'ve missed? Tell us and earn 1,000 sats!',
          variant: 'dark',
          primaryButtonLabel: 'Submit Feedback',
          primaryButtonUrl: '/earn-bitcoin/1000-sats-feedback-bounty/',
          align: 'center',
        },
      ],
    },

    // ── 8a. Start Here Quiz ─────────────────────────────────────────────────────
    {
      slug: 'start-here',
      title: 'Start Here — What\'s Your Bitcoin Level?',
      meta: {
        title: 'Start Here — What\'s Your Bitcoin Level? — African Bitcoiners',
        description: 'Take our 5-question Bitcoin knowledge quiz and find out where to start your Bitcoin journey.',
      },
      content: [
        {
          blockType: 'hero',
          layout: 'centered',
          eyebrow: 'START HERE',
          heading: 'What\'s Your Bitcoin Level?',
          subheading: L('Answer 5 quick questions and we\'ll point you in the right direction for your Bitcoin journey.'),
          links: [],
          backgroundType: 'orange',
          images: [],
        },
        {
          blockType: 'richContent',
          content: makeLexical('Take the quiz below to find out your Bitcoin knowledge level and get personalised recommendations.'),
          backgroundColor: 'cream',
        },
      ],
    },

    // ── 8b. Feedback Bounty Matrix (public leaderboard) ─────────────────────────
    {
      slug: 'feedback-bounty-matrix',
      title: 'Feedback Bounty Matrix',
      meta: {
        title: 'Feedback Bounty Matrix - African Bitcoiners',
        description:
          'See every community feedback submission, its review status, and reward outcome.',
      },
      content: [
        {
          blockType: 'richContent',
          content: makeLexical('Public bounty matrix — rendered by dedicated page component.'),
          backgroundColor: 'white',
        },
      ],
    },

    // ── 9. Contact / Connect With Us ────────────────────────────────────────────
    {
      slug: 'about-us/connect-with-us',
      title: 'Connect With Us',
      meta: {
        title: 'Connect With Us — African Bitcoiners',
        description: 'Get in touch with the African Bitcoiners team. Find us on social media or send us a message.',
      },
      content: [
        {
          blockType: 'hero',
          layout: 'centered',
          eyebrow: 'ABOUT US',
          heading: 'Connect With Us',
          subheading: L('We\'d love to hear from you. Whether you have a question, a partnership idea, or just want to say hello — reach out.'),
          links: [],
          backgroundType: 'orange',
          images: [],
        },
        {
          blockType: 'formEmbed',
          formType: 'contact-general',
          heading: 'Send Us a Message',
          subheading: 'Fill in the form below and we\'ll get back to you within 48 hours.',
          backgroundColor: 'white',
        },
        {
          blockType: 'ctaBanner',
          heading: 'Find Us on Social Media',
          subheading: 'Follow African Bitcoiners on Twitter, Instagram, Facebook, LinkedIn, Telegram, and WhatsApp.',
          variant: 'light',
          primaryButtonLabel: 'Twitter / X',
          primaryButtonUrl: 'https://twitter.com/AfricanBitcoins',
          secondaryButtonLabel: 'Telegram',
          secondaryButtonUrl: 'https://t.me/africanbitcoiners',
          align: 'center',
        },
      ],
    },
  ]

  let specialCreated = 0
  let specialUpdated = 0

  for (const def of specialPages) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: def.slug } },
      limit: 1,
    })

    if (existing.docs[0]) {
      await (payload.update as any)({
        collection: 'pages',
        id: existing.docs[0].id,
        data: {
          title: def.title,
          ...(def.template ? { template: def.template as any } : {}),
          ...(def.meta ? { meta: { title: def.meta.title, description: def.meta.description } } : {}),
          content: def.content,
          _status: 'published',
        },
      })
      specialUpdated++
    } else {
      await payload.create({
        collection: 'pages',
        data: {
          title: def.title,
          slug: def.slug,
          _status: 'published',
          ...(def.template ? { template: def.template as any } : {}),
          ...(def.meta ? { meta: { title: def.meta.title, description: def.meta.description } } : {}),
          content: def.content as any,
        },
      })
      specialCreated++
    }
  }

  payload.logger.info(`✓ Special pages seeded: ${specialCreated} created, ${specialUpdated} updated`)

  // ── ActiveCampaign Settings ──────────────────────────────────────────────────
  const acSettings = await (payload.findGlobal as any)({ slug: 'ac-settings', overrideAccess: true }).catch(() => null)
  if (!acSettings?.listMappings?.length) {
    await (payload.updateGlobal as any)({
      slug: 'ac-settings',
      data: {
        listMappings: [
          {
            formSlug: 'newsletter-signup',
            listNames: [{ listName: 'Newsletter Consent/Sign up' }],
            enabled: true,
          },
          {
            formSlug: 'education-partnership',
            listNames: [{ listName: 'Bitcoin Education Partnership' }],
            enabled: true,
          },
          {
            formSlug: 'course-signup-english',
            listNames: [{ listName: 'Bitcoin Course' }],
            enabled: true,
          },
          {
            formSlug: 'course-signup-french',
            listNames: [{ listName: 'Bitcoin Course - French' }],
            enabled: true,
          },
          {
            formSlug: 'final-quiz-passed',
            listNames: [{ listName: 'FINAL QUIZ' }],
            enabled: true,
          },
          {
            formSlug: 'final-quiz-failed',
            listNames: [{ listName: 'FINAL QUIZ Retake' }],
            enabled: true,
          },
          {
            formSlug: 'savings-challenge',
            listNames: [{ listName: 'A Billion African Millionaires' }],
            enabled: true,
          },
          {
            formSlug: 'bitcoin-for-her',
            listNames: [{ listName: 'Bitcoin for Her' }],
            enabled: true,
          },
          {
            formSlug: 'master',
            listNames: [{ listName: 'Master Contact List' }],
            enabled: true,
          },
        ],
      },
      overrideAccess: true,
    })
    payload.logger.info('✓ AC settings seeded with default list mappings')
  } else {
    payload.logger.info('✓ AC settings: already configured, skipped')
  }

  // ── Form Settings ────────────────────────────────────────────────────────────
  await seedFormSettings(payload)

  // ── Vouchers ─────────────────────────────────────────────────────────────────
  const existingVouchers = await payload.find({ collection: 'vouchers' as any, limit: 1, overrideAccess: true })
  if (existingVouchers.totalDocs === 0) {
    const testVouchers = [
      'LNURL1DP68GURN8GHJ7TEST001',
      'LNURL1DP68GURN8GHJ7TEST002',
      'LNURL1DP68GURN8GHJ7TEST003',
      'LNURL1DP68GURN8GHJ7TEST004',
      'LNURL1DP68GURN8GHJ7TEST005',
    ]
    for (const code of testVouchers) {
      await (payload.create as any)({ collection: 'vouchers', data: { voucherCode: code }, overrideAccess: true })
    }
    payload.logger.info(`✓ Vouchers seeded: ${testVouchers.length} test codes`)
  } else {
    payload.logger.info(`✓ Vouchers: ${existingVouchers.totalDocs} already exist, skipped`)
  }

  payload.logger.info('Seed complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
