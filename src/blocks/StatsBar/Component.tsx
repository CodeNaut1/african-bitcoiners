import React from 'react'

import { cn } from '@/utilities/ui'
import { Container } from '@/components/ui/container'

type Stat = {
  value: string
  label: string
}

type Props = {
  backgroundColor?: 'dark' | 'orange' | 'white' | 'cream'
  stats: Stat[]
  isHome?: boolean
}

const styleMap: Record<string, { section: string; value: string; label: string }> = {
  dark: {
    section: 'bg-brand-secondary',
    value: 'text-brand-primary',
    label: 'text-white/80',
  },
  orange: {
    section: 'bg-brand-primary',
    value: 'text-white',
    label: 'text-white/85',
  },
  white: {
    section: 'bg-white border-y border-brand-border-light',
    value: 'text-brand-primary',
    label: 'text-brand-text-mid',
  },
  cream: {
    section: 'bg-brand-cream border-y border-brand-border-light',
    value: 'text-brand-secondary',
    label: 'text-brand-text-mid',
  },
}

export function StatsBarBlockComponent({ backgroundColor = 'dark', stats, isHome }: Props) {
  const styles = isHome ? styleMap.cream : (styleMap[backgroundColor] ?? styleMap.dark)

  return (
    <section className={cn('py-12 md:py-16', isHome ? 'bg-[#FAF7EF]' : styles.section)}>
      <Container>
        <div
          className={cn(
            'grid gap-8 text-center',
            isHome
              ? 'grid-cols-1 sm:grid-cols-3'
              : 'grid-cols-2 md:grid-cols-4',
          )}
        >
          {stats.map((stat, i) => (
            <div key={i} className={cn(isHome && 'px-4 py-2 sm:py-0')}>
              <p
                className={cn(
                  'mb-1 font-heading font-normal',
                  isHome ? 'text-4xl text-brand-secondary md:text-5xl lg:text-6xl' : 'text-4xl font-extrabold',
                  !isHome && styles.value,
                )}
              >
                {stat.value}
              </p>
              <p
                className={cn(
                  'text-xs font-semibold uppercase tracking-widest',
                  isHome ? 'text-brand-text-muted' : styles.label,
                )}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
