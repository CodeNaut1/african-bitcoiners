import React, { Suspense } from 'react'

import type { FeedbackFieldDefinition } from '@/lib/quiz-shared'

import { FinalQuizPassedContent } from '@/components/FinalQuizPassedPage/content'

type Props = {
  feedbackFields?: FeedbackFieldDefinition[]
}

export function FinalQuizPassedPage({ feedbackFields = [] }: Props) {
  return (
    <Suspense>
      <FinalQuizPassedContent feedbackFields={feedbackFields} />
    </Suspense>
  )
}
