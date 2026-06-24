'use client'

import React, { useState } from 'react'
import { ABButton } from '@/components/ui/ab-button'
import { ABInput } from '@/components/ui/ab-form-fields'

const COUNTRIES = [
  'Nigeria', 'Kenya', 'South Africa', 'Ghana', 'Ethiopia', 'Tanzania', 'Uganda', 'Rwanda',
  'Cameroon', 'Senegal', 'Côte d\'Ivoire', 'Zambia', 'Zimbabwe', 'Mozambique', 'Angola',
  'Sudan', 'Egypt', 'Morocco', 'Tunisia', 'Algeria', 'Other',
]

export function NewsletterSignupSidebar() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, country }),
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
    <div className="bg-brand-secondary rounded-card p-5">
      <h3 className="text-base font-bold text-white mb-1">Get our Weekly African Bitcoin Update</h3>
      <p className="text-xs text-white/70 mb-4">Join thousands of Africans on their Bitcoin journey.</p>

      {status === 'success' ? (
        <p className="text-sm font-semibold text-brand-primary bg-white rounded-lg px-4 py-3">
          You're subscribed! Check your inbox.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <ABInput
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white text-sm py-2"
          />
          <ABInput
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white text-sm py-2"
          />
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white"
          >
            <option value="" className="text-brand-text-dark bg-white">Select your country</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c} className="text-brand-text-dark bg-white">{c}</option>
            ))}
          </select>
          <ABButton
            type="submit"
            variant="primary"
            size="sm"
            disabled={status === 'loading'}
            className="w-full justify-center mt-1"
          >
            {status === 'loading' ? 'Subscribing…' : 'Subscribe Free'}
          </ABButton>
          {status === 'error' && (
            <p className="text-xs text-red-300">{errorMsg}</p>
          )}
        </form>
      )}
    </div>
  )
}
