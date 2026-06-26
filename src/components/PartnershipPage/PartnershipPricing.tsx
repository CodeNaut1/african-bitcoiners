'use client'

import React, { useState } from 'react'

import { TIERS } from '@/components/PartnershipPage/data'

const ORANGE = '#E1640C'
const TEXT = '#584538'

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="mt-0.5 h-4 w-4 shrink-0" aria-hidden>
      <circle cx="8" cy="8" r="8" fill={ORANGE} />
      <path d="M4.5 8.2L6.8 10.5L11.5 5.8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PartnershipPricing() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section className="bg-[#FFFAF2] px-4 py-12 sm:px-6 md:py-16">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="text-center font-heading text-[28px] font-bold tracking-[-0.4px] text-[#37312C] sm:text-[35px]">
          Partnership Tiers
        </h2>

        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="inline-flex rounded-full border border-[#D0D5DD] bg-[#F9FAFB] p-1">
            <button
              type="button"
              onClick={() => setIsYearly(false)}
              className={`rounded-full px-6 py-2 text-xs font-bold tracking-wide transition-colors sm:px-8 sm:text-sm ${
                !isYearly ? 'bg-[#253343] text-white' : 'text-[#667085]'
              }`}
            >
              MONTHLY
            </button>
            <button
              type="button"
              onClick={() => setIsYearly(true)}
              className={`rounded-full px-6 py-2 text-xs font-bold tracking-wide transition-colors sm:px-8 sm:text-sm ${
                isYearly ? 'bg-[#253343] text-white' : 'text-[#667085]'
              }`}
            >
              YEARLY
            </button>
          </div>
          {isYearly && (
            <p className="text-sm font-medium" style={{ color: ORANGE }}>
              Save 17% with annual plan
            </p>
          )}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5">
          {TIERS.map((tier) => (
            <article
              key={tier.name}
              className="flex flex-col border border-[#EAECF0] bg-[#FFFAF2] p-6 sm:p-8"
            >
              <h3 className="font-heading text-xl font-bold text-[#37312C] sm:text-2xl">{tier.name}</h3>
              <p
                className="mt-3 font-heading text-lg font-bold leading-snug sm:text-xl"
                style={{ color: ORANGE }}
              >
                {isYearly ? tier.yearlyPrice : tier.monthlyPrice}
              </p>
              <a
                href="#partnership-form"
                className="mt-6 inline-flex w-full items-center justify-center border border-[#E1640C] px-6 py-[15px] text-[15px] font-bold tracking-[-0.6px] text-[#E1640C] transition-colors hover:bg-[#E1640C] hover:text-white"
              >
                Get Started
              </a>
              <h4 className="mt-8 text-sm font-bold tracking-wide text-[#37312C]">{tier.featuresHeading}</h4>
              <ul className="mt-4 flex flex-1 flex-col gap-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm leading-6 sm:text-[15px]" style={{ color: TEXT }}>
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
