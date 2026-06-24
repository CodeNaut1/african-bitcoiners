import type { GlobalConfig } from 'payload'
import { adminOnly } from '../access/adminOnly'

export const AdminOpsLog: GlobalConfig = {
  slug: 'admin-ops-log',
  label: 'Admin Operations Log',
  access: {
    read: adminOnly,
    update: adminOnly,
  },
  admin: {
    hidden: true,
  },
  fields: [
    {
      name: 'entries',
      type: 'array',
      maxRows: 100,
      fields: [
        { name: 'timestamp', type: 'date' },
        { name: 'action', type: 'text', required: true },
        { name: 'collection', type: 'text' },
        { name: 'details', type: 'textarea' },
        { name: 'user', type: 'text' },
      ],
    },
  ],
}
