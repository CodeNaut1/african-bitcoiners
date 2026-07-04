import config from '@payload-config'
import { getPayload } from 'payload'

import { getNotificationGroup, type NotificationGroupType } from '@/lib/email-config'
import { sendEmail } from '@/lib/email'
import { wrapEmail } from '@/lib/email-templates/wrapper'

export type FormConfig = {
  formSlug?: string | null
  formTitle?: string | null
  enabled?: boolean | null
  confirmationHeading?: string | null
  confirmationDescription?: string | null
  showNpsFeedback?: boolean | null
  redirectToConfirmation?: boolean | null
  teamNotificationEnabled?: boolean | null
  teamEmailGroup?: NotificationGroupType | null
  teamNotificationSubjectTemplate?: string | null
  teamNotificationBodyTemplate?: string | null
  userNotificationEnabled?: boolean | null
  userNotificationSubjectTemplate?: string | null
  userNotificationBodyTemplate?: string | null
  userNotificationFromName?: string | null
}

const INTERNAL_FIELDS = new Set(['honey', 'formType', '_formSlug'])

type FieldRow = [label: string, value: string]

type PayloadQuizQuestion = {
  questionText?: string | null
  sortOrder?: number | null
  enabled?: boolean | null
  options?: Array<{
    label?: string | null
    value?: string | null
  } | null> | null
}

type DailyQuizAnswer = {
  questionId?: number
  selected?: string
  correct?: string
}

/** Convert submissionData keys to readable labels — camelCase/snake_case only, never paraphrase. */
export function formatFieldLabel(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function formatFieldValue(value: unknown): string {
  if (value === null || value === undefined) return ''
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  if (Array.isArray(value)) {
    if (value.every((item) => item === null || ['string', 'number', 'boolean'].includes(typeof item))) {
      return value.map((item) => formatFieldValue(item)).join(', ')
    }
    return JSON.stringify(value, null, 2)
  }
  if (typeof value === 'object') return JSON.stringify(value, null, 2)
  return String(value)
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function replacePlaceholders(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => values[key] ?? '')
}

function buildPlaceholderValues(
  submissionData: Record<string, unknown>,
  extras: Record<string, string> = {},
): Record<string, string> {
  const entryId = String(
    submissionData.entryId ??
      submissionData.entry_id ??
      submissionData.bounty_id ??
      submissionData.bountyId ??
      '',
  )

  return {
    name: String(submissionData.name ?? ''),
    email: String(submissionData.email ?? ''),
    entry_id: entryId,
    bounty_id: entryId,
    day: String(submissionData.day ?? ''),
    score: String(submissionData.score ?? ''),
    totalQuestions: String(submissionData.totalQuestions ?? ''),
    ...extras,
  }
}

function mapQuizQuestionsForNotification(
  items: PayloadQuizQuestion[] | null | undefined,
): Array<{ id: number; questionText: string; options: Array<{ label: string; value: string }> }> {
  const enabled = (items ?? []).filter((item) => item && item.enabled !== false)
  const sorted = [...enabled].sort(
    (a, b) => (a?.sortOrder ?? 0) - (b?.sortOrder ?? 0),
  )

  return sorted.map((item, index) => ({
    id: index + 1,
    questionText: item.questionText ?? '',
    options: (item.options ?? [])
      .filter((option): option is NonNullable<typeof option> => Boolean(option?.value))
      .map((option) => ({
        label: option.label ?? option.value ?? '',
        value: option.value ?? '',
      })),
  }))
}

async function fetchDailyQuizQuestions(
  day: number,
  language: string,
): Promise<Array<{ id: number; questionText: string; options: Array<{ label: string; value: string }> }>> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'quiz-questions',
    where: {
      and: [
        { quizType: { equals: 'daily' } },
        { language: { equals: language === 'fr' ? 'fr' : 'en' } },
        { day: { equals: day } },
        { enabled: { not_equals: false } },
      ],
    },
    limit: 1,
    overrideAccess: true,
  })

  const doc = result.docs[0] as { questions?: PayloadQuizQuestion[] } | undefined
  return mapQuizQuestionsForNotification(doc?.questions)
}

function isDailyQuizAnswer(value: unknown): value is DailyQuizAnswer {
  return (
    typeof value === 'object' &&
    value !== null &&
    'questionId' in value &&
    'selected' in value
  )
}

async function buildDailyQuizAnswerRows(
  answers: unknown,
  submissionData: Record<string, unknown>,
): Promise<FieldRow[]> {
  if (!Array.isArray(answers) || answers.length === 0) return []

  const day = Number(submissionData.day)
  const language = String(submissionData.language ?? 'en')
  let questions: Array<{ id: number; questionText: string; options: Array<{ label: string; value: string }> }> = []

  if (Number.isFinite(day)) {
    try {
      questions = await fetchDailyQuizQuestions(day, language)
    } catch (err) {
      console.error('[form-notifications] Failed to load daily quiz questions:', err)
    }
  }

  return answers.filter(isDailyQuizAnswer).map((answer) => {
    const questionId = Number(answer.questionId)
    const question = questions.find((item) => item.id === questionId)
    const selected = String(answer.selected ?? '')

    const label = question?.questionText
      ? `Q${questionId}: ${question.questionText}`
      : `Question ${questionId}`

    const selectedOption = question?.options.find((option) => option.value === selected)
    const value = selectedOption
      ? `Answer: ${selectedOption.label}`
      : `Selected: ${selected}`

    return [label, value]
  })
}

async function buildSubmissionFieldRows(
  submissionData: Record<string, unknown>,
): Promise<FieldRow[]> {
  const rows: FieldRow[] = []

  for (const [key, value] of Object.entries(submissionData)) {
    if (INTERNAL_FIELDS.has(key)) continue
    if (value === undefined || value === null) continue

    if (key === 'answers') {
      rows.push(...(await buildDailyQuizAnswerRows(value, submissionData)))
      continue
    }

    rows.push([formatFieldLabel(key), formatFieldValue(value)])
  }

  return rows
}

function buildFieldTableRows(rows: FieldRow[]): string {
  return rows
    .map(([label, value], index) => {
      const formattedValue = escapeHtml(value).replace(/\n/g, '<br>')
      const rowBg = index % 2 === 0 ? '#f9f9f9' : '#ffffff'

      return `
        <tr style="background:${rowBg};">
          <td style="padding:10px 14px;border:1px solid #E5E7EB;font-weight:700;font-size:13px;color:#253343;background:#f9f9f9;width:35%;vertical-align:top;">
            ${escapeHtml(label)}
          </td>
          <td style="padding:10px 14px;border:1px solid #E5E7EB;font-size:13px;color:#2F2614;line-height:1.5;vertical-align:top;">
            ${formattedValue}
          </td>
        </tr>`
    })
    .join('')
}

export async function buildAutoTeamNotificationBody(
  formTitle: string,
  submissionData: Record<string, unknown>,
  submittedAt = new Date(),
): Promise<string> {
  const rows = await buildSubmissionFieldRows(submissionData)
  const fieldRows = buildFieldTableRows(rows)

  const timestamp = submittedAt.toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'UTC',
  })

  return `
    <h1 style="margin:0 0 20px;font-size:22px;color:#253343;">${escapeHtml(formTitle)}</h1>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #D1D5DB;">
      <tr>
        <td colspan="2" style="padding:10px 14px;border:1px solid #E5E7EB;background:#6B7280;color:#FFFFFF;font-size:13px;font-weight:700;">
          ${escapeHtml(formTitle)}
        </td>
      </tr>
      ${fieldRows || `<tr><td colspan="2" style="padding:16px;border:1px solid #E5E7EB;color:#667085;font-size:14px;">No field data submitted.</td></tr>`}
    </table>
    <p style="margin:20px 0 8px;font-size:12px;color:#9CA3AF;">Submitted on ${escapeHtml(timestamp)} UTC</p>
    <p style="margin:0;font-size:12px;color:#9CA3AF;">This is an automated notification from African Bitcoiners</p>
  `
}

export async function getFormSettingsGlobal() {
  const payload = await getPayload({ config })
  return payload.findGlobal({
    slug: 'form-settings',
    overrideAccess: true,
  })
}

export function findFormConfig(
  forms: FormConfig[] | null | undefined,
  formSlug: string,
): FormConfig | undefined {
  return forms?.find((form) => form.formSlug === formSlug)
}

export async function getFormConfigBySlug(formSlug: string): Promise<FormConfig | undefined> {
  const settings = await getFormSettingsGlobal()
  return findFormConfig(settings.forms as FormConfig[] | undefined, formSlug)
}

/** HTML table body for NPS feedback team notifications. */
export function buildNpsFeedbackNotificationBody(
  sourceFormTitle: string,
  data: Record<string, unknown>,
): string {
  const rows: Array<[string, string]> = [
    ['Source Form', sourceFormTitle],
    ['Recommend Score', String(data.recommendScore ?? '')],
    ['Recommend Reason', String(data.recommendReason ?? '')],
    ['Process Score', String(data.processScore ?? '')],
    ['Process Reason', String(data.processReason ?? '')],
    ['Improvement Advice', String(data.improvementAdvice ?? '')],
  ]

  const fieldRows = buildFieldTableRows(rows)

  return `
    <h1 style="margin:0 0 20px;font-size:22px;color:#253343;">NPS Feedback: ${escapeHtml(sourceFormTitle)}</h1>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #D1D5DB;">
      <tr>
        <td style="padding:10px 14px;border:1px solid #E5E7EB;background:#6B7280;color:#FFFFFF;font-size:12px;font-weight:700;width:35%;">Field</td>
        <td style="padding:10px 14px;border:1px solid #E5E7EB;background:#6B7280;color:#FFFFFF;font-size:12px;font-weight:700;">Value</td>
      </tr>
      ${fieldRows}
    </table>
    <p style="margin:20px 0 0;font-size:12px;color:#9CA3AF;">This is an automated notification from African Bitcoiners</p>
  `
}

async function buildTeamNotificationBody(
  formConfig: FormConfig,
  submissionData: Record<string, unknown>,
): Promise<string> {
  const formTitle = formConfig.formTitle || formConfig.formSlug || 'Form Submission'
  const formSlug = formConfig.formSlug

  if (formSlug === 'nps-feedback' || formSlug === 'final-course-feedback') {
    const sourceFormTitle = String(
      submissionData.sourceFormTitle ??
        submissionData.sourceForm ??
        submissionData.sourceFormSlug ??
        formTitle,
    )

    return buildNpsFeedbackNotificationBody(sourceFormTitle, {
      ...submissionData,
      processScore: submissionData.processScore ?? submissionData.understandingScore,
      processReason: submissionData.processReason ?? submissionData.understandingReason,
    })
  }

  const customTemplate = formConfig.teamNotificationBodyTemplate?.trim()

  if (customTemplate) {
    return replacePlaceholders(
      customTemplate,
      buildPlaceholderValues(submissionData, { form_title: formTitle }),
    )
  }

  return buildAutoTeamNotificationBody(formTitle, submissionData)
}

function buildUserNotificationHtml(bodyTemplate: string, submissionData: Record<string, unknown>): string {
  const placeholders = buildPlaceholderValues(submissionData)
  const withPlaceholders = replacePlaceholders(bodyTemplate, placeholders)
  const htmlBody = withPlaceholders.includes('<')
    ? withPlaceholders
    : withPlaceholders.replace(/\n/g, '<br>')

  return wrapEmail(
    `<div style="font-size:15px;line-height:1.6;color:#2F2614;">${htmlBody}</div>`,
    replacePlaceholders(bodyTemplate.split('\n')[0] ?? '', placeholders),
  )
}

/**
 * Sends team and user notification emails for a form submission based on FormSettings.
 */
export async function sendFormNotifications(
  formSlug: string,
  submissionData: Record<string, unknown>,
): Promise<void> {
  const formConfig = await getFormConfigBySlug(formSlug)

  if (!formConfig || formConfig.enabled === false) {
    return
  }

  const formTitle = formConfig.formTitle || formSlug

  if (formConfig.teamNotificationEnabled !== false) {
    const group = (formConfig.teamEmailGroup ?? 'general') as NotificationGroupType
    const recipients = getNotificationGroup(group)

    if (recipients.length) {
      const subjectTemplate =
        formConfig.teamNotificationSubjectTemplate?.trim() || 'New Entry: {{form_title}}'
      const placeholders = buildPlaceholderValues(submissionData, { form_title: formTitle })
      const subject = replacePlaceholders(subjectTemplate, placeholders)
      const body = await buildTeamNotificationBody(formConfig, submissionData)

      await sendEmail(recipients, subject, wrapEmail(body, subject))
    }
  }

  if (formConfig.userNotificationEnabled && submissionData.email) {
    const email = String(submissionData.email).trim()
    if (!email) return

    const subjectTemplate = formConfig.userNotificationSubjectTemplate?.trim()
    const bodyTemplate = formConfig.userNotificationBodyTemplate?.trim()

    if (subjectTemplate && bodyTemplate) {
      const placeholders = buildPlaceholderValues(submissionData)
      const subject = replacePlaceholders(subjectTemplate, placeholders)
      const htmlBody = buildUserNotificationHtml(bodyTemplate, submissionData)
      const fromName = formConfig.userNotificationFromName?.trim() || 'African Bitcoiners'

      await sendEmail([email], subject, htmlBody, { fromName })
    }
  }
}
