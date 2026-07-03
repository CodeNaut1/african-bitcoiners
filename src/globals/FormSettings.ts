import type { GlobalConfig } from 'payload'
import { adminOnly } from '../access/adminOnly'
import { FORM_SETTINGS_SLUG_OPTIONS } from '@/lib/form-slug-options'

const TEAM_EMAIL_GROUP_OPTIONS = [
  { label: 'Community', value: 'community' },
  { label: 'General', value: 'general' },
  { label: 'Sensitive', value: 'sensitive' },
  { label: 'Test', value: 'test' },
]

export const FormSettings: GlobalConfig = {
  slug: 'form-settings',
  label: 'Form Settings',
  access: {
    read: adminOnly,
    update: adminOnly,
  },
  admin: {
    description:
      'Configure confirmation pages and email notifications for each site form — no code changes required.',
  },
  fields: [
    {
      name: 'forms',
      type: 'array',
      label: 'Forms',
      admin: {
        initCollapsed: false,
        components: {
          RowLabel: '@/globals/FormSettingsRowLabel#FormSettingsRowLabel',
        },
      },
      fields: [
        {
          type: 'collapsible',
          label: 'Identity',
          admin: { initCollapsed: false },
          fields: [
            {
              name: 'formSlug',
              type: 'select',
              required: true,
              options: [...FORM_SETTINGS_SLUG_OPTIONS],
              admin: {
                description: 'Which form this configuration applies to',
              },
            },
            {
              name: 'formTitle',
              type: 'text',
              required: true,
              admin: {
                description: 'Human-readable name shown in admin and emails',
              },
            },
            {
              name: 'enabled',
              type: 'checkbox',
              label: 'Enabled',
              defaultValue: true,
            },
          ],
        },
        {
          type: 'collapsible',
          label: 'Confirmation',
          fields: [
            {
              name: 'confirmationHeading',
              type: 'text',
              admin: { description: 'Heading on the confirmation page' },
            },
            {
              name: 'confirmationDescription',
              type: 'textarea',
              admin: { description: 'Description text below the heading' },
            },
            {
              name: 'showNpsFeedback',
              type: 'checkbox',
              label: 'Show NPS feedback on confirmation page',
              defaultValue: false,
            },
            {
              name: 'redirectToConfirmation',
              type: 'checkbox',
              label: 'Redirect to confirmation page after submit',
              defaultValue: true,
              admin: {
                description: 'If unchecked, forms show an inline success message instead',
              },
            },
          ],
        },
        {
          type: 'collapsible',
          label: 'Team Notification',
          fields: [
            {
              name: 'teamNotificationEnabled',
              type: 'checkbox',
              label: 'Send team notification email',
              defaultValue: true,
            },
            {
              name: 'teamEmailGroup',
              type: 'select',
              label: 'Team email group',
              options: TEAM_EMAIL_GROUP_OPTIONS,
              defaultValue: 'general',
              admin: {
                description: 'Maps to EMAIL_GROUP_* env vars (community, general, sensitive, test)',
              },
            },
            {
              name: 'teamNotificationSubjectTemplate',
              type: 'text',
              label: 'Subject template',
              defaultValue: 'New Entry: {{form_title}}',
              admin: {
                description: 'Supports {{form_title}} placeholder',
              },
            },
            {
              name: 'teamNotificationBodyTemplate',
              type: 'textarea',
              label: 'Body template (HTML)',
              admin: {
                description:
                  'Optional custom HTML body. Leave empty to auto-format all submitted fields in a Gravity Forms-style table.',
              },
            },
          ],
        },
        {
          type: 'collapsible',
          label: 'User Notification',
          fields: [
            {
              name: 'userNotificationEnabled',
              type: 'checkbox',
              label: 'Send confirmation email to submitter',
              defaultValue: false,
            },
            {
              name: 'userNotificationSubjectTemplate',
              type: 'text',
              label: 'Subject template',
              admin: {
                description: 'Supports {{name}} placeholder',
              },
            },
            {
              name: 'userNotificationBodyTemplate',
              type: 'textarea',
              label: 'Body template (HTML)',
              admin: {
                description: 'Supports {{name}} and {{email}} placeholders. HTML allowed.',
              },
            },
            {
              name: 'userNotificationFromName',
              type: 'text',
              label: 'From name',
              defaultValue: 'African Bitcoiners',
            },
          ],
        },
      ],
    },
  ],
}
