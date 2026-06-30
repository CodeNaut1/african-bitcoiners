import Link from 'next/link'
import React from 'react'
import { Check } from 'lucide-react'

import { cn } from '@/utilities/ui'
import { ABButton } from '@/components/ui/ab-button'
import { Container } from '@/components/ui/container'
import { Media } from '@/components/Media'

import { CopyBtcAddressButton } from './CopyBtcAddressButton'

type Props = {
  eyebrow?: string
  heading: string
  description?: string
  bulletPoints?: Array<{ point: string }>
  primaryButtonLabel?: string
  primaryButtonUrl?: string
  secondaryButtonLabel?: string
  secondaryButtonUrl?: string
  qrCodeImage?: any
  qrCaption?: string
  backgroundColor?: 'cream' | 'dark' | 'white'
  isHome?: boolean
}

const styleMap: Record<string, { section: string; eyebrow: string; heading: string; body: string }> = {
  cream: {
    section: 'bg-brand-cream',
    eyebrow: 'text-brand-primary',
    heading: 'text-brand-secondary',
    body: 'text-brand-text-mid',
  },
  dark: {
    section: 'bg-brand-secondary',
    eyebrow: 'text-brand-accent',
    heading: 'text-white',
    body: 'text-white/80',
  },
  white: {
    section: 'bg-white',
    eyebrow: 'text-brand-primary',
    heading: 'text-brand-secondary',
    body: 'text-brand-text-mid',
  },
}

export function SupportSectionBlockComponent({
  eyebrow,
  heading,
  description,
  bulletPoints,
  primaryButtonLabel,
  primaryButtonUrl,
  secondaryButtonLabel,
  secondaryButtonUrl,
  qrCodeImage,
  qrCaption,
  backgroundColor = 'cream',
  isHome,
}: Props) {
  const styles = styleMap[backgroundColor] ?? styleMap.cream
  const isDark = backgroundColor === 'dark'

  return (
    <section className={cn('py-16 md:py-20', isHome ? 'bg-[#F7F4EA]' : styles.section)}>
      <Container>
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex-1">
            {eyebrow && !isHome && (
              <p className={cn('mb-3 text-xs font-semibold uppercase tracking-widest', styles.eyebrow)}>
                {eyebrow}
              </p>
            )}
            <h2
              className={cn(
                'mb-4 font-normal',
                isHome
                  ? 'font-[family-name:var(--font-instrument-serif)] text-[#4D4D4D] text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
                  : cn('font-heading text-3xl md:text-4xl', styles.heading),
              )}
            >
              {heading}
            </h2>
            {description && (
              <p className={cn('mb-6 text-base leading-relaxed md:text-lg', styles.body)}>{description}</p>
            )}
            {bulletPoints && bulletPoints.length > 0 && (
              <ul className="mb-8 space-y-3">
                {bulletPoints.map((bp, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-primary">
                      <Check size={12} className="text-white" />
                    </span>
                    <span className={cn('text-sm leading-relaxed md:text-base', styles.body)}>{bp.point}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex flex-wrap gap-4">
              {primaryButtonLabel && primaryButtonUrl && (
                <ABButton
                  asChild
                  variant={isDark ? 'white' : 'primary'}
                  size={isHome ? 'md' : undefined}
                  className={isHome ? 'rounded-full' : undefined}
                >
                  <Link href={primaryButtonUrl}>{primaryButtonLabel}</Link>
                </ABButton>
              )}
              {secondaryButtonLabel && secondaryButtonUrl && (
                <ABButton
                  asChild
                  variant={isHome ? 'secondary' : isDark ? 'outline' : 'secondary'}
                  size={isHome ? 'md' : undefined}
                  className={isHome ? 'rounded-full' : undefined}
                >
                  <Link href={secondaryButtonUrl}>{secondaryButtonLabel}</Link>
                </ABButton>
              )}
            </div>
          </div>

          {qrCodeImage && typeof qrCodeImage === 'object' && (
            <div className="shrink-0 text-center">
              <div
                className={cn(
                  'relative mx-auto overflow-hidden rounded-2xl bg-white shadow-elevated',
                  isHome ? 'h-70 w-70 p-4 md:h-80 md:w-80' : 'h-50 w-50 rounded-card border-4 border-white',
                )}
              >
                <Media resource={qrCodeImage} fill className="object-cover p-2" />
              </div>
              {isHome && (
                <div className="mt-3 flex justify-center">
                  <CopyBtcAddressButton />
                </div>
              )}
              {qrCaption && (
                <p className={cn('mt-3 text-xs font-medium', styles.body)}>{qrCaption}</p>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
