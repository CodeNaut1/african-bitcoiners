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

function formatFieldLabel(key: string): string {
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function formatFieldValue(value: unknown): string {
  if (value === null || value === undefined) return ''
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  if (Array.isArray(value)) return value.map((v) => formatFieldValue(v)).join(', ')
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

export function buildAutoTeamNotificationBody(
  formTitle: string,
  submissionData: Record<string, unknown>,
  submittedAt = new Date(),
): string {
  const entries = Object.entries(submissionData).filter(
    ([key, value]) =>
      !INTERNAL_FIELDS.has(key) &&
      value !== undefined &&
      value !== null &&
      String(value).trim() !== '',
  )

  const fieldRows = entries
    .map(([key, value], index) => {
      const label = formatFieldLabel(key)
      const formattedValue = escapeHtml(formatFieldValue(value)).replace(/\n/g, '<br>')
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

  const timestamp = submittedAt.toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'UTC',
  })

  return `
    <h1 style="margin:0 0 20px;font-size:22px;color:#253343;">${escapeHtml(formTitle)}</h1>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #D1D5DB;">
      <tr>
        <td style="padding:10px 14px;border:1px solid #E5E7EB;background:#6B7280;color:#FFFFFF;font-size:12px;font-weight:700;width:35%;">Field</td>
        <td style="padding:10px 14px;border:1px solid #E5E7EB;background:#6B7280;color:#FFFFFF;font-size:12px;font-weight:700;">Value</td>
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

  const fieldRows = rows
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

function buildTeamNotificationBody(
  formConfig: FormConfig,
  submissionData: Record<string, unknown>,
): string {
  const formTitle = formConfig.formTitle || formConfig.formSlug || 'Form Submission'
  const customTemplate = formConfig.teamNotificationBodyTemplate?.trim()

  if (customTemplate) {
    return replacePlaceholders(customTemplate, {
      form_title: formTitle,
      name: String(submissionData.name ?? ''),
      email: String(submissionData.email ?? ''),
    })
  }

  return buildAutoTeamNotificationBody(formTitle, submissionData)
}

function buildUserNotificationHtml(bodyTemplate: string, submissionData: Record<string, unknown>): string {
  const name = String(submissionData.name ?? 'there')
  const email = String(submissionData.email ?? '')
  const withPlaceholders = replacePlaceholders(bodyTemplate, { name, email })
  const htmlBody = withPlaceholders.includes('<')
    ? withPlaceholders
    : withPlaceholders.replace(/\n/g, '<br>')

  return wrapEmail(
    `<div style="font-size:15px;line-height:1.6;color:#2F2614;">${htmlBody}</div>`,
    replacePlaceholders(bodyTemplate.split('\n')[0] ?? '', { name, email }),
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
      const subject = replacePlaceholders(subjectTemplate, { form_title: formTitle })
      const body = buildTeamNotificationBody(formConfig, submissionData)

      await sendEmail(recipients, subject, wrapEmail(body, subject))
    }
  }

  if (formConfig.userNotificationEnabled && submissionData.email) {
    const email = String(submissionData.email).trim()
    if (!email) return

    const subjectTemplate = formConfig.userNotificationSubjectTemplate?.trim()
    const bodyTemplate = formConfig.userNotificationBodyTemplate?.trim()

    if (subjectTemplate && bodyTemplate) {
      const name = String(submissionData.name ?? '')
      const subject = replacePlaceholders(subjectTemplate, { name, email })
      const htmlBody = buildUserNotificationHtml(bodyTemplate, submissionData)
      const fromName = formConfig.userNotificationFromName?.trim() || 'African Bitcoiners'

      await sendEmail([email], subject, htmlBody, { fromName })
    }
  }
}
