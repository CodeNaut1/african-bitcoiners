'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ABInput, ABTextarea, ABSelect } from '@/components/ui/ab-form-fields'
import { ABButton } from '@/components/ui/ab-button'
import { FormShell } from './FormShell'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { AFRICAN_COUNTRIES } from './africanCountries'
import { cn } from '@/utilities/ui'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  country: z.string().min(1, 'Please select your country'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  honey: z.string().max(0),
})

type Fields = z.infer<typeof schema>

const pageFieldClass =
  'w-full rounded border border-[#38495833] bg-[#FFFBF8] px-3 py-3 text-base text-[#384958] placeholder:text-[#384958] outline-none transition-colors focus:border-[#E1640C] md:h-[50px]'

function PageFieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="mb-1 block font-sans text-base font-bold" style={{ color: 'rgba(93,66,47,0.8)' }}>
      {children}
      {required && <span className="text-red-600"> *</span>}
    </label>
  )
}

type ContactFormProps = {
  variant?: 'default' | 'page'
}

export function ContactForm({ variant = 'default' }: ContactFormProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { honey: '', country: 'Algeria' },
  })

  const { submit, isLoading, isSuccess, errorMsg } = useFormSubmit({
    formType: 'contact-general',
    onSuccess: () => reset(),
  })

  if (variant === 'page') {
    return (
      <FormShell
        isSuccess={isSuccess}
        successMessage="Message sent! We'll get back to you within 48 hours."
        errorMsg={errorMsg}
        className="text-left"
      >
        <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-1">
          <input {...register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />

          <div className="mb-1">
            <PageFieldLabel required>Your name (or Nym if you wish to remain anonymous)</PageFieldLabel>
            <input
              type="text"
              placeholder="Your name"
              className={pageFieldClass}
              {...register('name')}
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
          </div>

          <div className="mb-1">
            <PageFieldLabel required>Email</PageFieldLabel>
            <input
              type="email"
              placeholder="Your email address"
              className={pageFieldClass}
              {...register('email')}
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>

          <div className="mb-1">
            <PageFieldLabel required>What African Country are you from?</PageFieldLabel>
            <select className={cn(pageFieldClass, 'cursor-pointer')} {...register('country')}>
              {AFRICAN_COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.country && <p className="mt-1 text-xs text-red-600">{errors.country.message}</p>}
          </div>

          <div className="mb-1">
            <PageFieldLabel required>Message</PageFieldLabel>
            <textarea
              rows={10}
              className={cn(pageFieldClass, 'min-h-[160px] h-auto resize-y py-3')}
              {...register('message')}
            />
            {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
          </div>

          <div className="mt-5 text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg px-6 py-4 font-sans text-[17px] font-bold text-white shadow-[1px_4px_8px_rgba(0,0,0,0.2)] transition-colors hover:bg-[#253343] disabled:opacity-60 md:w-1/2 md:py-[4%]"
              style={{ backgroundColor: '#E1640C' }}
            >
              {isLoading ? 'Sending…' : 'Submit'}
            </button>
          </div>
        </form>
      </FormShell>
    )
  }

  return (
    <FormShell isSuccess={isSuccess} successMessage="Message sent! We'll get back to you within 48 hours." errorMsg={errorMsg}>
      <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-5">
        <input {...register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />
        <ABInput label="Your Name" placeholder="Amara Diallo" error={errors.name?.message} {...register('name')} />
        <ABInput label="Email Address" type="email" placeholder="amara@example.com" error={errors.email?.message} {...register('email')} />
        <ABSelect label="Country" error={errors.country?.message} {...register('country')}>
          <option value="">Select your country</option>
          {AFRICAN_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </ABSelect>
        <ABTextarea label="Message" rows={5} placeholder="Tell us what's on your mind..." error={errors.message?.message} {...register('message')} />
        <ABButton type="submit" variant="primary" size="md" disabled={isLoading} className="self-start">
          {isLoading ? 'Sending…' : 'Send Message'}
        </ABButton>
      </form>
    </FormShell>
  )
}
