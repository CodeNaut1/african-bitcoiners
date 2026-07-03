export const FINAL_QUIZ_PASS_THRESHOLD = 70
export const FINAL_QUIZ_TOTAL_QUESTIONS = 50
export const FINAL_QUIZ_PASS_COUNT = 35
export const FAILED_QUIZ_FORM_SLUG = 'failed-quiz'

export function isValidDailyQuizDay(day: number): boolean {
  return Number.isInteger(day) && day >= 1 && day <= 20
}

export function getFinalQuizAcSlug(
  outcome: 'passed' | 'failed',
  language: 'en' | 'fr',
): string {
  const lang = language === 'fr' ? 'french' : 'english'
  return `final-quiz-${outcome}-${lang}`
}

export type QuizLanguage = 'en' | 'fr'

export type QuizOption = {
  label: string
  value: string
  correct?: boolean
}

export type QuizQuestion = {
  id: number
  question: string
  options: QuizOption[]
  correct: string
  explanation?: string
}

export type FeedbackFieldDefinition = {
  id: number
  questionText: string
  fieldType: 'multiple-choice' | 'rating' | 'textarea' | 'text'
  fieldKey: string
  required?: boolean
  options?: Array<{ label: string; value: string }>
}
