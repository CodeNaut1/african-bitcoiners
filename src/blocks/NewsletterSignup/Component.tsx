'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import { cn } from '@/utilities/ui'
import { ABButton } from '@/components/ui/ab-button'
import { ABInput, ABSelect } from '@/components/ui/ab-form-fields'
import { AFRICAN_COUNTRIES } from '@/components/forms/africanCountries'
import { handleNewsletterSubscribeResponse } from '@/lib/form-submit-client'

const SIGNUP_BG_URL =
  'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2026/05/Signup-bg.png'

type Props = {
  heading?: string
  subheading?: string
  buttonLabel?: string
  backgroundColor?: 'dark' | 'orange' | 'cream' | 'white'
  successMessage?: string
  isHome?: boolean
}

const styleMap: Record<string, { section: string; heading: string; sub: string }> = {
  dark: {
    section: 'bg-[#253343]',
    heading: 'text-white',
    sub: 'text-white/70',
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
  isHome,
}: Props) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [inlineSuccess, setInlineSuccess] = useState('')

  const styles = styleMap[backgroundColor] ?? styleMap.dark
  const isDark = backgroundColor === 'dark' || backgroundColor === 'orange'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !name || !country) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, country }),
      })

      await handleNewsletterSubscribeResponse(res, router, (heading) => {
        setInlineSuccess(heading)
        setStatus('success')
      })
    } catch (err: any) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
    }
  }

  if (isHome) {
    return (
      <section
        className="relative bg-[#253343] bg-cover bg-center bg-no-repeat py-16 md:py-24"
        style={{ backgroundImage: `url(${SIGNUP_BG_URL})` }}
      >
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="mb-4 font-[family-name:var(--font-instrument-serif)] text-3xl font-normal text-white sm:text-4xl md:text-5xl lg:text-6xl">{heading}</h2>
          {subheading && (
            <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              {subheading}
            </p>
          )}

          {status === 'success' ? (
            <p className="text-lg font-semibold text-white">{inlineSuccess || successMessage}</p>
          ) : (
            <div className="mx-auto max-w-xl rounded-2xl bg-[#ECECEC] p-6 shadow-elevated md:p-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                <ABInput
                  type="text"
                  label="Name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <ABInput
                  type="email"
                  label="Email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <ABSelect
                  label="What African Country are you from?"
                  placeholder="Select a Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  options={AFRICAN_COUNTRIES.map((c) => ({ value: c, label: c }))}
                />
                <ABButton
                  type="submit"
                  variant="primary"
                  disabled={status === 'loading'}
                  className="mx-auto mt-2 w-full max-w-xs bg-brand-primary hover:bg-brand-primary/90 sm:w-1/2"
                >
                  {status === 'loading' ? 'Submitting…' : buttonLabel}
                </ABButton>
              </form>
              {status === 'error' && <p className="mt-3 text-left text-sm text-red-600">{errorMsg}</p>}
            </div>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className={cn('py-16', styles.section)}>
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h2 className={cn('mb-3 font-heading text-2xl font-normal md:text-3xl', styles.heading)}>{heading}</h2>
        {subheading && (
          <p className={cn('mb-8 text-sm leading-relaxed md:text-base', styles.sub)}>{subheading}</p>
        )}

        {status === 'success' ? (
          <p className={cn('text-lg font-semibold', isDark ? 'text-white' : 'text-brand-primary')}>
            {inlineSuccess || successMessage}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <ABInput
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={cn(
                'flex-1',
                isDark ? 'border-white/30 bg-white/10 text-white placeholder:text-white/50 focus:border-white' : '',
              )}
            />
            <ABButton type="submit" variant={isDark ? 'white' : 'primary'} disabled={status === 'loading'}>
              {status === 'loading' ? 'Subscribing…' : buttonLabel}
            </ABButton>
          </form>
        )}

        {status === 'error' && <p className="mt-3 text-sm text-red-300">{errorMsg}</p>}
      </div>
    </section>
  )
}
