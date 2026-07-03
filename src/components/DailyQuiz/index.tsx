'use client'

import React, { useMemo, useRef, useState } from 'react'

import { DailyQuizFeedback } from '@/components/DailyQuizFeedback'
import type { FeedbackFieldDefinition, QuizQuestion } from '@/lib/quiz-shared'

type Props = {
  day: number
  language: 'en' | 'fr'
  questions: QuizQuestion[]
  courseEmail: string
  feedbackFields: FeedbackFieldDefinition[]
}

type AnswerRecord = {
  questionId: number
  selected: string
  correct: string
}

type QuizResult = {
  score: number
  totalQuestions: number
  answers: AnswerRecord[]
}

function QuestionCard({
  question,
  selectedValue,
  onSelect,
}: {
  question: QuizQuestion
  selectedValue: string | null
  onSelect: (value: string) => void
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
                name={`question-${question.id}`}
                value={option.value}
                checked={isSelected}
                onChange={() => onSelect(option.value)}
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

function optionLabel(question: QuizQuestion, value: string): string {
  return question.options.find((option) => option.value === value)?.label ?? value
}

export function DailyQuiz({ day, language, questions, courseEmail, feedbackFields }: Props) {
  const isFr = language === 'fr'
  const resultsRef = useRef<HTMLDivElement>(null)

  const [answers, setAnswers] = useState<(string | null)[]>(() =>
    Array(questions.length).fill(null),
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<QuizResult | null>(null)

  const allAnswered = answers.every((answer) => answer != null)

  const t = useMemo(
    () => ({
      heading: isFr ? `Quiz du Jour ${day}` : `Day ${day} Quiz`,
      subheading: isFr ? 'Cours Bitcoin pour Débutants' : 'Bitcoin for Beginners Course',
      submit: isFr ? 'Soumettre le quiz' : 'Submit Quiz',
      submitting: isFr ? 'Envoi en cours…' : 'Submitting…',
      score: (score: number, total: number) =>
        isFr ? `Vous avez obtenu ${score} sur ${total}` : `You scored ${score} out of ${total}`,
      yourAnswer: isFr ? 'Votre réponse' : 'Your answer',
      correctAnswer: isFr ? 'Bonne réponse' : 'Correct answer',
      submitError: isFr ? 'Échec de la soumission. Veuillez réessayer.' : 'Submission failed. Please try again.',
      networkError: isFr ? 'Erreur réseau. Veuillez réessayer.' : 'Network error. Please try again.',
    }),
    [day, isFr],
  )

  function handleSelect(questionIndex: number, value: string) {
    setAnswers((prev) => {
      const next = [...prev]
      next[questionIndex] = value
      return next
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!allAnswered || isSubmitting) return

    const answerRecords: AnswerRecord[] = questions.map((question, index) => ({
      questionId: question.id,
      selected: answers[index]!,
      correct: question.correct,
    }))

    const score = answerRecords.filter((record) => record.selected === record.correct).length
    const totalQuestions = questions.length

    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/course/daily-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          day,
          email: courseEmail,
          language,
          score,
          totalQuestions,
          answers: answerRecords,
        }),
      })

      if (!res.ok) {
        setError(t.submitError)
        setIsSubmitting(false)
        return
      }

      setResult({ score, totalQuestions, answers: answerRecords })
      setIsSubmitting(false)

      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    } catch {
      setError(t.networkError)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <header className="mb-10 text-center">
        <h1 className="font-heading text-3xl font-bold text-brand-secondary sm:text-4xl">
          {t.heading}
        </h1>
        <p className="mt-2 text-lg text-brand-text-muted">{t.subheading}</p>
      </header>

      {!result ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input type="hidden" name="course_email" value={courseEmail} readOnly />

          {questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              selectedValue={answers[index]}
              onSelect={(value) => handleSelect(index, value)}
            />
          ))}

          {error && <p className="text-center text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={!allAnswered || isSubmitting}
            className="self-center rounded-btn bg-brand-primary px-10 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-secondary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? t.submitting : t.submit}
          </button>
        </form>
      ) : (
        <div ref={resultsRef} className="flex flex-col gap-8">
          <div className="rounded-card border border-brand-border-light bg-white p-6 text-center sm:p-8">
            <p className="font-heading text-2xl font-bold text-brand-secondary">
              {t.score(result.score, result.totalQuestions)}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {questions.map((question) => {
              const record = result.answers.find((entry) => entry.questionId === question.id)
              const isCorrect = record?.selected === record?.correct

              if (isCorrect) {
                return (
                  <div
                    key={question.id}
                    className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3"
                  >
                    <span className="text-lg text-green-600" aria-hidden>
                      ✓
                    </span>
                    <p className="text-sm font-medium text-green-800 sm:text-base">
                      {question.id}. {question.question}
                    </p>
                  </div>
                )
              }

              return (
                <div
                  key={question.id}
                  className="rounded-card border border-red-200 bg-white p-6 sm:p-8"
                >
                  <p className="mb-4 text-lg font-semibold text-brand-secondary">
                    {question.id}. {question.question}
                  </p>
                  <p className="text-sm text-red-600">
                    <span className="font-semibold">{t.yourAnswer}: </span>
                    {optionLabel(question, record?.selected ?? '')}
                  </p>
                  <p className="mt-2 text-sm text-green-700">
                    <span className="font-semibold">{t.correctAnswer}: </span>
                    {optionLabel(question, record?.correct ?? question.correct)}
                  </p>
                  {question.explanation && (
                    <p className="mt-2 text-sm text-brand-text-muted">{question.explanation}</p>
                  )}
                </div>
              )
            })}
          </div>

          <DailyQuizFeedback
            day={day}
            language={language}
            courseEmail={courseEmail}
            fields={feedbackFields}
          />
        </div>
      )}
    </div>
  )
}
