import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import {
  CSV_IMPORT_BATCH_SIZE,
  csvImportRowExists,
  isValidCsvImportCollection,
  mapCsvImportRow,
  parseCsvText,
  headerMapToFieldMap,
} from '@/lib/csv-import'
import { logAdminOperation } from '@/lib/admin-ops-log'

type ImportBatchResult = {
  imported: number
  skipped: number
  failed: number
  errors: Array<{ row: number; error: string }>
  processed: number
  total: number
  dryRun: boolean
}

async function requireAdmin(req: NextRequest) {
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: req.headers })
  if (!user || (user as { role?: string }).role !== 'admin') {
    return { payload: null, user: null, error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) }
  }
  return { payload, user, error: null }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdmin(req)
    if (auth.error || !auth.payload) return auth.error!

    const { payload, user } = auth
    const formData = await req.formData()

    const collection = String(formData.get('collection') ?? '')
    const skipDuplicates = String(formData.get('skipDuplicates') ?? 'false') === 'true'
    const dryRun = String(formData.get('dryRun') ?? 'false') === 'true'
    const offset = Number(formData.get('offset') ?? 0)
    const totalRows = Number(formData.get('totalRows') ?? 0)

    let columnMap: Record<string, string> = {}
    const columnMapRaw = formData.get('columnMap')
    if (typeof columnMapRaw === 'string' && columnMapRaw) {
      columnMap = JSON.parse(columnMapRaw) as Record<string, string>
    }

    const headerMapRaw = formData.get('headerMap')
    if (typeof headerMapRaw === 'string' && headerMapRaw) {
      columnMap = headerMapToFieldMap(JSON.parse(headerMapRaw) as Record<string, string>)
    }

    if (!isValidCsvImportCollection(collection)) {
      return NextResponse.json({ error: `Invalid collection: ${collection}` }, { status: 400 })
    }

    let rows: Record<string, unknown>[] = []
    const rowsRaw = formData.get('rows')
    if (typeof rowsRaw === 'string' && rowsRaw) {
      rows = JSON.parse(rowsRaw) as Record<string, unknown>[]
    } else {
      const file = formData.get('file')
      if (!(file instanceof File)) {
        return NextResponse.json({ error: 'CSV file or rows batch is required' }, { status: 400 })
      }
      const text = await file.text()
      const parsed = parseCsvText(text)
      rows = parsed.rows
    }

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: 'No rows to import' }, { status: 400 })
    }

    const preview = formData.get('preview') === 'true'
    if (preview) {
      const previewRows = rows.slice(0, 5).map((row, index) => {
        try {
          return {
            row: index + 1,
            data: mapCsvImportRow(collection, row, columnMap),
            error: null,
          }
        } catch (err) {
          return {
            row: index + 1,
            data: null,
            error: err instanceof Error ? err.message : String(err),
          }
        }
      })
      return NextResponse.json({ preview: previewRows })
    }

    let imported = 0
    let skipped = 0
    let failed = 0
    const errors: Array<{ row: number; error: string }> = []

    for (let i = 0; i < rows.length; i++) {
      const rowNumber = offset + i + 1
      try {
        const data = mapCsvImportRow(collection, rows[i]!, columnMap)

        if (skipDuplicates) {
          const exists = await csvImportRowExists(payload, collection, data)
          if (exists) {
            skipped++
            continue
          }
        }

        if (dryRun) {
          imported++
          continue
        }

        await payload.create({
          collection,
          data: data as never,
          overrideAccess: true,
        })
        imported++
      } catch (err) {
        failed++
        errors.push({
          row: rowNumber,
          error: err instanceof Error ? err.message : String(err),
        })
      }
    }

    const processed = offset + rows.length
    const total = totalRows || processed
    const isFinalBatch = totalRows > 0 ? processed >= totalRows : true

    if (!dryRun && isFinalBatch && imported > 0) {
      await logAdminOperation(payload, {
        action: 'import',
        collection,
        details: `CSV import: ${imported} records (${skipped} skipped, ${failed} failed)`,
        user: (user as { email?: string }).email,
      })
    }

    const result: ImportBatchResult = {
      imported,
      skipped,
      failed,
      errors,
      processed,
      total,
      dryRun,
    }

    return NextResponse.json(result)
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Internal error' }, { status: 500 })
  }
}

export { CSV_IMPORT_BATCH_SIZE }
