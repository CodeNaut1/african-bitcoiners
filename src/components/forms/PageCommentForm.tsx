'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ABInput, ABTextarea } from '@/components/ui/ab-form-fields'
import { FormShell } from './FormShell'
import { useFormSubmit } from '@/hooks/useFormSubmit'

const schema = z.object({
  comment: z.string().min(3, 'Comment required'),
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  website: z.string().optional(),
  saveInfo: z.boolean().optional(),
  honey: z.string().max(0),
  pageSlug: z.string().optional(),
})

type Fields = z.infer<typeof schema>

type Props = {
  pageSlug?: string
}

export function PageCommentForm({ pageSlug = 'earn-bitcoin/places-to-earn-sats' }: Props) {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { honey: '', saveInfo: false, pageSlug },
  })
  const { submit, isLoading, isSuccess, errorMsg, successMessage } = useFormSubmit({
    formType: 'page-comment',
    onSuccess: () => reset({ pageSlug, honey: '', saveInfo: false }),
  })

  const onSubmit = handleSubmit((data) => {
    if (data.saveInfo && typeof window !== 'undefined') {
      localStorage.setItem('ab-comment-name', data.name)
      localStorage.setItem('ab-comment-email', data.email)
      if (data.website) localStorage.setItem('ab-comment-website', data.website)
    }
    submit(data)
  })

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const name = localStorage.getItem('ab-comment-name')
    const email = localStorage.getItem('ab-comment-email')
    const website = localStorage.getItem('ab-comment-website')
    if (name) setValue('name', name)
    if (email) setValue('email', email)
    if (website) setValue('website', website)
    if (name || email) setValue('saveInfo', true)
  }, [setValue])

  return (
    <FormShell isSuccess={isSuccess} successMessage={successMessage} errorMsg={errorMsg}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        <input {...register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />
        <input {...register('pageSlug')} type="hidden" />
        <p className="text-sm text-brand-text-mid">
          Your email address will not be published. Required fields are marked{' '}
          <span className="text-brand-primary">*</span>
        </p>
        <ABTextarea label="Comment *" rows={8} error={errors.comment?.message} {...register('comment')} />
        <div className="grid gap-5 sm:grid-cols-3">
          <ABInput label="Name *" placeholder="Name*" error={errors.name?.message} {...register('name')} />
          <ABInput label="Email *" type="email" placeholder="Email*" error={errors.email?.message} {...register('email')} />
          <ABInput label="Website" placeholder="Website" {...register('website')} />
        </div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" {...register('saveInfo')} className="mt-1 h-4 w-4 accent-[#E98852]" />
          <span className="text-sm text-brand-text-mid">
            Save my name, email, and website in this browser for the next time I comment.
          </span>
        </label>
        <button
          type="submit"
          disabled={isLoading}
          className="self-start rounded-[5px] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#384958] disabled:opacity-60"
          style={{ backgroundColor: '#E98852' }}
        >
          {isLoading ? 'Posting…' : 'Post Comment'}
        </button>
      </form>
    </FormShell>
  )
}
