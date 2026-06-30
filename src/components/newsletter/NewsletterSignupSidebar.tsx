'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import { AFRICAN_COUNTRIES } from '@/components/forms/africanCountries'
import { handleNewsletterSubscribeResponse } from '@/lib/form-submit-client'

const fieldClass =
  'w-full rounded border border-[#38495833] bg-white px-3 py-3 font-sans text-base text-[#384958] placeholder:text-[#384958]/40 outline-none transition-colors focus:border-brand-primary'

export function NewsletterSignupSidebar() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [successHeading, setSuccessHeading] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !country) return
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, country }),
      })
      await handleNewsletterSubscribeResponse(res, router, (heading) => {
        setSuccessHeading(heading)
        setStatus('success')
      })
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="bg-white p-8">
      <h2 className="mb-5 text-[1.7rem] font-bold leading-tight text-[#334155]">
        Get our Weekly African Bitcoin Update.
      </h2>

      {status === 'success' ? (
        <p className="font-sans text-sm font-semibold text-brand-text-dark">
          {successHeading || "You're subscribed! Check your inbox."}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block font-sans text-sm font-bold text-[#384958]">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (or Nym)"
              className={fieldClass}
            />
          </div>

          <div>
            <label className="mb-1 block font-sans text-sm font-bold text-[#384958]">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className={fieldClass}
            />
          </div>

          <div>
            <label className="mb-1 block font-sans text-sm font-bold text-[#384958]">
              What African Country are you from? <span className="text-red-600">*</span>
            </label>
            <select
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={`${fieldClass} cursor-pointer`}
            >
              <option value="">Select a Country/Continent</option>
              {AFRICAN_COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="mt-1 w-full rounded-lg bg-[#f27202] px-4 py-3 font-sans text-[15px] font-bold text-white shadow-[1px_4px_8px_rgba(0,0,0,0.2)] transition-colors hover:bg-[#dd8512] disabled:opacity-60"
          >
            {status === 'loading' ? 'Subscribing…' : 'Sign me up!'}
          </button>

          {status === 'error' && <p className="text-xs text-red-600">{errorMsg}</p>}
        </form>
      )}
    </div>
  )
}
