import React from 'react'
import { Container } from '@/components/ui/container'
import { Certificate } from '@/components/Certificate'

export const metadata = {
  title: 'Get Your Certificate (Telegram) — Bitcoin for Beginners',
  description: 'Download your Bitcoin for Beginners course certificate using your unique code.',
}

export default function GetCertificateTgPage() {
  return (
    <div className="min-h-screen bg-brand-cream py-12">
      <Container>
        <Certificate mode="telegram" />
      </Container>
    </div>
  )
}
