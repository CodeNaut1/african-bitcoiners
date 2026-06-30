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

const JOB_CATEGORIES = [
  'Administration',
  'Architecture',
  'Arts, culture and entertainment',
  'Communications and copywriting',
  'Computing and ICT',
  'Construction and Building',
  'Education',
  'Engineering',
  'Graphics and Product Design',
  'Information Technology',
  'Marketing',
  'Others',
]

const JOB_TYPES = ['Contract', 'Full-time', 'Graduate Programme', 'Internship', 'Part-time'] as const

const step1Schema = z.object({
  companyName: z.string().min(2, 'Required'),
  companyDescription: z.string().min(10, 'Required'),
  website: z.string().min(1, 'Required'),
  bitcoinConsent: z.literal(true, { errorMap: () => ({ message: 'Required' }) }),
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  contactEmail: z.string().email('Valid email required'),
  contactEmailConfirm: z.string().email('Valid email required'),
})

const step2Schema = z.object({
  jobTitle: z.string().min(2, 'Required'),
  jobDescription: z.string().min(20, 'Required'),
  requirements: z.string().min(10, 'Required'),
  jobCountry: z.string().min(1, 'Required'),
  recruitingFrom: z.string().min(1, 'Required'),
  hireAfrica: z.enum(['yes', 'no'], { required_error: 'Required' }),
  stateRegion: z.string().min(1, 'Required'),
})

const step3Schema = z.object({
  jobCategory: z.string().min(1, 'Required'),
  jobType: z.string().min(1, 'Required'),
  isRemote: z.enum(['yes', 'no'], { required_error: 'Required' }),
  openings: z.string().min(1, 'Required'),
  payRange: z.string().min(1, 'Required'),
  paidInBitcoin: z.enum(['yes', 'no'], { required_error: 'Required' }),
  applicationUrl: z.string().min(1, 'Required'),
  newsletter: z.boolean().optional(),
  honey: z.string().max(0),
})

type Step1 = z.infer<typeof step1Schema>
type Step2 = z.infer<typeof step2Schema>
type Step3 = z.infer<typeof step3Schema>
type AllFields = Step1 & Step2 & Step3

const TYPE_MAP: Record<string, string> = {
  'Full-time': 'full-time',
  'Part-time': 'part-time',
  Contract: 'contract',
  Internship: 'contract',
  'Graduate Programme': 'full-time',
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="border-none pb-2 pt-4 font-heading text-lg font-bold text-[#384958]">{children}</h3>
}

function ProgressBar({ step }: { step: number }) {
  const pct = step === 1 ? 33 : step === 2 ? 66 : 100
  return (
    <div className="mb-8">
      <p className="mb-2 text-sm font-medium text-[#384958]">
        Step <span>{step}</span> of <span>3</span>
      </p>
      <div className="h-2 overflow-hidden rounded-full bg-gray-200">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: '#FFD83B' }} />
      </div>
    </div>
  )
}

export function JobSubmissionPageForm() {
  const [step, setStep] = useState(1)
  const [saved, setSaved] = useState<Partial<AllFields>>({})

  const form1 = useForm<Step1>({ resolver: zodResolver(step1Schema), defaultValues: saved as Step1 })
  const form2 = useForm<Step2>({ resolver: zodResolver(step2Schema), defaultValues: saved as Step2 })
  const form3 = useForm<Step3>({
    resolver: zodResolver(step3Schema),
    defaultValues: { honey: '', newsletter: false, ...(saved as Partial<Step3>) },
  })

  const { submit, isLoading, isSuccess, errorMsg, successMessage } = useFormSubmit({
    formType: 'job-submission',
    formSlug: 'job-submission',
    onSuccess: () => {
      setStep(1)
      setSaved({})
      form1.reset()
      form2.reset()
      form3.reset()
    },
  })

  function onStep1(data: Step1) {
    if (data.contactEmail !== data.contactEmailConfirm) {
      form1.setError('contactEmailConfirm', { message: 'Emails must match' })
      return
    }
    setSaved((s) => ({ ...s, ...data }))
    setStep(2)
  }

  function onStep2(data: Step2) {
    setSaved((s) => ({ ...s, ...data }))
    setStep(3)
  }

  function onStep3(data: Step3) {
    const all = { ...saved, ...data } as AllFields
    const location = [all.stateRegion, all.jobCountry, all.isRemote === 'yes' ? 'Remote' : ''].filter(Boolean).join(', ')
    const description = [
      `Category: ${all.jobCategory}`,
      `Remote: ${all.isRemote}`,
      `Openings: ${all.openings}`,
      `Pay range (USD): ${all.payRange}`,
      `Paid in Bitcoin: ${all.paidInBitcoin}`,
      `Recruiting from: ${all.recruitingFrom}`,
      `Hire in Africa: ${all.hireAfrica}`,
      '',
      'Job Description:',
      all.jobDescription,
      '',
      'Requirements:',
      all.requirements,
      '',
      `Application: ${all.applicationUrl}`,
    ].join('\n')

    submit({
      companyName: all.companyName,
      companyDescription: all.companyDescription,
      website: all.website,
      contactName: `${all.firstName} ${all.lastName}`.trim(),
      contactEmail: all.contactEmail,
      jobTitle: all.jobTitle,
      jobType: TYPE_MAP[all.jobType] || 'full-time',
      location,
      description,
      bitcoinConsent: all.bitcoinConsent,
      honey: data.honey,
    })
  }

  const fieldClass = 'bg-[#38495805] border-[#38495833]'

  return (
    <FormShell
      isSuccess={isSuccess}
      successMessage={successMessage}
      errorMsg={errorMsg}
    >
      <ProgressBar step={step} />

      {step === 1 && (
        <form onSubmit={form1.handleSubmit(onStep1)} noValidate className="flex flex-col gap-5">
          <SectionTitle>PART A: Poster/Company Details</SectionTitle>
          <ABInput
            label="Your Company's name *"
            error={form1.formState.errors.companyName?.message}
            className={fieldClass}
            {...form1.register('companyName')}
          />
          <ABTextarea
            label="Company description *"
            rows={6}
            error={form1.formState.errors.companyDescription?.message}
            className={fieldClass}
            {...form1.register('companyDescription')}
          />
          <ABInput
            label="Website URL *"
            error={form1.formState.errors.website?.message}
            className={fieldClass}
            {...form1.register('website')}
          />
          <fieldset className="flex flex-col gap-2">
            <legend className="text-sm font-medium text-brand-text-dark">
              Please verify that this is a Bitcoin organisation or this opportunity is a Bitcoin related role. *
            </legend>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" {...form1.register('bitcoinConsent')} className="mt-1 h-4 w-4 accent-brand-primary" />
              <span className="text-sm text-brand-text-mid">I confirm that this job is Job is Bitcoin related.</span>
            </label>
            <p className="text-sm text-[#384958]">Please note that non Bitcoin jobs/Organisations will not be posted!</p>
            {form1.formState.errors.bitcoinConsent && (
              <p className="text-xs text-red-600">{form1.formState.errors.bitcoinConsent.message}</p>
            )}
          </fieldset>
          <div className="grid gap-5 sm:grid-cols-2">
            <ABInput label="First *" error={form1.formState.errors.firstName?.message} className={fieldClass} {...form1.register('firstName')} />
            <ABInput label="Last *" error={form1.formState.errors.lastName?.message} className={fieldClass} {...form1.register('lastName')} />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <ABInput
              label="Enter Email *"
              type="email"
              error={form1.formState.errors.contactEmail?.message}
              className={fieldClass}
              {...form1.register('contactEmail')}
            />
            <ABInput
              label="Confirm Email *"
              type="email"
              error={form1.formState.errors.contactEmailConfirm?.message}
              className={fieldClass}
              {...form1.register('contactEmailConfirm')}
            />
          </div>
          <ABButton type="submit" variant="primary" size="md" className="w-fit rounded-md px-8 py-4" style={{ backgroundColor: '#E98852' }}>
            Next
          </ABButton>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={form2.handleSubmit(onStep2)} noValidate className="flex flex-col gap-5">
          <SectionTitle>PART B: Job Vacancy Details</SectionTitle>
          <ABInput label="Job Title *" error={form2.formState.errors.jobTitle?.message} className={fieldClass} {...form2.register('jobTitle')} />
          <ABTextarea
            label="Job Description *"
            rows={6}
            error={form2.formState.errors.jobDescription?.message}
            className={fieldClass}
            {...form2.register('jobDescription')}
          />
          <p className="-mt-3 text-sm text-[#384958]">Nature of Job/Responsibilities</p>
          <ABTextarea
            label="Requirements *"
            rows={6}
            error={form2.formState.errors.requirements?.message}
            className={fieldClass}
            {...form2.register('requirements')}
          />
          <p className="-mt-3 text-sm text-[#384958]">Required Skills/Certifications, if any</p>
          <ABSelect label="Country of Job *" error={form2.formState.errors.jobCountry?.message} className={fieldClass} {...form2.register('jobCountry')}>
            <option value="">Select Country</option>
            {[...AFRICAN_COUNTRIES, 'Not based in Africa'].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </ABSelect>
          <ABInput
            label="Please tell us which country you are recruiting from. *"
            error={form2.formState.errors.recruitingFrom?.message}
            className={fieldClass}
            {...form2.register('recruitingFrom')}
          />
          <fieldset className="flex flex-col gap-3">
            <legend className="text-sm font-medium text-brand-text-dark">
              Because we are building for Africa, we are most likely to advertise this role to our African audience. Are
              you okay with hiring people living in Africa into this role? *
            </legend>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" value="yes" {...form2.register('hireAfrica')} className="accent-brand-primary" /> Yes
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" value="no" {...form2.register('hireAfrica')} className="accent-brand-primary" /> No
              </label>
            </div>
            {form2.formState.errors.hireAfrica && (
              <p className="text-xs text-red-600">{form2.formState.errors.hireAfrica.message}</p>
            )}
          </fieldset>
          <ABInput label="State/Region *" error={form2.formState.errors.stateRegion?.message} className={fieldClass} {...form2.register('stateRegion')} />
          <div className="flex gap-4">
            <ABButton type="button" variant="outline" size="md" onClick={() => setStep(1)} className="rounded-md px-8 py-4">
              Previous
            </ABButton>
            <ABButton type="submit" variant="primary" size="md" className="rounded-md px-8 py-4" style={{ backgroundColor: '#E98852' }}>
              Next
            </ABButton>
          </div>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={form3.handleSubmit(onStep3)} noValidate className="flex flex-col gap-5">
          <input {...form3.register('honey')} type="text" className="hidden" tabIndex={-1} aria-hidden />
          <SectionTitle>PART C: Job Vacancy Details Cont&apos;d</SectionTitle>
          <ABSelect label="Job Category *" error={form3.formState.errors.jobCategory?.message} className={fieldClass} {...form3.register('jobCategory')}>
            <option value="">Select a category</option>
            {JOB_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </ABSelect>
          <ABSelect label="Job type *" error={form3.formState.errors.jobType?.message} className={fieldClass} {...form3.register('jobType')}>
            <option value="">Select a type</option>
            {JOB_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </ABSelect>
          <fieldset className="flex flex-col gap-3">
            <legend className="text-sm font-medium text-brand-text-dark">Is this role a remote opportunity? *</legend>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" value="yes" {...form3.register('isRemote')} className="accent-brand-primary" /> Yes
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" value="no" {...form3.register('isRemote')} className="accent-brand-primary" /> No
              </label>
            </div>
          </fieldset>
          <ABInput
            label="Number of openings for this position *"
            type="number"
            error={form3.formState.errors.openings?.message}
            className={fieldClass}
            {...form3.register('openings')}
          />
          <ABInput
            label="Pay range *"
            error={form3.formState.errors.payRange?.message}
            className={fieldClass}
            {...form3.register('payRange')}
          />
          <p className="-mt-3 text-sm text-[#384958]">in USD equivalent</p>
          <fieldset className="flex flex-col gap-3">
            <legend className="text-sm font-medium text-brand-text-dark">Is this paid using Bitcoin? *</legend>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" value="yes" {...form3.register('paidInBitcoin')} className="accent-brand-primary" /> Yes
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" value="no" {...form3.register('paidInBitcoin')} className="accent-brand-primary" /> No
              </label>
            </div>
          </fieldset>
          <ABInput
            label="Application Email/URL *"
            error={form3.formState.errors.applicationUrl?.message}
            className={fieldClass}
            {...form3.register('applicationUrl')}
          />
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" {...form3.register('newsletter')} className="mt-1 h-4 w-4 accent-brand-primary" />
            <span className="text-sm text-brand-text-mid">
              I would like to receive the latest news, resources, and updates about Bitcoin.
            </span>
          </label>
          <div className="flex gap-4">
            <ABButton type="button" variant="outline" size="md" onClick={() => setStep(2)} className="rounded-md px-8 py-4">
              Previous
            </ABButton>
            <ABButton
              type="submit"
              variant="primary"
              size="md"
              disabled={isLoading}
              className="rounded-md px-[90px] py-6"
              style={{ backgroundColor: '#E98852' }}
            >
              {isLoading ? 'Submitting…' : 'Submit'}
            </ABButton>
          </div>
        </form>
      )}
    </FormShell>
  )
}
