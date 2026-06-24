import React from 'react'

export function LanguageSwitcher({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-brand-secondary ${className ?? ''}`}>
      <span>🇬🇧</span>
      <span>English</span>
    </div>
  )
}
