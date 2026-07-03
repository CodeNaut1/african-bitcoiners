import React, { Suspense } from 'react'

import { CourseErrorContent } from '@/components/CourseErrorPage/content'

export function CourseErrorPage() {
  return (
    <Suspense>
      <CourseErrorContent />
    </Suspense>
  )
}
