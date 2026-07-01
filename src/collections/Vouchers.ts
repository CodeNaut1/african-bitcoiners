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
    defaultColumns: ['voucherCode', 'sentTo', 'sentDate', 'feedbackBountyId', 'createdAt'],
    listSearchableFields: ['voucherCode', 'sentTo'],
    useAsTitle: 'voucherCode',
    description:
      'LNURL voucher codes for the 1000 Sats Feedback Bounty reward. Paste codes manually or bulk import. Filter unsent vouchers by searching for empty "Sent To".',
  },
  fields: [
    {
      name: 'voucherCode',
      type: 'text',
      required: true,
      unique: true,
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
    {
      name: 'feedbackBountyId',
      type: 'relationship',
      relationTo: 'feedback-bounties',
      admin: {
        description: 'The feedback bounty this voucher was assigned to.',
      },
    },
  ],
}
