'use client'

import React, { useCallback } from 'react'
import { HeroBitcoin } from './HeroBitcoin'
import { Marquee } from './Marquee'
import { Learn } from './Learn'
import { Program } from './Program'
import { ForWho } from './ForWho'
import { FAQ } from './FAQ'
import { Register } from './Register'
import { useReveal } from './useReveal'
import './academie.css'

export function AcademiePageClient() {
  useReveal()

  const scrollToReg = useCallback(() => {
    document.getElementById('inscription')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <div className="academie-root">
      <HeroBitcoin onCta={scrollToReg} />
      <Marquee />
      <Learn />
      <Program />
      <ForWho />
      <FAQ />
      <Register />
    </div>
  )
}
