import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { formatDocumentTitle, fullPageTitle, SITE_NAME } from './formatMetaTitle'
import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { isHomePageSlug, pathForPageSlug } from './homePage'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
  url?: string
}): Promise<Metadata> => {
  const { doc, url } = args

  const serverUrl = getServerSideURL()
  const ogImage = getImageURL(doc?.meta?.image)

  const slugPath = Array.isArray(doc?.slug) ? doc?.slug.join('/') : (doc?.slug ?? '/')
  const isHome = isHomePageSlug(slugPath)

  const plainTitle = formatDocumentTitle({
    metaTitle: doc?.meta?.title,
    pageTitle: doc?.title,
    slug: slugPath,
  })

  const canonicalPath = url ?? pathForPageSlug(slugPath)
  const canonicalUrl = `${serverUrl}${canonicalPath}`

  return {
    description: doc?.meta?.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title: fullPageTitle(plainTitle),
      url: canonicalUrl,
    }),
    title: isHome ? { absolute: SITE_NAME } : plainTitle,
  }
}
