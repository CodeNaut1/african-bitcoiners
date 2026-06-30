'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ABInput, ABTextarea } from '@/components/ui/ab-form-fields'
import { ABButton } from '@/components/ui/ab-button'
import { FormShell } from './FormShell'
import { useFormSubmit } from '@/hooks/useFormSubmit'

const schema = z.object({
  merchantName: z.string().min(2, 'Merchant name required'),
  description: z.string().min(10, 'Brief description required'),
  website: z.string().url('Valid URL required').optional().or(z.literal('')),
  address: z.string().min(5, 'Address required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  acceptsLightning: z.boolean(),
  honey: z.string().max(0),
})
type Fields = z.infer<typeof schema>

export function MapLocationForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { honey: '', acceptsLightning: false },
  })
  const { submit, isLoading, isSuccess, errorMsg, successMessage } = useFormSubmit({ formType: 'map-location', formSlug: 'map-location', onSuccess: () => reset() })

  return (
    <FormShell isSuccess={isSuccess} successMessage={successMessage} errorMsg={errorMsg}>
      <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-5">
        <input {...register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />
        <ABInput label="Merchant / Business Name" placeholder="Bitcoin Café Lagos" error={errors.merchantName?.message} {...register('merchantName')} />
        <ABTextarea label="Description" rows={2} placeholder="What does this business do / sell?" error={errors.description?.message} {...register('description')} />
        <ABInput label="Website (optional)" placeholder="https://bitcoincafe.ng" error={errors.website?.message} {...register('website')} />
        <ABInput label="Address" placeholder="12 Bitcoin Street, Lagos, Nigeria" error={errors.address?.message} {...register('address')} />
        <div className="grid sm:grid-cols-2 gap-5">
          <ABInput label="Contact Email" type="email" placeholder="info@bitcoincafe.ng" error={errors.email?.message} {...register('email')} />
          <ABInput label="Phone (optional)" placeholder="+234 800 000 0000" {...register('phone')} />
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" {...register('acceptsLightning')} className="h-4 w-4 rounded border-brand-border-light accent-brand-primary" />
          <span className="text-sm text-brand-text-mid font-medium">Accepts Lightning Network payments</span>
        </label>
        <ABButton type="submit" variant="primary" size="md" disabled={isLoading} className="self-start">
          {isLoading ? 'Submitting…' : 'Add to Map'}
        </ABButton>
      </form>
    </FormShell>
  )
}
