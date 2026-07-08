import React, { Suspense } from 'react'
import type { Metadata } from 'next'

import { FinalQuizFailedPage } from '@/components/FinalQuizFailedPage'
import { getFinalCourseFeedbackFields } from '@/lib/quiz-questions'
import { getPageSeo } from '@/lib/seo-page-data'
import { buildStaticPageMetadata } from '@/utilities/buildStaticPageMetadata'

export function generateMetadata(): Metadata {
  const seo = getPageSeo('final-quiz-failed')!
  return buildStaticPageMetadata({ ...seo, path: '/final-quiz-failed' })
}

export const revalidate = 3600

export default async function Page() {
  const feedbackFields = await getFinalCourseFeedbackFields('en')

  return (
    <Suspense>
      <FinalQuizFailedPage feedbackFields={feedbackFields} />
    </Suspense>
  )
}
