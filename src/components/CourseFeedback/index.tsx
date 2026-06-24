'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ABButton } from '@/components/ui/ab-button'
import { ABInput, ABTextarea } from '@/components/ui/ab-form-fields'

type Props = { day: number }

const RATINGS = [1, 2, 3, 4, 5]

const schema = z.object({
  email: z.string().email('Valid email required'),
  clarity: z.coerce.number().min(1).max(5),
  usefulness: z.coerce.number().min(1).max(5),
  difficulty: z.coerce.number().min(1).max(5),
  improvement: z.string().optional(),
})
type Fields = z.infer<typeof schema>

export function CourseFeedback({ day }: Props) {
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<Fields>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: Fields) {
    await fetch('/api/forms/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formType: 'course-feedback', data: { ...data, day } }),
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto py-16 text-center flex flex-col items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-7 w-7 text-green-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <p className="font-bold text-brand-secondary text-lg">Thank you for your feedback!</p>
        <p className="text-sm text-brand-text-muted">Your response for Day {day} has been saved.</p>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-brand-secondary mb-2">Day {day} Feedback</h1>
      <p className="text-sm text-brand-text-muted mb-8">How was today's lesson? Rate 1 (poor) → 5 (excellent)</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
        {[
          { name: 'clarity' as const, label: 'How clear was today\'s lesson?' },
          { name: 'usefulness' as const, label: 'How useful was the content?' },
          { name: 'difficulty' as const, label: 'How was the difficulty level?' },
        ].map(({ name, label }) => (
          <div key={name}>
            <p className="text-sm font-medium text-brand-text-dark mb-2">{label}</p>
            <div className="flex gap-3">
              {RATINGS.map((r) => {
                const val = watch(name)
                return (
                  <label key={r} className={`flex-1 text-center py-2.5 rounded-lg border cursor-pointer font-bold text-sm transition-colors ${Number(val) === r ? 'border-brand-primary bg-brand-primary text-white' : 'border-brand-border-light hover:bg-brand-cream'}`}>
                    <input type="radio" value={r} {...register(name)} className="sr-only" />
                    {r}
                  </label>
                )
              })}
            </div>
            {errors[name] && <p className="text-xs text-red-600 mt-1">{errors[name]?.message}</p>}
          </div>
        ))}

        <ABTextarea
          label="What could be improved? (optional)"
          rows={4}
          placeholder="Any suggestions or areas for improvement..."
          {...register('improvement')}
        />

        <ABInput
          label="Your email"
          type="email"
          placeholder="amara@example.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <ABButton type="submit" variant="primary" size="md" disabled={isSubmitting} className="self-start">
          {isSubmitting ? 'Submitting…' : 'Submit Feedback'}
        </ABButton>
      </form>
    </div>
  )
}
