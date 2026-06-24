'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ABInput, ABSelect } from '@/components/ui/ab-form-fields'
import { ABButton } from '@/components/ui/ab-button'
import { FormShell } from './FormShell'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { AFRICAN_COUNTRIES } from './africanCountries'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  weeklySats: z.coerce.number().min(1000, 'Minimum 1,000 sats per week'),
  country: z.string().min(1, 'Please select your country'),
  newsletterConsent: z.boolean().optional(),
  honey: z.string().max(0),
})
type Fields = z.infer<typeof schema>

export function SavingsChallengeForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { honey: '', newsletterConsent: false },
  })
  const { submit, isLoading, isSuccess, errorMsg } = useFormSubmit({ formType: 'savings-challenge', onSuccess: () => reset() })

  return (
    <FormShell isSuccess={isSuccess} successMessage="Welcome to the Million Sat Challenge! Check your inbox for next steps." errorMsg={errorMsg}>
      <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-5">
        <input {...register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />
        <ABInput label="Your Name" placeholder="Amara Diallo" error={errors.name?.message} {...register('name')} />
        <ABInput label="Email Address" type="email" placeholder="amara@example.com" error={errors.email?.message} {...register('email')} />
        <ABInput label="Weekly Sats Savings Target" type="number" placeholder="10000" error={errors.weeklySats?.message} {...register('weeklySats')} />
        <ABSelect label="Country" error={errors.country?.message} {...register('country')}>
          <option value="">Select your country</option>
          {AFRICAN_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </ABSelect>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" {...register('newsletterConsent')} className="mt-1 h-4 w-4 rounded border-brand-border-light accent-brand-primary" />
          <span className="text-sm text-brand-text-mid">Also subscribe me to the weekly Bitcoin newsletter</span>
        </label>
        <ABButton type="submit" variant="primary" size="md" disabled={isLoading} className="self-start">
          {isLoading ? 'Joining…' : 'Join the Challenge'}
        </ABButton>
      </form>
    </FormShell>
  )
}
