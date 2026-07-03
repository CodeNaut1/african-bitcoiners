'use client'

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ABButton } from '@/components/ui/ab-button'
import { ABInput } from '@/components/ui/ab-form-fields'
import {
  FINAL_QUIZ_PASS_THRESHOLD,
  FINAL_QUIZ_TOTAL_QUESTIONS,
  type QuizQuestion,
} from '@/lib/quiz-shared'
import { buildCourseErrorUrl } from '@/lib/course-quiz-validation-shared'

type Props = {
  questions: QuizQuestion[]
  language: 'en' | 'fr'
  variant: 'email' | 'telegram'
  uniqueId?: string
  email?: string
}

type Stage = 'identity' | 'checking' | 'quiz' | 'submitting'

const PASS_COUNT = Math.ceil((FINAL_QUIZ_PASS_THRESHOLD / 100) * FINAL_QUIZ_TOTAL_QUESTIONS)
const QUESTIONS_PER_PAGE = 2

const INSTRUCTIONS = {
  en: {
    intro: 'Please read the following instructions before you begin:',
    firstBullet: {
      email: 'Please ensure you use the same email address used in signing up and taking the course.',
      telegram:
        'Please ensure you use the same unique code you received when signing up for the course.',
    },
    otherBullets: [
      'You need at least 70% to pass this course and qualify for a Certificate.',
      'You only have 2 attempts at the quiz - If you do not pass the course now, kindly wait for at least 5 days to retry taking it (A reminder email will be sent).',
    ],
  },
  fr: {
    intro: 'Veuillez lire les instructions suivantes avant de commencer :',
    firstBullet: {
      email: "Veuillez vous assurer d'utiliser la même adresse email utilisée pour l'inscription et le suivi du cours.",
      telegram:
        "Veuillez vous assurer d'utiliser le même code unique que vous avez reçu lors de votre inscription au cours.",
    },
    otherBullets: [
      'Vous avez besoin d\'au moins 70% pour réussir ce cours et obtenir un Certificat.',
      'Vous n\'avez que 2 tentatives au quiz - Si vous ne réussissez pas maintenant, veuillez attendre au moins 5 jours pour réessayer (un email de rappel sera envoyé).',
    ],
  },
} as const

function QuizInstructions({
  language,
  variant,
}: {
  language: 'en' | 'fr'
  variant: 'email' | 'telegram'
}) {
  const copy = INSTRUCTIONS[language]
  const bullets = [copy.firstBullet[variant], ...copy.otherBullets]
  return (
    <div className="mb-8 rounded-lg border border-brand-border-light bg-[#FFF8F0] px-5 py-4 sm:px-6">
      <p className="mb-3 text-sm font-medium text-brand-secondary sm:text-base">{copy.intro}</p>
      <ul className="space-y-2 text-sm text-brand-text-dark sm:text-base">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" aria-hidden />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function QuestionCard({
  question,
  questionIndex,
  selectedValue,
  onSelect,
}: {
  question: QuizQuestion
  questionIndex: number
  selectedValue: string | null
  onSelect: (index: number, value: string) => void
}) {
  return (
    <div className="rounded-card border border-brand-border-light bg-white p-6 sm:p-8">
      <p className="mb-6 text-lg font-semibold text-brand-secondary sm:text-xl">
        {question.id}. {question.question}
      </p>
      <div className="flex flex-col gap-3">
        {question.options.map((option) => {
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
                name={`question-${questionIndex}`}
                value={option.value}
                checked={isSelected}
                onChange={() => onSelect(questionIndex, option.value)}
                className="h-4 w-4 accent-brand-accent"
              />
              <span className="text-sm text-brand-text-dark sm:text-base">{option.label}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

export function FinalQuiz({ questions, language, variant, uniqueId: initialUniqueId, email: initialEmail }: Props) {
  const router = useRouter()
  const isFr = language === 'fr'

  const [stage, setStage] = useState<Stage>('identity')
  const [name, setName] = useState('')
  const [email, setEmail] = useState(initialEmail ?? '')
  const [uniqueCode, setUniqueCode] = useState(initialUniqueId ?? '')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [uniqueCodeError, setUniqueCodeError] = useState('')
  const [pageIndex, setPageIndex] = useState(0)
  const [answers, setAnswers] = useState<(string | null)[]>(() => Array(questions.length).fill(null))
  const [error, setError] = useState('')

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE)
  const startIndex = pageIndex * QUESTIONS_PER_PAGE
  const pageQuestions = questions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE)
  const endIndex = Math.min(startIndex + pageQuestions.length, questions.length)
  const isLastPage = pageIndex === totalPages - 1

  const pageAnswered = pageQuestions.every((_, offset) => answers[startIndex + offset] != null)

  const t = useMemo(
    () => ({
      title: isFr ? 'Quiz Final du Cours Bitcoin pour Débutants' : 'Bitcoin for Beginners Course Final Quiz',
      nameLabel: isFr ? 'Nom Complet' : 'Full Name',
      namePlaceholder: isFr ? 'Votre nom complet' : 'Your full name',
      emailLabel: isFr ? 'Adresse Email' : 'Email Address',
      emailPlaceholder: 'amara@example.com',
      uniqueCodeLabel: isFr ? 'Code Unique' : 'Unique Code',
      uniqueCodePlaceholder: 'ABC2345',
      startQuiz: isFr ? 'Commencer le quiz' : 'Start Quiz',
      checking: isFr ? 'Vérification en cours…' : 'Checking eligibility…',
      questionsRange: (from: number, to: number, total: number) =>
        isFr ? `Questions ${from}-${to} sur ${total}` : `Questions ${from}-${to} of ${total}`,
      next: isFr ? 'Suivant' : 'Next',
      previous: isFr ? 'Précédent' : 'Previous',
      submit: isFr ? 'Soumettre le quiz' : 'Submit Quiz',
      submitting: isFr ? 'Envoi en cours…' : 'Submitting…',
      invalidEmail: isFr ? 'Veuillez entrer une adresse email valide.' : 'Please enter a valid email address.',
      nameRequired: isFr ? 'Veuillez entrer votre nom complet.' : 'Please enter your full name.',
      uniqueCodeRequired: isFr ? 'Veuillez entrer votre code unique.' : 'Please enter your unique code.',
      networkError: isFr ? 'Erreur réseau. Réessayez.' : 'Network error. Please try again.',
      submitError: isFr ? 'Une erreur est survenue.' : 'An error occurred.',
      missingTelegramId: isFr
        ? 'Code unique manquant. Utilisez le lien depuis Telegram.'
        : 'Missing unique ID. Please use the link from Telegram.',
    }),
    [isFr],
  )

  async function handleIdentityStart(event: React.FormEvent) {
    event.preventDefault()
    setError('')
    setNameError('')
    setEmailError('')
    setUniqueCodeError('')

    const trimmedName = name.trim()
    if (!trimmedName) {
      setNameError(t.nameRequired)
      return
    }

    if (variant === 'email') {
      const trimmedEmail = email.trim()
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        setEmailError(t.invalidEmail)
        return
      }
      setEmail(trimmedEmail)
    } else {
      const trimmedCode = uniqueCode.trim()
      if (!trimmedCode) {
        setUniqueCodeError(t.uniqueCodeRequired)
        return
      }
      setUniqueCode(trimmedCode)
    }

    setStage('checking')

    try {
      const res = await fetch('/api/course/final-quiz/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: variant === 'email' ? email.trim() : undefined,
          uniqueCode: variant === 'telegram' ? uniqueCode.trim() : undefined,
        }),
      })

      const json = (await res.json()) as {
        ok?: boolean
        error?: boolean
        reason?: string
        message?: string
      }

      if (!res.ok || json.error) {
        const reason = json.reason ?? 'unknown'
        const message = json.message ?? t.submitError
        router.push(buildCourseErrorUrl(reason, message))
        return
      }

      setStage('quiz')
    } catch {
      setError(t.networkError)
      setStage('identity')
    }
  }

  function handleSelect(questionIndex: number, value: string) {
    setAnswers((prev) => {
      const next = [...prev]
      next[questionIndex] = value
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
    const resolvedUniqueId = variant === 'telegram' ? uniqueCode.trim() : undefined
    if (variant === 'telegram' && !resolvedUniqueId) {
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
          uniqueId: resolvedUniqueId,
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

  if (stage === 'identity' || stage === 'checking') {
    return (
      <div className="mx-auto max-w-2xl py-12">
        <h1 className="mb-6 text-2xl font-bold text-brand-secondary sm:text-3xl">{t.title}</h1>
        <QuizInstructions language={language} variant={variant} />

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
        )}

        <form onSubmit={handleIdentityStart} noValidate className="flex flex-col gap-4">
          <ABInput
            label={t.nameLabel}
            type="text"
            placeholder={t.namePlaceholder}
            value={name}
            onChange={(event) => setName(event.target.value)}
            error={nameError}
            required
          />

          {variant === 'email' ? (
            <ABInput
              label={t.emailLabel}
              type="email"
              placeholder={t.emailPlaceholder}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={emailError}
              required
            />
          ) : (
            <ABInput
              label={t.uniqueCodeLabel}
              type="text"
              placeholder={t.uniqueCodePlaceholder}
              value={uniqueCode}
              onChange={(event) => setUniqueCode(event.target.value)}
              error={uniqueCodeError}
              required
            />
          )}

          <ABButton
            type="submit"
            variant="primary"
            size="lg"
            disabled={stage === 'checking'}
            className="mt-2 w-full justify-center"
          >
            {stage === 'checking' ? t.checking : t.startQuiz}
          </ABButton>
        </form>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-brand-secondary sm:text-2xl">{t.title}</h1>
        <span className="rounded-full bg-brand-cream px-4 py-1.5 text-sm font-medium text-brand-text-muted">
          {t.questionsRange(startIndex + 1, endIndex, questions.length)}
        </span>
      </div>

      <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-brand-border-light">
        <div
          className="h-full rounded-full bg-brand-accent transition-all duration-300"
          style={{ width: `${((pageIndex + 1) / totalPages) * 100}%` }}
        />
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      <div className="flex flex-col gap-6">
        {pageQuestions.map((question, offset) => (
          <QuestionCard
            key={question.id}
            question={question}
            questionIndex={startIndex + offset}
            selectedValue={answers[startIndex + offset]}
            onSelect={handleSelect}
          />
        ))}
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
          disabled={pageIndex === 0 || stage === 'submitting'}
          onClick={() => setPageIndex((index) => Math.max(0, index - 1))}
        >
          {t.previous}
        </ABButton>

        {isLastPage ? (
          <ABButton
            type="button"
            variant="primary"
            size="lg"
            disabled={!pageAnswered || stage === 'submitting'}
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
            disabled={!pageAnswered}
            onClick={() => setPageIndex((index) => Math.min(totalPages - 1, index + 1))}
            className="px-8"
          >
            {t.next}
          </ABButton>
        )}
      </div>
    </div>
  )
}
