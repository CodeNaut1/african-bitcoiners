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

const schema = z.object({
  organizationName: z.string().min(2, 'Organisation name required'),
  country: z.string().min(1, 'Country required'),
  description: z.string().min(10, 'Description required'),
  website: z.string().url('Valid URL required').optional().or(z.literal('')),
  contactEmail: z.string().email('Valid email required'),
  energySource: z.string().optional(),
  honey: z.string().max(0),
})
type Fields = z.infer<typeof schema>

export function MiningDirectoryForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { honey: '' },
  })
  const { submit, isLoading, isSuccess, errorMsg } = useFormSubmit({ formType: 'mining-directory', onSuccess: () => reset() })

  return (
    <FormShell isSuccess={isSuccess} successMessage="Submission received! Our team will verify and add it to the directory." errorMsg={errorMsg}>
      <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-5">
        <input {...register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />
        <div className="grid sm:grid-cols-2 gap-5">
          <ABInput label="Organisation Name" placeholder="Sahara Mining Co." error={errors.organizationName?.message} {...register('organizationName')} />
          <ABSelect label="Country" error={errors.country?.message} {...register('country')}>
            <option value="">Select country</option>
            {AFRICAN_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </ABSelect>
        </div>
        <ABTextarea label="Description" rows={3} placeholder="Describe the mining operation, scale, and focus areas..." error={errors.description?.message} {...register('description')} />
        <ABInput label="Primary Energy Source (optional)" placeholder="Solar, Hydro, Grid, Stranded Gas..." {...register('energySource')} />
        <div className="grid sm:grid-cols-2 gap-5">
          <ABInput label="Website (optional)" placeholder="https://saharamining.io" error={errors.website?.message} {...register('website')} />
          <ABInput label="Contact Email" type="email" placeholder="info@saharamining.io" error={errors.contactEmail?.message} {...register('contactEmail')} />
        </div>
        <ABButton type="submit" variant="primary" size="md" disabled={isLoading} className="self-start">
          {isLoading ? 'Submitting…' : 'Submit Organisation'}
        </ABButton>
      </form>
    </FormShell>
  )
}
