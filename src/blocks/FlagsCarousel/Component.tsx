import Link from 'next/link'
import React from 'react'

import { cn } from '@/utilities/ui'
import { Container } from '@/components/ui/container'

type Country = { name: string; slug: string; countryCode: string }

type Props = {
  heading?: string
  countries: Country[]
  speed?: 'slow' | 'normal' | 'fast'
  backgroundColor?: 'cream' | 'white' | 'dark'
}

const speedMap: Record<string, string> = { slow: '50s', normal: '35s', fast: '18s' }

function countryCodeToFlag(code: string): string {
  return code
    .toUpperCase()
    .split('')
    .map((c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
    .join('')
}

export function FlagsCarouselBlockComponent({
  heading,
  countries,
  speed = 'normal',
  backgroundColor = 'cream',
}: Props) {
  if (!countries || countries.length === 0) return null

  const isDark = backgroundColor === 'dark'
  const duration = speedMap[speed] ?? speedMap.normal
  const doubled = [...countries, ...countries]

  return (
    <section className={cn('py-10 overflow-hidden', isDark ? 'bg-brand-secondary' : backgroundColor === 'white' ? 'bg-white' : 'bg-brand-cream')}>
      {heading && (
        <Container>
          <p className={cn('text-center text-xs font-semibold uppercase tracking-widest mb-6', isDark ? 'text-white/60' : 'text-brand-text-muted')}>
            {heading}
          </p>
        </Container>
      )}

      <div className="group relative">
        {/* Fade masks */}
        <div className={cn('pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r to-transparent', isDark ? 'from-brand-secondary' : backgroundColor === 'white' ? 'from-white' : 'from-brand-cream')} />
        <div className={cn('pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l to-transparent', isDark ? 'from-brand-secondary' : backgroundColor === 'white' ? 'from-white' : 'from-brand-cream')} />

        <div
          className="flex items-center gap-6 group-hover:[animation-play-state:paused]"
          style={{ animation: `scrollLeft ${duration} linear infinite`, width: 'max-content' }}
        >
          {doubled.map((country, i) => (
            <Link
              key={i}
              href={`/top-african-bitcoin-countries-${country.slug}/`}
              className="shrink-0 flex flex-col items-center gap-2 group/item"
              title={country.name}
            >
              <span className="text-4xl leading-none select-none" role="img" aria-label={country.name}>
                {countryCodeToFlag(country.countryCode)}
              </span>
              <span className={cn('text-xs font-medium transition-colors group-hover/item:text-brand-primary', isDark ? 'text-white/70' : 'text-brand-text-muted')}>
                {country.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
