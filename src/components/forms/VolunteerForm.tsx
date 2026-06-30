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
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  country: z.string().min(1, 'Country required'),
  skills: z.string().min(10, 'Please describe your skills'),
  availability: z.enum(['full-time', 'part-time', 'weekends', 'occasional']),
  consent: z.literal(true, { errorMap: () => ({ message: 'Consent is required' }) }),
  honey: z.string().max(0),
})
type Fields = z.infer<typeof schema>

export function VolunteerForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { honey: '', availability: 'part-time' },
  })
  const { submit, isLoading, isSuccess, errorMsg, successMessage } = useFormSubmit({ formType: 'volunteer', formSlug: 'volunteer', onSuccess: () => reset() })

  return (
    <FormShell isSuccess={isSuccess} successMessage={successMessage} errorMsg={errorMsg}>
      <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-5">
        <input {...register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />
        <div className="grid sm:grid-cols-2 gap-5">
          <ABInput label="Your Name" placeholder="Amara Diallo" error={errors.name?.message} {...register('name')} />
          <ABInput label="Email Address" type="email" placeholder="amara@example.com" error={errors.email?.message} {...register('email')} />
        </div>
        <ABSelect label="Country" error={errors.country?.message} {...register('country')}>
          <option value="">Select your country</option>
          {AFRICAN_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </ABSelect>
        <ABTextarea label="Skills & Background" rows={4} placeholder="Tell us what you can bring — writing, translation, design, development, community management, teaching..." error={errors.skills?.message} {...register('skills')} />
        <ABSelect label="Availability" error={errors.availability?.message} {...register('availability')}>
          <option value="full-time">Full-time (30+ hrs/week)</option>
          <option value="part-time">Part-time (10–20 hrs/week)</option>
          <option value="weekends">Weekends only</option>
          <option value="occasional">Occasional / project-based</option>
        </ABSelect>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" {...register('consent')} className="mt-1 h-4 w-4 rounded border-brand-border-light accent-brand-primary" />
          <span className="text-sm text-brand-text-mid">I understand volunteering is unpaid but I may be compensated in sats for contributions.</span>
        </label>
        {errors.consent && <p className="text-xs text-red-600">{errors.consent.message}</p>}
        <ABButton type="submit" variant="primary" size="md" disabled={isLoading} className="self-start">
          {isLoading ? 'Submitting…' : 'Volunteer Now'}
        </ABButton>
      </form>
    </FormShell>
  )
}
