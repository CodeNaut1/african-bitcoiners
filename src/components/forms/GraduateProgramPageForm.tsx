'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ABInput, ABSelect, ABTextarea } from '@/components/ui/ab-form-fields'
import { FormShell } from './FormShell'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { AFRICAN_COUNTRIES } from './africanCountries'

const step1Schema = z
  .object({
    name: z.string().min(2, 'Required'),
    email: z.string().email('Valid email required'),
    emailConfirm: z.string().email('Valid email required'),
    country: z.string().min(1, 'Required'),
    ageConfirm: z.literal(true, { errorMap: () => ({ message: 'Required' }) }),
    applicationConfirm: z.literal(true, { errorMap: () => ({ message: 'Required' }) }),
    qualification: z.string().min(2, 'Required'),
    skills: z.string().min(10, 'Required'),
    whyWorkWithUs: z.string().min(20, 'Required').max(500, 'Maximum 500 characters'),
  })
  .refine((data) => data.email === data.emailConfirm, {
    message: 'Emails must match',
    path: ['emailConfirm'],
  })

const step2Schema = z.object({
  whyBitcoin: z.string().min(20, 'Required'),
  usefulWays: z.string().min(20, 'Required'),
  projectLink: z.string().optional(),
  twitter: z.string().optional(),
  nostr: z.string().optional(),
  linkedin: z.string().optional(),
  newsletter: z.boolean().optional(),
  honey: z.string().max(0),
})

type Step1 = z.infer<typeof step1Schema>
type Step2 = z.infer<typeof step2Schema>
type AllFields = Step1 & Step2

export function GraduateProgramPageForm() {
  const [step, setStep] = useState(1)
  const [saved, setSaved] = useState<Partial<AllFields>>({})

  const form1 = useForm<Step1>({ resolver: zodResolver(step1Schema), defaultValues: saved as Step1 })
  const form2 = useForm<Step2>({
    resolver: zodResolver(step2Schema),
    defaultValues: { honey: '', newsletter: false, ...saved },
  })

  const { submit, isLoading, isSuccess, errorMsg, successMessage } = useFormSubmit({
    formType: 'graduate-programme',
    formSlug: 'graduate-program',
    onSuccess: () => {
      setStep(1)
      setSaved({})
      form1.reset()
      form2.reset()
    },
  })

  const onStep1 = form1.handleSubmit((data) => {
    setSaved((prev) => ({ ...prev, ...data }))
    setStep(2)
  })

  const onStep2 = form2.handleSubmit((data) => {
    submit({ ...saved, ...data })
  })

  return (
    <FormShell
      isSuccess={isSuccess}
      successMessage={successMessage}
      errorMsg={errorMsg}
    >
      {step === 1 ? (
        <form onSubmit={onStep1} noValidate className="flex flex-col gap-5">
          <p className="text-sm text-brand-text-mid">
            <span className="text-brand-primary">*</span> indicates required fields
          </p>
          <ABInput
            label="Your Name (or Nym if you feel more comfortable being anonymous) *"
            error={form1.formState.errors.name?.message}
            {...form1.register('name')}
          />
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-brand-text-dark">Contact email *</legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <ABInput
                label="Enter Email"
                type="email"
                error={form1.formState.errors.email?.message}
                {...form1.register('email')}
              />
              <ABInput
                label="Confirm Email"
                type="email"
                error={form1.formState.errors.emailConfirm?.message}
                {...form1.register('emailConfirm')}
              />
            </div>
          </fieldset>
          <ABSelect label="African country of residence *" error={form1.formState.errors.country?.message} {...form1.register('country')}>
            <option value="">Select Country</option>
            {AFRICAN_COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </ABSelect>
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-brand-text-dark">Age Confirmation: *</legend>
            <label className="flex items-start gap-3">
              <input type="checkbox" {...form1.register('ageConfirm')} className="mt-1 h-4 w-4 accent-[#E98852]" />
              <span className="text-sm text-[#384958]">I am aged 18-30 and living in Africa.</span>
            </label>
            {form1.formState.errors.ageConfirm && (
              <p className="text-xs text-red-600">{form1.formState.errors.ageConfirm.message}</p>
            )}
          </fieldset>
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-brand-text-dark">Application Confirmation: *</legend>
            <label className="flex items-start gap-3">
              <input type="checkbox" {...form1.register('applicationConfirm')} className="mt-1 h-4 w-4 accent-[#E98852]" />
              <span className="text-sm text-[#384958]">I have not applied for this role in the past 6 months.</span>
            </label>
            {form1.formState.errors.applicationConfirm && (
              <p className="text-xs text-red-600">{form1.formState.errors.applicationConfirm.message}</p>
            )}
          </fieldset>
          <ABInput label="Highest Qualification *" error={form1.formState.errors.qualification?.message} {...form1.register('qualification')} />
          <div>
            <ABTextarea
              label="Any relevant skills/background? *"
              rows={3}
              error={form1.formState.errors.skills?.message}
              {...form1.register('skills')}
            />
            <p className="mt-1 text-xs text-brand-text-mid">Use the + sign to keep adding</p>
          </div>
          <div>
            <ABTextarea
              label="Please explain why you want to work with us *"
              rows={6}
              maxLength={500}
              error={form1.formState.errors.whyWorkWithUs?.message}
              {...form1.register('whyWorkWithUs')}
            />
            <p className="mt-1 text-xs text-brand-text-mid">
              {form1.watch('whyWorkWithUs')?.length ?? 0} of 500 max characters
            </p>
          </div>
          <button
            type="submit"
            className="self-start rounded-[5px] px-10 py-4 text-base font-semibold text-white transition-colors hover:bg-[#384958]"
            style={{ backgroundColor: '#E98852' }}
          >
            Next
          </button>
        </form>
      ) : (
        <form onSubmit={onStep2} noValidate className="flex flex-col gap-5">
          <input {...form2.register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />
          <ABTextarea
            label="Why do you want to work in Bitcoin? *"
            rows={4}
            error={form2.formState.errors.whyBitcoin?.message}
            {...form2.register('whyBitcoin')}
          />
          <ABTextarea
            label="Ways you think you can be useful to the team? *"
            rows={4}
            error={form2.formState.errors.usefulWays?.message}
            {...form2.register('usefulWays')}
          />
          <ABInput
            label="Link to any project you think might interest us"
            error={form2.formState.errors.projectLink?.message}
            {...form2.register('projectLink')}
          />
          <div className="grid gap-5 sm:grid-cols-3">
            <ABInput label="Twitter (optional)" {...form2.register('twitter')} />
            <ABInput label="Nostr (optional)" {...form2.register('nostr')} />
            <ABInput label="LinkedIn (optional)" {...form2.register('linkedin')} />
          </div>
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-brand-text-dark">Subscribe to our Weekly Newsletter</legend>
            <label className="flex items-start gap-3">
              <input type="checkbox" {...form2.register('newsletter')} className="mt-1 h-4 w-4 accent-[#E98852]" />
              <span className="text-sm text-[#384958]">
                I would like to receive latest news, resources and updates about Bitcoin
              </span>
            </label>
          </fieldset>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-[5px] border border-[#38495833] bg-white px-10 py-4 text-base font-semibold text-[#384958] transition-colors hover:bg-[#384958] hover:text-white"
            >
              Previous
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-[5px] px-10 py-4 text-base font-semibold text-white transition-colors hover:bg-[#384958] disabled:opacity-60"
              style={{ backgroundColor: '#E98852' }}
            >
              {isLoading ? 'Submitting…' : 'Submit'}
            </button>
          </div>
        </form>
      )}
    </FormShell>
  )
}
