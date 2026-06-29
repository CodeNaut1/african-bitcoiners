'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ABInput, ABSelect } from '@/components/ui/ab-form-fields'
import { ABButton } from '@/components/ui/ab-button'
import { MSC_COUNTRIES } from '@/components/MillionSatChallengePage/data'
import { FormShell } from './FormShell'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { AFRICAN_COUNTRIES } from './africanCountries'

const baseSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  weeklySats: z.coerce.number().min(1, 'Please enter your weekly sats target'),
  country: z.string().min(1, 'Please select your country'),
  newsletterConsent: z.boolean().optional(),
  honey: z.string().max(0),
})

const mscSchema = baseSchema
  .extend({
    emailConfirm: z.string().email('Valid email required'),
  })
  .refine((data) => data.email === data.emailConfirm, {
    message: 'Emails do not match',
    path: ['emailConfirm'],
  })

type BaseFields = z.infer<typeof baseSchema>
type MscFields = z.infer<typeof mscSchema>

type Props = {
  variant?: 'default' | 'million-sat-challenge'
}

export function SavingsChallengeForm({ variant = 'default' }: Props) {
  const isMsc = variant === 'million-sat-challenge'

  const { register, handleSubmit, formState: { errors }, reset } = useForm<BaseFields | MscFields>({
    resolver: zodResolver(isMsc ? mscSchema : baseSchema),
    defaultValues: { honey: '', newsletterConsent: false },
  })
  const { submit, isLoading, isSuccess, errorMsg } = useFormSubmit({
    formType: 'savings-challenge',
    onSuccess: () => reset(),
  })

  const countries = isMsc ? MSC_COUNTRIES : AFRICAN_COUNTRIES

  return (
    <FormShell
      isSuccess={isSuccess}
      successMessage="Welcome to the Million Sat Challenge! Check your inbox for next steps."
      errorMsg={errorMsg}
    >
      <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-5">
        <input {...register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />

        {isMsc && (
          <p className="text-sm text-[#384958]/80">
            &quot;<span className="text-red-600">*</span>&quot; indicates required fields
          </p>
        )}

        <ABInput
          label={
            isMsc
              ? 'Your name (or nym if you wish to remain anonymous) *'
              : 'Your Name'
          }
          placeholder="Amara Diallo"
          error={errors.name?.message}
          {...register('name')}
        />

        {isMsc ? (
          <fieldset className="flex flex-col gap-4">
            <legend className="mb-1 text-sm font-medium text-[#384958]">Email *</legend>
            <ABInput
              label="Enter Email"
              type="email"
              placeholder="amara@example.com"
              error={errors.email?.message}
              {...register('email')}
            />
            <ABInput
              label="Confirm Email"
              type="email"
              placeholder="amara@example.com"
              error={'emailConfirm' in errors ? errors.emailConfirm?.message : undefined}
              {...register('emailConfirm' as keyof MscFields)}
            />
          </fieldset>
        ) : (
          <ABInput
            label="Email Address"
            type="email"
            placeholder="amara@example.com"
            error={errors.email?.message}
            {...register('email')}
          />
        )}

        <ABInput
          label={
            isMsc
              ? 'How many sats do you want to save weekly? *'
              : 'Weekly Sats Savings Target'
          }
          type="number"
          placeholder="10000"
          error={errors.weeklySats?.message}
          {...register('weeklySats')}
        />

        <ABSelect
          label={isMsc ? 'What African Country are you from? *' : 'Country'}
          error={errors.country?.message}
          {...register('country')}
        >
          <option value="">{isMsc ? 'Select a Country' : 'Select your country'}</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </ABSelect>

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-[#384958]">
            {isMsc ? 'Subscribe to our Weekly Newsletter' : undefined}
          </legend>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              {...register('newsletterConsent')}
              className="mt-1 h-4 w-4 rounded border-brand-border-light accent-brand-primary"
            />
            <span className="text-sm text-brand-text-mid">
              {isMsc
                ? 'I would like to receive latest news, resources and updates about Bitcoin'
                : 'Also subscribe me to the weekly Bitcoin newsletter'}
            </span>
          </label>
        </fieldset>

        <ABButton
          type="submit"
          variant="primary"
          size="md"
          disabled={isLoading}
          className={isMsc ? 'w-full justify-center' : 'self-start'}
        >
          {isLoading ? 'Submitting…' : isMsc ? 'Start Saving!' : 'Join the Challenge'}
        </ABButton>
      </form>
    </FormShell>
  )
}
