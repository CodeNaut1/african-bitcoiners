import React, { Suspense } from 'react'

import { FinalQuizFailedPage } from '@/components/FinalQuizFailedPage'
import { getFinalCourseFeedbackFields } from '@/lib/quiz-questions'

export const metadata = {
  title: 'Final Quiz Failed — Bitcoin for Beginners',
  description:
    'You did not meet the pass mark on the Bitcoin for Beginners final quiz. Share your feedback and retake the quiz in a few days.',
}

export const revalidate = 3600

export default async function Page() {
  const feedbackFields = await getFinalCourseFeedbackFields('en')

  return (
    <Suspense>
      <FinalQuizFailedPage feedbackFields={feedbackFields} />
    </Suspense>
  )
}
