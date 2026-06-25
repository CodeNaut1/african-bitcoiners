'use client'

import React from 'react'

import { ContactForm } from '@/components/forms/ContactForm'
import { CourseSignupForm } from '@/components/forms/CourseSignupForm'
import { DonationForm } from '@/components/forms/DonationForm'
import { FeedbackBountyForm } from '@/components/forms/FeedbackBountyForm'
import { NewsletterSignupForm } from '@/components/forms/NewsletterSignupForm'

const FORM_MAP: Record<string, React.ComponentType> = {
  'newsletter-signup': NewsletterSignupForm,
  contact: ContactForm,
  'feedback-bounty': FeedbackBountyForm,
  'course-signup': CourseSignupForm,
  donation: DonationForm,
}

export function FormPlaceholder({ formType }: { formType: string }) {
  const FormComponent = FORM_MAP[formType]

  if (FormComponent) {
    return (
      <div className="my-8 not-prose">
        <FormComponent />
      </div>
    )
  }

  return (
    <div className="my-8 rounded-card border border-dashed border-brand-border-light bg-brand-cream/50 px-6 py-8 text-center not-prose">
      <p className="text-sm font-medium text-brand-text-mid">Form coming soon</p>
    </div>
  )
}
