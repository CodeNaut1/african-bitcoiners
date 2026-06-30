import type { CollectionConfig } from 'payload'
import { adminOrEditor } from '../access/adminOrEditor'
import { defaultLexical } from '../fields/defaultLexical'

export const MIABNominees: CollectionConfig = {
  slug: 'miab-nominees',
  access: {
    create: adminOrEditor,
    delete: adminOrEditor,
    read: ({ req: { user } }) => {
      if (user) return true
      return { isPublished: { equals: true } }
    },
    update: adminOrEditor,
  },
  admin: {
    defaultColumns: ['name', 'year', 'rank', 'country', 'isPublished', 'createdAt', 'updatedAt'],
    listSearchableFields: ['name', 'country'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'year',
      type: 'number',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'rank',
      type: 'number',
      required: true,
      admin: { position: 'sidebar' },
    },
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
      name: 'countryFlagEmoji',
      type: 'text',
      maxLength: 4,
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'bio',
      type: 'richText',
      editor: defaultLexical,
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
  ],
}
