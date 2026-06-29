import type { StaleJobPostingData } from '@/components/StaleJobPostingPage/types'

const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const PAGE_DATA: StaleJobPostingData = {
  heroImage: `${R2}/uploads/2022/10/African-Bitcoiners-jobs-junior-designer.png`,
  heroImageWidth: 1400,
  heroImageHeight: 733,
  job: {
    title: 'UX Designer',
    type: 'Full time',
    location: 'Remote',
    roleSlug: 'ux-designer',
  },
  requirements: [
    'Must be a young African Bitcoiner living in Africa.',
    'Should possess at least basic working skills in graphic design, UX design and design tools even as a hobbyist (these folks are actually our favourites).',
    'A portfolio of your work (to be attached to the application form).',
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
    title: 'UX Designer - African Bitcoiners',
    description:
      'WE ARE HIRING! ARE YOU READY TO JOIN OUR TEAM? UX Designer — Full time, Remote. Must be a young African Bitcoiner living in Africa.',
  },
}

export const SEO = PAGE_DATA.seo
