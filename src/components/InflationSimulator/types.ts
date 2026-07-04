import type { InflationSimulatorDatum } from '@/payload-types'

export type SimulatorData = InflationSimulatorDatum

export type SimulatorCurrency = NonNullable<SimulatorData['currencies']>[number]

export type CalculationResult = {
  baseYear: number
  currentYear: number
  fiatValue: number
  fiatPercent: number
  btcValue: number
  btcPercent: number
}
