'use client'

import React, { useEffect } from 'react'
import { X } from 'lucide-react'

type Props = {
  imageDataUrl: string
  pageUrl: string
  onClose: () => void
  onDownload: () => void
}

export function ShareModal({ imageDataUrl, pageUrl, onClose, onDownload }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const shareText = `Check out this Bitcoin Inflation Simulator result! ${pageUrl}`

  const socialLinks = [
    {
      label: 'X (Twitter)',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      className: 'bg-black text-white hover:bg-neutral-800',
      icon: '𝕏',
    },
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent(shareText)}`,
      className: 'bg-[#0A66C2] text-white hover:bg-[#004182]',
      icon: 'in',
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      className: 'bg-[#25D366] text-white hover:bg-[#1da851]',
      icon: 'WA',
    },
    {
      label: 'Instagram',
      href: `https://www.instagram.com/share?url=${encodeURIComponent(pageUrl)}`,
      className: 'bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white',
      icon: 'IG',
    },
  ]

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Share simulator result"
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-brand-text-muted hover:bg-brand-cream hover:text-brand-secondary"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <p className="mb-4 text-center text-sm font-bold uppercase tracking-wider text-brand-text-muted">
          Share On
        </p>

        <img
          src={imageDataUrl}
          alt="Bitcoin inflation simulator result"
          className="mb-5 w-full rounded-lg border border-brand-border-light"
        />

        <div className="mb-5 flex flex-wrap justify-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex h-10 min-w-[2.5rem] items-center justify-center rounded-full px-3 text-xs font-bold transition-colors ${link.className}`}
              aria-label={`Share on ${link.label}`}
            >
              {link.icon}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={onDownload}
          className="w-full rounded-lg bg-[#FF5A4E] px-6 py-3 text-sm font-bold text-white shadow transition-colors hover:bg-[#E6453A]"
        >
          Download
        </button>
      </div>
    </div>
  )
}
