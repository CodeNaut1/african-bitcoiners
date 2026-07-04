'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import html2canvas from 'html2canvas'

import type { InflationSimulatorDatum } from '@/payload-types'

import {
  calculateSimulation,
  formatAmount,
  formatAmountInput,
  parseAmountInput,
} from './calculate'
import { SIMULATOR_ASSETS } from './constants'
import { ShareModal } from './ShareModal'
import { IS } from './styles'
import type { CalculationResult, SimulatorCurrency } from './types'

function enabledCurrencies(data: InflationSimulatorDatum): SimulatorCurrency[] {
  return (data.currencies ?? []).filter((c) => c.enabled !== false && c.code && c.name)
}

const inputClassName =
  'w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-base text-brand-secondary outline-none transition-colors focus:border-[#FF5A4E] focus:ring-2 focus:ring-[#FF5A4E]/20'

type ResultCardProps = {
  variant: 'fiat' | 'bitcoin'
  currency: SimulatorCurrency
  amount: number
  result: CalculationResult
}

function ResultCard({ variant, currency, amount, result }: ResultCardProps) {
  const isFiat = variant === 'fiat'
  const yearRange = `(${result.baseYear}-${result.currentYear})`
  const palette = isFiat ? IS.fiat : IS.btc

  return (
    <div
      className="rounded-xl border p-5 md:p-6"
      style={{ borderColor: palette.border, backgroundColor: palette.bg }}
    >
      <h3 className="mb-5 flex flex-wrap items-center gap-2 text-base font-bold text-brand-secondary md:text-lg">
        {isFiat ? (
          <>
            <span className="text-xl leading-none" aria-hidden>
              {currency.emoji}
            </span>
            <span>
              {currency.name}{' '}
              <span className="font-normal text-brand-text-muted">{yearRange}</span>
            </span>
          </>
        ) : (
          <>
            <img
              src={SIMULATOR_ASSETS.bitcoinLogo}
              alt=""
              width={22}
              height={22}
              className="inline-block shrink-0"
            />
            <span>
              Bitcoin <span className="font-normal text-brand-text-muted">{yearRange}</span>
            </span>
          </>
        )}
      </h3>

      <p className="text-sm text-brand-text-dark">
        You saved {currency.symbol}
        {formatAmountInput(String(amount))}
      </p>

      <p className="mt-5 text-sm text-brand-text-dark">
        {isFiat ? "Today it's worth just:" : 'Today it would be worth:'}
      </p>
      <p
        className="mt-1 text-2xl font-extrabold md:text-[1.75rem]"
        style={{ color: palette.text }}
      >
        {currency.symbol}
        {formatAmount(isFiat ? result.fiatValue : result.btcValue)}
      </p>

      <p
        className="mt-5 inline-block rounded-md px-3 py-2 text-xs font-bold uppercase tracking-wide text-white md:text-sm"
        style={{ backgroundColor: palette.badge }}
      >
        {isFiat
          ? `${formatAmount(result.fiatPercent)}% LOST to inflation`
          : `${formatAmount(result.btcPercent)}% GAIN in Bitcoin`}
      </p>
    </div>
  )
}

export function InflationSimulator() {
  const [data, setData] = useState<InflationSimulatorDatum | null>(null)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  const [amountInput, setAmountInput] = useState('5,000')
  const [yearsAgo, setYearsAgo] = useState('6')
  const [currencyCode, setCurrencyCode] = useState('NGN')

  const [result, setResult] = useState<CalculationResult | null>(null)
  const [calculated, setCalculated] = useState(false)
  const [calcError, setCalcError] = useState('')

  const [sharing, setSharing] = useState(false)
  const [shareImage, setShareImage] = useState<string | null>(null)
  const [showShareModal, setShowShareModal] = useState(false)

  const resultsRef = useRef<HTMLDivElement>(null)
  const shareTemplateRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/globals/inflation-simulator-data')
        if (!res.ok) throw new Error(`Failed to load simulator data (${res.status})`)
        const json = (await res.json()) as InflationSimulatorDatum
        if (cancelled) return
        setData(json)
        const currencies = enabledCurrencies(json)
        const code = currencies.some((c) => c.code === 'NGN')
          ? 'NGN'
          : currencies[0]?.code ?? 'NGN'
        setCurrencyCode(code)

        const selected = currencies.find((c) => c.code === code)
        const initialAmount = parseAmountInput('5,000')
        const initialYears = 6
        if (selected && initialAmount > 0) {
          const r = calculateSimulation(initialAmount, selected, initialYears, json)
          if (r) {
            setResult(r)
            setCalculated(true)
          }
        }
      } catch (err) {
        if (!cancelled) {
          setFetchError(err instanceof Error ? err.message : 'Failed to load simulator data')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const currencies = useMemo(() => (data ? enabledCurrencies(data) : []), [data])
  const selectedCurrency = useMemo(
    () => currencies.find((c) => c.code === currencyCode),
    [currencies, currencyCode],
  )

  const maxYears = data?.maxYearsBack ?? 15
  const currentYear = new Date().getFullYear()

  const yearOptions = useMemo(
    () =>
      Array.from({ length: maxYears }, (_, i) => {
        const n = i + 1
        return { value: String(n), label: `${n} years ago (${currentYear - n})` }
      }),
    [maxYears, currentYear],
  )

  const amount = parseAmountInput(amountInput)
  const canCalculate =
    !loading &&
    !fetchError &&
    amount > 0 &&
    yearsAgo !== '' &&
    currencyCode !== '' &&
    Boolean(selectedCurrency)

  const pageUrl =
    process.env.NEXT_PUBLIC_SERVER_URL
      ? `${process.env.NEXT_PUBLIC_SERVER_URL.replace(/\/$/, '')}/save-bitcoin/bitcoin-inflation-simulator`
      : typeof window !== 'undefined'
        ? window.location.href
        : 'https://bitcoiners.africa/save-bitcoin/bitcoin-inflation-simulator'

  const handleCalculate = useCallback(() => {
    if (!selectedCurrency || !data || !canCalculate) return
    setCalcError('')
    const r = calculateSimulation(amount, selectedCurrency, Number(yearsAgo), data)
    if (!r) {
      setCalcError('Unable to calculate for the selected options. Try a different year or currency.')
      setResult(null)
      setCalculated(true)
      return
    }
    setResult(r)
    setCalculated(true)
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [amount, canCalculate, data, selectedCurrency, yearsAgo])

  const handleShare = useCallback(async () => {
    if (!shareTemplateRef.current || !result || !selectedCurrency) return
    setSharing(true)
    try {
      const canvas = await html2canvas(shareTemplateRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: IS.pageBg,
        width: 800,
        height: 720,
        logging: false,
      })
      setShareImage(canvas.toDataURL('image/png'))
      setShowShareModal(true)
    } catch {
      setCalcError('Could not generate share image. Please try again.')
    } finally {
      setSharing(false)
    }
  }, [result, selectedCurrency])

  const handleDownload = useCallback(() => {
    if (!shareImage) return
    const link = document.createElement('a')
    link.download = `bitcoin-simulator-result-${new Date().toISOString().slice(0, 10)}.png`
    link.href = shareImage
    link.click()
    setShowShareModal(false)
  }, [shareImage])

  if (loading) {
    return (
      <div className="rounded-xl border border-black/[0.06] bg-white p-8 text-center shadow-sm not-prose">
        <p className="text-sm text-brand-text-muted">Loading simulator…</p>
      </div>
    )
  }

  if (fetchError || !data) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center not-prose">
        <p className="text-sm text-red-700">{fetchError || 'Simulator data unavailable.'}</p>
      </div>
    )
  }

  return (
    <div className="not-prose">
      {/* Input section */}
      <div className="rounded-xl border border-black/[0.06] bg-white p-5 shadow-sm md:p-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          <div>
            <label htmlFor="bs-amount" className="mb-2 block text-sm font-bold text-brand-secondary">
              Amount Saved
            </label>
            <input
              id="bs-amount"
              type="text"
              inputMode="numeric"
              placeholder="e.g., 10,000"
              value={amountInput}
              onChange={(e) => {
                setAmountInput(formatAmountInput(e.target.value))
                setCalculated(false)
              }}
              className={inputClassName}
            />
          </div>

          <div>
            <label htmlFor="bs-years" className="mb-2 block text-sm font-bold text-brand-secondary">
              Years Ago
            </label>
            <select
              id="bs-years"
              value={yearsAgo}
              onChange={(e) => {
                setYearsAgo(e.target.value)
                setCalculated(false)
              }}
              className={inputClassName}
            >
              <option value="">Select years</option>
              {yearOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="bs-currency" className="mb-2 block text-sm font-bold text-brand-secondary">
              Your Currency
            </label>
            <select
              id="bs-currency"
              value={currencyCode}
              onChange={(e) => {
                setCurrencyCode(e.target.value)
                setCalculated(false)
              }}
              className={inputClassName}
            >
              <option value="">Select currency</option>
              {currencies.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.emoji ? `${c.emoji} ` : ''}
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          disabled={!canCalculate}
          onClick={handleCalculate}
          className="mt-6 w-full rounded-lg px-6 py-3.5 text-base font-bold text-white shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 md:mt-8"
          style={{ backgroundColor: IS.coral }}
          onMouseEnter={(e) => {
            if (!canCalculate) return
            e.currentTarget.style.backgroundColor = IS.coralHover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = IS.coral
          }}
        >
          Calculate your wealth loss
        </button>
      </div>

      {/* Results */}
      {calculated && (
        <div ref={resultsRef} className="mt-8 md:mt-10">
          {result && selectedCurrency ? (
            <>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                <ResultCard
                  variant="fiat"
                  currency={selectedCurrency}
                  amount={amount}
                  result={result}
                />
                <ResultCard
                  variant="bitcoin"
                  currency={selectedCurrency}
                  amount={amount}
                  result={result}
                />
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={handleShare}
                  disabled={sharing}
                  className="w-full rounded-lg px-8 py-3.5 text-base font-bold text-white shadow-sm transition-colors disabled:opacity-60 sm:w-auto sm:min-w-[280px]"
                  style={{ backgroundColor: IS.coral }}
                  onMouseEnter={(e) => {
                    if (sharing) return
                    e.currentTarget.style.backgroundColor = IS.coralHover
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = IS.coral
                  }}
                >
                  {sharing ? 'Generating image…' : 'Share this shocking truth'}
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-sm text-brand-text-muted">{calcError}</p>
          )}
        </div>
      )}

      {/* Hidden share template */}
      {result && selectedCurrency && (
        <div aria-hidden className="pointer-events-none fixed left-[-9999px] top-0 overflow-hidden">
          <div
            ref={shareTemplateRef}
            style={{
              width: 800,
              height: 720,
              padding: 24,
              backgroundColor: IS.pageBg,
              backgroundImage: `url(${SIMULATOR_ASSETS.background})`,
              backgroundSize: 'cover',
              backgroundBlendMode: 'overlay',
              fontFamily: 'var(--font-satoshi), Satoshi, sans-serif',
            }}
          >
            <div className="flex items-start justify-between">
              <img
                src={SIMULATOR_ASSETS.logo}
                alt=""
                width={120}
                height={40}
                className="object-contain"
              />
              <span className="text-sm font-semibold text-brand-secondary">www.bitcoiners.africa</span>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3 text-center">
              <span className="text-xl font-bold text-brand-secondary">{selectedCurrency.name}</span>
              <img src={SIMULATOR_ASSETS.versus} alt="vs" width={40} height={24} />
              <span className="text-xl font-bold text-brand-secondary">Bitcoin</span>
            </div>

            <div
              className="mx-auto mt-3 w-fit rounded-full px-4 py-1 text-sm font-bold text-white"
              style={{ backgroundColor: IS.btc.badge }}
            >
              {result.baseYear}-{result.currentYear}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div
                className="rounded-lg border p-4 text-center"
                style={{ borderColor: IS.fiat.border, backgroundColor: IS.fiat.bg }}
              >
                <img src={SIMULATOR_ASSETS.sadIcon} alt="" width={25} height={25} className="mx-auto mb-2" />
                <p className="text-xs font-bold text-brand-secondary">
                  {selectedCurrency.emoji} {selectedCurrency.name}
                </p>
                <p className="mt-2 text-xs">
                  You saved {selectedCurrency.symbol}
                  {formatAmountInput(String(amount))}
                </p>
                <hr className="my-2 border-black/10" />
                <p className="text-xs">Today it&apos;s worth just:</p>
                <p className="text-lg font-extrabold" style={{ color: IS.fiat.text }}>
                  {selectedCurrency.symbol}
                  {formatAmount(result.fiatValue)}
                </p>
                <p className="mt-2 text-xs font-bold" style={{ color: IS.fiat.text }}>
                  {formatAmount(result.fiatPercent)}% LOST
                </p>
              </div>

              <div
                className="rounded-lg border p-4 text-center"
                style={{ borderColor: IS.btc.border, backgroundColor: IS.btc.bg }}
              >
                <img src={SIMULATOR_ASSETS.happyIcon} alt="" width={25} height={25} className="mx-auto mb-2" />
                <p className="text-xs font-bold text-brand-secondary">Bitcoin</p>
                <p className="mt-2 text-xs">
                  You saved {selectedCurrency.symbol}
                  {formatAmountInput(String(amount))}
                </p>
                <hr className="my-2 border-black/10" />
                <p className="text-xs">Today it would be worth:</p>
                <p className="text-lg font-extrabold" style={{ color: IS.btc.text }}>
                  {selectedCurrency.symbol}
                  {formatAmount(result.btcValue)}
                </p>
                <p className="mt-2 text-xs font-bold" style={{ color: IS.btc.text }}>
                  {formatAmount(result.btcPercent)}% GAIN
                </p>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-brand-text-dark">
              Compare your local currency to Bitcoin
            </p>
            <p
              className="mx-auto mt-2 w-fit rounded bg-white px-3 py-1 text-xs font-mono"
              style={{ color: IS.coral }}
            >
              {SIMULATOR_ASSETS.shareUrl}
            </p>
          </div>
        </div>
      )}

      {showShareModal && shareImage && (
        <ShareModal
          imageDataUrl={shareImage}
          pageUrl={pageUrl}
          onClose={() => setShowShareModal(false)}
          onDownload={handleDownload}
        />
      )}
    </div>
  )
}
