import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { logAdminOperation } from '@/lib/admin-ops-log'

const VALID_COLLECTIONS = [
  'pages',
  'posts',
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

function toCsvRow(obj: Record<string, unknown>): string {
  return Object.values(obj).map(v => {
    if (v === null || v === undefined) return ''
    const s = typeof v === 'object' ? JSON.stringify(v) : String(v)
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return `"${s.replace(/"/g, '""')}"`
    }
    return s
  }).join(',')
}

function flattenDoc(doc: Record<string, unknown>): Record<string, unknown> {
  const flat: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(doc)) {
    if (k === 'blocks' || k === 'content') continue // skip complex richtext
    if (typeof v === 'object' && v !== null && !Array.isArray(v) && 'id' in (v as object)) {
      flat[k] = (v as Record<string, unknown>)['id']
    } else if (Array.isArray(v)) {
      flat[k] = v.map((item: unknown) => {
        if (typeof item === 'object' && item !== null && 'id' in (item as object)) {
          return (item as Record<string, unknown>)['id']
        }
        return item
      }).join('; ')
    } else {
      flat[k] = v
    }
  }
  return flat
}

export async function GET(req: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })

    const { user } = await payload.auth({ headers: req.headers })
    if (!user || (user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const collection = searchParams.get('collection')

    if (!collection || !VALID_COLLECTIONS.includes(collection)) {
      return NextResponse.json({ error: `Invalid collection: ${collection}` }, { status: 400 })
    }

    const result = await payload.find({
      collection: collection as any,
      limit: 10000,
      pagination: false,
      depth: 0,
      overrideAccess: true,
    })

    if (result.docs.length === 0) {
      return new NextResponse('', {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${collection}-export.csv"`,
        },
      })
    }

    const flat = result.docs.map(d => flattenDoc(d as Record<string, unknown>))
    const headers = Object.keys(flat[0]!)
    const csvLines = [
      headers.join(','),
      ...flat.map(row => toCsvRow(row)),
    ]
    const csv = csvLines.join('\n')

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
        'Content-Disposition': `attachment; filename="${collection}-export.csv"`,
      },
    })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Internal error' }, { status: 500 })
  }
}
