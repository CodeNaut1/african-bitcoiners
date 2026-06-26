import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { IMG, LINKS, REGIONS, type SpendCard } from '@/components/PlacesToSpendPage/data'
import { PageCommentForm } from '@/components/forms/PageCommentForm'
import { PlacesSpendSubmissionForm } from '@/components/forms/PlacesSpendSubmissionForm'

const HERO_CREAM = '#FFF5E7'
const GRID_CREAM = '#FFFAF2'
const FORM_CREAM = '#FFF2E0'
const BOUNTY_CREAM = '#FFF3EA'
const ORANGE = '#E1640C'
const HEADING_BROWN = '#584538'
const BODY_DARK = '#2D1300'
const BOUNTY_BTN = '#F45341'
const TAG_GREEN = '#E0FDE1'

function SpendCardItem({ title, category, description, image, href }: SpendCard) {
  return (
    <article className="flex h-full flex-col border border-black/10 bg-white p-[30px] text-center shadow-sm">
      <div className="mx-auto mb-4 flex justify-center">
        <Image src={image} alt="" width={160} height={160} className="h-36 w-36 object-contain" />
      </div>
      {category && (
        <p
          className="mx-auto mb-3 inline-block rounded px-3 py-1 text-xs font-medium text-[#2D5A2D]"
          style={{ backgroundColor: TAG_GREEN }}
        >
          {category}
        </p>
      )}
      <h5 className="mb-3 font-heading text-lg font-bold tracking-[-0.4px]" style={{ color: ORANGE }}>
        {title}
      </h5>
      {description && (
        <p className="mb-5 flex-1 text-sm leading-6 tracking-[-0.2px] text-brand-text-mid">{description}</p>
      )}
      <div className="pt-3">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-none border px-6 py-3 text-sm font-bold tracking-[-0.4px] transition-colors hover:bg-[#E1640C] hover:text-white"
          style={{ borderColor: ORANGE, color: ORANGE }}
        >
          Learn More
        </a>
      </div>
    </article>
  )
}

export function PlacesToSpendPage() {
  return (
    <div className="overflow-x-hidden font-sans">
      {/* Hero — background image with text overlay */}
      <section
        className="bg-cover bg-center bg-no-repeat px-4 pb-[100px] pt-10 max-md:pb-10 max-md:pt-10 sm:px-6"
        style={{ backgroundColor: HERO_CREAM, backgroundImage: `url(${IMG.heroBg})` }}
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-[55%] max-md:max-w-full">
            <h1
              className="text-left font-heading text-[37px] font-black capitalize leading-[48px] tracking-[-0.6px] text-[#E1640C] max-md:text-[32px] max-md:leading-[42px] md:text-[50px] md:leading-[70px]"
            >
              Top online retailers where Africans can spend Bitcoin
            </h1>
            <div
              className="mt-5 space-y-4 text-left text-lg leading-8 tracking-[-0.8px] max-md:text-base max-md:leading-7"
              style={{ color: HEADING_BROWN }}
            >
              <p>
                An important part of fast-tracking Bitcoin adoption in Africa is to have locally available online
                products and services where we can spend our bitcoin without the need to convert it to fiat first.
                <br />
                Below is a list of online locations where you can easily spend Bitcoin either on-chain or with lightning.{' '}
                <span className="font-medium">
                  If you would like to submit an Online retail/spend location,{' '}
                  <Link href={LINKS.submitSpend} className="text-[#E1640C] underline hover:opacity-90">
                    please click here.
                  </Link>
                </span>
              </p>
              <p className="font-medium">
                P.S: For Physical vendors/spend locations,{' '}
                <Link href={LINKS.bitcoinersMap} className="text-[#E1640C] underline hover:opacity-90">
                  please see our map page.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Retailer grids by region */}
      <section className="px-4 pb-10 pt-5 sm:px-6" style={{ backgroundColor: GRID_CREAM }}>
        <div className="mx-auto max-w-[1200px] space-y-12">
          {REGIONS.map(({ region, flag, cards }) => (
            <div key={region}>
              <h2 className="mb-8 font-heading text-[45px] font-bold tracking-[-0.8px] max-md:text-3xl" style={{ color: ORANGE }}>
                {region} {flag && <span aria-hidden>{flag}</span>}
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((card) => (
                  <SpendCardItem key={card.title} {...card} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Submit a spend location */}
      <section
        id="spend-submit"
        className="scroll-mt-20 px-4 pb-[100px] pt-[60px] sm:px-6 max-md:px-3"
        style={{ backgroundColor: FORM_CREAM }}
      >
        <div className="mx-auto max-w-[900px]">
          <div className="rounded-[5px] border border-[#60391333] bg-white px-4 py-[55px] sm:px-12 md:px-20">
            <h4
              className="mb-8 text-center font-heading text-[26px] font-bold leading-9 tracking-[-0.6px] max-md:text-xl"
              style={{ color: HEADING_BROWN }}
            >
              Have an idea where people spend sats Online?
            </h4>
            <PlacesSpendSubmissionForm />
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

      {/* Comments */}
      <section className="bg-white px-4 pb-16 pt-8 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          <h3 className="mb-2 font-heading text-2xl font-bold text-brand-text-dark">Leave a Reply</h3>
          <PageCommentForm pageSlug="spend-bitcoin/places-to-spend-bitcoin" />
        </div>
      </section>
    </div>
  )
}
