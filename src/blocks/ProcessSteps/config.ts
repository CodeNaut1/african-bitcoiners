import type { Block } from 'payload'
import { FixedToolbarFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

export const ProcessStepsBlock: Block = {
  slug: 'processSteps',
  interfaceName: 'ProcessStepsBlock',
  labels: { singular: 'Process Steps', plural: 'Process Steps' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    { name: 'subheading', type: 'text' },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'numbered',
      options: [
        { label: 'Numbered cascade', value: 'numbered' },
        { label: 'Horizontal steps', value: 'horizontal' },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'cream',
      options: [
        { label: 'Cream', value: 'cream' },
        { label: 'White', value: 'white' },
        { label: 'Dark Blue', value: 'dark' },
      ],
    },
    {
      name: 'steps',
      type: 'array',
      required: true,
      fields: [
        { name: 'number', type: 'number', required: true },
        { name: 'title', type: 'text', required: true },
        {
          name: 'description',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
        { name: 'linkText', type: 'text' },
        { name: 'linkURL', type: 'text' },
      ],
    },
  ],
}
