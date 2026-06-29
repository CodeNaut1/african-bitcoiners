import React from 'react'
import { Container } from '@/components/ui/container'
import { FinalQuiz } from '@/components/FinalQuiz'
import { finalQuizFR } from '@/data/final-quiz-questions'

export const metadata = {
  title: 'Quiz Final (Telegram) — Cours Bitcoin pour Débutants',
  description: 'Testez vos connaissances Bitcoin avec le Quiz Final BFB. Obtenez 70% ou plus pour obtenir votre certificat.',
}

export default function FinalQuizTgFrPage() {
  return (
    <div className="min-h-screen bg-brand-cream py-12">
      <Container>
        <FinalQuiz
          questions={finalQuizFR}
          lang="fr"
          deliveryMethod="telegram"
          passUrl="/final-quiz-passed-tg"
          failUrl="/final-quiz-failed"
        />
      </Container>
    </div>
  )
}
