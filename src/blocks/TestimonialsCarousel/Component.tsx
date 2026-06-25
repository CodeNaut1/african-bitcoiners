import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { cn } from '@/utilities/ui'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import RichText from '@/components/RichText'

type Testimonial = {
  text: any
  name: string
  role?: string
  avatarColor?: string
  initial?: string
}

type Props = {
  eyebrow?: string
  heading?: string
  useGlobalTestimonials?: boolean
  testimonials?: Testimonial[]
  backgroundColor?: 'cream' | 'white' | 'dark'
  isHome?: boolean
}

export async function TestimonialsCarouselBlockComponent({
  eyebrow,
  heading,
  useGlobalTestimonials = true,
  testimonials: inlineTestimonials,
  backgroundColor = 'cream',
  isHome,
}: Props) {
  let testimonials: Testimonial[] = inlineTestimonials || []

  if (useGlobalTestimonials) {
    try {
      const payload = await getPayload({ config: configPromise })
      const result = await payload.find({
        collection: 'testimonials',
        limit: 20,
        overrideAccess: false,
      })
      testimonials = result.docs.map((t: any) => ({
        text: t.text,
        name: t.name,
        role: t.role,
        avatarColor: t.avatarColor,
        initial: t.initial,
      }))
    } catch {
      testimonials = inlineTestimonials || []
    }
  }

  if (testimonials.length === 0) return null

  const isDark = backgroundColor === 'dark'

  return (
    <section
      className={cn(
        'overflow-hidden py-16 md:py-20',
        isHome ? 'bg-white' : isDark ? 'bg-brand-secondary' : backgroundColor === 'white' ? 'bg-white' : 'bg-brand-cream',
      )}
    >
      <Container>
        {(eyebrow || heading) && (
          <SectionHeading
            eyebrow={eyebrow}
            heading={heading || ''}
            align="center"
            dark={isDark && !isHome}
            className="mb-10 md:mb-12"
            headingClassName={isHome ? 'font-heading text-2xl md:text-3xl lg:text-4xl font-bold' : undefined}
          />
        )}
      </Container>

      <div className="group relative">
        <div
          className={cn(
            'pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r to-transparent md:w-24',
            isHome ? 'from-white' : 'from-inherit',
          )}
        />
        <div
          className={cn(
            'pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l to-transparent md:w-24',
            isHome ? 'from-white' : 'from-inherit',
          )}
        />

        <div
          className="flex gap-5 group-hover:[animation-play-state:paused] md:gap-6"
          style={{ animation: 'scrollLeft 40s linear infinite', width: 'max-content' }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={i} testimonial={t} isDark={isDark && !isHome} isHome={isHome} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({
  testimonial,
  isDark,
  isHome,
}: {
  testimonial: Testimonial
  isDark: boolean
  isHome?: boolean
}) {
  const initial = testimonial.initial || testimonial.name?.charAt(0) || '?'
  const avatarColor = testimonial.avatarColor || '#FD5A47'

  return (
    <div
      className={cn(
        'flex shrink-0 flex-col gap-4',
        isHome
          ? 'w-[300px] rounded-2xl border border-brand-border-light bg-white p-6 shadow-card md:w-[340px] md:p-8'
          : cn(
              'w-80 rounded-card p-6',
              isDark ? 'bg-white/10 text-white' : 'border border-brand-border-light bg-white shadow-card',
            ),
      )}
    >
      <span className="font-heading text-4xl leading-none text-brand-primary md:text-5xl">&ldquo;</span>

      {/* Quote text */}
      <div className={cn('-mt-2 text-sm leading-relaxed flex-1', isDark ? 'text-white/85' : 'text-brand-text-mid')}>
        {typeof testimonial.text === 'object' ? (
          <RichText data={testimonial.text} enableGutter={false} />
        ) : (
          <p>{testimonial.text}</p>
        )}
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 mt-2">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
          style={{ backgroundColor: avatarColor }}
        >
          {initial}
        </div>
        <div>
          <p className={cn('font-semibold text-sm', isDark ? 'text-white' : 'text-brand-secondary')}>
            {testimonial.name}
          </p>
          {testimonial.role && (
            <p className={cn('text-xs', isDark ? 'text-white/60' : 'text-brand-text-muted')}>
              {testimonial.role}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
