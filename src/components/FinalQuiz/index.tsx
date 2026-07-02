'use client'

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ABButton } from '@/components/ui/ab-button'
import { ABInput } from '@/components/ui/ab-form-fields'
import {
  FINAL_QUIZ_PASS_THRESHOLD,
  FINAL_QUIZ_TOTAL_QUESTIONS,
  type FinalQuizQuestion,
} from '@/data/final-quiz-questions'

type Props = {
  questions: FinalQuizQuestion[]
  language: 'en' | 'fr'
  variant: 'email' | 'telegram'
  uniqueId?: string
  email?: string
}

const PASS_COUNT = Math.ceil((FINAL_QUIZ_PASS_THRESHOLD / 100) * FINAL_QUIZ_TOTAL_QUESTIONS)

export function FinalQuiz({ questions, language, variant, uniqueId, email: initialEmail }: Props) {
  const router = useRouter()
  const isFr = language === 'fr'

  const [stage, setStage] = useState<'identity' | 'quiz' | 'submitting'>(() =>
    variant === 'email' && !initialEmail ? 'identity' : 'quiz',
  )
  const [email, setEmail] = useState(initialEmail ?? '')
  const [emailError, setEmailError] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<(string | null)[]>(() => Array(questions.length).fill(null))
  const [error, setError] = useState('')

  const currentQuestion = questions[currentIndex]
  const selectedValue = answers[currentIndex]
  const isLastQuestion = currentIndex === questions.length - 1

  const t = useMemo(
    () => ({
      title: isFr ? 'Quiz Final BFB' : 'BFB Final Quiz',
      questionOf: (current: number, total: number) =>
        isFr ? `Question ${current} sur ${total}` : `Question ${current} of ${total}`,
      emailPrompt: isFr ? 'Entrez votre email pour commencer le quiz.' : 'Enter your email to start the quiz.',
      emailLabel: isFr ? 'Votre email' : 'Your email',
      emailPlaceholder: 'amara@example.com',
      startQuiz: isFr ? 'Commencer le quiz' : 'Start Quiz',
      next: isFr ? 'Suivant' : 'Next',
      previous: isFr ? 'Précédent' : 'Previous',
      submit: isFr ? 'Soumettre le quiz' : 'Submit Quiz',
      submitting: isFr ? 'Envoi en cours…' : 'Submitting…',
      invalidEmail: isFr ? 'Veuillez entrer une adresse email valide.' : 'Please enter a valid email address.',
      networkError: isFr ? 'Erreur réseau. Réessayez.' : 'Network error. Please try again.',
      submitError: isFr ? 'Une erreur est survenue.' : 'An error occurred.',
      missingTelegramId: isFr
        ? 'Code unique manquant. Utilisez le lien depuis Telegram.'
        : 'Missing unique ID. Please use the link from Telegram.',
    }),
    [isFr],
  )

  function handleEmailStart(event: React.FormEvent) {
    event.preventDefault()
    const trimmed = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError(t.invalidEmail)
      return
    }
    setEmailError('')
    setEmail(trimmed)
    setStage('quiz')
  }

  function handleSelect(value: string) {
    setAnswers((prev) => {
      const next = [...prev]
      next[currentIndex] = value
      return next
    })
  }

  function scoreQuiz() {
    const totalCorrect = answers.reduce((count, answer, index) => {
      if (!answer) return count
      const correct = questions[index]?.options.find((option) => option.correct)
      return correct?.value === answer ? count + 1 : count
    }, 0)

    const scorePercentage = Math.round((totalCorrect / FINAL_QUIZ_TOTAL_QUESTIONS) * 100)
    const passed = scorePercentage >= FINAL_QUIZ_PASS_THRESHOLD

    return { totalCorrect, scorePercentage, passed }
  }

  async function handleSubmit() {
    if (variant === 'telegram' && !uniqueId) {
      setError(t.missingTelegramId)
      return
    }

    setStage('submitting')
    setError('')

    const { totalCorrect, scorePercentage, passed } = scoreQuiz()

    try {
      const res = await fetch('/api/course/final-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: variant === 'email' ? email.trim() : undefined,
          uniqueId: variant === 'telegram' ? uniqueId : undefined,
          totalScore: totalCorrect,
          scorePercentage,
          language,
          variant,
          passed,
        }),
      })

      const json = (await res.json()) as { redirectUrl?: string; error?: string }

      if (!res.ok || !json.redirectUrl) {
        setError(json.error ?? t.submitError)
        setStage('quiz')
        return
      }

      router.push(json.redirectUrl)
    } catch {
      setError(t.networkError)
      setStage('quiz')
    }
  }

  if (stage === 'identity') {
    return (
      <div className="mx-auto max-w-md py-12">
        <h1 className="mb-2 text-2xl font-bold text-brand-secondary">{t.title}</h1>
        <p className="mb-8 text-sm text-brand-text-muted">{t.emailPrompt}</p>
        <form onSubmit={handleEmailStart} noValidate className="flex flex-col gap-4">
          <ABInput
            label={t.emailLabel}
            type="email"
            placeholder={t.emailPlaceholder}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={emailError}
          />
          <ABButton type="submit" variant="primary" size="lg" className="mt-2 w-full justify-center">
            {t.startQuiz}
          </ABButton>
        </form>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-brand-secondary">{t.title}</h1>
        <span className="rounded-full bg-brand-cream px-4 py-1.5 text-sm font-medium text-brand-text-muted">
          {t.questionOf(currentIndex + 1, questions.length)}
        </span>
      </div>

      <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-brand-border-light">
        <div
          className="h-full rounded-full bg-brand-accent transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      <div className="rounded-card border border-brand-border-light bg-white p-6 sm:p-8">
        <p className="mb-6 text-lg font-semibold text-brand-secondary sm:text-xl">
          {currentQuestion.id}. {currentQuestion.question}
        </p>

        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedValue === option.value
            return (
              <label
                key={option.value}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
                  isSelected
                    ? 'border-brand-accent bg-brand-accent/10'
                    : 'border-brand-border-light hover:bg-brand-cream'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={option.value}
                  checked={isSelected}
                  onChange={() => handleSelect(option.value)}
                  className="h-4 w-4 accent-brand-accent"
                />
                <span className="text-sm text-brand-text-dark sm:text-base">{option.label}</span>
              </label>
            )
          })}
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-brand-text-muted">
        {isFr
          ? `Seuil de réussite : ${FINAL_QUIZ_PASS_THRESHOLD}% (${PASS_COUNT}/${FINAL_QUIZ_TOTAL_QUESTIONS})`
          : `Pass threshold: ${FINAL_QUIZ_PASS_THRESHOLD}% (${PASS_COUNT}/${FINAL_QUIZ_TOTAL_QUESTIONS})`}
      </p>

      <div className="mt-8 flex items-center justify-between gap-4">
        <ABButton
          type="button"
          variant="outline"
          size="md"
          disabled={currentIndex === 0 || stage === 'submitting'}
          onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}
        >
          {t.previous}
        </ABButton>

        {isLastQuestion ? (
          <ABButton
            type="button"
            variant="primary"
            size="lg"
            disabled={!selectedValue || stage === 'submitting'}
            onClick={handleSubmit}
            className="px-8"
          >
            {stage === 'submitting' ? t.submitting : t.submit}
          </ABButton>
        ) : (
          <ABButton
            type="button"
            variant="primary"
            size="lg"
            disabled={!selectedValue}
            onClick={() => setCurrentIndex((index) => Math.min(questions.length - 1, index + 1))}
            className="px-8"
          >
            {t.next}
          </ABButton>
        )}
      </div>
    </div>
  )
}
