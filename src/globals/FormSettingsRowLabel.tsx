'use client'

import { useRowLabel } from '@payloadcms/ui'

export function FormSettingsRowLabel() {
  const { data, rowNumber } = useRowLabel<{ formTitle?: string; formSlug?: string }>()
  const title = data?.formTitle || data?.formSlug || `Form ${String(rowNumber).padStart(2, '0')}`
  return <span>{title}</span>
}
