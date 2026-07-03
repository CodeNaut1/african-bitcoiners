'use client'

import { useSearchParams } from 'next/navigation'
import React from 'react'

import { FinalCourseFeedbackForm } from '@/components/forms/FinalCourseFeedbackForm'
import { FinalQuizScoreDisplay } from '@/components/FinalQuizResult/ScoreDisplay'
import { FinalQuizShareRow } from '@/components/FinalQuizResult/ShareRow'
import { FINAL_QUIZ_PASS_COUNT, FINAL_QUIZ_TOTAL_QUESTIONS } from '@/lib/quiz-shared'
import type { FeedbackFieldDefinition } from '@/lib/quiz-shared'

type Props = {
  feedbackFields?: FeedbackFieldDefinition[]
}

export function FinalQuizFailedContent({ feedbackFields = [] }: Props) {
  const searchParams = useSearchParams()
  const score = searchParams.get('score')
  const percent = searchParams.get('percent')
  const email = searchParams.get('email') ?? undefined

  return (
    <div className="min-h-screen bg-brand-cream py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl shadow-sm">
            💪
          </div>
          <h1 className="text-2xl font-bold text-brand-secondary sm:text-3xl">Almost there!</h1>
          <FinalQuizScoreDisplay
            score={score}
            percent={percent}
            totalQuestions={FINAL_QUIZ_TOTAL_QUESTIONS}
          />
          <div className="mx-auto mt-6 max-w-lg space-y-3 text-base text-brand-text-dark sm:text-lg">
            <p>
              You need at least 70% ({FINAL_QUIZ_PASS_COUNT} out of {FINAL_QUIZ_TOTAL_QUESTIONS}) to pass.
            </p>
            <p>
              You can retake the quiz after 5 days. A reminder email will be sent when you&apos;re eligible to retry.
            </p>
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
              <FinalCourseFeedbackForm email={email} fields={feedbackFields} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
