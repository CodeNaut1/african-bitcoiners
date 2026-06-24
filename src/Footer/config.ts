import type { GlobalConfig } from 'payload'
import { adminOnly } from '@/access/adminOnly'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true,
    update: adminOnly,
  },
  fields: [
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'African Bitcoiners is a Bitcoin education and adoption platform dedicated to building a Bitcoin-friendly Africa.',
    },
    {
      name: 'quickLinks',
      type: 'array',
      label: 'Quick Links',
      admin: {
        description: 'Main footer navigation links',
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'label',
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
      name: 'utilityLinks',
      type: 'array',
      label: 'Utility Links',
      admin: {
        description: 'Footer bottom row links (Privacy Policy, Terms, etc.)',
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'label',
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
      name: 'copyrightText',
      type: 'text',
      defaultValue: '© 2025 African Bitcoiners. All rights reserved.',
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
