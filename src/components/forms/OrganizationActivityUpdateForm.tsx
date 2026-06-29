'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ABInput } from '@/components/ui/ab-form-fields'
import { FormShell } from './FormShell'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { ACTIVITY_OPTIONS } from '@/components/OrganizationActivityUpdatePage/data'

const schema = z.object({
  organizationName: z.string().min(2, 'Organization name is required'),
  stillActive: z.enum(['Yes, we are active', 'No, we are no longer active'], {
    required_error: 'Please select an option',
  }),
  honey: z.string().max(0),
})

type Fields = z.infer<typeof schema>

function RequiredLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-sm font-medium text-brand-text-dark">
      {children}
      <span className="font-normal text-brand-text-muted">
        {' '}
        <span className="text-red-600">(Required)</span>
      </span>
    </span>
  )
}

export function OrganizationActivityUpdateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { honey: '' },
  })

  const { submit, isLoading, isSuccess, errorMsg } = useFormSubmit({
    formType: 'organization-activity-update',
    onSuccess: () => reset(),
  })

  return (
    <FormShell
      isSuccess={isSuccess}
      successMessage="Thanks for contacting us! We will get in touch with you shortly."
      errorMsg={errorMsg}
    >
      <form
        onSubmit={handleSubmit((data) =>
          submit({
            organizationName: data.organizationName,
            stillActive: data.stillActive,
          }),
        )}
        noValidate
        className="flex flex-col gap-6"
      >
        <input {...register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />

        <div>
          <label htmlFor="organizationName" className="mb-1.5 block">
            <RequiredLabel>Organization Name</RequiredLabel>
          </label>
          <ABInput
            id="organizationName"
            error={errors.organizationName?.message}
            {...register('organizationName')}
          />
        </div>

        <fieldset>
          <legend className="mb-3 block">
            <RequiredLabel>Are you still active as a Bitcoin-focused organization?</RequiredLabel>
          </legend>
          <div className="flex flex-col gap-3">
            {ACTIVITY_OPTIONS.map(({ value, label }) => (
              <label key={value} className="flex cursor-pointer items-center gap-2.5 text-sm text-brand-text-dark">
                <input
                  type="radio"
                  value={value}
                  {...register('stillActive')}
                  className="h-4 w-4 accent-brand-primary"
                />
                {label}
              </label>
            ))}
          </div>
          {errors.stillActive && <p className="mt-1.5 text-xs text-red-600">{errors.stillActive.message}</p>}
        </fieldset>

        <button
          type="submit"
          disabled={isLoading}
          className="w-[100px] rounded px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#253343] disabled:opacity-60"
          style={{ backgroundColor: '#E1640C' }}
        >
          {isLoading ? '…' : 'Submit'}
        </button>
      </form>
    </FormShell>
  )
}
