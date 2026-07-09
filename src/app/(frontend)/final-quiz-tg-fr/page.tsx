import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { Container } from '@/components/ui/container'
import { FinalQuiz } from '@/components/FinalQuiz'
import { getFinalQuizQuestions } from '@/lib/quiz-questions'
import { getPageSeo } from '@/lib/seo-page-data'
import { buildStaticPageMetadata } from '@/utilities/buildStaticPageMetadata'

export function generateMetadata(): Metadata {
  const seo = getPageSeo('final-quiz-tg-fr')!
  return buildStaticPageMetadata({ ...seo, path: '/final-quiz-tg-fr' })
}

export const revalidate = 3600

type Props = {
  searchParams: Promise<{ uniqueId?: string }>
}

export default async function FinalQuizTgFrPage({ searchParams }: Props) {
  const { uniqueId } = await searchParams
  const questions = await getFinalQuizQuestions('fr')

  if (!questions.length) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-brand-cream py-12">
      <Container>
        <FinalQuiz
          questions={questions}
          language="fr"
          variant="telegram"
          uniqueId={uniqueId}
        />
      </Container>
    </div>
  )
}
