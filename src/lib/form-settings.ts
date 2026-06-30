import type { Payload } from 'payload'

import { syncContactFromFormSettings } from '@/lib/activecampaign'
import {
  getFormConfigBySlug,
  sendFormNotifications,
  type FormConfig,
} from '@/lib/form-notifications'
import {
  buildFormSubmitResponse,
  type FormConfigFields,
  type FormSubmitResponse,
} from '@/lib/form-settings-shared'

export {
  FORM_TYPE_TO_SLUG,
  resolveFormSlug,
  type FormSubmitResponse,
} from '@/lib/form-settings-shared'

/** Run FormSettings-driven AC sync and email notifications after a submission is saved. */
export async function handleFormSettingsPostSubmit(
  formSlug: string,
  submissionData: Record<string, unknown>,
  payload: Payload,
): Promise<FormConfig | undefined> {
  const config = await getFormConfigBySlug(formSlug)
  if (!config || config.enabled === false) return config

  const email = submissionData.email ? String(submissionData.email).trim() : ''
  const name = String(submissionData.name ?? submissionData.contactName ?? '')

  if (config.activeCampaignEnabled && config.activeCampaignListName && email) {
    await syncContactFromFormSettings(formSlug, email, name, payload)
  }

  await sendFormNotifications(formSlug, submissionData)
  return config
}

export { buildFormSubmitResponse }

export type { FormConfigFields }
