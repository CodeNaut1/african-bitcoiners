import type { CalculationResult, SimulatorCurrency, SimulatorData } from './types'

function ratesMap(currency: SimulatorCurrency): Record<number, number> {
  const map: Record<number, number> = {}
  for (const entry of currency.inflationRates ?? []) {
    if (entry?.year != null && entry.rate != null) {
      map[entry.year] = entry.rate
    }
  }
  return map
}

function btcPricesMap(data: SimulatorData): Record<number, number> {
  const map: Record<number, number> = {}
  for (const entry of data.bitcoinPrices ?? []) {
    if (entry?.year != null && entry.priceUsd != null) {
      map[entry.year] = entry.priceUsd
    }
  }
  return map
}

/** Port of bs_calculate_handler() in bitcoin-simulator.php — do not simplify. */
export function calculateSimulation(
  amount: number,
  currency: SimulatorCurrency,
  yearsAgo: number,
  data: SimulatorData,
): CalculationResult | null {
  if (amount <= 0 || yearsAgo < 1) return null

  const currentYear = new Date().getFullYear()
  const baseYear = currentYear - yearsAgo
  const inflationByYear = ratesMap(currency)
  const bitcoinPrices = btcPricesMap(data)

  let inflationRate = 0
  for (let i = baseYear; i < currentYear; i++) {
    if (inflationByYear[i] !== undefined) {
      inflationRate += inflationByYear[i] / 100
    }
  }

  const years = currentYear - baseYear
  if (years <= 0) return null

  const fiatValue = amount / Math.pow(1 + inflationRate / years, years)
  const fiatPercent = (fiatValue / amount - 1) * 100

  const btcPriceThen = bitcoinPrices[baseYear] ?? 0.0001
  const btcPriceNow = bitcoinPrices[currentYear] ?? 0.106
  const btcAmount = amount / (btcPriceThen * 100000000)
  const btcValue = btcAmount * (btcPriceNow * 100000000)
  const btcPercent = (btcValue / amount - 1) * 100

  return {
    baseYear,
    currentYear,
    fiatValue,
    fiatPercent,
    btcValue,
    btcPercent,
  }
}

export function formatAmount(n: number, decimals = 2): string {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export function parseAmountInput(value: string): number {
  const cleaned = value.replace(/,/g, '').replace(/[^\d.]/g, '')
  const n = parseFloat(cleaned)
  return Number.isFinite(n) ? n : 0
}

export function formatAmountInput(value: string): string {
  const digits = value.replace(/[^\d]/g, '')
  if (!digits) return ''
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
