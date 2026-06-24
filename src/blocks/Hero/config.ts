import type { Block } from 'payload'
import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { linkGroup } from '@/fields/linkGroup'

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'text-left-image-right',
      options: [
        { label: 'Text Left, Image Right', value: 'text-left-image-right' },
        { label: 'Centered', value: 'centered' },
        { label: 'Text Overlay on Image', value: 'text-overlay' },
      ],
    },
    {
      name: 'eyebrow',
      type: 'text',
      admin: { description: 'Small label above the heading (optional)' },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'subheading',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: 'Subheading / Body Text',
    },
    linkGroup({ appearances: ['default', 'outline'], overrides: { maxRows: 2 } }),
    {
      name: 'backgroundType',
      type: 'select',
      defaultValue: 'cream',
      options: [
        { label: 'Cream', value: 'cream' },
        { label: 'Orange', value: 'orange' },
        { label: 'Dark Blue', value: 'dark' },
        { label: 'White', value: 'white' },
        { label: 'Image', value: 'image' },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.backgroundType === 'image',
        description: 'Used when background type is "Image"',
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Hero Images (collage / right-side panel)',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'alt', type: 'text' },
      ],
    },
  ],
}
