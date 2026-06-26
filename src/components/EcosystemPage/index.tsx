import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { COPY, IMG, LINKS } from '@/components/EcosystemPage/data'

const HERO_CREAM = '#FFFBF6'
const BOUNTY_CREAM = '#FFF3EA'
const HERO_ORANGE = '#E44405'
const BODY_TEXT = '#332A1E'
const HEADING_DARK = '#2D1300'
const DIRECTORY_BTN = '#E1640C'
const BOUNTY_BTN = '#F45341'

export function EcosystemPage() {
  return (
    <div className="overflow-x-hidden font-sans">
      {/* Hero */}
      <section className="px-4 py-10 pb-[50px] sm:px-6 md:py-[40px] md:pb-[50px]" style={{ backgroundColor: HERO_CREAM }}>
        <div className="mx-auto max-w-[1200px] text-center">
          <h1
            className="font-heading text-[40px] font-extrabold leading-[50px] tracking-[-0.5px] md:text-[50px] md:leading-[65px]"
            style={{ color: HERO_ORANGE }}
          >
            {COPY.heroTitle}
          </h1>

          <h4
            className="mt-4 font-heading text-[22px] font-normal leading-8 tracking-[-0.4px] md:text-[26px] md:leading-9"
            style={{ color: HEADING_DARK }}
          >
            {COPY.heroSubtitleBefore}{' '}
            <span style={{ color: HERO_ORANGE }}>{COPY.heroSubtitleHighlight}</span>
          </h4>

          <div
            className="mx-auto mt-6 max-w-[800px] space-y-4 text-[15px] leading-[26px] tracking-[-0.6px] md:text-[17px] md:leading-7"
            style={{ color: `${BODY_TEXT}D9` }}
          >
            {COPY.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href={LINKS.directory}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg px-[55px] py-5 text-[17px] font-bold tracking-[-0.2px] text-white shadow-[2px_4px_8px_rgba(0,0,0,0.2)] transition-colors hover:bg-brand-secondary md:px-[100px] md:py-[25px]"
              style={{ backgroundColor: DIRECTORY_BTN }}
            >
              {COPY.directoryCta}
            </a>
          </div>

          <div className="mt-10 flex flex-col items-center">
            <p
              className="text-[15px] font-medium uppercase tracking-[-0.3px] md:text-[17px]"
              style={{ color: HEADING_DARK }}
            >
              {COPY.sponsoredBy}
            </p>
            <div className="mt-3 flex justify-center">
              <Link href={LINKS.trezor} target="_blank" rel="noopener noreferrer">
                <Image
                  src={IMG.trezorLogo}
                  alt="Trezor Academy Logo"
                  width={235}
                  height={45}
                  className="h-[45px] w-auto"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback bounty CTA */}
      <section
        className="px-4 py-[30px] pb-[100px] sm:px-6 md:py-[60px] md:pb-[100px]"
        style={{ backgroundColor: BOUNTY_CREAM }}
      >
        <div className="mx-auto max-w-[700px] text-center">
          <h4
            className="font-heading text-2xl font-bold leading-10 tracking-[-0.8px]"
            style={{ color: HEADING_DARK }}
          >
            {COPY.bountyTitle}
          </h4>
          <p
            className="mx-auto mt-4 max-w-[600px] text-[17px] leading-7 tracking-[-0.6px] md:text-lg"
            style={{ color: HEADING_DARK }}
          >
            {COPY.bountyText}
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href={LINKS.feedbackBounty}
              className="inline-block rounded px-20 py-[18px] text-[17px] font-semibold tracking-[-0.2px] text-white shadow-[2px_4px_8px_rgba(0,0,0,0.2)] transition-colors hover:bg-brand-secondary"
              style={{ backgroundColor: BOUNTY_BTN }}
            >
              {COPY.bountyCta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
