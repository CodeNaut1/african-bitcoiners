import React from 'react'

import { INTRO, PEOPLE } from '@/components/MIAB2023Page/data'
import { MIAB2023Ticker } from '@/components/MIAB2023Page/MIAB2023Ticker'
import { LegacyPersonRow } from '@/components/MIABLegacyPersonLayout'

const HERO_CREAM = '#FFFBF6'
const LIST_CREAM = '#FFFBF6'
const HERO_ORANGE = '#CB5F00'
const BODY_TEXT = '#364152'

export function MIAB2023Page() {
  return (
    <div className="overflow-x-hidden font-sans">
      <section className="px-4 py-[50px] pb-10 sm:px-6" style={{ backgroundColor: HERO_CREAM }}>
        <div className="mx-auto max-w-[800px] text-center">
          <h1
            className="font-heading text-[32px] font-bold uppercase leading-[1.35] tracking-[-1px] md:text-[50px] md:leading-[65px]"
            style={{ color: HERO_ORANGE }}
          >
            The Most Impactful
            <br />
            African Bitcoiners of 2023
          </h1>

          <p
            className="mx-auto mt-5 max-w-[700px] text-[17px] leading-7 tracking-[-0.4px]"
            style={{ color: BODY_TEXT }}
          >
            {INTRO}
          </p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 md:py-14" style={{ backgroundColor: LIST_CREAM }}>
        <div className="mx-auto max-w-[1200px]">
          {PEOPLE.map((person) => (
            <LegacyPersonRow key={person.rank} person={person} />
          ))}
        </div>
      </section>

      <section className="px-4 py-10 pb-16 sm:px-6" style={{ backgroundColor: LIST_CREAM }}>
        <MIAB2023Ticker />
      </section>
    </div>
  )
}
