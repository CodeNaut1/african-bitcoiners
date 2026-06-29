import Link from 'next/link'
import React from 'react'

import { IMG, LINKS } from '@/components/CommunityBuildersPage/data'

const HERO_CREAM = '#FCF2E0'
const FEEDBACK_CREAM = '#FFF3EA'
const ORANGE = '#E1640C'
const BROWN = '#584538'
const BOUNTY_HEADING = '#2D1300'
const BOUNTY_BTN = '#F45341'

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4
      className="mt-8 font-heading text-xl font-black capitalize leading-[30px] tracking-[-0.6px] first:mt-0 md:text-2xl md:leading-[35px]"
      style={{ color: BROWN }}
    >
      {children}
    </h4>
  )
}

function BodyText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={`text-lg leading-[30px] tracking-[-0.6px] md:text-xl md:leading-8 ${className}`}
      style={{ color: BROWN }}
    >
      {children}
    </p>
  )
}

export function CommunityBuildersPage() {
  return (
    <div className="font-body">
      <section
        className="relative overflow-hidden bg-cover bg-[position:top_left] bg-no-repeat px-4 py-10 sm:px-6 lg:bg-[position:-120px_-100px] lg:py-[50px] lg:pb-20"
        style={{
          backgroundColor: HERO_CREAM,
          backgroundImage: `url(${IMG.hero})`,
        }}
      >
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 lg:grid-cols-[60%_40%]">
          <div className="lg:pr-5">
            <h1
              className="max-w-xl font-heading text-[40px] font-black capitalize leading-[50px] tracking-[-0.6px] md:text-[45px] md:leading-[55px]"
              style={{ color: ORANGE }}
            >
              Introducing the African Bitcoin Community Builders Initiative!
            </h1>

            <BodyText className="mt-5 max-w-xl">
              Get ready for something big as we gear up to ramp up Bitcoin engagement across Africa. Our mission? To
              empower communities through meetups and orange piling events in 20 African countries, all fueled by the
              passion of 20 dedicated Community Builders we will select from the African Bitcoin community.
            </BodyText>

            <SectionTitle>Phase One: Fundraising on Geyser</SectionTitle>

            <a
              href={LINKS.geyser}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-lg px-[140px] py-[22px] text-base font-bold tracking-[-0.4px] text-white shadow-[6px_4px_4px_rgba(0,0,0,0.15)] transition-colors hover:bg-[#253343] max-md:px-20 max-md:py-5"
              style={{ backgroundColor: ORANGE }}
            >
              Geyser Page Link
            </a>

            <BodyText className="mt-6 max-w-xl">
              Join us as we kick off the journey with a crowdfunding campaign on Geyser!
              <br />
              <span className="font-bold" style={{ color: ORANGE }}>
                Every 3 million sats we raise empowers 1 Community Builder for a year.
              </span>
            </BodyText>

            <SectionTitle>Stay tuned for Phase Two, coming soon!</SectionTitle>

            <BodyText className="mt-4 max-w-xl">
              Excited? We sure are! Get involved, spread the word, and let&apos;s build something truly remarkable
              together. Visit our Geyser page to be a part of the movement.
            </BodyText>
          </div>

          <div className="hidden min-h-[420px] lg:block" aria-hidden />
        </div>
      </section>

      <section className="px-4 py-[60px] pb-[100px] sm:px-6 max-md:py-[30px]" style={{ backgroundColor: FEEDBACK_CREAM }}>
        <div className="mx-auto max-w-[600px] text-center">
          <h4 className="font-heading text-2xl font-bold tracking-[-0.8px] max-md:leading-10" style={{ color: BOUNTY_HEADING }}>
            Get 1,000 sats for your brilliant ideas!
          </h4>
          <p className="mt-4 text-lg leading-7 tracking-[-0.5px]" style={{ color: BOUNTY_HEADING }}>
            Have a genius idea or spot something in our African Bitcoiners initiatives that could be even better? Submit
            your feedback to us and we&apos;re excited to reward you for them.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href={LINKS.feedbackBounty}
              className="inline-block rounded px-20 py-[15px] text-[17px] font-semibold tracking-[-0.2px] text-white shadow-[2px_4px_8px_rgba(0,0,0,0.2)] transition-colors hover:bg-[#253343] max-md:px-20 max-md:py-[18px]"
              style={{ backgroundColor: BOUNTY_BTN }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
