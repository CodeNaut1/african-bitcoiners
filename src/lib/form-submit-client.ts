'use client'

import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import type { FormSubmitResponse } from '@/lib/form-settings-shared'

/** Handle redirect or inline confirmation after a successful form API response. */
export function applyFormSubmitResponse(
  body: FormSubmitResponse,
  router: AppRouterInstance,
  onInlineSuccess?: (heading: string) => void,
): boolean {
  if (body.redirectToConfirmation && body.formSlug) {
    const params = new URLSearchParams({ type: body.formSlug })
    const confirmationCode = body.code ?? body.uniqueCode
    if (confirmationCode) {
      params.set('code', confirmationCode)
    }
    if (body.name) {
      params.set('name', body.name)
    }
    if (body.language) {
      params.set('lang', body.language)
    }
    router.push(`/confirmation?${params.toString()}`)
    return true
  }

  if (body.confirmationHeading) {
    onInlineSuccess?.(body.confirmationHeading)
  }

  return false
}

/** Parse a newsletter subscribe response and redirect or invoke inline success. */
export async function handleNewsletterSubscribeResponse(
  res: Response,
  router: AppRouterInstance,
  onInlineSuccess?: (heading: string) => void,
): Promise<void> {
  const body = (await res.json()) as FormSubmitResponse & { message?: string }
  if (!res.ok) {
    throw new Error(body.message || 'Subscription failed')
  }
  applyFormSubmitResponse(body, router, onInlineSuccess)
}
