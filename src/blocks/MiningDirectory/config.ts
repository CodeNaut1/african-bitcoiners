import type { Block } from 'payload'

export const MiningDirectoryBlock: Block = {
  slug: 'miningDirectory',
  interfaceName: 'MiningDirectoryBlock',
  labels: { singular: 'Mining Directory', plural: 'Mining Directories' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'African Mining Directory' },
    { name: 'subheading', type: 'text' },
    {
      name: 'groupByCountry',
      type: 'checkbox',
      defaultValue: true,
      label: 'Group entries by country',
    },
    {
      name: 'showAddListingButton',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'addListingUrl',
      type: 'text',
      defaultValue: '#mining-form',
      admin: { condition: (_, s) => Boolean(s?.showAddListingButton) },
    },
  ],
}
