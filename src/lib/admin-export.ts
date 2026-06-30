import type { Where } from 'payload'

const RESERVED_QUERY_PARAMS = new Set(['collection', 'format', 'dateFrom', 'dateTo'])

export function flattenDoc(doc: Record<string, unknown>): Record<string, unknown> {
  const flat: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(doc)) {
    if (k === 'blocks' || k === 'content') continue
    if (typeof v === 'object' && v !== null && !Array.isArray(v) && 'id' in (v as object)) {
      flat[k] = (v as Record<string, unknown>).id
    } else if (Array.isArray(v)) {
      flat[k] = v
        .map((item: unknown) => {
          if (typeof item === 'object' && item !== null && 'id' in (item as object)) {
            return (item as Record<string, unknown>).id
          }
          return item
        })
        .join('; ')
    } else {
      flat[k] = v
    }
  }
  return flat
}

export function toCsvRow(obj: Record<string, unknown>): string {
  return Object.values(obj)
    .map((v) => {
      if (v === null || v === undefined) return ''
      const s = typeof v === 'object' ? JSON.stringify(v) : String(v)
      if (s.includes(',') || s.includes('"') || s.includes('\n')) {
        return `"${s.replace(/"/g, '""')}"`
      }
      return s
    })
    .join(',')
}

export function buildExportWhere(searchParams: URLSearchParams): Where | undefined {
  const and: Where[] = []

  const dateFrom = searchParams.get('dateFrom')
  const dateTo = searchParams.get('dateTo')

  if (dateFrom) {
    and.push({ createdAt: { greater_than_equal: dateFrom } })
  }

  if (dateTo) {
    and.push({ createdAt: { less_than_equal: dateTo } })
  }

  for (const [key, value] of searchParams.entries()) {
    if (RESERVED_QUERY_PARAMS.has(key) || !value.trim()) continue
    and.push({ [key]: { equals: value } })
  }

  if (!and.length) return undefined
  return and.length === 1 ? and[0]! : { and }
}

export function buildCsv(flatRows: Record<string, unknown>[]): string {
  if (!flatRows.length) return ''

  const headers = Object.keys(flatRows[0]!)
  return [headers.join(','), ...flatRows.map((row) => toCsvRow(row))].join('\n')
}

export async function buildXlsxBuffer(flatRows: Record<string, unknown>[]): Promise<Buffer> {
  const XLSX = await import('xlsx')
  const worksheet = XLSX.utils.json_to_sheet(flatRows)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Export')
  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' }) as Buffer
}
