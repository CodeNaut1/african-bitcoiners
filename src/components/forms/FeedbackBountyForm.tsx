'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ABInput, ABSelect, ABTextarea } from '@/components/ui/ab-form-fields'
import { ABButton } from '@/components/ui/ab-button'
import { FormShell } from './FormShell'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { AFRICAN_COUNTRIES } from './africanCountries'

const CATEGORIES = ['Course Content', 'Course Delivery', 'Website', 'Network/Community', 'Suggestion']

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  socialLink: z.string().optional(),
  country: z.string().min(1, 'Country required'),
  feedbackTitle: z.string().min(5, 'Feedback title required'),
  category: z.string().min(1, 'Category required'),
  description: z.string().min(20, 'Please describe your feedback in at least 20 characters'),
  feedbackBefore: z.enum(['yes', 'no']),
  consent: z.literal(true, { errorMap: () => ({ message: 'Consent required' }) }),
  honey: z.string().max(0),
})
type Fields = z.infer<typeof schema>

export function FeedbackBountyForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { honey: '', feedbackBefore: 'no' },
  })
  const { submit, isLoading, isSuccess, errorMsg } = useFormSubmit({ formType: 'feedback-rating', onSuccess: () => reset() })

  return (
    <FormShell
      isSuccess={isSuccess}
      successMessage="Feedback submitted! If approved, 1,000 sats will be sent to your Lightning address within 48 hours."
      errorMsg={errorMsg}
    >
      <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-5">
        <input {...register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />
        <div className="grid sm:grid-cols-2 gap-5">
          <ABInput label="Your Name" placeholder="Amara Diallo" error={errors.name?.message} {...register('name')} />
          <ABInput label="Email (for sats payment)" type="email" placeholder="amara@example.com" error={errors.email?.message} {...register('email')} />
        </div>
        <ABInput label="Lightning Address or Social Link" placeholder="amara@wallet.satoshi.me or twitter.com/amara" {...register('socialLink')} />
        <ABSelect label="Country" error={errors.country?.message} {...register('country')}>
          <option value="">Select your country</option>
          {AFRICAN_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </ABSelect>
        <ABInput label="Feedback Title" placeholder="Broken link on the Bitcoin Whitepaper page" error={errors.feedbackTitle?.message} {...register('feedbackTitle')} />
        <ABSelect label="Category" error={errors.category?.message} {...register('category')}>
          <option value="">Select category</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </ABSelect>
        <ABTextarea label="Description" rows={5} placeholder="Describe what you found or suggest. Be as specific as possible — include the page URL, what the issue is, and what you expected." error={errors.description?.message} {...register('description')} />
        <ABSelect label="Have you submitted feedback before?" error={errors.feedbackBefore?.message} {...register('feedbackBefore')}>
          <option value="no">No, this is my first time</option>
          <option value="yes">Yes, I have submitted before</option>
        </ABSelect>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" {...register('consent')} className="mt-1 h-4 w-4 rounded border-brand-border-light accent-brand-primary" />
          <span className="text-sm text-brand-text-mid">I confirm this is genuine feedback and I have read the bounty rules.</span>
        </label>
        {errors.consent && <p className="text-xs text-red-600">{errors.consent.message}</p>}
        <ABButton type="submit" variant="primary" size="md" disabled={isLoading} className="self-start">
          {isLoading ? 'Submitting…' : 'Submit for 1,000 Sats'}
        </ABButton>
      </form>
    </FormShell>
  )
}
