import React from 'react'
import { Container } from '@/components/ui/container'
import { FinalQuiz } from '@/components/FinalQuiz'
import { finalQuizFR } from '@/data/final-quiz-questions'

export const metadata = {
  title: 'Quiz Final — Cours Bitcoin pour Débutants',
  description:
    'Testez vos connaissances Bitcoin avec le quiz final BFB. Obtenez au moins 70% pour recevoir votre certificat.',
}

type Props = {
  searchParams: Promise<{ email?: string }>
}

export default async function FinalQuizFrPage({ searchParams }: Props) {
  const { email } = await searchParams

  return (
    <div className="min-h-screen bg-brand-cream py-12">
      <Container>
        <FinalQuiz
          questions={finalQuizFR}
          language="fr"
          variant="email"
          email={email}
        />
      </Container>
    </div>
  )
}
