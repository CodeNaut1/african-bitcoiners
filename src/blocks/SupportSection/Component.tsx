import Link from 'next/link'
import React from 'react'
import { Check } from 'lucide-react'

import { cn } from '@/utilities/ui'
import { ABButton } from '@/components/ui/ab-button'
import { Container } from '@/components/ui/container'
import { Media } from '@/components/Media'

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
}: Props) {
  const styles = styleMap[backgroundColor] ?? styleMap.cream
  const isDark = backgroundColor === 'dark'

  return (
    <section className={cn('py-16', styles.section)}>
      <Container>
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Content side */}
          <div className="flex-1">
            {eyebrow && (
              <p className={cn('text-xs font-semibold uppercase tracking-widest mb-3', styles.eyebrow)}>
                {eyebrow}
              </p>
            )}
            <h2 className={cn('text-3xl md:text-4xl font-bold mb-4', styles.heading)}>{heading}</h2>
            {description && (
              <p className={cn('text-base leading-relaxed mb-6', styles.body)}>{description}</p>
            )}
            {bulletPoints && bulletPoints.length > 0 && (
              <ul className="space-y-3 mb-8">
                {bulletPoints.map((bp, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-brand-primary flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </span>
                    <span className={cn('text-sm leading-relaxed', styles.body)}>{bp.point}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex flex-wrap gap-4">
              {primaryButtonLabel && primaryButtonUrl && (
                <ABButton asChild variant={isDark ? 'white' : 'primary'}>
                  <Link href={primaryButtonUrl}>{primaryButtonLabel}</Link>
                </ABButton>
              )}
              {secondaryButtonLabel && secondaryButtonUrl && (
                <ABButton asChild variant={isDark ? 'outline' : 'secondary'}>
                  <Link href={secondaryButtonUrl}>{secondaryButtonLabel}</Link>
                </ABButton>
              )}
            </div>
          </div>

          {/* QR code side */}
          {qrCodeImage && typeof qrCodeImage === 'object' && (
            <div className="shrink-0 text-center">
              <div className="relative w-40 h-40 mx-auto rounded-card overflow-hidden border-4 border-white shadow-elevated">
                <Media resource={qrCodeImage} fill className="object-contain p-2" />
              </div>
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
