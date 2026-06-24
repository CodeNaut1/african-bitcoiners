import React from 'react'
import { cn } from '@/utilities/ui'

type Props = {
  isSuccess: boolean
  successMessage?: string
  errorMsg?: string
  children: React.ReactNode
  className?: string
}

export function FormShell({ isSuccess, successMessage = 'Thank you! Your submission has been received.', errorMsg, children, className }: Props) {
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-7 w-7 text-green-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <p className="font-semibold text-brand-secondary text-lg">{successMessage}</p>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col gap-5', className)}>
      {children}
      {errorMsg && (
        <p className="text-sm text-red-600 font-medium">{errorMsg}</p>
      )}
    </div>
  )
}
