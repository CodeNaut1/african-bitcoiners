import type { Payload } from 'payload'

import {
  CERTIFICATE_ELIGIBILITY_DAYS,
  formatAvailableDate,
  getCertificateAvailableDate,
} from '@/lib/certificate-shared'
import { findCourseCompletion, findCourseSignup } from '@/lib/course-completion'
import { FAILED_QUIZ_FORM_SLUG, FINAL_QUIZ_PASS_THRESHOLD } from '@/lib/quiz-shared'

export const QUIZ_RETRY_COOLDOWN_DAYS = 5

export type FinalQuizValidateInput = {
  email?: string
  uniqueCode?: string
}

export type FinalQuizValidateSuccess = {
  ok: true
  name: string
}

export type FinalQuizValidateError = {
  error: true
  reason:
    | 'no-signup'
    | 'too-early'
    | 'already-passed'
    | 'retry-cooldown'
  message: string
}

export type FinalQuizValidateResult = FinalQuizValidateSuccess | FinalQuizValidateError

function formatDisplayDate(dateInput: string | Date): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function addDays(dateInput: string | Date, days: number): Date {
  const date = new Date(typeof dateInput === 'string' ? dateInput : dateInput.getTime())
  date.setDate(date.getDate() + days)
  return date
}

function daysSince(dateInput: string): number {
  const then = new Date(dateInput).getTime()
  return (Date.now() - then) / (1000 * 60 * 60 * 24)
}

export async function emailCourseSignupExists(payload: Payload, email: string): Promise<boolean> {
  const normalized = email.trim().toLowerCase()
  if (!normalized) return false

  const { docs } = await payload.find({
    collection: 'course-signups',
    where: { email: { exists: true } },
    limit: 5000,
    overrideAccess: true,
  })

  return docs.some(
    (doc) => String((doc as { email?: string | null }).email ?? '').trim().toLowerCase() === normalized,
  )
}

async function findRecentFailedQuizAttempt(
  payload: Payload,
  email?: string,
  uniqueCode?: string,
): Promise<{ submittedAt: string; eligibleRetryDate: Date } | null> {
  const normalizedEmail = email?.trim().toLowerCase()
  const normalizedCode = uniqueCode?.trim()

  if (!normalizedEmail && !normalizedCode) return null

  const { docs } = await payload.find({
    collection: 'form-submissions',
    where: { formSlug: { equals: FAILED_QUIZ_FORM_SLUG } },
    sort: '-submittedAt',
    limit: 200,
    overrideAccess: true,
  })

  for (const doc of docs) {
    const data = (doc as { data?: Record<string, unknown> }).data ?? {}
    const docEmail = String(data.email ?? '')
      .trim()
      .toLowerCase()
    const docUniqueId = String(data.uniqueId ?? '').trim()

    const matches = normalizedEmail
      ? docEmail === normalizedEmail
      : Boolean(normalizedCode && docUniqueId === normalizedCode)

    if (!matches) continue

    const submittedAt = String(
      (doc as { submittedAt?: string; createdAt?: string }).submittedAt ??
        (doc as { createdAt?: string }).createdAt ??
        '',
    )
    if (!submittedAt) continue

    if (daysSince(submittedAt) < QUIZ_RETRY_COOLDOWN_DAYS) {
      return {
        submittedAt,
        eligibleRetryDate: addDays(submittedAt, QUIZ_RETRY_COOLDOWN_DAYS),
      }
    }
  }

  return null
}

export async function validateFinalQuizStart(
  payload: Payload,
  input: FinalQuizValidateInput,
): Promise<FinalQuizValidateResult> {
  const email = input.email?.trim()
  const uniqueCode = input.uniqueCode?.trim()

  if (!email && !uniqueCode) {
    return {
      error: true,
      reason: 'no-signup',
      message:
        'We could not find a course signup with this email/code. Please use the same email or code you signed up with.',
    }
  }

  const signup = await findCourseSignup(payload, email, uniqueCode)
  if (!signup) {
    return {
      error: true,
      reason: 'no-signup',
      message:
        'We could not find a course signup with this email/code. Please use the same email or code you signed up with.',
    }
  }

  if (signup.signupDate) {
    const daysOnCourse = daysSince(signup.signupDate)
    if (daysOnCourse < CERTIFICATE_ELIGIBILITY_DAYS) {
      const signupDate = formatDisplayDate(signup.signupDate)
      const quizAvailableDate = formatAvailableDate(getCertificateAvailableDate(signup.signupDate))
      return {
        error: true,
        reason: 'too-early',
        message: `You signed up on ${signupDate}. The quiz will be available on ${quizAvailableDate}. Please complete all the course lessons first.`,
      }
    }
  }

  const completion = await findCourseCompletion(payload, email, uniqueCode)
  if (completion && completion.scorePercent >= FINAL_QUIZ_PASS_THRESHOLD) {
    return {
      error: true,
      reason: 'already-passed',
      message: `You have already passed the final quiz and received certificate ${completion.certNumber}. Visit the Get Certificate page to download it again.`,
    }
  }

  const recentFailure = await findRecentFailedQuizAttempt(payload, email, uniqueCode)
  if (recentFailure) {
    const lastAttemptDate = formatDisplayDate(recentFailure.submittedAt)
    const retryDate = formatDisplayDate(recentFailure.eligibleRetryDate)
    return {
      error: true,
      reason: 'retry-cooldown',
      message: `You can retake the quiz after 5 days. Your last attempt was on ${lastAttemptDate}. You will be eligible to retry on ${retryDate}.`,
    }
  }

  return {
    ok: true,
    name: signup.name ?? 'Course Participant',
  }
}