'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormShell } from './FormShell'
import { useFormSubmit } from '@/hooks/useFormSubmit'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email required'),
  newsletterConsent: z.boolean().optional(),
  honey: z.string().max(0),
})

type Fields = z.infer<typeof schema>

const fieldClass =
  'w-full rounded border border-[#551E1E33] bg-white px-4 py-2.5 text-base text-[#261B01] placeholder:text-[#551E1E] outline-none focus:border-[#FFA500]'

export function BitcoinForHerForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { honey: '', newsletterConsent: false },
  })
  const { submit, isLoading, isSuccess, errorMsg, successMessage } = useFormSubmit({
    formType: 'bitcoin-for-her',
    onSuccess: () => reset(),
  })

  return (
    <FormShell
      isSuccess={isSuccess}
      successMessage={successMessage}
      errorMsg={errorMsg}
      className="text-left"
    >
      <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-3">
        <input {...register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />

        <p className="mb-2 text-center text-sm text-white/80">
          &quot;<span className="text-[#FFA500]">*</span>&quot; indicates required fields
        </p>

        <div>
          <input
            type="text"
            placeholder="Your name (or Nym)"
            className={fieldClass}
            aria-required
            {...register('name')}
          />
          {errors.name && <p className="mt-1 text-xs text-red-300">{errors.name.message}</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder="Your email address"
            className={fieldClass}
            aria-required
            {...register('email')}
          />
          {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email.message}</p>}
        </div>

        <fieldset className="mt-1">
          <legend className="mb-2 text-sm font-medium text-white">Subscribe to our Weekly Newsletter</legend>
          <label className="flex cursor-pointer items-start gap-2 text-sm text-white">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 shrink-0 accent-[#FFA500]"
              {...register('newsletterConsent')}
            />
            <span>I would like to receive latest news, resources and updates about Bitcoin</span>
          </label>
        </fieldset>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 w-full rounded py-3 text-base font-semibold text-[#261B01] transition-colors hover:bg-[#553700] hover:text-white disabled:opacity-60"
          style={{ backgroundColor: '#FFA500' }}
        >
          {isLoading ? 'Submitting…' : 'Sign me up!'}
        </button>
      </form>
    </FormShell>
  )
}
