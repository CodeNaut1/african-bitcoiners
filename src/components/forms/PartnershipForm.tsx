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

const ORG_TYPES = ['University / School', 'NGO / Charity', 'Bitcoin Company', 'Government', 'Community Group', 'Media / Content', 'Other']

const schema = z.object({
  organizationName: z.string().min(2, 'Organisation name required'),
  organizationType: z.string().min(1, 'Organisation type required'),
  country: z.string().min(1, 'Country required'),
  contactName: z.string().min(2, 'Contact name required'),
  contactEmail: z.string().email('Valid email required'),
  website: z.string().url('Valid website URL required').optional().or(z.literal('')),
  tier: z.enum(['basic', 'advanced', 'premium']),
  description: z.string().min(20, 'Please describe your partnership goals'),
  honey: z.string().max(0),
})
type Fields = z.infer<typeof schema>

export function PartnershipForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { honey: '', tier: 'advanced' },
  })
  const { submit, isLoading, isSuccess, errorMsg } = useFormSubmit({ formType: 'partnership-inquiry', onSuccess: () => reset() })

  return (
    <FormShell isSuccess={isSuccess} successMessage="Application received! Our partnerships team will be in touch within 48 hours." errorMsg={errorMsg}>
      <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-5">
        <input {...register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />
        <div className="grid sm:grid-cols-2 gap-5">
          <ABInput label="Organisation Name" placeholder="University of Nairobi" error={errors.organizationName?.message} {...register('organizationName')} />
          <ABSelect label="Organisation Type" error={errors.organizationType?.message} {...register('organizationType')}>
            <option value="">Select type</option>
            {ORG_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </ABSelect>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <ABSelect label="Country" error={errors.country?.message} {...register('country')}>
            <option value="">Select country</option>
            {AFRICAN_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </ABSelect>
          <ABInput label="Website (optional)" placeholder="https://uon.ac.ke" error={errors.website?.message} {...register('website')} />
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <ABInput label="Contact Name" placeholder="Dr. Amara Osei" error={errors.contactName?.message} {...register('contactName')} />
          <ABInput label="Contact Email" type="email" placeholder="partnerships@uon.ac.ke" error={errors.contactEmail?.message} {...register('contactEmail')} />
        </div>
        <ABSelect label="Partnership Tier" error={errors.tier?.message} {...register('tier')}>
          <option value="basic">Basic — Free</option>
          <option value="advanced">Advanced — 500,000 sats/month</option>
          <option value="premium">Premium — 1,000,000 sats/month</option>
        </ABSelect>
        <ABTextarea label="Tell us about your goals" rows={4} placeholder="Describe how you'd like to partner with African Bitcoiners and what outcomes you're hoping for..." error={errors.description?.message} {...register('description')} />
        <ABButton type="submit" variant="primary" size="md" disabled={isLoading} className="self-start">
          {isLoading ? 'Submitting…' : 'Apply for Partnership'}
        </ABButton>
      </form>
    </FormShell>
  )
}
