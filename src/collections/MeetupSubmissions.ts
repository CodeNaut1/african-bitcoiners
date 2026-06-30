import type { CollectionConfig } from 'payload'
import { adminOrEditor } from '../access/adminOrEditor'
import { authenticated } from '../access/authenticated'

export const MeetupSubmissions: CollectionConfig = {
  slug: 'meetup-submissions',
  access: {
    // Public can create (submit form), admin/editor can manage
    create: () => true,
    delete: adminOrEditor,
    read: authenticated,
    update: adminOrEditor,
  },
  admin: {
    defaultColumns: ['meetupName', 'location', 'startDate', 'status', 'createdAt', 'updatedAt'],
    listSearchableFields: ['meetupName', 'location', 'contactEmail'],
    useAsTitle: 'meetupName',
  },
  fields: [
    {
      name: 'meetupName',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'startDate',
      type: 'date',
      admin: { position: 'sidebar' },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: { position: 'sidebar' },
    },
    {
      name: 'time',
      type: 'text',
    },
    {
      name: 'contactName',
      type: 'text',
    },
    {
      name: 'contactEmail',
      type: 'email',
    },
    {
      name: 'flyerImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
