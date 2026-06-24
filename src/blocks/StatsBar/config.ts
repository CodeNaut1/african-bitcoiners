import type { Block } from 'payload'

export const StatsBarBlock: Block = {
  slug: 'statsBar',
  interfaceName: 'StatsBarBlock',
  labels: { singular: 'Stats Bar', plural: 'Stats Bars' },
  fields: [
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Dark Blue', value: 'dark' },
        { label: 'Orange', value: 'orange' },
        { label: 'White', value: 'white' },
        { label: 'Cream', value: 'cream' },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: 'value', type: 'text', required: true, admin: { description: 'e.g. "10K+"' } },
        { name: 'label', type: 'text', required: true, admin: { description: 'e.g. "Community Members"' } },
      ],
    },
  ],
}
