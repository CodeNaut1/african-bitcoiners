'use client'

import Image from 'next/image'
import React from 'react'

import { PARTNER_LOGOS } from '@/components/PartnershipPage/data'

export function PartnersMarquee() {
  const doubled = [...PARTNER_LOGOS, ...PARTNER_LOGOS]

  return (
    <section className="overflow-hidden bg-[#FFFAF2] py-10 md:py-12">
      <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6">
        <h1 className="font-heading text-[28px] font-bold tracking-[-0.4px] text-[#37312C] sm:text-[35px]">
          Our Partners
        </h1>
      </div>

      <div className="group relative mt-8">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[#FFFAF2] to-transparent sm:w-24" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#FFFAF2] to-transparent sm:w-24" />

        <div
          className="flex items-center gap-12 sm:gap-16 group-hover:[animation-play-state:paused] md:gap-20"
          style={{
            animation: 'scrollLeft 30s linear infinite',
            width: 'max-content',
          }}
        >
          {doubled.map((partner, i) => {
            const logo = (
              <div className="flex h-12 w-28 shrink-0 items-center justify-center grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100 sm:h-14 sm:w-36">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={140}
                  height={56}
                  className="h-full w-full object-contain"
                />
              </div>
            )

            return partner.url ? (
              <a
                key={`${partner.name}-${i}`}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={partner.name}
              >
                {logo}
              </a>
            ) : (
              <div key={`${partner.name}-${i}`}>{logo}</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
