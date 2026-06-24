import type { CollectionConfig } from 'payload'
import { APIError } from 'payload'

import { adminOnly } from '../../access/adminOnly'
import { authenticated } from '../../access/authenticated'

const ADMIN_EMAILS = [
  'em@bitcoiners.africa',
  'emilyyywellss@gmail.com',
  'megasley@freerouting.africa',
  'lys@bitcoiners.africa',
]

const ALLOWED_DOMAINS = ['bitcoiners.africa', 'freerouting.africa']

function isEmailAllowed(email: string): boolean {
  if (ADMIN_EMAILS.includes(email)) return true
  const domain = email.split('@')[1]
  return Boolean(domain && ALLOWED_DOMAINS.includes(domain))
}

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    // Only authenticated admins can create users — no public registration
    create: adminOnly,
    delete: adminOnly,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
  },
  auth: true,
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if ((operation === 'create' || operation === 'update') && data?.email) {
          if (!isEmailAllowed(data.email as string)) {
            throw new APIError(
              'Only @bitcoiners.africa or @freerouting.africa email addresses are allowed. External email domains are not permitted.',
              400,
              undefined,
              true,
            )
          }
        }
        return data
      },
    ],
    beforeChange: [
      ({ data, operation }) => {
        // Enforce role assignment: whitelist → admin, everyone else → editor
        if ((operation === 'create' || operation === 'update') && data?.email) {
          data.role = ADMIN_EMAILS.includes(data.email as string) ? 'admin' : 'editor'
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Viewer', value: 'viewer' },
      ],
      // Hide from the admin UI for non-admins; hooks enforce the value regardless
      admin: {
        position: 'sidebar',
        condition: (_, __, { user }) => (user as any)?.role === 'admin',
      },
      access: {
        create: ({ req: { user } }) => (user as any)?.role === 'admin',
        read: ({ req: { user } }) => (user as any)?.role === 'admin',
        update: ({ req: { user } }) => (user as any)?.role === 'admin',
      },
    },
  ],
  timestamps: true,
}
