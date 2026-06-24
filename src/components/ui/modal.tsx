'use client'

import { cn } from '@/utilities/ui'
import { X } from 'lucide-react'
import * as React from 'react'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
  /** 'dropdown' slides down from the trigger; 'centered' is a centered dialog */
  variant?: 'dropdown' | 'centered'
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  variant = 'centered',
}) => {
  // Close on Escape key
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Prevent body scroll while open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'fixed z-50 bg-white rounded-section shadow-elevated',
          variant === 'centered' &&
            'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg animate-in fade-in zoom-in-95 duration-200',
          variant === 'dropdown' &&
            'left-1/2 top-24 -translate-x-1/2 w-full max-w-lg animate-in fade-in slide-in-from-top-4 duration-200',
          className,
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-brand-border-light">
          {title && <h2 className="text-brand-secondary font-bold text-xl">{title}</h2>}
          <button
            onClick={onClose}
            className="ml-auto p-1 rounded-md text-brand-text-muted hover:text-brand-secondary hover:bg-brand-border-light transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </>
  )
}

export interface UseModalReturn {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

function useModal(initialOpen = false): UseModalReturn {
  const [isOpen, setIsOpen] = React.useState(initialOpen)
  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((prev) => !prev),
  }
}

export { Modal, useModal }
