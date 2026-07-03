'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const DEFAULT_MESSAGES: Record<string, string> = {
  'duplicate-signup': "It looks like you've already signed up! If you need help, contact us.",
  'no-signup':
    'We could not find a course signup with this email/code. Please use the same email or code you signed up with.',
  'too-early': 'The final quiz is not available yet. Please complete all the course lessons first.',
  'already-passed': 'You have already passed the final quiz. Visit the Get Certificate page to download your certificate again.',
  'retry-cooldown': 'You can retake the quiz after 5 days from your last attempt.',
}

type Action = {
  label: string
  href: string
}

function getAction(reason: string): Action {
  switch (reason) {
    case 'duplicate-signup':
      return { label: 'Contact Us', href: '/about-us/connect-with-us' }
    case 'no-signup':
      return { label: 'Go to Course Signup', href: '/learn-bitcoin/free-bitcoin-course' }
    case 'too-early':
      return { label: 'Back to Course', href: '/learn-bitcoin/free-bitcoin-course' }
    case 'already-passed':
      return { label: 'Download Certificate', href: '/get-certificate' }
    case 'retry-cooldown':
      return { label: 'Back to Home', href: '/' }
    default:
      return { label: 'Back to Home', href: '/' }
  }
}

export function CourseErrorContent() {
  const searchParams = useSearchParams()
  const reason = searchParams.get('reason') ?? 'unknown'
  const message = searchParams.get('message') ?? DEFAULT_MESSAGES[reason] ?? 'Something went wrong. Please try again.'
  const action = getAction(reason)

  return (
    <div className="min-h-screen bg-brand-cream py-12">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <div className="rounded-lg border border-brand-border-light bg-white px-6 py-10 text-center shadow-sm sm:px-10">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF3DE] text-3xl">
            ⚠️
          </div>
          <h1 className="text-2xl font-bold text-brand-secondary sm:text-3xl">Course Notice</h1>
          <p className="mt-5 text-base leading-relaxed text-brand-text-dark sm:text-lg">{message}</p>
          <div className="mt-8">
            <Link
              href={action.href}
              className="inline-flex items-center justify-center rounded-lg bg-brand-accent px-8 py-3 text-base font-semibold text-white transition-colors hover:opacity-90"
            >
              {action.label}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
