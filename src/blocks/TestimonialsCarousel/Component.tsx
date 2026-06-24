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
}

export async function TestimonialsCarouselBlockComponent({
  eyebrow,
  heading,
  useGlobalTestimonials = true,
  testimonials: inlineTestimonials,
  backgroundColor = 'cream',
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
        'py-16 overflow-hidden',
        isDark ? 'bg-brand-secondary' : backgroundColor === 'white' ? 'bg-white' : 'bg-brand-cream',
      )}
    >
      <Container>
        {(eyebrow || heading) && (
          <SectionHeading
            eyebrow={eyebrow}
            heading={heading || ''}
            align="center"
            dark={isDark}
            className="mb-12"
          />
        )}
      </Container>

      {/* Scrolling row — two loops of items */}
      <div className="group relative">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-inherit to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-inherit to-transparent" />

        <div
          className="flex gap-6 group-hover:[animation-play-state:paused]"
          style={{ animation: 'scrollLeft 40s linear infinite', width: 'max-content' }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={i} testimonial={t} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial, isDark }: { testimonial: Testimonial; isDark: boolean }) {
  const initial = testimonial.initial || testimonial.name?.charAt(0) || '?'
  const avatarColor = testimonial.avatarColor || '#FD5A47'

  return (
    <div
      className={cn(
        'shrink-0 w-80 rounded-card p-6 flex flex-col gap-4',
        isDark ? 'bg-white/10 text-white' : 'bg-white shadow-card border border-brand-border-light',
      )}
    >
      {/* Quote text */}
      <div className={cn('text-sm leading-relaxed flex-1', isDark ? 'text-white/85' : 'text-brand-text-mid')}>
        {typeof testimonial.text === 'object' ? (
          <RichText data={testimonial.text} enableGutter={false} />
        ) : (
          <p>"{testimonial.text}"</p>
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
