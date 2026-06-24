import type { Block } from 'payload'

export const PartnersCarouselBlock: Block = {
  slug: 'partnersCarousel',
  interfaceName: 'PartnersCarouselBlock',
  labels: { singular: 'Partners Carousel', plural: 'Partners Carousels' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      admin: { description: 'Small label above the logos (optional)' },
    },
    {
      name: 'useGlobalPartners',
      type: 'checkbox',
      defaultValue: true,
      label: 'Use all active Partners from Partners collection',
    },
    {
      name: 'partners',
      type: 'array',
      label: 'Inline Partners (when not using global)',
      admin: {
        condition: (_, siblingData) => !siblingData?.useGlobalPartners,
        description: 'Manual list of partners to display',
      },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'logoImage', type: 'upload', relationTo: 'media' },
        { name: 'websiteURL', type: 'text' },
      ],
    },
    {
      name: 'speed',
      type: 'select',
      defaultValue: 'normal',
      options: [
        { label: 'Slow', value: 'slow' },
        { label: 'Normal', value: 'normal' },
        { label: 'Fast', value: 'fast' },
      ],
    },
  ],
}
