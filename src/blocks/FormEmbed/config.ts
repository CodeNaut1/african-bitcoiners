import type { Block } from 'payload'

const FORM_TYPES = [
  { label: 'Idea Submission', value: 'idea-submission' },
  { label: 'Project Application', value: 'project-application' },
  { label: 'Bootcamp Enrollment', value: 'bootcamp-enrollment' },
  { label: 'Merchandise Order', value: 'merchandise-order' },
  { label: 'Community Membership', value: 'community-membership' },
  { label: 'Event RSVP', value: 'event-rsvp' },
  { label: 'Speaker Application', value: 'speaker-application' },
  { label: 'Partnership Inquiry', value: 'partnership-inquiry' },
  { label: 'Donation / Support', value: 'donation' },
  { label: 'Contact General', value: 'contact-general' },
  { label: 'Feedback / Rating', value: 'feedback-rating' },
  { label: 'Mining Directory Listing', value: 'mining-directory' },
  { label: 'Custom Payload Form', value: 'payload-form' },
]

export const FormEmbedBlock: Block = {
  slug: 'formEmbed',
  interfaceName: 'FormEmbedBlock',
  labels: { singular: 'Form Embed', plural: 'Form Embeds' },
  fields: [
    {
      name: 'formType',
      type: 'select',
      required: true,
      options: FORM_TYPES,
      admin: { description: 'Select which form to display on this page section' },
    },
    {
      name: 'heading',
      type: 'text',
      admin: { description: 'Optional heading above the form' },
    },
    {
      name: 'subheading',
      type: 'text',
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'white',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Cream', value: 'cream' },
      ],
    },
  ],
}
