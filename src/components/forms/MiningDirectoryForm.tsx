'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ABInput, ABSelect, ABTextarea } from '@/components/ui/ab-form-fields'
import { ABButton } from '@/components/ui/ab-button'
import { FormShell } from './FormShell'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { AFRICAN_COUNTRIES } from './africanCountries'
import { cn } from '@/utilities/ui'

const ORANGE = '#E1640C'
const fieldClass =
  'w-full rounded-lg border border-[#d4d4d4] bg-[#FFF9F5] px-4 py-3 text-sm text-[#384958] placeholder:text-[#384958]/30 transition-colors focus:border-[#E1640C] focus:outline-none'

const embedSchema = z.object({
  organizationName: z.string().min(2, 'Organisation name required'),
  country: z.string().min(1, 'Country required'),
  description: z.string().min(10, 'Description required'),
  website: z.string().url('Valid URL required').optional().or(z.literal('')),
  contactEmail: z.string().email('Valid email required'),
  energySource: z.string().optional(),
  honey: z.string().max(0),
})
type EmbedFields = z.infer<typeof embedSchema>

const step1Schema = z.object({
  organizationName: z.string().min(2, 'Required'),
  country: z.string().min(1, 'Required'),
  city: z.string().optional(),
  founder: z.string().optional(),
  contactPerson: z.string().min(1, 'Required'),
  contactEmail: z.string().email('Valid email required'),
  contactEmailConfirm: z.string().email('Valid email required'),
  website: z.string().optional(),
  twitter: z.string().min(1, 'Required'),
  description: z.string().min(10, 'Required'),
})

const step2Schema = z.object({
  challenges: z.string().optional(),
  collaborativeEvents: z.enum(['Yes', 'No'], { required_error: 'Required' }),
  additionalInfo: z.string().optional(),
  confirmation: z.boolean().refine((v) => v === true, { message: 'Required' }),
  honey: z.string().max(0),
})

type Step1 = z.infer<typeof step1Schema>
type Step2 = z.infer<typeof step2Schema>
type PageFields = Step1 & Step2

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="text-sm font-bold text-[#384958]">
      {children}
      {required && <span className="text-red-600"> *</span>}
    </label>
  )
}

function MiningField({
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

function ProgressBar({ step }: { step: 1 | 2 }) {
  const pct = step === 1 ? 50 : 100
  return (
    <div className="mb-8">
      <p className="mb-2 text-sm text-[#384958]/70">
        Step <span>{step}</span> of <span>2</span>
      </p>
      <div className="relative h-5 overflow-hidden rounded-full bg-[#e5e5e5]">
        <div
          className="flex h-full items-center justify-center rounded-full text-xs font-medium text-white transition-all"
          style={{ width: `${pct}%`, backgroundColor: ORANGE }}
        >
          {pct}%
        </div>
      </div>
    </div>
  )
}

function MiningDirectoryEmbedForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<EmbedFields>({
    resolver: zodResolver(embedSchema),
    defaultValues: { honey: '' },
  })
  const { submit, isLoading, isSuccess, errorMsg, successMessage } = useFormSubmit({
    formType: 'mining-directory',
    formSlug: 'mining-org',
    onSuccess: () => reset(),
  })

  return (
    <FormShell
      isSuccess={isSuccess}
      successMessage={successMessage}
      errorMsg={errorMsg}
    >
      <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-5">
        <input {...register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />
        <div className="grid gap-5 sm:grid-cols-2">
          <ABInput label="Organisation Name" placeholder="Sahara Mining Co." error={errors.organizationName?.message} {...register('organizationName')} />
          <ABSelect label="Country" error={errors.country?.message} {...register('country')}>
            <option value="">Select country</option>
            {AFRICAN_COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </ABSelect>
        </div>
        <ABTextarea
          label="Description"
          rows={3}
          placeholder="Describe the mining operation, scale, and focus areas..."
          error={errors.description?.message}
          {...register('description')}
        />
        <ABInput label="Primary Energy Source (optional)" placeholder="Solar, Hydro, Grid, Stranded Gas..." {...register('energySource')} />
        <div className="grid gap-5 sm:grid-cols-2">
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

function MiningDirectoryPageForm() {
  const [step, setStep] = useState<1 | 2>(1)
  const [saved, setSaved] = useState<Partial<PageFields>>({})

  const form1 = useForm<Step1>({ resolver: zodResolver(step1Schema), defaultValues: saved as Step1 })
  const form2 = useForm<Step2>({
    resolver: zodResolver(step2Schema),
    defaultValues: { honey: '', confirmation: false, ...(saved as Partial<Step2>) },
  })

  const { submit, isLoading, isSuccess, errorMsg, successMessage } = useFormSubmit({
    formType: 'mining-directory',
    formSlug: 'mining-org',
    onSuccess: () => {
      setStep(1)
      setSaved({})
      form1.reset()
      form2.reset()
    },
  })

  function onStep1(data: Step1) {
    if (data.contactEmail !== data.contactEmailConfirm) {
      form1.setError('contactEmailConfirm', { message: 'Emails must match' })
      return
    }
    setSaved((prev) => ({ ...prev, ...data }))
    setStep(2)
  }

  async function onStep2(data: Step2) {
    const payload = { ...saved, ...data }
    const { honey, contactEmailConfirm, confirmation, ...rest } = payload
    await submit({
      ...rest,
      contactEmail: payload.contactEmail,
      organizationName: payload.organizationName,
      country: payload.country,
      description: payload.description,
      website: payload.website || '',
      twitter: payload.twitter,
      city: payload.city || '',
      founder: payload.founder || '',
      contactPerson: payload.contactPerson,
      challenges: payload.challenges || '',
      collaborativeEvents: payload.collaborativeEvents,
      additionalInfo: payload.additionalInfo || '',
      honey,
    })
  }

  if (isSuccess) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 px-6 py-8 text-center text-[#384958]">
        <p className="font-semibold">{successMessage}</p>
      </div>
    )
  }

  return (
    <div>
      {errorMsg && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMsg}</div>
      )}

      <ProgressBar step={step} />

      {step === 1 ? (
        <form onSubmit={form1.handleSubmit(onStep1)} noValidate className="flex flex-col gap-4">
          <MiningField label="Organization Name:" required error={form1.formState.errors.organizationName?.message}>
            <input className={fieldClass} {...form1.register('organizationName')} />
          </MiningField>

          <MiningField
            label="Which country does this organization operate in?"
            required
            error={form1.formState.errors.country?.message}
          >
            <select className={cn(fieldClass, 'cursor-pointer appearance-none')} {...form1.register('country')}>
              <option value="">Select a country</option>
              {AFRICAN_COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </MiningField>

          <MiningField label="City" error={form1.formState.errors.city?.message}>
            <input className={fieldClass} {...form1.register('city')} />
          </MiningField>

          <MiningField label="Founder:" error={form1.formState.errors.founder?.message}>
            <input className={fieldClass} {...form1.register('founder')} />
          </MiningField>

          <MiningField
            label="Primary Contact Person or Nym if you wish to remain anonymous:"
            required
            error={form1.formState.errors.contactPerson?.message}
          >
            <input className={fieldClass} {...form1.register('contactPerson')} />
          </MiningField>

          <fieldset className="flex flex-col gap-3">
            <FieldLabel required>Contact Email:</FieldLabel>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <input type="email" className={fieldClass} placeholder="Enter Email" {...form1.register('contactEmail')} />
                {form1.formState.errors.contactEmail && (
                  <p className="mt-1 text-xs text-red-600">{form1.formState.errors.contactEmail.message}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  className={fieldClass}
                  placeholder="Confirm Email"
                  {...form1.register('contactEmailConfirm')}
                />
                {form1.formState.errors.contactEmailConfirm && (
                  <p className="mt-1 text-xs text-red-600">{form1.formState.errors.contactEmailConfirm.message}</p>
                )}
              </div>
            </div>
          </fieldset>

          <MiningField label="Organization Website:" error={form1.formState.errors.website?.message}>
            <input className={fieldClass} {...form1.register('website')} />
          </MiningField>

          <MiningField label="Twitter Link/URL:" required error={form1.formState.errors.twitter?.message}>
            <input className={fieldClass} {...form1.register('twitter')} />
          </MiningField>

          <MiningField
            label="Brief Description of Organization:"
            required
            error={form1.formState.errors.description?.message}
          >
            <textarea className={cn(fieldClass, 'min-h-28 resize-y')} rows={6} {...form1.register('description')} />
          </MiningField>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full rounded-lg px-12 py-5 text-[17px] font-semibold text-white transition-colors hover:bg-[#652A00]"
              style={{ backgroundColor: ORANGE }}
            >
              Next
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={form2.handleSubmit(onStep2)} noValidate className="flex flex-col gap-4">
          <input {...form2.register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />

          <MiningField label="What are the biggest challenges you face?" error={form2.formState.errors.challenges?.message}>
            <textarea className={cn(fieldClass, 'min-h-40 resize-y')} rows={10} {...form2.register('challenges')} />
          </MiningField>

          <fieldset className="flex flex-col gap-2">
            <FieldLabel required>
              Would you be interested in participating in future collaborative events or projects?
            </FieldLabel>
            <div className="flex flex-col gap-2 pt-1">
              {(['Yes', 'No'] as const).map((value) => (
                <label key={value} className="flex cursor-pointer items-center gap-2 text-sm text-[#384958]">
                  <input type="radio" value={value} className="accent-[#E1640C]" {...form2.register('collaborativeEvents')} />
                  {value}
                </label>
              ))}
            </div>
            {form2.formState.errors.collaborativeEvents && (
              <p className="text-xs text-red-600">{form2.formState.errors.collaborativeEvents.message}</p>
            )}
          </fieldset>

          <MiningField
            label="Is there anything else you would like to share?"
            error={form2.formState.errors.additionalInfo?.message}
          >
            <textarea className={cn(fieldClass, 'min-h-40 resize-y')} rows={10} {...form2.register('additionalInfo')} />
          </MiningField>

          <fieldset className="flex flex-col gap-2">
            <FieldLabel required>Confirmation</FieldLabel>
            <label className="flex cursor-pointer items-start gap-2 text-sm text-[#384958]">
              <input type="checkbox" className="mt-1 accent-[#E1640C]" {...form2.register('confirmation')} />
              I confirm that all the information I have provided above is accurate and complete.
            </label>
            {form2.formState.errors.confirmation && (
              <p className="text-xs text-red-600">{form2.formState.errors.confirmation.message}</p>
            )}
          </fieldset>

          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full rounded-lg border border-[#E1640C] px-12 py-5 text-[17px] font-semibold text-[#E1640C] transition-colors hover:bg-[#E1640C]/10"
            >
              Previous
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg px-12 py-5 text-[17px] font-semibold text-white transition-colors hover:bg-[#652A00] disabled:opacity-60"
              style={{ backgroundColor: ORANGE }}
            >
              {isLoading ? 'Submitting…' : 'Submit'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export function MiningDirectoryForm({ variant = 'embed' }: { variant?: 'embed' | 'page' }) {
  if (variant === 'page') return <MiningDirectoryPageForm />
  return <MiningDirectoryEmbedForm />
}
