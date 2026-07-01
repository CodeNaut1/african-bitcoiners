'use client'

import React, { useCallback, useMemo, useState } from 'react'
import { Banner, Button, Gutter, useAuth } from '@payloadcms/ui'
import Papa from 'papaparse'

import {
  CSV_IMPORT_BATCH_SIZE,
  CSV_IMPORT_COLLECTIONS,
  CSV_IMPORT_FIELDS,
  autoDetectHeaderMap,
  type CsvImportCollectionSlug,
} from '@/lib/csv-import'

type ImportResult = {
  imported: number
  skipped: number
  failed: number
  errors: Array<{ row: number; error: string }>
  total: number
  dryRun: boolean
}

type Step = 1 | 2 | 3 | 4 | 5

const stepLabels = ['Collection', 'Upload CSV', 'Map Columns', 'Options', 'Import']

export default function ImportCsvView() {
  const { user } = useAuth()
  const isAdmin = Boolean(user && (user as { role?: string }).role === 'admin')

  const [step, setStep] = useState<Step>(1)
  const [collection, setCollection] = useState('')
  const [fileName, setFileName] = useState('')
  const [headers, setHeaders] = useState<string[]>([])
  const [rows, setRows] = useState<Record<string, string>[]>([])
  const [headerMap, setHeaderMap] = useState<Record<string, string>>({})
  const [skipDuplicates, setSkipDuplicates] = useState(true)
  const [dryRun, setDryRun] = useState(false)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState({ current: 0, total: 0 })
  const [error, setError] = useState('')
  const [result, setResult] = useState<ImportResult | null>(null)

  const targetFields = useMemo(
    () => (collection ? (CSV_IMPORT_FIELDS[collection as CsvImportCollectionSlug] ?? []) : []),
    [collection],
  )

  const previewRows = useMemo(() => rows.slice(0, 5), [rows])

  const handleCollectionChange = useCallback(
    (slug: string) => {
      setCollection(slug)
      setError('')
      if (slug && headers.length > 0) {
        setHeaderMap(autoDetectHeaderMap(headers, CSV_IMPORT_FIELDS[slug as CsvImportCollectionSlug] ?? []))
      }
    },
    [headers],
  )

  const handleFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setError('')
      setResult(null)
      setHeaders([])
      setRows([])

      const file = event.target.files?.[0]
      if (!file) return

      if (!file.name.toLowerCase().endsWith('.csv')) {
        setError('Please upload a .csv file')
        return
      }

      setFileName(file.name)

      Papa.parse<Record<string, string>>(file, {
        delimiter: ',',
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim().replace(/^\ufeff/, ''),
        complete: (result) => {
          console.log('Parsed CSV:', result.data.length, 'rows', result.meta.fields)

          const fatalErrors = result.errors.filter((parseError) => parseError.type !== 'Delimiter')
          if (fatalErrors.length > 0) {
            setError(fatalErrors.map((parseError) => parseError.message).join('; '))
            setHeaders([])
            setRows([])
            return
          }

          const parsedHeaders =
            result.meta.fields?.map((header) => header.trim().replace(/^\ufeff/, '')).filter(Boolean) ?? []
          const parsedRows = (result.data ?? []).filter((row) =>
            Object.values(row).some((value) => String(value ?? '').trim() !== ''),
          )

          setHeaders(parsedHeaders)
          setRows(parsedRows)

          if (parsedRows.length === 0) {
            setError('No data found in CSV')
            return
          }

          if (collection) {
            setHeaderMap(
              autoDetectHeaderMap(parsedHeaders, CSV_IMPORT_FIELDS[collection as CsvImportCollectionSlug] ?? []),
            )
          }
        },
        error: (parseError) => {
          setError(parseError.message || 'Failed to parse CSV')
          setHeaders([])
          setRows([])
        },
      })
    },
    [collection],
  )

  const runImport = async () => {
    if (!collection || rows.length === 0) return

    setLoading(true)
    setError('')
    setResult(null)
    setProgress({ current: 0, total: rows.length })

    let totalImported = 0
    let totalSkipped = 0
    let totalFailed = 0
    const allErrors: Array<{ row: number; error: string }> = []

    try {
      for (let offset = 0; offset < rows.length; offset += CSV_IMPORT_BATCH_SIZE) {
        const batch = rows.slice(offset, offset + CSV_IMPORT_BATCH_SIZE)
        const formData = new FormData()
        formData.append('collection', collection)
        formData.append('headerMap', JSON.stringify(headerMap))
        formData.append('rows', JSON.stringify(batch))
        formData.append('offset', String(offset))
        formData.append('totalRows', String(rows.length))
        formData.append('skipDuplicates', String(skipDuplicates))
        formData.append('dryRun', String(dryRun))

        const response = await fetch('/api/admin/import-csv', {
          method: 'POST',
          body: formData,
          credentials: 'include',
        })

        const data = (await response.json()) as ImportResult & { error?: string }
        if (!response.ok) {
          setError(data.error ?? 'Import failed')
          return
        }

        totalImported += data.imported
        totalSkipped += data.skipped
        totalFailed += data.failed
        allErrors.push(...data.errors)
        setProgress({ current: Math.min(offset + batch.length, rows.length), total: rows.length })
      }

      setResult({
        imported: totalImported,
        skipped: totalSkipped,
        failed: totalFailed,
        errors: allErrors,
        total: rows.length,
        dryRun,
      })
      setStep(5)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setStep(1)
    setCollection('')
    setFileName('')
    setHeaders([])
    setRows([])
    setHeaderMap({})
    setSkipDuplicates(true)
    setDryRun(false)
    setError('')
    setResult(null)
    setProgress({ current: 0, total: 0 })
  }

  if (!isAdmin) {
    return (
      <Gutter>
        <Banner type="error">
          <strong>Access Denied</strong> — This tool is restricted to admin users only.
        </Banner>
      </Gutter>
    )
  }

  return (
    <Gutter>
      <div style={{ maxWidth: '960px', paddingTop: 'var(--base)', paddingBottom: 'calc(var(--base) * 2)' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Import CSV</h1>
        <p style={{ color: 'var(--theme-elevation-600)', marginBottom: '1.5rem' }}>
          Import records into Payload collections from a CSV file. Map columns, preview data, and import in batches.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginBottom: '1.5rem',
          }}
        >
          {stepLabels.map((label, index) => {
            const stepNumber = (index + 1) as Step
            const active = step === stepNumber
            const done = step > stepNumber
            return (
              <div
                key={label}
                style={{
                  padding: '0.375rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.8125rem',
                  fontWeight: active ? 700 : 500,
                  background: active
                    ? 'var(--theme-elevation-900)'
                    : done
                      ? 'var(--theme-elevation-150)'
                      : 'var(--theme-elevation-50)',
                  color: active ? 'var(--theme-elevation-0)' : 'var(--theme-elevation-700)',
                }}
              >
                {stepNumber}. {label}
              </div>
            )
          })}
        </div>

        {error && (
          <div style={{ marginBottom: '1rem' }}>
            <Banner type="error">{error}</Banner>
          </div>
        )}

        {loading && progress.total > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Importing… {progress.current}/{progress.total}
            </p>
            <div
              style={{
                height: '8px',
                background: 'var(--theme-elevation-150)',
                borderRadius: '9999px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${Math.round((progress.current / progress.total) * 100)}%`,
                  background: 'var(--theme-success-500)',
                  transition: 'width 0.2s ease',
                }}
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <section>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem' }}>Step 1 — Select collection</h2>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', maxWidth: '420px' }}>
              <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Target collection</span>
              <select
                value={collection}
                onChange={(event) => handleCollectionChange(event.target.value)}
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: 'var(--style-radius-s)',
                  border: '1px solid var(--theme-elevation-200)',
                  fontSize: '0.875rem',
                }}
              >
                <option value="">— Select collection —</option>
                {CSV_IMPORT_COLLECTIONS.map((entry) => (
                  <option key={entry.slug} value={entry.slug}>
                    {entry.label}
                  </option>
                ))}
              </select>
            </label>
            <div style={{ marginTop: '1.25rem' }}>
              <Button buttonStyle="primary" disabled={!collection} onClick={() => setStep(2)}>
                Continue
              </Button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem' }}>Step 2 — Upload CSV</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--theme-elevation-600)', marginBottom: '1rem' }}>
              Selected collection: <strong>{CSV_IMPORT_COLLECTIONS.find((entry) => entry.slug === collection)?.label}</strong>
            </p>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>CSV file</span>
              <input type="file" accept=".csv,text/csv" onChange={handleFile} style={{ fontSize: '0.875rem' }} />
              {fileName && (
                <span style={{ fontSize: '0.8125rem', color: 'var(--theme-elevation-600)' }}>
                  {fileName}
                  {rows.length > 0
                    ? ` — ${rows.length.toLocaleString()} rows, ${headers.length} columns`
                    : ' — no rows parsed'}
                </span>
              )}
            </label>

            {previewRows.length > 0 && (
              <div style={{ marginTop: '1.25rem', overflowX: 'auto' }}>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.5rem' }}>Preview (first 5 rows)</h3>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '0.8125rem',
                    border: '1px solid var(--theme-elevation-150)',
                  }}
                >
                  <thead>
                    <tr>
                      {headers.map((header) => (
                        <th
                          key={header}
                          style={{
                            textAlign: 'left',
                            padding: '0.5rem',
                            borderBottom: '1px solid var(--theme-elevation-150)',
                            background: 'var(--theme-elevation-50)',
                          }}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewRows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {headers.map((header) => (
                          <td
                            key={header}
                            style={{
                              padding: '0.5rem',
                              borderBottom: '1px solid var(--theme-elevation-100)',
                              verticalAlign: 'top',
                            }}
                          >
                            {row[header] ?? ''}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem' }}>
              <Button
                buttonStyle="primary"
                disabled={rows.length === 0}
                onClick={() => {
                  setHeaderMap(autoDetectHeaderMap(headers, targetFields))
                  setStep(3)
                }}
              >
                Continue
              </Button>
              <Button buttonStyle="secondary" onClick={() => setStep(1)}>
                Back
              </Button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem' }}>Step 3 — Map columns</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--theme-elevation-600)', marginBottom: '1rem' }}>
              Match each CSV column to a collection field. Choose “Skip column” to ignore a column.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1.25rem' }}>
              {headers.map((header) => (
                <label
                  key={header}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(160px, 1fr) minmax(220px, 1fr)',
                    gap: '0.75rem',
                    alignItems: 'center',
                    fontSize: '0.875rem',
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{header}</span>
                  <select
                    value={headerMap[header] ?? ''}
                    onChange={(event) =>
                      setHeaderMap((current) => ({
                        ...current,
                        [header]: event.target.value,
                      }))
                    }
                    style={{
                      padding: '0.4rem 0.6rem',
                      borderRadius: 'var(--style-radius-s)',
                      border: '1px solid var(--theme-elevation-200)',
                    }}
                  >
                    <option value="">— Skip column —</option>
                    {targetFields.map((field) => (
                      <option key={field} value={field}>
                        {field}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Button buttonStyle="primary" onClick={() => setStep(4)}>
                Continue
              </Button>
              <Button buttonStyle="secondary" onClick={() => setStep(2)}>
                Back
              </Button>
            </div>
          </section>
        )}

        {step === 4 && (
          <section>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem' }}>Step 4 — Import options</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                <input
                  type="checkbox"
                  checked={skipDuplicates}
                  onChange={(event) => setSkipDuplicates(event.target.checked)}
                />
                Skip duplicates (match existing records by email or unique field)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                <input type="checkbox" checked={dryRun} onChange={(event) => setDryRun(event.target.checked)} />
                Dry run (validate rows without creating records)
              </label>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--theme-elevation-600)', marginBottom: '1rem' }}>
              Ready to import {rows.length.toLocaleString()} rows into{' '}
              <strong>{CSV_IMPORT_COLLECTIONS.find((entry) => entry.slug === collection)?.label}</strong>.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Button buttonStyle="primary" disabled={loading} onClick={() => void runImport()}>
                {loading ? 'Importing…' : dryRun ? 'Run dry import' : 'Import'}
              </Button>
              <Button buttonStyle="secondary" disabled={loading} onClick={() => setStep(3)}>
                Back
              </Button>
            </div>
          </section>
        )}

        {step === 5 && result && (
          <section>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              {result.dryRun ? 'Dry Run Complete' : 'Import Complete'}
            </h2>
            <Banner type={result.failed > 0 ? 'error' : 'success'}>
              {result.dryRun ? 'Would import' : 'Imported'}: {result.imported.toLocaleString()}, Skipped (duplicates):{' '}
              {result.skipped.toLocaleString()}, Failed: {result.failed.toLocaleString()}
            </Banner>

            {result.errors.length > 0 && (
              <div style={{ marginTop: '1.25rem' }}>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Failures ({result.errors.length})
                </h3>
                <ul style={{ fontSize: '0.8125rem', paddingLeft: '1.25rem', color: 'var(--theme-error-500)' }}>
                  {result.errors.slice(0, 50).map((entry) => (
                    <li key={`${entry.row}-${entry.error}`}>
                      Row {entry.row}: {entry.error}
                    </li>
                  ))}
                  {result.errors.length > 50 && <li>… and {result.errors.length - 50} more</li>}
                </ul>
              </div>
            )}

            <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem' }}>
              {!result.dryRun && (
                <Button buttonStyle="primary" el="link" url={`/admin/collections/${collection}`}>
                  View in Admin
                </Button>
              )}
              <Button buttonStyle="secondary" onClick={reset}>
                Import another file
              </Button>
            </div>
          </section>
        )}
      </div>
    </Gutter>
  )
}
