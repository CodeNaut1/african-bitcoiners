/**
 * import-legacy-data.ts
 *
 * CLI script for importing legacy WordPress database exports into Payload collections.
 *
 * Supported collections and their expected CSV/JSON column mappings:
 *   --collection course-signups       (wp_bitcoin_course_signup)
 *   --collection course-completions   (wp_bitcoin_course_completion)
 *   --collection feedback-bounties    (wp_feedback_bounty)
 *   --collection vouchers             (wp_feedback_bounty_vouchers)
 *   --collection form-submissions     (Gravity Forms JSON export)
 *
 * Usage:
 *   pnpm exec tsx --env-file=.env scripts/import-legacy-data.ts \
 *     --collection course-signups \
 *     --file scripts/exports/course_signups.csv \
 *     --format csv
 *
 *   pnpm exec tsx --env-file=.env scripts/import-legacy-data.ts \
 *     --collection course-completions \
 *     --file scripts/exports/course_completions.csv \
 *     --format csv
 *
 *   pnpm exec tsx --env-file=.env scripts/import-legacy-data.ts \
 *     --collection form-submissions \
 *     --file scripts/exports/gravity_forms.json \
 *     --format json
 *
 * Flags:
 *   --dry-run   Parse and validate but do not write to DB
 *   --force     Re-import even if record appears to exist (matches on email+date or certNumber)
 */

import { getPayload } from 'payload'
import config from '@/payload.config'
import fs from 'fs'

// ── Arg parsing ───────────────────────────────────────────────────────────────

const args = process.argv.slice(2)
function getArg(name: string): string | undefined {
  const idx = args.indexOf(`--${name}`)
  return idx !== -1 ? args[idx + 1] : undefined
}

const COLLECTION = getArg('collection')
const FILE = getArg('file')
const FORMAT = (getArg('format') ?? 'csv') as 'csv' | 'json'
const DRY_RUN = args.includes('--dry-run')
const FORCE = args.includes('--force')

if (!COLLECTION || !FILE) {
  console.error('Usage: --collection <slug> --file <path> [--format csv|json] [--dry-run] [--force]')
  console.error('Valid collections: course-signups, course-completions, feedback-bounties, vouchers, form-submissions')
  process.exit(1)
}

if (!fs.existsSync(FILE)) {
  console.error(`File not found: ${FILE}`)
  process.exit(1)
}

// ── CSV parser (no external dep) ──────────────────────────────────────────────

function parseCsv(text: string): Record<string, string>[] {
  const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n')
  if (lines.length < 2) return []

  const headers = parseCsvLine(lines[0]!)
  const rows: Record<string, string>[] = []

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]!.trim()
    if (!line) continue
    const values = parseCsvLine(line)
    const row: Record<string, string> = {}
    headers.forEach((h, idx) => { row[h.trim()] = (values[idx] ?? '').trim() })
    rows.push(row)
  }

  return rows
}

function parseCsvLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]!
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++ }
      else inQuotes = !inQuotes
    } else if (ch === ',' && !inQuotes) {
      result.push(current); current = ''
    } else {
      current += ch
    }
  }
  result.push(current)
  return result
}

// ── Field mappers ─────────────────────────────────────────────────────────────

function str(v: string | undefined): string | undefined {
  const s = v?.trim()
  return s === '' || s === undefined ? undefined : s
}

function num(v: string | undefined): number | undefined {
  if (!v?.trim()) return undefined
  const n = Number(v.trim())
  return isNaN(n) ? undefined : n
}

function dateStr(v: string | undefined): string | undefined {
  if (!v?.trim() || v.trim() === '0000-00-00 00:00:00') return undefined
  const d = new Date(v.trim())
  return isNaN(d.getTime()) ? undefined : d.toISOString()
}

function mapCourseSignup(row: Record<string, string>) {
  return {
    name: str(row['name'] ?? row['full_name'] ?? row['first_name']) ?? 'Unknown',
    email: str(row['email']),
    country: str(row['country']),
    uniqueCode: str(row['unique_code'] ?? row['uniquecode'] ?? row['code']),
    utmCampaign: str(row['utm_campaign'] ?? row['utmcampaign']),
    tierLevel: (str(row['tier_level'] ?? row['tier'] ?? row['tierlevel']) ?? 'ba') as 'ba' | 'ad' | 'pr',
    courseLang: (str(row['course_lang'] ?? row['language'] ?? row['lang']) ?? 'English') as 'English' | 'French',
    deliveryMethod: (str(row['delivery_method'] ?? row['delivery'] ?? row['method']) ?? 'email') as 'email' | 'telegram',
    ipAddress: str(row['ip_address'] ?? row['ip']),
    signupDate: dateStr(row['signup_date'] ?? row['created_at'] ?? row['date']) ?? new Date().toISOString(),
  }
}

function mapCourseCompletion(row: Record<string, string>) {
  return {
    name: str(row['name'] ?? row['full_name']) ?? 'Unknown',
    email: str(row['email']),
    score: num(row['score']),
    scorePercent: num(row['score_percent'] ?? row['score_percentage'] ?? row['percent']),
    certNumber: str(row['cert_number'] ?? row['certificate_number'] ?? row['certnumber']),
    certHash: str(row['cert_hash'] ?? row['certificate_hash'] ?? row['hash']),
    uniqueCode: str(row['unique_code'] ?? row['code']),
    courseLang: (str(row['course_lang'] ?? row['language'] ?? row['lang']) ?? 'English') as 'English' | 'French',
    tierLevel: (str(row['tier_level'] ?? row['tier']) ?? 'ba') as 'ba' | 'ad' | 'pr',
    utmCampaign: str(row['utm_campaign']),
    certDownloaded: row['cert_downloaded'] === '1' || row['cert_downloaded'] === 'true',
    downloadCount: num(row['download_count']) ?? 0,
    tbtDiscountSent: row['tbt_discount_sent'] === '1' || row['tbt_discount_sent'] === 'true',
    completionDate: dateStr(row['completion_date'] ?? row['completed_at'] ?? row['date']) ?? new Date().toISOString(),
    ipAddress: str(row['ip_address'] ?? row['ip']),
  }
}

function mapFeedbackBounty(row: Record<string, string>) {
  const status = str(row['status']) ?? 'Pending'
  const validStatuses = ['Pending', 'Under review', 'Accepted', 'Not accepted', 'Idea', 'Implemented']
  return {
    name: str(row['name']) ?? 'Unknown',
    email: str(row['email']),
    feedbackTitle: str(row['feedback_title'] ?? row['title'] ?? row['subject']) ?? 'Imported Feedback',
    category: str(row['category']),
    description: str(row['description'] ?? row['feedback'] ?? row['content']),
    feedbackBefore: (str(row['feedback_before']) === 'yes' || str(row['feedback_before']) === '1') ? 'yes' as const : 'no' as const,
    status: validStatuses.includes(status) ? status : 'Pending',
    rewardStatus: str(row['reward_status'] ?? row['reward']) ?? 'Pending',
    implementationDate: dateStr(row['implementation_date']),
    lastActivity: dateStr(row['last_activity'] ?? row['updated_at']) ?? new Date().toISOString(),
  }
}

function mapVoucher(row: Record<string, string>) {
  return {
    voucherCode: str(row['voucher_code'] ?? row['code'] ?? row['lnurl']) ?? '',
    sentTo: str(row['sent_to'] ?? row['email']),
    sentDate: dateStr(row['sent_date'] ?? row['sent_at']),
  }
}

function mapFormSubmission(row: Record<string, unknown>) {
  // Gravity Forms JSON export format
  if (typeof row === 'object' && row !== null && 'form_id' in row) {
    const gf = row as Record<string, unknown>
    const data: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(gf)) {
      if (!['id', 'form_id', 'ip', 'date_created', 'date_updated', 'status'].includes(k)) {
        data[k] = v
      }
    }
    return {
      formName: `Gravity Form #${gf['form_id']}`,
      formSlug: `gravity-form-${gf['form_id']}`,
      data,
      submittedAt: dateStr(String(gf['date_created'] ?? '')) ?? new Date().toISOString(),
      ipAddress: str(String(gf['ip'] ?? '')),
      status: gf['status'] === 'spam' ? 'spam' as const : gf['status'] === 'trash' ? 'trash' as const : 'active' as const,
    }
  }
  // Generic CSV row → form submission
  const csvRow = row as Record<string, string>
  return {
    formName: str(csvRow['form_name'] ?? csvRow['form']) ?? 'Imported Form',
    formSlug: str(csvRow['form_slug']),
    data: row,
    submittedAt: dateStr(csvRow['submitted_at'] ?? csvRow['created_at']) ?? new Date().toISOString(),
    ipAddress: str(csvRow['ip_address'] ?? csvRow['ip']),
    status: 'active' as const,
  }
}

// ── Duplicate check ───────────────────────────────────────────────────────────

async function alreadyExists(payload: Awaited<ReturnType<typeof getPayload>>, collection: string, data: Record<string, unknown>): Promise<boolean> {
  if (collection === 'course-completions' && data['certNumber']) {
    const r = await payload.find({
      collection: collection as any,
      where: { certNumber: { equals: data['certNumber'] } },
      limit: 1,
      overrideAccess: true,
    })
    return r.totalDocs > 0
  }
  if ((collection === 'course-signups') && data['email']) {
    const r = await payload.find({
      collection: collection as any,
      where: { email: { equals: data['email'] } },
      limit: 1,
      overrideAccess: true,
    })
    return r.totalDocs > 0
  }
  if (collection === 'vouchers' && data['voucherCode']) {
    const r = await payload.find({
      collection: collection as any,
      where: { voucherCode: { equals: data['voucherCode'] } },
      limit: 1,
      overrideAccess: true,
    })
    return r.totalDocs > 0
  }
  return false
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\nLegacy Data Import`)
  console.log(`  Collection : ${COLLECTION}`)
  console.log(`  File       : ${FILE}`)
  console.log(`  Format     : ${FORMAT}`)
  console.log(`  Mode       : ${DRY_RUN ? 'dry-run' : 'live'}${FORCE ? ' + force' : ''}\n`)

  const raw = fs.readFileSync(FILE!, 'utf-8')
  let rows: Record<string, unknown>[]

  if (FORMAT === 'json') {
    const parsed = JSON.parse(raw)
    rows = Array.isArray(parsed) ? parsed : [parsed]
  } else {
    rows = parseCsv(raw) as Record<string, unknown>[]
  }

  console.log(`  Parsed ${rows.length} row(s)\n`)

  if (rows.length === 0) {
    console.log('Nothing to import.')
    process.exit(0)
  }

  const payload = await getPayload({ config })

  let imported = 0
  let skipped = 0
  let failed = 0
  const errors: Array<{ row: number; error: string }> = []

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]! as Record<string, string>
    let data: Record<string, unknown>

    try {
      switch (COLLECTION) {
        case 'course-signups':      data = mapCourseSignup(row);      break
        case 'course-completions':  data = mapCourseCompletion(row);   break
        case 'feedback-bounties':   data = mapFeedbackBounty(row);     break
        case 'vouchers':            data = mapVoucher(row);            break
        case 'form-submissions':    data = mapFormSubmission(row as unknown as Record<string, unknown>); break
        default:
          console.error(`Unknown collection: ${COLLECTION}`)
          process.exit(1)
      }

      if (!FORCE) {
        const exists = await alreadyExists(payload, COLLECTION!, data)
        if (exists) { skipped++; continue }
      }

      if (DRY_RUN) {
        console.log(`  [row ${i + 1}] would import:`, JSON.stringify(data).slice(0, 120))
        imported++
        continue
      }

      await payload.create({
        collection: COLLECTION as any,
        data: data as any,
        overrideAccess: true,
      })

      imported++
      if (imported % 50 === 0) process.stdout.write(`  Imported ${imported}/${rows.length}...\r`)

    } catch (err: unknown) {
      failed++
      const msg = err instanceof Error ? err.message : String(err)
      errors.push({ row: i + 1, error: msg })
      if (failed <= 5) console.error(`  [row ${i + 1}] ERROR: ${msg}`)
    }
  }

  console.log(`
─────────────────────────────────────────
Imported : ${imported}
Skipped  : ${skipped}
Failed   : ${failed}
`)

  if (errors.length > 0) {
    console.log('First errors:')
    errors.slice(0, 10).forEach(e => console.log(`  row ${e.row}: ${e.error}`))
  }

  await payload.db.destroy?.()
  process.exit(failed > 0 ? 1 : 0)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
