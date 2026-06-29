import type { Metadata } from 'next'
import React from 'react'

import { LearnBitcoinPage } from '@/components/LearnBitcoinPage'
import { SEO } from '@/components/LearnBitcoinPage/data'

export const revalidate = 600

export default function LearnBitcoinRoutePage() {
  return <LearnBitcoinPage />
}

export function generateMetadata(): Metadata {
  return {
    title: SEO.title,
    description: SEO.description,
    alternates: { canonical: '/learn-bitcoin' },
  }
}
