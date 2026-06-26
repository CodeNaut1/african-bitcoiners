'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useFormSubmit } from '@/hooks/useFormSubmit'
import { AFRICAN_COUNTRIES } from '@/components/forms/africanCountries'
import { cn } from '@/utilities/ui'

const ORANGE = '#E1640C'
const fieldClass =
  'w-full rounded-lg border border-[#d4d4d4] bg-[#FFF9F5] px-4 py-3 text-sm text-[#384958] placeholder:text-[#384958]/30 transition-colors focus:border-[#E1640C] focus:outline-none'

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="text-sm font-bold text-[#384958]">
      {children}
      {required && <span className="text-red-600"> *</span>}
    </label>
  )
}

function MeetupField({
  label,
  required,
  error,
  children,
}: {
  label: React.ReactNode
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <FieldLabel required={required}>{label}</FieldLabel>
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}

function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-lg px-6 py-4 text-[17px] font-semibold text-white transition-colors hover:bg-[#652A00] disabled:opacity-60"
      style={{ backgroundColor: ORANGE }}
    >
      {loading ? 'Submitting…' : 'Submit'}
    </button>
  )
}

function SuccessBox() {
  return (
    <div className="rounded-lg border border-green-200 bg-green-50 px-6 py-8 text-center text-[#384958]">
      <p className="font-semibold">Thank you!</p>
      <p className="mt-2 text-sm">Your submission has been received. We&apos;ll be in touch shortly.</p>
    </div>
  )
}

const hostSchema = z
  .object({
    name: z.string().min(2, 'Required'),
    meetupName: z.string().min(2, 'Required'),
    description: z.string().min(10, 'Required'),
    website: z.string().optional(),
    country: z.string().min(1, 'Required'),
    city: z.string().min(2, 'Required'),
    contactEmail: z.string().email('Valid email required'),
    contactEmailConfirm: z.string().email('Valid email required'),
    phone: z.string().optional(),
    newsletter: z.boolean().optional(),
    honey: z.string().max(0),
  })
  .refine((d) => d.contactEmail === d.contactEmailConfirm, {
    message: 'Emails must match',
    path: ['contactEmailConfirm'],
  })

type HostFields = z.infer<typeof hostSchema>

export function MeetupHostForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<HostFields>({
    resolver: zodResolver(hostSchema),
    defaultValues: { honey: '', newsletter: false },
  })
  const { submit, isLoading, isSuccess, errorMsg } = useFormSubmit({
    formType: 'meetup-host-proposal',
    onSuccess: () => reset(),
  })

  if (isSuccess) return <SuccessBox />

  return (
    <div>
      {errorMsg && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMsg}</div>
      )}
      <p className="mb-6 text-sm text-[#384958]/70">
        <span className="text-red-600">*</span> indicates required fields
      </p>
      <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-4">
        <input {...register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />

        <MeetupField label="Your name (or Nym if you wish to remain anonymous)" required error={errors.name?.message}>
          <input className={fieldClass} {...register('name')} />
        </MeetupField>

        <MeetupField label="Proposed Meetup name/theme" required error={errors.meetupName?.message}>
          <input className={fieldClass} {...register('meetupName')} />
        </MeetupField>

        <MeetupField label="Brief Description" required error={errors.description?.message}>
          <textarea className={cn(fieldClass, 'min-h-40 resize-y')} rows={10} maxLength={500} {...register('description')} />
        </MeetupField>

        <MeetupField label="Website URL (if any)" error={errors.website?.message}>
          <input className={fieldClass} {...register('website')} />
        </MeetupField>

        <MeetupField label="African country" required error={errors.country?.message}>
          <select className={cn(fieldClass, 'cursor-pointer')} {...register('country')}>
            <option value="">Select Country</option>
            {AFRICAN_COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </MeetupField>

        <MeetupField label="Town/City" required error={errors.city?.message}>
          <input className={fieldClass} {...register('city')} />
        </MeetupField>

        <fieldset className="flex flex-col gap-3">
          <FieldLabel required>Contact email</FieldLabel>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <input type="email" className={fieldClass} placeholder="Enter Email" {...register('contactEmail')} />
              {errors.contactEmail && <p className="mt-1 text-xs text-red-600">{errors.contactEmail.message}</p>}
            </div>
            <div>
              <input type="email" className={fieldClass} placeholder="Confirm Email" {...register('contactEmailConfirm')} />
              {errors.contactEmailConfirm && (
                <p className="mt-1 text-xs text-red-600">{errors.contactEmailConfirm.message}</p>
              )}
            </div>
          </div>
        </fieldset>

        <MeetupField label="Phone" error={errors.phone?.message}>
          <input type="tel" className={fieldClass} {...register('phone')} />
        </MeetupField>

        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" {...register('newsletter')} className="mt-1 h-4 w-4 accent-[#E1640C]" />
          <span className="text-sm text-[#384958]">
            I would like to receive the latest news, resources, and updates about Bitcoin.
          </span>
        </label>

        <SubmitButton loading={isLoading} />
      </form>
    </div>
  )
}

const attendSchema = z
  .object({
    name: z.string().min(2, 'Required'),
    country: z.string().min(1, 'Required'),
    city: z.string().min(2, 'Required'),
    contactEmail: z.string().email('Valid email required'),
    contactEmailConfirm: z.string().email('Valid email required'),
    phone: z.string().optional(),
    newsletter: z.boolean().optional(),
    honey: z.string().max(0),
  })
  .refine((d) => d.contactEmail === d.contactEmailConfirm, {
    message: 'Emails must match',
    path: ['contactEmailConfirm'],
  })

type AttendFields = z.infer<typeof attendSchema>

export function MeetupAttendForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AttendFields>({
    resolver: zodResolver(attendSchema),
    defaultValues: { honey: '', newsletter: false },
  })
  const { submit, isLoading, isSuccess, errorMsg } = useFormSubmit({
    formType: 'meetup-database',
    onSuccess: () => reset(),
  })

  if (isSuccess) return <SuccessBox />

  return (
    <div>
      {errorMsg && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMsg}</div>
      )}
      <p className="mb-6 text-sm text-[#384958]/70">
        <span className="text-red-600">*</span> indicates required fields
      </p>
      <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-4">
        <input {...register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />

        <MeetupField label="Your name (or Nym if you wish to remain anonymous)" required error={errors.name?.message}>
          <input className={fieldClass} {...register('name')} />
        </MeetupField>

        <MeetupField label="African country" required error={errors.country?.message}>
          <select className={cn(fieldClass, 'cursor-pointer')} {...register('country')}>
            <option value="">Select Country</option>
            {AFRICAN_COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </MeetupField>

        <MeetupField label="Town/City" required error={errors.city?.message}>
          <input className={fieldClass} {...register('city')} />
        </MeetupField>

        <fieldset className="flex flex-col gap-3">
          <FieldLabel required>Contact email</FieldLabel>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <input type="email" className={fieldClass} placeholder="Enter Email" {...register('contactEmail')} />
              {errors.contactEmail && <p className="mt-1 text-xs text-red-600">{errors.contactEmail.message}</p>}
            </div>
            <div>
              <input type="email" className={fieldClass} placeholder="Confirm Email" {...register('contactEmailConfirm')} />
              {errors.contactEmailConfirm && (
                <p className="mt-1 text-xs text-red-600">{errors.contactEmailConfirm.message}</p>
              )}
            </div>
          </div>
        </fieldset>

        <MeetupField label="Phone" error={errors.phone?.message}>
          <input type="tel" className={fieldClass} {...register('phone')} />
        </MeetupField>

        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" {...register('newsletter')} className="mt-1 h-4 w-4 accent-[#E1640C]" />
          <span className="text-sm text-[#384958]">
            I would like to receive the latest news, resources, and updates about Bitcoin.
          </span>
        </label>

        <SubmitButton loading={isLoading} />
      </form>
    </div>
  )
}
