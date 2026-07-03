import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import type {
  FeedbackFieldDefinition,
  QuizLanguage,
  QuizQuestion,
} from '@/lib/quiz-shared'

type QuizType = 'daily' | 'final' | 'daily-feedback' | 'final-feedback'

type PayloadQuizQuestion = {
  questionText?: string | null
  fieldType?: 'multiple-choice' | 'rating' | 'textarea' | 'text' | null
  fieldKey?: string | null
  explanation?: string | null
  enabled?: boolean | null
  required?: boolean | null
  sortOrder?: number | null
  options?: Array<{
    label?: string | null
    value?: string | null
    correct?: boolean | null
  } | null> | null
}

function mapQuizQuestions(items: PayloadQuizQuestion[] | null | undefined): QuizQuestion[] {
  const enabled = (items ?? []).filter((item) => item && item.enabled !== false)
  const sorted = [...enabled].sort(
    (a, b) => (a?.sortOrder ?? 0) - (b?.sortOrder ?? 0),
  )

  return sorted.map((item, index) => {
    const options = (item.options ?? [])
      .filter((option): option is NonNullable<typeof option> => Boolean(option?.value))
      .map((option) => ({
        label: option.label ?? option.value ?? '',
        value: option.value ?? '',
        correct: Boolean(option.correct),
      }))

    const correct =
      options.find((option) => option.correct)?.value ?? options[0]?.value ?? 'a'

    return {
      id: index + 1,
      question: item.questionText ?? '',
      options: options.map(({ label, value }) => ({
        label,
        value,
        correct: value === correct,
      })),
      correct,
      explanation: item.explanation ?? undefined,
    }
  })
}

function mapFeedbackFields(items: PayloadQuizQuestion[] | null | undefined): FeedbackFieldDefinition[] {
  const enabled = (items ?? []).filter((item) => item && item.enabled !== false)
  const sorted = [...enabled].sort(
    (a, b) => (a?.sortOrder ?? 0) - (b?.sortOrder ?? 0),
  )

  return sorted.map((item, index) => ({
    id: index + 1,
    questionText: item.questionText ?? '',
    fieldType: item.fieldType ?? 'multiple-choice',
    fieldKey: item.fieldKey ?? `field_${index + 1}`,
    required: item.required ?? (item.fieldType === 'rating' || item.fieldType === 'multiple-choice'),
    options: (item.options ?? [])
      .filter((option): option is NonNullable<typeof option> => Boolean(option?.value))
      .map((option) => ({
        label: option.label ?? option.value ?? '',
        value: option.value ?? '',
      })),
  }))
}

async function fetchQuizDocument(
  quizType: QuizType,
  language: QuizLanguage,
  day?: number,
) {
  const payload = await getPayload({ config })

  const where: Record<string, unknown> = {
    and: [
      { quizType: { equals: quizType } },
      { language: { equals: language } },
      { enabled: { not_equals: false } },
    ],
  }

  if (day != null) {
    ;(where.and as unknown[]).push({ day: { equals: day } })
  } else if (quizType === 'daily-feedback' || quizType === 'final-feedback') {
    ;(where.and as unknown[]).push({ day: { exists: false } })
  }

  const result = await payload.find({
    collection: 'quiz-questions',
    where: where as never,
    limit: 1,
    overrideAccess: true,
  })

  return result.docs[0] ?? null
}

function cacheTag(quizType: QuizType, language: QuizLanguage, day?: number): string {
  if (quizType === 'daily' && day != null) return `quiz-daily-${day}-${language}`
  if (quizType === 'daily-feedback') return `quiz-daily-feedback-${language}`
  if (quizType === 'final-feedback') return `quiz-final-feedback-${language}`
  return `quiz-final-${language}`
}

export async function getDailyQuizQuestions(
  day: number,
  language: QuizLanguage,
): Promise<QuizQuestion[]> {
  const cached = unstable_cache(
    async () => {
      const doc = await fetchQuizDocument('daily', language, day)
      return mapQuizQuestions(doc?.questions as PayloadQuizQuestion[] | undefined)
    },
    [`daily-quiz-${day}-${language}`],
    { revalidate: 3600, tags: [cacheTag('daily', language, day)] },
  )

  return cached()
}

export async function getFinalQuizQuestions(language: QuizLanguage): Promise<QuizQuestion[]> {
  const cached = unstable_cache(
    async () => {
      const doc = await fetchQuizDocument('final', language)
      return mapQuizQuestions(doc?.questions as PayloadQuizQuestion[] | undefined)
    },
    [`final-quiz-${language}`],
    { revalidate: 3600, tags: [cacheTag('final', language)] },
  )

  return cached()
}

export async function getDailyQuizFeedbackFields(
  language: QuizLanguage,
): Promise<FeedbackFieldDefinition[]> {
  const cached = unstable_cache(
    async () => {
      const doc = await fetchQuizDocument('daily-feedback', language)
      return mapFeedbackFields(doc?.questions as PayloadQuizQuestion[] | undefined)
    },
    [`daily-quiz-feedback-${language}`],
    { revalidate: 3600, tags: [cacheTag('daily-feedback', language)] },
  )

  return cached()
}

export async function getFinalCourseFeedbackFields(
  language: QuizLanguage,
): Promise<FeedbackFieldDefinition[]> {
  const cached = unstable_cache(
    async () => {
      const doc = await fetchQuizDocument('final-feedback', language)
      return mapFeedbackFields(doc?.questions as PayloadQuizQuestion[] | undefined)
    },
    [`final-quiz-feedback-${language}`],
    { revalidate: 3600, tags: [cacheTag('final-feedback', language)] },
  )

  return cached()
}
