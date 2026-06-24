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
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  heading,
  subheading,
  align = 'center',
  className,
  headingClassName,
  dark = false,
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
          'font-bold text-3xl md:text-4xl leading-tight',
          dark ? 'text-white' : 'text-brand-secondary',
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
