import type { CollectionBeforeValidateHook, CollectionConfig } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { adminOrEditor } from '../access/adminOrEditor'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const MAX_FILE_SIZE = 1048576

const beforeValidate: CollectionBeforeValidateHook = ({ data, req }) => {
  const file = req.file
  if (file?.size && file.size > MAX_FILE_SIZE) {
    throw new Error('File size must be under 1MB')
  }
  return data
}

export const Media: CollectionConfig = {
  slug: 'media',
  folders: true,
  access: {
    create: adminOrEditor,
    delete: adminOrEditor,
    read: anyone,
    update: adminOrEditor,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
  ],
  hooks: {
    beforeValidate: [beforeValidate],
  },
  upload: {
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        crop: 'center',
      },
      {
        name: 'card',
        width: 600,
        height: 400,
        crop: 'center',
      },
      {
        name: 'hero',
        width: 1200,
        height: 600,
        crop: 'center',
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
