import React, { Suspense } from 'react'

import { FinalQuizFailedContent } from '@/components/FinalQuizFailedPage/content'

export function FinalQuizFailedTgPage() {
  return (
    <Suspense>
      <FinalQuizFailedContent />
    </Suspense>
  )
}
