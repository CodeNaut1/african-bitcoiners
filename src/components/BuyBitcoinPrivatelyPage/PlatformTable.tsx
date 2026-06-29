import Link from 'next/link'
import React from 'react'

import { PLATFORMS, TABLE_COLUMNS } from '@/components/BuyBitcoinPrivatelyPage/data'

const LINK = '#FD5A47'

function StatusIcon({ value }: { value: boolean }) {
  if (value) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-label="Yes" className="mx-auto">
        <circle cx="12" cy="12" r="10" stroke="#009A67" strokeWidth="2" />
        <path d="M8 12.5l2.5 2.5L16 9.5" stroke="#009A67" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-label="No" className="mx-auto">
      <circle cx="12" cy="12" r="10" stroke="#EB0000" strokeWidth="2" />
      <path d="M9 9l6 6M15 9l-6 6" stroke="#EB0000" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function PlatformTable() {
  return (
    <div className="hidden lg:block">
      <div className="overflow-x-auto rounded-xl border border-black/10 bg-white shadow-sm">
        <table className="w-full min-w-[960px] border-collapse text-left">
          <thead>
            <tr className="bg-[#FFF3DD]">
              {TABLE_COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className="border-b border-black/10 px-4 py-4 text-xs font-bold uppercase tracking-wide text-[#652A00]"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PLATFORMS.map((platform, index) => (
              <tr
                key={platform.href}
                className={`text-[13px] leading-[22px] text-[#384958] ${index % 2 === 0 ? 'bg-white' : 'bg-[#FFFCFA]'}`}
              >
                <td className="border-b border-black/5 px-4 py-4 align-top">
                  <Link
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] font-extrabold underline transition-colors hover:text-[#652A00]"
                    style={{ color: LINK }}
                  >
                    {platform.name}
                  </Link>
                </td>
                <td className="max-w-[220px] border-b border-black/5 px-4 py-4 align-top">{platform.about}</td>
                <td className="border-b border-black/5 px-4 py-4 align-top">{platform.device}</td>
                <td className="border-b border-black/5 px-4 py-4 align-top whitespace-pre-line">{platform.os}</td>
                <td className="border-b border-black/5 px-4 py-4 align-top">{platform.fees}</td>
                <td className="border-b border-black/5 px-4 py-4 align-middle">
                  <StatusIcon value={platform.bitcoinOnly} />
                </td>
                <td className="border-b border-black/5 px-4 py-4 align-middle">
                  <StatusIcon value={platform.lightning} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
