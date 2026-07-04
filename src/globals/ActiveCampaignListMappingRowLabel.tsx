'use client'

import { useRowLabel } from '@payloadcms/ui'

import { FORM_SLUG_OPTIONS } from '@/lib/form-slug-options'

type ListMappingRow = {
  formSlug?: string
  listNames?: Array<{ listName?: string | null } | null> | null
}

function formLabel(formSlug?: string): string | null {
  if (!formSlug) return null
  return FORM_SLUG_OPTIONS.find((option) => option.value === formSlug)?.label ?? formSlug
}

export function ActiveCampaignListMappingRowLabel() {
  const { data } = useRowLabel<ListMappingRow>()

  const label = formLabel(data?.formSlug)
  const firstListName = data?.listNames?.[0]?.listName?.trim()

  if (!label && !firstListName) {
    return <span>Unmapped Entry</span>
  }

  if (!label) {
    return <span>{firstListName ?? 'Unmapped Entry'}</span>
  }

  if (!firstListName) {
    return <span>{label}</span>
  }

  return (
    <span>
      {label} → {firstListName}
    </span>
  )
}
