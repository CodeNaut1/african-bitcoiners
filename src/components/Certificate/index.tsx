'use client'

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ABButton } from '@/components/ui/ab-button'
import { ABInput } from '@/components/ui/ab-form-fields'

type Props = {
  mode: 'email' | 'telegram'
  hideIntro?: boolean
  submitLabel?: string
}

const emailSchema = z.object({ email: z.string().email('Valid email required') })
const codeSchema = z.object({ uniqueCode: z.string().min(7, '7-character code required') })
type EmailFields = z.infer<typeof emailSchema>
type CodeFields = z.infer<typeof codeSchema>

export function Certificate({ mode, hideIntro, submitLabel }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState('')
  const [waitMessage, setWaitMessage] = useState('')

  const emailForm = useForm<EmailFields>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const codeForm = useForm<CodeFields>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      uniqueCode: searchParams.get('uniqueId') ?? searchParams.get('uniqueCode') ?? '',
    },
  })

  async function lookup(payload: { email?: string; uniqueCode?: string }) {
    setError('')
    setWaitMessage('')

    const res = await fetch('/api/course/certificate/lookup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const json = (await res.json()) as { error?: string; redirectUrl?: string }

    if (res.status === 403) {
      setWaitMessage(json.error ?? 'Your certificate is not available yet.')
      return
    }

    if (!res.ok || !json.redirectUrl) {
      setError(json.error ?? 'No certificate found for this email/code.')
      return
    }

    router.push(json.redirectUrl)
  }

  return (
    <div className={hideIntro ? '' : 'mx-auto max-w-md py-8'}>
      {!hideIntro && (
        <>
          <h1 className="mb-2 text-2xl font-bold text-brand-secondary">Get Your Certificate</h1>
          <p className="mb-8 text-sm text-brand-text-muted">
            {mode === 'email'
              ? 'Enter the email address you used for the course.'
              : 'Enter your unique course code.'}
          </p>
        </>
      )}

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}
      {waitMessage && (
        <div className="mb-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800">
          {waitMessage}
        </div>
      )}

      {mode === 'email' ? (
        <form
          onSubmit={emailForm.handleSubmit((values) => lookup({ email: values.email }))}
          noValidate
          className="flex flex-col gap-4"
        >
          <ABInput
            label={hideIntro ? 'Email' : 'Your email address'}
            type="email"
            placeholder="amara@example.com"
            required
            error={emailForm.formState.errors.email?.message}
            {...emailForm.register('email')}
          />
          <ABButton
            type="submit"
            variant="primary"
            size="lg"
            disabled={emailForm.formState.isSubmitting}
            className="w-full justify-center"
          >
            {emailForm.formState.isSubmitting ? 'Looking up…' : (submitLabel ?? 'Find My Certificate')}
          </ABButton>
        </form>
      ) : (
        <form
          onSubmit={codeForm.handleSubmit((values) => lookup({ uniqueCode: values.uniqueCode }))}
          noValidate
          className="flex flex-col gap-4"
        >
          <ABInput
            label={hideIntro ? 'Telegram Unique ID' : 'Your unique course code'}
            placeholder="ABC2345"
            required={hideIntro}
            error={codeForm.formState.errors.uniqueCode?.message}
            {...codeForm.register('uniqueCode')}
          />
          <ABButton
            type="submit"
            variant="primary"
            size="lg"
            disabled={codeForm.formState.isSubmitting}
            className="w-full justify-center"
          >
            {codeForm.formState.isSubmitting ? 'Looking up…' : (submitLabel ?? 'Find My Certificate')}
          </ABButton>
        </form>
      )}
    </div>
  )
}
