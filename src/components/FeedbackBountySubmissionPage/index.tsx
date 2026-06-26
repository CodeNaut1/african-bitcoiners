import React from 'react'

import { FeedbackBountyForm } from '@/components/forms/FeedbackBountyForm'

const PAGE_CREAM = '#FFFBF7'
const CARD_BORDER = '#E4E7EC'
const HEADING = '#E1640C'
const TEXT = '#2D1300'
const ORANGE = '#E35725'

export function FeedbackBountySubmissionPage() {
  return (
    <div className="font-sans" style={{ backgroundColor: PAGE_CREAM }}>
      <section className="px-4 py-12 sm:px-6 md:py-20 md:pb-[100px]">
        <div className="mx-auto max-w-[800px]">
          <div
            className="overflow-hidden rounded-lg border bg-white py-[50px]"
            style={{ borderColor: CARD_BORDER }}
          >
            <div className="px-6 sm:px-10 md:px-16">
              <h1
                className="font-heading text-2xl font-bold capitalize leading-8 tracking-[-0.6px]"
                style={{ color: HEADING }}
              >
                Feedback Submission
              </h1>
              <div
                className="mt-4 pr-0 text-justify text-lg leading-7 tracking-[-0.6px] md:pr-[30px]"
                style={{ color: TEXT }}
              >
                <p>
                  Have a genius idea or spot something in our African Bitcoiners initiatives that could be even
                  better? Now&apos;s your chance to share your thoughts and earn 1,000 sats! Welcome to our{' '}
                  <span className="font-extrabold" style={{ color: ORANGE }}>
                    Feedback Bounty Party
                  </span>
                  , your opportunity to help us improve and get rewarded for it!
                </p>
                <p className="mt-4">
                  <strong>
                    N.B: Submit one idea per form. Your idea must be specific, actionable, and feasible to implement
                    within 12 months. Irrelevant feedbacks will be deleted.
                  </strong>
                </p>
              </div>
            </div>

            <div className="mt-8 px-6 sm:px-10 md:px-20">
              <FeedbackBountyForm variant="page" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
