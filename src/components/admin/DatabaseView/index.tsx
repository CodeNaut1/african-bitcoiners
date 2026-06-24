'use client'

import React, { useState, useEffect } from 'react'

type CollectionStat = { slug: string; label: string; count: number | null }
type DetailResult = { slug: string; label: string; count: number; recent: Record<string, unknown>[] }

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
  const [loading, setLoading] = useState(true)
  const [detailLoading, setDetailLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<{ collection: string; label: string } | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [deleteResult, setDeleteResult] = useState('')
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    fetch('/api/users/me', { credentials: 'include' })
      .then(r => r.json())
      .then((d: any) => {
        const admin = d?.user?.role === 'admin'
        setIsAdmin(admin)
        if (admin) fetchStats()
        else setLoading(false)
      })
      .catch(() => { setIsAdmin(false); setLoading(false) })
  }, [])

  async function fetchStats() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/stats')
      if (!res.ok) { setError('Failed to load stats'); return }
      const data = await res.json() as { collections: CollectionStat[] }
      setStats(data.collections)
    } catch {
      setError('Network error loading stats')
    } finally {
      setLoading(false)
    }
  }

  async function fetchDetail(slug: string) {
    setDetailLoading(true)
    setDetail(null)
    setDeleteResult('')
    try {
      const res = await fetch(`/api/admin/stats?collection=${slug}`)
      if (!res.ok) { setError('Failed to load detail'); return }
      const data = await res.json() as DetailResult
      setDetail(data)
    } catch {
      setError('Network error loading collection detail')
    } finally {
      setDetailLoading(false)
    }
  }

  function handleExport(slug: string) {
    window.location.href = `/api/admin/export?collection=${slug}`
  }

  async function handleBulkDelete() {
    if (!deleteConfirm) return
    setDeleting(true)
    setDeleteResult('')
    try {
      // Use Payload's local API through the stats endpoint to find IDs, then delete via /api
      const res = await fetch(`/api/${deleteConfirm.collection}?limit=10000&depth=0`, {
        headers: { 'Content-Type': 'application/json' },
      })
      if (!res.ok) { setDeleteResult('Failed to fetch records for deletion'); setDeleting(false); return }
      const data = await res.json() as { docs: Array<{ id: string | number }> }
      const ids = data.docs.map(d => d.id)

      let deleted = 0
      for (const id of ids) {
        try {
          await fetch(`/api/${deleteConfirm.collection}/${id}`, { method: 'DELETE' })
          deleted++
        } catch { /* continue */ }
      }
      setDeleteResult(`Deleted ${deleted} of ${ids.length} records from ${deleteConfirm.label}`)
      setDeleteConfirm(null)
      fetchStats()
      setDetail(null)
    } catch (err) {
      setDeleteResult(`Error: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setDeleting(false)
    }
  }

  const filtered = searchQuery
    ? stats.filter(s => s.label.toLowerCase().includes(searchQuery.toLowerCase()) || s.slug.includes(searchQuery.toLowerCase()))
    : stats

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
    <div style={{ padding: '2rem', maxWidth: '1100px' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        Database Management
      </h1>
      <p style={{ color: '#666', fontSize: '0.875rem', marginBottom: '2rem' }}>
        Browse collections, export CSV, and manage records. Bulk delete is permanent — use with care.
      </p>

      {error && (
        <div style={{ background: '#fee', border: '1px solid #fcc', borderRadius: '6px', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#c00', fontSize: '0.875rem' }}>
          {error}
        </div>
      )}

      {deleteResult && (
        <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '6px', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#166534', fontSize: '0.875rem' }}>
          {deleteResult}
        </div>
      )}

      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: '8px', padding: '2rem', maxWidth: '400px', width: '90%', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
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
                style={{ padding: '0.5rem 1rem', background: '#c00', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, fontSize: '0.875rem', cursor: deleting ? 'not-allowed' : 'pointer', opacity: deleting ? 0.7 : 1 }}
              >
                {deleting ? 'Deleting…' : 'Delete All Records'}
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid #ddd', borderRadius: '6px', fontWeight: 500, fontSize: '0.875rem', cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: detail ? '280px 1fr' : '1fr', gap: '2rem', alignItems: 'start' }}>
        {/* Collection list */}
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="search"
              placeholder="Search collections…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '0.875rem', boxSizing: 'border-box' }}
            />
          </div>

          {loading ? (
            <p style={{ color: '#999', fontSize: '0.875rem' }}>Loading…</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {filtered.map(c => (
                <button
                  key={c.slug}
                  onClick={() => fetchDetail(c.slug)}
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
                    transition: 'all 0.15s',
                  }}
                >
                  <span>{c.label}</span>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    background: detail?.slug === c.slug ? 'rgba(255,255,255,0.2)' : '#e5e7eb',
                    color: detail?.slug === c.slug ? '#fff' : '#666',
                    borderRadius: '9999px',
                    padding: '0.1rem 0.5rem',
                  }}>
                    {c.count === null ? '?' : c.count.toLocaleString()}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail panel */}
        {detail && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{detail.label}</h2>
                <p style={{ fontSize: '0.8rem', color: '#666' }}>
                  {detail.count.toLocaleString()} records · slug: <code style={{ fontSize: '0.75rem', background: '#f3f4f6', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>{detail.slug}</code>
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleExport(detail.slug)}
                  style={{ padding: '0.5rem 0.875rem', background: '#fd5a47', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  Export CSV
                </button>
                <a
                  href={`/admin/collections/${detail.slug}`}
                  style={{ padding: '0.5rem 0.875rem', background: '#253343', color: '#fff', borderRadius: '6px', fontWeight: 600, fontSize: '0.8rem', textDecoration: 'none', display: 'inline-block' }}
                >
                  Open in Admin
                </a>
                {DELETABLE_COLLECTIONS.includes(detail.slug) && (
                  <button
                    onClick={() => setDeleteConfirm({ collection: detail.slug, label: detail.label })}
                    style={{ padding: '0.5rem 0.875rem', background: 'transparent', color: '#c00', border: '1px solid #fcc', borderRadius: '6px', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer' }}
                  >
                    Bulk Delete
                  </button>
                )}
              </div>
            </div>

            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.625rem', color: '#444' }}>
              5 Most Recent Records
            </h3>

            {detailLoading ? (
              <p style={{ color: '#999', fontSize: '0.875rem' }}>Loading…</p>
            ) : detail.recent.length === 0 ? (
              <p style={{ color: '#999', fontSize: '0.875rem' }}>No records yet.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                      {Object.keys(detail.recent[0]!).filter(k => !['blocks', 'content', 'layout'].includes(k)).slice(0, 8).map(k => (
                        <th key={k} style={{ padding: '0.5rem 0.75rem', textAlign: 'left', fontWeight: 600, color: '#555', whiteSpace: 'nowrap' }}>{k}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {detail.recent.map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                        {Object.entries(row).filter(([k]) => !['blocks', 'content', 'layout'].includes(k)).slice(0, 8).map(([k, v]) => (
                          <td key={k} style={{ padding: '0.5rem 0.75rem', color: '#333', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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
    </div>
  )
}
