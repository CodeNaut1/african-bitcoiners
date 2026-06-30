'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/utilities/ui'
import { BTC_ADDRESS } from '@/components/SupportUsPage/data'

type Props = {
  className?: string
}

export function CopyBtcAddressButton({ className }: Props) {
  const [copied, setCopied] = useState(false)

  function copyAddress() {
    navigator.clipboard.writeText(BTC_ADDRESS).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      type="button"
      onClick={copyAddress}
      title={BTC_ADDRESS}
      className={cn(
        'inline-flex items-center gap-2 rounded-full bg-brand-primary px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-brand-primary/90',
        className,
      )}
    >
      {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
      <span>{copied ? 'Copied!' : 'Copy BTC address'}</span>
    </button>
  )
}
