'use client'

import React, { useEffect, useState } from 'react'

import {
  DynamicFeedbackFields,
  validateFeedbackValues,
} from '@/components/QuizFeedbackForm/DynamicFeedbackFields'
import { FormShell } from './FormShell'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import type { FeedbackFieldDefinition } from '@/lib/quiz-shared'

type Props = {
  email?: string
  fields?: FeedbackFieldDefinition[]
  formType?:
    | 'final-quiz-failed-english'
    | 'final-quiz-failed-french'
    | 'final-quiz-passed-english'
    | 'final-quiz-passed-french'
}

export function FinalCourseFeedbackForm({
  email,
  fields = [],
  formType = 'final-quiz-failed-english',
}: Props) {
  if (!fields.length) {
    return null
  }
  const [values, setValues] = useState<Record<string, string | number | null>>(() => {
    const initial: Record<string, string | number | null> = { honey: '' }
    for (const field of fields) {
      initial[field.fieldKey] = field.fieldType === 'rating' ? null : ''
    }
    return initial
  })
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const { submit, isLoading, isSuccess, errorMsg, successMessage } = useFormSubmit({
    formType,
    onSuccess: () => {
      const reset: Record<string, string | number | null> = { honey: '' }
      for (const field of fields) {
        reset[field.fieldKey] = field.fieldType === 'rating' ? null : ''
      }
      setValues(reset)
    },
  })

  useEffect(() => {
    if (email) setValues((prev) => ({ ...prev, email }))
  }, [email])

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

    const payload: Record<string, unknown> = { honey: '' }
    for (const field of fields) {
      const value = values[field.fieldKey]
      if (field.fieldType === 'rating') {
        payload[field.fieldKey] = value ?? 0
      } else {
        payload[field.fieldKey] = value ?? ''
      }
    }
    if (email) payload.email = email

    await submit(payload)
  }

  return (
    <FormShell isSuccess={isSuccess} successMessage={successMessage} errorMsg={errorMsg}>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        <input type="text" name="honey" value="" className="hidden" tabIndex={-1} aria-hidden readOnly />
        <input type="hidden" name="email" value={email ?? ''} readOnly />
        <p className="text-sm" style={{ color: '#584538' }}>
          &quot;<span className="text-[#E1640C]">*</span>&quot; indicates required fields
        </p>

        <DynamicFeedbackFields
          fields={fields}
          values={values}
          onChange={handleChange}
          errors={fieldErrors}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#253343] disabled:opacity-60 sm:w-[90%]"
          style={{ backgroundColor: '#E1640C' }}
        >
          {isLoading ? 'Submitting…' : 'Submit'}
        </button>
      </form>
    </FormShell>
  )
}
