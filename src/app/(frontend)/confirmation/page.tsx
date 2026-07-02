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
  searchParams: Promise<{ type?: string; code?: string; name?: string; lang?: string }>
}

export default async function ConfirmationPage({ searchParams }: Props) {
  const { type, code, name, lang } = await searchParams
  const formSlug = type?.trim() || undefined
  const uniqueCode = code?.trim().toUpperCase() || undefined
  const signupName = name?.trim() || undefined
  const signupLang = lang === 'fr' ? 'fr' : lang === 'en' ? 'en' : undefined
  const formConfig = formSlug ? await getFormConfigBySlug(formSlug) : undefined
  const isTelegramSignup = formSlug ? isTelegramCourseSignupFormSlug(formSlug) : false

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
      uniqueCode={isTelegramSignup ? uniqueCode : undefined}
      signupName={isTelegramSignup ? signupName : undefined}
      signupLang={isTelegramSignup ? signupLang : undefined}
      isTelegramFrench={formSlug === 'course-signup-telegram-french'}
    />
  )
}
