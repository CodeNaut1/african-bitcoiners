import React from 'react'
import { Container } from '@/components/ui/container'
import { FinalQuiz } from '@/components/FinalQuiz'
import { finalQuizEN } from '@/data/final-quiz-questions'

export const metadata = {
  title: 'Final Quiz — Bitcoin for Beginners Course',
  description: 'Test your Bitcoin knowledge with the BFB Final Quiz. Score 70% or higher to earn your certificate.',
}

export default function FinalQuizPage() {
  return (
    <div className="min-h-screen bg-brand-cream py-12">
      <Container>
        <FinalQuiz
          questions={finalQuizEN}
          lang="en"
          deliveryMethod="email"
          passUrl="/final-quiz-passed"
          failUrl="/final-quiz-failed"
        />
      </Container>
    </div>
  )
}
