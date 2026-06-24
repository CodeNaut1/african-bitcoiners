'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ABInput, ABTextarea } from '@/components/ui/ab-form-fields'
import { ABButton } from '@/components/ui/ab-button'
import { FormShell } from './FormShell'
import { useFormSubmit } from '@/hooks/useFormSubmit'

const schema = z.object({
  meetupName: z.string().min(2, 'Meetup name required'),
  description: z.string().min(10, 'Description required'),
  location: z.string().min(3, 'Location required'),
  startDate: z.string().min(1, 'Start date required'),
  time: z.string().min(1, 'Time required'),
  contactName: z.string().min(2, 'Contact name required'),
  contactEmail: z.string().email('Valid email required'),
  consent: z.literal(true, { errorMap: () => ({ message: 'Consent is required' }) }),
  honey: z.string().max(0),
})
type Fields = z.infer<typeof schema>

export function MeetupSubmissionForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { honey: '' },
  })
  const { submit, isLoading, isSuccess, errorMsg } = useFormSubmit({ formType: 'meetup-submission', onSuccess: () => reset() })

  return (
    <FormShell isSuccess={isSuccess} successMessage="Meetup submitted! We'll review and publish it within 24 hours." errorMsg={errorMsg}>
      <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-5">
        <input {...register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />
        <ABInput label="Meetup Name" placeholder="Lagos Bitcoin Meetup — July 2026" error={errors.meetupName?.message} {...register('meetupName')} />
        <ABTextarea label="Description" rows={3} placeholder="What is this meetup about? Who should attend?" error={errors.description?.message} {...register('description')} />
        <ABInput label="Location" placeholder="The Hub, Victoria Island, Lagos, Nigeria" error={errors.location?.message} {...register('location')} />
        <div className="grid sm:grid-cols-2 gap-5">
          <ABInput label="Date" type="date" error={errors.startDate?.message} {...register('startDate')} />
          <ABInput label="Time" placeholder="18:00 WAT" error={errors.time?.message} {...register('time')} />
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <ABInput label="Your Name" placeholder="Amara Diallo" error={errors.contactName?.message} {...register('contactName')} />
          <ABInput label="Contact Email" type="email" placeholder="amara@example.com" error={errors.contactEmail?.message} {...register('contactEmail')} />
        </div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" {...register('consent')} className="mt-1 h-4 w-4 rounded border-brand-border-light accent-brand-primary" />
          <span className="text-sm text-brand-text-mid">I confirm this is a genuine Bitcoin meetup and consent to it being listed on the site.</span>
        </label>
        {errors.consent && <p className="text-xs text-red-600">{errors.consent.message}</p>}
        <ABButton type="submit" variant="primary" size="md" disabled={isLoading} className="self-start">
          {isLoading ? 'Submitting…' : 'Submit Meetup'}
        </ABButton>
      </form>
    </FormShell>
  )
}
