import type { Block } from 'payload'

export const SupportSectionBlock: Block = {
  slug: 'supportSection',
  interfaceName: 'SupportSectionBlock',
  labels: { singular: 'Support Section', plural: 'Support Sections' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Support Us',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'bulletPoints',
      type: 'array',
      label: 'Why Support Us (bullet points)',
      fields: [
        { name: 'point', type: 'text', required: true },
      ],
    },
    {
      name: 'primaryButtonLabel',
      type: 'text',
      defaultValue: 'Donate Now',
    },
    {
      name: 'primaryButtonUrl',
      type: 'text',
    },
    {
      name: 'secondaryButtonLabel',
      type: 'text',
    },
    {
      name: 'secondaryButtonUrl',
      type: 'text',
    },
    {
      name: 'qrCodeImage',
      type: 'upload',
      relationTo: 'media',
      label: 'QR Code Image (optional)',
    },
    {
      name: 'qrCaption',
      type: 'text',
      label: 'QR Code Caption',
      admin: { description: 'e.g. "Scan to donate Bitcoin"' },
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'cream',
      options: [
        { label: 'Cream', value: 'cream' },
        { label: 'Dark Blue', value: 'dark' },
        { label: 'White', value: 'white' },
      ],
    },
  ],
}
