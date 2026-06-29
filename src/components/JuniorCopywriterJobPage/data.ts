import type { StaleJobPostingData } from '@/components/StaleJobPostingPage/types'

const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const PAGE_DATA: StaleJobPostingData = {
  heroImage: `${R2}/uploads/2022/09/armchair.webp`,
  heroImageWidth: 736,
  heroImageHeight: 924,
  job: {
    title: 'Junior Copywriter and Community Manager',
    type: 'Full time',
    location: 'Remote',
    roleSlug: 'junior-copywriter-and-community-manager',
  },
  requirements: [
    'Must be a young African Bitcoiner living in Africa',
    'Proficiency in both written and spoken English is required.',
    'Must love Bitcoin and must love to write well about it.',
    'Great community management skills',
    'Must have good communication skills and enjoy public speaking.',
    'Must love social media and engaging with people on social media.',
    'No formal qualifications necessary, but we would need to see a portfolio of your work.',
    'Ability to work remotely with minimal management.',
    'Must have a working knowledge of all relevant AI tools. Our team work extensively with AI to boost our productivity and effectiveness.',
    'Should possess a positive, can do attitude.',
    'NO PRIOR WORK EXPERIENCE REQUIRED.',
  ],
  copy: {
    heroTitle: 'WE ARE HIRING!',
    heroSubtitle: 'ARE YOU READY TO JOIN OUR TEAM?',
    applyIntro:
      'If this sounds like you and you believe you can be useful to our team, please let us know below by filling the form.',
    applyHeading: 'Apply Now',
  },
  seo: {
    title: 'Junior Copywriter and Community Manager - African Bitcoiners',
    description:
      'WE ARE HIRING! ARE YOU READY TO JOIN OUR TEAM? Junior Copywriter and Community Manager — Full time, Remote. Must be a young African Bitcoiner living in Africa.',
  },
}

export const SEO = PAGE_DATA.seo
