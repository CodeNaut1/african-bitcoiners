'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ABButton } from '@/components/ui/ab-button'
import { ABTextarea, ABInput } from '@/components/ui/ab-form-fields'

type Props = {
  context?: string // e.g. 'bfb-course', 'newsletter', 'general'
  lang?: 'en' | 'fr'
}

const schema = z.object({
  npsScore: z.coerce.number().min(1).max(10),
  reason: z.string().min(1, 'Please share your reason'),
  contextRating: z.coerce.number().min(1).max(10).optional(),
  improvement: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  honey: z.string().max(0).optional(),
})
type Fields = z.infer<typeof schema>

const SCORES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function scoreColor(n: number): string {
  if (n <= 6) return 'bg-red-100 border-red-300 text-red-700'
  if (n <= 8) return 'bg-yellow-100 border-yellow-300 text-yellow-700'
  return 'bg-green-100 border-green-300 text-green-700'
}

export function NpsForm({ context = 'general', lang = 'en' }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const isFr = lang === 'fr'

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<Fields>({
    resolver: zodResolver(schema),
  })

  const npsScore = watch('npsScore')

  async function onSubmit(data: Fields) {
    if (data.honey) return
    await fetch('/api/forms/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formType: 'nps', data: { ...data, context } }),
    })
    setSubmitted(true)
  }

  const t = {
    title: isFr ? 'Votre avis compte' : 'Your Feedback Matters',
    q1: isFr
      ? 'Quelle est la probabilité que vous recommandiez African Bitcoiners à un ami ou un collègue ?'
      : 'How likely are you to recommend African Bitcoiners to a friend or colleague?',
    notLikely: isFr ? 'Pas du tout' : 'Not at all',
    veryLikely: isFr ? 'Très probable' : 'Extremely likely',
    q2: isFr ? 'Pourquoi avez-vous donné ce score ?' : 'What\'s the main reason for your score?',
    q2ph: isFr ? 'Partagez vos raisons…' : 'Share your reasons…',
    q3: isFr ? 'Comment évaluez-vous notre contenu globalement ? (1-10)' : 'How do you rate our content overall? (1-10)',
    q4: isFr ? 'Qu\'est-ce qui pourrait être amélioré ?' : 'What could we improve?',
    q4ph: isFr ? 'Suggestions d\'amélioration…' : 'Suggestions for improvement…',
    emailLabel: isFr ? 'Email (optionnel)' : 'Email (optional)',
    emailPh: 'amara@example.com',
    submit: isFr ? 'Envoyer mes commentaires' : 'Submit Feedback',
    submitting: isFr ? 'Envoi…' : 'Submitting…',
    thanks: isFr ? 'Merci pour vos commentaires !' : 'Thank you for your feedback!',
    thanksSub: isFr
      ? 'Vos réponses nous aident à améliorer la communauté African Bitcoiners.'
      : 'Your responses help us improve the African Bitcoiners community.',
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto py-16 text-center flex flex-col items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-7 w-7 text-green-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <p className="font-bold text-brand-secondary text-lg">{t.thanks}</p>
        <p className="text-sm text-brand-text-muted">{t.thanksSub}</p>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-brand-secondary mb-6">{t.title}</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-7">
        {/* Honeypot */}
        <input type="text" {...register('honey')} className="hidden" tabIndex={-1} aria-hidden="true" />

        {/* NPS Score */}
        <div>
          <p className="text-sm font-medium text-brand-text-dark mb-3">{t.q1}</p>
          <div className="grid grid-cols-10 gap-1.5">
            {SCORES.map((n) => (
              <label
                key={n}
                className={`flex items-center justify-center py-2 rounded-lg border cursor-pointer font-bold text-sm transition-colors ${
                  Number(npsScore) === n
                    ? scoreColor(n) + ' border-2'
                    : 'border-brand-border-light hover:bg-brand-cream'
                }`}
              >
                <input type="radio" value={n} {...register('npsScore')} className="sr-only" />
                {n}
              </label>
            ))}
          </div>
          <div className="flex justify-between text-xs text-brand-text-muted mt-1">
            <span>{t.notLikely}</span>
            <span>{t.veryLikely}</span>
          </div>
          {errors.npsScore && <p className="text-xs text-red-600 mt-1">{errors.npsScore.message}</p>}
        </div>

        {/* Reason */}
        <ABTextarea
          label={t.q2}
          rows={3}
          placeholder={t.q2ph}
          error={errors.reason?.message}
          {...register('reason')}
        />

        {/* Context rating */}
        <div>
          <p className="text-sm font-medium text-brand-text-dark mb-3">{t.q3}</p>
          <div className="grid grid-cols-10 gap-1.5">
            {SCORES.map((n) => {
              const val = watch('contextRating')
              return (
                <label
                  key={n}
                  className={`flex items-center justify-center py-2 rounded-lg border cursor-pointer font-bold text-sm transition-colors ${
                    Number(val) === n
                      ? scoreColor(n) + ' border-2'
                      : 'border-brand-border-light hover:bg-brand-cream'
                  }`}
                >
                  <input type="radio" value={n} {...register('contextRating')} className="sr-only" />
                  {n}
                </label>
              )
            })}
          </div>
        </div>

        {/* Improvement */}
        <ABTextarea
          label={t.q4}
          rows={3}
          placeholder={t.q4ph}
          {...register('improvement')}
        />

        {/* Email */}
        <ABInput
          label={t.emailLabel}
          type="email"
          placeholder={t.emailPh}
          error={errors.email?.message}
          {...register('email')}
        />

        <ABButton type="submit" variant="primary" size="lg" disabled={isSubmitting} className="self-start">
          {isSubmitting ? t.submitting : t.submit}
        </ABButton>
      </form>
    </div>
  )
}
