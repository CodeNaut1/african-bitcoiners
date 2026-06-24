import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { s3Storage } from '@payloadcms/storage-s3'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { formatDocumentTitle } from '@/utilities/formatMetaTitle'
import { isHomePageSlug } from '@/utilities/homePage'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return formatDocumentTitle({
    metaTitle: doc?.meta?.title,
    pageTitle: doc?.title,
    slug: doc?.slug,
  })
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()
  if (doc?.slug && isHomePageSlug(doc.slug)) return url
  return doc?.slug ? `${url}/${doc.slug}` : url
}

const useR2 = process.env.STORAGE_ADAPTER === 'r2'

export const plugins: Plugin[] = [
  s3Storage({
    collections: {
      media: {
        generateFileURL: ({ filename, prefix }) => {
          const base = (process.env.R2_PUBLIC_URL ?? '').replace(/\/$/, '')
          const filePath = prefix ? `${prefix}/${filename}` : filename
          return `${base}/${filePath}`
        },
      },
    },
    bucket: process.env.R2_BUCKET ?? '',
    config: {
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? '',
      },
      region: 'auto',
    },
    disableLocalStorage: true,
    enabled: useR2,
  }),
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
]
