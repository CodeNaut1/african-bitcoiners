import React from 'react'
import { Container } from '@/components/ui/container'
import { BtcConverter } from '@/components/BtcConverter'

export const metadata = {
  title: 'Bitcoin to Fiat Converter',
  description: 'Convert between Bitcoin, satoshis, US dollars, and 20+ African currencies. Live BTC price from CoinGecko.',
}

export default function BtcConverterPage() {
  return (
    <div className="min-h-screen bg-brand-cream py-12">
      <Container>
        <div className="max-w-xl mx-auto text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-3">SAVE BITCOIN</p>
          <h1 className="text-3xl font-bold text-brand-secondary mb-3">Bitcoin to Fiat Converter</h1>
          <p className="text-brand-text-muted">
            Convert between BTC, sats, USD, and 20+ African currencies. Live price updated from CoinGecko.
          </p>
        </div>
        <BtcConverter />
      </Container>
    </div>
  )
}
