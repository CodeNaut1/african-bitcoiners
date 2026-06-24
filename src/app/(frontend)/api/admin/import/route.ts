import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const VALID_COLLECTIONS = [
  'course-signups',
  'course-completions',
  'feedback-bounties',
  'vouchers',
  'form-submissions',
]

function str(v: unknown): string | undefined {
  const s = String(v ?? '').trim()
  return s === '' ? undefined : s
}

function num(v: unknown): number | undefined {
  if (v === '' || v === null || v === undefined) return undefined
  const n = Number(v)
  return isNaN(n) ? undefined : n
}

function dateStr(v: unknown): string | undefined {
  const s = str(v)
  if (!s || s === '0000-00-00 00:00:00') return undefined
  const d = new Date(s)
  return isNaN(d.getTime()) ? undefined : d.toISOString()
}

function mapRow(collection: string, row: Record<string, unknown>): Record<string, unknown> {
  const r = (k: string) => str(row[k])

  switch (collection) {
    case 'course-signups':
      return {
        name: r('name') ?? r('full_name') ?? 'Unknown',
        email: r('email'),
        country: r('country'),
        uniqueCode: r('unique_code') ?? r('code'),
        utmCampaign: r('utm_campaign'),
        tierLevel: r('tier_level') ?? r('tier') ?? 'ba',
        courseLang: r('course_lang') ?? r('language') ?? 'English',
        deliveryMethod: r('delivery_method') ?? r('delivery') ?? 'email',
        ipAddress: r('ip_address') ?? r('ip'),
        signupDate: dateStr(row['signup_date'] ?? row['created_at'] ?? row['date']) ?? new Date().toISOString(),
      }

    case 'course-completions':
      return {
        name: r('name') ?? r('full_name') ?? 'Unknown',
        email: r('email'),
        score: num(row['score']),
        scorePercent: num(row['score_percent'] ?? row['score_percentage'] ?? row['percent']),
        certNumber: r('cert_number') ?? r('certificate_number'),
        certHash: r('cert_hash') ?? r('certificate_hash'),
        uniqueCode: r('unique_code') ?? r('code'),
        courseLang: r('course_lang') ?? r('language') ?? 'English',
        tierLevel: r('tier_level') ?? r('tier') ?? 'ba',
        certDownloaded: row['cert_downloaded'] === '1' || row['cert_downloaded'] === true,
        downloadCount: num(row['download_count']) ?? 0,
        tbtDiscountSent: row['tbt_discount_sent'] === '1' || row['tbt_discount_sent'] === true,
        completionDate: dateStr(row['completion_date'] ?? row['completed_at'] ?? row['date']) ?? new Date().toISOString(),
        ipAddress: r('ip_address') ?? r('ip'),
      }

    case 'feedback-bounties': {
      const status = r('status') ?? 'Pending'
      const valid = ['Pending', 'Under review', 'Accepted', 'Not accepted', 'Idea', 'Implemented']
      return {
        name: r('name') ?? 'Unknown',
        email: r('email'),
        feedbackTitle: r('feedback_title') ?? r('title') ?? 'Imported Feedback',
        category: r('category'),
        description: r('description') ?? r('feedback') ?? r('content'),
        feedbackBefore: r('feedback_before') === 'yes' || r('feedback_before') === '1' ? 'yes' : 'no',
        status: valid.includes(status) ? status : 'Pending',
        rewardStatus: r('reward_status') ?? 'Pending',
        implementationDate: dateStr(row['implementation_date']),
        lastActivity: dateStr(row['last_activity'] ?? row['updated_at']) ?? new Date().toISOString(),
      }
    }

    case 'vouchers':
      return {
        voucherCode: r('voucher_code') ?? r('code') ?? r('lnurl') ?? '',
        sentTo: r('sent_to') ?? r('email'),
        sentDate: dateStr(row['sent_date'] ?? row['sent_at']),
      }

    case 'form-submissions': {
      const data: Record<string, unknown> = {}
      for (const [k, v] of Object.entries(row)) {
        if (!['form_id', 'ip', 'date_created', 'date_updated', 'status', 'form_name', 'form_slug'].includes(k)) {
          data[k] = v
        }
      }
      return {
        formName: r('form_name') ?? r('form') ?? `Form`,
        formSlug: r('form_slug') ?? r('form_id') ? `form-${r('form_id')}` : undefined,
        data,
        submittedAt: dateStr(row['submitted_at'] ?? row['date_created'] ?? row['created_at']) ?? new Date().toISOString(),
        ipAddress: r('ip_address') ?? r('ip'),
        status: r('status') === 'spam' ? 'spam' : r('status') === 'trash' ? 'trash' : 'active',
      }
    }

    default:
      throw new Error(`Unknown collection: ${collection}`)
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })

    // Verify admin role from session
    const { user } = await payload.auth({ headers: req.headers })
    if (!user || (user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await req.json() as {
      collection: string
      rows: Record<string, unknown>[]
      preview?: boolean
    }

    const { collection, rows, preview = false } = body

    if (!VALID_COLLECTIONS.includes(collection)) {
      return NextResponse.json({ error: `Invalid collection: ${collection}` }, { status: 400 })
    }

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: 'No rows provided' }, { status: 400 })
    }

    // Preview mode: just map and return first 5
    if (preview) {
      const preview5 = rows.slice(0, 5).map((row, i) => {
        try {
          return { row: i + 1, data: mapRow(collection, row), error: null }
        } catch (err) {
          return { row: i + 1, data: null, error: err instanceof Error ? err.message : String(err) }
        }
      })
      return NextResponse.json({ preview: preview5 })
    }

    // Execute import
    let imported = 0
    let skipped = 0
    const errors: Array<{ row: number; error: string }> = []

    for (let i = 0; i < rows.length; i++) {
      try {
        const data = mapRow(collection, rows[i]!)

        // Duplicate check for cert numbers
        if (collection === 'course-completions' && data['certNumber']) {
          const r = await payload.find({
            collection: collection as any,
            where: { certNumber: { equals: data['certNumber'] } },
            limit: 1,
            overrideAccess: true,
          })
          if (r.totalDocs > 0) { skipped++; continue }
        }

        await payload.create({
          collection: collection as any,
          data: data as any,
          overrideAccess: true,
        })
        imported++
      } catch (err) {
        errors.push({ row: i + 1, error: err instanceof Error ? err.message : String(err) })
      }
    }

    return NextResponse.json({ imported, skipped, errors, total: rows.length })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Internal error' }, { status: 500 })
  }
}
