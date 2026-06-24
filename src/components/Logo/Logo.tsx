import { cn } from '@/utilities/ui'
import React from 'react'

interface Props {
  className?: string
  /** Render only the circular mark without the wordmark text (fallback only — has no effect when src is provided) */
  markOnly?: boolean
  /** Logo image URL from SiteSettings — when provided, renders an <img> instead of the placeholder */
  src?: string | null
}

export const Logo = ({ className, markOnly = false, src }: Props) => {
  if (src) {
    return (
      <div className={cn('flex items-center select-none', className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt="African Bitcoiners"
          className="h-[52px] w-auto object-contain"
        />
      </div>
    )
  }

  return (
    <div className={cn('flex items-center gap-2.5 select-none', className)}>
      <div className="h-[60px] w-[60px] shrink-0 rounded-full bg-brand-primary flex items-center justify-center">
        <span className="text-white font-black text-xl leading-none tracking-tight">AB</span>
      </div>
      {!markOnly && (
        <div className="flex flex-col leading-none">
          <span className="font-black text-brand-secondary text-sm uppercase tracking-widest">
            African
          </span>
          <span className="font-black text-brand-primary text-sm uppercase tracking-widest">
            Bitcoiners
          </span>
        </div>
      )}
    </div>
  )
}
