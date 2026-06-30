import Link from 'next/link'
import React, { Fragment } from 'react'
import { ArrowRight } from 'lucide-react'

import { cn } from '@/utilities/ui'
import { ABButton } from '@/components/ui/ab-button'
import { Container } from '@/components/ui/container'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'

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
  layout?: 'split' | 'background' | 'centered' | 'text-left-image-right' | 'text-overlay'
  eyebrow?: string
  eyebrowUrl?: string
  eyebrowNewTab?: boolean
  heading: string
  subheading?: any
  links?: HeroLink[]
  backgroundType?: 'cream' | 'orange' | 'dark' | 'white' | 'image'
  backgroundImage?: any
  images?: HeroImage[]
  isHome?: boolean
}

// Renders a heading where text wrapped in *asterisks* is highlighted in the brand color.
function renderHeading(heading: string) {
  if (!heading.includes('*')) return heading
  return heading.split(/\*([^*]+)\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="text-brand-primary">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}

const bgMap: Record<string, string> = {
  cream: 'bg-brand-cream text-brand-secondary',
  orange: 'bg-brand-primary text-white',
  dark: 'bg-brand-secondary text-white',
  white: 'bg-white text-brand-secondary',
  image: 'relative text-white',
}

export function HeroBlockComponent({
  layout = 'split',
  eyebrow,
  eyebrowUrl,
  eyebrowNewTab = true,
  heading,
  subheading,
  links,
  backgroundType = 'cream',
  backgroundImage,
  images,
  isHome,
}: Props) {
  // Normalize legacy layout values onto the split / background / centered model.
  const normalizedLayout =
    layout === 'text-left-image-right'
      ? 'split'
      : layout === 'text-overlay'
        ? 'background'
        : layout

  const isCentered = isHome || normalizedLayout === 'centered'
  // "background" = full-width background image + dark overlay. Legacy "image" background type maps here too.
  const isBackground = !isHome && (normalizedLayout === 'background' || backgroundType === 'image')

  // The full-width image used by the background layout (explicit backgroundImage, else first hero image).
  const bgImageResource =
    backgroundImage && typeof backgroundImage === 'object'
      ? backgroundImage
      : images && images[0]?.image && typeof images[0].image === 'object'
        ? images[0].image
        : null
  const showBgImage = isBackground && Boolean(bgImageResource)
  const bgImageUrl = showBgImage
    ? getMediaUrl(
      (bgImageResource as { url?: string }).url,
      (bgImageResource as { updatedAt?: string }).updatedAt,
    )
    : null

  // Split / centered heroes sit on a solid background that DEFAULTS TO CREAM — never blue, unless an
  // author explicitly chooses the "Dark Blue" background type. The blue (#253343) is reserved for the
  // dark gradient overlay of the background layout.
  const sectionBg = isHome
    ? 'bg-[#FFFBF5] text-[#4D4D4D]'
    : isBackground
      ? showBgImage
        ? 'relative text-[#4D4D4D]'
        : 'bg-brand-secondary text-[#4D4D4D]'
      : bgMap[backgroundType] ?? bgMap.cream

  // White text whenever the backdrop is dark (home, background overlay, or explicit dark/orange/image).
  const effectiveBg = isHome || isBackground ? 'dark' : backgroundType

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        sectionBg,
        showBgImage && 'flex min-h-[420px] items-center bg-cover bg-center md:min-h-[520px]',
      )}
      style={bgImageUrl ? { backgroundImage: `url("${bgImageUrl}")` } : undefined}
    >
      {/* Dark gradient overlay (left → right) keeps the overlaid text readable. */}
      {showBgImage && (
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#253343]/95 via-[#253343]/75 to-[#253343]/25" />
      )}

      <Container
        className={cn(
          'relative z-10 w-full',
          isHome ? 'py-12 md:py-16 lg:py-20 text-center' : 'py-16 md:py-24',
          isCentered && !isHome ? 'text-center' : '',
        )}
      >
        {isHome ? (
          <div className="mx-auto flex max-w-5xl flex-col items-center">
            <HeroText
              eyebrow={eyebrow}
              eyebrowUrl={eyebrowUrl}
              eyebrowNewTab={eyebrowNewTab}
              heading={heading}
              subheading={subheading}
              links={links}
              backgroundType={effectiveBg}
              centered
              isHome
            />
          </div>
        ) : isBackground ? (
          <div className="max-w-2xl">
            <HeroText
              eyebrow={eyebrow}
              eyebrowUrl={eyebrowUrl}
              eyebrowNewTab={eyebrowNewTab}
              heading={heading}
              subheading={subheading}
              links={links}
              backgroundType={effectiveBg}
            />
          </div>
        ) : isCentered ? (
          <div className="mx-auto max-w-3xl">
            <HeroText
              eyebrow={eyebrow}
              eyebrowUrl={eyebrowUrl}
              eyebrowNewTab={eyebrowNewTab}
              heading={heading}
              subheading={subheading}
              links={links}
              backgroundType={effectiveBg}
              centered
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <div className="flex-1">
              <HeroText
                eyebrow={eyebrow}
                eyebrowUrl={eyebrowUrl}
                eyebrowNewTab={eyebrowNewTab}
                heading={heading}
                subheading={subheading}
                links={links}
                backgroundType={effectiveBg}
              />
            </div>
            {images && images.length > 0 && (
              <div
                className={cn(
                  'flex flex-1 justify-center',
                  images.length === 1 ? '' : 'gap-3',
                )}
              >
                {images.length === 1 ? (
                  <div className="relative aspect-[1600/563] w-full max-w-xl overflow-hidden rounded-card shadow-elevated">
                    <Media resource={images[0].image} fill className="object-cover" />
                  </div>
                ) : (
                  images.slice(0, 2).map((img, i) => (
                    <div
                      key={i}
                      className={cn(
                        'relative overflow-hidden rounded-card shadow-elevated',
                        i === 0 ? 'h-72 w-56' : 'h-60 w-44 self-end',
                      )}
                    >
                      <Media resource={img.image} fill className="object-cover" />
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </Container>

      {isHome && images && images.length > 0 && (
        <div className="relative z-10 pb-10 md:pb-14">
          {images.length === 1 ? (
            <div className="relative mx-auto aspect-[1662/585] w-full max-w-6xl overflow-hidden px-4 md:px-6">
              <Media resource={images[0].image} fill className="object-contain object-bottom" />
            </div>
          ) : (
            <div className="flex items-end justify-center gap-2 px-4 sm:gap-3 md:gap-4">
              {images.slice(0, 5).map((img, i) => (
                <div
                  key={i}
                  className={cn(
                    'relative overflow-hidden rounded-2xl shadow-elevated ring-2 ring-white/10',
                    i === 0 || i === 4 ? 'h-40 w-28 sm:h-48 sm:w-32 md:h-64 md:w-40' : 'h-48 w-32 sm:h-56 sm:w-36 md:h-72 md:w-44',
                    i === 1 ? 'md:translate-y-6' : '',
                    i === 2 ? 'md:-translate-y-3' : '',
                    i === 3 ? 'md:translate-y-4' : '',
                    i % 2 === 0 ? 'z-10' : 'z-20',
                  )}
                >
                  <Media resource={img.image} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

function HeroText({
  eyebrow,
  eyebrowUrl,
  eyebrowNewTab = true,
  heading,
  subheading,
  links,
  backgroundType,
  centered,
  isHome,
}: {
  eyebrow?: string
  eyebrowUrl?: string
  eyebrowNewTab?: boolean
  heading: string
  subheading?: any
  links?: HeroLink[]
  backgroundType?: string
  centered?: boolean
  isHome?: boolean
}) {
  const isDark = backgroundType === 'orange' || backgroundType === 'dark' || backgroundType === 'image'
  const eyebrowClass = isHome
    ? 'mb-4 inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-[#777777] border border-[#AEAEAE] rounded-full px-4 py-2 bg-transparent hover:bg-[#4D4D4D] hover:text-white transition-colors sm:text-sm'
    : isDark
      ? 'mb-3 text-sm font-semibold uppercase tracking-widest text-white/80'
      : 'mb-3 text-sm font-semibold uppercase tracking-widest text-brand-primary'

  return (
    <>
      {eyebrow &&
        (eyebrowUrl ? (
          <Link
            href={eyebrowUrl}
            target={eyebrowNewTab ? '_blank' : undefined}
            rel={eyebrowNewTab ? 'noopener noreferrer' : undefined}
            className={cn(eyebrowClass, centered && 'mx-auto')}
          >
            {eyebrow}
            {isHome && <ArrowRight size={14} className="shrink-0" />}
          </Link>
        ) : (
          <p className={cn(eyebrowClass, centered && 'mx-auto')}>{eyebrow}</p>
        ))}
      <h1
        className={cn(
          'font-heading font-medium leading-tight',
          isHome
            ? // Instrument Serif applied locally to the homepage hero heading only
            "font-[family-name:var(--font-instrument-serif)] mb-8 text-[#4D4D4D] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[5rem] lg:leading-[1.1]"
            : cn('mb-8 text-3xl sm:text-4xl md:text-5xl', isDark ? 'text-white' : 'text-brand-secondary'),
          centered ? 'mx-auto' : '',
        )}
      >
        {isHome ? (
          <>Bringing Freedom to<br className="hidden lg:block" /> Africa through Bitcoin</>
        ) : (
          renderHeading(heading)
        )}
      </h1>
      {subheading && (
        <div
          className={cn(
            'leading-relaxed',
            isHome
              ? 'mx-auto mb-8 max-w-2xl !text-base sm:!text-lg md:!text-xl [&_p]:!text-base sm:[&_p]:!text-lg md:[&_p]:!text-xl [&_span]:!text-base sm:[&_span]:!text-lg md:[&_span]:!text-xl !font-normal [&_p]:!font-normal [&_span]:!font-normal !text-[#4D4D4D] [&_p]:!text-[#4D4D4D] [&_span]:!text-[#4D4D4D]'
              : cn('mb-8 text-base md:text-lg', isDark ? 'text-[#4D4D4D]' : 'text-brand-text-mid'),
          )}
        >
          <RichText data={subheading} enableGutter={false} />
        </div>
      )}
      {links && links.length > 0 && (
        <div
          className={cn(
            'flex flex-wrap items-center gap-4',
            centered || isHome ? 'justify-center' : '',
          )}
        >
          {links.map((item, i) => {
            const { link } = item
            const href = link.url || (link.reference ? `/${(link.reference as any).value?.slug || ''}` : '#')
            const isOutline = link.appearance === 'outline' || i > 0

            if (isHome) {
              // Secondary CTA: transparent pill with a grey border, matching the
              // "Visit Website" buttons elsewhere on the homepage.
              if (isOutline) {
                return (
                  <Link
                    key={i}
                    href={href}
                    target={link.newTab ? '_blank' : undefined}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#AEAEAE] bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#777777] transition-colors duration-200 hover:bg-[#4D4D4D] hover:text-white"
                  >
                    {link.label}
                  </Link>
                )
              }
              return (
                <ABButton
                  key={i}
                  asChild
                  variant="primary"
                  size="sm"
                  className="rounded-full uppercase tracking-wide bg-brand-primary hover:bg-brand-primary/90 px-6 py-3 text-sm"
                >
                  <Link href={href} target={link.newTab ? '_blank' : undefined}>
                    {link.label}
                  </Link>
                </ABButton>
              )
            }

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
