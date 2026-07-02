import { randomUUID } from 'crypto'
import type { CollectionConfig, CollectionBeforeChangeHook } from 'payload'
import { adminOrEditor } from '../access/adminOrEditor'
import { authenticated } from '../access/authenticated'
import {
  CERT_NUMBER_START,
  formatCertNumber,
  parseCertNumberValue,
} from '@/lib/certificate-shared'

const assignCertificateIdentity: CollectionBeforeChangeHook = async ({ data, operation, req }) => {
  if (operation !== 'create') return data

  if (!data.certNumber) {
    const existing = await req.payload.find({
      collection: 'course-completions',
      where: { certNumber: { exists: true } },
      limit: 10000,
      overrideAccess: true,
    })

    let maxNumber = CERT_NUMBER_START - 1
    for (const doc of existing.docs) {
      const parsed = parseCertNumberValue((doc as { certNumber?: string }).certNumber)
      if (parsed != null) maxNumber = Math.max(maxNumber, parsed)
    }

    data.certNumber = formatCertNumber(maxNumber + 1)
  }

  if (!data.certHash) {
    data.certHash = randomUUID()
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
    defaultColumns: ['certNumber', 'name', 'email', 'scorePercent', 'completionDate', 'certDownloaded'],
    listSearchableFields: ['name', 'email', 'certNumber', 'uniqueCode'],
    useAsTitle: 'certNumber',
  },
  fields: [
    {
      name: 'completionDate',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      admin: { position: 'sidebar' },
    },
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
      name: 'uniqueCode',
      type: 'text',
      admin: {
        description: 'Telegram users — 7-character signup code.',
      },
    },
    {
      name: 'score',
      type: 'number',
      required: true,
      admin: {
        description: 'Raw score out of 50.',
      },
    },
    {
      name: 'scorePercent',
      type: 'number',
      required: true,
    },
    {
      name: 'certNumber',
      type: 'text',
      unique: true,
      admin: {
        description: 'Auto-generated certificate number (BC000720+). Do not edit manually.',
        readOnly: true,
      },
    },
    {
      name: 'certHash',
      type: 'text',
      admin: {
        description: 'Secure hash for certificate access verification.',
        readOnly: true,
      },
    },
    {
      name: 'certDownloaded',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'timeDownloaded',
      type: 'date',
      admin: { position: 'sidebar' },
    },
    {
      name: 'downloadsTotals',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'language',
      type: 'select',
      options: [
        { label: 'English', value: 'English' },
        { label: 'French', value: 'French' },
      ],
    },
    {
      name: 'tierLevel',
      type: 'select',
      defaultValue: 'ba',
      options: [
        { label: 'BA', value: 'ba' },
        { label: 'AD', value: 'ad' },
        { label: 'PR', value: 'pr' },
      ],
    },
    {
      name: 'tbtDiscountSent',
      type: 'text',
      admin: {
        description: 'TBT discount code assigned to this graduate (if applicable).',
      },
    },
    {
      name: 'ipAddress',
      type: 'text',
      admin: { position: 'sidebar' },
    },
  ],
  hooks: {
    beforeChange: [assignCertificateIdentity],
  },
}
