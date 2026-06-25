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
      // NOTE: the stored values are kept stable ('text-left-image-right' = Split,
      // 'text-overlay' = Background) so we don't need a DB enum migration. The component
      // normalizes them onto the split / background / centered model.
      defaultValue: 'text-left-image-right',
      admin: {
        description:
          'Split = text + image side by side on a solid background (defaults to cream). Background = full-width background image with the text overlaid on a dark left→right gradient.',
      },
      options: [
        { label: 'Split — text + image (cream background)', value: 'text-left-image-right' },
        { label: 'Background image + dark overlay', value: 'text-overlay' },
        { label: 'Centered', value: 'centered' },
      ],
    },
    {
      name: 'eyebrow',
      type: 'text',
      admin: { description: 'Small label above the heading (optional)' },
    },
    {
      name: 'eyebrowUrl',
      type: 'text',
      admin: {
        description: 'Optional link URL for the eyebrow label (e.g. https://bitcoinnews.africa/)',
      },
    },
    {
      name: 'eyebrowNewTab',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.eyebrowUrl),
        description: 'Open eyebrow link in a new tab',
      },
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
        condition: (_, siblingData) =>
          siblingData?.backgroundType === 'image' || siblingData?.layout === 'text-overlay',
        description: 'Used for the "Background image + dark overlay" layout (or "Image" background type).',
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
