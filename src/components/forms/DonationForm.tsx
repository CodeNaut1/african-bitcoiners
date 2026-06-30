'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import QRCode from 'react-qr-code'
import { ABInput, ABTextarea } from '@/components/ui/ab-form-fields'
import { ABButton } from '@/components/ui/ab-button'
import { FormShell } from './FormShell'

const PRESET_AMOUNTS_SATS = [10_000, 50_000, 100_000, 500_000, 1_000_000]

const schema = z.object({
  sats: z.coerce.number().int().positive('Amount must be positive'),
  name: z.string().optional(),
  email: z.string().email('Valid email required').optional().or(z.literal('')),
  message: z.string().optional(),
  honey: z.string().max(0),
})
type Fields = z.infer<typeof schema>

type Stage =
  | { type: 'form' }
  | { type: 'invoice'; paymentRequest: string; paymentHash: string; satoshis: number }
  | { type: 'address'; address: string }
  | { type: 'paid' }

const POLL_INTERVAL_MS = 3000

export function DonationForm() {
  const [stage, setStage] = useState<Stage>({ type: 'form' })
  const [tab, setTab] = useState<'lightning' | 'onchain'>('lightning')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [copied, setCopied] = useState(false)
  const [addressLoading, setAddressLoading] = useState(false)

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { honey: '' },
  })

  // ── Polling ──────────────────────────────────────────────────────────────────

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current)
      pollRef.current = null
    }
  }, [])

  const startLnPolling = useCallback((paymentHash: string) => {
    stopPolling()
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/donation/check-status?paymentHash=${encodeURIComponent(paymentHash)}`)
        const { status } = await res.json()
        if (status === 'PAID') {
          stopPolling()
          setStage({ type: 'paid' })
        }
      } catch { /* keep polling */ }
    }, POLL_INTERVAL_MS)
  }, [stopPolling])

  const startOnchainPolling = useCallback((address: string) => {
    stopPolling()
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/donation/check-onchain?address=${encodeURIComponent(address)}`)
        const { status } = await res.json()
        if (status === 'PAID') {
          stopPolling()
          setStage({ type: 'paid' })
        }
      } catch { /* keep polling */ }
    }, POLL_INTERVAL_MS)
  }, [stopPolling])

  useEffect(() => () => stopPolling(), [stopPolling])

  // ── Submit ────────────────────────────────────────────────────────────────────

  async function onSubmit(data: Fields) {
    if (data.honey) return
    setIsLoading(true)
    setErrorMsg('')
    try {
      const res = await fetch('/api/donation/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sats: data.sats,
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      })
      const json = await res.json()
      if (!res.ok) {
        setErrorMsg(json.error ?? 'Failed to create invoice.')
        return
      }
      setStage({ type: 'invoice', paymentRequest: json.paymentRequest, paymentHash: json.paymentHash, satoshis: json.satoshis })
      startLnPolling(json.paymentHash)
    } catch {
      setErrorMsg('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // ── On-chain address generation ───────────────────────────────────────────────

  async function generateAddress() {
    setAddressLoading(true)
    try {
      const res = await fetch('/api/donation/create-address', { method: 'POST' })
      const json = await res.json()
      if (!res.ok) {
        setErrorMsg(json.error ?? 'Failed to generate address.')
        return
      }
      setStage({ type: 'address', address: json.address })
      startOnchainPolling(json.address)
    } catch {
      setErrorMsg('Network error. Please try again.')
    } finally {
      setAddressLoading(false)
    }
  }

  // ── Clipboard ─────────────────────────────────────────────────────────────────

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // ── Render: success ───────────────────────────────────────────────────────────

  if (stage.type === 'paid') {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <div className="text-4xl md:text-5xl">⚡</div>
        <h3 className="text-xl font-bold text-brand-secondary">Payment Received!</h3>
        <p className="text-brand-text-muted max-w-xs">
          Thank you for your Bitcoin donation to African Bitcoiners. Together we're building a
          Bitcoin-native Africa.
        </p>
        <ABButton variant="primary" size="sm" onClick={() => setStage({ type: 'form' })}>
          Donate Again
        </ABButton>
      </div>
    )
  }

  // ── Render: lightning invoice view ────────────────────────────────────────────

  if (stage.type === 'invoice' || stage.type === 'address') {
    const isLn = stage.type === 'invoice'
    const qrValue = isLn
      ? `lightning:${(stage as any).paymentRequest}`
      : `bitcoin:${(stage as any).address}`
    const rawValue = isLn ? (stage as any).paymentRequest : (stage as any).address

    return (
      <div className="flex flex-col gap-4">
        {errorMsg && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
            {errorMsg}
          </p>
        )}

        {/* Tabs */}
        <div className="flex rounded-lg overflow-hidden border border-brand-border-light">
          <button
            type="button"
            onClick={() => {
              setTab('lightning')
              if (stage.type === 'address') {
                stopPolling()
                setStage({ type: 'form' })
              }
            }}
            className={`flex-1 py-2 text-sm font-semibold transition-colors ${
              tab === 'lightning'
                ? 'bg-brand-secondary text-white'
                : 'bg-white text-brand-text-mid hover:bg-gray-50'
            }`}
          >
            ⚡ Lightning
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('onchain')
              if (stage.type === 'invoice') {
                stopPolling()
                setStage({ type: 'invoice', ...(stage as any) })
                generateAddress()
              }
            }}
            className={`flex-1 py-2 text-sm font-semibold transition-colors ${
              tab === 'onchain'
                ? 'bg-brand-secondary text-white'
                : 'bg-white text-brand-text-mid hover:bg-gray-50'
            }`}
          >
            ₿ On-chain
          </button>
        </div>

        {/* Lightning tab */}
        {tab === 'lightning' && stage.type === 'invoice' && (
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-brand-text-muted text-center">
              Scan with any Lightning wallet to pay{' '}
              <strong className="text-brand-text-dark">
                {stage.satoshis.toLocaleString()} sats
              </strong>
            </p>
            <div className="p-4 bg-white border border-brand-border-light rounded-lg shadow-card">
              <QRCode value={qrValue} size={220} />
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(rawValue)}
              className="text-xs text-brand-text-muted underline hover:text-brand-primary"
            >
              {copied ? '✓ Copied!' : 'Copy payment request'}
            </button>
            <p className="text-xs text-brand-text-muted animate-pulse text-center">
              Waiting for payment…
            </p>
          </div>
        )}

        {/* On-chain tab */}
        {tab === 'onchain' && (
          <div className="flex flex-col items-center gap-4">
            {addressLoading ? (
              <p className="text-sm text-brand-text-muted animate-pulse py-8">
                Generating address…
              </p>
            ) : stage.type === 'address' ? (
              <>
                <p className="text-sm text-brand-text-muted text-center">
                  Send any amount of BTC to this address
                </p>
                <div className="p-4 bg-white border border-brand-border-light rounded-lg shadow-card">
                  <QRCode value={qrValue} size={220} />
                </div>
                <p className="font-mono text-xs text-brand-text-dark break-all text-center max-w-xs">
                  {stage.address}
                </p>
                <button
                  type="button"
                  onClick={() => copyToClipboard(rawValue)}
                  className="text-xs text-brand-text-muted underline hover:text-brand-primary"
                >
                  {copied ? '✓ Copied!' : 'Copy address'}
                </button>
                <p className="text-xs text-brand-text-muted animate-pulse text-center">
                  Waiting for on-chain payment… (may take a few minutes)
                </p>
              </>
            ) : (
              <ABButton
                type="button"
                variant="secondary"
                size="sm"
                onClick={generateAddress}
                disabled={addressLoading}
              >
                Generate On-chain Address
              </ABButton>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={() => { stopPolling(); setStage({ type: 'form' }); setTab('lightning') }}
          className="text-xs text-brand-text-muted underline hover:text-brand-primary text-center mt-1"
        >
          ← Start over
        </button>
      </div>
    )
  }

  // ── Render: form ──────────────────────────────────────────────────────────────

  return (
    <FormShell isSuccess={false} successMessage="" errorMsg={errorMsg}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        <input {...register('honey')} type="text" name="honey" className="hidden" tabIndex={-1} aria-hidden />

        <div>
          <p className="text-sm font-medium text-brand-text-dark mb-2">
            Quick amounts (sats)
          </p>
          <div className="flex flex-wrap gap-2">
            {PRESET_AMOUNTS_SATS.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setValue('sats', a)}
                className="px-3 py-1.5 text-xs font-semibold rounded-full border border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white transition-colors"
              >
                {a.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <ABInput
          label="Amount (sats)"
          type="number"
          placeholder="e.g. 100000"
          error={errors.sats?.message}
          {...register('sats')}
        />
        <ABInput
          label="Your Name (optional)"
          placeholder="Amara"
          error={errors.name?.message}
          {...register('name')}
        />
        <ABInput
          label="Email (optional)"
          type="email"
          placeholder="amara@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <ABTextarea
          label="Message (optional)"
          rows={3}
          placeholder="A note with your donation…"
          {...register('message')}
        />

        <ABButton type="submit" variant="primary" size="md" disabled={isLoading} className="self-start">
          {isLoading ? 'Creating Invoice…' : '⚡ Donate Bitcoin'}
        </ABButton>
      </form>
    </FormShell>
  )
}
