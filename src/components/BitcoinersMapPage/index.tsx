import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { BTC_MAP_SRC, IMG, LINKS } from '@/components/BitcoinersMapPage/data'
import { MapExperienceForm } from '@/components/forms/MapExperienceForm'
import { MapLocationPageForm } from '@/components/forms/MapLocationPageForm'

const HERO_CREAM = '#FEF6EC'
const MAP_CREAM = '#FFF3DE'
const BOUNTY_CREAM = '#FFF3EA'
const HEADING_BROWN = '#584538'
const BODY_DARK = '#2D1300'
const BOUNTY_BTN = '#F45341'

export function BitcoinersMapPage() {
  return (
    <div className="overflow-x-hidden font-sans">
      {/* Hero — two columns, text + illustration */}
      <section className="px-4 py-[80px] max-md:py-[30px] max-md:pb-5 sm:px-6" style={{ backgroundColor: HERO_CREAM }}>
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <h1
              className="font-heading text-[37px] font-black leading-[48px] tracking-[-0.6px] max-md:text-[32px] max-md:leading-[42px] md:text-[45px] md:leading-[60px]"
              style={{ color: HEADING_BROWN }}
            >
              Bitcoiners Map
            </h1>
            <div className="mt-5 space-y-4 text-base leading-7 tracking-[-0.4px] text-brand-text-dark [&_a]:font-semibold [&_a]:text-brand-primary [&_a]:underline [&_a]:hover:opacity-90">
              <p>
                The use of Bitcoin for payments is still very new so there aren&apos;t yet many businesses that accept
                it. This presents a challenge to Bitcoin users which we would like to help solve. At the same time we
                want to celebrate and share those merchants who do accept Bitcoin payments. Here are several places where
                you can spend your Bitcoin in Africa. Please frequent these merchants as they are helping to start our
                revolution!
              </p>
              <p>
                <strong>NB:</strong> This section is for physical stores that accept Bitcoin (locations with physical
                addresses that can be shared). If you are looking for online options{' '}
                <Link href={LINKS.placesToSpendOnline}>
                  please check out our page with all the places Africans can spend Bitcoin online.
                </Link>
              </p>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <Image
              src={IMG.hero}
              alt="Bitcoin accepted here"
              width={1024}
              height={722}
              className="h-auto w-full max-w-[520px] object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* Interactive BTC Map */}
      <section className="px-4 py-10 sm:px-6" style={{ backgroundColor: MAP_CREAM }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
            <iframe
              id="btcmap"
              title="BTC Map"
              src={BTC_MAP_SRC}
              className="h-[500px] w-full min-h-[400px] border-0 md:h-[600px]"
              allowFullScreen
              allow="geolocation"
            />
          </div>
        </div>
      </section>

      {/* Merchant submission form */}
      <section className="px-4 py-10 sm:px-6" style={{ backgroundColor: HERO_CREAM }}>
        <div className="mx-auto max-w-[900px]">
          <div className="rounded-[5px] border border-[#60391333] bg-white px-4 py-[55px] sm:px-10 md:px-14">
            <h4
              className="mb-8 text-center font-heading text-[26px] font-bold leading-9 tracking-[-0.6px] max-md:text-[22px] max-md:leading-7"
              style={{ color: HEADING_BROWN }}
            >
              Are you a merchant in Africa that accepts Bitcoin and
              <br className="hidden sm:block" />
              or lightning payments for your products or services?
              <br />
              Let us know here
            </h4>
            <MapLocationPageForm />
          </div>
        </div>
      </section>

      {/* Feedback bounty CTA */}
      <section className="px-4 py-[60px] pb-[100px] sm:px-6 max-md:py-[30px]" style={{ backgroundColor: BOUNTY_CREAM }}>
        <div className="mx-auto max-w-[600px] text-center">
          <h4 className="font-heading text-2xl font-bold tracking-[-0.8px] max-md:leading-10" style={{ color: BODY_DARK }}>
            Get 1,000 sats for your brilliant ideas!
          </h4>
          <p className="mt-4 text-lg leading-7 tracking-[-0.6px] text-[#2D1300]">
            Have a genius idea or spot something in our African Bitcoiners initiatives that could be even better? Submit
            your feedback to us and we&apos;re excited to reward you for them.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href={LINKS.feedbackBounty}
              className="inline-block rounded px-20 py-[18px] text-[17px] font-semibold tracking-[-0.2px] text-white shadow-[2px_4px_8px_rgba(0,0,0,0.2)] transition-colors hover:bg-[#253343]"
              style={{ backgroundColor: BOUNTY_BTN }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Experience / NPS form */}
      <section className="px-4 pb-16 pt-4 sm:px-6" style={{ backgroundColor: HERO_CREAM }}>
        <div className="mx-auto max-w-[900px]">
          <div className="rounded-[21px] border border-groove border-[#60391333] bg-white p-[30px] shadow-sm sm:mx-[50px]">
            <h3 className="mb-6 font-heading text-xl font-bold text-brand-text-dark md:text-2xl">
              Share Your Experience with African Bitcoiners
            </h3>
            <MapExperienceForm />
          </div>
        </div>
      </section>
    </div>
  )
}
