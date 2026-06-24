import type { Block } from 'payload'

export const PeopleShowcaseBlock: Block = {
  slug: 'peopleShowcase',
  interfaceName: 'PeopleShowcaseBlock',
  labels: { singular: 'People Showcase', plural: 'People Showcases' },
  fields: [
    { name: 'year', type: 'number', required: true, admin: { description: 'MIAB year to display' } },
    { name: 'heading', type: 'text' },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid-2col',
      options: [
        { label: 'Grid 2-column (2025 style)', value: 'grid-2col' },
        { label: 'List alternating (2024 style)', value: 'list-alternating' },
      ],
    },
    {
      name: 'showYearNav',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show "View Other Years" navigation',
    },
    {
      name: 'otherYears',
      type: 'array',
      label: 'Other Years navigation links',
      admin: { condition: (_, s) => Boolean(s?.showYearNav) },
      fields: [
        { name: 'year', type: 'number', required: true },
        { name: 'url', type: 'text', required: true },
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
