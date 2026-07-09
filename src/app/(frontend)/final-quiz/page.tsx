import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { revalidatePath, revalidateTag } from 'next/cache'

import { Container } from '@/components/ui/container'
import { FinalQuiz } from '@/components/FinalQuiz'
import { getFinalQuizQuestions } from '@/lib/quiz-questions'
import { getPageSeo } from '@/lib/seo-page-data'
import { buildStaticPageMetadata } from '@/utilities/buildStaticPageMetadata'

export function generateMetadata(): Metadata {
  const seo = getPageSeo('final-quiz')!
  return buildStaticPageMetadata({ ...seo, path: '/final-quiz' })
}

export const revalidate = 3600

type Props = {
  searchParams: Promise<{ email?: string; revalidate?: string }>
}

export default async function FinalQuizPage({ searchParams }: Props) {
  const { email, revalidate: revalidateParam } = await searchParams

  if (revalidateParam === 'true') {
    try {
      revalidateTag('quiz-final-en', 'max')
      revalidatePath('/final-quiz')
    } catch {
      /* outside Next.js runtime */
    }
  }

  const questions = await getFinalQuizQuestions('en')

  if (!questions.length) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-brand-cream py-12">
      <Container>
        <FinalQuiz
          questions={questions}
          language="en"
          variant="email"
          email={email}
        />
      </Container>
    </div>
  )
}
