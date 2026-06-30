'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '@payloadcms/ui'
import { useParams } from 'next/navigation'

type ExportFormat = 'csv' | 'xlsx'

export default function ExportButton() {
  const { user } = useAuth()
  const params = useParams()
  const collectionSlug = typeof params?.slug === 'string' ? params.slug : ''
  const [open, setOpen] = useState(false)
  const [format, setFormat] = useState<ExportFormat>('csv')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [exporting, setExporting] = useState(false)
  const [error, setError] = useState('')
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function onClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [open])

  if (!user || (user as { role?: string }).role !== 'admin' || !collectionSlug) {
    return null
  }

  async function handleExport() {
    setExporting(true)
    setError('')

    try {
      const query = new URLSearchParams({
        collection: collectionSlug,
        format,
      })
      if (dateFrom) query.set('dateFrom', new Date(dateFrom).toISOString())
      if (dateTo) {
        const end = new Date(dateTo)
        end.setHours(23, 59, 59, 999)
        query.set('dateTo', end.toISOString())
      }

      const res = await fetch(`/api/admin/export?${query.toString()}`, {
        credentials: 'include',
      })

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string }
        throw new Error(body.error ?? `Export failed (${res.status})`)
      }

      const blob = await res.blob()
      const ext = format === 'xlsx' ? 'xlsx' : 'csv'
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${collectionSlug}-export.${ext}`
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
      setOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed')
    } finally {
      setExporting(false)
    }
  }

  return (
    <div ref={panelRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        style={{
          padding: '6px 12px',
          background: '#253343',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: 600,
        }}
      >
        Export
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            zIndex: 20,
            width: '280px',
            padding: '16px',
            background: '#fff',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            color: '#253343',
          }}
        >
          <p style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 600 }}>Export {collectionSlug}</p>

          <fieldset style={{ border: 'none', margin: '0 0 12px', padding: 0 }}>
            <legend style={{ fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Format</legend>
            <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
              <input
                type="radio"
                name="export-format"
                value="csv"
                checked={format === 'csv'}
                onChange={() => setFormat('csv')}
              />{' '}
              CSV
            </label>
            <label style={{ display: 'block', fontSize: '12px' }}>
              <input
                type="radio"
                name="export-format"
                value="xlsx"
                checked={format === 'xlsx'}
                onChange={() => setFormat('xlsx')}
              />{' '}
              XLSX
            </label>
          </fieldset>

          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
            Date from (optional)
          </label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '6px 8px', fontSize: '12px' }}
          />

          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
            Date to (optional)
          </label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            style={{ width: '100%', marginBottom: '12px', padding: '6px 8px', fontSize: '12px' }}
          />

          {error && (
            <p style={{ margin: '0 0 10px', fontSize: '12px', color: '#dc2626' }}>{error}</p>
          )}

          <button
            type="button"
            onClick={() => void handleExport()}
            disabled={exporting}
            style={{
              width: '100%',
              padding: '8px 12px',
              background: '#EB5528',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: exporting ? 'not-allowed' : 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              opacity: exporting ? 0.7 : 1,
            }}
          >
            {exporting ? 'Exporting…' : 'Export'}
          </button>
        </div>
      )}
    </div>
  )
}
