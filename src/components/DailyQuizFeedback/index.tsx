'use client'

import React, { useMemo, useState } from 'react'

import {
  DynamicFeedbackFields,
  useFeedbackValues,
  validateFeedbackValues,
} from '@/components/QuizFeedbackForm/DynamicFeedbackFields'
import type { FeedbackFieldDefinition } from '@/lib/quiz-shared'

type Props = {
  day: number
  language: 'en' | 'fr'
  courseEmail: string
  fields: FeedbackFieldDefinition[]
}

export function DailyQuizFeedback({ day, language, courseEmail, fields }: Props) {
  const isFr = language === 'fr'
  const [values, setValues] = useFeedbackValues(fields)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const t = useMemo(
    () => ({
      heading: isFr ? `Commentaires du Jour ${day}` : `Day ${day} Feedback`,
      intro: isFr
        ? `Merci de nous donner votre avis sur le Jour ${day} pour améliorer le cours`
        : `Please give us feedback on Day ${day} to help make the course better`,
      submit: isFr ? 'Soumettre' : 'Submit Feedback',
      submitting: isFr ? 'Envoi en cours…' : 'Submitting…',
      success: isFr
        ? 'Merci pour vos commentaires ! À demain ! 🎉'
        : 'Thank you for your feedback! See you tomorrow! 🎉',
      submitError: isFr ? 'Échec de la soumission. Veuillez réessayer.' : 'Submission failed. Please try again.',
      networkError: isFr ? 'Erreur réseau. Veuillez réessayer.' : 'Network error. Please try again.',
    }),
    [day, isFr],
  )

  function handleChange(fieldKey: string, value: string | number | null) {
    setValues((prev) => ({ ...prev, [fieldKey]: value }))
    setFieldErrors((prev) => {
      const next = { ...prev }
      delete next[fieldKey]
      return next
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errors = validateFeedbackValues(fields, values)
    if (Object.keys(errors).length) {
      setFieldErrors(errors)
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/course/daily-quiz-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          day,
          email: courseEmail,
          language,
          ...values,
        }),
      })

      if (!res.ok) {
        setError(t.submitError)
        setIsSubmitting(false)
        return
      }

      setIsSuccess(true)
      setIsSubmitting(false)
    } catch {
      setError(t.networkError)
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 px-6 py-8 text-center">
        <p className="font-heading text-lg font-semibold text-green-800">{t.success}</p>
      </div>
    )
  }

  return (
    <div className="rounded-card border border-brand-border-light bg-white px-6 py-8 sm:px-8">
      <h2 className="text-center font-heading text-xl font-semibold text-brand-secondary">
        {t.heading}
      </h2>
      <p className="mt-2 text-center text-sm text-brand-text-muted">{t.intro}</p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-8">
        <input type="hidden" name="course_email" value={courseEmail} readOnly />

        <DynamicFeedbackFields
          fields={fields}
          values={values}
          onChange={handleChange}
          errors={fieldErrors}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="self-center rounded-btn bg-brand-primary px-10 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-secondary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? t.submitting : t.submit}
        </button>
      </form>
    </div>
  )
}
