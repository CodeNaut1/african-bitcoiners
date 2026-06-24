import { cn } from '@/utilities/ui'
import Image from 'next/image'
import * as React from 'react'

export interface PageHeroButton {
  label: string
  href: string
  variant?: 'primary' | 'secondary' | 'white'
}

export interface PageHeroProps {
  heading: string
  subheading?: string
  buttons?: PageHeroButton[]
  image?: string
  imageAlt?: string
  /** Where to place the image */
  imagePosition?: 'right' | 'background'
  /** Color scheme of the hero */
  variant?: 'default' | 'orange' | 'dark'
  className?: string
  children?: React.ReactNode
}

const variantStyles: Record<string, string> = {
  default: 'bg-brand-cream text-brand-secondary',
  orange: 'bg-brand-primary text-white',
  dark: 'bg-brand-secondary text-white',
}

const PageHero: React.FC<PageHeroProps> = ({
  heading,
  subheading,
  buttons = [],
  image,
  imageAlt = '',
  imagePosition = 'right',
  variant = 'default',
  className,
  children,
}) => {
  const isOverlay = imagePosition === 'background' && image

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        variantStyles[variant],
        className,
      )}
    >
      {/* Background image */}
      {isOverlay && (
        <>
          <Image src={image} alt={imageAlt} fill className="object-cover opacity-30" priority />
          <div className="absolute inset-0 bg-brand-secondary/60" />
        </>
      )}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div
          className={cn(
            'flex flex-col gap-6',
            image && imagePosition === 'right' ? 'lg:flex-row lg:items-center lg:gap-12' : '',
          )}
        >
          {/* Text content */}
          <div className={cn('flex flex-col gap-4', image && imagePosition === 'right' ? 'lg:w-1/2' : '')}>
            <h1
              className={cn(
                'font-bold text-4xl md:text-5xl leading-tight',
                variant === 'default' && 'text-brand-secondary',
              )}
            >
              {heading}
            </h1>
            {subheading && (
              <p
                className={cn(
                  'text-lg md:text-xl leading-relaxed',
                  variant === 'default' ? 'text-brand-text-mid' : 'opacity-90',
                )}
              >
                {subheading}
              </p>
            )}
            {buttons.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-2">
                {buttons.map((btn, i) => (
                  <a
                    key={i}
                    href={btn.href}
                    className={cn(
                      'inline-flex items-center justify-center rounded-btn px-8 py-4 font-semibold text-base transition-colors duration-200',
                      (!btn.variant || btn.variant === 'primary') &&
                        'bg-brand-primary text-white hover:bg-brand-secondary',
                      btn.variant === 'secondary' &&
                        'border-2 border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white',
                      btn.variant === 'white' &&
                        'bg-white text-brand-secondary hover:bg-brand-cream',
                    )}
                  >
                    {btn.label}
                  </a>
                ))}
              </div>
            )}
            {children}
          </div>

          {/* Right-side image */}
          {image && imagePosition === 'right' && (
            <div className="relative lg:w-1/2 h-64 md:h-80 lg:h-96 rounded-section overflow-hidden">
              <Image src={image} alt={imageAlt} fill className="object-cover" priority />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export { PageHero }
