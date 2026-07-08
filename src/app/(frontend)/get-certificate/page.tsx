import React from 'react'
import type { Metadata } from 'next'

import { GetCertificatePage } from '@/components/GetCertificatePage'
import { getPageSeo } from '@/lib/seo-page-data'
import { buildStaticPageMetadata } from '@/utilities/buildStaticPageMetadata'

export function generateMetadata(): Metadata {
  const seo = getPageSeo('get-certificate')!
  return buildStaticPageMetadata({ ...seo, path: '/get-certificate' })
}

export default function Page() {
  return <GetCertificatePage />
}
