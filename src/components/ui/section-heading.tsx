import { cn } from '@/utilities/ui'
import * as React from 'react'

export interface SectionHeadingProps {
  eyebrow?: string
  heading: string
  subheading?: string
  align?: 'left' | 'center'
  className?: string
  headingClassName?: string
  dark?: boolean
  /** Homepage variant: render the heading in Instrument Serif with the #4D4D4D brand color. */
  isHome?: boolean
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  heading,
  subheading,
  align = 'center',
  className,
  headingClassName,
  dark = false,
  isHome = false,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        align === 'left' && 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <span className={cn('font-bold text-sm tracking-widest uppercase', dark ? 'text-brand-accent' : 'text-brand-primary')}>
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'font-normal leading-tight',
          isHome
            ? 'font-[family-name:var(--font-instrument-serif)] text-[#4D4D4D] text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
            : cn('font-heading text-3xl md:text-4xl', dark ? 'text-white' : 'text-brand-secondary'),
          headingClassName,
        )}
      >
        {heading}
      </h2>
      {subheading && (
        <p className={cn('text-base md:text-lg leading-relaxed max-w-2xl', dark ? 'text-white/80' : 'text-brand-text-mid')}>
          {subheading}
        </p>
      )}
    </div>
  )
}

export { SectionHeading }
