'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import QRCode from 'react-qr-code'

const BROWN = '#584538'
const ORANGE = '#FF1900'
const NAVY = '#253343'
const POLL_INTERVAL_MS = 3000

type Currency = 'SATS' | 'USD' | 'BTC'

type Step = 1 | 2

type InvoiceStage = {
  paymentRequest: string
  paymentHash: string
  satoshis: number
}

function toSats(amount: number, currency: Currency): number {
  if (!amount || amount <= 0) return 0
  if (currency === 'SATS') return Math.round(amount)
  if (currency === 'BTC') return Math.round(amount * 100_000_000)
  // Rough USD → sats estimate at ~$100k BTC
  return Math.round(amount * 1000)
}

const labelClass = 'text-[18px] font-normal tracking-[-0.6px]'
const fieldClass =
  'w-full rounded-md border border-[#d4d4d4] bg-white px-3 py-2.5 text-sm text-[#2F2614] focus:border-[#FD5A47] focus:outline-none'

export function SupportUsLightningForm() {
  const [step, setStep] = useState<Step>(1)
  const [currency, setCurrency] = useState<Currency>('SATS')
  const [amount, setAmount] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [invoice, setInvoice] = useState<InvoiceStage | null>(null)
  const [paid, setPaid] = useState(false)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const numericAmount = parseFloat(amount) || 0
  const canProceed = numericAmount > 0

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current)
      pollRef.current = null
    }
  }, [])

  const startLnPolling = useCallback(
    (paymentHash: string) => {
      stopPolling()
      pollRef.current = setInterval(async () => {
        try {
          const res = await fetch(
            `/api/donation/check-status?paymentHash=${encodeURIComponent(paymentHash)}`,
          )
          const { status } = await res.json()
          if (status === 'PAID') {
            stopPolling()
            setPaid(true)
          }
        } catch {
          /* keep polling */
        }
      }, POLL_INTERVAL_MS)
    },
    [stopPolling],
  )

  useEffect(() => () => stopPolling(), [stopPolling])

  async function handleDonate() {
    const sats = toSats(numericAmount, currency)
    if (sats < 1) {
      setErrorMsg('Please enter a valid amount.')
      return
    }

    setIsLoading(true)
    setErrorMsg('')
    try {
      const res = await fetch('/api/donation/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sats,
          name: name || undefined,
          email: email || undefined,
          message: message || undefined,
        }),
      })
      const json = await res.json()
      if (!res.ok) {
        setErrorMsg(json.error ?? 'Failed to create invoice.')
        return
      }
      setInvoice({
        paymentRequest: json.paymentRequest,
        paymentHash: json.paymentHash,
        satoshis: json.satoshis,
      })
      startLnPolling(json.paymentHash)
    } catch {
      setErrorMsg('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (paid) {
    return (
      <div className="py-6 text-center">
        <p className="font-heading text-xl font-bold text-[#253343]">Payment Received!</p>
        <p className="mt-2 text-sm text-[#667085]">Thank you for your donation.</p>
        <button
          type="button"
          onClick={() => {
            setPaid(false)
            setInvoice(null)
            setStep(1)
            setAmount('')
            setName('')
            setEmail('')
            setMessage('')
          }}
          className="mt-4 text-sm text-[#FD5A47] underline"
        >
          Donate again
        </button>
      </div>
    )
  }

  if (invoice) {
    return (
      <div className="flex flex-col items-center gap-4 py-2">
        {errorMsg && (
          <p className="w-full rounded-md border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
            {errorMsg}
          </p>
        )}
        <p className="text-center text-sm text-[#667085]">
          Scan with any Lightning wallet to pay{' '}
          <strong className="text-[#2F2614]">{invoice.satoshis.toLocaleString()} sats</strong>
        </p>
        <div className="rounded-lg border border-[#EAECF0] bg-white p-4 shadow-sm">
          <QRCode value={`lightning:${invoice.paymentRequest}`} size={200} />
        </div>
        <p className="animate-pulse text-xs text-[#667085]">Waiting for payment…</p>
        <button
          type="button"
          onClick={() => {
            stopPolling()
            setInvoice(null)
            setStep(2)
          }}
          className="text-xs text-[#667085] underline hover:text-[#FD5A47]"
        >
          ← Back
        </button>
      </div>
    )
  }

  return (
    <div className="w-full px-5 md:px-10">
      {errorMsg && (
        <p className="mb-3 rounded-md border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
          {errorMsg}
        </p>
      )}

      {step === 1 ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="donation-currency" className={labelClass} style={{ color: BROWN }}>
              Select Currency
            </label>
            <select
              id="donation-currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className={fieldClass}
            >
              <option value="SATS">SATS</option>
              <option value="USD">USD</option>
              <option value="BTC">BTC</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="donation-amount" className={labelClass} style={{ color: BROWN }}>
              Enter Amount:
            </label>
            <input
              id="donation-amount"
              type="number"
              min="0"
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={fieldClass}
            />
          </div>

          <button
            type="button"
            disabled={!canProceed}
            onClick={() => setStep(2)}
            className="mt-1 w-full rounded-md px-5 py-[15px] text-[17px] font-semibold tracking-[-0.4px] text-white transition-colors disabled:cursor-not-allowed disabled:bg-gray-400"
            style={{ backgroundColor: canProceed ? ORANGE : undefined }}
            onMouseEnter={(e) => {
              if (canProceed) e.currentTarget.style.backgroundColor = NAVY
            }}
            onMouseLeave={(e) => {
              if (canProceed) e.currentTarget.style.backgroundColor = ORANGE
            }}
          >
            Proceed
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div
            className="border-b pb-3 text-[15px] font-normal tracking-[-0.6px]"
            style={{ borderColor: 'rgba(88, 69, 56, 0.3)', color: BROWN }}
          >
            Before you proceed, please drop your details. This is to enable us reach out to thank
            you.
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="donation-name" className={labelClass} style={{ color: BROWN }}>
              Name (optional)
            </label>
            <input
              id="donation-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={fieldClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="donation-email" className={labelClass} style={{ color: BROWN }}>
              Email (optional)
            </label>
            <input
              id="donation-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="donation-message" className={labelClass} style={{ color: BROWN }}>
              Message (optional)
            </label>
            <textarea
              id="donation-message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${fieldClass} min-h-[80px] resize-y`}
            />
          </div>

          <div className="mt-1 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleDonate}
              disabled={isLoading}
              className="w-full rounded-md px-5 py-[15px] text-[17px] font-extrabold tracking-[-0.6px] text-white transition-colors"
              style={{ backgroundColor: ORANGE }}
              onMouseEnter={(e) => {
                if (!isLoading) e.currentTarget.style.backgroundColor = NAVY
              }}
              onMouseLeave={(e) => {
                if (!isLoading) e.currentTarget.style.backgroundColor = ORANGE
              }}
            >
              {isLoading ? 'Creating Invoice…' : 'Donate'}
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full rounded-md px-5 py-[15px] text-[17px] font-semibold tracking-[-0.4px] text-white transition-colors"
              style={{ backgroundColor: ORANGE }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = NAVY
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = ORANGE
              }}
            >
              Previous
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
