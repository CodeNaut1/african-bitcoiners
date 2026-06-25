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
            headingClassName={isHome ? 'font-heading text-2xl font-normal md:text-3xl lg:text-4xl' : undefined}
          />
        )}
        <div className={cn('grid gap-5 md:gap-6', colMap[columns] ?? colMap['3'])}>
          {cards.map((card, i) => {
            const homeStyle = isHome ? HOME_CARD_COLORS[i % HOME_CARD_COLORS.length] : null
            const hasImage = isHome && card.image && typeof card.image === 'object'
            const imageUrl = hasImage ? (card.image as { url?: string }).url : undefined

            return (
              <article
                key={i}
                className={cn(
                  'relative overflow-hidden transition-shadow duration-200',
                  isHome
                    ? cn(
                        'min-h-[220px] rounded-xl p-6 md:min-h-[260px] md:p-8',
                        !hasImage && homeStyle?.bg,
                        !hasImage && homeStyle?.text,
                        hasImage ? 'bg-cover bg-center bg-no-repeat' : '',
                      )
                    : cn(
                        'flex flex-col rounded-2xl p-4',
                        isDark
                          ? 'border border-white/10 bg-white/10 text-white hover:bg-white/15'
                          : 'border border-brand-border-light bg-white shadow-card hover:shadow-elevated',
                        isOrange && i === 0 ? 'border-l-4 border-l-brand-primary' : '',
                      ),
                )}
                style={hasImage && imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
              >
                {isHome && card.linkUrl && (
                  <Link
                    href={card.linkUrl}
                    target={card.linkNewTab ? '_blank' : undefined}
                    className={cn(
                      'absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full transition-opacity hover:opacity-80 md:right-6 md:top-6',
                      hasImage
                        ? i === 3
                          ? 'bg-brand-secondary/10 text-brand-secondary'
                          : 'bg-white/20 text-white'
                        : homeStyle?.arrow,
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

                <div className={cn(!isHome && 'flex flex-1 flex-col', isHome && hasImage && 'relative z-10')}>
                  {!isHome && card.eyebrow && (
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-primary">
                      {card.eyebrow}
                    </p>
                  )}
                  <h3
                    className={cn(
                      'font-heading font-normal',
                      isHome
                        ? cn(
                            'mb-2 text-xl md:text-2xl',
                            hasImage
                              ? i === 3
                                ? 'text-brand-secondary'
                                : 'text-white'
                              : homeStyle?.text,
                          )
                        : 'mb-2 text-lg font-semibold',
                    )}
                  >
                    {card.title}
                  </h3>
                  {card.description && (
                    <div
                      className={cn(
                        'text-sm leading-relaxed',
                        isHome
                          ? cn(
                              'mb-0 max-w-[85%]',
                              hasImage
                                ? i === 3
                                  ? 'text-brand-text-mid'
                                  : 'text-white/90'
                                : homeStyle?.muted,
                            )
                          : isDark
                            ? 'mb-4 text-white/80'
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
