'use client'

import React, { useState } from 'react'
import { ABTextarea } from '@/components/ui/ab-form-fields'
import { useFormSubmit } from '@/hooks/useFormSubmit'

const SCORES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

type Props = {
  formSlug: string
}

export function ConfirmationNpsSection({ formSlug }: Props) {
  const [score, setScore] = useState<number | null>(null)
  const [feedback, setFeedback] = useState('')
  const { submit, isLoading, isSuccess, errorMsg } = useFormSubmit({ formType: 'nps-feedback' })

  if (isSuccess) {
    return (
      <div className="mt-10 rounded-xl border border-green-200 bg-green-50 px-6 py-8 text-center">
        <p className="font-heading text-lg font-semibold text-green-800">Thank you for your feedback!</p>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (score === null) return

    await submit({
      score,
      feedback,
      sourceForm: formSlug,
      honey: '',
    })
  }

  return (
    <div className="mt-10 w-full max-w-lg rounded-xl border border-brand-border-light bg-white px-6 py-8 shadow-card sm:px-8">
      <h2 className="font-heading text-xl font-semibold text-brand-secondary">
        How would you rate your experience?
      </h2>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
        <div>
          <div className="grid grid-cols-6 gap-2 sm:grid-cols-11">
            {SCORES.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setScore(n)}
                className={`rounded-lg border py-2 text-sm font-bold transition-colors ${
                  score === n
                    ? 'border-brand-primary bg-brand-cream text-brand-secondary'
                    : 'border-brand-border-light bg-brand-cream/50 text-brand-text-dark hover:border-brand-primary'
                }`}
                aria-pressed={score === n}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-brand-text-muted">
            <span>Not at all likely</span>
            <span>Extremely likely</span>
          </div>
        </div>

        <ABTextarea
          label="Additional feedback (optional)"
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

        <button
          type="submit"
          disabled={isLoading || score === null}
          className="self-start rounded-btn bg-brand-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-secondary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Submitting…' : 'Submit feedback'}
        </button>
      </form>
    </div>
  )
}
