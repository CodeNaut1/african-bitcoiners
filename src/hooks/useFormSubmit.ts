'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

type Options = {
  formType: string
  onSuccess?: () => void
}

export function useFormSubmit({ formType, onSuccess }: Options) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function submit(data: Record<string, unknown>) {
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType, data }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.message || `Error ${res.status}`)
      }

      setStatus('success')
      onSuccess?.()
    } catch (err: any) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
    }
  }

  return { submit, status, isLoading: status === 'loading', isSuccess: status === 'success', errorMsg }
}
