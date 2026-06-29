'use client'

import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'

import { TESTIMONIALS } from '@/components/MillionSatChallengePage/data'

const AUTOPLAY_MS = 5000

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0)
  const [expanded, setExpanded] = useState(false)

  const goTo = useCallback((next: number) => {
    setExpanded(false)
    setIndex((next + TESTIMONIALS.length) % TESTIMONIALS.length)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      goTo(index + 1)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(timer)
  }, [goTo, index])

  const slide = TESTIMONIALS[index]
  const body = expanded ? slide.full : slide.preview

  return (
    <div className="mx-auto max-w-[900px]">
      <div className="rounded-lg border border-[#E0E0E0] bg-[#FEFAF1] p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)] md:p-10">
        <p className="mb-8 whitespace-pre-line text-[15px] leading-[22px] text-[#384958]">{body}</p>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
              <Image src={slide.image} alt={slide.name} fill className="object-cover" sizes="48px" />
            </div>
            <span className="text-base font-semibold text-[#384958]">{slide.name}</span>
          </div>

          {!expanded && slide.full !== slide.preview && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="text-sm font-medium text-[#E1640C] underline-offset-2 hover:underline"
            >
              Read more
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#384958]/20 text-[#384958] transition-colors hover:border-[#E1640C] hover:text-[#E1640C]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex gap-2">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${i === index ? 'bg-[#E1640C]' : 'bg-[#384958]/25'}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#384958]/20 text-[#384958] transition-colors hover:border-[#E1640C] hover:text-[#E1640C]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
