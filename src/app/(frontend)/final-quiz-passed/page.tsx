import React, { Suspense } from 'react'

import { FinalQuizPassedPage } from '@/components/FinalQuizPassedPage'
import { getFinalCourseFeedbackFields } from '@/lib/quiz-questions'

export const metadata = {
  title: 'Final Quiz Passed — Bitcoin for Beginners',
  description:
    'Congratulations! You passed the Bitcoin for Beginners final quiz. Download your certificate and share your course feedback.',
}

export const revalidate = 3600

export default async function Page() {
  const feedbackFields = await getFinalCourseFeedbackFields('en')

  return (
    <Suspense>
      <FinalQuizPassedPage feedbackFields={feedbackFields} />
    </Suspense>
  )
}
