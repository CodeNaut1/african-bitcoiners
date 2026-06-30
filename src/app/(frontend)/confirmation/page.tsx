import type { Metadata } from 'next'
import React from 'react'

import { ConfirmationPageContent } from '@/components/ConfirmationPage'

export const metadata: Metadata = {
  title: 'Thank You',
  robots: { index: false, follow: false },
}

type Props = {
  searchParams: Promise<{ type?: string }>
}

export default async function ConfirmationPage({ searchParams }: Props) {
  const { type } = await searchParams
  const formSlug = type?.trim() || undefined

  return <ConfirmationPageContent formSlug={formSlug} />
}
