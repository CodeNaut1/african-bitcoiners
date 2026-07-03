'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

import { FinalCourseFeedbackForm } from '@/components/forms/FinalCourseFeedbackForm'
import { FinalQuizScoreDisplay } from '@/components/FinalQuizResult/ScoreDisplay'
import { FinalQuizShareRow } from '@/components/FinalQuizResult/ShareRow'
import { certificateHref } from '@/components/FinalQuizResult/shared'
import { FINAL_QUIZ_TOTAL_QUESTIONS } from '@/lib/quiz-shared'
import type { FeedbackFieldDefinition } from '@/lib/quiz-shared'

type Props = {
  feedbackFields?: FeedbackFieldDefinition[]
}

export function FinalQuizPassedContent({ feedbackFields = [] }: Props) {
  const searchParams = useSearchParams()
  const score = searchParams.get('score')
  const percent = searchParams.get('percent')
  const email = searchParams.get('email') ?? undefined
  const uniqueId = searchParams.get('uniqueId') ?? undefined
  const certLink = certificateHref(email, uniqueId)

  return (
    <div className="min-h-screen bg-brand-cream py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl shadow-sm">
            🎉
          </div>
          <h1 className="text-2xl font-bold text-brand-secondary sm:text-3xl">Congratulations!</h1>
          <FinalQuizScoreDisplay
            score={score}
            percent={percent}
            totalQuestions={FINAL_QUIZ_TOTAL_QUESTIONS}
          />
          <div className="mt-8">
            <Link
              href={certLink}
              className="inline-flex items-center justify-center rounded-lg bg-brand-accent px-8 py-3 text-base font-semibold text-white transition-colors hover:opacity-90"
            >
              Get Your Certificate
            </Link>
          </div>
          <p className="mt-8 text-sm text-brand-text-muted sm:text-base">
            Please take a few seconds to give us your feedback with the form below 👇
          </p>
        </div>

        <div className="mt-10 text-center">
          <h2 className="text-lg font-bold text-brand-secondary sm:text-xl">
            Tell Others About the Bitcoin for Beginners Course
          </h2>
          <div className="mt-5">
            <FinalQuizShareRow />
          </div>
        </div>

        <div className="mt-10 rounded-lg border border-brand-border-light bg-[#FFF8F0] p-6 sm:p-8">
          <h2 className="mb-6 text-center text-lg font-bold text-brand-secondary">Final Course Feedback</h2>
          {feedbackFields.length > 0 && (
            <div className="rounded-lg border border-brand-border-light bg-white px-5 py-6 sm:px-7">
              <FinalCourseFeedbackForm
                email={email}
                formType="final-quiz-passed-english"
                fields={feedbackFields}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
