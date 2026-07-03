import React from 'react'
import { notFound } from 'next/navigation'
import { revalidatePath, revalidateTag } from 'next/cache'

import { Container } from '@/components/ui/container'
import { FinalQuiz } from '@/components/FinalQuiz'
import { getFinalQuizQuestions } from '@/lib/quiz-questions'

export const metadata = {
  title: 'Quiz Final — Cours Bitcoin pour Débutants',
  description:
    'Testez vos connaissances Bitcoin avec le quiz final BFB. Obtenez au moins 70% pour recevoir votre certificat.',
}

export const revalidate = 3600

type Props = {
  searchParams: Promise<{ email?: string; revalidate?: string }>
}

export default async function FinalQuizFrPage({ searchParams }: Props) {
  const { email, revalidate: revalidateParam } = await searchParams

  if (revalidateParam === 'true') {
    try {
      revalidateTag('quiz-final-fr', 'max')
      revalidatePath('/final-quiz-fr')
    } catch {
      /* outside Next.js runtime */
    }
  }

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
          variant="email"
          email={email}
        />
      </Container>
    </div>
  )
}
