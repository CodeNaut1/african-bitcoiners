'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ABInput, ABSelect, ABTextarea } from '@/components/ui/ab-form-fields'
import { FormShell } from './FormShell'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { AFRICAN_COUNTRIES } from './africanCountries'

const schema = z
  .object({
    nomineeName: z.string().min(2, 'Required'),
    nomineeCountry: z.string().min(1, 'Required'),
    reason: z.string().min(20, 'Please explain their impact (min 20 characters)').max(2000),
    nomineeSocial: z.string().optional(),
    nominatorName: z.string().min(2, 'Required'),
    nominatorEmail: z.string().email('Valid email required'),
    nominatorEmailConfirm: z.string().email('Valid email required'),
    honey: z.string().max(0),
  })
  .refine((data) => data.nominatorEmail === data.nominatorEmailConfirm, {
    message: 'Emails must match',
    path: ['nominatorEmailConfirm'],
  })

type Fields = z.infer<typeof schema>

export function MiabNominationForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { honey: '' },
  })
  const { submit, isLoading, isSuccess, errorMsg, successMessage } = useFormSubmit({
    formType: 'miab-nomination',
    formSlug: 'miab-nomination',
    onSuccess: () => reset(),
  })

  return (
    <FormShell isSuccess={isSuccess} successMessage={successMessage} errorMsg={errorMsg}>
      <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-5">
        <input {...register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />
        <p className="text-sm text-brand-text-mid">
          <span className="text-brand-primary">*</span> indicates required fields
        </p>

        <ABInput
          label="Nominee's full name"
          required
          error={errors.nomineeName?.message}
          {...register('nomineeName')}
        />
        <ABSelect label="Nominee's country" required error={errors.nomineeCountry?.message} {...register('nomineeCountry')}>
          <option value="">Select a country</option>
          {AFRICAN_COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </ABSelect>
        <ABTextarea
          label="Why are they impactful? (Bitcoin work / Proof of Work)"
          required
          rows={6}
          maxLength={2000}
          error={errors.reason?.message}
          {...register('reason')}
        />
        <ABInput
          label="Nominee's social / website (optional)"
          error={errors.nomineeSocial?.message}
          {...register('nomineeSocial')}
        />

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-brand-text-dark">Your details</legend>
          <div className="flex flex-col gap-5">
            <ABInput
              label="Your name"
              required
              error={errors.nominatorName?.message}
              {...register('nominatorName')}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <ABInput
                label="Your email"
                type="email"
                required
                error={errors.nominatorEmail?.message}
                {...register('nominatorEmail')}
              />
              <ABInput
                label="Confirm email"
                type="email"
                required
                error={errors.nominatorEmailConfirm?.message}
                {...register('nominatorEmailConfirm')}
              />
            </div>
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={isLoading}
          className="mx-auto mt-2 w-full max-w-md rounded-[5px] px-10 py-6 text-base font-semibold text-white transition-colors hover:bg-[#384958] disabled:opacity-60 sm:w-1/2"
          style={{ backgroundColor: '#E98852' }}
        >
          {isLoading ? 'Submitting…' : 'Submit nomination'}
        </button>
      </form>
    </FormShell>
  )
}
