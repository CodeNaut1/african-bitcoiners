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

export function StatsBarBlockComponent({ backgroundColor = 'dark', stats }: Props) {
  const styles = styleMap[backgroundColor] ?? styleMap.dark

  return (
    <section className={cn('py-12', styles.section)}>
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <p className={cn('text-4xl font-extrabold mb-1', styles.value)}>{stat.value}</p>
              <p className={cn('text-sm font-semibold uppercase tracking-wider', styles.label)}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
