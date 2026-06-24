import type { Block } from 'payload'

export const PricingTiersBlock: Block = {
  slug: 'pricingTiers',
  interfaceName: 'PricingTiersBlock',
  labels: { singular: 'Pricing Tiers', plural: 'Pricing Tiers' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    { name: 'subheading', type: 'text' },
    {
      name: 'currency',
      type: 'select',
      defaultValue: 'sats',
      options: [
        { label: 'Sats (₿)', value: 'sats' },
        { label: 'USD ($)', value: 'usd' },
        { label: 'EUR (€)', value: 'eur' },
      ],
    },
    {
      name: 'tiers',
      type: 'array',
      required: true,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'monthlyPrice', type: 'number', required: true },
        { name: 'yearlyPrice', type: 'number', required: true },
        { name: 'description', type: 'text' },
        {
          name: 'features',
          type: 'array',
          fields: [
            { name: 'feature', type: 'text', required: true },
            {
              name: 'included',
              type: 'checkbox',
              defaultValue: true,
            },
          ],
        },
        { name: 'buttonText', type: 'text', defaultValue: 'Get Started' },
        { name: 'buttonLink', type: 'text' },
        { name: 'isHighlighted', type: 'checkbox', defaultValue: false },
        {
          name: 'badge',
          type: 'text',
          admin: { description: 'e.g. "Most Popular", "Best Value"' },
        },
      ],
    },
  ],
}
