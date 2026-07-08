import type { Metadata } from 'next'
import React from 'react'

import { LearnBitcoinPage } from '@/components/LearnBitcoinPage'
import { getPageSeo } from '@/lib/seo-page-data'
import { buildStaticPageMetadata } from '@/utilities/buildStaticPageMetadata'

export const revalidate = 600

export default function LearnBitcoinRoutePage() {
  return <LearnBitcoinPage />
}

export function generateMetadata(): Metadata {
  const seo = getPageSeo('learn-bitcoin')!
  return buildStaticPageMetadata({ ...seo, path: '/learn-bitcoin', slug: 'learn-bitcoin' })
}
