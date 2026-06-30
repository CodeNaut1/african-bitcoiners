import React from 'react'
import { CheckCircle2 } from 'lucide-react'

import { ConfirmationNpsSection } from '@/components/ConfirmationPage/ConfirmationNpsSection'
import { getFormConfigBySlug } from '@/lib/form-notifications'

type Props = {
  formSlug?: string
}

export async function ConfirmationPageContent({ formSlug }: Props) {
  const formConfig = formSlug ? await getFormConfigBySlug(formSlug) : undefined

  const heading =
    formConfig?.confirmationHeading?.trim() || 'Thank you! Your submission has been received.'

  const description = formConfig?.confirmationDescription?.trim()
  const showNps = Boolean(formConfig?.showNpsFeedback)

  return (
    <div className="min-h-[60vh] bg-brand-cream px-4 py-16 font-body sm:px-6">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-10 w-10 text-green-600" strokeWidth={2} aria-hidden />
        </div>

        <h1 className="font-heading text-3xl font-bold tracking-tight text-brand-secondary sm:text-4xl">
          {heading}
        </h1>

        {description && (
          <p className="mt-4 max-w-lg text-base leading-relaxed text-brand-text-muted sm:text-lg">
            {description}
          </p>
        )}

        {showNps && formSlug && (
          <ConfirmationNpsSection
            formSlug={formSlug}
            formTitle={formConfig?.formTitle?.trim() || formSlug}
          />
        )}
      </div>
    </div>
  )
}
