'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { FormSubmitResponse } from '@/lib/form-settings-shared'
import { resolveFormSlug } from '@/lib/form-settings-shared'

type Status = 'idle' | 'loading' | 'success' | 'error'

type Options = {
  formType: string
  /** FormSettings slug — defaults to resolveFormSlug(formType) */
  formSlug?: string
  onSuccess?: () => void
}

export function useFormSubmit({ formType, formSlug: formSlugProp, onSuccess }: Options) {
  const router = useRouter()
  const formSlug = formSlugProp ?? resolveFormSlug(formType)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  async function submit(data: Record<string, unknown>) {
    setStatus('loading')
    setErrorMsg('')
    setSuccessMessage('')

    try {
      const res = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType, data }),
      })

      const body = (await res.json().catch(() => ({}))) as FormSubmitResponse & { message?: string }

      if (!res.ok) {
        throw new Error(body.message || `Error ${res.status}`)
      }

      if (body.redirectToConfirmation && body.formSlug) {
        router.push(`/confirmation?type=${encodeURIComponent(body.formSlug)}`)
        onSuccess?.()
        return
      }

      setSuccessMessage(
        body.confirmationHeading || 'Thank you! Your submission has been received.',
      )
      setStatus('success')
      onSuccess?.()
    } catch (err: any) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
    }
  }

  return {
    submit,
    status,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    errorMsg,
    successMessage,
    formSlug,
  }
}
