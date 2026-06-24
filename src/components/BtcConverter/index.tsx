'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { ArrowLeftRight, RefreshCw } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { CURRENCIES, BTC_CURRENT_PRICE } from '@/blocks/InflationSimulator/data'

type Unit = 'BTC' | 'SATS' | 'USD' | string // string = currency code

const UNIT_OPTIONS: { value: Unit; label: string; group: string }[] = [
  { value: 'BTC', label: '₿ Bitcoin (BTC)', group: 'Bitcoin' },
  { value: 'SATS', label: '⚡ Satoshis (sats)', group: 'Bitcoin' },
  { value: 'USD', label: '🇺🇸 US Dollar (USD)', group: 'Fiat' },
  ...CURRENCIES.map((c) => ({ value: c.code, label: `${c.flag} ${c.code} — ${c.name}`, group: 'African' })),
]

function toUSD(amount: number, unit: Unit, btcPrice: number, rates: Record<string, number>): number {
  if (unit === 'BTC') return amount * btcPrice
  if (unit === 'SATS') return (amount / 100_000_000) * btcPrice
  if (unit === 'USD') return amount
  const rate = rates[unit]
  return rate ? amount / rate : 0
}

function fromUSD(usd: number, unit: Unit, btcPrice: number, rates: Record<string, number>): number {
  if (unit === 'BTC') return usd / btcPrice
  if (unit === 'SATS') return (usd / btcPrice) * 100_000_000
  if (unit === 'USD') return usd
  const rate = rates[unit]
  return rate ? usd * rate : 0
}

function fmt(n: number, unit: Unit): string {
  if (!isFinite(n) || isNaN(n)) return '—'
  if (unit === 'BTC') return n.toFixed(8)
  if (unit === 'SATS') return Math.round(n).toLocaleString()
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function BtcConverter() {
  const [amount, setAmount] = useState('100')
  const [fromUnit, setFromUnit] = useState<Unit>('USD')
  const [toUnit, setToUnit] = useState<Unit>('SATS')
  const [btcPrice, setBtcPrice] = useState(BTC_CURRENT_PRICE)
  const [lastUpdated, setLastUpdated] = useState('')
  const [fetching, setFetching] = useState(false)

  // Build a flat rates lookup: code → rate (local per 1 USD)
  const rates = useMemo(() => {
    const r: Record<string, number> = {}
    for (const c of CURRENCIES) {
      r[c.code] = c.rates[2024] ?? c.rates[2023] ?? 1
    }
    return r
  }, [])

  async function fetchBtcPrice() {
    setFetching(true)
    try {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
        { next: { revalidate: 0 } },
      )
      if (res.ok) {
        const data = await res.json()
        const price = data?.bitcoin?.usd
        if (price) {
          setBtcPrice(price)
          setLastUpdated(new Date().toLocaleTimeString())
        }
      }
    } catch {
      // Keep the hardcoded fallback silently
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    fetchBtcPrice()
  }, [])

  const numAmount = parseFloat(amount) || 0
  const usd = toUSD(numAmount, fromUnit, btcPrice, rates)
  const result = fromUSD(usd, toUnit, btcPrice, rates)

  function swap() {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
  }

  const fromCurrency = CURRENCIES.find((c) => c.code === fromUnit)
  const toCurrency = CURRENCIES.find((c) => c.code === toUnit)
  const fromSymbol = fromUnit === 'USD' ? '$' : fromUnit === 'BTC' ? '₿' : fromUnit === 'SATS' ? '⚡' : fromCurrency?.symbol ?? ''
  const toSymbol = toUnit === 'USD' ? '$' : toUnit === 'BTC' ? '₿' : toUnit === 'SATS' ? '⚡' : toCurrency?.symbol ?? ''

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-card border border-brand-border-light shadow-card p-6 md:p-8">
        {/* From */}
        <div className="mb-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-text-muted mb-2">From</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-muted text-sm font-semibold pointer-events-none">
                {fromSymbol}
              </span>
              <input
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-3 py-2.5 rounded-btn border border-brand-border-light text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-secondary"
              />
            </div>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-44 px-3 py-2.5 rounded-btn border border-brand-border-light text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-secondary bg-white"
            >
              {['Bitcoin', 'Fiat', 'African'].map((g) => (
                <optgroup key={g} label={g}>
                  {UNIT_OPTIONS.filter((o) => o.group === g).map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        {/* Swap button */}
        <div className="flex justify-center my-3">
          <button
            onClick={swap}
            className="p-2.5 rounded-full border border-brand-border-light hover:bg-brand-cream transition-colors text-brand-text-muted hover:text-brand-secondary"
            title="Swap"
          >
            <ArrowLeftRight size={16} />
          </button>
        </div>

        {/* To */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-text-muted mb-2">To</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-muted text-sm font-semibold pointer-events-none">
                {toSymbol}
              </span>
              <input
                readOnly
                value={numAmount === 0 ? '' : fmt(result, toUnit)}
                className="w-full pl-8 pr-3 py-2.5 rounded-btn border border-brand-border-light text-sm font-semibold bg-brand-cream text-brand-secondary cursor-default"
              />
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-44 px-3 py-2.5 rounded-btn border border-brand-border-light text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-secondary bg-white"
            >
              {['Bitcoin', 'Fiat', 'African'].map((g) => (
                <optgroup key={g} label={g}>
                  {UNIT_OPTIONS.filter((o) => o.group === g).map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        {/* BTC price bar */}
        <div className={cn('flex items-center justify-between text-xs text-brand-text-muted bg-brand-cream rounded-lg px-4 py-2.5')}>
          <span>₿ 1 BTC = <strong className="text-brand-secondary">${btcPrice.toLocaleString()}</strong></span>
          <button
            onClick={fetchBtcPrice}
            disabled={fetching}
            className="flex items-center gap-1.5 text-brand-primary font-semibold hover:underline disabled:opacity-50"
          >
            <RefreshCw size={12} className={cn(fetching && 'animate-spin')} />
            {lastUpdated ? `Updated ${lastUpdated}` : 'Refresh price'}
          </button>
        </div>

        <p className="text-xs text-brand-text-muted text-center mt-3">
          African currency rates are 2024 annual averages. BTC price fetched live from CoinGecko.
        </p>
      </div>

      {/* Quick reference */}
      {numAmount > 0 && (
        <div className="mt-4 bg-white rounded-card border border-brand-border-light p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-text-muted mb-3">Quick Reference</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {[
              { label: 'In BTC', value: fmt(fromUSD(usd, 'BTC', btcPrice, rates), 'BTC') },
              { label: 'In sats', value: fmt(fromUSD(usd, 'SATS', btcPrice, rates), 'SATS') },
              { label: 'In USD', value: `$${fmt(usd, 'USD')}` },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between bg-brand-cream rounded-lg px-3 py-2">
                <span className="text-brand-text-muted">{label}</span>
                <span className="font-semibold text-brand-secondary">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
