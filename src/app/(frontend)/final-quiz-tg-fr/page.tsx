import React from 'react'
import { notFound } from 'next/navigation'

import { Container } from '@/components/ui/container'
import { FinalQuiz } from '@/components/FinalQuiz'
import { getFinalQuizQuestions } from '@/lib/quiz-questions'

export const metadata = {
  title: 'Quiz Final (Telegram) — Cours Bitcoin pour Débutants',
  description:
    'Testez vos connaissances Bitcoin avec le quiz final BFB. Obtenez au moins 70% pour recevoir votre certificat.',
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
