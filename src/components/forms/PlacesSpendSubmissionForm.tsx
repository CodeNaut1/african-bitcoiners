'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ABInput, ABSelect, ABTextarea } from '@/components/ui/ab-form-fields'
import { FormShell } from './FormShell'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { AFRICAN_COUNTRIES } from './africanCountries'

const schema = z.object({
  merchantName: z.string().min(2, 'Required'),
  description: z.string().min(10, 'Required'),
  country: z.string().min(1, 'Required'),
  website: z.string().min(1, 'Required'),
  acceptsLightning: z.enum(['Yes', 'No'], { required_error: 'Required' }),
  contactEmail: z.string().email('Valid email required'),
  message: z.string().optional(),
  newsletter: z.boolean().optional(),
  honey: z.string().max(0),
})

type Fields = z.infer<typeof schema>

export function PlacesSpendSubmissionForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { honey: '', newsletter: false },
  })
  const { submit, isLoading, isSuccess, errorMsg, successMessage } = useFormSubmit({
    formType: 'places-spend',
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
        <p className="text-sm text-brand-text-mid">
          <span className="text-brand-primary">*</span> indicates required fields
        </p>
        <ABInput label="Merchant/Platform's Name *" error={errors.merchantName?.message} {...register('merchantName')} />
        <ABTextarea
          label="Business Description (what they do) *"
          rows={3}
          error={errors.description?.message}
          {...register('description')}
        />
        <ABSelect label="Country *" error={errors.country?.message} {...register('country')}>
          <option value="">Select a Country</option>
          <option value="African Wide">African Wide</option>
          {AFRICAN_COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </ABSelect>
        <ABInput label="Website URL (or any contact link) *" error={errors.website?.message} {...register('website')} />
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-brand-text-dark">
            Does this online merchant accept lightning payments? <span className="text-brand-primary">*</span>
          </legend>
          <div className="flex gap-6">
            {(['Yes', 'No'] as const).map((val) => (
              <label key={val} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value={val} {...register('acceptsLightning')} className="h-4 w-4 accent-[#E1640C]" />
                <span className="text-sm text-brand-text-dark">{val}</span>
              </label>
            ))}
          </div>
          {errors.acceptsLightning && <p className="text-xs text-red-600">{errors.acceptsLightning.message}</p>}
        </fieldset>
        <ABInput label="Contact email *" type="email" error={errors.contactEmail?.message} {...register('contactEmail')} />
        <ABTextarea label="Message" rows={4} {...register('message')} />
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-brand-text-dark">Subscribe to our Weekly Newsletter.</legend>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" {...register('newsletter')} className="mt-1 h-4 w-4 accent-[#E1640C]" />
            <span className="text-sm text-brand-text-mid">
              I would like to receive latest news, resources and updates about Bitcoin
            </span>
          </label>
        </fieldset>
        <button
          type="submit"
          disabled={isLoading}
          className="mx-auto mt-2 w-full max-w-md rounded-lg px-6 py-4 text-[17px] font-bold text-white transition-colors hover:bg-[#F9F7F0] hover:text-[#E1640C] disabled:opacity-60 sm:w-1/2"
          style={{ backgroundColor: '#E1640C' }}
        >
          {isLoading ? 'Submitting…' : 'Share'}
        </button>
      </form>
    </FormShell>
  )
}
