import type { Block } from 'payload'
import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

export const MissionStatementsBlock: Block = {
  slug: 'missionStatements',
  interfaceName: 'MissionStatementsBlock',
  labels: { singular: 'Mission Statements', plural: 'Mission Statements' },
  fields: [
    {
      name: 'statements',
      type: 'array',
      required: true,
      fields: [
        { name: 'eyebrow', type: 'text' },
        {
          name: 'heading',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
          admin: { description: 'Use bold/italic to highlight key words in orange' },
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'textColor',
          type: 'select',
          defaultValue: 'dark',
          options: [
            { label: 'Dark (on light bg)', value: 'dark' },
            { label: 'White (on dark/image bg)', value: 'white' },
            { label: 'Orange accent', value: 'orange' },
          ],
        },
      ],
    },
    {
      name: 'spacing',
      type: 'select',
      defaultValue: 'large',
      options: [
        { label: 'Large (default)', value: 'large' },
        { label: 'Medium', value: 'medium' },
        { label: 'Compact', value: 'compact' },
      ],
    },
  ],
}
