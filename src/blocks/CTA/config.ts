import type { Block } from 'payload'

export const CTABlock: Block = {
  slug: 'ctaBanner',
  interfaceName: 'CTABannerBlock',
  labels: { singular: 'CTA Banner', plural: 'CTA Banners' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'subheading',
      type: 'textarea',
    },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'orange',
      options: [
        { label: 'Orange (primary)', value: 'orange' },
        { label: 'Dark Blue', value: 'dark' },
        { label: 'White / Light', value: 'light' },
      ],
    },
    {
      name: 'primaryButtonLabel',
      type: 'text',
    },
    {
      name: 'primaryButtonUrl',
      type: 'text',
    },
    {
      name: 'secondaryButtonLabel',
      type: 'text',
    },
    {
      name: 'secondaryButtonUrl',
      type: 'text',
    },
    {
      name: 'align',
      type: 'select',
      defaultValue: 'center',
      options: [
        { label: 'Center', value: 'center' },
        { label: 'Left', value: 'left' },
      ],
    },
  ],
}
