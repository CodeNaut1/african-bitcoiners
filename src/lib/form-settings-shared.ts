/** Client-safe form settings types and mappings (no server imports). */

export type FormSubmitResponse = {
  ok: true
  formSlug: string
  redirectToConfirmation: boolean
  confirmationHeading: string
  confirmationDescription?: string
  code?: string
}

/** Maps API formType values to FormSettings formSlug keys. */
export const FORM_TYPE_TO_SLUG: Record<string, string> = {
  'contact-general': 'contact',
  'newsletter-signup': 'newsletter-signup',
  'feedback-rating': 'feedback-bounty',
  'job-submission': 'job-submission',
  'mining-directory': 'mining-org',
  'meetup-submission': 'meetup',
  'meetup-host-proposal': 'meetup',
  'meetup-database': 'meetup',
  'map-location': 'map-location',
  volunteer: 'volunteer',
  'savings-challenge': 'savings-challenge',
  'graduate-programme': 'graduate-program',
  'partnership-inquiry': 'education-partnership',
  donation: 'donation',
  'course-signup': 'course-signup',
}

export function resolveFormSlug(formType: string): string {
  return FORM_TYPE_TO_SLUG[formType] ?? formType
}

export type FormConfigFields = {
  formSlug?: string | null
  formTitle?: string | null
  enabled?: boolean | null
  confirmationHeading?: string | null
  confirmationDescription?: string | null
  showNpsFeedback?: boolean | null
  redirectToConfirmation?: boolean | null
  teamNotificationEnabled?: boolean | null
  teamEmailGroup?: string | null
  teamNotificationSubjectTemplate?: string | null
  teamNotificationBodyTemplate?: string | null
  userNotificationEnabled?: boolean | null
  userNotificationSubjectTemplate?: string | null
  userNotificationBodyTemplate?: string | null
  userNotificationFromName?: string | null
}

export function buildFormSubmitResponse(
  formSlug: string,
  config?: FormConfigFields,
): FormSubmitResponse {
  return {
    ok: true,
    formSlug,
    redirectToConfirmation: config?.redirectToConfirmation !== false,
    confirmationHeading:
      config?.confirmationHeading?.trim() || 'Thank you! Your submission has been received.',
    confirmationDescription: config?.confirmationDescription?.trim() || undefined,
  }
}
