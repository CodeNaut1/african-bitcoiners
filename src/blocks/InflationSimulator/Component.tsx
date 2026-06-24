'use client'

import React, { useState, useMemo } from 'react'
import { TrendingDown, TrendingUp, Calculator } from 'lucide-react'

import { cn } from '@/utilities/ui'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { ABButton } from '@/components/ui/ab-button'
import { CURRENCIES, BTC_PRICES, BTC_CURRENT_PRICE } from './data'

type Props = {
  heading?: string
  subheading?: string
  defaultCurrency?: string
  defaultAmount?: number
  defaultYearsAgo?: number
  backgroundColor?: 'cream' | 'dark' | 'white'
}

type Result = {
  year: number
  historicalRate: number
  currentRate: number
  btcPrice: number
  usdThen: number
  btcBought: number
  btcValueNow: number
  fiatValueNow: number
  btcGainPct: number
  fiatLossPct: number
}

function calculateResult(amount: number, currCode: string, yearsAgo: number): Result | null {
  const currency = CURRENCIES.find((c) => c.code === currCode)
  if (!currency) return null
  const year = new Date().getFullYear() - yearsAgo
  const historicalRate = currency.rates[year]
  const currentRate = currency.rates[2024] ?? currency.rates[year]
  const btcPrice = BTC_PRICES[year]
  if (!historicalRate || !btcPrice) return null

  const usdThen = amount / historicalRate
  const btcBought = usdThen / btcPrice
  const btcValueNow = btcBought * BTC_CURRENT_PRICE
  const fiatValueNow = (amount / currentRate) * historicalRate
  const btcGainPct = ((btcValueNow - usdThen) / usdThen) * 100
  const fiatLossPct = ((usdThen - fiatValueNow) / usdThen) * 100

  return { year, historicalRate, currentRate, btcPrice, usdThen, btcBought, btcValueNow, fiatValueNow, btcGainPct, fiatLossPct }
}

function fmt(n: number, decimals = 2): string {
  if (n < 0.001) return n.toFixed(8)
  if (n < 1) return n.toFixed(6)
  return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

export function InflationSimulatorBlockComponent({
  heading = 'African Inflation Simulator',
  subheading = 'See how much Bitcoin would have saved you from inflation.',
  defaultCurrency = 'NGN',
  defaultAmount = 10000,
  defaultYearsAgo = 5,
  backgroundColor = 'cream',
}: Props) {
  const [amount, setAmount] = useState(defaultAmount)
  const [currCode, setCurrCode] = useState(defaultCurrency)
  const [yearsAgo, setYearsAgo] = useState(defaultYearsAgo)
  const [result, setResult] = useState<Result | null>(null)
  const [calculated, setCalculated] = useState(false)

  const currency = useMemo(() => CURRENCIES.find((c) => c.code === currCode), [currCode])
  const isDark = backgroundColor === 'dark'

  function handleCalculate() {
    const r = calculateResult(amount, currCode, yearsAgo)
    setResult(r)
    setCalculated(true)
  }

  const sectionBg = isDark ? 'bg-brand-secondary' : backgroundColor === 'white' ? 'bg-white' : 'bg-brand-cream'

  return (
    <section className={cn('py-16', sectionBg)}>
      <Container>
        {(heading || subheading) && (
          <SectionHeading heading={heading} subheading={subheading} align="center" dark={isDark} className="mb-12" />
        )}

        {/* Calculator form */}
        <div className="max-w-2xl mx-auto">
          <div className={cn('rounded-card p-6 md:p-8 shadow-elevated', isDark ? 'bg-white/10' : 'bg-white border border-brand-border-light')}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {/* Amount */}
              <div className="sm:col-span-1">
                <label className={cn('block text-xs font-bold uppercase tracking-wider mb-2', isDark ? 'text-white/70' : 'text-brand-text-muted')}>
                  Amount
                </label>
                <input
                  type="number"
                  min={1}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className={cn(
                    'w-full px-3 py-2.5 rounded-btn border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary',
                    isDark ? 'bg-white/10 border-white/20 text-white placeholder:text-white/40' : 'border-brand-border-light text-brand-secondary',
                  )}
                />
              </div>

              {/* Currency */}
              <div className="sm:col-span-1">
                <label className={cn('block text-xs font-bold uppercase tracking-wider mb-2', isDark ? 'text-white/70' : 'text-brand-text-muted')}>
                  Currency
                </label>
                <select
                  value={currCode}
                  onChange={(e) => { setCurrCode(e.target.value); setCalculated(false) }}
                  className={cn(
                    'w-full px-3 py-2.5 rounded-btn border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary',
                    isDark ? 'bg-white/10 border-white/20 text-white' : 'border-brand-border-light text-brand-secondary bg-white',
                  )}
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>
                  ))}
                </select>
              </div>

              {/* Years ago */}
              <div className="sm:col-span-1">
                <label className={cn('block text-xs font-bold uppercase tracking-wider mb-2', isDark ? 'text-white/70' : 'text-brand-text-muted')}>
                  Years Ago
                </label>
                <select
                  value={yearsAgo}
                  onChange={(e) => { setYearsAgo(Number(e.target.value)); setCalculated(false) }}
                  className={cn(
                    'w-full px-3 py-2.5 rounded-btn border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary',
                    isDark ? 'bg-white/10 border-white/20 text-white' : 'border-brand-border-light text-brand-secondary bg-white',
                  )}
                >
                  {Array.from({ length: 14 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{n} year{n > 1 ? 's' : ''} ago ({new Date().getFullYear() - n})</option>
                  ))}
                </select>
              </div>
            </div>

            <ABButton onClick={handleCalculate} variant="primary" size="md" className="w-full" icon={<Calculator size={16} />} iconPosition="left">
              Calculate
            </ABButton>
          </div>

          {/* Results */}
          {calculated && (
            result ? (
              <div className="mt-8 space-y-4">
                {/* Context line */}
                <p className={cn('text-sm text-center', isDark ? 'text-white/70' : 'text-brand-text-muted')}>
                  In <strong>{result.year}</strong>, {currency?.symbol}{amount.toLocaleString()} {currCode} ≈{' '}
                  <strong>${fmt(result.usdThen)}</strong> USD (at {currency?.symbol}{fmt(result.historicalRate, 2)}/USD)
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Fiat card */}
                  <div className="rounded-card p-6 bg-red-50 border border-red-100">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                        <TrendingDown size={16} className="text-red-500" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-red-600">Fiat (held)</span>
                    </div>
                    <p className="text-2xl font-extrabold text-red-600 mb-1">${fmt(result.fiatValueNow)}</p>
                    <p className="text-xs text-red-500 font-medium mb-3">
                      Lost <strong>{fmt(result.fiatLossPct, 1)}%</strong> of USD value
                    </p>
                    <p className="text-xs text-red-400 leading-relaxed">
                      {currency?.symbol}{amount.toLocaleString()} today = {currency?.symbol}{fmt(amount)} but buys far less — now {currency?.symbol}{fmt(result.currentRate, 2)}/USD
                    </p>
                  </div>

                  {/* Bitcoin card */}
                  <div className="rounded-card p-6 bg-orange-50 border border-brand-primary/20">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
                        <TrendingUp size={16} className="text-brand-primary" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">Bitcoin (held)</span>
                    </div>
                    <p className="text-2xl font-extrabold text-brand-primary mb-1">${fmt(result.btcValueNow)}</p>
                    <p className="text-xs text-brand-primary font-medium mb-3">
                      +<strong>{result.btcGainPct > 10000 ? (result.btcGainPct / 100).toFixed(0) + 'x' : fmt(result.btcGainPct, 0) + '%'}</strong> gain
                    </p>
                    <p className="text-xs text-brand-text-muted leading-relaxed">
                      ${fmt(result.usdThen)} → {fmt(result.btcBought)} BTC at ${fmt(result.btcPrice, 0)}/BTC → ${fmt(result.btcValueNow)} today
                    </p>
                  </div>
                </div>

                {/* Summary bar */}
                <div className={cn('rounded-card p-4 text-center text-sm font-semibold', isDark ? 'bg-white/10 text-white' : 'bg-brand-secondary text-white')}>
                  Bitcoin preserved{' '}
                  <span className="text-brand-primary">
                    {result.btcGainPct > 10000
                      ? `${(result.btcGainPct / 100).toFixed(0)}×`
                      : `${fmt(result.btcGainPct, 0)}%`}{' '}
                    more value
                  </span>{' '}
                  than holding {currCode} over {yearsAgo} year{yearsAgo > 1 ? 's' : ''}.
                </div>
              </div>
            ) : (
              <p className={cn('mt-6 text-center text-sm', isDark ? 'text-white/60' : 'text-brand-text-muted')}>
                No data available for {currCode} in {new Date().getFullYear() - yearsAgo}. Try a different year.
              </p>
            )
          )}
        </div>
      </Container>
    </section>
  )
}
