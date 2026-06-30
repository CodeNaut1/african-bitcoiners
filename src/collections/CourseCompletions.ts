import type { CollectionConfig, CollectionBeforeChangeHook } from 'payload'
import { adminOrEditor } from '../access/adminOrEditor'
import { authenticated } from '../access/authenticated'

const generateCertNumber: CollectionBeforeChangeHook = async ({ data, operation, req }) => {
  if (operation === 'create' && !data.certNumber) {
    const count = await req.payload.count({ collection: 'course-completions' as any })
    const num = (count.totalDocs + 1).toString().padStart(6, '0')
    data.certNumber = `BC${num}`
  }
  return data
}

export const CourseCompletions: CollectionConfig = {
  slug: 'course-completions',
  access: {
    create: () => true,
    delete: adminOrEditor,
    read: authenticated,
    update: adminOrEditor,
  },
  admin: {
    defaultColumns: ['name', 'email', 'certNumber', 'scorePercent', 'completionDate', 'createdAt', 'updatedAt'],
    listSearchableFields: ['name', 'email', 'certNumber'],
    useAsTitle: 'certNumber',
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
      name: 'score',
      type: 'number',
    },
    {
      name: 'scorePercent',
      type: 'number',
    },
    {
      name: 'certNumber',
      type: 'text',
      admin: {
        description: 'Auto-generated certificate number (BC000001+). Do not edit manually.',
        readOnly: true,
      },
    },
    {
      name: 'certHash',
      type: 'text',
    },
    {
      name: 'uniqueCode',
      type: 'text',
    },
    {
      name: 'courseLang',
      type: 'select',
      options: [
        { label: 'English', value: 'English' },
        { label: 'French', value: 'French' },
      ],
    },
    {
      name: 'tierLevel',
      type: 'select',
      options: [
        { label: 'BA', value: 'ba' },
        { label: 'AD', value: 'ad' },
        { label: 'PR', value: 'pr' },
      ],
    },
    {
      name: 'utmCampaign',
      type: 'text',
    },
    {
      name: 'certDownloaded',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'downloadCount',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'tbtDiscountSent',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'completionDate',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      admin: { position: 'sidebar' },
    },
    {
      name: 'ipAddress',
      type: 'text',
      admin: { position: 'sidebar' },
    },
  ],
  hooks: {
    beforeChange: [generateCertNumber],
  },
}
