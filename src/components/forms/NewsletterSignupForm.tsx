'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ABInput, ABSelect } from '@/components/ui/ab-form-fields'
import { ABButton } from '@/components/ui/ab-button'
import { FormShell } from './FormShell'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { AFRICAN_COUNTRIES } from './africanCountries'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  country: z.string().min(1, 'Please select your country'),
  honey: z.string().max(0),
})
type Fields = z.infer<typeof schema>

type NewsletterSignupFormProps = {
  variant?: 'default' | 'page'
  submitLabel?: string
  namePlaceholder?: string
  emailPlaceholder?: string
  countryLabel?: string
  countryPlaceholder?: string
  fullWidthButton?: boolean
}

const pageFieldClass =
  'w-full rounded border border-[#38495833] bg-[#FFFBF8] px-3 py-3 text-base text-[#384958] placeholder:text-[#38495833] outline-none transition-colors focus:border-[#E1640C] md:h-[50px]'

function PageFieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="mb-1 block font-sans text-base font-bold text-[#603913]">
      {children}
      {required && <span className="text-red-600"> *</span>}
    </label>
  )
}

export function NewsletterSignupForm({
  variant = 'default',
  submitLabel = 'Subscribe Free',
  namePlaceholder = 'Amara Diallo',
  emailPlaceholder = 'amara@example.com',
  countryLabel = 'Country',
  countryPlaceholder = 'Select your country',
  fullWidthButton = false,
}: NewsletterSignupFormProps = {}) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { honey: '', country: variant === 'page' ? 'Algeria' : '' },
  })
  const { submit, isLoading, isSuccess, errorMsg, successMessage } = useFormSubmit({
    formType: 'newsletter-signup',
    formSlug: 'newsletter-signup',
    onSuccess: () => reset(),
  })

  if (variant === 'page') {
    return (
      <FormShell
        isSuccess={isSuccess}
        successMessage={successMessage}
        errorMsg={errorMsg}
        className="text-left"
      >
        <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-1">
          <input {...register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />

          <div className="mb-1">
            <PageFieldLabel required>Name</PageFieldLabel>
            <input type="text" placeholder={namePlaceholder} className={pageFieldClass} {...register('name')} />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
          </div>

          <div className="mb-1">
            <PageFieldLabel required>Email</PageFieldLabel>
            <input type="email" placeholder={emailPlaceholder} className={pageFieldClass} {...register('email')} />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>

          <div className="mb-1">
            <PageFieldLabel required>{countryLabel}</PageFieldLabel>
            <select className={`${pageFieldClass} cursor-pointer`} {...register('country')}>
              {countryPlaceholder ? <option value="">{countryPlaceholder}</option> : null}
              {AFRICAN_COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.country && <p className="mt-1 text-xs text-red-600">{errors.country.message}</p>}
          </div>

          <div className="mt-5 text-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`rounded-md px-6 py-[15px] font-sans text-[17px] font-bold text-white shadow-[1px_4px_8px_rgba(0,0,0,0.2)] transition-colors hover:bg-[#253343] disabled:opacity-60 md:py-[30px] ${fullWidthButton ? 'w-full md:w-1/2' : 'md:w-1/2'}`}
              style={{ backgroundColor: '#E1640C' }}
            >
              {isLoading ? 'Subscribing…' : submitLabel}
            </button>
          </div>
        </form>
      </FormShell>
    )
  }

  return (
    <FormShell isSuccess={isSuccess} successMessage={successMessage} errorMsg={errorMsg}>
      <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-5">
        <input {...register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />
        <ABInput label="Your Name" placeholder={namePlaceholder} error={errors.name?.message} {...register('name')} />
        <ABInput label="Email Address" type="email" placeholder={emailPlaceholder} error={errors.email?.message} {...register('email')} />
        <ABSelect label={countryLabel} error={errors.country?.message} {...register('country')}>
          <option value="">{countryPlaceholder}</option>
          {AFRICAN_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </ABSelect>
        <ABButton
          type="submit"
          variant="primary"
          size="md"
          disabled={isLoading}
          className={fullWidthButton ? 'w-full' : 'self-start'}
        >
          {isLoading ? 'Subscribing…' : submitLabel}
        </ABButton>
      </form>
    </FormShell>
  )
}
