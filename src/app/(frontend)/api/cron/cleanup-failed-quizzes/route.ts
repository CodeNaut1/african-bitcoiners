import { type NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { FAILED_QUIZ_FORM_SLUG } from '@/lib/quiz-shared'

export const dynamic = 'force-dynamic'

const RETENTION_DAYS = 3

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false

  const authHeader = req.headers.get('authorization')
  if (authHeader === `Bearer ${secret}`) return true

  const querySecret = req.nextUrl.searchParams.get('secret')
  return querySecret === secret
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - RETENTION_DAYS)

    const stale = await payload.find({
      collection: 'form-submissions',
      where: {
        and: [
          { formSlug: { equals: FAILED_QUIZ_FORM_SLUG } },
          { submittedAt: { less_than: cutoff.toISOString() } },
        ],
      },
      limit: 500,
      overrideAccess: true,
    })

    let deleted = 0
    for (const doc of stale.docs) {
      await payload.delete({
        collection: 'form-submissions',
        id: doc.id,
        overrideAccess: true,
      })
      deleted += 1
    }

    return NextResponse.json({ deleted })
  } catch (err) {
    console.error('[cron/cleanup-failed-quizzes]', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  return GET(req)
}
