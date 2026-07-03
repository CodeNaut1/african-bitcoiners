import React from 'react'
import { notFound } from 'next/navigation'
import { revalidatePath, revalidateTag } from 'next/cache'

import { DailyQuizFeedback } from '@/components/DailyQuizFeedback'
import { Container } from '@/components/ui/container'
import { getDailyQuizFeedbackFields } from '@/lib/quiz-questions'
import { isValidDailyQuizDay, type QuizLanguage } from '@/lib/quiz-shared'

export const metadata = {
  title: 'Daily Quiz Feedback — Bitcoin for Beginners Course',
  description: 'Share feedback on your daily Bitcoin for Beginners course lesson.',
}

export const revalidate = 3600

type Props = {
  params: Promise<{ day: string }>
  searchParams: Promise<{ lang?: string; course_email?: string; revalidate?: string }>
}

function parseLanguage(lang: string | undefined): QuizLanguage {
  return lang === 'fr' ? 'fr' : 'en'
}

export default async function DailyQuizFeedbackPage({ params, searchParams }: Props) {
  const { day: dayParam } = await params
  const { lang, course_email: courseEmail = '', revalidate: revalidateParam } = await searchParams

  const day = Number.parseInt(dayParam, 10)
  if (!isValidDailyQuizDay(day)) {
    notFound()
  }

  const language = parseLanguage(lang)

  if (revalidateParam === 'true') {
    try {
      revalidateTag(`quiz-daily-feedback-${language}`, 'max')
      revalidatePath(`/daily-quiz-feedback/${day}`)
    } catch {
      /* outside Next.js runtime */
    }
  }

  const feedbackFields = await getDailyQuizFeedbackFields(language)

  if (!feedbackFields.length) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-brand-cream py-12">
      <Container>
        <div className="mx-auto w-full max-w-3xl">
          <DailyQuizFeedback
            day={day}
            language={language}
            courseEmail={courseEmail}
            fields={feedbackFields}
          />
        </div>
      </Container>
    </div>
  )
}
