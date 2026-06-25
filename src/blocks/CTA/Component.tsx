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

const variantMap: Record<
  string,
  { section: string; heading: string; sub: string; primary: 'primary' | 'white'; secondary: 'secondary' | 'outline' }
> = {
  // Soft peach banner with an orange CTA button (matches the live section pages)
  orange: {
    section: 'bg-[#FCEEE8]',
    heading: 'text-brand-secondary',
    sub: 'text-brand-text-mid',
    primary: 'primary',
    secondary: 'secondary',
  },
  dark: {
    section: 'bg-brand-secondary',
    heading: 'text-white',
    sub: 'text-white/80',
    primary: 'white',
    secondary: 'outline',
  },
  light: {
    section: 'bg-brand-cream border-y border-brand-border-light',
    heading: 'text-brand-secondary',
    sub: 'text-brand-text-mid',
    primary: 'primary',
    secondary: 'secondary',
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

  return (
    <section className={cn('py-16 md:py-20', styles.section)}>
      <Container>
        <div className={cn(align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl')}>
          <h2 className={cn('font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-4', styles.heading)}>
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
                <ABButton asChild variant={styles.primary}>
                  <Link href={primaryButtonUrl}>{primaryButtonLabel}</Link>
                </ABButton>
              )}
              {secondaryButtonLabel && secondaryButtonUrl && (
                <ABButton asChild variant={styles.secondary}>
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
