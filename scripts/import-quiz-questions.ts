/**
 * One-time import: loads quiz + feedback data from JSON into QuizQuestions collection.
 * Run: pnpm import:quiz-questions
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { getPayload } from 'payload'
import config from '@payload-config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

type JsonOption = { label: string; value: string; correct?: boolean }
type JsonDailyQuestion = {
  id: number
  question: string
  options: JsonOption[]
  correct: string
}
type JsonDailyDay = { title: string; questions: JsonDailyQuestion[] }
type JsonDailyData = Record<string, JsonDailyDay>
type JsonFinalQuestion = {
  id: number
  question: string
  options: Array<{ label: string; value: string; correct: boolean }>
}

type ImportQuestion = {
  questionText: string
  fieldType: 'multiple-choice' | 'rating' | 'textarea' | 'text'
  fieldKey?: string
  explanation?: string
  sortOrder: number
  enabled: boolean
  required?: boolean
  options?: Array<{ label: string; value: string; correct?: boolean }>
}

type GfField = {
  type: string
  label?: string
  isRequired?: boolean
  choices?: Array<{ text: string; value: string }>
}

function readJson<T>(relativePath: string): T {
  const filePath = path.join(ROOT, relativePath)
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T
}

function mapDailyQuestions(questions: JsonDailyQuestion[]): ImportQuestion[] {
  return questions.map((question, index) => ({
    questionText: question.question,
    fieldType: 'multiple-choice',
    sortOrder: index + 1,
    enabled: true,
    options: question.options.map((option) => ({
      label: option.label,
      value: option.value,
      correct: option.value === question.correct,
    })),
  }))
}

function mapFinalQuestions(questions: JsonFinalQuestion[]): ImportQuestion[] {
  return questions.map((question, index) => ({
    questionText: question.question,
    fieldType: 'multiple-choice',
    sortOrder: index + 1,
    enabled: true,
    options: question.options.map((option) => ({
      label: option.label,
      value: option.value,
      correct: option.correct,
    })),
  }))
}

function mapGfFeedbackFields(fields: GfField[]): ImportQuestion[] {
  const result: ImportQuestion[] = []
  let sortOrder = 0

  for (const field of fields) {
    if (field.type === 'section' || field.type === 'email') continue

    sortOrder += 1

    if (field.type === 'radio') {
      const fieldKey =
        sortOrder === 1
          ? 'understandingRating'
          : sortOrder === 2
            ? 'explanationRating'
            : sortOrder === 3
              ? 'contentRating'
              : `field_${sortOrder}`

      result.push({
        questionText: field.label ?? '',
        fieldType: 'multiple-choice',
        fieldKey,
        sortOrder,
        enabled: true,
        required: Boolean(field.isRequired),
        options: (field.choices ?? []).map((choice) => ({
          label: choice.text,
          value: choice.text.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        })),
      })
      continue
    }

    if (field.type === 'textarea') {
      result.push({
        questionText: field.label ?? '',
        fieldType: 'textarea',
        fieldKey: 'improvementAdvice',
        sortOrder,
        enabled: true,
        required: false,
      })
    }
  }

  return result
}

const DAILY_FEEDBACK_FR: ImportQuestion[] = [
  {
    questionText: '1. Comment évaluez-vous votre compréhension du contenu du cours ?',
    fieldType: 'multiple-choice',
    fieldKey: 'understandingRating',
    sortOrder: 1,
    enabled: true,
    required: true,
    options: [
      { label: '1 : Facile', value: '1-easy' },
      { label: '2 : Moyen', value: '2-average' },
      { label: '3 : Complexe', value: '3-complex' },
    ],
  },
  {
    questionText: '2. Dans quelle mesure le contenu du cours était-il bien expliqué ?',
    fieldType: 'multiple-choice',
    fieldKey: 'explanationRating',
    sortOrder: 2,
    enabled: true,
    required: true,
    options: [
      { label: '1 : Bien expliqué', value: '1-well' },
      { label: '2 : Moyen', value: '2-average' },
      { label: '3 : Mal expliqué', value: '3-poor' },
    ],
  },
  {
    questionText: '3. Comment avez-vous trouvé le contenu ?',
    fieldType: 'multiple-choice',
    fieldKey: 'contentRating',
    sortOrder: 3,
    enabled: true,
    required: true,
    options: [
      { label: '1 : Captivant', value: '1-engaging' },
      { label: '2 : Moyen', value: '2-average' },
      { label: '3 : Ennuyeux', value: '3-boring' },
    ],
  },
  {
    questionText:
      "Comment nous conseilleriez-vous d'améliorer ce cours ? Avez-vous des suggestions pour le rendre plus efficace ?",
    fieldType: 'textarea',
    fieldKey: 'improvementAdvice',
    sortOrder: 4,
    enabled: true,
    required: false,
  },
]

const FINAL_FEEDBACK_EN: ImportQuestion[] = [
  {
    questionText:
      '1. How likely are you to recommend this Bitcoin Course to a friend or colleague?',
    fieldType: 'rating',
    fieldKey: 'recommendScore',
    sortOrder: 1,
    enabled: true,
    required: true,
  },
  {
    questionText: "What's the main reason for your score above?",
    fieldType: 'text',
    fieldKey: 'recommendReason',
    sortOrder: 2,
    enabled: true,
    required: false,
  },
  {
    questionText: '2. How would you rate your understanding of Bitcoin after this course?',
    fieldType: 'rating',
    fieldKey: 'understandingScore',
    sortOrder: 3,
    enabled: true,
    required: true,
  },
  {
    questionText: "What's the main reason for your score above?",
    fieldType: 'text',
    fieldKey: 'understandingReason',
    sortOrder: 4,
    enabled: true,
    required: false,
  },
  {
    questionText: '3. What advice do you have for us to improve your ratings above?',
    fieldType: 'textarea',
    fieldKey: 'improvementAdvice',
    sortOrder: 5,
    enabled: true,
    required: true,
  },
]

const FINAL_FEEDBACK_FR: ImportQuestion[] = [
  {
    questionText:
      '1. Quelle est la probabilité que vous recommandiez ce cours Bitcoin à un ami ou collègue ?',
    fieldType: 'rating',
    fieldKey: 'recommendScore',
    sortOrder: 1,
    enabled: true,
    required: true,
  },
  {
    questionText: 'Quelle est la principale raison de votre note ci-dessus ?',
    fieldType: 'text',
    fieldKey: 'recommendReason',
    sortOrder: 2,
    enabled: true,
    required: false,
  },
  {
    questionText:
      '2. Comment évaluez-vous votre compréhension du Bitcoin après ce cours ?',
    fieldType: 'rating',
    fieldKey: 'understandingScore',
    sortOrder: 3,
    enabled: true,
    required: true,
  },
  {
    questionText: 'Quelle est la principale raison de votre note ci-dessus ?',
    fieldType: 'text',
    fieldKey: 'understandingReason',
    sortOrder: 4,
    enabled: true,
    required: false,
  },
  {
    questionText:
      '3. Quels conseils nous donneriez-vous pour améliorer vos évaluations ci-dessus ?',
    fieldType: 'textarea',
    fieldKey: 'improvementAdvice',
    sortOrder: 5,
    enabled: true,
    required: true,
  },
]

async function main() {
  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'quiz-questions',
    limit: 1,
    overrideAccess: true,
  })

  if (existing.totalDocs > 0) {
    payload.logger.info(`✓ Quiz questions: ${existing.totalDocs}+ entries already exist, skipped import`)
    return
  }

  const dailyEn = readJson<JsonDailyData>('src/data/daily-quizzes-en.json')
  const dailyFr = readJson<JsonDailyData>('src/data/daily-quizzes-fr.json')
  const finalEn = readJson<JsonFinalQuestion[]>('src/data/final-quiz-en.json')
  const finalFr = readJson<JsonFinalQuestion[]>('src/data/final-quiz-fr.json')
  const feedbackExport = readJson<Record<string, { fields?: GfField[] }>>(
    'scripts/exports/dailyquizfeedback.json',
  )
  const feedbackForm = feedbackExport['0']
  const dailyFeedbackEn = mapGfFeedbackFields(feedbackForm?.fields ?? [])

  // Normalize daily feedback EN values to stable keys
  for (const field of dailyFeedbackEn) {
    if (field.fieldKey === 'understandingRating') {
      field.options = [
        { label: '1: Easy', value: '1-easy' },
        { label: '2: Average', value: '2-average' },
        { label: '3: Complex', value: '3-complex' },
      ]
    }
    if (field.fieldKey === 'explanationRating') {
      field.options = [
        { label: '1: Well explained', value: '1-well' },
        { label: '2: Average', value: '2-average' },
        { label: '3: Poorly explained', value: '3-poor' },
      ]
    }
    if (field.fieldKey === 'contentRating') {
      field.options = [
        { label: '1: Engaging', value: '1-engaging' },
        { label: '2: Average', value: '2-average' },
        { label: '3: Boring', value: '3-boring' },
      ]
    }
  }

  let created = 0

  for (let day = 1; day <= 20; day++) {
    for (const [language, data] of [
      ['en', dailyEn] as const,
      ['fr', dailyFr] as const,
    ]) {
      const quizDay = data[String(day)]
      if (!quizDay) throw new Error(`Missing daily quiz day ${day} (${language})`)

      await payload.create({
        collection: 'quiz-questions',
        data: {
          quizType: 'daily',
          day,
          language,
          enabled: true,
          questions: mapDailyQuestions(quizDay.questions),
        },
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
      created += 1
    }
  }

  for (const [language, questions] of [
    ['en', finalEn] as const,
    ['fr', finalFr] as const,
  ]) {
    await payload.create({
      collection: 'quiz-questions',
      data: {
        quizType: 'final',
        language,
        enabled: true,
        questions: mapFinalQuestions(questions),
      },
      overrideAccess: true,
      context: { disableRevalidate: true },
    })
    created += 1
  }

  for (const [language, questions] of [
    ['en', dailyFeedbackEn] as const,
    ['fr', DAILY_FEEDBACK_FR] as const,
  ]) {
    await payload.create({
      collection: 'quiz-questions',
      data: {
        quizType: 'daily-feedback',
        language,
        enabled: true,
        questions,
      },
      overrideAccess: true,
      context: { disableRevalidate: true },
    })
    created += 1
  }

  for (const [language, questions] of [
    ['en', FINAL_FEEDBACK_EN] as const,
    ['fr', FINAL_FEEDBACK_FR] as const,
  ]) {
    await payload.create({
      collection: 'quiz-questions',
      data: {
        quizType: 'final-feedback',
        language,
        enabled: true,
        questions,
      },
      overrideAccess: true,
      context: { disableRevalidate: true },
    })
    created += 1
  }

  payload.logger.info(`✓ Imported ${created} quiz question sets`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
