import React from 'react'

import { MiabNominationForm } from '@/components/forms/MiabNominationForm'

export const MIAB_NOMINATIONS_OPEN = false

const PAGE_BG = '#FFFCFA'
const HEADING = '#37312C'

export function MostImpactfulNominationsPage() {
  return (
    <div className="font-body" style={{ backgroundColor: PAGE_BG }}>
      <section className="px-4 py-12 sm:px-6 md:py-16 md:pb-24">
        <div className="mx-auto max-w-[750px]">
          <h1
            className="font-heading text-2xl font-bold tracking-[-0.4px] md:text-[32px]"
            style={{ color: HEADING }}
          >
            Most Impactful African Bitcoiners Nominations
          </h1>
          <p className="mt-4 text-base leading-7 text-[#384958]">
            Celebrate African Bitcoiners driving adoption, education, and freedom across the continent.
          </p>

          {MIAB_NOMINATIONS_OPEN ? (
            <div className="mt-10 rounded-[5px] border border-[#38495833] bg-white px-5 py-10 sm:px-10">
              <h2 className="mb-6 text-center font-heading text-xl font-bold text-brand-text-dark">
                Nominate an African Bitcoiner
              </h2>
              <MiabNominationForm />
            </div>
          ) : (
            <div className="mt-10 rounded-[5px] border border-[#38495833] bg-white px-5 py-10 text-center sm:px-10">
              <p className="text-base font-medium text-[#384958]">
                Nominations are currently closed. Check back when the next MIAB cycle opens.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
