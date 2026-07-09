import React, { Suspense } from 'react'
import type { Metadata } from 'next'

import { FinalQuizPassedPage } from '@/components/FinalQuizPassedPage'
import { getFinalCourseFeedbackFields } from '@/lib/quiz-questions'
import { getPageSeo } from '@/lib/seo-page-data'
import { buildStaticPageMetadata } from '@/utilities/buildStaticPageMetadata'

export function generateMetadata(): Metadata {
  const seo = getPageSeo('final-quiz-passed')!
  return buildStaticPageMetadata({ ...seo, path: '/final-quiz-passed' })
}

export const revalidate = 3600

export default async function Page() {
  const feedbackFields = await getFinalCourseFeedbackFields('en')

  return (
    <Suspense>
      <FinalQuizPassedPage feedbackFields={feedbackFields} />
    </Suspense>
  )
}
