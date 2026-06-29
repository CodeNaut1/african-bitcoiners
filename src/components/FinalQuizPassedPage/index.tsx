import React, { Suspense } from 'react'

import { FinalQuizPassedContent } from '@/components/FinalQuizPassedPage/content'

export function FinalQuizPassedPage() {
  return (
    <Suspense>
      <FinalQuizPassedContent />
    </Suspense>
  )
}
