import Link from 'next/link'
import React from 'react'
import { ArrowUpRight } from 'lucide-react'

import { cn } from '@/utilities/ui'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { HOME_CARD_COLORS } from '@/blocks/home/homeBlockStyles'

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
  isHome?: boolean
}

const colMap: Record<string, string> = {
  '2': 'grid-cols-1 sm:grid-cols-2',
  '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

const HOME_CARD_LINKS: Record<string, string> = {
  'Learn Bitcoin': '/learn-bitcoin',
  'Earn Bitcoin': '/earn-bitcoin',
  'Save Bitcoin': '/save-bitcoin',
  'Spend Bitcoin': '/spend-bitcoin',
}

export function CardGridBlockComponent({
  eyebrow,
  heading,
  subheading,
  columns = '3',
  variant = 'default',
  cards,
  isHome,
}: Props) {
  const isDark = variant === 'dark'
  const isOrange = variant === 'orange-accent'

  return (
    <section className={cn('py-16 md:py-20', isHome ? 'bg-[#FFFBF5]' : isDark ? 'bg-brand-secondary text-white' : 'bg-brand-cream')}>
      <Container>
        {(eyebrow || heading) && (
          <SectionHeading
            eyebrow={isHome ? undefined : eyebrow}
            heading={isHome ? eyebrow || heading || '' : heading || ''}
            subheading={isHome ? undefined : subheading}
            align="center"
            className="mb-10 md:mb-14"
            dark={isDark}
            isHome={isHome}
          />
        )}
        <div className={cn('grid gap-5 md:gap-6', colMap[columns] ?? colMap['3'])}>
          {cards.map((card, i) => {
            const homeStyle = isHome ? HOME_CARD_COLORS[i % HOME_CARD_COLORS.length] : null
            const isSpendCard = isHome && i === 3
            const cardHref = card.linkUrl || HOME_CARD_LINKS[card.title] || '#'
            const hasImage = isHome && card.image && typeof card.image === 'object'

            return (
              <article
                key={i}
                className={cn(
                  'relative overflow-hidden transition-shadow duration-200',
                  isHome
                    ? cn(
                      'flex min-h-[360px] flex-col rounded-xl sm:min-h-[400px]',
                      !hasImage && homeStyle?.bg,
                    )
                    : cn(
                      'flex flex-col rounded-2xl p-4',
                      isDark
                        ? 'border border-white/10 bg-white/10 text-white hover:bg-white/15'
                        : 'border border-brand-border-light bg-white shadow-card hover:shadow-elevated',
                      isOrange && i === 0 ? 'border-l-4 border-l-brand-primary' : '',
                    ),
                )}
              >
                {isHome && hasImage && (
                  <div className="absolute inset-0">
                    <Media
                      resource={card.image}
                      fill
                      className="relative h-full w-full"
                      imgClassName="object-cover"
                      priority={i < 2}
                    />
                  </div>
                )}

                {isHome && (
                  <Link
                    href={cardHref}
                    target={card.linkNewTab ? '_blank' : undefined}
                    className={cn(
                      'absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full transition-opacity hover:opacity-80 md:right-6 md:top-6',
                      isSpendCard
                        ? 'bg-brand-secondary/10 text-brand-secondary'
                        : 'bg-white/20 text-white',
                    )}
                    aria-label={card.linkLabel || card.title}
                  >
                    <ArrowUpRight size={18} />
                  </Link>
                )}

                {!isHome && card.image && typeof card.image === 'object' && (
                  <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-xl">
                    <Media resource={card.image} fill className="object-cover" />
                  </div>
                )}

                <div
                  className={cn(
                    !isHome && 'flex flex-1 flex-col',
                    isHome && 'relative z-10 flex flex-1 flex-col p-6 md:p-8',
                  )}
                >
                  {!isHome && card.eyebrow && (
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-primary">
                      {card.eyebrow}
                    </p>
                  )}
                  <h3
                    className={cn(
                      'font-normal',
                      isHome
                        ? cn(
                          'mb-2 font-[family-name:var(--font-instrument-serif)] text-3xl md:text-4xl lg:text-5xl',
                          isSpendCard ? 'text-[#4D4D4D]' : 'text-white',
                        )
                        : 'mb-2 font-heading text-lg font-semibold',
                    )}
                  >
                    {card.title}
                  </h3>
                  {card.description && (
                    <div
                      className={cn(
                        'text-base md:text-lg leading-relaxed',
                        isHome
                          ? cn(
                            'mb-0 max-w-[85%]',
                            isSpendCard
                              ? 'text-[#4D4B4A] [&_p]:text-[#4D4B4A] [&_span]:text-[#4D4B4A]'
                              : 'text-white [&_p]:text-white [&_span]:text-white',
                          )
                          : isDark
                            ? 'mb-4 text-white'
                            : 'mb-4 text-brand-text-mid',
                      )}
                    >
                      <RichText data={card.description} enableGutter={false} />
                    </div>
                  )}
                  {!isHome && card.linkLabel && card.linkUrl && (
                    <Link
                      href={card.linkUrl}
                      target={card.linkNewTab ? '_blank' : undefined}
                      className="mt-auto inline-flex items-center text-sm font-semibold text-brand-primary transition-colors hover:text-brand-secondary"
                    >
                      {card.linkLabel}
                    </Link>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
