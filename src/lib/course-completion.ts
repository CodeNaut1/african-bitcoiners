import type { Payload } from 'payload'
import { sendEmail } from '@/lib/email'
import { buildCourseCompletionEmail } from '@/lib/email-templates/course-completion'
import {
  CERTIFICATE_ELIGIBILITY_DAYS,
  formatAvailableDate,
  getCertificateAvailableDate,
  normalizeCourseLanguage,
  type CertificateLanguage,
} from '@/lib/certificate-shared'
import { isExternalTier } from '@/lib/tbt-discounts-shared'

export type CourseCompletionRecord = {
  id: string | number
  name: string
  email?: string | null
  uniqueCode?: string | null
  score: number
  scorePercent: number
  certNumber: string
  certHash: string
  completionDate: string
  language?: CertificateLanguage | null
  tierLevel?: 'ba' | 'ad' | 'pr' | null
  tbtDiscountSent?: string | null
}

type SignupRecord = {
  name?: string
  email?: string | null
  uniqueCode?: string | null
  tierLevel?: 'ba' | 'ad' | 'pr' | null
  signupDate?: string
  courseLang?: string
}

export async function findCourseSignup(
  payload: Payload,
  email?: string,
  uniqueCode?: string,
): Promise<SignupRecord | null> {
  if (email) {
    const result = await payload.find({
      collection: 'course-signups',
      where: { email: { equals: email } },
      sort: '-signupDate',
      limit: 1,
      overrideAccess: true,
    })
    return (result.docs[0] as SignupRecord | undefined) ?? null
  }

  if (uniqueCode) {
    const result = await payload.find({
      collection: 'course-signups',
      where: { uniqueCode: { equals: uniqueCode } },
      limit: 1,
      overrideAccess: true,
    })
    return (result.docs[0] as SignupRecord | undefined) ?? null
  }

  return null
}

export async function findCourseCompletion(
  payload: Payload,
  email?: string,
  uniqueCode?: string,
): Promise<CourseCompletionRecord | null> {
  const where = email
    ? { email: { equals: email } }
    : uniqueCode
      ? { uniqueCode: { equals: uniqueCode } }
      : null

  if (!where) return null

  const result = await payload.find({
    collection: 'course-completions',
    where: where as never,
    sort: '-completionDate',
    limit: 1,
    overrideAccess: true,
  })

  const doc = result.docs[0] as CourseCompletionRecord | undefined
  return doc ?? null
}

export type EligibilityResult =
  | { eligible: true }
  | { eligible: false; availableDate: string }

export async function checkCertificateEligibility(
  payload: Payload,
  email?: string,
  uniqueCode?: string,
): Promise<EligibilityResult> {
  const signup = await findCourseSignup(payload, email, uniqueCode)
  if (!signup?.signupDate) {
    return { eligible: true }
  }

  const availableDate = getCertificateAvailableDate(signup.signupDate)
  if (Date.now() < availableDate.getTime()) {
    return { eligible: false, availableDate: formatAvailableDate(availableDate) }
  }

  return { eligible: true }
}

export type CreateCompletionInput = {
  email?: string
  uniqueCode?: string
  name?: string
  score: number
  scorePercent: number
  language?: string
  ipAddress?: string
}

export async function createOrGetCourseCompletion(
  payload: Payload,
  input: CreateCompletionInput,
): Promise<CourseCompletionRecord> {
  const existing = await findCourseCompletion(payload, input.email, input.uniqueCode)
  if (existing) return existing

  const signup = await findCourseSignup(payload, input.email, input.uniqueCode)
  const language = normalizeCourseLanguage(input.language ?? signup?.courseLang)

  const created = await payload.create({
    collection: 'course-completions',
    data: {
      name: input.name ?? signup?.name ?? 'Course Participant',
      email: input.email ?? signup?.email ?? undefined,
      uniqueCode: input.uniqueCode ?? signup?.uniqueCode ?? undefined,
      score: input.score,
      scorePercent: input.scorePercent,
      language,
      tierLevel: signup?.tierLevel ?? 'ba',
      completionDate: new Date().toISOString(),
      ipAddress: input.ipAddress,
    },
    overrideAccess: true,
  })

  return created as CourseCompletionRecord
}

async function assignTbtDiscountCode(payload: Payload, email: string): Promise<string | null> {
  const available = await payload.find({
    collection: 'tbt-discounts',
    where: { usedByEmail: { exists: false } },
    limit: 1,
    overrideAccess: true,
  })

  const discount = available.docs[0] as { id: string | number; discountCode?: string } | undefined
  if (!discount?.discountCode) return null

  await payload.update({
    collection: 'tbt-discounts',
    id: discount.id,
    data: { usedByEmail: email },
    overrideAccess: true,
  })

  return discount.discountCode
}

export async function sendCourseCompletionEmail(params: {
  email: string
  name: string
  uniqueCode?: string | null
  tbtDiscount?: string | null
}): Promise<void> {
  const { subject, html } = buildCourseCompletionEmail(params)
  await sendEmail([params.email], subject, html)
}

export async function sendCertificateDownloadTeamNotification(name: string): Promise<void> {
  const { COMMUNITY_TEAM } = await import('@/lib/email-config')
  const { wrapEmail } = await import('@/lib/email-templates/wrapper')
  if (!COMMUNITY_TEAM.length) return

  const body = `<p>Name: ${name} has successfully downloaded their certificate.</p>`
  await sendEmail(
    COMMUNITY_TEAM,
    'New BFB Course Certificate Download',
    wrapEmail(body, 'New BFB Course Certificate Download'),
  )
}

export type ProcessCompletionInput = CreateCompletionInput & {
  variant: 'email' | 'telegram'
}

export type ProcessCompletionResult = {
  completion: CourseCompletionRecord
  isNew: boolean
}

export async function processCourseCompletion(
  payload: Payload,
  input: ProcessCompletionInput,
): Promise<ProcessCompletionResult> {
  const existingBefore = await findCourseCompletion(payload, input.email, input.uniqueCode)
  const signup = await findCourseSignup(payload, input.email, input.uniqueCode)
  const tierLevel = signup?.tierLevel ?? 'ba'

  const completion = await createOrGetCourseCompletion(payload, {
    ...input,
    name: input.name ?? signup?.name,
  })

  const isNew = !existingBefore

  if (!isNew) {
    return { completion, isNew: false }
  }

  if (input.variant === 'email' && input.email) {
    let tbtDiscount: string | null = null

    if (!isExternalTier(tierLevel)) {
      tbtDiscount = await assignTbtDiscountCode(payload, input.email)

      if (tbtDiscount) {
        await payload.update({
          collection: 'course-completions',
          id: completion.id,
          data: { tbtDiscountSent: tbtDiscount },
          overrideAccess: true,
        })
        completion.tbtDiscountSent = tbtDiscount
      } else {
        console.warn('[course-completion] No unused TBT discount codes available for', input.email)
      }
    }

    await sendCourseCompletionEmail({
      email: input.email,
      name: completion.name,
      uniqueCode: completion.uniqueCode,
      tbtDiscount: isExternalTier(tierLevel) ? null : tbtDiscount,
    })
  }

  return { completion, isNew: true }
}

export function buildResultPageUrl(certNumber: string, certHash: string): string {
  const params = new URLSearchParams({
    cert_id: certNumber,
    cert_hash: certHash,
  })
  return `/result-page?${params.toString()}`
}

export { CERTIFICATE_ELIGIBILITY_DAYS }
