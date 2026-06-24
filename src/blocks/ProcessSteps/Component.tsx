import Link from 'next/link'
import React from 'react'

import { cn } from '@/utilities/ui'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import RichText from '@/components/RichText'

type Step = {
  number: number
  title: string
  description?: any
  linkText?: string
  linkURL?: string
}

type Props = {
  eyebrow?: string
  heading?: string
  subheading?: string
  variant?: 'numbered' | 'horizontal'
  backgroundColor?: 'cream' | 'white' | 'dark'
  steps: Step[]
}

const bgMap: Record<string, string> = {
  cream: 'bg-brand-cream',
  white: 'bg-white',
  dark: 'bg-brand-secondary',
}

export function ProcessStepsBlockComponent({
  eyebrow,
  heading,
  subheading,
  variant = 'numbered',
  backgroundColor = 'cream',
  steps,
}: Props) {
  const isDark = backgroundColor === 'dark'

  return (
    <section className={cn('py-16', bgMap[backgroundColor] ?? bgMap.cream)}>
      <Container>
        {(eyebrow || heading) && (
          <SectionHeading
            eyebrow={eyebrow}
            heading={heading || ''}
            subheading={subheading}
            align="center"
            dark={isDark}
            className="mb-14"
          />
        )}

        {variant === 'horizontal' ? (
          <div className="flex flex-col md:flex-row gap-8">
            {steps.map((step, i) => (
              <div key={i} className="flex-1 relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-brand-primary/20 z-0 -translate-x-4" />
                )}
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center font-extrabold text-lg mb-4">
                    {step.number}
                  </div>
                  <h3 className={cn('text-lg font-bold mb-2', isDark ? 'text-white' : 'text-brand-secondary')}>{step.title}</h3>
                  {step.description && (
                    <div className={cn('text-sm leading-relaxed', isDark ? 'text-white/75' : 'text-brand-text-mid')}>
                      <RichText data={step.description} enableGutter={false} />
                    </div>
                  )}
                  {step.linkText && step.linkURL && (
                    <Link href={step.linkURL} className="inline-block mt-3 text-sm font-semibold text-brand-primary hover:text-brand-secondary transition-colors">
                      {step.linkText} →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Cascade / zigzag numbered layout */
          <div className="space-y-0">
            {steps.map((step, i) => {
              const isEven = i % 2 === 1
              return (
                <div
                  key={i}
                  className={cn(
                    'flex flex-col md:flex-row items-start gap-8 py-10 border-t',
                    isDark ? 'border-white/10' : 'border-brand-border-light',
                    isEven ? 'md:flex-row-reverse' : '',
                  )}
                >
                  {/* Number */}
                  <div className="shrink-0">
                    <div
                      className={cn(
                        'w-16 h-16 rounded-full flex items-center justify-center font-extrabold text-2xl',
                        isDark ? 'bg-brand-primary text-white' : 'bg-brand-primary text-white',
                      )}
                    >
                      {step.number}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={cn('text-xl font-bold mb-3', isDark ? 'text-white' : 'text-brand-secondary')}>
                      {step.title}
                    </h3>
                    {step.description && (
                      <div className={cn('text-base leading-relaxed', isDark ? 'text-white/80' : 'text-brand-text-mid')}>
                        <RichText data={step.description} enableGutter={false} />
                      </div>
                    )}
                    {step.linkText && step.linkURL && (
                      <Link href={step.linkURL} className="inline-block mt-4 text-sm font-semibold text-brand-primary hover:text-brand-secondary transition-colors">
                        {step.linkText} →
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Container>
    </section>
  )
}
