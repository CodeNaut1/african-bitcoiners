'use client'

import React, { useState, useEffect } from 'react'

type CollectionStat = { slug: string; label: string; count: number | null }
type DetailResult = {
  slug: string
  label: string
  count: number
  recent: Record<string, unknown>[]
  search?: string | null
}
type OpsEntry = {
  timestamp?: string
  action?: string
  collection?: string
  details?: string
  user?: string
}

const DELETABLE_COLLECTIONS = [
  'course-signups',
  'course-completions',
  'feedback-bounties',
  'vouchers',
  'form-submissions',
  'meetup-submissions',
]

export default function DatabaseView() {
  const [stats, setStats] = useState<CollectionStat[]>([])
  const [detail, setDetail] = useState<DetailResult | null>(null)
  const [opsLog, setOpsLog] = useState<OpsEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [detailLoading, setDetailLoading] = useState(false)
  const [error, setError] = useState('')
  const [collectionSearch, setCollectionSearch] = useState('')
  const [recordSearch, setRecordSearch] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<{ collection: string; label: string } | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [deleteResult, setDeleteResult] = useState('')
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    fetch('/api/users/me', { credentials: 'include' })
      .then((r) => r.json())
      .then((d: { user?: { role?: string } }) => {
        const admin = d?.user?.role === 'admin'
        setIsAdmin(admin)
        if (admin) {
          fetchStats()
          fetchOpsLog()
        } else {
          setLoading(false)
        }
      })
      .catch(() => {
        setIsAdmin(false)
        setLoading(false)
      })
  }, [])

  async function fetchStats() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/stats')
      if (!res.ok) {
        setError('Failed to load stats')
        return
      }
      const data = (await res.json()) as { collections: CollectionStat[] }
      setStats(data.collections)
    } catch {
      setError('Network error loading stats')
    } finally {
      setLoading(false)
    }
  }

  async function fetchOpsLog() {
    try {
      const res = await fetch('/api/admin/stats?opsLog=1')
      if (!res.ok) return
      const data = (await res.json()) as { entries: OpsEntry[] }
      setOpsLog(data.entries ?? [])
    } catch {
      // non-fatal
    }
  }

  async function fetchDetail(slug: string, search?: string) {
    setDetailLoading(true)
    setDeleteResult('')
    try {
      const params = new URLSearchParams({ collection: slug })
      if (search?.trim()) params.set('search', search.trim())
      const res = await fetch(`/api/admin/stats?${params}`)
      if (!res.ok) {
        setError('Failed to load detail')
        return
      }
      const data = (await res.json()) as DetailResult
      setDetail(data)
    } catch {
      setError('Network error loading collection detail')
    } finally {
      setDetailLoading(false)
    }
  }

  function handleExport(slug: string) {
    window.location.href = `/api/admin/export?collection=${slug}`
    setTimeout(fetchOpsLog, 1500)
  }

  async function handleBulkDelete() {
    if (!deleteConfirm) return
    setDeleting(true)
    setDeleteResult('')
    try {
      const res = await fetch('/api/admin/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collection: deleteConfirm.collection }),
      })
      const data = (await res.json()) as { deleted?: number; total?: number; error?: string }
      if (!res.ok) {
        setDeleteResult(data.error ?? 'Delete failed')
        return
      }
      setDeleteResult(`Deleted ${data.deleted} of ${data.total} records from ${deleteConfirm.label}`)
      setDeleteConfirm(null)
      fetchStats()
      fetchOpsLog()
      setDetail(null)
    } catch (err) {
      setDeleteResult(`Error: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setDeleting(false)
    }
  }

  const filtered = collectionSearch
    ? stats.filter(
        (s) =>
          s.label.toLowerCase().includes(collectionSearch.toLowerCase()) ||
          s.slug.includes(collectionSearch.toLowerCase()),
      )
    : stats

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
    <div style={{ padding: '2rem', maxWidth: '1100px' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Database Management</h1>
      <p style={{ color: '#666', fontSize: '0.875rem', marginBottom: '2rem' }}>
        Browse collections, search records, export CSV, and review recent admin operations.
      </p>

      {error && (
        <div
          style={{
            background: '#fee',
            border: '1px solid #fcc',
            borderRadius: '6px',
            padding: '0.75rem 1rem',
            marginBottom: '1rem',
            color: '#c00',
            fontSize: '0.875rem',
          }}
        >
          {error}
        </div>
      )}

      {deleteResult && (
        <div
          style={{
            background: '#f0fdf4',
            border: '1px solid #86efac',
            borderRadius: '6px',
            padding: '0.75rem 1rem',
            marginBottom: '1rem',
            color: '#166534',
            fontSize: '0.875rem',
          }}
        >
          {deleteResult}
        </div>
      )}

      {deleteConfirm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '8px',
              padding: '2rem',
              maxWidth: '400px',
              width: '90%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            }}
          >
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#c00' }}>
              Confirm Bulk Delete
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#444', marginBottom: '1.5rem' }}>
              This will permanently delete <strong>ALL records</strong> in <strong>{deleteConfirm.label}</strong>.
              This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={handleBulkDelete}
                disabled={deleting}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#c00',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: deleting ? 'not-allowed' : 'pointer',
                  opacity: deleting ? 0.7 : 1,
                }}
              >
                {deleting ? 'Deleting…' : 'Delete All Records'}
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'transparent',
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
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: detail ? '280px 1fr' : '1fr',
          gap: '2rem',
          alignItems: 'start',
        }}
      >
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="search"
              placeholder="Search collections…"
              value={collectionSearch}
              onChange={(e) => setCollectionSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                borderRadius: '6px',
                border: '1px solid #ddd',
                fontSize: '0.875rem',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {loading ? (
            <p style={{ color: '#999', fontSize: '0.875rem' }}>Loading…</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {filtered.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => {
                    setRecordSearch('')
                    fetchDetail(c.slug)
                  }}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.625rem 0.875rem',
                    background: detail?.slug === c.slug ? '#253343' : '#f9fafb',
                    color: detail?.slug === c.slug ? '#fff' : '#333',
                    border: '1px solid ' + (detail?.slug === c.slug ? '#253343' : '#e5e7eb'),
                    borderRadius: '6px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                  }}
                >
                  <span>{c.label}</span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: detail?.slug === c.slug ? 'rgba(255,255,255,0.2)' : '#e5e7eb',
                      color: detail?.slug === c.slug ? '#fff' : '#666',
                      borderRadius: '9999px',
                      padding: '0.1rem 0.5rem',
                    }}
                  >
                    {c.count === null ? '?' : c.count.toLocaleString()}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {detail && (
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.25rem',
                flexWrap: 'wrap',
                gap: '0.75rem',
              }}
            >
              <div>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{detail.label}</h2>
                <p style={{ fontSize: '0.8rem', color: '#666' }}>
                  {detail.count.toLocaleString()} records
                  {detail.search ? ` matching "${detail.search}"` : ''} · slug:{' '}
                  <code
                    style={{
                      fontSize: '0.75rem',
                      background: '#f3f4f6',
                      padding: '0.1rem 0.35rem',
                      borderRadius: '4px',
                    }}
                  >
                    {detail.slug}
                  </code>
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleExport(detail.slug)}
                  style={{
                    padding: '0.5rem 0.875rem',
                    background: '#fd5a47',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                  }}
                >
                  Export CSV
                </button>
                <a
                  href={`/admin/collections/${detail.slug}`}
                  style={{
                    padding: '0.5rem 0.875rem',
                    background: '#253343',
                    color: '#fff',
                    borderRadius: '6px',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    textDecoration: 'none',
                    display: 'inline-block',
                  }}
                >
                  Open in Admin
                </a>
                {DELETABLE_COLLECTIONS.includes(detail.slug) && (
                  <button
                    onClick={() => setDeleteConfirm({ collection: detail.slug, label: detail.label })}
                    style={{
                      padding: '0.5rem 0.875rem',
                      background: 'transparent',
                      color: '#c00',
                      border: '1px solid #fcc',
                      borderRadius: '6px',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                    }}
                  >
                    Bulk Delete
                  </button>
                )}
              </div>
            </div>

            <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
              <input
                type="search"
                placeholder="Search records in this collection…"
                value={recordSearch}
                onChange={(e) => setRecordSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') fetchDetail(detail.slug, recordSearch)
                }}
                style={{
                  flex: 1,
                  padding: '0.5rem 0.75rem',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  fontSize: '0.875rem',
                }}
              />
              <button
                onClick={() => fetchDetail(detail.slug, recordSearch)}
                style={{
                  padding: '0.5rem 0.875rem',
                  background: '#253343',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                }}
              >
                Search
              </button>
            </div>

            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.625rem', color: '#444' }}>
              {detail.search ? 'Search Results' : '5 Most Recent Records'}
            </h3>

            {detailLoading ? (
              <p style={{ color: '#999', fontSize: '0.875rem' }}>Loading…</p>
            ) : detail.recent.length === 0 ? (
              <p style={{ color: '#999', fontSize: '0.875rem' }}>No records found.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                      {Object.keys(detail.recent[0]!)
                        .filter((k) => !['blocks', 'content', 'layout', 'data'].includes(k))
                        .slice(0, 8)
                        .map((k) => (
                          <th
                            key={k}
                            style={{
                              padding: '0.5rem 0.75rem',
                              textAlign: 'left',
                              fontWeight: 600,
                              color: '#555',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {k}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {detail.recent.map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                        {Object.entries(row)
                          .filter(([k]) => !['blocks', 'content', 'layout', 'data'].includes(k))
                          .slice(0, 8)
                          .map(([k, v]) => (
                            <td
                              key={k}
                              style={{
                                padding: '0.5rem 0.75rem',
                                color: '#333',
                                maxWidth: '200px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {v === null || v === undefined ? (
                                <span style={{ color: '#bbb' }}>—</span>
                              ) : typeof v === 'object' ? (
                                <span style={{ color: '#888', fontStyle: 'italic' }}>[object]</span>
                              ) : (
                                String(v).slice(0, 60)
                              )}
                            </td>
                          ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ marginTop: '2.5rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Recent Admin Operations</h2>
        {opsLog.length === 0 ? (
          <p style={{ color: '#999', fontSize: '0.875rem' }}>No operations logged yet.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                  {['Time', 'Action', 'Collection', 'Details', 'User'].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: '0.5rem 0.75rem',
                        textAlign: 'left',
                        fontWeight: 600,
                        color: '#555',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {opsLog.map((entry, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '0.5rem 0.75rem', whiteSpace: 'nowrap' }}>
                      {entry.timestamp ? new Date(entry.timestamp).toLocaleString() : '—'}
                    </td>
                    <td style={{ padding: '0.5rem 0.75rem' }}>{entry.action ?? '—'}</td>
                    <td style={{ padding: '0.5rem 0.75rem' }}>{entry.collection ?? '—'}</td>
                    <td style={{ padding: '0.5rem 0.75rem' }}>{entry.details ?? '—'}</td>
                    <td style={{ padding: '0.5rem 0.75rem' }}>{entry.user ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
