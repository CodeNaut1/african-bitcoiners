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

/** Run FormSettings email notifications after a submission is saved. */
export async function handleFormSettingsPostSubmit(
  formSlug: string,
  submissionData: Record<string, unknown>,
): Promise<FormConfig | undefined> {
  const config = await getFormConfigBySlug(formSlug)
  if (!config || config.enabled === false) return config

  await sendFormNotifications(formSlug, submissionData)
  return config
}

export { buildFormSubmitResponse }

export type { FormConfigFields }
