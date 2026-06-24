import type { GlobalConfig } from 'payload'
import { adminOnly } from '@/access/adminOnly'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header Navigation',
  access: {
    read: () => true,
    update: adminOnly,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Items',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'link',
          options: [
            { label: 'Single Link', value: 'link' },
            { label: 'Dropdown Menu', value: 'dropdown' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'link',
            description: 'URL for single link items',
          },
        },
        {
          name: 'children',
          type: 'array',
          label: 'Dropdown Items',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'dropdown',
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
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
