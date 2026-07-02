'use client'

import React from 'react'

import { Certificate } from '@/components/Certificate'
import { COPY } from '@/components/GetCertificatePage/data'

const PAGE_BG = '#FFFCFA'
const HEADING = '#37312C'

export function GetCertificateContent() {
  return (
    <div className="font-body" style={{ backgroundColor: PAGE_BG }}>
      <section className="px-4 py-10 sm:px-6 md:py-14">
        <div className="mx-auto max-w-[800px] text-center">
          <h4
            className="text-xl font-bold leading-snug tracking-[-0.5px] md:text-2xl"
            style={{ color: HEADING }}
          >
            {COPY.heading}
          </h4>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-[600px] border border-black/15 bg-white px-6 py-8 sm:px-9">
          <Certificate
            mode="email"
            hideIntro
            submitLabel="Download"
          />
        </div>
      </section>
    </div>
  )
}
