import React from 'react'
import { Container } from '@/components/ui/container'
import { StartHereQuiz } from '@/components/StartHereQuiz'

export const metadata = {
  title: 'Start Here — What\'s Your Bitcoin Level?',
  description: 'Take our 5-question Bitcoin knowledge quiz and find out if you\'re a beginner, intermediate, or advanced Bitcoiner. Get personalised next steps.',
}

export default function StartHerePage() {
  return (
    <div className="min-h-screen bg-brand-cream py-12">
      <Container>
        <div className="max-w-xl mx-auto text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-3">START HERE</p>
          <h1 className="text-3xl font-bold text-brand-secondary mb-3">What's Your Bitcoin Level?</h1>
          <p className="text-brand-text-muted">
            Answer 5 quick questions and we'll show you exactly where to start your Bitcoin journey.
          </p>
        </div>
        <StartHereQuiz />
      </Container>
    </div>
  )
}
