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

const SEARCH_FIELDS: Record<string, string[]> = {
  pages: ['title', 'slug'],
  posts: ['title', 'slug', 'excerpt'],
  users: ['name', 'email'],
  jobs: ['title', 'company', 'location'],
  'course-signups': ['name', 'email', 'uniqueCode', 'country'],
  'course-completions': ['name', 'email', 'certNumber', 'uniqueCode'],
  'feedback-bounties': ['name', 'email', 'feedbackTitle', 'category'],
  vouchers: ['voucherCode', 'sentTo'],
  'form-submissions': ['formName', 'formSlug'],
}

export async function GET(req: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })

    const { user } = await payload.auth({ headers: req.headers })
    if (!user || (user as { role?: string }).role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const detail = searchParams.get('collection')
    const search = searchParams.get('search')?.trim()
    const opsLog = searchParams.get('opsLog')

    if (opsLog === '1') {
      const log = await payload.findGlobal({
        slug: 'admin-ops-log',
        depth: 0,
        overrideAccess: true,
      })
      return NextResponse.json({
        entries: ((log as { entries?: unknown[] })?.entries ?? []).slice(0, 25),
      })
    }

    if (detail) {
      const found = COLLECTIONS.find((c) => c.slug === detail)
      if (!found) return NextResponse.json({ error: 'Unknown collection' }, { status: 400 })

      const where =
        search && SEARCH_FIELDS[detail]
          ? {
              or: SEARCH_FIELDS[detail].map((field) => ({
                [field]: { contains: search },
              })),
            }
          : undefined

      const [countResult, recentResult] = await Promise.all([
        payload.count({
          collection: detail as never,
          overrideAccess: true,
          ...(where ? { where } : {}),
        }),
        payload.find({
          collection: detail as never,
          limit: search ? 20 : 5,
          sort: '-createdAt',
          depth: 0,
          overrideAccess: true,
          ...(where ? { where } : {}),
        }),
      ])

      return NextResponse.json({
        slug: detail,
        label: found.label,
        count: countResult.totalDocs,
        recent: recentResult.docs,
        search: search ?? null,
      })
    }

    const stats = await Promise.all(
      COLLECTIONS.map(async (c) => {
        try {
          const r = await payload.count({ collection: c.slug as never, overrideAccess: true })
          return { slug: c.slug, label: c.label, count: r.totalDocs }
        } catch {
          return { slug: c.slug, label: c.label, count: null }
        }
      }),
    )

    return NextResponse.json({ collections: stats })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Internal error' }, { status: 500 })
  }
}
