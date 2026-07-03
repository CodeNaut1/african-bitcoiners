import React from 'react'
import { notFound } from 'next/navigation'

import { Container } from '@/components/ui/container'
import { FinalQuiz } from '@/components/FinalQuiz'
import { getFinalQuizQuestions } from '@/lib/quiz-questions'

export const metadata = {
  title: 'Final Quiz (Telegram) — Bitcoin for Beginners Course',
  description: 'Test your Bitcoin knowledge with the BFB Final Quiz. Score 70% or higher to earn your certificate.',
}

export const revalidate = 3600

type Props = {
  searchParams: Promise<{ uniqueId?: string }>
}

export default async function FinalQuizTgPage({ searchParams }: Props) {
  const { uniqueId } = await searchParams
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
          variant="telegram"
          uniqueId={uniqueId}
        />
      </Container>
    </div>
  )
}
