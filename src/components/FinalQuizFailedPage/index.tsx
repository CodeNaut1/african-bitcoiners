import React, { Suspense } from 'react'

import type { FeedbackFieldDefinition } from '@/lib/quiz-shared'

import { FinalQuizFailedContent } from '@/components/FinalQuizFailedPage/content'

type Props = {
  feedbackFields?: FeedbackFieldDefinition[]
}

export function FinalQuizFailedPage({ feedbackFields = [] }: Props) {
  return (
    <Suspense>
      <FinalQuizFailedContent feedbackFields={feedbackFields} />
    </Suspense>
  )
}
