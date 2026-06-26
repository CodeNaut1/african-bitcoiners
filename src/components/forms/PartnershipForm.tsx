'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@/utilities/ui'
import { ABInput, ABSelect, ABTextarea } from '@/components/ui/ab-form-fields'
import { ABButton } from '@/components/ui/ab-button'
import { FormShell } from './FormShell'
import { useFormSubmit } from '@/hooks/useFormSubmit'

const CREAM_FIELD = 'bg-[#FFFAF2] border-[#E8E0D4]'

const schema = z
  .object({
    organizationName: z.string().min(2, 'Organisation name required'),
    website: z.string().min(1, 'Website or social link required'),
    contactName: z.string().min(2, 'Contact person required'),
    contactEmail: z.string().email('Valid email required'),
    contactEmailConfirm: z.string().email('Valid email required'),
    package: z.enum(['free', 'advance', 'premium'], { required_error: 'Please select a package' }),
    message: z.string().optional(),
    honey: z.string().max(0),
  })
  .refine((data) => data.contactEmail === data.contactEmailConfirm, {
    message: 'Emails must match',
    path: ['contactEmailConfirm'],
  })

type Fields = z.infer<typeof schema>

type Props = {
  variant?: 'default' | 'page'
}

export function PartnershipForm({ variant = 'default' }: Props) {
  const isPage = variant === 'page'

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { honey: '' },
  })
  const { submit, isLoading, isSuccess, errorMsg } = useFormSubmit({
    formType: 'partnership-inquiry',
    onSuccess: () => reset(),
  })

  function onSubmit(data: Fields) {
    const tier =
      data.package === 'advance' ? 'advanced' : data.package === 'premium' ? 'premium' : 'basic'

    submit({
      organizationName: data.organizationName,
      website: data.website,
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      email: data.contactEmail,
      package: data.package,
      tier,
      message: data.message,
      description: data.message || `Package: ${data.package}`,
    })
  }

  const fieldClass = isPage ? CREAM_FIELD : undefined

  return (
    <FormShell
      isSuccess={isSuccess}
      successMessage="Application received! Our partnerships team will be in touch within 48 hours."
      errorMsg={errorMsg}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        <input {...register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />
        {!isPage && (
          <p className="text-xs text-brand-text-muted">
            <span className="text-red-600">*</span> indicates required fields
          </p>
        )}
        <ABInput
          label="Name of organization *"
          placeholder="Your organisation"
          error={errors.organizationName?.message}
          className={fieldClass}
          {...register('organizationName')}
        />
        <ABInput
          label="Website/Social Media Link *"
          placeholder="https://example.com or @handle"
          error={errors.website?.message}
          className={fieldClass}
          {...register('website')}
        />
        <ABInput
          label="Contact person *"
          placeholder="Your name"
          error={errors.contactName?.message}
          className={fieldClass}
          {...register('contactName')}
        />
        <div>
          <p className="mb-1.5 text-sm font-medium text-brand-text-dark">Contact person&apos;s email *</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <ABInput
              type="email"
              placeholder="Enter Email"
              error={errors.contactEmail?.message}
              className={fieldClass}
              {...register('contactEmail')}
            />
            <ABInput
              type="email"
              placeholder="Confirm Email"
              error={errors.contactEmailConfirm?.message}
              className={fieldClass}
              {...register('contactEmailConfirm')}
            />
          </div>
        </div>
        <ABSelect
          label="What package are you interested in? *"
          error={errors.package?.message}
          className={fieldClass}
          {...register('package')}
        >
          <option value="">Choose one</option>
          <option value="free">Free</option>
          <option value="advance">Advance</option>
          <option value="premium">Premium</option>
        </ABSelect>
        <ABTextarea
          label="Message"
          rows={4}
          placeholder="Tell us about your organisation and goals..."
          error={errors.message?.message}
          className={fieldClass}
          {...register('message')}
        />
        <ABButton
          type="submit"
          variant="primary"
          size="md"
          disabled={isLoading}
          className={cn(isPage ? 'w-full justify-center py-4' : 'self-start')}
        >
          {isLoading ? 'Submitting…' : 'Submit'}
        </ABButton>
      </form>
    </FormShell>
  )
}
