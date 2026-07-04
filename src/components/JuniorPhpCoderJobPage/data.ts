import type { StaleJobPostingData } from '@/components/StaleJobPostingPage/types'

const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const PAGE_DATA: StaleJobPostingData = {
  heroImage: `${R2}/uploads/2022/10/African-Bitcoiners-jobs-junior-coder.jpg`,
  heroImageWidth: 1300,
  heroImageHeight: 731,
  job: {
    title: 'Junior PHP Developer',
    type: 'Full time',
    location: 'Remote',
    roleSlug: 'junior-php-coder',
  },
  requirements: [
    'Must be a young African Bitcoiner living in Africa.',
    'Should possess basic working skills in web and Bitcoin/lightning development, even as a hobbyist (these folks are actually our favourites).',
    'Must be skilled with backend development (PHP) and have blockchain dev experience.',
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
    title: 'Junior PHP Coder',
    description:
      'WE ARE HIRING! ARE YOU READY TO JOIN OUR TEAM? Junior PHP Developer — Full time, Remote. Must be a young African Bitcoiner living in Africa.',
  },
}

export const SEO = PAGE_DATA.seo
