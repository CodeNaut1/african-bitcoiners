import type { CollectionConfig } from 'payload'
import { adminOrEditor } from '../access/adminOrEditor'

export const MiningOrgs: CollectionConfig = {
  slug: 'mining-orgs',
  access: {
    create: adminOrEditor,
    delete: adminOrEditor,
    read: ({ req: { user } }) => {
      if (user) return true
      return { isActive: { equals: true } }
    },
    update: adminOrEditor,
  },
  admin: {
    defaultColumns: ['name', 'country', 'city', 'isActive'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'country',
      type: 'text',
    },
    {
      name: 'countryFlagCode',
      type: 'text',
      maxLength: 2,
      admin: {
        description: 'ISO 3166-1 alpha-2 country code (e.g. NG, ZA, KE).',
      },
    },
    {
      name: 'city',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'founderName',
      type: 'text',
    },
    {
      name: 'contactPerson',
      type: 'text',
    },
    {
      name: 'contactEmail',
      type: 'email',
    },
    {
      name: 'websiteURL',
      type: 'text',
    },
    {
      name: 'twitterURL',
      type: 'text',
    },
    {
      name: 'logoImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
}
