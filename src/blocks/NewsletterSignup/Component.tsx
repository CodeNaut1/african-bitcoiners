'use client'

import React, { useState } from 'react'

import { cn } from '@/utilities/ui'
import { ABButton } from '@/components/ui/ab-button'
import { ABInput } from '@/components/ui/ab-form-fields'

type Props = {
  heading?: string
  subheading?: string
  buttonLabel?: string
  backgroundColor?: 'dark' | 'orange' | 'cream' | 'white'
  successMessage?: string
}

const styleMap: Record<string, { section: string; heading: string; sub: string }> = {
  dark: {
    section: 'bg-brand-secondary',
    heading: 'text-white',
    sub: 'text-white/80',
  },
  orange: {
    section: 'bg-brand-primary',
    heading: 'text-white',
    sub: 'text-white/85',
  },
  cream: {
    section: 'bg-brand-cream',
    heading: 'text-brand-secondary',
    sub: 'text-brand-text-mid',
  },
  white: {
    section: 'bg-white border-y border-brand-border-light',
    heading: 'text-brand-secondary',
    sub: 'text-brand-text-mid',
  },
}

export function NewsletterSignupBlockComponent({
  heading = 'Subscribe to the Bitcoin Newsletter',
  subheading = 'Weekly updates on Bitcoin adoption across Africa.',
  buttonLabel = 'Subscribe Free',
  backgroundColor = 'dark',
  successMessage = "You're subscribed! Check your inbox.",
}: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const styles = styleMap[backgroundColor] ?? styleMap.dark
  const isDark = backgroundColor === 'dark' || backgroundColor === 'orange'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || 'Subscription failed')
      }

      setStatus('success')
    } catch (err: any) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <section className={cn('py-16', styles.section)}>
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h2 className={cn('text-2xl md:text-3xl font-bold mb-3', styles.heading)}>{heading}</h2>
        {subheading && (
          <p className={cn('text-sm md:text-base leading-relaxed mb-8', styles.sub)}>{subheading}</p>
        )}

        {status === 'success' ? (
          <p className={cn('font-semibold text-lg', isDark ? 'text-white' : 'text-brand-primary')}>
            {successMessage}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <ABInput
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={cn(
                'flex-1',
                isDark ? 'bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-white' : '',
              )}
            />
            <ABButton type="submit" variant={isDark ? 'white' : 'primary'} disabled={status === 'loading'}>
              {status === 'loading' ? 'Subscribing…' : buttonLabel}
            </ABButton>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-3 text-sm text-red-300">{errorMsg}</p>
        )}
      </div>
    </section>
  )
}
