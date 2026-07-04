import type { Metadata } from 'next'
import { DM_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import React from 'react'

import { AcademiePageClient } from '@/components/AcademieBitcoinAfrique/AcademiePageClient'
import { getServerSideURL } from '@/utilities/getURL'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
  weight: '400',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Académie Bitcoin Afrique',
  description:
    'Programme de formation Bitcoin en français pour les leaders africains. Rejoignez notre première cohorte et maîtrisez Bitcoin.',
  openGraph: {
    title: 'Académie Bitcoin Afrique',
    description:
      'Programme de formation Bitcoin en français pour les leaders africains. Rejoignez notre première cohorte et maîtrisez Bitcoin.',
    url: `${getServerSideURL()}/academie-bitcoin-afrique`,
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function AcademieBitcoinAfriquePage() {
  return (
    <div
      className={`${dmSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
      lang="fr"
    >
      <AcademiePageClient />
    </div>
  )
}
