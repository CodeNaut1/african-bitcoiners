import type { Metadata } from 'next'

import { resolveOgImage } from '@/lib/seo-og-images'
import { fullPageTitle } from './formatMetaTitle'
import { getServerSideURL } from './getURL'
import { mergeOpenGraph } from './mergeOpenGraph'

export function buildStaticPageMetadata(options: {
  title: string
  description: string
  path: string
  imageUrl?: string
  ogImage?: string
  slug?: string
}): Metadata {
  const { title, description, path, imageUrl, ogImage, slug } = options
  const canonical = path.startsWith('/') ? path : `/${path}`
  const url = `${getServerSideURL()}${canonical}`
  const resolvedSlug = slug ?? canonical.replace(/^\//, '')
  const ogImageUrl = resolveOgImage(resolvedSlug, ogImage ?? imageUrl)

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: mergeOpenGraph({
      title: fullPageTitle(title),
      description,
      url,
      images: [{ url: ogImageUrl }],
    }),
    twitter: {
      card: 'summary_large_image',
      title: fullPageTitle(title),
      description,
      images: [ogImageUrl],
    },
  }
}
