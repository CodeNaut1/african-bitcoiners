'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ABInput, ABSelect } from '@/components/ui/ab-form-fields'
import { FormShell } from './FormShell'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { AFRICAN_COUNTRIES } from './africanCountries'

const COUNTRY_OPTIONS = [
  ...AFRICAN_COUNTRIES.filter((c) => c !== 'Other'),
  'Africa',
  'Antarctica',
  'Asia',
  'Australia',
  'Europe',
  'North America',
  'South America',
  'Other',
]

const schema = z.object({
  name: z.string().min(2, 'Required'),
  email: z.string().email('Valid email required'),
  country: z.string().min(1, 'Required'),
  honey: z.string().max(0),
})

type Fields = z.infer<typeof schema>

type Props = {
  role: string
}

export function JobApplicationSignUpForm({ role }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { honey: '' },
  })

  const { submit, isLoading, isSuccess, errorMsg } = useFormSubmit({
    formType: 'job-application-signup',
    onSuccess: () => reset(),
  })

  const onSubmit = handleSubmit((data) => {
    submit({ ...data, role })
  })

  return (
    <FormShell
      isSuccess={isSuccess}
      successMessage="Thanks for signing up! Our team will be in touch."
      errorMsg={errorMsg}
    >
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        <input {...register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />
        <p className="text-sm text-brand-text-mid">
          <span className="text-brand-primary">*</span> indicates required fields
        </p>
        <ABInput
          label="Name *"
          placeholder="Your name (or Nym)"
          error={errors.name?.message}
          {...register('name')}
        />
        <ABInput
          label="Email *"
          type="email"
          placeholder="Your email address"
          error={errors.email?.message}
          {...register('email')}
        />
        <ABSelect label="What African Country are you from? *" error={errors.country?.message} {...register('country')}>
          <option value="">Select a Country/Continent</option>
          {COUNTRY_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </ABSelect>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-[5px] px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-[#384958] disabled:opacity-60"
          style={{ backgroundColor: '#E98852' }}
        >
          {isLoading ? 'Submitting…' : 'Sign me up!'}
        </button>
      </form>
    </FormShell>
  )
}
