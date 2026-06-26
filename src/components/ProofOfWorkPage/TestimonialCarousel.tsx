'use client'

import React from 'react'

import { TESTIMONIALS } from '@/components/ProofOfWorkPage/data'

function TestimonialCard({
  quote,
  name,
  initials,
  color,
}: {
  quote: string
  name: string
  initials: string
  color: string
}) {
  return (
    <div className="box-border w-[320px] shrink-0 rounded-lg border border-[#E0E0E0] bg-white px-[30px] pb-2.5 pt-[30px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] md:w-[420px]">
      <div className="relative mb-5">
        <span className="mb-2.5 block font-serif text-[48px] leading-none text-[#E0E0E0]">&ldquo;</span>
        <p className="m-0 text-[15px] leading-[1.6] text-[#333]">{quote}</p>
      </div>
      <div className="mt-5 flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-semibold text-white"
          style={{ backgroundColor: color }}
        >
          {initials}
        </div>
        <span className="text-sm font-medium text-[#333]">{name}</span>
      </div>
    </div>
  )
}

export function TestimonialCarousel() {
  const looped = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <div className="group overflow-hidden py-[60px]">
      <div className="flex w-fit animate-pow-testimonials gap-[30px] group-hover:[animation-play-state:paused]">
        {looped.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} {...t} />
        ))}
      </div>
      <style jsx>{`
        @keyframes pow-testimonials {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-33.333%));
          }
        }
        .animate-pow-testimonials {
          animation: pow-testimonials 60s linear infinite;
        }
      `}</style>
    </div>
  )
}
