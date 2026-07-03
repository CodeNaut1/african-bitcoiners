import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

import { isValidDailyQuizDay } from '@/lib/quiz-shared'

type QuizDoc = {
  quizType?: 'daily' | 'final' | 'daily-feedback' | 'final-feedback' | null
  day?: number | null
  language?: 'en' | 'fr' | null
}

function revalidateForDoc(doc: QuizDoc | null | undefined) {
  const quizType = doc?.quizType
  const language = doc?.language ?? 'en'
  const day = doc?.day

  if (!quizType) return

  if (quizType === 'daily' && day != null && isValidDailyQuizDay(day)) {
    try {
      revalidateTag(`quiz-daily-${day}-${language}`, 'max')
      revalidatePath(`/daily-quiz/${day}`)
    } catch {
      /* outside Next.js runtime */
    }
    return
  }

  if (quizType === 'daily-feedback') {
    try {
      revalidateTag(`quiz-daily-feedback-${language}`, 'max')
      for (let d = 1; d <= 20; d++) {
        revalidatePath(`/daily-quiz/${d}`)
        revalidatePath(`/daily-quiz-feedback/${d}`)
      }
    } catch {
      /* outside Next.js runtime */
    }
    return
  }

  if (quizType === 'final') {
    try {
      revalidateTag(`quiz-final-${language}`, 'max')
      revalidatePath(language === 'fr' ? '/final-quiz-fr' : '/final-quiz')
      revalidatePath(language === 'fr' ? '/final-quiz-tg-fr' : '/final-quiz-tg')
    } catch {
      /* outside Next.js runtime */
    }
    return
  }

  if (quizType === 'final-feedback') {
    try {
      revalidateTag(`quiz-final-feedback-${language}`, 'max')
      revalidatePath('/final-quiz-passed')
      revalidatePath('/final-quiz-failed')
      revalidatePath('/final-quiz-passed-tg')
      revalidatePath('/final-quiz-failed-tg')
    } catch {
      /* outside Next.js runtime */
    }
  }
}

export const revalidateQuizQuestions: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidateForDoc(doc as QuizDoc)
    revalidateForDoc(previousDoc as QuizDoc)
  }
  return doc
}

export const revalidateQuizQuestionsDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidateForDoc(doc as QuizDoc)
  }
  return doc
}
