import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import {
  COMMUNITY_NOTE,
  IMG,
  INTRO,
  LINKS,
  PEOPLE,
  TREZOR_NOTE,
} from '@/components/MIAB2024Page/data'
import { MIAB2024Ticker } from '@/components/MIAB2024Page/MIAB2024Ticker'
import { LegacyPersonRow } from '@/components/MIABLegacyPersonLayout'

const HERO_CREAM = '#FFFBF6'
const LIST_CREAM = '#FFFBF6'
const HERO_ORANGE = '#CB5F00'
const BODY_TEXT = '#364152'

export function MIAB2024Page() {
  return (
    <div className="overflow-x-hidden font-sans">
      <section className="px-4 py-[50px] pb-10 sm:px-6" style={{ backgroundColor: HERO_CREAM }}>
        <div className="mx-auto max-w-[900px] text-center">
          <h1
            className="font-heading text-[32px] font-bold uppercase leading-[1.35] tracking-[-1px] md:text-[50px] md:leading-[65px]"
            style={{ color: HERO_ORANGE }}
          >
            The Most Impactful
            <br />
            African Bitcoiners of 2024
          </h1>

          <p
            className="mx-auto mt-5 max-w-[800px] text-[17px] leading-7 tracking-[-0.4px]"
            style={{ color: BODY_TEXT }}
          >
            {INTRO}
          </p>

          {TREZOR_NOTE && (
            <p
              className="mx-auto mt-4 max-w-[800px] text-[17px] leading-7 tracking-[-0.4px] [&_a]:font-semibold [&_a]:text-[#CB5F00] [&_a]:underline-offset-2 hover:[&_a]:underline [&_strong]:font-bold"
              style={{ color: BODY_TEXT }}
              dangerouslySetInnerHTML={{ __html: TREZOR_NOTE }}
            />
          )}

          {COMMUNITY_NOTE && (
            <p
              className="mx-auto mt-4 max-w-[800px] text-[17px] leading-7 tracking-[-0.4px] [&_a]:font-semibold [&_a]:text-[#CB5F00] [&_a]:underline-offset-2 hover:[&_a]:underline [&_strong]:font-bold"
              style={{ color: BODY_TEXT }}
              dangerouslySetInnerHTML={{ __html: COMMUNITY_NOTE }}
            />
          )}

          <div className="mt-8">
            <p className="text-[10px] font-medium uppercase tracking-[-0.3px] text-[#4F4945] md:text-xs">
              Sponsored by:
            </p>
            <div className="mt-3 flex justify-center">
              <Link href={LINKS.trezor} target="_blank" rel="noopener noreferrer">
                <Image
                  src={IMG.trezorLogo}
                  alt="Trezor Academy Logo"
                  width={235}
                  height={45}
                  className="h-auto w-[180px] md:w-[235px]"
                />
              </Link>
            </div>
          </div>
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
        <MIAB2024Ticker />
      </section>
    </div>
  )
}
