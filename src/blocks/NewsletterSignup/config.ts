import type { Block } from 'payload'

export const NewsletterSignupBlock: Block = {
  slug: 'newsletterSignup',
  interfaceName: 'NewsletterSignupBlock',
  labels: { singular: 'Newsletter Signup', plural: 'Newsletter Signups' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Subscribe to the Bitcoin Newsletter',
    },
    {
      name: 'subheading',
      type: 'text',
      defaultValue: 'Weekly updates on Bitcoin adoption across Africa — delivered every Monday.',
    },
    {
      name: 'buttonLabel',
      type: 'text',
      defaultValue: 'Subscribe Free',
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Dark Blue', value: 'dark' },
        { label: 'Orange', value: 'orange' },
        { label: 'Cream', value: 'cream' },
        { label: 'White', value: 'white' },
      ],
    },
    {
      name: 'successMessage',
      type: 'text',
      defaultValue: "You're subscribed! Check your inbox for a confirmation email.",
    },
  ],
}
