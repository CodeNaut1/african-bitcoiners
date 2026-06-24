import type { Block } from 'payload'

export const FlagsCarouselBlock: Block = {
  slug: 'flagsCarousel',
  interfaceName: 'FlagsCarouselBlock',
  labels: { singular: 'Flags Carousel', plural: 'Flags Carousels' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'countries',
      type: 'array',
      required: true,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'slug', type: 'text', required: true, admin: { description: 'Used in URL: /top-african-bitcoin-countries-{slug}/' } },
        { name: 'countryCode', type: 'text', required: true, maxLength: 2, admin: { description: 'ISO 3166-1 alpha-2 (e.g. NG, ZA, KE)' } },
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
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'cream',
      options: [
        { label: 'Cream', value: 'cream' },
        { label: 'White', value: 'white' },
        { label: 'Dark Blue', value: 'dark' },
      ],
    },
  ],
}
