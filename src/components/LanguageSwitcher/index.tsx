'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'

import { cn } from '@/utilities/ui'

type Language = {
  code: string
  label: string
  flag: string
}

const LANGUAGES: Language[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'French', flag: '🇫🇷' },
  { code: 'pt', label: 'Portuguese', flag: '🇵🇹' },
  { code: 'ha', label: 'Hausa', flag: '🇳🇬' },
  { code: 'ig', label: 'Igbo', flag: '🇳🇬' },
  { code: 'yo', label: 'Yoruba', flag: '🇳🇬' },
  { code: 'sw', label: 'Swahili', flag: '🇰🇪' },
  { code: 'xh', label: 'Xhosa', flag: '🇿🇦' },
  { code: 'af', label: 'Afrikaans', flag: '🇿🇦' },
  { code: 'zu', label: 'Zulu', flag: '🇿🇦' },
]

const COOKIE_NAME = 'preferred_language'

function readLanguageCookie(): string {
  if (typeof document === 'undefined') return 'en'
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : 'en'
}

function writeLanguageCookie(code: string) {
  // 1 year expiry, site-wide
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(code)}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
}

export function LanguageSwitcher({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState<Language>(LANGUAGES[0])
  const containerRef = useRef<HTMLDivElement>(null)

  // Hydrate selection from cookie on mount
  useEffect(() => {
    const code = readLanguageCookie()
    const found = LANGUAGES.find((l) => l.code === code)
    if (found) setCurrent(found)
  }, [])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function onClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  function selectLanguage(lang: Language) {
    setCurrent(lang)
    writeLanguageCookie(lang.code)
    setOpen(false)
  }

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-brand-secondary transition-colors hover:text-brand-primary"
      >
        <span aria-hidden="true">{current.flag}</span>
        <span>{current.label}</span>
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', open && 'rotate-180')} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-1 min-w-[180px] overflow-hidden rounded-card border border-brand-border-light bg-white py-1 shadow-elevated"
        >
          {LANGUAGES.map((lang) => {
            const selected = lang.code === current.code
            return (
              <li key={lang.code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => selectLanguage(lang)}
                  className={cn(
                    'flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors hover:bg-brand-cream',
                    selected ? 'font-semibold text-brand-primary' : 'text-brand-text-mid',
                  )}
                >
                  <span aria-hidden="true">{lang.flag}</span>
                  <span className="flex-1">{lang.label}</span>
                  {selected && <Check className="h-3.5 w-3.5 shrink-0" />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
