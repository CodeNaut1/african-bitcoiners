'use client'

import React, { useMemo, useState } from 'react'

import type { MatrixRow } from '@/components/FeedbackBountyMatrixPage/types'

const TRUNCATE_LEN = 55

type SortKey = keyof MatrixRow
type SortDir = 'asc' | 'desc'

const STATUS_PILL: Record<string, string> = {
  pending: 'text-[#6B7280] bg-[#F9FAFB] font-normal',
  'not-accepted': 'text-[#B42318] bg-[#FEF3F2]',
  'under-review': 'text-[#B54708] bg-[#FFFAEB]',
  accepted: 'text-[#027A48] bg-[#ECFDF3]',
  idea: 'text-[#363F72] bg-[#F8F9FC]',
  implemented: 'text-[#027A48] bg-[#ECFDF3]',
}

const REWARD_PILL: Record<string, string> = {
  pending: 'text-[#6B7280] bg-[#F9FAFB] font-normal',
  'not-paid': 'text-[#B42318] bg-[#FEF3F2]',
  processing: 'text-[#B54708] bg-[#FFFAEB]',
  paid: 'text-[#027A48] bg-[#ECFDF3]',
}

function statusKey(value: string | null) {
  if (!value) return 'pending'
  const map: Record<string, string> = {
    Pending: 'pending',
    'Not accepted': 'not-accepted',
    'Under review': 'under-review',
    Accepted: 'accepted',
    Idea: 'idea',
    Implemented: 'implemented',
  }
  return map[value] ?? 'pending'
}

function rewardKey(value: string | null) {
  if (!value) return 'pending'
  const map: Record<string, string> = {
    Pending: 'pending',
    'Not paid': 'not-paid',
    Processing: 'processing',
    Paid: 'paid',
  }
  return map[value] ?? 'pending'
}

function formatDate(value: string | null) {
  if (!value) return '-'
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function truncateText(text: string) {
  if (text.length <= TRUNCATE_LEN) return null
  const slice = text.slice(0, TRUNCATE_LEN).trimEnd()
  const lastSpace = slice.lastIndexOf(' ')
  const short = (lastSpace > 20 ? slice.slice(0, lastSpace) : slice).trim()
  return `${short}...`
}

function Pill({ label, pillKey, variant }: { label: string; pillKey: string; variant: 'status' | 'reward' }) {
  const styles = variant === 'status' ? STATUS_PILL[pillKey] : REWARD_PILL[pillKey]
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-[7px] py-px text-xs font-bold ${styles ?? ''}`}>
      {label}
    </span>
  )
}

function DescriptionCell({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false)
  const short = truncateText(text)

  if (!short) {
    return <span>{text}</span>
  }

  if (expanded) {
    return (
      <span>
        {text}{' '}
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="font-semibold text-[#F45341] hover:underline"
        >
          Close
        </button>
      </span>
    )
  }

  return (
    <span>
      {short}{' '}
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="font-semibold text-[#F45341] hover:underline"
      >
        Read more
      </button>
    </span>
  )
}

const COLUMNS: { label: string; key: SortKey }[] = [
  { label: 'BOUNTY ID', key: 'id' },
  { label: 'DATE ADDED', key: 'dateAdded' },
  { label: 'CATEGORY', key: 'category' },
  { label: 'DESCRIPTION', key: 'description' },
  { label: 'STATUS', key: 'status' },
  { label: 'REWARD STATUS', key: 'rewardStatus' },
  { label: 'IMPLEMENTATION DATE', key: 'implementationDate' },
]

export function MatrixTable({ rows }: { rows: MatrixRow[] }) {
  const [sortKey, setSortKey] = useState<SortKey>('dateAdded')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const sorted = useMemo(() => {
    return [...rows].sort((a, b) => {
      const av = a[sortKey] ?? ''
      const bv = b[sortKey] ?? ''
      const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true })
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [rows, sortKey, sortDir])

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  return (
    <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
      <table className="w-full min-w-[900px] border-separate border-spacing-0 overflow-hidden rounded-lg border border-[#E4E7EC] bg-white shadow-[0px_1px_3px_0px_#1018281A]">
        <thead className="bg-[#F9FAFB]">
          <tr>
            {COLUMNS.map(({ label, key }) => (
              <th
                key={key}
                className="cursor-pointer border-b border-[#E4E7EC] px-3 py-3 text-left text-[10px] font-bold tracking-[-0.6px] text-[#475467] md:text-xs"
                onClick={() => toggleSort(key)}
              >
                {label}
                {sortKey === key && (
                  <span className="ml-1">{sortDir === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-10 text-center text-sm text-[#475467]">
                No feedback submissions yet.
              </td>
            </tr>
          )}
          {sorted.map((row) => (
            <tr key={row.id} className="min-h-[80px] border-b border-[#E4E7EC] last:border-b-0">
              <td className="px-3 py-4 text-left text-[13px] font-bold text-[#101828] md:text-sm">#{row.id}</td>
              <td className="px-3 py-4 text-left text-[13px] font-semibold text-[#475467] md:text-sm">
                {formatDate(row.dateAdded)}
              </td>
              <td className="px-3 py-4 pl-2 text-left md:pl-[10px]">
                {row.category ? (
                  <span className="inline-block whitespace-nowrap rounded-full bg-[#F8F9FC] px-[7px] py-px text-[11px] font-bold text-[#363F72]">
                    {row.category}
                  </span>
                ) : (
                  '—'
                )}
              </td>
              <td className="px-3 py-4 text-left text-[15px] font-medium leading-relaxed text-[#475467]">
                <DescriptionCell text={row.description} />
              </td>
              <td className="px-3 py-4 pl-2 text-left md:pl-[10px]">
                {row.status ? (
                  <Pill label={row.status} pillKey={statusKey(row.status)} variant="status" />
                ) : (
                  '—'
                )}
              </td>
              <td className="px-3 py-4 pl-2 text-left md:pl-[10px]">
                {row.rewardStatus ? (
                  <Pill label={row.rewardStatus} pillKey={rewardKey(row.rewardStatus)} variant="reward" />
                ) : (
                  '—'
                )}
              </td>
              <td className="px-3 py-4 text-left text-[13px] font-semibold text-[#475467] md:text-sm">
                {formatDate(row.implementationDate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
