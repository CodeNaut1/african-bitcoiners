'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { FieldDescription, FieldError, FieldLabel, useField } from '@payloadcms/ui'

import { FORM_SLUG_OPTIONS } from '@/lib/form-slug-options'

type FormOption = {
  formSlug: string
  formTitle: string
}

type Props = {
  field: {
    label?: string
    required?: boolean
    admin?: { description?: string }
  }
  path: string
}

export default function FormSlugSelect({ field, path }: Props) {
  const { value, setValue, showError } = useField<string>({ path })
  const [options, setOptions] = useState<FormOption[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadForms() {
      setLoading(true)
      setFetchError('')

      try {
        const res = await fetch('/api/globals/form-settings', { credentials: 'include' })
        if (!res.ok) throw new Error('Failed to load Form Settings')

        const data = (await res.json()) as { forms?: Array<{ formSlug?: string; formTitle?: string }> }
        if (cancelled) return

        const forms = (data.forms ?? [])
          .filter((form): form is { formSlug: string; formTitle?: string } => Boolean(form.formSlug))
          .map((form) => ({
            formSlug: form.formSlug,
            formTitle: form.formTitle?.trim() || form.formSlug,
          }))

        const merged = new Map<string, FormOption>()
        for (const option of FORM_SLUG_OPTIONS) {
          merged.set(option.value, { formSlug: option.value, formTitle: option.label })
        }
        for (const form of forms) {
          merged.set(form.formSlug, form)
        }

        setOptions(
          Array.from(merged.values()).sort((a, b) => a.formTitle.localeCompare(b.formTitle)),
        )
      } catch (err) {
        if (!cancelled) {
          setFetchError(err instanceof Error ? err.message : 'Failed to load forms')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void loadForms()

    return () => {
      cancelled = true
    }
  }, [])

  const selectOptions = useMemo(() => {
    if (!value || options.some((option) => option.formSlug === value)) {
      return options
    }

    return [{ formSlug: value, formTitle: `${value} (saved)` }, ...options]
  }, [options, value])

  return (
    <div className="field-type select">
      <FieldLabel label={field.label} required={field.required} path={path} />
      <FieldDescription description={field.admin?.description} path={path} />

      <select
        id={path}
        name={path}
        value={value ?? ''}
        onChange={(e) => setValue(e.target.value)}
        disabled={loading}
        style={{
          width: '100%',
          padding: '8px 12px',
          borderRadius: '4px',
          border: '1px solid var(--theme-elevation-150, #d1d5db)',
          background: 'var(--theme-elevation-0, #fff)',
          color: 'var(--theme-elevation-800, #253343)',
          fontSize: '13px',
        }}
      >
        <option value="">{loading ? 'Loading forms…' : 'Select a form…'}</option>
        {selectOptions.map((option) => (
          <option key={option.formSlug} value={option.formSlug}>
            {option.formTitle}
          </option>
        ))}
      </select>

      {fetchError && (
        <p style={{ marginTop: '6px', fontSize: '12px', color: '#dc2626' }}>{fetchError}</p>
      )}

      <FieldError showError={showError} path={path} />
    </div>
  )
}
