'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

type NavItem = { label?: string; type?: string }

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NavItem>()
  const label = data?.data?.label
    ? `${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data.data.label}${data.data.type === 'dropdown' ? ' ▾' : ''}`
    : 'Row'
  return <div>{label}</div>
}
