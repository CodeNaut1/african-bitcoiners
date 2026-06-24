import type { CollectionConfig } from 'payload'
import { adminOrEditor } from '../access/adminOrEditor'
import { anyone } from '../access/anyone'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    create: adminOrEditor,
    delete: adminOrEditor,
    read: anyone,
    update: adminOrEditor,
  },
  admin: {
    defaultColumns: ['name', 'initial', 'avatarColor'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'text',
      type: 'textarea',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'initial',
      type: 'text',
      maxLength: 1,
      admin: {
        description: 'Single character shown in the avatar circle.',
      },
    },
    {
      name: 'avatarColor',
      type: 'text',
      admin: {
        description: 'Hex color code for the avatar background (e.g. #FD5A47).',
      },
    },
  ],
}
