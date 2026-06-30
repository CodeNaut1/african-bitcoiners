'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ABInput, ABTextarea } from '@/components/ui/ab-form-fields'
import { ABButton } from '@/components/ui/ab-button'
import { FormShell } from './FormShell'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { cn } from '@/utilities/ui'

const ORANGE = '#E1640C'
const pageFieldClass =
  'w-full rounded-lg border border-[#d4d4d4] bg-[#FFF9F5] px-4 py-3 text-sm text-[#384958] placeholder:text-[#384958]/30 transition-colors focus:border-[#E1640C] focus:outline-none'

const embedSchema = z.object({
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
type EmbedFields = z.infer<typeof embedSchema>

const pageSchema = z
  .object({
    meetupName: z.string().min(2, 'Required'),
    description: z.string().min(10, 'Required').max(500),
    location: z.string().min(2, 'Required'),
    startDate: z.string().min(1, 'Required'),
    endDate: z.string().optional(),
    timeHour: z.string().min(1, 'Required'),
    timeMinute: z.string().min(1, 'Required'),
    timeAmPm: z.enum(['am', 'pm']),
    websiteUrl: z.string().min(1, 'Required'),
    contactLink: z.string().min(1, 'Required'),
    contactName: z.string().min(2, 'Required'),
    contactEmail: z.string().email('Valid email required'),
    contactEmailConfirm: z.string().email('Valid email required'),
    newsletter: z.boolean().optional(),
    honey: z.string().max(0),
  })
  .refine((d) => d.contactEmail === d.contactEmailConfirm, {
    message: 'Emails must match',
    path: ['contactEmailConfirm'],
  })

type PageFields = z.infer<typeof pageSchema>

function PageFieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="text-sm font-bold text-[#384958]">
      {children}
      {required && <span className="text-red-600"> *</span>}
    </label>
  )
}

function MeetupPageForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<PageFields>({
    resolver: zodResolver(pageSchema),
    defaultValues: { honey: '', timeAmPm: 'pm', newsletter: false },
  })
  const { submit, isLoading, isSuccess, errorMsg, successMessage } = useFormSubmit({
    formType: 'meetup-submission',
    formSlug: 'meetup',
    onSuccess: () => reset(),
  })

  if (isSuccess) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 px-6 py-8 text-center text-[#384958]">
        <p className="font-semibold">{successMessage}</p>
      </div>
    )
  }

  const onSubmit = (data: PageFields) => {
    submit({
      meetupName: data.meetupName,
      description: data.description,
      location: data.location,
      startDate: data.startDate,
      endDate: data.endDate,
      time: `${data.timeHour}:${data.timeMinute} ${data.timeAmPm.toUpperCase()}`,
      websiteUrl: data.websiteUrl,
      contactLink: data.contactLink,
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      newsletter: data.newsletter,
    })
  }

  return (
    <div>
      {errorMsg && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMsg}</div>
      )}
      <p className="mb-6 text-sm text-[#384958]/70">
        <span className="text-red-600">*</span> indicates required fields
      </p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        <input {...register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />

        <div className="flex flex-col gap-1.5">
          <PageFieldLabel required>Meetup Name/Theme</PageFieldLabel>
          <input className={pageFieldClass} {...register('meetupName')} />
          {errors.meetupName && <p className="text-xs text-red-600">{errors.meetupName.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <PageFieldLabel required>Brief Description (About the Event)</PageFieldLabel>
          <textarea className={cn(pageFieldClass, 'min-h-40 resize-y')} rows={10} maxLength={500} {...register('description')} />
          {errors.description && <p className="text-xs text-red-600">{errors.description.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <PageFieldLabel required>Location</PageFieldLabel>
          <input className={pageFieldClass} aria-describedby="location-hint" {...register('location')} />
          <p id="location-hint" className="text-xs text-[#384958]/70">
            Exact venue for the meetups
          </p>
          {errors.location && <p className="text-xs text-red-600">{errors.location.message}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <PageFieldLabel required>Date for Meetup (Start)</PageFieldLabel>
            <input type="date" className={pageFieldClass} {...register('startDate')} />
            {errors.startDate && <p className="text-xs text-red-600">{errors.startDate.message}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <PageFieldLabel>Date for Meetup (End)</PageFieldLabel>
            <input type="date" className={pageFieldClass} aria-describedby="end-hint" {...register('endDate')} />
            <p id="end-hint" className="text-xs text-[#384958]/70">
              If event is more than 1 day
            </p>
          </div>
        </div>

        <fieldset className="flex flex-col gap-2">
          <PageFieldLabel required>Time for Meetup</PageFieldLabel>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="number"
              min={0}
              max={12}
              placeholder="HH"
              className={cn(pageFieldClass, 'w-20')}
              {...register('timeHour')}
            />
            <span className="text-[#384958]">:</span>
            <input
              type="number"
              min={0}
              max={59}
              placeholder="MM"
              className={cn(pageFieldClass, 'w-20')}
              {...register('timeMinute')}
            />
            <select className={cn(pageFieldClass, 'w-24 cursor-pointer')} {...register('timeAmPm')}>
              <option value="am">AM</option>
              <option value="pm">PM</option>
            </select>
          </div>
          {(errors.timeHour || errors.timeMinute) && (
            <p className="text-xs text-red-600">Time is required</p>
          )}
        </fieldset>

        <div className="flex flex-col gap-1.5">
          <PageFieldLabel required>Website URL (or any link)</PageFieldLabel>
          <input className={pageFieldClass} aria-describedby="website-hint" {...register('websiteUrl')} />
          <p id="website-hint" className="text-xs text-[#384958]/70">
            Can be twitter link
          </p>
          {errors.websiteUrl && <p className="text-xs text-red-600">{errors.websiteUrl.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <PageFieldLabel required>How to Apply or Who to Contact (Link or Email)?</PageFieldLabel>
          <input className={pageFieldClass} {...register('contactLink')} />
          {errors.contactLink && <p className="text-xs text-red-600">{errors.contactLink.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <PageFieldLabel required>Meetup image or Organisation Logo</PageFieldLabel>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            className={cn(pageFieldClass, 'cursor-pointer file:mr-4 file:rounded file:border-0 file:bg-[#E1640C] file:px-3 file:py-1 file:text-sm file:text-white')}
          />
          <p className="text-xs text-[#384958]/70">Accepted file types: jpg, png, jpeg, pdf. Max. file size: 1 MB.</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <PageFieldLabel required>Your Name/Nym</PageFieldLabel>
          <input className={pageFieldClass} {...register('contactName')} />
          {errors.contactName && <p className="text-xs text-red-600">{errors.contactName.message}</p>}
        </div>

        <fieldset className="flex flex-col gap-3">
          <PageFieldLabel required>Contact email</PageFieldLabel>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <input type="email" className={pageFieldClass} placeholder="Enter Email" {...register('contactEmail')} />
              {errors.contactEmail && <p className="mt-1 text-xs text-red-600">{errors.contactEmail.message}</p>}
            </div>
            <div>
              <input type="email" className={pageFieldClass} placeholder="Confirm Email" {...register('contactEmailConfirm')} />
              {errors.contactEmailConfirm && (
                <p className="mt-1 text-xs text-red-600">{errors.contactEmailConfirm.message}</p>
              )}
            </div>
          </div>
        </fieldset>

        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" {...register('newsletter')} className="mt-1 h-4 w-4 accent-[#E1640C]" />
          <span className="text-sm text-[#384958]">
            I would like to receive latest news, resources and updates about Bitcoin
          </span>
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg px-6 py-4 text-[17px] font-semibold text-white transition-colors hover:bg-[#652A00] disabled:opacity-60"
          style={{ backgroundColor: ORANGE }}
        >
          {isLoading ? 'Submitting…' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

function MeetupEmbedForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<EmbedFields>({
    resolver: zodResolver(embedSchema),
    defaultValues: { honey: '' },
  })
  const { submit, isLoading, isSuccess, errorMsg, successMessage } = useFormSubmit({
    formType: 'meetup-submission',
    formSlug: 'meetup',
    onSuccess: () => reset(),
  })

  return (
    <FormShell isSuccess={isSuccess} successMessage={successMessage} errorMsg={errorMsg}>
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

export function MeetupSubmissionForm({ variant = 'embed' }: { variant?: 'embed' | 'page' }) {
  if (variant === 'page') return <MeetupPageForm />
  return <MeetupEmbedForm />
}
