import Link from 'next/link'
import React from 'react'

import { cn } from '@/utilities/ui'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

type Card = {
  image?: any
  eyebrow?: string
  title: string
  description?: any
  linkLabel?: string
  linkUrl?: string
  linkNewTab?: boolean
}

type Props = {
  eyebrow?: string
  heading?: string
  subheading?: string
  columns?: '2' | '3' | '4'
  variant?: 'default' | 'orange-accent' | 'dark'
  cards: Card[]
}

const colMap: Record<string, string> = {
  '2': 'grid-cols-1 sm:grid-cols-2',
  '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

export function CardGridBlockComponent({
  eyebrow,
  heading,
  subheading,
  columns = '3',
  variant = 'default',
  cards,
}: Props) {
  const isDark = variant === 'dark'
  const isOrange = variant === 'orange-accent'

  return (
    <section className={cn('py-16', isDark ? 'bg-brand-secondary text-white' : 'bg-brand-cream')}>
      <Container>
        {(eyebrow || heading) && (
          <SectionHeading
            eyebrow={eyebrow}
            heading={heading || ''}
            subheading={subheading}
            align="center"
            className="mb-12"
            dark={isDark}
          />
        )}
        <div className={cn('grid gap-6', colMap[columns] ?? colMap['3'])}>
          {cards.map((card, i) => (
            <article
              key={i}
              className={cn(
                'rounded-card overflow-hidden transition-shadow duration-200',
                isDark
                  ? 'bg-white/10 text-white border border-white/10 hover:bg-white/15'
                  : 'bg-white shadow-card hover:shadow-elevated border border-brand-border-light',
                isOrange && i === 0 ? 'border-l-4 border-l-brand-primary' : '',
              )}
            >
              {card.image && typeof card.image === 'object' && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Media resource={card.image} fill className="object-cover" />
                </div>
              )}
              <div className="p-6">
                {card.eyebrow && (
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary mb-2">
                    {card.eyebrow}
                  </p>
                )}
                <h3 className="text-lg font-bold mb-3">{card.title}</h3>
                {card.description && (
                  <div className={cn('text-sm leading-relaxed mb-4', isDark ? 'text-white/80' : 'text-brand-text-mid')}>
                    <RichText data={card.description} enableGutter={false} />
                  </div>
                )}
                {card.linkLabel && card.linkUrl && (
                  <Link
                    href={card.linkUrl}
                    target={card.linkNewTab ? '_blank' : undefined}
                    className="text-sm font-semibold text-brand-primary hover:text-brand-secondary transition-colors"
                  >
                    {card.linkLabel} →
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
