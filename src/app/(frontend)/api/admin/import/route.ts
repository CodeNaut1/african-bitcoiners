import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import {
  IMPORT_COLLECTIONS,
  importRowExists,
  mapImportRow,
  type ImportCollectionSlug,
} from '@/lib/legacy-import'
import { logAdminOperation } from '@/lib/admin-ops-log'

const VALID_COLLECTIONS = IMPORT_COLLECTIONS.map((c) => c.slug)

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })

    const { user } = await payload.auth({ headers: req.headers })
    if (!user || (user as { role?: string }).role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = (await req.json()) as {
      collection: string
      rows: Record<string, unknown>[]
      preview?: boolean
      columnMap?: Record<string, string>
      offset?: number
    }

    const { collection, rows, preview = false, columnMap, offset = 0 } = body

    if (!VALID_COLLECTIONS.includes(collection as ImportCollectionSlug)) {
      return NextResponse.json({ error: `Invalid collection: ${collection}` }, { status: 400 })
    }

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: 'No rows provided' }, { status: 400 })
    }

    if (preview) {
      const preview5 = rows.slice(0, 5).map((row, i) => {
        try {
          return { row: offset + i + 1, data: mapImportRow(collection, row, columnMap), error: null }
        } catch (err) {
          return {
            row: offset + i + 1,
            data: null,
            error: err instanceof Error ? err.message : String(err),
          }
        }
      })
      return NextResponse.json({ preview: preview5 })
    }

    let imported = 0
    let skipped = 0
    const errors: Array<{ row: number; error: string }> = []

    for (let i = 0; i < rows.length; i++) {
      try {
        const data = mapImportRow(collection, rows[i]!, columnMap)

        const exists = await importRowExists(payload, collection, data)
        if (exists) {
          skipped++
          continue
        }

        await payload.create({
          collection: collection as ImportCollectionSlug,
          data: data as never,
          overrideAccess: true,
        })
        imported++
      } catch (err) {
        errors.push({
          row: offset + i + 1,
          error: err instanceof Error ? err.message : String(err),
        })
      }
    }

    const totalRows = (body as { totalRows?: number }).totalRows ?? rows.length
    const isFinalBatch = offset + rows.length >= totalRows
    if (isFinalBatch && imported > 0) {
      await logAdminOperation(payload, {
        action: 'import',
        collection,
        details: `Imported ${imported} records (${skipped} skipped, ${errors.length} errors)`,
        user: (user as { email?: string }).email,
      })
    }

    return NextResponse.json({
      imported,
      skipped,
      errors,
      total: (body as { totalRows?: number }).totalRows ?? rows.length,
      processed: offset + rows.length,
    })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Internal error' }, { status: 500 })
  }
}
