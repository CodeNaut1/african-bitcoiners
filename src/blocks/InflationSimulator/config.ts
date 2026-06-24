import type { Block } from 'payload'

export const InflationSimulatorBlock: Block = {
  slug: 'inflationSimulator',
  interfaceName: 'InflationSimulatorBlock',
  labels: { singular: 'Inflation Simulator', plural: 'Inflation Simulators' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'African Inflation Simulator' },
    {
      name: 'subheading',
      type: 'text',
      defaultValue: 'See how much Bitcoin would have saved you from inflation.',
    },
    {
      name: 'defaultCurrency',
      type: 'text',
      defaultValue: 'NGN',
      admin: { description: 'Default currency code to pre-select (e.g. NGN, ZAR, KES)' },
    },
    {
      name: 'defaultAmount',
      type: 'number',
      defaultValue: 10000,
    },
    {
      name: 'defaultYearsAgo',
      type: 'number',
      defaultValue: 5,
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'cream',
      options: [
        { label: 'Cream', value: 'cream' },
        { label: 'Dark Blue', value: 'dark' },
        { label: 'White', value: 'white' },
      ],
    },
  ],
}
