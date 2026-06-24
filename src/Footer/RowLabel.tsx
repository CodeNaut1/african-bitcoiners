'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

type LinkItem = { label?: string }

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<LinkItem>()
  const label = data?.data?.label
    ? `${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data.data.label}`
    : 'Row'
  return <div>{label}</div>
}
