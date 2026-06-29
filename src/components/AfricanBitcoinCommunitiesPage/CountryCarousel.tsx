'use client'

import Link from 'next/link'
import React, { useRef } from 'react'

import { COUNTRIES, type CountryEntry } from '@/components/AfricanBitcoinCommunitiesPage/data'

function countryFlag(code: string): string {
  return code
    .toUpperCase()
    .split('')
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join('')
}

type Props = {
  countries?: readonly CountryEntry[]
  showHeading?: boolean
  variant?: 'rounded' | 'compact'
  externalLinks?: boolean
}

export function CountryCarousel({
  countries = COUNTRIES,
  showHeading = true,
  variant = 'rounded',
  externalLinks = false,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: variant === 'compact' ? 150 : 280, behavior: 'smooth' })
  }

  const isCompact = variant === 'compact'

  return (
    <div>
      {showHeading && (
        <h2 className="font-heading text-base font-bold tracking-[-0.3px] text-white md:text-lg">
          Top 21 African Bitcoin Countries
        </h2>
      )}
      <div className={showHeading ? 'relative mt-4' : 'relative'}>
        <div
          ref={scrollRef}
          className="overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className={`flex w-max ${isCompact ? 'gap-5 pr-16' : 'gap-2.5 pr-14'}`}>
            {countries.map((country) => (
              <Link
                key={country.code}
                href={country.href}
                {...(externalLinks ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={
                  isCompact
                    ? 'flex h-9 w-[130px] shrink-0 items-center justify-center gap-1.5 border border-white/55 bg-white/30 px-2 text-xs font-medium text-white backdrop-blur-sm transition-opacity hover:opacity-85'
                    : 'flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-opacity hover:opacity-85'
                }
              >
                <span className="text-base leading-none" aria-hidden>
                  {countryFlag(country.code)}
                </span>
                {country.name}
              </Link>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={scrollRight}
          aria-label="Scroll countries"
          className={
            isCompact
              ? 'absolute right-0 top-1/2 flex h-[60px] w-[60px] -translate-y-1/2 items-center justify-center rounded-full bg-white text-[22px] font-semibold text-black shadow-md transition-colors hover:bg-black hover:text-white'
              : 'absolute right-0 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-lg font-semibold text-black shadow-md transition-opacity hover:opacity-90'
          }
        >
          ›
        </button>
      </div>
    </div>
  )
}
