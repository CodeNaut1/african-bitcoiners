import React, { Suspense } from 'react'

import { FinalQuizFailedTgPage } from '@/components/FinalQuizFailedTgPage'

export const metadata = {
  title: 'Final Quiz Failed (Telegram) - African Bitcoiners',
  description:
    'You did not meet the pass mark on the Bitcoin for Beginners final quiz. Retake the quiz when you are ready.',
}

export default function Page() {
  return (
    <Suspense>
      <FinalQuizFailedTgPage />
    </Suspense>
  )
}
