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

  if (isHome) {
    return (
      <section className="bg-[#FAF7EF] py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1440px] px-3 sm:px-4 lg:px-6">
          <div className="flex flex-col items-stretch sm:flex-row sm:items-center sm:justify-between">
            {stats.map((stat, i) => (
              <React.Fragment key={i}>
                {i > 0 && (
                  <>
                    <div
                      className="hidden h-24 w-px shrink-0 bg-[#00000026] sm:block md:h-28"
                      aria-hidden
                    />
                    <div className="mx-auto h-px w-3/4 bg-[#00000026] sm:hidden" aria-hidden />
                  </>
                )}
                <div className="flex-1 px-4 py-6 text-center sm:py-0 md:px-8 lg:px-12">
                  <p className="mb-2 font-[family-name:var(--font-instrument-serif)] text-6xl font-medium text-brand-secondary md:text-6xl lg:text-8xl">
                    {stat.value}
                  </p>
                  <p className="text-sm font-normal uppercase tracking-wide text-brand-secondary md:text-md">
                    {stat.label}
                  </p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={cn('py-12 md:py-16', styles.section)}>
      <Container>
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i}>
              <p className={cn('mb-1 text-3xl font-extrabold md:text-4xl', styles.value)}>
                {stat.value}
              </p>
              <p className={cn('text-xs font-semibold uppercase tracking-widest', styles.label)}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
