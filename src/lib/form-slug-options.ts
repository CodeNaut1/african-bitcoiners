/** Known form slugs for admin dropdowns (ActiveCampaign mappings, etc.). */
export const FORM_SLUG_OPTIONS = [
  { label: 'Newsletter Signup', value: 'newsletter-signup' },
  { label: 'Contact Form', value: 'contact' },
  { label: 'BFB Course Signup', value: 'course-signup' },
  { label: 'BFB Course Signup (English)', value: 'course-signup-english' },
  { label: 'BFB Course Signup (French)', value: 'course-signup-french' },
  { label: 'Feedback Bounty', value: 'feedback-bounty' },
  { label: 'Donation', value: 'donation' },
  { label: 'Job Submission', value: 'job-submission' },
  { label: 'Education Partnership', value: 'education-partnership' },
  { label: 'Savings Challenge', value: 'savings-challenge' },
  { label: 'Mining Organization', value: 'mining-org' },
  { label: 'Meetup Submission', value: 'meetup' },
  { label: 'Volunteer', value: 'volunteer' },
  { label: 'Graduate Program', value: 'graduate-program' },
  { label: 'Map Location', value: 'map-location' },
  { label: 'Ecosystem Submission', value: 'ecosystem' },
  { label: 'Final Quiz Passed', value: 'final-quiz-passed' },
  { label: 'Final Quiz Failed', value: 'final-quiz-failed' },
  { label: 'Bitcoin for Her', value: 'bitcoin-for-her' },
  { label: 'Master Contact List', value: 'master' },
] as const

export type FormSlugOption = (typeof FORM_SLUG_OPTIONS)[number]
