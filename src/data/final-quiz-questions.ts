import questionsEN from './final-quiz-en.json'
import questionsFR from './final-quiz-fr.json'

export type FinalQuizOption = {
  label: string
  value: string
  correct: boolean
}

export type FinalQuizQuestion = {
  id: number
  question: string
  options: FinalQuizOption[]
  needsReview?: boolean
  reviewNotes?: string[]
}

export const finalQuizEN = questionsEN as FinalQuizQuestion[]
export const finalQuizFR = questionsFR as FinalQuizQuestion[]

export const FINAL_QUIZ_PASS_THRESHOLD = 70
export const FINAL_QUIZ_TOTAL_QUESTIONS = 50
export const FINAL_QUIZ_PASS_COUNT = 35

export function getFinalQuizAcSlug(
  outcome: 'passed' | 'failed',
  language: 'en' | 'fr',
): string {
  const lang = language === 'fr' ? 'french' : 'english'
  return `final-quiz-${outcome}-${lang}`
}

export const FAILED_QUIZ_FORM_SLUG = 'failed-quiz'
