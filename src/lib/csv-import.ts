import type { Payload } from 'payload'
import Papa from 'papaparse'
import {
  autoDetectColumnMap,
  importRowExists,
  mapImportRow,
  type ImportCollectionSlug,
} from '@/lib/legacy-import'

export const CSV_IMPORT_COLLECTIONS = [
  { slug: 'vouchers', label: 'Vouchers' },
  { slug: 'course-signups', label: 'Course Signups' },
  { slug: 'course-completions', label: 'Course Completions' },
  { slug: 'feedback-bounties', label: 'Feedback Bounties' },
  { slug: 'form-submissions', label: 'Form Submissions' },
  { slug: 'jobs', label: 'Jobs' },
  { slug: 'mining-orgs', label: 'Mining Orgs' },
  { slug: 'map-locations', label: 'Map Locations' },
  { slug: 'meetup-submissions', label: 'Meetup Submissions' },
  { slug: 'miab-nominees', label: 'MIAB Nominees' },
] as const

export type CsvImportCollectionSlug = (typeof CSV_IMPORT_COLLECTIONS)[number]['slug']

export const CSV_IMPORT_FIELDS: Record<CsvImportCollectionSlug, string[]> = {
  vouchers: ['voucherCode', 'sentTo', 'sentDate'],
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
  ],
  'form-submissions': ['formName', 'formSlug', 'submittedAt', 'ipAddress', 'status', 'data'],
  jobs: [
    'title',
    'company',
    'companyDescription',
    'websiteURL',
    'location',
    'type',
    'description',
    'contactEmail',
    'contactName',
    'isActive',
    'postedDate',
    'shareButtonId',
  ],
  'mining-orgs': [
    'name',
    'country',
    'countryFlagCode',
    'city',
    'description',
    'founderName',
    'contactPerson',
    'contactEmail',
    'websiteURL',
    'twitterURL',
    'isActive',
  ],
  'map-locations': [
    'merchantName',
    'description',
    'websiteURL',
    'address',
    'email',
    'phone',
    'acceptsLightning',
    'category',
    'latitude',
    'longitude',
  ],
  'meetup-submissions': [
    'meetupName',
    'description',
    'location',
    'startDate',
    'endDate',
    'time',
    'contactName',
    'contactEmail',
    'status',
  ],
  'miab-nominees': ['year', 'rank', 'name', 'country', 'countryFlagEmoji', 'bio', 'isPublished'],
}

export const CSV_IMPORT_BATCH_SIZE = 50

function str(v: unknown): string | undefined {
  const s = String(v ?? '').trim()
  return s === '' ? undefined : s
}

function num(v: unknown): number | undefined {
  if (v === '' || v === null || v === undefined) return undefined
  const n = Number(v)
  return Number.isNaN(n) ? undefined : n
}

function bool(v: unknown): boolean {
  if (v === true || v === 1) return true
  const s = String(v ?? '').trim().toLowerCase()
  return s === '1' || s === 'true' || s === 'yes' || s === 'y'
}

function dateStr(v: unknown): string | undefined {
  const s = str(v)
  if (!s || s === '0000-00-00 00:00:00') return undefined
  const d = new Date(s)
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString()
}

function textToLexical(text: string) {
  return {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text,
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
          textFormat: 0,
          textStyle: '',
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  }
}

function remapRow(row: Record<string, unknown>, columnMap?: Record<string, string>): Record<string, unknown> {
  if (!columnMap || Object.keys(columnMap).length === 0) return row

  const remapped: Record<string, unknown> = { ...row }
  for (const [targetField, sourceCol] of Object.entries(columnMap)) {
    if (sourceCol && row[sourceCol] !== undefined) {
      remapped[targetField] = row[sourceCol]
    }
  }
  return remapped
}

function r(row: Record<string, unknown>, columnMap: Record<string, string> | undefined, key: string): string | undefined {
  return str(remapRow(row, columnMap)[key])
}

export function parseCsvText(text: string): { headers: string[]; rows: Record<string, string>[] } {
  const parsed = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  })

  if (parsed.errors.length > 0) {
    const message = parsed.errors.map((e) => e.message).join('; ')
    throw new Error(message || 'Failed to parse CSV')
  }

  const headers = parsed.meta.fields?.map((h) => h.trim()).filter(Boolean) ?? []
  const rows = (parsed.data ?? []).filter((row) =>
    Object.values(row).some((value) => String(value ?? '').trim() !== ''),
  )

  return { headers, rows }
}

export function autoDetectHeaderMap(headers: string[], targetFields: string[]): Record<string, string> {
  const fieldToHeader = autoDetectColumnMap(headers, targetFields)
  const headerMap: Record<string, string> = {}

  for (const header of headers) {
    const matchedField = Object.entries(fieldToHeader).find(([, sourceHeader]) => sourceHeader === header)?.[0]
    if (matchedField) headerMap[header] = matchedField
  }

  return headerMap
}

export function headerMapToFieldMap(headerMap: Record<string, string>): Record<string, string> {
  const fieldMap: Record<string, string> = {}
  for (const [header, field] of Object.entries(headerMap)) {
    if (field) fieldMap[field] = header
  }
  return fieldMap
}

export function mapCsvImportRow(
  collection: string,
  row: Record<string, unknown>,
  columnMap?: Record<string, string>,
): Record<string, unknown> {
  const legacyCollections: ImportCollectionSlug[] = [
    'course-signups',
    'course-completions',
    'feedback-bounties',
    'vouchers',
    'form-submissions',
  ]

  if (legacyCollections.includes(collection as ImportCollectionSlug)) {
    const data = mapImportRow(collection, row, columnMap)
    if (collection === 'form-submissions' && columnMap?.data) {
      const raw = str(remapRow(row, columnMap).data)
      if (raw) {
        try {
          data.data = JSON.parse(raw)
        } catch {
          data.data = { raw }
        }
      }
    }
    return data
  }

  const source = remapRow(row, columnMap)

  switch (collection as CsvImportCollectionSlug) {
    case 'jobs': {
      const description = r(row, columnMap, 'description')
      return {
        title: r(row, columnMap, 'title') ?? 'Untitled Job',
        company: r(row, columnMap, 'company') ?? 'Unknown',
        companyDescription: r(row, columnMap, 'companyDescription'),
        websiteURL: r(row, columnMap, 'websiteURL'),
        location: r(row, columnMap, 'location'),
        type: r(row, columnMap, 'type'),
        description: description ? textToLexical(description) : undefined,
        contactEmail: r(row, columnMap, 'contactEmail'),
        contactName: r(row, columnMap, 'contactName'),
        isActive: source.isActive !== undefined ? bool(source.isActive) : true,
        postedDate: dateStr(source.postedDate),
        shareButtonId: r(row, columnMap, 'shareButtonId'),
      }
    }

    case 'mining-orgs':
      return {
        name: r(row, columnMap, 'name') ?? 'Unknown',
        country: r(row, columnMap, 'country'),
        countryFlagCode: r(row, columnMap, 'countryFlagCode'),
        city: r(row, columnMap, 'city'),
        description: r(row, columnMap, 'description'),
        founderName: r(row, columnMap, 'founderName'),
        contactPerson: r(row, columnMap, 'contactPerson'),
        contactEmail: r(row, columnMap, 'contactEmail'),
        websiteURL: r(row, columnMap, 'websiteURL'),
        twitterURL: r(row, columnMap, 'twitterURL'),
        isActive: source.isActive !== undefined ? bool(source.isActive) : true,
      }

    case 'map-locations':
      return {
        merchantName: r(row, columnMap, 'merchantName') ?? 'Unknown Merchant',
        description: r(row, columnMap, 'description'),
        websiteURL: r(row, columnMap, 'websiteURL'),
        address: r(row, columnMap, 'address'),
        email: r(row, columnMap, 'email'),
        phone: r(row, columnMap, 'phone'),
        acceptsLightning: source.acceptsLightning !== undefined ? bool(source.acceptsLightning) : false,
        category: r(row, columnMap, 'category'),
        latitude: num(source.latitude),
        longitude: num(source.longitude),
      }

    case 'meetup-submissions':
      return {
        meetupName: r(row, columnMap, 'meetupName') ?? 'Untitled Meetup',
        description: r(row, columnMap, 'description'),
        location: r(row, columnMap, 'location'),
        startDate: dateStr(source.startDate),
        endDate: dateStr(source.endDate),
        time: r(row, columnMap, 'time'),
        contactName: r(row, columnMap, 'contactName'),
        contactEmail: r(row, columnMap, 'contactEmail'),
        status: r(row, columnMap, 'status') ?? 'pending',
      }

    case 'miab-nominees': {
      const bio = r(row, columnMap, 'bio')
      return {
        year: num(source.year) ?? new Date().getFullYear(),
        rank: num(source.rank) ?? 1,
        name: r(row, columnMap, 'name') ?? 'Unknown',
        country: r(row, columnMap, 'country'),
        countryFlagEmoji: r(row, columnMap, 'countryFlagEmoji'),
        bio: bio ? textToLexical(bio) : undefined,
        isPublished: source.isPublished !== undefined ? bool(source.isPublished) : false,
      }
    }

    default:
      throw new Error(`Unknown collection: ${collection}`)
  }
}

export async function csvImportRowExists(
  payload: Payload,
  collection: string,
  data: Record<string, unknown>,
): Promise<boolean> {
  const legacyCollections: ImportCollectionSlug[] = [
    'course-signups',
    'course-completions',
    'feedback-bounties',
    'vouchers',
    'form-submissions',
  ]

  if (legacyCollections.includes(collection as ImportCollectionSlug)) {
    if (collection === 'feedback-bounties' && data.email) {
      const result = await payload.find({
        collection: 'feedback-bounties',
        where: { email: { equals: data.email as string } },
        limit: 1,
        overrideAccess: true,
      })
      return result.totalDocs > 0
    }
    return importRowExists(payload, collection, data)
  }

  switch (collection as CsvImportCollectionSlug) {
    case 'jobs': {
      if (!data.title || !data.company) return false
      const result = await payload.find({
        collection: 'jobs',
        where: {
          and: [
            { title: { equals: data.title as string } },
            { company: { equals: data.company as string } },
          ],
        },
        limit: 1,
        overrideAccess: true,
      })
      return result.totalDocs > 0
    }

    case 'mining-orgs': {
      if (!data.name && !data.contactEmail) return false
      if (data.contactEmail) {
        const result = await payload.find({
          collection: 'mining-orgs',
          where: { contactEmail: { equals: data.contactEmail as string } },
          limit: 1,
          overrideAccess: true,
        })
        return result.totalDocs > 0
      }
      const result = await payload.find({
        collection: 'mining-orgs',
        where: {
          and: [
            { name: { equals: data.name as string } },
            ...(data.country ? [{ country: { equals: data.country as string } }] : []),
          ],
        },
        limit: 1,
        overrideAccess: true,
      })
      return result.totalDocs > 0
    }

    case 'map-locations': {
      if (data.email) {
        const result = await payload.find({
          collection: 'map-locations',
          where: { email: { equals: data.email as string } },
          limit: 1,
          overrideAccess: true,
        })
        return result.totalDocs > 0
      }
      if (data.merchantName) {
        const result = await payload.find({
          collection: 'map-locations',
          where: {
            and: [
              { merchantName: { equals: data.merchantName as string } },
              ...(data.address ? [{ address: { equals: data.address as string } }] : []),
            ],
          },
          limit: 1,
          overrideAccess: true,
        })
        return result.totalDocs > 0
      }
      return false
    }

    case 'meetup-submissions': {
      if (data.contactEmail) {
        const result = await payload.find({
          collection: 'meetup-submissions',
          where: {
            and: [
              { contactEmail: { equals: data.contactEmail as string } },
              ...(data.meetupName ? [{ meetupName: { equals: data.meetupName as string } }] : []),
            ],
          },
          limit: 1,
          overrideAccess: true,
        })
        return result.totalDocs > 0
      }
      return false
    }

    case 'miab-nominees': {
      if (data.year != null && data.rank != null) {
        const result = await payload.find({
          collection: 'miab-nominees',
          where: {
            and: [
              { year: { equals: data.year as number } },
              { rank: { equals: data.rank as number } },
            ],
          },
          limit: 1,
          overrideAccess: true,
        })
        return result.totalDocs > 0
      }
      return false
    }

    default:
      return false
  }
}

export function isValidCsvImportCollection(collection: string): collection is CsvImportCollectionSlug {
  return CSV_IMPORT_COLLECTIONS.some((entry) => entry.slug === collection)
}
