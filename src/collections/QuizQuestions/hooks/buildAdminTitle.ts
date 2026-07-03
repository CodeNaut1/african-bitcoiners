import type { CollectionBeforeChangeHook } from 'payload'

const QUIZ_TYPE_LABELS: Record<string, string> = {
  daily: 'Daily',
  final: 'Final',
  'daily-feedback': 'Daily Feedback',
  'final-feedback': 'Final Feedback',
}

export const buildAdminTitle: CollectionBeforeChangeHook = ({ data }) => {
  const quizType = data?.quizType as string | undefined
  const language = data?.language === 'fr' ? 'French' : 'English'
  const day = data?.day as number | undefined
  const typeLabel = QUIZ_TYPE_LABELS[quizType ?? ''] ?? quizType ?? 'Quiz'
  const dayLabel = day ? ` - Day ${day}` : ''

  data.adminTitle = `${typeLabel}${dayLabel} - ${language}`

  const questions = (data?.questions as Array<{ enabled?: boolean | null }> | undefined) ?? []
  data.questionCount = questions.filter((question) => question.enabled !== false).length

  return data
}
