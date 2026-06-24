import type { CollectionConfig } from 'payload'
import { adminOrEditor } from '../access/adminOrEditor'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  access: {
    create: () => true,
    delete: adminOrEditor,
    read: adminOrEditor,
    update: adminOrEditor,
  },
  admin: {
    defaultColumns: ['formName', 'formSlug', 'status', 'submittedAt'],
    useAsTitle: 'formName',
    description: 'Generic store for all public form submissions (replaces Gravity Forms entries).',
  },
  fields: [
    {
      name: 'formName',
      type: 'text',
      required: true,
    },
    {
      name: 'formSlug',
      type: 'text',
    },
    {
      name: 'data',
      type: 'json',
      admin: {
        description: 'Raw form field data as JSON.',
      },
    },
    {
      name: 'submittedAt',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      admin: { position: 'sidebar' },
    },
    {
      name: 'ipAddress',
      type: 'text',
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Spam', value: 'spam' },
        { label: 'Trash', value: 'trash' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
