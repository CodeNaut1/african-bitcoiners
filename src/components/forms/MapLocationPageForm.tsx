'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ABInput, ABTextarea } from '@/components/ui/ab-form-fields'
import { FormShell } from './FormShell'
import { useFormSubmit } from '@/hooks/useFormSubmit'

const schema = z.object({
  merchantName: z.string().min(2, 'Required'),
  description: z.string().min(10, 'Required'),
  website: z.string().min(1, 'Required'),
  address: z.string().min(5, 'Required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  socialMedia: z.string().optional(),
  acceptsLightning: z.enum(['Yes', 'No'], { required_error: 'Required' }),
  message: z.string().optional(),
  newsletter: z.boolean().optional(),
  honey: z.string().max(0),
})

type Fields = z.infer<typeof schema>

export function MapLocationPageForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { honey: '', newsletter: false },
  })
  const { submit, isLoading, isSuccess, errorMsg, successMessage } = useFormSubmit({
    formType: 'map-location',
    formSlug: 'map-location',
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
        <ABInput label="Merchant's Name *" error={errors.merchantName?.message} {...register('merchantName')} />
        <ABTextarea label="Business description *" rows={3} error={errors.description?.message} {...register('description')} />
        <ABInput label="Website URL *" error={errors.website?.message} {...register('website')} />
        <ABInput label="Merchant's address *" error={errors.address?.message} {...register('address')} />
        <div className="grid gap-5 sm:grid-cols-2">
          <ABInput label="Merchant's email *" type="email" error={errors.email?.message} {...register('email')} />
          <ABInput label="Merchant's phone number" {...register('phone')} />
        </div>
        <ABInput label="Social media handles" {...register('socialMedia')} />
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-brand-text-dark">
            Does this merchant accept lightning payments? <span className="text-brand-primary">*</span>
          </legend>
          <div className="flex gap-6">
            {(['Yes', 'No'] as const).map((val) => (
              <label key={val} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value={val}
                  {...register('acceptsLightning')}
                  className="h-4 w-4 accent-[#E1640C]"
                />
                <span className="text-sm text-brand-text-dark">{val}</span>
              </label>
            ))}
          </div>
          {errors.acceptsLightning && <p className="text-xs text-red-600">{errors.acceptsLightning.message}</p>}
        </fieldset>
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
          className="mx-auto mt-2 w-full max-w-md rounded-lg px-6 py-4 text-[17px] font-bold text-white shadow-[1px_4px_8px_rgba(0,0,0,0.2)] transition-colors hover:bg-[#253343] disabled:opacity-60 sm:w-1/2"
          style={{ backgroundColor: '#E1640C' }}
        >
          {isLoading ? 'Submitting…' : 'Share'}
        </button>
      </form>
    </FormShell>
  )
}
