import type { GlobalConfig } from 'payload'
import { adminOnly } from '../access/adminOnly'

export const ActiveCampaignSettings: GlobalConfig = {
  slug: 'ac-settings',
  label: 'ActiveCampaign Settings',
  access: {
    read: adminOnly,
    update: adminOnly,
  },
  admin: {
    description: 'Map each form submission type to an ActiveCampaign list. Every contact is also added to the "master" list regardless of which form they use.',
  },
  fields: [
    {
      // Renders a "Fetch Lists" helper panel above the array
      name: 'acListsFetcher',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/admin/ActiveCampaignListFetcher#default',
        },
      },
    },
    {
      name: 'listMappings',
      type: 'array',
      label: 'Form → ActiveCampaign List Mappings',
      admin: {
        description: 'Each row maps a form submission type to one or more ActiveCampaign list names. The "master" entry defines secondary lists every contact is always added to.',
      },
      fields: [
        {
          name: 'formSlug',
          type: 'text',
          required: true,
          admin: {
            description: 'Which form triggers this sync',
            components: {
              Field: '@/components/admin/FormSlugSelect#default',
            },
          },
        },
        {
          name: 'listNames',
          type: 'array',
          label: 'ActiveCampaign List Names',
          required: true,
          minRows: 1,
          labels: {
            singular: 'List',
            plural: 'Lists',
          },
          admin: {
            description: 'One or more exact ActiveCampaign list names for this form (case-sensitive — use "Fetch Lists" above to verify)',
            initCollapsed: false,
          },
          fields: [
            {
              name: 'listName',
              type: 'text',
              required: true,
              admin: {
                description: 'Exact ActiveCampaign list name',
              },
            },
          ],
        },
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Enabled',
          defaultValue: true,
        },
      ],
    },
  ],
}
