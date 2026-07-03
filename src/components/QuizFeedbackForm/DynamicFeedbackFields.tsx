'use client'

import React, { useState } from 'react'

import { ABInput, ABTextarea } from '@/components/ui/ab-form-fields'
import type { FeedbackFieldDefinition } from '@/lib/quiz-shared'

const RATING_SCORES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

type Props = {
  fields: FeedbackFieldDefinition[]
  values: Record<string, string | number | null>
  onChange: (fieldKey: string, value: string | number | null) => void
  errors?: Record<string, string>
}

function RatingRow({
  name,
  value,
  onChange,
  error,
}: {
  name: string
  value?: number | null
  onChange: (n: number) => void
  error?: string
}) {
  return (
    <div>
      <div className="grid grid-cols-6 gap-2 sm:grid-cols-11">
        {RATING_SCORES.map((n) => (
          <label
            key={n}
            className={`flex cursor-pointer items-center justify-center rounded border py-2 text-sm font-bold transition-colors ${
              value === n
                ? 'border-brand-accent bg-brand-accent text-white'
                : 'border-brand-border-light bg-gray-100 text-brand-text-dark hover:border-brand-accent'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={n}
              checked={value === n}
              onChange={() => onChange(n)}
              className="sr-only"
            />
            {n}
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}

function RadioGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string
  options: Array<{ label: string; value: string }>
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
            value === option.value
              ? 'border-brand-accent bg-brand-accent/10'
              : 'border-brand-border-light hover:bg-brand-cream'
          }`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="h-4 w-4 accent-brand-accent"
          />
          <span className="text-sm text-brand-text-dark">{option.label}</span>
        </label>
      ))}
    </div>
  )
}

export function DynamicFeedbackFields({ fields, values, onChange, errors = {} }: Props) {
  return (
    <div className="flex flex-col gap-8">
      {fields.map((field) => {
        const fieldKey = field.fieldKey
        const error = errors[fieldKey]

        if (field.fieldType === 'rating') {
          return (
            <fieldset key={field.id}>
              <legend className="mb-3 text-sm font-medium text-brand-text-dark">
                {field.questionText}
                {field.required && <span className="text-red-600"> *</span>}
              </legend>
              <RatingRow
                name={fieldKey}
                value={typeof values[fieldKey] === 'number' ? values[fieldKey] : null}
                onChange={(n) => onChange(fieldKey, n)}
                error={error}
              />
            </fieldset>
          )
        }

        if (field.fieldType === 'textarea') {
          return (
            <ABTextarea
              key={field.id}
              label={
                field.required ? `${field.questionText} *` : field.questionText
              }
              rows={4}
              value={String(values[fieldKey] ?? '')}
              onChange={(e) => onChange(fieldKey, e.target.value)}
              error={error}
            />
          )
        }

        if (field.fieldType === 'text') {
          return (
            <ABInput
              key={field.id}
              label={field.questionText}
              value={String(values[fieldKey] ?? '')}
              onChange={(e) => onChange(fieldKey, e.target.value)}
              error={error}
            />
          )
        }

        return (
          <fieldset key={field.id}>
            <legend className="mb-3 text-sm font-medium text-brand-text-dark">
              {field.questionText}
              {field.required && <span className="text-red-600"> *</span>}
            </legend>
            <RadioGroup
              name={fieldKey}
              options={field.options ?? []}
              value={String(values[fieldKey] ?? '')}
              onChange={(value) => onChange(fieldKey, value)}
            />
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
          </fieldset>
        )
      })}
    </div>
  )
}

export function useFeedbackValues(fields: FeedbackFieldDefinition[]) {
  return useState<Record<string, string | number | null>>(() => {
    const initial: Record<string, string | number | null> = {}
    for (const field of fields) {
      initial[field.fieldKey] = field.fieldType === 'rating' ? null : ''
    }
    return initial
  })
}

export function validateFeedbackValues(
  fields: FeedbackFieldDefinition[],
  values: Record<string, string | number | null>,
): Record<string, string> {
  const errors: Record<string, string> = {}

  for (const field of fields) {
    if (!field.required) continue
    const value = values[field.fieldKey]
    if (value === null || value === undefined || String(value).trim() === '') {
      errors[field.fieldKey] = 'Required'
    }
  }

  return errors
}
