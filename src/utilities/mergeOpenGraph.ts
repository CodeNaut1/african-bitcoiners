import type { Metadata } from 'next'

import { DEFAULT_OG_IMAGE } from '@/lib/seo-og-images'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Bitcoin education and adoption platform dedicated to building a Bitcoin-friendly Africa.',
  images: [
    {
      url: DEFAULT_OG_IMAGE,
    },
  ],
  siteName: 'African Bitcoiners',
  title: 'African Bitcoiners',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
