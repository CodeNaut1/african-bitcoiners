import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { logAdminOperation } from '@/lib/admin-ops-log'

const DELETABLE = [
  'course-signups',
  'course-completions',
  'feedback-bounties',
  'vouchers',
  'form-submissions',
  'meetup-submissions',
]

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
    const { user } = await payload.auth({ headers: req.headers })
    if (!user || (user as { role?: string }).role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { collection } = (await req.json()) as { collection?: string }
    if (!collection || !DELETABLE.includes(collection)) {
      return NextResponse.json({ error: 'Invalid collection' }, { status: 400 })
    }

    const result = await payload.find({
      collection: collection as never,
      limit: 10000,
      pagination: false,
      depth: 0,
      overrideAccess: true,
    })

    let deleted = 0
    for (const doc of result.docs as Array<{ id: string | number }>) {
      try {
        await payload.delete({
          collection: collection as never,
          id: doc.id,
          overrideAccess: true,
        })
        deleted++
      } catch {
        // continue
      }
    }

    await logAdminOperation(payload, {
      action: 'bulk-delete',
      collection,
      details: `Deleted ${deleted} of ${result.docs.length} records`,
      user: (user as { email?: string }).email,
    })

    return NextResponse.json({ deleted, total: result.docs.length })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Internal error' }, { status: 500 })
  }
}
