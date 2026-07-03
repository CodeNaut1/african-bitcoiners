import React from 'react'
import { notFound } from 'next/navigation'
import { revalidatePath, revalidateTag } from 'next/cache'

import { Container } from '@/components/ui/container'
import { DailyQuiz } from '@/components/DailyQuiz'
import {
  getDailyQuizFeedbackFields,
  getDailyQuizQuestions,
} from '@/lib/quiz-questions'
import { isValidDailyQuizDay, type QuizLanguage } from '@/lib/quiz-shared'

export const metadata = {
  title: 'Daily Quiz — Bitcoin for Beginners Course',
  description: 'Daily quiz for the Bitcoin for Beginners course.',
}

export const revalidate = 3600

type Props = {
  params: Promise<{ day: string }>
  searchParams: Promise<{ lang?: string; course_email?: string; revalidate?: string }>
}

function parseLanguage(lang: string | undefined): QuizLanguage {
  return lang === 'fr' ? 'fr' : 'en'
}

export default async function DailyQuizPage({ params, searchParams }: Props) {
  const { day: dayParam } = await params
  const { lang, course_email: courseEmail = '', revalidate: revalidateParam } = await searchParams

  const day = Number.parseInt(dayParam, 10)
  if (!isValidDailyQuizDay(day)) {
    notFound()
  }

  const language = parseLanguage(lang)

  if (revalidateParam === 'true') {
    try {
      revalidateTag(`quiz-daily-${day}-${language}`, 'max')
      revalidateTag(`quiz-daily-feedback-${language}`, 'max')
      revalidatePath(`/daily-quiz/${day}`)
    } catch {
      /* outside Next.js runtime */
    }
  }

  const [questions, feedbackFields] = await Promise.all([
    getDailyQuizQuestions(day, language),
    getDailyQuizFeedbackFields(language),
  ])

  if (!questions.length) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-brand-cream py-12">
      <Container>
        <DailyQuiz
          day={day}
          language={language}
          questions={questions}
          courseEmail={courseEmail}
          feedbackFields={feedbackFields}
        />
      </Container>
    </div>
  )
}
