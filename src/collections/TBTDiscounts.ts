import type { CollectionConfig } from 'payload'
import { adminOnly } from '../access/adminOnly'

export const TBTDiscounts: CollectionConfig = {
  slug: 'tbt-discounts',
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: adminOnly,
    update: adminOnly,
  },
  admin: {
    defaultColumns: ['discountCode', 'usedByEmail', 'createdAt'],
    listSearchableFields: ['discountCode', 'usedByEmail'],
    useAsTitle: 'discountCode',
    description:
      'The Bitcoiner Test discount codes for BFB course graduates (basic tier). Assign automatically on course completion.',
  },
  fields: [
    {
      name: 'discountCode',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Format: BT-XXXXXXX',
      },
    },
    {
      name: 'usedByEmail',
      type: 'email',
      admin: {
        description: 'Populated when the code is assigned to a graduate.',
      },
    },
  ],
}
