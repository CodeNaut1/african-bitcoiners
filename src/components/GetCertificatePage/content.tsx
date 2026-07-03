'use client'

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ABButton } from '@/components/ui/ab-button'
import { ABInput } from '@/components/ui/ab-form-fields'

const emailSchema = z.object({ email: z.string().email('Valid email required') })
const codeSchema = z.object({ uniqueCode: z.string().min(7, '7-character code required') })
type EmailFields = z.infer<typeof emailSchema>
type CodeFields = z.infer<typeof codeSchema>

type Tab = 'email' | 'code'

export function GetCertificateContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialTab: Tab = searchParams.get('uniqueId') ? 'code' : 'email'
  const [tab, setTab] = useState<Tab>(initialTab)
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
    <div className="min-h-screen bg-brand-cream py-12">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-secondary sm:text-3xl">Download Your Certificate</h1>
          <p className="mt-3 text-sm text-brand-text-muted sm:text-base">
            Enter the Email address or unique code (for Telegram signups) you used when signing up for the course.
          </p>
        </div>

        <div className="mt-8 rounded-lg border border-brand-border-light bg-white p-6 sm:p-8">
          <div className="mb-6 flex rounded-lg border border-brand-border-light bg-brand-cream p-1">
            <button
              type="button"
              onClick={() => setTab('email')}
              className={`flex-1 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors ${
                tab === 'email'
                  ? 'bg-white text-brand-secondary shadow-sm'
                  : 'text-brand-text-muted hover:text-brand-secondary'
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setTab('code')}
              className={`flex-1 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors ${
                tab === 'code'
                  ? 'bg-white text-brand-secondary shadow-sm'
                  : 'text-brand-text-muted hover:text-brand-secondary'
              }`}
            >
              Unique Code (Telegram)
            </button>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
          )}
          {waitMessage && (
            <div className="mb-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800">
              {waitMessage}
            </div>
          )}

          {tab === 'email' ? (
            <form
              onSubmit={emailForm.handleSubmit((values) => lookup({ email: values.email }))}
              noValidate
              className="flex flex-col gap-4"
            >
              <ABInput
                label="Email Address"
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
                {emailForm.formState.isSubmitting ? 'Looking up…' : 'Get Certificate'}
              </ABButton>
            </form>
          ) : (
            <form
              onSubmit={codeForm.handleSubmit((values) => lookup({ uniqueCode: values.uniqueCode }))}
              noValidate
              className="flex flex-col gap-4"
            >
              <ABInput
                label="Unique Code"
                placeholder="ABC2345"
                required
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
                {codeForm.formState.isSubmitting ? 'Looking up…' : 'Get Certificate'}
              </ABButton>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
