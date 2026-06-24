import type { CollectionConfig } from 'payload'
import { adminOrEditor } from '../access/adminOrEditor'
import { anyone } from '../access/anyone'

export const Partners: CollectionConfig = {
  slug: 'partners',
  access: {
    create: adminOrEditor,
    delete: adminOrEditor,
    read: anyone,
    update: adminOrEditor,
  },
  admin: {
    defaultColumns: ['name', 'websiteURL', 'logoWidth'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'logoImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'websiteURL',
      type: 'text',
    },
    {
      name: 'logoWidth',
      type: 'number',
      admin: {
        description: 'Display width in pixels for the partner logo in the carousel.',
      },
    },
  ],
}
