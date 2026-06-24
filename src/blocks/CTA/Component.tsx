import Link from 'next/link'
import React from 'react'

import { cn } from '@/utilities/ui'
import { ABButton } from '@/components/ui/ab-button'
import { Container } from '@/components/ui/container'

type Props = {
  heading: string
  subheading?: string
  variant?: 'orange' | 'dark' | 'light'
  primaryButtonLabel?: string
  primaryButtonUrl?: string
  secondaryButtonLabel?: string
  secondaryButtonUrl?: string
  align?: 'center' | 'left'
}

const variantMap: Record<string, { section: string; heading: string; sub: string }> = {
  orange: {
    section: 'bg-brand-primary',
    heading: 'text-white',
    sub: 'text-white/90',
  },
  dark: {
    section: 'bg-brand-secondary',
    heading: 'text-white',
    sub: 'text-white/80',
  },
  light: {
    section: 'bg-brand-cream border-y border-brand-border-light',
    heading: 'text-brand-secondary',
    sub: 'text-brand-text-mid',
  },
}

export function CTABannerBlockComponent({
  heading,
  subheading,
  variant = 'orange',
  primaryButtonLabel,
  primaryButtonUrl,
  secondaryButtonLabel,
  secondaryButtonUrl,
  align = 'center',
}: Props) {
  const styles = variantMap[variant] ?? variantMap.orange
  const isLight = variant === 'light'

  return (
    <section className={cn('py-16', styles.section)}>
      <Container>
        <div className={cn(align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl')}>
          <h2 className={cn('text-3xl md:text-4xl font-bold mb-4', styles.heading)}>
            {heading}
          </h2>
          {subheading && (
            <p className={cn('text-base md:text-lg leading-relaxed mb-8', styles.sub)}>
              {subheading}
            </p>
          )}
          {(primaryButtonLabel || secondaryButtonLabel) && (
            <div className={cn('flex flex-wrap gap-4', align === 'center' ? 'justify-center' : '')}>
              {primaryButtonLabel && primaryButtonUrl && (
                <ABButton asChild variant={isLight ? 'primary' : 'white'}>
                  <Link href={primaryButtonUrl}>{primaryButtonLabel}</Link>
                </ABButton>
              )}
              {secondaryButtonLabel && secondaryButtonUrl && (
                <ABButton asChild variant={isLight ? 'secondary' : 'outline'}>
                  <Link href={secondaryButtonUrl}>{secondaryButtonLabel}</Link>
                </ABButton>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
