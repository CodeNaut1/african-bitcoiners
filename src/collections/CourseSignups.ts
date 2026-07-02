import type { CollectionConfig } from 'payload'
import { adminOrEditor } from '../access/adminOrEditor'
import { authenticated } from '../access/authenticated'

export const CourseSignups: CollectionConfig = {
  slug: 'course-signups',
  access: {
    create: () => true,
    delete: adminOrEditor,
    read: authenticated,
    update: adminOrEditor,
  },
  admin: {
    defaultColumns: ['name', 'email', 'courseLang', 'deliveryMethod', 'tierLevel', 'signupDate', 'createdAt', 'updatedAt'],
    listSearchableFields: ['name', 'email', 'uniqueCode'],
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'country',
      type: 'text',
    },
    {
      name: 'uniqueCode',
      type: 'text',
      admin: {
        description: 'Alphanumeric code generated at signup.',
      },
    },
    {
      name: 'utmCampaign',
      type: 'text',
    },
    {
      name: 'tierLevel',
      type: 'select',
      options: [
        { label: 'BA', value: 'ba' },
        { label: 'AD', value: 'ad' },
        { label: 'PR', value: 'pr' },
      ],
      defaultValue: 'ba',
    },
    {
      name: 'courseLang',
      type: 'select',
      required: true,
      options: [
        { label: 'English', value: 'English' },
        { label: 'French', value: 'French' },
      ],
    },
    {
      name: 'deliveryMethod',
      type: 'select',
      required: true,
      options: [
        { label: 'Email', value: 'email' },
        { label: 'Telegram', value: 'telegram' },
      ],
    },
    {
      name: 'ipAddress',
      type: 'text',
      admin: { position: 'sidebar' },
    },
    {
      name: 'signupDate',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      admin: { position: 'sidebar' },
    },
  ],
}
