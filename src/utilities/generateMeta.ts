import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { resolveOgImage } from '@/lib/seo-og-images'

import { formatDocumentTitle, fullPageTitle } from './formatMetaTitle'
import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { isHomePageSlug, pathForPageSlug } from './homePage'

function resolveMediaUrl(rawUrl: string | null | undefined, serverUrl: string): string | null {
  if (!rawUrl) return null
  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) return rawUrl
  return `${serverUrl}${rawUrl.startsWith('/') ? rawUrl : `/${rawUrl}`}`
}

const getImageURL = (
  image: Media | Config['db']['defaultIDType'] | null | undefined,
  slug: string,
) => {
  const serverUrl = getServerSideURL()

  if (image && typeof image === 'object' && 'url' in image && image.url) {
    const rawUrl = image.sizes?.og?.url ?? image.url
    const mediaUrl = resolveMediaUrl(rawUrl, serverUrl)

    if (mediaUrl && !mediaUrl.includes('website-template-OG')) {
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

  const description = doc?.meta?.description ?? undefined
  const canonicalPath = url ?? pathForPageSlug(slugPath)
  const canonicalUrl = `${serverUrl}${canonicalPath}`
  const ogTitle = fullPageTitle(plainTitle)

  return {
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: mergeOpenGraph({
      description: description ?? '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title: ogTitle,
      url: canonicalUrl,
    }),
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: description ?? '',
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    title: isHome ? { absolute: plainTitle } : plainTitle,
  }
}
