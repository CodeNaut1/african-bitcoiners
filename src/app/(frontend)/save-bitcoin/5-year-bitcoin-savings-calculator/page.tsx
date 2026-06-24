import React from 'react'
import { Container } from '@/components/ui/container'
import { SavingsCalculator } from '@/components/SavingsCalculator'

export const metadata = {
  title: '5-Year Bitcoin Savings Calculator — African Bitcoiners',
  description: 'Calculate how much Bitcoin you could accumulate by saving monthly in your African currency. See your savings in sats and projected future value.',
}

export default function SavingsCalculatorPage() {
  return (
    <div className="min-h-screen bg-brand-cream py-12">
      <Container>
        <div className="max-w-2xl mx-auto text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-3">SAVE BITCOIN</p>
          <h1 className="text-3xl font-bold text-brand-secondary mb-3">5-Year Bitcoin Savings Calculator</h1>
          <p className="text-brand-text-muted">
            Enter your monthly savings and see how much Bitcoin you could accumulate — and what it could be worth.
          </p>
        </div>
        <SavingsCalculator />
      </Container>
    </div>
  )
}
