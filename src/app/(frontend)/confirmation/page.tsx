import type { Metadata } from 'next'
import React from 'react'

import { ConfirmationPageClient } from '@/components/ConfirmationPage/ConfirmationPageClient'
import { getFormConfigBySlug } from '@/lib/form-notifications'

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
  const formConfig = formSlug ? await getFormConfigBySlug(formSlug) : undefined

  const heading =
    formConfig?.confirmationHeading?.trim() || 'Thank you! Your submission has been received.'

  const description = formConfig?.confirmationDescription?.trim()
  const showNps = Boolean(formConfig?.showNpsFeedback)

  return (
    <ConfirmationPageClient
      formSlug={formSlug}
      heading={heading}
      description={description}
      showNps={showNps}
      formTitle={formConfig?.formTitle?.trim() || formSlug}
    />
  )
}
