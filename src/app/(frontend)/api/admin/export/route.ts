import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import {
  buildCsv,
  buildExportWhere,
  buildXlsxBuffer,
  flattenDoc,
} from '@/lib/admin-export'
import { logAdminOperation } from '@/lib/admin-ops-log'

const VALID_COLLECTIONS = [
  'pages',
  'posts',
  'categories',
  'users',
  'media',
  'jobs',
  'testimonials',
  'partners',
  'miab-nominees',
  'mining-orgs',
  'map-locations',
  'meetup-submissions',
  'course-signups',
  'course-completions',
  'feedback-bounties',
  'vouchers',
  'form-submissions',
]

export async function GET(req: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })

    const { user } = await payload.auth({ headers: req.headers })
    if (!user || (user as { role?: string }).role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const collection = searchParams.get('collection')
    const format = searchParams.get('format') === 'xlsx' ? 'xlsx' : 'csv'

    if (!collection || !VALID_COLLECTIONS.includes(collection)) {
      return NextResponse.json({ error: `Invalid collection: ${collection}` }, { status: 400 })
    }

    const where = buildExportWhere(searchParams)

    const result = await payload.find({
      collection: collection as never,
      where,
      limit: 10000,
      pagination: false,
      depth: 0,
      overrideAccess: true,
    })

    const flat = result.docs.map((doc) => flattenDoc(doc as Record<string, unknown>))
    const filename = `${collection}-export.${format}`

    if (format === 'xlsx') {
      const buffer = flat.length ? await buildXlsxBuffer(flat) : await buildXlsxBuffer([])

      await logAdminOperation(payload, {
        action: 'export',
        collection,
        details: `Exported ${result.docs.length} records to XLSX`,
        user: (user as { email?: string }).email,
      })

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          'Content-Type':
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      })
    }

    const csv = buildCsv(flat)

    await logAdminOperation(payload, {
      action: 'export',
      collection,
      details: `Exported ${result.docs.length} records to CSV`,
      user: (user as { email?: string }).email,
    })

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal error' },
      { status: 500 },
    )
  }
}
