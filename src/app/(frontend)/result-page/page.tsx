import React, { Suspense } from 'react'

import { ResultPageContent } from '@/components/ResultPage/content'

export const metadata = {
  title: 'Certificate Result — Bitcoin for Beginners',
  description: 'View and download your Bitcoin for Beginners course certificate.',
}

export default function ResultPage() {
  return (
    <Suspense>
      <ResultPageContent />
    </Suspense>
  )
}
