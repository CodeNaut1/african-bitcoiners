import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { resolveOgImage } from '@/lib/seo-og-images'

import { formatDocumentTitle, fullPageTitle, SITE_NAME } from './formatMetaTitle'
import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { isHomePageSlug, pathForPageSlug } from './homePage'

const getImageURL = (
  image: Media | Config['db']['defaultIDType'] | null | undefined,
  slug: string,
) => {
  const serverUrl = getServerSideURL()

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url
    const mediaUrl = ogUrl ? serverUrl + ogUrl : serverUrl + image.url

    if (!mediaUrl.includes('website-template-OG')) {
      return mediaUrl
    }
  }

  return resolveOgImage(slug)
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
  url?: string
}): Promise<Metadata> => {
  const { doc, url } = args

  const serverUrl = getServerSideURL()
  const slugPath = Array.isArray(doc?.slug) ? doc?.slug.join('/') : (doc?.slug ?? '/')
  const ogImage = getImageURL(doc?.meta?.image, slugPath)
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
