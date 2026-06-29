import React, { Suspense } from 'react'

import { FinalQuizPassedTgContent } from '@/components/FinalQuizPassedTgPage/content'

export function FinalQuizPassedTgPage() {
  return (
    <Suspense>
      <FinalQuizPassedTgContent />
    </Suspense>
  )
}
