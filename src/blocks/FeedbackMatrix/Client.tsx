'use client'

import React, { useState, useMemo } from 'react'
import { Search, ChevronUp, ChevronDown } from 'lucide-react'

import { cn } from '@/utilities/ui'
import { Badge } from '@/components/ui/badge'
import { ABInput } from '@/components/ui/ab-form-fields'

type Row = {
  entryId: number | string
  dateAdded?: string | null
  feedbackTitle: string
  category?: string
  description?: string
  status?: string
  rewardStatus?: string
  implementationDate?: string | null
  lastActivity?: string | null
}

const STATUS_VARIANT: Record<string, any> = {
  Pending: 'pending',
  'Under review': 'review',
  Accepted: 'accepted',
  'Not accepted': 'rejected',
  Idea: 'idea',
  Implemented: 'implemented',
}

const REWARD_VARIANT: Record<string, any> = {
  Paid: 'paid',
  Processing: 'processing',
  Pending: 'pending',
  'Not paid': 'rejected',
}

type SortKey = keyof Row
type SortDir = 'asc' | 'desc'

export function FeedbackMatrixClient({ rows, showSearch }: { rows: Row[]; showSearch: boolean }) {
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('lastActivity')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return rows.filter(
      (r) =>
        !q ||
        r.feedbackTitle?.toLowerCase().includes(q) ||
        r.category?.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q) ||
        r.status?.toLowerCase().includes(q),
    )
  }, [rows, query])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const av = a[sortKey] ?? ''
      const bv = b[sortKey] ?? ''
      const cmp = String(av).localeCompare(String(bv))
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [filtered, sortKey, sortDir])

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortKey(key); setSortDir('asc') }
  }

  function toggleExpand(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  const SortIcon = ({ k }: { k: SortKey }) =>
    sortKey === k ? (sortDir === 'asc' ? <ChevronUp size={13} /> : <ChevronDown size={13} />) : null

  const ThBtn = ({ label, k }: { label: string; k: SortKey }) => (
    <button
      onClick={() => toggleSort(k)}
      className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-text-muted hover:text-brand-secondary transition-colors"
    >
      {label} <SortIcon k={k} />
    </button>
  )

  return (
    <div>
      {showSearch && (
        <div className="mb-6 max-w-sm relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-muted pointer-events-none" />
          <ABInput
            placeholder="Search feedback…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      )}

      <p className="text-xs text-brand-text-muted mb-4">{sorted.length} entries</p>

      {/* Table — scroll on mobile */}
      <div className="overflow-x-auto rounded-card border border-brand-border-light">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-brand-cream border-b border-brand-border-light">
            <tr>
              <th className="px-4 py-3 text-left"><ThBtn label="Bounty ID" k="entryId" /></th>
              <th className="px-4 py-3 text-left"><ThBtn label="Date Added" k="dateAdded" /></th>
              <th className="px-4 py-3 text-left"><ThBtn label="Category" k="category" /></th>
              <th className="px-4 py-3 text-left"><ThBtn label="Description" k="description" /></th>
              <th className="px-4 py-3 text-left"><ThBtn label="Status" k="status" /></th>
              <th className="px-4 py-3 text-left"><ThBtn label="Reward" k="rewardStatus" /></th>
              <th className="px-4 py-3 text-left"><ThBtn label="Implemented" k="implementationDate" /></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border-light">
            {sorted.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-brand-text-muted">No results found.</td>
              </tr>
            )}
            {sorted.map((row) => {
              const rowKey = String(row.entryId)
              const isExpanded = expanded.has(rowKey)
              const desc = row.description ?? ''
              const truncated = desc.length > 100

              return (
                <React.Fragment key={rowKey}>
                  <tr className="hover:bg-brand-cream/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-brand-secondary">#{row.entryId}</td>
                    <td className="px-4 py-3 text-xs text-brand-text-muted">
                      {row.dateAdded
                        ? new Date(row.dateAdded).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                        : '—'}
                    </td>
                    <td className="px-4 py-3 text-brand-text-mid">{row.category}</td>
                    <td className="px-4 py-3 text-brand-text-mid max-w-[240px]">
                      {isExpanded || !truncated ? desc : `${desc.slice(0, 100)}…`}
                      {truncated && (
                        <button
                          type="button"
                          onClick={() => toggleExpand(rowKey)}
                          className="ml-2 text-brand-primary font-semibold hover:underline"
                        >
                          {isExpanded ? 'Close' : 'Read more'}
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {row.status && <Badge variant={STATUS_VARIANT[row.status] ?? 'default'}>{row.status}</Badge>}
                    </td>
                    <td className="px-4 py-3">
                      {row.rewardStatus && <Badge variant={REWARD_VARIANT[row.rewardStatus] ?? 'default'}>{row.rewardStatus}</Badge>}
                    </td>
                    <td className="px-4 py-3 text-xs text-brand-text-muted">
                      {row.implementationDate
                        ? new Date(row.implementationDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                        : '—'}
                    </td>
                  </tr>
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
