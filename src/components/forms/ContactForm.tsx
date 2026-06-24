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

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  country: z.string().min(1, 'Please select your country'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  honey: z.string().max(0),
})

type Fields = z.infer<typeof schema>

export function ContactForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { honey: '' },
  })

  const { submit, isLoading, isSuccess, errorMsg } = useFormSubmit({
    formType: 'contact-general',
    onSuccess: () => reset(),
  })

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
