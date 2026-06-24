import type { CollectionConfig } from 'payload'
import { adminOrEditor } from '../access/adminOrEditor'
import { anyone } from '../access/anyone'

export const MapLocations: CollectionConfig = {
  slug: 'map-locations',
  access: {
    create: adminOrEditor,
    delete: adminOrEditor,
    read: anyone,
    update: adminOrEditor,
  },
  admin: {
    defaultColumns: ['merchantName', 'category', 'address', 'acceptsLightning'],
    useAsTitle: 'merchantName',
  },
  fields: [
    {
      name: 'merchantName',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'websiteURL',
      type: 'text',
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'acceptsLightning',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Merchant', value: 'merchant' },
        { label: 'Service', value: 'service' },
        { label: 'ATM', value: 'atm' },
      ],
    },
    {
      name: 'latitude',
      type: 'number',
    },
    {
      name: 'longitude',
      type: 'number',
    },
  ],
}
