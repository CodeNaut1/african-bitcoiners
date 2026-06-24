import Link from 'next/link'
import React from 'react'

import { cn } from '@/utilities/ui'
import { ABButton } from '@/components/ui/ab-button'
import { Container } from '@/components/ui/container'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

type HeroLink = {
  link: {
    label?: string
    url?: string
    reference?: any
    newTab?: boolean
    appearance?: string
  }
}

type HeroImage = {
  image: any
  alt?: string
}

type Props = {
  layout?: 'text-left-image-right' | 'centered' | 'text-overlay'
  eyebrow?: string
  heading: string
  subheading?: any
  links?: HeroLink[]
  backgroundType?: 'cream' | 'orange' | 'dark' | 'white' | 'image'
  backgroundImage?: any
  images?: HeroImage[]
}

const bgMap: Record<string, string> = {
  cream: 'bg-brand-cream text-brand-secondary',
  orange: 'bg-brand-primary text-white',
  dark: 'bg-brand-secondary text-white',
  white: 'bg-white text-brand-secondary',
  image: 'relative text-white',
}

export function HeroBlockComponent({
  layout = 'text-left-image-right',
  eyebrow,
  heading,
  subheading,
  links,
  backgroundType = 'cream',
  backgroundImage,
  images,
}: Props) {
  const isCentered = layout === 'centered'
  const isOverlay = layout === 'text-overlay'

  return (
    <section className={cn('relative overflow-hidden', bgMap[backgroundType] ?? bgMap.cream)}>
      {/* Background image */}
      {backgroundType === 'image' && backgroundImage && typeof backgroundImage === 'object' && (
        <div className="absolute inset-0 z-0">
          <Media resource={backgroundImage} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      <Container
        className={cn(
          'relative z-10 py-16 md:py-24',
          isCentered ? 'text-center' : isOverlay ? 'text-center' : '',
        )}
      >
        {isCentered || isOverlay ? (
          <div className={cn('mx-auto', isCentered ? 'max-w-3xl' : 'max-w-4xl')}>
            <HeroText
              eyebrow={eyebrow}
              heading={heading}
              subheading={subheading}
              links={links}
              backgroundType={backgroundType}
              centered
            />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <HeroText
                eyebrow={eyebrow}
                heading={heading}
                subheading={subheading}
                links={links}
                backgroundType={backgroundType}
              />
            </div>
            {images && images.length > 0 && (
              <div className="flex-1 flex gap-3 justify-center">
                {images.slice(0, 2).map((img, i) => (
                  <div
                    key={i}
                    className={cn(
                      'relative rounded-card overflow-hidden shadow-elevated',
                      i === 0 ? 'w-56 h-72' : 'w-44 h-60 self-end',
                    )}
                  >
                    <Media resource={img.image} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  )
}

function HeroText({
  eyebrow,
  heading,
  subheading,
  links,
  backgroundType,
  centered,
}: {
  eyebrow?: string
  heading: string
  subheading?: any
  links?: HeroLink[]
  backgroundType?: string
  centered?: boolean
}) {
  const isDark = backgroundType === 'orange' || backgroundType === 'dark' || backgroundType === 'image'
  const eyebrowClass = isDark
    ? 'text-white/80 font-semibold text-sm uppercase tracking-widest mb-3'
    : 'text-brand-primary font-semibold text-sm uppercase tracking-widest mb-3'

  return (
    <>
      {eyebrow && <p className={eyebrowClass}>{eyebrow}</p>}
      <h1
        className={cn(
          'font-bold leading-tight mb-5',
          'text-3xl md:text-4xl lg:text-5xl',
          centered ? 'mx-auto' : '',
        )}
      >
        {heading}
      </h1>
      {subheading && (
        <div className="text-base md:text-lg leading-relaxed mb-8 opacity-90">
          <RichText data={subheading} enableGutter={false} />
        </div>
      )}
      {links && links.length > 0 && (
        <div className={cn('flex flex-wrap gap-4', centered ? 'justify-center' : '')}>
          {links.map((item, i) => {
            const { link } = item
            const href = link.url || (link.reference ? `/${(link.reference as any).value?.slug || ''}` : '#')
            const variant = i === 0 ? (isDark ? 'white' : 'primary') : 'secondary'
            return (
              <ABButton key={i} asChild variant={variant as any}>
                <Link href={href} target={link.newTab ? '_blank' : undefined}>
                  {link.label}
                </Link>
              </ABButton>
            )
          })}
        </div>
      )}
    </>
  )
}
