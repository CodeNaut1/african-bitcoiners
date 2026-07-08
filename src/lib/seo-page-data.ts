export type PageSeoEntry = {
  title: string
  description: string
  ogImage?: string
}

/** Slug → SEO meta (title + description). Used by bulk CMS updates and hardcoded routes. */
export const SEO_PAGE_DATA: Record<string, PageSeoEntry> = {
  home: {
    title: 'Bringing Freedom to Africa through Bitcoin',
    description:
      'African Bitcoiners is a Bitcoin education and adoption platform dedicated to building a Bitcoin-friendly Africa. Learn, earn, save, and spend Bitcoin.',
    // Fallback OG image for sharing; override per-page where we have a better hero/card.
    ogImage:
      'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/10/African-Bitcoiners-official_logo-1024x1024.png',
  },
  'about-us': {
    title: 'About Us',
    description:
      'Learn about African Bitcoiners — our mission, team, and how we bring freedom to Africa through Bitcoin education, tools, and community building.',
  },
  'about-us/african-bitcoiners-proof-of-work': {
    title: 'African Bitcoiners Proof of Work',
    description:
      'Our mission, initiatives, and impact across Africa — documented openly in the African Bitcoiners Proof of Work report.',
  },
  'about-us/connect-with-us': {
    title: 'Connect with Us',
    description:
      'Get in touch with the African Bitcoiners team. Find us on social media or send us a message — we would love to hear from you.',
  },
  'about-us/our-team': {
    title: 'Our Team',
    description:
      'Meet the people behind African Bitcoiners — a bootstrapped team building Bitcoin education, tools, and community across Africa.',
    ogImage:
      'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/03/African-Bitcoiners_Meet_the_team_EM.png',
  },
  'about-us/support-us': {
    title: 'Support Us',
    description:
      'We are a small bootstrapped team. Support our mission of bringing freedom to Africa through Bitcoin via Lightning or on-chain donation.',
  },
  'about-us/why-we-are-private': {
    title: 'Why We Are Private',
    description:
      'Why African Bitcoiners limits public exposure of team members and how we balance transparency with safety across the continent.',
    ogImage:
      'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/06/Why-we-are-private-banner.png',
  },
  'academie-bitcoin-afrique': {
    title: 'Académie Bitcoin Afrique',
    description:
      'Join Académie Bitcoin Afrique — structured Bitcoin education in French for African learners. Build your skills with African Bitcoiners.',
  },
  'african-bitcoin-ecosystem': {
    title: 'African Bitcoin Ecosystem',
    description:
      'Explore the African Bitcoin ecosystem map — projects, communities, and initiatives driving Bitcoin adoption across the continent.',
  },
  'african-bitcoin-treasury-manifesto': {
    title: 'African Bitcoin Treasury Manifesto',
    description:
      'Read the African Bitcoin Treasury Manifesto on sovereign Bitcoin reserves and financial independence for African nations.',
  },
  'african-bitcoiners-community-builders': {
    title: 'African Bitcoiners Community Builders',
    description:
      'Join us revolutionizing Bitcoin adoption across Africa through meetups and events driven by dedicated Community Builders.',
  },
  'african-bitcoiners-turns-3': {
    title: 'African Bitcoiners Turns 3',
    description:
      'Celebrating three years of African Bitcoiners — milestones, impact stories, and what is next for Bitcoin adoption in Africa.',
  },
  'bitcoin-africas-guide-to-freedom-money': {
    title: "Bitcoin: Africa's Guide to Freedom Money",
    description:
      "Discover why Bitcoin is Africa's guide to freedom money — financial sovereignty, savings, and opportunity for millions across the continent.",
  },
  'bitcoin-education-partnership': {
    title: 'Bitcoin Education Partnership',
    description:
      'Partner with African Bitcoiners to bring Bitcoin education to your community, school, or organisation across Africa.',
  },
  'bitcoin-expert-pack': {
    title: 'Bitcoin Expert Pack',
    description:
      'Advanced insights, tools, and resources for seasoned Bitcoiners looking to lead, build, and contribute more to the African ecosystem.',
  },
  'bitcoin-intermediate-pack': {
    title: 'Bitcoin Intermediate Pack',
    description:
      'Level up your Bitcoin knowledge with key concepts, tools, and strategies to grow your confidence and navigate Bitcoin like a pro.',
  },
  'bitcoin-meetups': {
    title: 'Bitcoin Meetups',
    description:
      'Find and join Bitcoin meetups across Africa. Connect with local Bitcoiners, learn together, and grow your community.',
  },
  'bitcoin-mining-in-africa': {
    title: 'Bitcoin Mining in Africa',
    description:
      'The most comprehensive directory of Bitcoin mining operations across Africa, grouped by country and organisation.',
  },
  'bitcoin-newsletter': {
    title: 'Bitcoin Newsletter',
    description:
      'Stay updated with Bitcoin insights for Africa — news, education, and business use cases from the African Bitcoiners newsletter archive.',
  },
  'bitcoin-starter-pack': {
    title: 'Bitcoin Starter Pack',
    description:
      'New to Bitcoin? Start here with simple, practical resources to understand Bitcoin fundamentals and take your first steps.',
  },
  'btrust-partners-with-africa-freee-routing': {
    title: 'Btrust Partnership',
    description:
      '₿trust partners with African Bitcoiners to launch Lightning developer bootcamps across Africa, supporting local talent and open source.',
  },
  community: {
    title: 'Community',
    description:
      'A Bitcoin community bringing freedom to Africa. We onboard new users and guide them from earning sats to self-custody.',
    ogImage:
      'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/11/Community-Africa-Bitcoin-Ecosystem.png',
  },
  'community-outreach': {
    title: 'Community Outreach',
    description:
      'How African Bitcoiners brings Bitcoin education and outreach to communities across the continent through meetups and partnerships.',
  },
  'donation-confirmation': {
    title: 'Donation Confirmation',
    description:
      'Thank you for supporting African Bitcoiners. Share your feedback on the donation experience and help us improve.',
  },
  'earn-bitcoin': {
    title: 'Earn Bitcoin',
    description:
      'Discover how to earn Bitcoin in Africa with African Bitcoiners — jobs, bounties, and places to earn sats across the continent.',
    ogImage:
      'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/11/how-to-earn-bitcoin-rewards-e1732001749845.png',
  },
  'earn-bitcoin/1000-sats-feedback-bounty': {
    title: '1000 Sats Feedback Bounty',
    description:
      'Found an error or have an idea? Share your feedback on African Bitcoiners and earn 1,000 sats if your suggestion is implemented.',
  },
  'earn-bitcoin/bitcoiner-jobs': {
    title: 'African Bitcoiner Jobs',
    description:
      'Find African Bitcoin jobs or hire Bitcoin talent. Browse open roles and opportunities to get paid in Bitcoin across Africa.',
  },
  'earn-bitcoin/places-to-earn-sats': {
    title: 'Places to Earn Sats',
    description:
      'Discover platforms and services where Africans can earn satoshis — from bounties and gigs to Lightning-powered rewards.',
  },
  faqs: {
    title: 'FAQs',
    description:
      'Frequently asked questions about African Bitcoiners, our courses, community, donations, and how to get started with Bitcoin.',
  },
  'final-quiz': {
    title: 'Final Quiz',
    description:
      'Test your Bitcoin knowledge with the Bitcoin for Beginners final quiz. Score 70% or higher to earn your certificate.',
  },
  'final-quiz-failed': {
    title: 'Final Quiz Failed',
    description:
      'You did not meet the pass mark on the Bitcoin for Beginners final quiz. Share feedback and retake the quiz in a few days.',
  },
  'final-quiz-fr': {
    title: 'Quiz Final',
    description:
      'Testez vos connaissances Bitcoin avec le quiz final BFB. Obtenez au moins 70% pour recevoir votre certificat.',
  },
  'final-quiz-passed': {
    title: 'Final Quiz Passed',
    description:
      'Congratulations! You passed the Bitcoin for Beginners final quiz. Download your certificate and share your course feedback.',
  },
  'final-quiz-passed-tg': {
    title: 'Final Quiz Passed (Telegram)',
    description:
      'Congratulations! You passed the Bitcoin for Beginners final quiz via Telegram. Download your certificate and share feedback.',
  },
  'final-quiz-tg': {
    title: 'Final Quiz (Telegram)',
    description:
      'Take the Bitcoin for Beginners final quiz via Telegram. Score 70% or higher to earn your course certificate.',
  },
  'final-quiz-tg-fr': {
    title: 'Quiz Final (Telegram)',
    description:
      'Passez le quiz final du cours Bitcoin pour débutants via Telegram. Obtenez 70% ou plus pour recevoir votre certificat.',
  },
  'get-certificate': {
    title: 'Get Certificate',
    description:
      'Download your Bitcoin for Beginners course certificate. Enter the email address you used to sign up and take the course.',
  },
  'get-certificate-tg': {
    title: 'Get Certificate (Telegram)',
    description:
      'Download your Bitcoin for Beginners course certificate. Enter the unique ID provided when you signed up via Telegram.',
  },
  'graduate-program': {
    title: 'Graduate Program',
    description:
      'Young African Bitcoiner? Join a fast-growing team bringing freedom to Africa through Bitcoin and build a career in the ecosystem.',
  },
  'hall-of-fame': {
    title: 'African Bitcoiners Hall Of Fame',
    description:
      'Celebrate African Bitcoin pioneers in the Hall of Fame — builders, educators, and advocates shaping Bitcoin adoption across Africa.',
  },
  her: {
    title: 'Bitcoin for Her',
    description:
      'Empower African women with Bitcoin at Bitcoin for Her — inclusion, innovation, and prosperity through education and community.',
  },
  'learn-bitcoin': {
    title: 'Learn Bitcoin',
    description:
      'Start your Bitcoin education with African Bitcoiners. Free courses, guides, and resources to understand Bitcoin in an African context.',
    ogImage:
      'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/11/Learn-Bitcoin-Bitcoin-for-Beginners-Course.png',
  },
  'learn-bitcoin/african-language-resources': {
    title: 'African Language Resources',
    description:
      'Bitcoin learning resources in African languages — making Bitcoin education accessible to more communities across the continent.',
  },
  'learn-bitcoin/bitcoin-for-kids': {
    title: 'Bitcoin for Kids',
    description:
      'Free and paid Bitcoin education resources for children and young learners across Africa. Start their Bitcoin journey early.',
  },
  'learn-bitcoin/bitcoin-learning-resources': {
    title: 'Bitcoin Learning Resources',
    description:
      'Curated Bitcoin learning resources for Africans — articles, videos, podcasts, and tools to deepen your Bitcoin knowledge.',
  },
  'learn-bitcoin/bitcoin-whitepaper': {
    title: 'Bitcoin Whitepaper',
    description:
      'Read the Bitcoin whitepaper — the original Satoshi Nakamoto publication that introduced the world to peer-to-peer digital cash.',
  },
  'learn-bitcoin/free-bitcoin-course': {
    title: 'Free Bitcoin for Beginners Course',
    description:
      'Join thousands of Africans learning Bitcoin for free. No experience needed. Available in English and French via email or Telegram.',
  },
  'learn-bitcoin/how-to-keep-bitcoin-in-your-head': {
    title: 'How To Keep Bitcoin In Your Head',
    description:
      'Learn how to memorise your Bitcoin seed phrase securely. A practical guide to keeping your Bitcoin backup in your head.',
  },
  'learn-bitcoin/northern-nigeria-bitcoin-seminar': {
    title: 'Northern Nigeria Bitcoin Seminar',
    description:
      'A comprehensive Bitcoin immersion in Northern Nigeria — community meetup and hands-on Lightning development bootcamp in Kaduna.',
  },
  'learn-bitcoin/top-10-bitcoin-misconceptions': {
    title: 'Top 10 Bitcoin Misconceptions Explained',
    description:
      'We dispel common Bitcoin myths and reveal Bitcoin\'s true role in Africa\'s financial landscape. Separate fact from fiction.',
  },
  'learn-bitcoin/why-bitcoin-only': {
    title: 'Why Bitcoin ONLY',
    description:
      'Discover why African Bitcoiners is focused on Bitcoin only — not crypto. Understand the difference and why it matters for Africa.',
  },
  'most-impactful-nominations': {
    title: 'Most Impactful African Bitcoiners Nominations',
    description:
      'Nominate the most impactful African Bitcoiners of the year. Celebrate advocates driving Bitcoin adoption across the continent.',
  },
  'organization-activity-update': {
    title: 'Organization Activity Update',
    description:
      'Update whether your Bitcoin-focused organisation is still active on African Bitcoiners. Keep the ecosystem directory accurate.',
  },
  'save-bitcoin': {
    title: 'Save Bitcoin',
    description:
      'Learn how to save Bitcoin with African Bitcoiners. Best practices and tools to store your Bitcoin securely and protect your wealth.',
    ogImage:
      'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/elementor/thumbs/side-image-bitcoin-vs-inflation-rbhzu575cbf2kbk2ody7s0kdi93y3ms3ekk15oy2he.png',
  },
  'save-bitcoin/5-year-bitcoin-savings-calculator': {
    title: '5 Year Bitcoin Savings Calculator',
    description:
      'See how Bitcoin savings could grow over five years. Use our calculator to explore long-term Bitcoin saving scenarios.',
  },
  'save-bitcoin/bitcoin-inflation-simulator': {
    title: 'Bitcoin Inflation Simulator',
    description:
      'Compare fiat inflation vs Bitcoin savings with our interactive simulator. See how purchasing power changes over time in Africa.',
  },
  'save-bitcoin/bitcoin-to-fiat-converter': {
    title: 'Bitcoin to Fiat Converter',
    description:
      'Convert Bitcoin to African fiat currencies instantly. A simple tool to understand BTC values in your local currency.',
  },
  'save-bitcoin/buying-bitcoin-peer-to-peer': {
    title: 'Buying Bitcoin Peer to Peer',
    description:
      'Discover trusted peer-to-peer platforms to buy Bitcoin privately in Africa. Compare fees, devices, and Lightning support.',
  },
  'save-bitcoin/how-to-setup-your-bitcoin-cold-storage-for-free': {
    title: 'How To Set Up Your Bitcoin Cold Storage For Free',
    description:
      'Set up Bitcoin cold storage for free using paper wallets and seed phrases. A step-by-step guide to keeping Bitcoin safe offline.',
  },
  'save-bitcoin/million-sat-challenge': {
    title: 'The Million Sat Challenge',
    description:
      'Join the Million Sat Challenge — earn satoshis while learning about Bitcoin savings and become part of our freedom community.',
  },
  'save-bitcoin/recommended-bitcoin-and-lightning-wallets': {
    title: 'Recommended Bitcoin and Lightning Wallets',
    description:
      'Explore the best Bitcoin and Lightning wallets we recommend for Africans — secure options for mobile, desktop, and self-custody.',
  },
  'spend-bitcoin': {
    title: 'Spend Bitcoin',
    description:
      'Find vendors and services that accept Bitcoin. Explore the Bitcoiners Map and places to spend sats online across Africa.',
    ogImage:
      'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2024/11/Spend-Bitcoin-Bitcoiners-Map.png',
  },
  'spend-bitcoin/bitcoiners-map': {
    title: 'Bitcoiners Map',
    description:
      'Discover where to spend Bitcoin in Africa on the Bitcoiners Map — merchants, services, and Bitcoin-friendly businesses near you.',
  },
  'spend-bitcoin/places-to-spend-bitcoin': {
    title: 'Places to Spend Sats Online',
    description:
      'A curated list of online stores and services where you can spend Bitcoin and Lightning sats from anywhere in Africa.',
  },
  'stale-pages-not-indexed/african-bitcoin-communities': {
    title: 'Local African Bitcoin Communities',
    description:
      'Discover vibrant Bitcoin communities across Africa — meetups, circular economies, and developer networks building the future.',
  },
  'stale-pages-not-indexed/african-bitcoin-projects': {
    title: 'African Bitcoin Projects',
    description:
      'Explore top African Bitcoin projects reshaping the ecosystem — from pioneering startups to tools built for the continent.',
  },
  'stale-pages-not-indexed/junior-copywriter-and-community-manager': {
    title: 'Junior Copywriter and Community Manager',
    description:
      'We are hiring a Junior Copywriter and Community Manager — full time, remote. Young African Bitcoiner living in Africa required.',
  },
  'stale-pages-not-indexed/junior-php-coder': {
    title: 'Junior PHP Coder',
    description:
      'We are hiring a Junior PHP Coder — full time, remote. Join African Bitcoiners and help build tools for Bitcoin adoption in Africa.',
  },
  'stale-pages-not-indexed/the-great-african-bitcoin-survey': {
    title: 'The Great African Bitcoin Survey',
    description:
      'Results and insights from the Great African Bitcoin Survey — understanding how Africans discover, use, and think about Bitcoin.',
  },
  'stale-pages-not-indexed/top-21-african-bitcoin-countries': {
    title: 'Top 21 African Bitcoin Countries',
    description:
      'Explore the top 21 African countries leading Bitcoin adoption — communities, regulation, and innovation ranked and explained.',
  },
  'stale-pages-not-indexed/ux-designer': {
    title: 'UX Designer',
    description:
      'We are hiring a UX Designer — full time, remote. Help African Bitcoiners design intuitive experiences for Bitcoin education in Africa.',
  },
  'start-here': {
    title: 'Start Here',
    description:
      'Take our 5-question Bitcoin knowledge quiz and find out where to start your Bitcoin journey with African Bitcoiners.',
  },
  'step-by-step-guide-for-nostr': {
    title: 'Setting Up Nostr: A Step-by-Step Guide',
    description:
      'Set up Nostr step by step with African Bitcoiners. A beginner-friendly guide to decentralised social and Bitcoin-powered zaps.',
  },
  'the-most-impactful-african-bitcoiners-of-2022': {
    title: 'The Most Impactful African Bitcoiners of 2022',
    description:
      'Discover 21 African Bitcoiners making waves in 2022 — passionate advocates using Bitcoin to bring freedom to Africans.',
  },
  'the-most-impactful-african-bitcoiners-of-2023': {
    title: 'The Most Impactful African Bitcoiners of 2023',
    description:
      'Meet the top 21 African Bitcoin trailblazers of 2023 revolutionising adoption and financial liberation across the continent.',
  },
  'the-most-impactful-african-bitcoiners-of-2024': {
    title: 'The Most Impactful African Bitcoiners of 2024',
    description:
      'Uncover the stories of the top 21 African Bitcoin trailblazers of 2024 driving adoption and empowerment across Africa.',
  },
  'the-most-impactful-african-bitcoiners-of-2025': {
    title: 'The Most Impactful African Bitcoiners of 2025',
    description:
      'The 2025 list of the most impactful Bitcoin advocates across the African continent — MIAB celebrates the builders and educators.',
  },
  'where-to-buy-bitcoin-privately-in-africa': {
    title: 'Where to Buy Bitcoin Privately in Africa',
    description:
      'Learn how to buy Bitcoin anonymously in Africa using safe, privacy-focused methods, trusted platforms, and practical tips.',
  },
}

import { resolveOgImage } from './seo-og-images'

export function getPageSeo(slug: string): (PageSeoEntry & { ogImage: string }) | undefined {
  const entry = SEO_PAGE_DATA[slug]
  if (!entry) return undefined

  return {
    ...entry,
    ogImage: resolveOgImage(slug, entry.ogImage),
  }
}
