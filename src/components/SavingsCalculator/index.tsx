'use client'

import React, { useState, useMemo } from 'react'
import { Calculator, TrendingUp, Bitcoin } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { ABButton } from '@/components/ui/ab-button'
import { CURRENCIES, BTC_CURRENT_PRICE } from '@/blocks/InflationSimulator/data'

const PERIODS = [1, 2, 3, 4, 5]

// Simple BTC growth scenarios (annual multipliers)
const SCENARIOS = [
  { label: 'Conservative', pct: 20, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
  { label: 'Moderate', pct: 50, color: 'text-brand-primary', bg: 'bg-orange-50', border: 'border-brand-primary/20' },
  { label: 'Bullish', pct: 100, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' },
]

function fmt(n: number, d = 0): string {
  if (!isFinite(n)) return '—'
  if (d === 'sats' as any) {
    return Math.round(n).toLocaleString()
  }
  return n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })
}

function projectBtc(satsNow: number, annualPct: number, years: number): number {
  const btcNow = satsNow / 100_000_000
  const futurePrice = BTC_CURRENT_PRICE * Math.pow(1 + annualPct / 100, years)
  return btcNow * futurePrice
}

export function SavingsCalculator() {
  const [monthly, setMonthly] = useState(10000)
  const [currCode, setCurrCode] = useState('NGN')
  const [years, setYears] = useState(3)
  const [calculated, setCalculated] = useState(false)

  const currency = useMemo(() => CURRENCIES.find((c) => c.code === currCode), [currCode])
  const rate2024 = currency?.rates[2024] ?? 1

  const totalFiat = monthly * 12 * years
  const totalUSD = totalFiat / rate2024
  const totalSats = Math.round((totalUSD / BTC_CURRENT_PRICE) * 100_000_000)
  const totalBtc = totalSats / 100_000_000

  function handleCalculate() {
    setCalculated(true)
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Inputs */}
      <div className="bg-white rounded-card border border-brand-border-light shadow-card p-6 md:p-8 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {/* Monthly amount */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-text-muted mb-2">
              Monthly Savings
            </label>
            <input
              type="number"
              min={1}
              value={monthly}
              onChange={(e) => { setMonthly(Number(e.target.value)); setCalculated(false) }}
              className="w-full px-3 py-2.5 rounded-btn border border-brand-border-light text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-secondary"
            />
          </div>

          {/* Currency */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-text-muted mb-2">
              Currency
            </label>
            <select
              value={currCode}
              onChange={(e) => { setCurrCode(e.target.value); setCalculated(false) }}
              className="w-full px-3 py-2.5 rounded-btn border border-brand-border-light text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-secondary bg-white"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>
              ))}
            </select>
          </div>

          {/* Period */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-text-muted mb-2">
              Savings Period
            </label>
            <select
              value={years}
              onChange={(e) => { setYears(Number(e.target.value)); setCalculated(false) }}
              className="w-full px-3 py-2.5 rounded-btn border border-brand-border-light text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-secondary bg-white"
            >
              {PERIODS.map((y) => (
                <option key={y} value={y}>{y} year{y > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
        </div>

        <ABButton onClick={handleCalculate} variant="primary" size="md" className="w-full" icon={<Calculator size={16} />} iconPosition="left">
          Calculate My Bitcoin Savings
        </ABButton>
      </div>

      {/* Results */}
      {calculated && (
        <div className="space-y-4">
          {/* Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-brand-cream rounded-card border border-brand-border-light p-5 text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-text-muted mb-1">Total Saved</p>
              <p className="text-xl font-extrabold text-brand-secondary">{currency?.symbol}{fmt(totalFiat)}</p>
              <p className="text-xs text-brand-text-muted">{currCode} over {years}yr{years > 1 ? 's' : ''}</p>
            </div>
            <div className="bg-brand-cream rounded-card border border-brand-border-light p-5 text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-text-muted mb-1">USD Equivalent</p>
              <p className="text-xl font-extrabold text-brand-secondary">${fmt(totalUSD, 2)}</p>
              <p className="text-xs text-brand-text-muted">at {currency?.symbol}{fmt(rate2024, 2)}/USD</p>
            </div>
            <div className="bg-brand-primary/5 rounded-card border border-brand-primary/20 p-5 text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-primary mb-1">Bitcoin Equivalent</p>
              <p className="text-xl font-extrabold text-brand-primary">{fmt(totalSats)} sats</p>
              <p className="text-xs text-brand-text-muted">{totalBtc.toFixed(8)} BTC today</p>
            </div>
          </div>

          {/* Growth scenarios */}
          <div className="bg-white rounded-card border border-brand-border-light p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={18} className="text-brand-primary" />
              <p className="font-semibold text-brand-secondary text-sm">
                If Bitcoin grows over {years} year{years > 1 ? 's' : ''} (3 scenarios)
              </p>
            </div>
            <p className="text-xs text-brand-text-muted mb-4">
              Past performance is not a guarantee of future results. These projections are illustrative only.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SCENARIOS.map((s) => {
                const projected = projectBtc(totalSats, s.pct, years)
                const gain = projected - totalUSD
                return (
                  <div key={s.label} className={cn('rounded-card p-4 border', s.bg, s.border)}>
                    <p className={cn('text-xs font-bold uppercase tracking-wider mb-2', s.color)}>{s.label} (+{s.pct}%/yr)</p>
                    <p className={cn('text-lg font-extrabold', s.color)}>${fmt(projected, 0)}</p>
                    <p className="text-xs text-brand-text-muted mt-1">+${fmt(gain, 0)} vs fiat savings</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Disclaimer + CTA */}
          <div className="bg-brand-secondary rounded-card p-5 text-center text-white">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Bitcoin size={18} className="text-brand-primary" />
              <p className="font-semibold">Start saving in Bitcoin today</p>
            </div>
            <p className="text-sm text-white/70 mb-4">
              Dollar-cost average {currency?.symbol}{fmt(monthly)}/month — automatically protect your savings from inflation.
            </p>
            <a
              href="/learn-bitcoin/free-bitcoin-course/"
              className="inline-block bg-brand-primary text-white font-bold text-sm px-6 py-2.5 rounded-btn hover:bg-brand-primary/90 transition-colors"
            >
              Learn How — Free Bitcoin Course
            </a>
          </div>

          <p className="text-xs text-brand-text-muted text-center">
            BTC price used: ${fmt(BTC_CURRENT_PRICE, 0)} · Exchange rate: {currency?.symbol}{fmt(rate2024, 2)}/USD (2024 average)
          </p>
        </div>
      )}
    </div>
  )
}
