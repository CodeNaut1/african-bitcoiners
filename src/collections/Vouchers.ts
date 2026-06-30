import type { CollectionConfig } from 'payload'
import { adminOnly } from '../access/adminOnly'

export const Vouchers: CollectionConfig = {
  slug: 'vouchers',
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: adminOnly,
    update: adminOnly,
  },
  admin: {
    defaultColumns: ['voucherCode', 'sentTo', 'sentDate', 'createdAt', 'updatedAt'],
    listSearchableFields: ['voucherCode', 'sentTo'],
    useAsTitle: 'voucherCode',
    description: 'LNURL voucher codes for the 1000 Sats Feedback Bounty reward.',
  },
  fields: [
    {
      name: 'voucherCode',
      type: 'text',
      required: true,
    },
    {
      name: 'sentTo',
      type: 'email',
      admin: {
        description: 'Email address the voucher was sent to.',
      },
    },
    {
      name: 'sentDate',
      type: 'date',
      admin: { position: 'sidebar' },
    },
  ],
}
