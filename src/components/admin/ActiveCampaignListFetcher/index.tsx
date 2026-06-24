'use client'

import React, { useState } from 'react'

type ACList = {
  id: string
  name: string
  subscriberCount: string
}

export default function ActiveCampaignListFetcher() {
  const [lists, setLists] = useState<ACList[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function fetchLists() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/activecampaign/lists')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to fetch lists')
      setLists(data.lists ?? [])
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        marginBottom: '24px',
        padding: '16px',
        background: '#f0f4f8',
        borderRadius: '8px',
        border: '1px solid #d1d5db',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '8px',
        }}
      >
        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#253343' }}>
          ActiveCampaign Lists Reference
        </h4>
        <button
          type="button"
          onClick={fetchLists}
          disabled={loading}
          style={{
            padding: '4px 14px',
            background: '#253343',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '12px',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Fetching…' : 'Fetch Lists'}
        </button>
      </div>

      <p style={{ margin: '0 0 8px', fontSize: '12px', color: '#6b7280' }}>
        Use exact list names (copy from the table below) when filling in the mappings.
      </p>

      {error && (
        <p style={{ color: '#dc2626', fontSize: '12px', margin: '4px 0' }}>⚠ {error}</p>
      )}

      {lists.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginTop: '8px' }}>
          <thead>
            <tr style={{ background: '#dce7ef' }}>
              <th style={{ padding: '6px 10px', textAlign: 'left', fontWeight: 600 }}>List Name</th>
              <th style={{ padding: '6px 10px', textAlign: 'right', fontWeight: 600 }}>Subscribers</th>
              <th style={{ padding: '6px 10px', textAlign: 'left', fontWeight: 600, color: '#9ca3af' }}>ID</th>
            </tr>
          </thead>
          <tbody>
            {lists.map((l) => (
              <tr key={l.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                <td style={{ padding: '5px 10px', fontWeight: 500 }}>{l.name}</td>
                <td style={{ padding: '5px 10px', textAlign: 'right' }}>{l.subscriberCount}</td>
                <td style={{ padding: '5px 10px', fontFamily: 'monospace', color: '#9ca3af' }}>{l.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {lists.length === 0 && !loading && !error && (
        <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>
          Click &quot;Fetch Lists&quot; to load available lists from ActiveCampaign.
        </p>
      )}
    </div>
  )
}
