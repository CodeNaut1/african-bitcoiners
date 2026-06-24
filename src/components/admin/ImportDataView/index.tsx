'use client'

import React, { useState, useCallback, useEffect } from 'react'
import {
  IMPORT_COLLECTIONS,
  IMPORT_COLLECTION_FIELDS,
  autoDetectColumnMap,
  type ImportCollectionSlug,
} from '@/lib/legacy-import'

type PreviewRow = { row: number; data: Record<string, unknown> | null; error: string | null }
type ImportResult = {
  imported: number
  skipped: number
  errors: Array<{ row: number; error: string }>
  total: number
}

const BATCH_SIZE = 50

function parseCsv(text: string): Record<string, string>[] {
  const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n')
  if (lines.length < 2) return []
  const headers = parseCsvLine(lines[0]!)
  const rows: Record<string, string>[] = []
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]!.trim()
    if (!line) continue
    const values = parseCsvLine(line)
    const row: Record<string, string> = {}
    headers.forEach((h, idx) => {
      row[h.trim()] = (values[idx] ?? '').trim()
    })
    rows.push(row)
  }
  return rows
}

function parseCsvLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]!
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else inQuotes = !inQuotes
    } else if (ch === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += ch
    }
  }
  result.push(current)
  return result
}

function getSourceHeaders(rows: Record<string, unknown>[]): string[] {
  if (rows.length === 0) return []
  return Object.keys(rows[0]!)
}

export default function ImportDataView() {
  const [collection, setCollection] = useState('')
  const [rows, setRows] = useState<Record<string, unknown>[]>([])
  const [sourceHeaders, setSourceHeaders] = useState<string[]>([])
  const [columnMap, setColumnMap] = useState<Record<string, string>>({})
  const [fileName, setFileName] = useState('')
  const [preview, setPreview] = useState<PreviewRow[]>([])
  const [result, setResult] = useState<ImportResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [step, setStep] = useState<'upload' | 'map' | 'preview' | 'done'>('upload')
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    fetch('/api/users/me', { credentials: 'include' })
      .then((r) => r.json())
      .then((d: { user?: { role?: string } }) => setIsAdmin(d?.user?.role === 'admin'))
      .catch(() => setIsAdmin(false))
  }, [])

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    setPreview([])
    setResult(null)
    setStep('upload')
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)

    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const text = ev.target?.result as string
        let parsed: Record<string, unknown>[]
        if (file.name.endsWith('.json')) {
          const json = JSON.parse(text)
          parsed = Array.isArray(json) ? json : [json]
        } else {
          parsed = parseCsv(text) as Record<string, unknown>[]
        }
        setRows(parsed)
        setSourceHeaders(getSourceHeaders(parsed))
      } catch (err) {
        setError(`Failed to parse file: ${err instanceof Error ? err.message : String(err)}`)
      }
    }
    reader.readAsText(file)
  }, [])

  const handleCollectionChange = (slug: string) => {
    setCollection(slug)
    if (slug && sourceHeaders.length > 0) {
      const fields = IMPORT_COLLECTION_FIELDS[slug as ImportCollectionSlug] ?? []
      setColumnMap(autoDetectColumnMap(sourceHeaders, fields))
    }
  }

  const goToMapping = () => {
    if (!collection) {
      setError('Please select a collection')
      return
    }
    if (rows.length === 0) {
      setError('No data loaded')
      return
    }
    const fields = IMPORT_COLLECTION_FIELDS[collection as ImportCollectionSlug] ?? []
    setColumnMap(autoDetectColumnMap(sourceHeaders, fields))
    setStep('map')
  }

  const handlePreview = async () => {
    if (!collection || rows.length === 0) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collection,
          rows: rows.slice(0, 5),
          preview: true,
          columnMap,
        }),
      })
      const data = (await res.json()) as { preview?: PreviewRow[]; error?: string }
      if (!res.ok) {
        setError(data.error ?? 'Preview failed')
        return
      }
      setPreview(data.preview ?? [])
      setStep('preview')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error')
    } finally {
      setLoading(false)
    }
  }

  const handleImport = async () => {
    if (!collection) return
    setLoading(true)
    setError('')
    setProgress(0)

    let totalImported = 0
    let totalSkipped = 0
    const allErrors: Array<{ row: number; error: string }> = []

    try {
      for (let offset = 0; offset < rows.length; offset += BATCH_SIZE) {
        const batch = rows.slice(offset, offset + BATCH_SIZE)
        const res = await fetch('/api/admin/import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            collection,
            rows: batch,
            columnMap,
            offset,
            totalRows: rows.length,
          }),
        })
        const data = (await res.json()) as ImportResult & { error?: string }
        if (!res.ok) {
          setError(data.error ?? 'Import failed')
          return
        }
        totalImported += data.imported
        totalSkipped += data.skipped
        allErrors.push(...data.errors)
        setProgress(Math.min(100, Math.round(((offset + batch.length) / rows.length) * 100)))
      }

      setResult({
        imported: totalImported,
        skipped: totalSkipped,
        errors: allErrors,
        total: rows.length,
      })
      setStep('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error')
    } finally {
      setLoading(false)
      setProgress(100)
    }
  }

  const reset = () => {
    setCollection('')
    setRows([])
    setSourceHeaders([])
    setColumnMap({})
    setFileName('')
    setPreview([])
    setResult(null)
    setError('')
    setProgress(0)
    setStep('upload')
  }

  const targetFields = collection ? (IMPORT_COLLECTION_FIELDS[collection as ImportCollectionSlug] ?? []) : []

  if (isAdmin === null) {
    return <div style={{ padding: '2rem', color: '#666' }}>Loading…</div>
  }

  if (!isAdmin) {
    return (
      <div style={{ padding: '2rem' }}>
        <div
          style={{
            background: '#fee',
            border: '1px solid #fcc',
            borderRadius: '8px',
            padding: '1.25rem',
            color: '#c00',
          }}
        >
          <strong>Access Denied</strong> — This tool is restricted to admin users only.
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '900px' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Import Legacy Data</h1>
      <p style={{ color: '#666', marginBottom: '2rem', fontSize: '0.875rem' }}>
        Upload CSV or JSON exports from WordPress. Map columns to Payload fields, preview, then import.
        Duplicate records are skipped (matched on cert number or email).
      </p>

      {error && (
        <div
          style={{
            background: '#fee',
            border: '1px solid #fcc',
            borderRadius: '6px',
            padding: '0.75rem 1rem',
            marginBottom: '1.5rem',
            color: '#c00',
            fontSize: '0.875rem',
          }}
        >
          {error}
        </div>
      )}

      {loading && progress > 0 && step !== 'done' && (
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.375rem' }}>
            <span>Importing…</span>
            <span>{progress}%</span>
          </div>
          <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '9999px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: '#fd5a47',
                transition: 'width 0.2s ease',
              }}
            />
          </div>
        </div>
      )}

      {step === 'upload' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Target Collection</span>
            <select
              value={collection}
              onChange={(e) => handleCollectionChange(e.target.value)}
              style={{
                padding: '0.5rem 0.75rem',
                borderRadius: '6px',
                border: '1px solid #ddd',
                fontSize: '0.875rem',
                maxWidth: '400px',
              }}
            >
              <option value="">— Select collection —</option>
              {IMPORT_COLLECTIONS.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Upload File (CSV or JSON)</span>
            <input type="file" accept=".csv,.json" onChange={handleFile} style={{ fontSize: '0.875rem' }} />
            {fileName && rows.length > 0 && (
              <span style={{ color: '#555', fontSize: '0.8rem' }}>
                {fileName} — {rows.length.toLocaleString()} rows detected
              </span>
            )}
          </label>

          <button
            onClick={goToMapping}
            disabled={!collection || rows.length === 0}
            style={{
              padding: '0.625rem 1.25rem',
              background: '#fd5a47',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: !collection || rows.length === 0 ? 'not-allowed' : 'pointer',
              opacity: !collection || rows.length === 0 ? 0.6 : 1,
              alignSelf: 'flex-start',
            }}
          >
            Map Columns →
          </button>
        </div>
      )}

      {step === 'map' && (
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Map Columns to Fields</h2>
          <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>
            Match source file columns to Payload fields. Auto-detected mappings are pre-filled.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1.5rem' }}>
            {targetFields.map((field) => (
              <label
                key={field}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '180px 1fr',
                  gap: '0.75rem',
                  alignItems: 'center',
                  fontSize: '0.875rem',
                }}
              >
                <span style={{ fontWeight: 600 }}>{field}</span>
                <select
                  value={columnMap[field] ?? ''}
                  onChange={(e) => setColumnMap((m) => ({ ...m, [field]: e.target.value }))}
                  style={{ padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid #ddd' }}
                >
                  <option value="">— skip —</option>
                  {sourceHeaders.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={handlePreview}
              disabled={loading}
              style={{
                padding: '0.625rem 1.25rem',
                background: '#fd5a47',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Processing…' : 'Preview Import →'}
            </button>
            <button
              onClick={() => setStep('upload')}
              style={{
                padding: '0.625rem 1.25rem',
                background: 'transparent',
                color: '#555',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontWeight: 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              Back
            </button>
          </div>
        </div>
      )}

      {step === 'preview' && (
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Preview — First {preview.length} rows
          </h2>
          <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>
            {rows.length.toLocaleString()} rows total will be imported into <strong>{collection}</strong>
          </p>

          <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <tbody>
                {preview.map((p) => (
                  <tr key={p.row} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.5rem 0.75rem', color: '#999', whiteSpace: 'nowrap' }}>Row {p.row}</td>
                    <td style={{ padding: '0.5rem 0.75rem' }}>
                      {p.error ? (
                        <span style={{ color: '#c00' }}>ERROR: {p.error}</span>
                      ) : (
                        <pre
                          style={{
                            margin: 0,
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-all',
                            fontSize: '0.75rem',
                          }}
                        >
                          {JSON.stringify(p.data, null, 2)}
                        </pre>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={handleImport}
              disabled={loading}
              style={{
                padding: '0.625rem 1.25rem',
                background: '#253343',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? `Importing…` : `Import ${rows.length.toLocaleString()} Rows`}
            </button>
            <button
              onClick={() => setStep('map')}
              style={{
                padding: '0.625rem 1.25rem',
                background: 'transparent',
                color: '#555',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontWeight: 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              Back
            </button>
          </div>
        </div>
      )}

      {step === 'done' && result && (
        <div>
          <div
            style={{
              background: '#f0fdf4',
              border: '1px solid #86efac',
              borderRadius: '8px',
              padding: '1.25rem',
              marginBottom: '1.5rem',
            }}
          >
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#166534', marginBottom: '0.75rem' }}>
              Import Complete
            </h2>
            <dl
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '0.375rem 1rem',
                fontSize: '0.875rem',
              }}
            >
              <dt style={{ color: '#555' }}>Total rows:</dt>
              <dd style={{ fontWeight: 600 }}>{result.total.toLocaleString()}</dd>
              <dt style={{ color: '#555' }}>Imported:</dt>
              <dd style={{ fontWeight: 600, color: '#166534' }}>{result.imported.toLocaleString()}</dd>
              <dt style={{ color: '#555' }}>Skipped (duplicates):</dt>
              <dd style={{ fontWeight: 600 }}>{result.skipped.toLocaleString()}</dd>
              <dt style={{ color: '#555' }}>Errors:</dt>
              <dd style={{ fontWeight: 600, color: result.errors.length > 0 ? '#c00' : '#166534' }}>
                {result.errors.length}
              </dd>
            </dl>
          </div>

          {result.errors.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: '#c00' }}>
                Errors ({result.errors.length})
              </h3>
              <ul style={{ fontSize: '0.8rem', color: '#c00', paddingLeft: '1.25rem' }}>
                {result.errors.slice(0, 20).map((e) => (
                  <li key={e.row}>
                    Row {e.row}: {e.error}
                  </li>
                ))}
                {result.errors.length > 20 && <li>… and {result.errors.length - 20} more</li>}
              </ul>
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <a
              href={`/admin/collections/${collection}`}
              style={{
                padding: '0.625rem 1.25rem',
                background: '#fd5a47',
                color: '#fff',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.875rem',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              View in Admin →
            </a>
            <button
              onClick={reset}
              style={{
                padding: '0.625rem 1.25rem',
                background: 'transparent',
                color: '#555',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontWeight: 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              Import Another File
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
