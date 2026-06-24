import type { GlobalConfig } from 'payload'
import { adminOnly } from '../access/adminOnly'

export const GoogleSheetsSettings: GlobalConfig = {
  slug: 'gsheets-settings',
  label: 'Google Sheets Settings',
  access: {
    read: adminOnly,
    update: adminOnly,
  },
  admin: {
    description:
      'Map each form type to a Google Sheet. EM will fill in the spreadsheet IDs once the sheets are ready. Leave empty to disable Sheets sync for that form.',
  },
  fields: [
    {
      name: 'sheetMappings',
      type: 'array',
      label: 'Form → Google Sheet Mappings',
      fields: [
        {
          name: 'formSlug',
          type: 'text',
          required: true,
          admin: {
            description:
              'Form identifier (e.g. feedback-bounty, bfb-day-1-feedback, nps-general, volunteers, graduate-programme)',
          },
        },
        {
          name: 'spreadsheetId',
          type: 'text',
          required: true,
          admin: {
            description: 'Google Sheet ID — the long alphanumeric part of the sheet URL',
          },
        },
        {
          name: 'sheetName',
          type: 'text',
          defaultValue: 'Sheet1',
          admin: {
            description: 'Tab name within the spreadsheet (usually "Sheet1")',
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
  ],
}
