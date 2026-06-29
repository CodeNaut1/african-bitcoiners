import type { GlobalConfig } from 'payload'
import { adminOnly } from '../access/adminOnly'

const FORM_SLUG_OPTIONS = [
  { label: 'Newsletter Signup', value: 'newsletter-signup' },
  { label: 'Education Partnership', value: 'education-partnership' },
  { label: 'Course Signup (English)', value: 'course-signup-english' },
  { label: 'Course Signup (French)', value: 'course-signup-french' },
  { label: 'Final Quiz Passed', value: 'final-quiz-passed' },
  { label: 'Final Quiz Failed', value: 'final-quiz-failed' },
  { label: 'Savings Challenge', value: 'savings-challenge' },
  { label: 'Bitcoin for Her', value: 'bitcoin-for-her' },
  { label: 'Contact', value: 'contact' },
  { label: 'Master (all forms — secondary list)', value: 'master' },
]

export const ActiveCampaignSettings: GlobalConfig = {
  slug: 'ac-settings',
  label: 'ActiveCampaign Settings',
  access: {
    read: adminOnly,
    update: adminOnly,
  },
  admin: {
    description: 'Map each form submission type to an ActiveCampaign list. Every contact is also added to the "master" list regardless of which form they use.',
  },
  fields: [
    {
      // Renders a "Fetch Lists" helper panel above the array
      name: 'acListsFetcher',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/admin/ActiveCampaignListFetcher#default',
        },
      },
    },
    {
      name: 'listMappings',
      type: 'array',
      label: 'Form → ActiveCampaign List Mappings',
      admin: {
        description: 'Each row maps a form submission type to an exact ActiveCampaign list name. The "master" entry defines the secondary list every contact is always added to.',
      },
      fields: [
        {
          name: 'formSlug',
          type: 'select',
          required: true,
          options: FORM_SLUG_OPTIONS,
          admin: { description: 'Which form triggers this sync' },
        },
        {
          name: 'listName',
          type: 'text',
          required: true,
          admin: {
            description: 'Exact ActiveCampaign list name (case-sensitive — use "Fetch Lists" above to verify)',
          },
        },
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Enabled',
          defaultValue: true,
        },
      ],
    },
  ],
}
