'use client'

import React, { useState, useCallback, useEffect } from 'react'

const COLLECTIONS = [
  { slug: 'course-signups', label: 'Course Signups (wp_bitcoin_course_signup)' },
  { slug: 'course-completions', label: 'Course Completions (wp_bitcoin_course_completion)' },
  { slug: 'feedback-bounties', label: 'Feedback Bounties (wp_feedback_bounty)' },
  { slug: 'vouchers', label: 'Vouchers (wp_feedback_bounty_vouchers)' },
  { slug: 'form-submissions', label: 'Form Submissions (Gravity Forms JSON)' },
]

type PreviewRow = { row: number; data: Record<string, unknown> | null; error: string | null }
type ImportResult = { imported: number; skipped: number; errors: Array<{ row: number; error: string }>; total: number }

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
    headers.forEach((h, idx) => { row[h.trim()] = (values[idx] ?? '').trim() })
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
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++ }
      else inQuotes = !inQuotes
    } else if (ch === ',' && !inQuotes) {
      result.push(current); current = ''
    } else {
      current += ch
    }
  }
  result.push(current)
  return result
}

export default function ImportDataView() {
  const [collection, setCollection] = useState('')
  const [format, setFormat] = useState<'csv' | 'json'>('csv')
  const [rows, setRows] = useState<Record<string, unknown>[]>([])
  const [fileName, setFileName] = useState('')
  const [preview, setPreview] = useState<PreviewRow[]>([])
  const [result, setResult] = useState<ImportResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState<'upload' | 'preview' | 'done'>('upload')
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    fetch('/api/users/me', { credentials: 'include' })
      .then(r => r.json())
      .then((d: any) => setIsAdmin(d?.user?.role === 'admin'))
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
    const detectedFormat = file.name.endsWith('.json') ? 'json' : 'csv'
    setFormat(detectedFormat)

    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const text = ev.target?.result as string
        if (detectedFormat === 'json') {
          const parsed = JSON.parse(text)
          setRows(Array.isArray(parsed) ? parsed : [parsed])
        } else {
          setRows(parseCsv(text) as Record<string, unknown>[])
        }
      } catch (err) {
        setError(`Failed to parse file: ${err instanceof Error ? err.message : String(err)}`)
      }
    }
    reader.readAsText(file)
  }, [])

  const handlePreview = async () => {
    if (!collection) { setError('Please select a collection'); return }
    if (rows.length === 0) { setError('No data loaded'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/admin/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collection, rows: rows.slice(0, 5), preview: true }),
      })
      const data = await res.json() as { preview?: PreviewRow[]; error?: string }
      if (!res.ok) { setError(data.error ?? 'Preview failed'); return }
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
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/admin/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collection, rows }),
      })
      const data = await res.json() as ImportResult & { error?: string }
      if (!res.ok) { setError(data.error ?? 'Import failed'); return }
      setResult(data)
      setStep('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setCollection(''); setFormat('csv'); setRows([])
    setFileName(''); setPreview([]); setResult(null)
    setError(''); setStep('upload')
  }

  if (isAdmin === null) {
    return <div style={{ padding: '2rem', color: '#666' }}>Loading…</div>
  }

  if (!isAdmin) {
    return (
      <div style={{ padding: '2rem' }}>
        <div style={{ background: '#fee', border: '1px solid #fcc', borderRadius: '8px', padding: '1.25rem', color: '#c00' }}>
          <strong>Access Denied</strong> — This tool is restricted to admin users only.
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '900px' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        Import Legacy Data
      </h1>
      <p style={{ color: '#666', marginBottom: '2rem', fontSize: '0.875rem' }}>
        Upload CSV or JSON exports from WordPress to import into Payload collections.
        Duplicate records are skipped automatically (matched on cert number or email).
      </p>

      {error && (
        <div style={{ background: '#fee', border: '1px solid #fcc', borderRadius: '6px', padding: '0.75rem 1rem', marginBottom: '1.5rem', color: '#c00', fontSize: '0.875rem' }}>
          {error}
        </div>
      )}

      {step === 'upload' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Target Collection</span>
            <select
              value={collection}
              onChange={e => setCollection(e.target.value)}
              style={{ padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '0.875rem', maxWidth: '400px' }}
            >
              <option value="">— Select collection —</option>
              {COLLECTIONS.map(c => (
                <option key={c.slug} value={c.slug}>{c.label}</option>
              ))}
            </select>
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Upload File (CSV or JSON)</span>
            <input
              type="file"
              accept=".csv,.json"
              onChange={handleFile}
              style={{ fontSize: '0.875rem' }}
            />
            {fileName && rows.length > 0 && (
              <span style={{ color: '#555', fontSize: '0.8rem' }}>
                {fileName} — {rows.length.toLocaleString()} rows detected
              </span>
            )}
          </label>

          <button
            onClick={handlePreview}
            disabled={loading || !collection || rows.length === 0}
            style={{
              padding: '0.625rem 1.25rem',
              background: '#fd5a47',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading || !collection || rows.length === 0 ? 0.6 : 1,
              alignSelf: 'flex-start',
            }}
          >
            {loading ? 'Processing…' : 'Preview Import →'}
          </button>
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
                {preview.map(p => (
                  <tr key={p.row} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.5rem 0.75rem', color: '#999', whiteSpace: 'nowrap' }}>Row {p.row}</td>
                    <td style={{ padding: '0.5rem 0.75rem' }}>
                      {p.error ? (
                        <span style={{ color: '#c00' }}>ERROR: {p.error}</span>
                      ) : (
                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: '0.75rem' }}>
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
              {loading ? `Importing ${rows.length.toLocaleString()} rows…` : `Import ${rows.length.toLocaleString()} Rows`}
            </button>
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
              Cancel
            </button>
          </div>
        </div>
      )}

      {step === 'done' && result && (
        <div>
          <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#166534', marginBottom: '0.75rem' }}>
              Import Complete
            </h2>
            <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.375rem 1rem', fontSize: '0.875rem' }}>
              <dt style={{ color: '#555' }}>Total rows:</dt>
              <dd style={{ fontWeight: 600 }}>{result.total.toLocaleString()}</dd>
              <dt style={{ color: '#555' }}>Imported:</dt>
              <dd style={{ fontWeight: 600, color: '#166534' }}>{result.imported.toLocaleString()}</dd>
              <dt style={{ color: '#555' }}>Skipped (duplicates):</dt>
              <dd style={{ fontWeight: 600 }}>{result.skipped.toLocaleString()}</dd>
              <dt style={{ color: '#555' }}>Errors:</dt>
              <dd style={{ fontWeight: 600, color: result.errors.length > 0 ? '#c00' : '#166534' }}>{result.errors.length}</dd>
            </dl>
          </div>

          {result.errors.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: '#c00' }}>
                Errors ({result.errors.length})
              </h3>
              <ul style={{ fontSize: '0.8rem', color: '#c00', paddingLeft: '1.25rem' }}>
                {result.errors.slice(0, 20).map(e => (
                  <li key={e.row}>Row {e.row}: {e.error}</li>
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
