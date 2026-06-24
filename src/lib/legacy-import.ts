import type { Payload } from 'payload'

export const IMPORT_COLLECTIONS = [
  { slug: 'course-signups', label: 'Course Signups (wp_bitcoin_course_signup)' },
  { slug: 'course-completions', label: 'Course Completions (wp_bitcoin_course_completion)' },
  { slug: 'feedback-bounties', label: 'Feedback Bounties (wp_feedback_bounty)' },
  { slug: 'vouchers', label: 'Vouchers (wp_feedback_bounty_vouchers)' },
  { slug: 'form-submissions', label: 'Form Submissions (Gravity Forms JSON)' },
] as const

export type ImportCollectionSlug = (typeof IMPORT_COLLECTIONS)[number]['slug']

export const IMPORT_COLLECTION_FIELDS: Record<ImportCollectionSlug, string[]> = {
  'course-signups': [
    'name',
    'email',
    'country',
    'uniqueCode',
    'utmCampaign',
    'tierLevel',
    'courseLang',
    'deliveryMethod',
    'ipAddress',
    'signupDate',
  ],
  'course-completions': [
    'name',
    'email',
    'score',
    'scorePercent',
    'certNumber',
    'certHash',
    'uniqueCode',
    'courseLang',
    'tierLevel',
    'utmCampaign',
    'certDownloaded',
    'downloadCount',
    'tbtDiscountSent',
    'completionDate',
    'ipAddress',
  ],
  'feedback-bounties': [
    'name',
    'email',
    'feedbackTitle',
    'category',
    'description',
    'feedbackBefore',
    'status',
    'rewardStatus',
    'implementationDate',
    'lastActivity',
  ],
  vouchers: ['voucherCode', 'sentTo', 'sentDate'],
  'form-submissions': ['formName', 'formSlug', 'submittedAt', 'ipAddress', 'status'],
}

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

export function remapRow(
  row: Record<string, unknown>,
  columnMap?: Record<string, string>,
): Record<string, unknown> {
  if (!columnMap || Object.keys(columnMap).length === 0) return row

  const remapped: Record<string, unknown> = { ...row }
  for (const [targetField, sourceCol] of Object.entries(columnMap)) {
    if (sourceCol && row[sourceCol] !== undefined) {
      remapped[targetField] = row[sourceCol]
    }
  }
  return remapped
}

export function autoDetectColumnMap(
  headers: string[],
  targetFields: string[],
): Record<string, string> {
  const map: Record<string, string> = {}
  const aliases: Record<string, string[]> = {
    name: ['name', 'full_name', 'first_name'],
    email: ['email', 'email_address'],
    uniqueCode: ['unique_code', 'uniquecode', 'code'],
    certNumber: ['cert_number', 'certificate_number', 'certnumber'],
    certHash: ['cert_hash', 'certificate_hash', 'hash'],
    signupDate: ['signup_date', 'created_at', 'date'],
    completionDate: ['completion_date', 'completed_at', 'date'],
    voucherCode: ['voucher_code', 'code', 'lnurl'],
    feedbackTitle: ['feedback_title', 'title', 'subject'],
    formName: ['form_name', 'form'],
    formSlug: ['form_slug', 'form_id'],
    submittedAt: ['submitted_at', 'date_created', 'created_at'],
    ipAddress: ['ip_address', 'ip'],
  }

  for (const field of targetFields) {
    const candidates = [field, field.replace(/([A-Z])/g, '_$1').toLowerCase(), ...(aliases[field] ?? [])]
    const match = headers.find((h) =>
      candidates.some((c) => h.toLowerCase().replace(/_/g, '') === c.toLowerCase().replace(/_/g, '')),
    )
    if (match) map[field] = match
  }

  return map
}

export function mapImportRow(
  collection: string,
  row: Record<string, unknown>,
  columnMap?: Record<string, string>,
): Record<string, unknown> {
  const r = (k: string) => str((remapRow(row, columnMap) as Record<string, unknown>)[k])

  switch (collection) {
    case 'course-signups':
      return {
        name: r('name') ?? r('full_name') ?? 'Unknown',
        email: r('email'),
        country: r('country'),
        uniqueCode: r('uniqueCode') ?? r('unique_code') ?? r('code'),
        utmCampaign: r('utmCampaign') ?? r('utm_campaign'),
        tierLevel: r('tierLevel') ?? r('tier_level') ?? r('tier') ?? 'ba',
        courseLang: r('courseLang') ?? r('course_lang') ?? r('language') ?? 'English',
        deliveryMethod: r('deliveryMethod') ?? r('delivery_method') ?? r('delivery') ?? 'email',
        ipAddress: r('ipAddress') ?? r('ip_address') ?? r('ip'),
        signupDate:
          dateStr(remapRow(row, columnMap)['signupDate'] ?? row['signup_date'] ?? row['created_at'] ?? row['date']) ??
          new Date().toISOString(),
      }

    case 'course-completions':
      return {
        name: r('name') ?? r('full_name') ?? 'Unknown',
        email: r('email'),
        score: num(remapRow(row, columnMap)['score'] ?? row['score']),
        scorePercent: num(
          remapRow(row, columnMap)['scorePercent'] ?? row['score_percent'] ?? row['score_percentage'] ?? row['percent'],
        ),
        certNumber: r('certNumber') ?? r('cert_number') ?? r('certificate_number'),
        certHash: r('certHash') ?? r('cert_hash') ?? r('certificate_hash'),
        uniqueCode: r('uniqueCode') ?? r('unique_code') ?? r('code'),
        courseLang: r('courseLang') ?? r('course_lang') ?? r('language') ?? 'English',
        tierLevel: r('tierLevel') ?? r('tier_level') ?? r('tier') ?? 'ba',
        utmCampaign: r('utmCampaign') ?? r('utm_campaign'),
        certDownloaded:
          remapRow(row, columnMap)['certDownloaded'] === '1' ||
          remapRow(row, columnMap)['certDownloaded'] === true ||
          row['cert_downloaded'] === '1',
        downloadCount: num(remapRow(row, columnMap)['downloadCount'] ?? row['download_count']) ?? 0,
        tbtDiscountSent:
          remapRow(row, columnMap)['tbtDiscountSent'] === '1' ||
          remapRow(row, columnMap)['tbtDiscountSent'] === true ||
          row['tbt_discount_sent'] === '1',
        completionDate:
          dateStr(
            remapRow(row, columnMap)['completionDate'] ??
              row['completion_date'] ??
              row['completed_at'] ??
              row['date'],
          ) ?? new Date().toISOString(),
        ipAddress: r('ipAddress') ?? r('ip_address') ?? r('ip'),
      }

    case 'feedback-bounties': {
      const status = r('status') ?? 'Pending'
      const valid = ['Pending', 'Under review', 'Accepted', 'Not accepted', 'Idea', 'Implemented']
      return {
        name: r('name') ?? 'Unknown',
        email: r('email'),
        feedbackTitle: r('feedbackTitle') ?? r('feedback_title') ?? r('title') ?? 'Imported Feedback',
        category: r('category'),
        description: r('description') ?? r('feedback') ?? r('content'),
        feedbackBefore:
          r('feedbackBefore') === 'yes' || r('feedback_before') === '1' || r('feedback_before') === 'yes'
            ? 'yes'
            : 'no',
        status: valid.includes(status) ? status : 'Pending',
        rewardStatus: r('rewardStatus') ?? r('reward_status') ?? 'Pending',
        implementationDate: dateStr(remapRow(row, columnMap)['implementationDate'] ?? row['implementation_date']),
        lastActivity:
          dateStr(remapRow(row, columnMap)['lastActivity'] ?? row['last_activity'] ?? row['updated_at']) ??
          new Date().toISOString(),
      }
    }

    case 'vouchers':
      return {
        voucherCode: r('voucherCode') ?? r('voucher_code') ?? r('code') ?? r('lnurl') ?? '',
        sentTo: r('sentTo') ?? r('sent_to') ?? r('email'),
        sentDate: dateStr(remapRow(row, columnMap)['sentDate'] ?? row['sent_date'] ?? row['sent_at']),
      }

    case 'form-submissions': {
      const source = remapRow(row, columnMap)
      if (typeof source === 'object' && source !== null && 'form_id' in source) {
        const data: Record<string, unknown> = {}
        for (const [k, v] of Object.entries(source)) {
          if (!['id', 'form_id', 'ip', 'date_created', 'date_updated', 'status'].includes(k)) {
            data[k] = v
          }
        }
        return {
          formName: r('formName') ?? `Gravity Form #${source['form_id']}`,
          formSlug: r('formSlug') ?? `gravity-form-${source['form_id']}`,
          data,
          submittedAt: dateStr(source['submittedAt'] ?? source['date_created']) ?? new Date().toISOString(),
          ipAddress: r('ipAddress') ?? str(source['ip']),
          status:
            source['status'] === 'spam' ? 'spam' : source['status'] === 'trash' ? 'trash' : 'active',
        }
      }

      const data: Record<string, unknown> = {}
      for (const [k, v] of Object.entries(source)) {
        if (!['form_name', 'form_slug', 'submitted_at', 'created_at', 'ip_address', 'ip', 'status'].includes(k)) {
          data[k] = v
        }
      }
      return {
        formName: r('formName') ?? r('form_name') ?? r('form') ?? 'Imported Form',
        formSlug: r('formSlug') ?? r('form_slug'),
        data,
        submittedAt:
          dateStr(source['submittedAt'] ?? source['submitted_at'] ?? source['date_created'] ?? source['created_at']) ??
          new Date().toISOString(),
        ipAddress: r('ipAddress') ?? r('ip_address') ?? r('ip'),
        status: r('status') === 'spam' ? 'spam' : r('status') === 'trash' ? 'trash' : 'active',
      }
    }

    default:
      throw new Error(`Unknown collection: ${collection}`)
  }
}

export async function importRowExists(
  payload: Payload,
  collection: string,
  data: Record<string, unknown>,
): Promise<boolean> {
  if (collection === 'course-completions' && data['certNumber']) {
    const r = await payload.find({
      collection: 'course-completions',
      where: { certNumber: { equals: data['certNumber'] as string } },
      limit: 1,
      overrideAccess: true,
    })
    return r.totalDocs > 0
  }
  if (collection === 'course-signups' && data['email']) {
    const r = await payload.find({
      collection: 'course-signups',
      where: { email: { equals: data['email'] as string } },
      limit: 1,
      overrideAccess: true,
    })
    return r.totalDocs > 0
  }
  if (collection === 'vouchers' && data['voucherCode']) {
    const r = await payload.find({
      collection: 'vouchers',
      where: { voucherCode: { equals: data['voucherCode'] as string } },
      limit: 1,
      overrideAccess: true,
    })
    return r.totalDocs > 0
  }
  return false
}
