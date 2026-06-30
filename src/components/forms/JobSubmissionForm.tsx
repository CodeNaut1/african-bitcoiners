'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ABInput, ABSelect, ABTextarea } from '@/components/ui/ab-form-fields'
import { ABButton } from '@/components/ui/ab-button'
import { FormShell } from './FormShell'
import { useFormSubmit } from '@/hooks/useFormSubmit'

const schema = z.object({
  companyName: z.string().min(2, 'Company name required'),
  companyDescription: z.string().min(10, 'Brief company description required'),
  website: z.string().url('Valid website URL required'),
  contactName: z.string().min(2, 'Contact name required'),
  contactEmail: z.string().email('Valid email required'),
  jobTitle: z.string().min(2, 'Job title required'),
  jobType: z.enum(['full-time', 'part-time', 'contract', 'volunteer']),
  location: z.string().min(2, 'Location required'),
  description: z.string().min(30, 'Job description must be at least 30 characters'),
  bitcoinConsent: z.literal(true, { errorMap: () => ({ message: 'Bitcoin verification consent is required' }) }),
  honey: z.string().max(0),
})
type Fields = z.infer<typeof schema>

export function JobSubmissionForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { honey: '', jobType: 'full-time' },
  })
  const { submit, isLoading, isSuccess, errorMsg, successMessage } = useFormSubmit({ formType: 'job-submission', formSlug: 'job-submission', onSuccess: () => reset() })

  return (
    <FormShell isSuccess={isSuccess} successMessage={successMessage} errorMsg={errorMsg}>
      <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-5">
        <input {...register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />
        <div className="grid sm:grid-cols-2 gap-5">
          <ABInput label="Company Name" placeholder="Bitcoin Africa Ltd" error={errors.companyName?.message} {...register('companyName')} />
          <ABInput label="Company Website" placeholder="https://example.com" error={errors.website?.message} {...register('website')} />
        </div>
        <ABTextarea label="Company Description" rows={2} placeholder="Brief description of your company..." error={errors.companyDescription?.message} {...register('companyDescription')} />
        <div className="grid sm:grid-cols-2 gap-5">
          <ABInput label="Contact Name" placeholder="Amara Diallo" error={errors.contactName?.message} {...register('contactName')} />
          <ABInput label="Contact Email" type="email" placeholder="hr@example.com" error={errors.contactEmail?.message} {...register('contactEmail')} />
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <ABInput label="Job Title" placeholder="Bitcoin Developer" error={errors.jobTitle?.message} {...register('jobTitle')} />
          <ABSelect label="Job Type" error={errors.jobType?.message} {...register('jobType')}>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="volunteer">Volunteer</option>
          </ABSelect>
        </div>
        <ABInput label="Location" placeholder="Lagos, Nigeria (Remote OK)" error={errors.location?.message} {...register('location')} />
        <ABTextarea label="Job Description" rows={6} placeholder="Describe the role, responsibilities, requirements, and compensation..." error={errors.description?.message} {...register('description')} />
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" {...register('bitcoinConsent')} className="mt-1 h-4 w-4 rounded border-brand-border-light accent-brand-primary" />
          <span className="text-sm text-brand-text-mid">I confirm that this position pays in Bitcoin or is Bitcoin-related.</span>
        </label>
        {errors.bitcoinConsent && <p className="text-xs text-red-600">{errors.bitcoinConsent.message}</p>}
        <ABButton type="submit" variant="primary" size="md" disabled={isLoading} className="self-start">
          {isLoading ? 'Submitting…' : 'Submit Job Listing'}
        </ABButton>
      </form>
    </FormShell>
  )
}
