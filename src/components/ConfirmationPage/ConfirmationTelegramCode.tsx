'use client'

import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'

type Props = {
  code: string
  isFrench?: boolean
}

export function ConfirmationTelegramCode({ code, isFrench = false }: Props) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="mt-8 w-full max-w-lg text-left">
      <p className="mb-3 text-sm font-semibold text-brand-secondary">
        {isFrench ? 'Votre code de cours unique :' : 'Your unique course code:'}
      </p>
      <div className="flex items-center gap-3 rounded-lg border border-dashed border-brand-border-light bg-[#FFF9F5] px-4 py-4">
        <code className="flex-1 font-mono text-2xl font-bold tracking-[0.2em] text-brand-secondary sm:text-3xl">
          {code}
        </code>
        <button
          type="button"
          onClick={() => void handleCopy()}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-brand-border-light bg-white px-3 py-2 text-xs font-semibold text-brand-secondary transition-colors hover:bg-brand-cream"
          aria-label={isFrench ? 'Copier le code' : 'Copy code'}
        >
          {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
          {copied ? (isFrench ? 'Copié' : 'Copied') : isFrench ? 'Copier' : 'Copy'}
        </button>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-brand-text-muted">
        {isFrench
          ? 'Enregistrez ce code. Vous en aurez besoin pour accéder au cours sur Telegram.'
          : 'Save this code. You will need it to access the course on Telegram.'}
      </p>
    </div>
  )
}
