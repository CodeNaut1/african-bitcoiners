'use client'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
  logoUrl?: string | null
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, logoUrl }) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 bg-white transition-shadow duration-200',
        scrolled ? 'shadow-md' : 'border-b border-brand-border-light',
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between">
          <Link href="/" aria-label="African Bitcoiners home">
            <Logo src={logoUrl} />
          </Link>
          <HeaderNav data={data} />
        </div>
      </div>
    </header>
  )
}
