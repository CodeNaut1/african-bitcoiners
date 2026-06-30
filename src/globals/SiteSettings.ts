import type { GlobalConfig } from 'payload'
import { adminOnly } from '../access/adminOnly'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
    update: adminOnly,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'African Bitcoiners',
      required: true,
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Your Bitcoin Journey Starts Here',
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      defaultValue:
        'African Bitcoiners is a Bitcoin education and adoption platform dedicated to building a Bitcoin-friendly Africa.',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'WhatsApp', value: 'whatsapp' },
            { label: 'Twitter / X', value: 'twitter' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Telegram', value: 'telegram' },
            { label: 'Discord', value: 'discord' },
            { label: 'Nostr', value: 'nostr' },
            { label: 'YouTube', value: 'youtube' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'donationQRImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Donation QR Code Image',
    },
    {
      name: 'donationBTCPayLink',
      type: 'text',
      label: 'Donation BTCPay Link',
    },
    {
      name: 'chatbot',
      type: 'group',
      label: 'Chatbot',
      fields: [
        {
          name: 'chatbotEnabled',
          type: 'checkbox',
          label: 'Enable Chatbot',
          defaultValue: true,
        },
        {
          name: 'chatbotApiUrl',
          type: 'text',
          label: 'Chatbot API URL',
        },
        {
          name: 'chatbotLogUrl',
          type: 'text',
          label: 'Chatbot Log URL',
        },
      ],
    },
    {
      name: 'maintenanceMode',
      type: 'checkbox',
      label: 'Enable Maintenance Mode',
      defaultValue: false,
      admin: {
        description:
          'When enabled, all public pages show a maintenance message. Admin panel remains accessible.',
      },
    },
    {
      name: 'analytics',
      type: 'group',
      label: 'Analytics',
      fields: [
        {
          name: 'analyticsEnabled',
          type: 'checkbox',
          label: 'Enable Analytics',
          defaultValue: true,
        },
        {
          name: 'gtmId',
          type: 'text',
          label: 'Google Tag Manager ID',
          admin: {
            description: 'e.g. GTM-P3M4DLWQ',
          },
        },
        {
          name: 'ga4Id',
          type: 'text',
          label: 'GA4 Measurement ID',
          admin: {
            description: 'e.g. G-XXXXXXXXXX',
          },
        },
      ],
    },
  ],
}
