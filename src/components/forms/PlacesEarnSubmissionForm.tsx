'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ABInput, ABTextarea } from '@/components/ui/ab-form-fields'
import { FormShell } from './FormShell'
import { useFormSubmit } from '@/hooks/useFormSubmit'

const schema = z
  .object({
    companyName: z.string().min(2, 'Required'),
    website: z.string().min(1, 'Required'),
    description: z.string().min(10, 'Required').max(500, 'Maximum 500 characters'),
    contactEmail: z.string().email('Valid email required'),
    contactEmailConfirm: z.string().email('Valid email required'),
    newsletter: z.boolean().optional(),
    honey: z.string().max(0),
  })
  .refine((data) => data.contactEmail === data.contactEmailConfirm, {
    message: 'Emails must match',
    path: ['contactEmailConfirm'],
  })

type Fields = z.infer<typeof schema>

export function PlacesEarnSubmissionForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { honey: '', newsletter: false },
  })
  const { submit, isLoading, isSuccess, errorMsg } = useFormSubmit({
    formType: 'places-earn',
    onSuccess: () => reset(),
  })

  return (
    <FormShell
      isSuccess={isSuccess}
      successMessage="Thank you! We'll review your submission and add it to the list if it fits."
      errorMsg={errorMsg}
    >
      <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-5">
        <input {...register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />
        <p className="text-sm text-brand-text-mid">
          <span className="text-brand-primary">*</span> indicates required fields
        </p>
        <ABInput
          label="Company/Platform's Name"
          required
          error={errors.companyName?.message}
          {...register('companyName')}
        />
        <ABInput label="Website URL" required error={errors.website?.message} {...register('website')} />
        <ABTextarea
          label="Brief Description (how to earn)"
          required
          rows={6}
          maxLength={500}
          error={errors.description?.message}
          {...register('description')}
        />
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-brand-text-dark">
            Contact email <span className="text-brand-primary">*</span>
          </legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <ABInput
              label="Enter Email"
              type="email"
              error={errors.contactEmail?.message}
              {...register('contactEmail')}
            />
            <ABInput
              label="Confirm Email"
              type="email"
              error={errors.contactEmailConfirm?.message}
              {...register('contactEmailConfirm')}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-brand-text-dark">Subscribe for our Weekly Newsletter,</legend>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register('newsletter')}
              className="mt-1 h-4 w-4 rounded border-brand-border-light accent-[#E98852]"
            />
            <span className="text-sm text-brand-text-mid">
              I would like to receive latest news, resources and updates about Bitcoin
            </span>
          </label>
        </fieldset>
        <button
          type="submit"
          disabled={isLoading}
          className="mx-auto mt-2 w-full max-w-md rounded-[5px] px-10 py-6 text-base font-semibold text-white transition-colors hover:bg-[#384958] disabled:opacity-60 sm:w-1/2"
          style={{ backgroundColor: '#E98852' }}
        >
          {isLoading ? 'Submitting…' : 'Submit'}
        </button>
      </form>
    </FormShell>
  )
}
