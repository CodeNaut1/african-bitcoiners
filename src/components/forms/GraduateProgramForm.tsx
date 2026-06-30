'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ABInput, ABSelect, ABTextarea } from '@/components/ui/ab-form-fields'
import { ABButton } from '@/components/ui/ab-button'
import { FormShell } from './FormShell'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { AFRICAN_COUNTRIES } from './africanCountries'

const schema = z
  .object({
    name: z.string().min(2, 'Name required'),
    email: z.string().email('Valid email required'),
    emailConfirm: z.string().email('Valid email required'),
    country: z.string().min(1, 'Country required'),
    ageConfirm: z.literal(true, { errorMap: () => ({ message: 'Required' }) }),
    applicationConfirm: z.literal(true, { errorMap: () => ({ message: 'Required' }) }),
    qualification: z.string().min(2, 'Required'),
    skills: z.string().min(10, 'Please describe your skills'),
    whyWorkWithUs: z.string().min(20, 'Required'),
    whyBitcoin: z.string().min(20, 'Required'),
    usefulWays: z.string().min(20, 'Required'),
    projectLink: z.string().optional(),
    twitter: z.string().optional(),
    nostr: z.string().optional(),
    linkedin: z.string().optional(),
    newsletter: z.boolean().optional(),
    honey: z.string().max(0),
  })
  .refine((data) => data.email === data.emailConfirm, {
    message: 'Emails must match',
    path: ['emailConfirm'],
  })

type Fields = z.infer<typeof schema>

export function GraduateProgramForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { honey: '', newsletter: false },
  })
  const { submit, isLoading, isSuccess, errorMsg, successMessage } = useFormSubmit({
    formType: 'graduate-programme',
    formSlug: 'graduate-program',
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
        <ABInput label="Your Name (or Nym if you feel more comfortable being anonymous) *" error={errors.name?.message} className="bg-[#F9F7F0] border-[#E8E0D4]" {...register('name')} />
        <div className="grid gap-5 sm:grid-cols-2">
          <ABInput label="Contact email *" type="email" placeholder="Enter Email" error={errors.email?.message} {...register('email')} />
          <ABInput label="Confirm Email *" type="email" placeholder="Confirm Email" error={errors.emailConfirm?.message} {...register('emailConfirm')} />
        </div>
        <ABSelect label="African country of residence *" error={errors.country?.message} {...register('country')}>
          <option value="">Select Country</option>
          {AFRICAN_COUNTRIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </ABSelect>
        <label className="flex items-start gap-3">
          <input type="checkbox" {...register('ageConfirm')} className="mt-1 h-4 w-4 accent-[#E1640C]" />
          <span className="text-sm text-[#384958]">I am aged 18-30 and living in Africa. *</span>
        </label>
        {errors.ageConfirm && <p className="text-xs text-red-600">{errors.ageConfirm.message}</p>}
        <label className="flex items-start gap-3">
          <input type="checkbox" {...register('applicationConfirm')} className="mt-1 h-4 w-4 accent-[#E1640C]" />
          <span className="text-sm text-[#384958]">I have not applied for this role in the past 6 months. *</span>
        </label>
        {errors.applicationConfirm && <p className="text-xs text-red-600">{errors.applicationConfirm.message}</p>}
        <ABInput label="Highest Qualification *" error={errors.qualification?.message} {...register('qualification')} />
        <ABTextarea label="Any relevant skills/background? *" rows={3} error={errors.skills?.message} {...register('skills')} />
        <ABTextarea label="Please explain why you want to work with us *" rows={3} error={errors.whyWorkWithUs?.message} {...register('whyWorkWithUs')} />
        <ABTextarea label="Why do you want to work in Bitcoin? *" rows={3} error={errors.whyBitcoin?.message} {...register('whyBitcoin')} />
        <ABTextarea label="Ways you think you can be useful to the team? *" rows={3} error={errors.usefulWays?.message} {...register('usefulWays')} />
        <ABInput label="Link to any project you think might interest us" error={errors.projectLink?.message} {...register('projectLink')} />
        <div className="grid gap-5 sm:grid-cols-3">
          <ABInput label="Twitter (optional)" {...register('twitter')} />
          <ABInput label="Nostr (optional)" {...register('nostr')} />
          <ABInput label="LinkedIn (optional)" {...register('linkedin')} />
        </div>
        <label className="flex items-start gap-3">
          <input type="checkbox" {...register('newsletter')} className="mt-1 h-4 w-4 accent-[#E1640C]" />
          <span className="text-sm text-[#384958]">I would like to receive latest news, resources and updates about Bitcoin in Africa.</span>
        </label>
        <ABButton type="submit" variant="primary" size="md" disabled={isLoading} className="self-start">
          {isLoading ? 'Submitting…' : 'Apply'}
        </ABButton>
      </form>
    </FormShell>
  )
}
