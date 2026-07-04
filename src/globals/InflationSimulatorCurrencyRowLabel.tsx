'use client'

import { useRowLabel } from '@payloadcms/ui'

export function InflationSimulatorCurrencyRowLabel() {
  const { data, rowNumber } = useRowLabel<{ code?: string; name?: string }>()
  const label = data?.code || data?.name || `Currency ${String(rowNumber).padStart(2, '0')}`
  return <div>{label}</div>
}
