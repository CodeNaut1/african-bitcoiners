import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const COLLECTIONS = [
  { slug: 'pages', label: 'Pages' },
  { slug: 'posts', label: 'Newsletter Posts' },
  { slug: 'media', label: 'Media' },
  { slug: 'users', label: 'Users' },
  { slug: 'jobs', label: 'Jobs' },
  { slug: 'testimonials', label: 'Testimonials' },
  { slug: 'partners', label: 'Partners' },
  { slug: 'map-locations', label: 'Map Locations' },
  { slug: 'meetup-submissions', label: 'Meetup Submissions' },
  { slug: 'miab-nominees', label: 'MIAB Nominees' },
  { slug: 'mining-orgs', label: 'Mining Orgs' },
  { slug: 'course-signups', label: 'Course Signups' },
  { slug: 'course-completions', label: 'Course Completions' },
  { slug: 'feedback-bounties', label: 'Feedback Bounties' },
  { slug: 'vouchers', label: 'Vouchers' },
  { slug: 'form-submissions', label: 'Form Submissions' },
]

export async function GET(req: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })

    const { user } = await payload.auth({ headers: req.headers })
    if (!user || (user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const detail = searchParams.get('collection')

    // Single collection: return count + 5 most recent docs
    if (detail) {
      const found = COLLECTIONS.find(c => c.slug === detail)
      if (!found) return NextResponse.json({ error: 'Unknown collection' }, { status: 400 })

      const [countResult, recentResult] = await Promise.all([
        payload.count({ collection: detail as any, overrideAccess: true }),
        payload.find({
          collection: detail as any,
          limit: 5,
          sort: '-createdAt',
          depth: 0,
          overrideAccess: true,
        }),
      ])

      return NextResponse.json({
        slug: detail,
        label: found.label,
        count: countResult.totalDocs,
        recent: recentResult.docs,
      })
    }

    // All collections: return counts only
    const stats = await Promise.all(
      COLLECTIONS.map(async c => {
        try {
          const r = await payload.count({ collection: c.slug as any, overrideAccess: true })
          return { slug: c.slug, label: c.label, count: r.totalDocs }
        } catch {
          return { slug: c.slug, label: c.label, count: null }
        }
      })
    )

    return NextResponse.json({ collections: stats })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Internal error' }, { status: 500 })
  }
}
