import type { GlobalConfig } from 'payload'

import { adminOnly } from '../access/adminOnly'

export const InflationSimulatorData: GlobalConfig = {
  slug: 'inflation-simulator-data',
  label: 'Inflation Simulator Data',
  access: {
    read: () => true,
    update: adminOnly,
  },
  admin: {
    description:
      'Historical inflation rates and Bitcoin prices for the African Currency vs Bitcoin Simulator.',
  },
  fields: [
    {
      name: 'currencies',
      type: 'array',
      label: 'Currencies',
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/globals/InflationSimulatorCurrencyRowLabel#InflationSimulatorCurrencyRowLabel',
        },
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'code', type: 'text', required: true, admin: { width: '15%' } },
            { name: 'name', type: 'text', required: true, admin: { width: '35%' } },
            { name: 'symbol', type: 'text', required: true, admin: { width: '15%' } },
            { name: 'flagCode', type: 'text', required: true, admin: { width: '15%' } },
            { name: 'emoji', type: 'text', admin: { width: '10%' } },
            {
              name: 'enabled',
              type: 'checkbox',
              label: 'Enabled',
              defaultValue: true,
              admin: { width: '10%' },
            },
          ],
        },
        {
          name: 'inflationRates',
          type: 'array',
          label: 'Inflation Rates (% per year)',
          admin: {
            initCollapsed: true,
            description: 'Annual inflation rate as a percentage (e.g. 13.7 for 13.7%)',
          },
          fields: [
            { name: 'year', type: 'number', required: true },
            { name: 'rate', type: 'number', required: true },
          ],
        },
      ],
    },
    {
      name: 'bitcoinPrices',
      type: 'array',
      label: 'Bitcoin Prices (USD)',
      admin: {
        initCollapsed: true,
        description: 'Historical Bitcoin yearly average price in USD (plugin format)',
      },
      fields: [
        { name: 'year', type: 'number', required: true },
        { name: 'priceUsd', type: 'number', required: true },
      ],
    },
    {
      name: 'maxYearsBack',
      type: 'number',
      label: 'Max Years Back',
      defaultValue: 15,
      required: true,
      admin: {
        description: 'Maximum number of years users can look back in the simulator',
      },
    },
    {
      name: 'lastUpdated',
      type: 'date',
      label: 'Last Updated',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
}
