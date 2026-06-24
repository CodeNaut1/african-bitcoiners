'use client'

import { X, Search } from 'lucide-react'
import * as React from 'react'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handler)
      document.body.style.overflow = 'hidden'
      // Autofocus the input
      setTimeout(() => inputRef.current?.focus(), 50)
    }
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-brand-secondary/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Search panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="fixed left-0 right-0 top-0 z-50 bg-white px-4 py-6 shadow-elevated animate-in slide-in-from-top duration-200"
      >
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 border-b-2 border-brand-primary pb-3">
            <Search className="h-5 w-5 shrink-0 text-brand-primary" />
            <input
              ref={inputRef}
              type="search"
              placeholder="Search African Bitcoiners…"
              className="flex-1 bg-transparent text-lg text-brand-text-dark placeholder:text-brand-text-muted outline-none"
              // Search logic wired in a later step
            />
            <button
              onClick={onClose}
              aria-label="Close search"
              className="p-1 text-brand-text-muted hover:text-brand-secondary transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-4 text-sm text-brand-text-muted">
            Press <kbd className="rounded bg-brand-border-light px-1.5 py-0.5 text-xs font-mono">Esc</kbd> to close
          </p>
        </div>
      </div>
    </>
  )
}
