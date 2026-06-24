'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ABButton } from '@/components/ui/ab-button'
import { ABInput } from '@/components/ui/ab-form-fields'
import type { DayQuiz } from '@/data/course-quizzes'

type Props = {
  quiz: DayQuiz
}

type Stage = 'quiz' | 'email' | 'result'

const emailSchema = z.object({ email: z.string().email('Valid email required') })
type EmailFields = z.infer<typeof emailSchema>

export function CourseQuiz({ quiz }: Props) {
  const isFr = quiz.lang === 'fr'
  const [answers, setAnswers] = useState<(number | null)[]>(Array(quiz.questions.length).fill(null))
  const [stage, setStage] = useState<Stage>('quiz')
  const [score, setScore] = useState(0)
  const [saving, setSaving] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<EmailFields>({
    resolver: zodResolver(emailSchema),
  })

  function handleAnswer(qIndex: number, optIndex: number) {
    setAnswers((prev) => {
      const next = [...prev]
      next[qIndex] = optIndex
      return next
    })
  }

  function handleQuizSubmit(e: React.FormEvent) {
    e.preventDefault()
    const unanswered = answers.findIndex((a) => a === null)
    if (unanswered !== -1) {
      alert(isFr ? `Veuillez répondre à la question ${unanswered + 1}.` : `Please answer question ${unanswered + 1}.`)
      return
    }
    const correct = answers.filter((a, i) => a === quiz.questions[i].correctIndex).length
    setScore(correct)
    setStage('email')
  }

  async function handleEmailSubmit(data: EmailFields) {
    setSaving(true)
    await fetch('/api/forms/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'quiz',
        data: {
          email: data.email,
          day: quiz.day,
          lang: quiz.lang,
          score,
          total: quiz.questions.length,
          scorePercent: Math.round((score / quiz.questions.length) * 100),
          answers,
        },
      }),
    })
    setSaving(false)
    setStage('result')
  }

  const t = {
    title: isFr ? `Quiz du jour ${quiz.day}` : `Day ${quiz.day} Quiz`,
    of: isFr ? 'sur' : 'of',
    submit: isFr ? 'Soumettre mes réponses' : 'Submit My Answers',
    emailPrompt: isFr ? 'Entrez votre email pour recevoir votre score.' : 'Enter your email to receive your score.',
    seeResult: isFr ? 'Voir mon résultat' : 'See My Result',
    score: isFr ? 'Votre score' : 'Your Score',
    correct: isFr ? 'bonnes réponses' : 'correct answers',
    passed: isFr ? 'Félicitations ! Vous avez réussi.' : 'Congratulations! You passed.',
    failed: isFr ? 'Continuez à apprendre !' : 'Keep learning — you\'ve got this!',
  }

  const pct = Math.round((score / quiz.questions.length) * 100)
  const passed = pct >= 70

  if (stage === 'result') {
    return (
      <div className="max-w-xl mx-auto text-center py-12 flex flex-col items-center gap-4">
        <div className={`h-20 w-20 rounded-full flex items-center justify-center text-3xl font-bold ${passed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
          {pct}%
        </div>
        <h2 className="text-2xl font-bold text-brand-secondary">{t.score}</h2>
        <p className="text-brand-text-mid">{score} {t.of} {quiz.questions.length} {t.correct}</p>
        <p className="font-semibold text-brand-primary">{passed ? t.passed : t.failed}</p>

        {/* Show correct answers */}
        <div className="w-full text-left mt-6 flex flex-col gap-3">
          {quiz.questions.map((q, i) => {
            const userAns = answers[i]
            const correct = userAns === q.correctIndex
            return (
              <div key={i} className={`rounded-card p-4 border ${correct ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                <p className="text-sm font-semibold text-brand-secondary mb-1">{i + 1}. {q.question}</p>
                <p className="text-sm">{correct ? '✅' : '❌'} {q.options[userAns ?? 0]}</p>
                {!correct && <p className="text-xs text-green-700 mt-1">✓ {q.options[q.correctIndex]}</p>}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (stage === 'email') {
    return (
      <div className="max-w-md mx-auto py-12 flex flex-col items-center gap-6">
        <p className="text-lg font-semibold text-brand-secondary text-center">{t.emailPrompt}</p>
        <form onSubmit={handleSubmit(handleEmailSubmit)} noValidate className="w-full flex flex-col gap-4">
          <ABInput type="email" label="Email" placeholder="amara@example.com" error={errors.email?.message} {...register('email')} />
          <ABButton type="submit" variant="primary" size="md" disabled={saving} className="w-full justify-center">
            {saving ? '…' : t.seeResult}
          </ABButton>
        </form>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-brand-secondary mb-2">{t.title}: {quiz.title}</h1>
      <p className="text-sm text-brand-text-muted mb-8">{quiz.questions.length} questions — {isFr ? 'Sélectionnez la meilleure réponse' : 'Select the best answer'}</p>

      <form onSubmit={handleQuizSubmit} className="flex flex-col gap-6">
        {quiz.questions.map((q, qi) => (
          <div key={qi} className="bg-white rounded-card border border-brand-border-light p-5">
            <p className="font-semibold text-brand-secondary mb-3">{qi + 1}. {q.question}</p>
            <div className="flex flex-col gap-2">
              {q.options.map((opt, oi) => (
                <label key={oi} className={`flex items-center gap-3 cursor-pointer rounded-lg px-4 py-2.5 border transition-colors ${answers[qi] === oi ? 'border-brand-primary bg-brand-primary/5' : 'border-brand-border-light hover:bg-brand-cream'}`}>
                  <input
                    type="radio"
                    name={`q${qi}`}
                    value={oi}
                    checked={answers[qi] === oi}
                    onChange={() => handleAnswer(qi, oi)}
                    className="accent-brand-primary h-4 w-4"
                  />
                  <span className="text-sm text-brand-text-dark">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <ABButton type="submit" variant="primary" size="lg" className="self-center px-12">
          {t.submit}
        </ABButton>
      </form>
    </div>
  )
}
