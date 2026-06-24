import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const RichContentBlock: Block = {
  slug: 'richContent',
  interfaceName: 'RichContentBlock',
  labels: { singular: 'Rich Content', plural: 'Rich Content' },
  fields: [
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: false,
    },
    {
      name: 'sideImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional: image shown to the right of the content' },
    },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'right',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.sideImage),
      },
      options: [
        { label: 'Right', value: 'right' },
        { label: 'Left', value: 'left' },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'white',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Cream', value: 'cream' },
        { label: 'Dark Blue', value: 'dark' },
      ],
    },
    {
      name: 'rawHtml',
      type: 'textarea',
      maxLength: 10000000,
      admin: {
        description:
          'Raw HTML imported from WordPress. Replace with proper rich text content above when ready.',
      },
    },
  ],
}
