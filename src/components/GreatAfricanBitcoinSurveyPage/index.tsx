import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { COPY, IMG, LINKS } from '@/components/GreatAfricanBitcoinSurveyPage/data'

const PAGE_BG = '#FFFCFA'
const HEADING = '#384958'
const HIGHLIGHT = '#E1640C'
const CTA_BG = '#E1640C'

export function GreatAfricanBitcoinSurveyPage() {
  return (
    <div className="font-body" style={{ backgroundColor: PAGE_BG }}>
      <section className="px-4 py-12 sm:px-6 md:py-16">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <h1
              className="font-heading text-[32px] font-bold leading-tight tracking-[-0.6px] md:text-[40px]"
              style={{ color: HEADING }}
            >
              {COPY.heroSubtitleBefore}{' '}
              <span style={{ color: HIGHLIGHT }}>{COPY.heroSubtitleHighlight}</span>
            </h1>
            <p
              className="mt-6 text-base leading-relaxed tracking-[-0.2px] md:text-[17px] md:leading-7"
              style={{ color: HEADING }}
            >
              {COPY.body}
            </p>
            <div className="mt-8">
              <Link
                href={LINKS.directory}
                className="inline-block rounded-lg px-8 py-4 text-base font-bold tracking-[-0.2px] text-white shadow-[2px_4px_8px_rgba(0,0,0,0.2)] transition-colors hover:opacity-90 md:px-10 md:py-5 md:text-[17px]"
                style={{ backgroundColor: CTA_BG }}
              >
                {COPY.directoryCta}
              </Link>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <Image
              src={IMG.survey}
              alt="The Great African Bitcoin Survey"
              width={1343}
              height={1075}
              priority
              className="h-auto w-full max-w-[520px] object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
