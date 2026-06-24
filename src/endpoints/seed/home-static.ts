import type { RequiredDataFromCollectionSlug } from 'payload'

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

export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  title: 'Home',
  meta: {
    description: 'African Bitcoiners — Bringing Freedom to Africa through Bitcoin.',
    title: 'African Bitcoiners',
  },
  content: [
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
    {
      blockType: 'partnersCarousel',
      heading: 'Trusted by builders, educators, and Bitcoin leaders across Africa',
      useGlobalPartners: true,
      speed: 'normal',
    },
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
    {
      blockType: 'statsBar',
      backgroundColor: 'dark',
      stats: [
        { value: '10k+', label: 'COMMUNITY' },
        { value: '170+', label: 'AFRICAN BITCOIN PROJECTS TRACKED' },
        { value: '12', label: 'BOOTCAMPS ACROSS AFRICA' },
      ],
    },
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
    {
      blockType: 'testimonialsCarousel',
      heading: 'Community Feedback & Testimonials',
      useGlobalTestimonials: true,
      backgroundColor: 'cream',
    },
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
