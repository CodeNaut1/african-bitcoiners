'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { ABButton } from '@/components/ui/ab-button'
import { ABInput } from '@/components/ui/ab-form-fields'
import type { FinalQuestion } from '@/data/final-quiz-questions'

type Props = {
  questions: FinalQuestion[]
  lang: 'en' | 'fr'
  deliveryMethod: 'email' | 'telegram'
  passUrl: string
  failUrl: string
}

const QUESTIONS_PER_PAGE = 10

const emailSchema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
})
const telegramSchema = z.object({
  uniqueCode: z.string().min(7, 'Enter your 7-character course code'),
})
type EmailFields = z.infer<typeof emailSchema>
type TelegramFields = z.infer<typeof telegramSchema>

export function FinalQuiz({ questions, lang, deliveryMethod, passUrl, failUrl }: Props) {
  const router = useRouter()
  const isFr = lang === 'fr'
  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE)

  const [page, setPage] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null))
  const [stage, setStage] = useState<'quiz' | 'info' | 'submitting'>('quiz')
  const [error, setError] = useState('')

  const startIdx = page * QUESTIONS_PER_PAGE
  const pageQuestions = questions.slice(startIdx, startIdx + QUESTIONS_PER_PAGE)

  const emailForm = useForm<EmailFields>({ resolver: zodResolver(emailSchema) })
  const tgForm = useForm<TelegramFields>({ resolver: zodResolver(telegramSchema) })

  function handleAnswer(absoluteIdx: number, optIdx: number) {
    setAnswers((prev) => {
      const next = [...prev]
      next[absoluteIdx] = optIdx
      return next
    })
  }

  function handlePageNext() {
    const unanswered = pageQuestions.findIndex((_, i) => answers[startIdx + i] === null)
    if (unanswered !== -1) {
      alert(isFr
        ? `Veuillez répondre à la question ${startIdx + unanswered + 1}.`
        : `Please answer question ${startIdx + unanswered + 1}.`)
      return
    }
    if (page < totalPages - 1) {
      setPage((p) => p + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setStage('info')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  async function submitToApi(payload: Record<string, unknown>) {
    setStage('submitting')
    setError('')
    const score = answers.filter((a, i) => a === questions[i].correctIndex).length
    const scorePercent = Math.round((score / questions.length) * 100)

    try {
      const res = await fetch('/api/course/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          score,
          scorePercent,
          lang: isFr ? 'French' : 'English',
          deliveryMethod,
          answers,
        }),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error ?? (isFr ? 'Une erreur est survenue.' : 'An error occurred.'))
        setStage('info')
        return
      }
      const dest = json.passed
        ? `${passUrl}?cert=${encodeURIComponent(json.certNumber)}`
        : failUrl
      router.push(dest)
    } catch {
      setError(isFr ? 'Erreur réseau. Réessayez.' : 'Network error. Please try again.')
      setStage('info')
    }
  }

  async function onEmailSubmit(data: EmailFields) {
    await submitToApi({ name: data.name, email: data.email })
  }

  async function onTelegramSubmit(data: TelegramFields) {
    await submitToApi({ uniqueCode: data.uniqueCode })
  }

  const t = {
    title: isFr ? 'Quiz Final BFB' : 'BFB Final Quiz',
    page: isFr ? 'Page' : 'Page',
    of: isFr ? 'sur' : 'of',
    next: isFr ? 'Page suivante →' : 'Next Page →',
    finish: isFr ? 'Terminer le quiz →' : 'Finish Quiz →',
    infoTitle: isFr ? 'Vos informations' : 'Your Information',
    infoSub: isFr ? 'Entrez vos coordonnées pour soumettre le quiz.' : 'Enter your details to submit your quiz.',
    submit: isFr ? 'Soumettre' : 'Submit',
    submitting: isFr ? 'Envoi en cours…' : 'Submitting…',
  }

  if (stage === 'info' || stage === 'submitting') {
    const isLoading = stage === 'submitting'
    return (
      <div className="max-w-md mx-auto py-12">
        <h2 className="text-2xl font-bold text-brand-secondary mb-2">{t.infoTitle}</h2>
        <p className="text-sm text-brand-text-muted mb-8">{t.infoSub}</p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
        )}

        {deliveryMethod === 'email' ? (
          <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} noValidate className="flex flex-col gap-4">
            <ABInput
              label={isFr ? 'Votre nom' : 'Your name'}
              placeholder={isFr ? 'Amara Diallo' : 'Amara Diallo'}
              error={emailForm.formState.errors.name?.message}
              {...emailForm.register('name')}
            />
            <ABInput
              label={isFr ? 'Votre email' : 'Your email'}
              type="email"
              placeholder="amara@example.com"
              error={emailForm.formState.errors.email?.message}
              {...emailForm.register('email')}
            />
            <ABButton type="submit" variant="primary" size="lg" disabled={isLoading} className="w-full justify-center mt-2">
              {isLoading ? t.submitting : t.submit}
            </ABButton>
          </form>
        ) : (
          <form onSubmit={tgForm.handleSubmit(onTelegramSubmit)} noValidate className="flex flex-col gap-4">
            <ABInput
              label={isFr ? 'Votre code unique (7 caractères)' : 'Your unique code (7 characters)'}
              placeholder="ABC2345"
              error={tgForm.formState.errors.uniqueCode?.message}
              {...tgForm.register('uniqueCode')}
            />
            <p className="text-xs text-brand-text-muted">
              {isFr ? 'Ce code vous a été fourni lors de votre inscription.' : 'This code was given to you when you signed up.'}
            </p>
            <ABButton type="submit" variant="primary" size="lg" disabled={isLoading} className="w-full justify-center mt-2">
              {isLoading ? t.submitting : t.submit}
            </ABButton>
          </form>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-brand-secondary">{t.title}</h1>
        <span className="text-sm font-medium text-brand-text-muted bg-brand-cream rounded-full px-4 py-1.5">
          {t.page} {page + 1} {t.of} {totalPages}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-brand-border-light rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-brand-primary rounded-full transition-all duration-300"
          style={{ width: `${((page + 1) / totalPages) * 100}%` }}
        />
      </div>

      {/* Questions */}
      <div className="flex flex-col gap-5">
        {pageQuestions.map((q, pi) => {
          const absIdx = startIdx + pi
          return (
            <div key={absIdx} className="bg-white rounded-card border border-brand-border-light p-5">
              <p className="font-semibold text-brand-secondary mb-3">
                {absIdx + 1}. {q.question}
              </p>
              <div className="flex flex-col gap-2">
                {q.options.map((opt, oi) => (
                  <label
                    key={oi}
                    className={`flex items-center gap-3 cursor-pointer rounded-lg px-4 py-2.5 border transition-colors ${
                      answers[absIdx] === oi
                        ? 'border-brand-primary bg-brand-primary/5'
                        : 'border-brand-border-light hover:bg-brand-cream'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q${absIdx}`}
                      value={oi}
                      checked={answers[absIdx] === oi}
                      onChange={() => handleAnswer(absIdx, oi)}
                      className="accent-brand-primary h-4 w-4"
                    />
                    <span className="text-sm text-brand-text-dark">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Nav */}
      <div className="mt-8 flex justify-between items-center">
        {page > 0 ? (
          <ABButton
            type="button"
            variant="outline"
            size="md"
            onClick={() => { setPage((p) => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          >
            {isFr ? '← Page précédente' : '← Previous Page'}
          </ABButton>
        ) : <span />}
        <ABButton type="button" variant="primary" size="lg" onClick={handlePageNext} className="px-10">
          {page < totalPages - 1 ? t.next : t.finish}
        </ABButton>
      </div>
    </div>
  )
}
