import Link from 'next/link'
import React from 'react'

import { PLATFORMS, type Platform } from '@/components/BuyBitcoinPrivatelyPage/data'

const LINK = '#FD5A47'
const HEADING = '#384958'

function StatusIcon({ value }: { value: boolean }) {
  if (value) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="10" stroke="#009A67" strokeWidth="2" />
        <path d="M8 12.5l2.5 2.5L16 9.5" stroke="#009A67" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="#EB0000" strokeWidth="2" />
      <path d="M9 9l6 6M15 9l-6 6" stroke="#EB0000" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function FeatureBadge({ label, value }: { label: string; value: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium"
      style={{
        borderColor: value ? '#009A6744' : '#EB000044',
        backgroundColor: value ? '#009A6710' : '#EB000010',
        color: HEADING,
      }}
    >
      <StatusIcon value={value} />
      {label}
    </span>
  )
}

function PlatformCard({ platform }: { platform: Platform }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-black/10 bg-white p-5 shadow-sm">
      <h3 className="font-heading text-xl font-bold tracking-[-0.4px]" style={{ color: LINK }}>
        <a href={platform.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {platform.name}
        </a>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: HEADING }}>
        {platform.about}
      </p>
      <dl className="mt-4 space-y-2 text-sm" style={{ color: HEADING }}>
        <div className="flex justify-between gap-3 border-t border-black/5 pt-3">
          <dt className="font-semibold">Device</dt>
          <dd className="text-right">{platform.device}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="font-semibold">OS</dt>
          <dd className="max-w-[60%] text-right">{platform.os}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="font-semibold">Fees</dt>
          <dd className="max-w-[60%] text-right">{platform.fees}</dd>
        </div>
      </dl>
      <div className="mt-4 flex flex-wrap gap-2">
        <FeatureBadge label="Bitcoin only" value={platform.bitcoinOnly} />
        <FeatureBadge label="Lightning" value={platform.lightning} />
      </div>
      <a
        href={platform.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-block rounded border px-5 py-2.5 text-center text-sm font-bold transition-colors hover:bg-[#F27202] hover:text-white"
        style={{ borderColor: '#F27202', color: '#F27202' }}
      >
        Visit platform
      </a>
    </article>
  )
}

export function PlatformCards() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {PLATFORMS.map((platform) => (
        <PlatformCard key={platform.href} platform={platform} />
      ))}
    </div>
  )
}


export function PlatformTableCompactLink() {
  return (
    <p className="mt-6 text-center text-sm text-[#584538]">
      Need a wallet after you buy?{' '}
      <Link href="/save-bitcoin/recommended-bitcoin-and-lightning-wallets" className="font-semibold underline" style={{ color: LINK }}>
        See our recommended wallets
      </Link>
    </p>
  )
}
