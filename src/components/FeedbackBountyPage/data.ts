const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

export const IMG = {
  hero: `${R2}/uploads/2024/09/Sats-feedback-bounty-1024x671.png`,
  whatIsDeal: `${R2}/uploads/2024/09/What-is-bounty-feedback-1024x740.png`,
  whyJoin: `${R2}/uploads/2024/09/Why-join-the-bounty-feedback.png`,
  arrowOneTwo: `${R2}/uploads/2024/09/one-to-two-arrow.png`,
  arrowTwoThree: `${R2}/uploads/2024/09/two-to-three-arrow.png`,
  arrowThreeFour: `${R2}/uploads/2024/09/three-to-four-arrow.png`,
}

export const LINKS = {
  participate: '#participate',
  submitFeedback: '/feedback-bounty-submission/',
  trackMatrix: '/feedback-bounty-matrix/',
  earnMoreSats: '/earn-bitcoin/places-to-earn-sats/',
}

export const BENEFITS = [
  {
    title: 'Be a Game-Changer',
    description: 'Your feedback can shape the future of African Bitcoiners.',
  },
  {
    title: 'Earn Big',
    description: 'Earn 1,000 sats for every piece of feedback we implement.',
  },
  {
    title: 'Get Recognised',
    description: 'Have your name featured in our newsletter!',
  },
] as const

export const STEP1_RULES = [
  { label: 'Be Clear & Specific:', text: 'We love detailed feedback. Make sure to include examples! One idea per form!' },
  { label: 'Be Constructive:', text: 'Point out issues and suggest practical solutions.' },
  { label: 'Stay Relevant:', text: 'Focus your feedback on our courses, content, structure, delivery, or resources.' },
  { label: 'Go Deep:', text: 'The more details, the better. We want to fully understand your ideas.' },
] as const
