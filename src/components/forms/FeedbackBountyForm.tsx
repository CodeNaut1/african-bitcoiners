'use client'

import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@/utilities/ui'
import { ABInput, ABSelect, ABTextarea } from '@/components/ui/ab-form-fields'
import { ABButton } from '@/components/ui/ab-button'
import { FormShell } from './FormShell'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { AFRICAN_COUNTRIES } from './africanCountries'

const CATEGORIES = [
  'User Experience',
  'An Initiative or Idea',
  'Course Content',
  'Broken Link',
  'Website Speed',
  'Course Delivery',
  'Copy Error',
] as const

const DB_CATEGORY_MAP: Record<(typeof CATEGORIES)[number], string> = {
  'User Experience': 'Website',
  'An Initiative or Idea': 'Suggestion',
  'Course Content': 'Course Content',
  'Broken Link': 'Website',
  'Website Speed': 'Website',
  'Course Delivery': 'Course Delivery',
  'Copy Error': 'Website',
}

const MAX_FILE_SIZE = 1048576
const ACCEPTED_FILE_TYPES = '.jpg,.jpeg,.png,.gif,.webp,.pdf'

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  socialLink: z.string().min(1, 'Profile link required'),
  country: z.string().min(1, 'Country required'),
  feedbackTitle: z.string().min(5, 'Feedback subject required'),
  category: z.string().min(1, 'Category required'),
  description: z.string().min(20, 'Please describe your feedback in at least 20 characters'),
  discovery: z.string().optional(),
  feedbackBefore: z.enum(['yes', 'no'], { required_error: 'Please select an option' }),
  consent: z.literal(true, { errorMap: () => ({ message: 'You must agree to the terms' }) }),
  honey: z.string().max(0),
})

type Fields = z.infer<typeof schema>

type Props = {
  variant?: 'default' | 'page'
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="border-none pb-2.5 pt-[30px] font-heading text-lg font-bold text-brand-text-dark first:pt-0">
      {children}
    </h3>
  )
}

function RequiredLegend() {
  return (
    <p className="text-sm text-brand-text-mid">
      &quot;<span className="text-red-600">*</span>&quot; indicates required fields
    </p>
  )
}

export function FeedbackBountyForm({ variant = 'default' }: Props) {
  const isPage = variant === 'page'
  const fileRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState('')
  const [uploading, setUploading] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { honey: '', feedbackBefore: undefined },
  })
  const { submit, isLoading, isSuccess, errorMsg, successMessage } = useFormSubmit({
    formType: 'feedback-rating',
    formSlug: 'feedback-bounty',
    onSuccess: () => reset(),
  })

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    setFileError('')

    if (!file) {
      setSelectedFile(null)
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setSelectedFile(null)
      setFileError('File size must be under 1MB')
      e.target.value = ''
      return
    }

    setSelectedFile(file)
  }

  async function uploadAttachment(file: File): Promise<number | undefined> {
    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/media/upload', {
      method: 'POST',
      body: formData,
    })

    const body = (await res.json().catch(() => ({}))) as { id?: number; message?: string }
    if (!res.ok) {
      throw new Error(body.message || 'Failed to upload attachment')
    }

    return body.id
  }

  async function onSubmit(data: Fields) {
    const wpCategory = data.category as (typeof CATEGORIES)[number]
    const dbCategory = DB_CATEGORY_MAP[wpCategory] ?? 'Suggestion'
    const meta = [
      data.country && `Country: ${data.country}`,
      data.socialLink && `Profile: ${data.socialLink}`,
      data.discovery && `Discovery: ${data.discovery}`,
      `WP Category: ${data.category}`,
    ]
      .filter(Boolean)
      .join('\n')

    const description = meta ? `${meta}\n\n${data.description}` : data.description

    try {
      setUploading(true)
      let attachment: number | undefined

      if (selectedFile) {
        attachment = await uploadAttachment(selectedFile)
      }

      await submit({
        name: data.name,
        email: data.email,
        socialLink: data.socialLink,
        country: data.country,
        feedbackTitle: data.feedbackTitle,
        category: dbCategory,
        description,
        feedbackBefore: data.feedbackBefore,
        attachment,
      })

      setSelectedFile(null)
      if (fileRef.current) fileRef.current.value = ''
    } catch (err: unknown) {
      setFileError(err instanceof Error ? err.message : 'Failed to upload attachment')
    } finally {
      setUploading(false)
    }
  }

  return (
    <FormShell
      isSuccess={isSuccess}
      successMessage={successMessage}
      errorMsg={errorMsg}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        <input {...register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />

        {isPage ? <RequiredLegend /> : null}

        {isPage ? (
          <>
            <SectionHeading>Contact Information</SectionHeading>
            <ABInput
              label="Fullname or Nym *"
              placeholder="Satoshi Nakamoto"
              error={errors.name?.message}
              {...register('name')}
            />
            <ABInput
              label="Email address *"
              type="email"
              placeholder="satoshi@gmail.com"
              error={errors.email?.message}
              {...register('email')}
            />
            <ABInput
              label="Twitter or LinkedIn or Nostr profile link *"
              placeholder="https://twitter.com/xyzuser"
              error={errors.socialLink?.message}
              {...register('socialLink')}
            />
            <ABSelect label="What African Country are you from? *" error={errors.country?.message} {...register('country')}>
              <option value="">Select a Country</option>
              {AFRICAN_COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </ABSelect>

            <SectionHeading>Feedback Details</SectionHeading>
            <ABInput
              label="Feedback Subject *"
              placeholder="Improvement suggestion for mobile navigation"
              error={errors.feedbackTitle?.message}
              {...register('feedbackTitle')}
            />
            <ABSelect label="Feedback Category *" error={errors.category?.message} {...register('category')}>
              <option value="">Select one</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </ABSelect>
            <ABTextarea
              label="Feedback *"
              rows={10}
              placeholder="Describe your feedback in detail. Include specific examples, suggestions for improvement, and any other relevant information."
              error={errors.description?.message}
              {...register('description')}
            />

            <div className="flex flex-col gap-2">
              <label className={cn('text-sm font-medium text-brand-text-dark')}>Attachment (optional)</label>
              <div className="rounded-lg border border-dashed border-[#d4d4d4] bg-white px-4 py-8 text-center">
                <p className="text-sm text-brand-text-mid">
                  Drop files here or{' '}
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="rounded-md px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2D1300]"
                    style={{ backgroundColor: '#F45341' }}
                  >
                    Select files
                  </button>
                </p>
                <input
                  ref={fileRef}
                  type="file"
                  accept={ACCEPTED_FILE_TYPES}
                  className="hidden"
                  aria-label="Attach document"
                  onChange={handleFileChange}
                />
                {selectedFile && (
                  <p className="mt-3 text-xs text-brand-text-dark">{selectedFile.name}</p>
                )}
                <p className="mt-3 text-xs text-brand-text-mid">
                  Accepted file types: jpg, jpeg, png, gif, webp, pdf. Max file size: 1MB
                </p>
                {fileError && <p className="mt-2 text-xs text-red-600">{fileError}</p>}
              </div>
            </div>

            <SectionHeading>Additional Information</SectionHeading>
            <ABTextarea
              label="How did you discover this issue or come up with this idea? (optional)"
              rows={10}
              placeholder="Share the context or experience that led to your feedback."
              {...register('discovery')}
            />
            <fieldset className="flex flex-col gap-3">
              <legend className={cn('text-sm font-medium text-brand-text-dark')}>
                Have you provided feedback before? *
              </legend>
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2 text-sm text-brand-text-dark">
                  <input type="radio" value="yes" {...register('feedbackBefore')} className="accent-brand-primary" />
                  Yes
                </label>
                <label className="flex items-center gap-2 text-sm text-brand-text-dark">
                  <input type="radio" value="no" {...register('feedbackBefore')} className="accent-brand-primary" />
                  No
                </label>
              </div>
              {errors.feedbackBefore && <p className="text-xs text-red-600">{errors.feedbackBefore.message}</p>}
            </fieldset>
            <fieldset className="flex flex-col gap-3">
              <legend className={cn('text-sm font-medium text-brand-text-dark')}>Agreement to Terms *</legend>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('consent')}
                  className="mt-1 h-4 w-4 rounded border-brand-border-light accent-brand-primary"
                />
                <span className="text-sm text-brand-text-mid">
                  I agree to the terms and conditions of the Feedback Bounty Party and consent to the use of the
                  information provided in this form for promotional or other purposes as deemed appropriate, including
                  being contacted via email if necessary.
                </span>
              </label>
              {errors.consent && <p className="text-xs text-red-600">{errors.consent.message}</p>}
            </fieldset>

            <div className="mt-10 flex justify-center">
              <ABButton
                type="submit"
                variant="primary"
                size="md"
                disabled={isLoading || uploading}
                className="w-full max-w-md justify-center rounded-md px-[70px] py-5 text-[17px] font-semibold"
                style={{ backgroundColor: '#F45341' }}
              >
                {isLoading || uploading ? 'Submitting…' : 'Submit your feedback'}
              </ABButton>
            </div>
          </>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 gap-5">
              <ABInput label="Your Name" placeholder="Amara Diallo" error={errors.name?.message} {...register('name')} />
              <ABInput
                label="Email (for sats payment)"
                type="email"
                placeholder="amara@example.com"
                error={errors.email?.message}
                {...register('email')}
              />
            </div>
            <ABInput
              label="Lightning Address or Social Link"
              placeholder="amara@wallet.satoshi.me or twitter.com/amara"
              error={errors.socialLink?.message}
              {...register('socialLink')}
            />
            <ABSelect label="Country" error={errors.country?.message} {...register('country')}>
              <option value="">Select your country</option>
              {AFRICAN_COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </ABSelect>
            <ABInput
              label="Feedback Title"
              placeholder="Broken link on the Bitcoin Whitepaper page"
              error={errors.feedbackTitle?.message}
              {...register('feedbackTitle')}
            />
            <ABSelect label="Category" error={errors.category?.message} {...register('category')}>
              <option value="">Select category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </ABSelect>
            <ABTextarea
              label="Description"
              rows={5}
              placeholder="Describe what you found or suggest. Be as specific as possible — include the page URL, what the issue is, and what you expected."
              error={errors.description?.message}
              {...register('description')}
            />
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-brand-text-dark">Attachment (optional)</label>
              <input
                ref={fileRef}
                type="file"
                accept={ACCEPTED_FILE_TYPES}
                aria-label="Attach document"
                onChange={handleFileChange}
                className="text-sm text-brand-text-dark"
              />
              {selectedFile && (
                <p className="text-xs text-brand-text-mid">{selectedFile.name}</p>
              )}
              <p className="text-xs text-brand-text-mid">Max file size: 1MB</p>
              {fileError && <p className="text-xs text-red-600">{fileError}</p>}
            </div>
            <fieldset className="flex flex-col gap-3">
              <legend className="text-sm font-medium text-brand-text-dark">Have you submitted feedback before?</legend>
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" value="no" {...register('feedbackBefore')} className="accent-brand-primary" />
                  No, this is my first time
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" value="yes" {...register('feedbackBefore')} className="accent-brand-primary" />
                  Yes, I have submitted before
                </label>
              </div>
              {errors.feedbackBefore && <p className="text-xs text-red-600">{errors.feedbackBefore.message}</p>}
            </fieldset>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" {...register('consent')} className="mt-1 h-4 w-4 rounded border-brand-border-light accent-brand-primary" />
              <span className="text-sm text-brand-text-mid">I confirm this is genuine feedback and I have read the bounty rules.</span>
            </label>
            {errors.consent && <p className="text-xs text-red-600">{errors.consent.message}</p>}
            <ABButton type="submit" variant="primary" size="md" disabled={isLoading || uploading} className="self-start">
              {isLoading || uploading ? 'Submitting…' : 'Submit for 1,000 Sats'}
            </ABButton>
          </>
        )}
      </form>
    </FormShell>
  )
}
