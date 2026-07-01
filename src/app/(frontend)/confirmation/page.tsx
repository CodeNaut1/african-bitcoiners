import type { Metadata } from 'next'
import React from 'react'

import { ConfirmationPageClient } from '@/components/ConfirmationPage/ConfirmationPageClient'
import { getFormConfigBySlug } from '@/lib/form-notifications'
import { isTelegramCourseSignupFormSlug } from '@/lib/course-signup-shared'

export const metadata: Metadata = {
  title: 'Thank You',
  robots: { index: false, follow: false },
}

type Props = {
  searchParams: Promise<{ type?: string; code?: string }>
}

export default async function ConfirmationPage({ searchParams }: Props) {
  const { type, code } = await searchParams
  const formSlug = type?.trim() || undefined
  const telegramCode = code?.trim().toUpperCase() || undefined
  const formConfig = formSlug ? await getFormConfigBySlug(formSlug) : undefined
  const isTelegramSignup = formSlug ? isTelegramCourseSignupFormSlug(formSlug) : false

  const heading =
    formConfig?.confirmationHeading?.trim() || 'Thank you! Your submission has been received.'

  const description = formConfig?.confirmationDescription?.trim()
  const showNps = !isTelegramSignup && Boolean(formConfig?.showNpsFeedback)

  return (
    <ConfirmationPageClient
      formSlug={formSlug}
      heading={heading}
      description={description}
      showNps={showNps}
      formTitle={formConfig?.formTitle?.trim() || formSlug}
      telegramCode={isTelegramSignup ? telegramCode : undefined}
      isTelegramFrench={formSlug === 'course-signup-telegram-french'}
    />
  )
}
