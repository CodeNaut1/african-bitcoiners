import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { adminOrEditor } from '../access/adminOrEditor'
import { defaultLexical } from '../fields/defaultLexical'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
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
    defaultColumns: ['title', 'company', 'location', 'type', 'isActive', 'postedDate'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'companyDescription',
      type: 'textarea',
    },
    {
      name: 'websiteURL',
      type: 'text',
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Full-time', value: 'full-time' },
        { label: 'Part-time', value: 'part-time' },
        { label: 'Contract', value: 'contract' },
        { label: 'Volunteer', value: 'volunteer' },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      editor: defaultLexical,
    },
    {
      name: 'contactEmail',
      type: 'email',
    },
    {
      name: 'contactName',
      type: 'text',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'postedDate',
      type: 'date',
      admin: { position: 'sidebar' },
    },
    {
      name: 'shareButtonId',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'ID used by social share script.',
      },
    },
    slugField(),
  ],
}
