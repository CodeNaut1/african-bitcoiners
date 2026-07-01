'use client'

import React, { useState } from 'react'

import { ABInput, ABTextarea } from '@/components/ui/ab-form-fields'
import { useFormSubmit } from '@/hooks/useFormSubmit'

const SCORES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

type Props = {
  formSlug: string
  formTitle: string
}

function RequiredLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-left text-sm font-medium text-brand-text-dark">
      {children} <span className="text-red-600">*</span>
    </p>
  )
}

function OptionalLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-left text-sm font-medium text-brand-text-dark">{children}</p>
  )
}

function ScorePicker({
  value,
  onChange,
  name,
}: {
  value: number | null
  onChange: (n: number) => void
  name: string
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2" role="group" aria-label={name}>
      {SCORES.map((n) => {
        const selected = value === n
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={
              selected
                ? 'flex h-9 w-9 items-center justify-center rounded-full border border-brand-primary bg-brand-primary text-sm font-semibold text-white transition-colors'
                : 'flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-200'
            }
            aria-pressed={selected}
          >
            {n}
          </button>
        )
      })}
    </div>
  )
}

export function ConfirmationNpsSection({ formSlug, formTitle }: Props) {
  const [recommendScore, setRecommendScore] = useState<number | null>(null)
  const [recommendReason, setRecommendReason] = useState('')
  const [processScore, setProcessScore] = useState<number | null>(null)
  const [processReason, setProcessReason] = useState('')
  const [improvementAdvice, setImprovementAdvice] = useState('')

  const { submit, isLoading, isSuccess, errorMsg } = useFormSubmit({ formType: 'nps-feedback' })

  const canSubmit =
    recommendScore !== null &&
    processScore !== null &&
    improvementAdvice.trim() !== ''

  if (isSuccess) {
    return (
      <div className="mt-10 w-full max-w-xl rounded-xl border border-green-200 bg-green-50 px-6 py-8 text-center">
        <p className="font-heading text-lg font-semibold text-green-800">
          Thank you for your feedback! 🙏
        </p>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return

    await submit({
      sourceFormSlug: formSlug,
      sourceFormTitle: formTitle,
      recommendScore,
      recommendReason: recommendReason.trim() || null,
      processScore,
      processReason: processReason.trim() || null,
      improvementAdvice: improvementAdvice.trim(),
      honey: '',
    })
  }

  return (
    <div className="mt-10 w-full max-w-xl rounded-xl border border-brand-border-light bg-white px-6 py-8 text-left shadow-card sm:px-8">
      <h2 className="text-center font-heading text-xl font-semibold text-brand-secondary">
        Share your feedback
      </h2>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-8">
        <div>
          <RequiredLabel>
            How likely are you to recommend African Bitcoiners to a friend or colleague?
          </RequiredLabel>
          <ScorePicker
            name="Recommendation score"
            value={recommendScore}
            onChange={setRecommendScore}
          />
          <div className="mt-4">
            <OptionalLabel>What&apos;s the main reason for your score above?</OptionalLabel>
            <ABInput
              value={recommendReason}
              onChange={(e) => setRecommendReason(e.target.value)}
              aria-label="Reason for recommendation score (optional)"
            />
          </div>
        </div>

        <div>
          <RequiredLabel>How would you rate the {formTitle} process?</RequiredLabel>
          <ScorePicker name="Process score" value={processScore} onChange={setProcessScore} />
          <div className="mt-4">
            <OptionalLabel>What&apos;s the main reason for your score above?</OptionalLabel>
            <ABInput
              value={processReason}
              onChange={(e) => setProcessReason(e.target.value)}
              aria-label="Reason for process score (optional)"
            />
          </div>
        </div>

        <div>
          <RequiredLabel>What advice do you have for us to improve your ratings above?</RequiredLabel>
          <ABTextarea
            rows={4}
            value={improvementAdvice}
            onChange={(e) => setImprovementAdvice(e.target.value)}
            aria-label="Improvement advice"
          />
        </div>

        {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

        <button
          type="submit"
          disabled={isLoading || !canSubmit}
          className="self-center rounded-btn bg-brand-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-secondary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Submitting…' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  )
}
