import React, { Suspense } from 'react'

import { FinalQuizFailedContent } from '@/components/FinalQuizFailedPage/content'

export function FinalQuizFailedPage() {
  return (
    <Suspense>
      <FinalQuizFailedContent />
    </Suspense>
  )
}
