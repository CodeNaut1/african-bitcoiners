import Link from 'next/link'
import React from 'react'

import { CountryCarousel } from '@/components/AfricanBitcoinCommunitiesPage/CountryCarousel'
import { CountryCard } from '@/components/Top21AfricanBitcoinCountriesPage/CountryCard'
import { COPY, COUNTRIES, COUNTRY_CAROUSEL_ITEMS, IMG, LINKS } from '@/components/Top21AfricanBitcoinCountriesPage/data'

const PAGE_BG = '#FFFCFA'
const FEEDBACK_CREAM = '#FFF3EA'
const HEADING = '#37312C'
const BODY = '#37312C'
const BOUNTY_HEADING = '#2D1300'
const BOUNTY_BTN = '#F45341'
const CTA_ORANGE = '#F45341'
const SUBMIT_BG = '#FEF6EC'

export function Top21AfricanBitcoinCountriesPage() {
  return (
    <div className="font-body" style={{ backgroundColor: PAGE_BG }}>
      <section
        className="relative bg-cover bg-center bg-no-repeat px-4 pb-24 pt-10 sm:px-6 md:pb-28 md:pt-12"
        style={{ backgroundImage: `url(${IMG.heroBg})` }}
      >
        <div className="relative mx-auto max-w-[1000px] text-center">
          <h1 className="font-heading text-[32px] font-bold leading-tight tracking-[-0.6px] text-white md:text-[40px]">
            {COPY.heroTitle}
          </h1>
          <p className="mx-auto mt-5 max-w-[760px] text-base leading-[30px] tracking-[-0.5px] text-white md:text-xl">
            {COPY.heroIntro}
          </p>
          <div className="mt-10 text-left">
            <CountryCarousel
              countries={COUNTRY_CAROUSEL_ITEMS}
              showHeading={false}
              variant="compact"
              externalLinks
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 md:py-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {COUNTRIES.map((country) => (
              <CountryCard key={country.code} country={country} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 md:py-16" style={{ backgroundColor: SUBMIT_BG }}>
        <div className="mx-auto max-w-[800px] text-center">
          <h2
            className="font-heading text-lg font-bold leading-relaxed tracking-[-0.4px] md:text-xl"
            style={{ color: HEADING }}
          >
            {COPY.submitHeading}
          </h2>
          <p className="mt-4 text-base leading-relaxed tracking-[-0.2px]" style={{ color: BODY }}>
            {COPY.submitBody}
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={LINKS.ecosystem}
              className="inline-flex rounded-sm px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: CTA_ORANGE }}
            >
              {COPY.submitCta}
            </Link>
            <Link
              href={LINKS.ecosystem}
              className="inline-flex rounded-sm border px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-80"
              style={{ borderColor: CTA_ORANGE, color: CTA_ORANGE }}
            >
              {COPY.ecosystemCta}
            </Link>
          </div>
        </div>
      </section>

      <section
        className="px-4 py-[60px] pb-[100px] sm:px-6 max-md:py-[30px]"
        style={{ backgroundColor: FEEDBACK_CREAM }}
      >
        <div className="mx-auto max-w-[600px] text-center">
          <h4
            className="font-heading text-2xl font-bold tracking-[-0.8px] max-md:leading-10"
            style={{ color: BOUNTY_HEADING }}
          >
            {COPY.bountyTitle}
          </h4>
          <p className="mt-4 text-base tracking-[-0.2px]" style={{ color: BOUNTY_HEADING }}>
            {COPY.bountyText}
          </p>
          <Link
            href={LINKS.feedbackBounty}
            className="mt-6 inline-flex rounded-sm px-8 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: BOUNTY_BTN }}
          >
            {COPY.bountyCta}
          </Link>
        </div>
      </section>
    </div>
  )
}
