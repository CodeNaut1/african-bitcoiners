'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ABButton } from '@/components/ui/ab-button'
import { ABInput, ABSelect } from '@/components/ui/ab-form-fields'
import { AFRICAN_COUNTRIES } from './africanCountries'

const HOW_HEARD = [
  'From a friend',
  'From your website',
  'Twitter',
  'iPayBTC',
  'Citrusrate',
  'Google',
  'Facebook',
  'Instagram',
  'LinkedIn',
  'Followed a link',
  'Other',
]

const schema = z
  .object({
    name: z.string().min(2, 'Name required'),
    email: z.string().email('Valid email required'),
    emailConfirm: z.string().email('Valid email required'),
    country: z.string().min(1, 'Country required'),
    howHeard: z.string().optional(),
    source: z.string().optional(),
    newsletter: z.boolean().optional(),
    honey: z.string().max(0),
  })
  .refine((d) => d.email === d.emailConfirm, {
    message: 'Emails must match',
    path: ['emailConfirm'],
  })

type Fields = z.infer<typeof schema>

export function JobsUpskillForm() {
  const router = useRouter()
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { honey: '', newsletter: false },
  })

  async function onSubmit(data: Fields) {
    setErrorMsg('')
    const res = await fetch('/api/course/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        country: data.country,
        howHeard: data.howHeard || data.source,
        courseLang: 'English',
        deliveryMethod: 'email',
        honey: data.honey,
      }),
    })
    const json = (await res.json()) as { redirectUrl?: string; message?: string }
    if (json.redirectUrl) {
      router.push(json.redirectUrl)
      return
    }
    if (res.ok) {
      setIsSuccess(true)
      reset()
    } else {
      setErrorMsg('Something went wrong. Please try again.')
    }
  }

  if (isSuccess) {
    return (
      <div className="py-10 text-center">
        <p className="text-lg font-semibold text-brand-secondary">You&apos;re signed up!</p>
        <p className="mt-2 text-sm text-brand-text-mid">Check your inbox for your first lesson.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <input {...register('honey')} type="text" className="hidden" tabIndex={-1} aria-hidden />
      <ABInput label="Name or Nym *" placeholder="Your name" error={errors.name?.message} {...register('name')} />
      <ABInput
        label="Email address *"
        type="email"
        placeholder="Your email address"
        error={errors.email?.message}
        {...register('email')}
      />
      <ABInput
        label="Confirm email address *"
        type="email"
        placeholder="Confirm email address"
        error={errors.emailConfirm?.message}
        {...register('emailConfirm')}
      />
      <ABSelect label="What African Country are you from? *" error={errors.country?.message} {...register('country')}>
        <option value="">Select a Country/Continent</option>
        {AFRICAN_COUNTRIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </ABSelect>
      <ABSelect label="How did you hear about the course?" {...register('howHeard')}>
        <option value="">Select an option</option>
        {HOW_HEARD.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </ABSelect>
      <ABInput label="Please tell us the source" placeholder="" {...register('source')} />
      <label className="flex items-start gap-3 cursor-pointer">
        <input type="checkbox" {...register('newsletter')} className="mt-1 h-4 w-4 accent-brand-primary" />
        <span className="text-sm text-brand-text-mid">
          I would like to receive latest news, resources and updates about Bitcoin in Africa.
        </span>
      </label>
      {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}
      <div className="mt-4 flex justify-center">
        <ABButton
          type="submit"
          variant="primary"
          size="md"
          disabled={isSubmitting}
          className="rounded-md px-[90px] py-6 text-lg font-semibold"
          style={{ backgroundColor: '#E98852' }}
        >
          {isSubmitting ? 'Submitting…' : 'Start the Course!'}
        </ABButton>
      </div>
    </form>
  )
}
