import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { CourseModalBlockComponent } from '@/blocks/CourseModal/Component'
import {
  COURSE_BLURB,
  HERO_BG,
  HERO_INTRO,
  LINKS,
  REASONS,
  type ReasonCard,
} from '@/components/WhyBitcoinOnlyPage/data'

const HERO_CREAM = '#FFF2E0'
const GRID_CREAM = '#FFECD1'
const CARD_BG = '#FFF9F0'
const ORANGE = '#E1640C'
const TEXT = '#584538'
const BOUNTY_HEADING = '#2D1300'
const BOUNTY_BTN = '#F45341'

function ReasonCardBlock({ card }: { card: ReasonCard }) {
  return (
    <article
      className="flex h-full flex-col overflow-hidden rounded-md border border-black/10 px-[22px] pb-0 pt-[25px]"
      style={{ backgroundColor: CARD_BG }}
    >
      <h3
        className="font-heading text-[30px] font-black tracking-[-0.8px] sm:text-[35px]"
        style={{ color: ORANGE }}
      >
        {card.title}
      </h3>
      <p
        className="mt-5 flex-1 text-justify text-base leading-7 tracking-[-0.5px] sm:mt-[22px] sm:text-[17px] sm:leading-7"
        style={{ color: TEXT }}
      >
        {card.body}
      </p>
      <div className="-mt-6 flex justify-end sm:-mt-10">
        <Image
          src={card.image}
          alt=""
          width={card.width}
          height={card.height}
          className="h-auto w-full max-w-[280px] object-contain sm:max-w-[320px]"
          sizes="(max-width: 768px) 50vw, 320px"
        />
      </div>
    </article>
  )
}

export function WhyBitcoinOnlyPage() {
  return (
    <div className="overflow-x-hidden font-sans" style={{ backgroundColor: GRID_CREAM }}>
      {/* Hero — background image with text overlay (WP uses contain + empty right column) */}
      <section
        className="bg-contain bg-center bg-no-repeat px-4 pb-10 pt-8 sm:px-6 md:bg-contain md:pb-[100px] md:pt-20 max-md:bg-cover max-md:bg-top"
        style={{ backgroundColor: HERO_CREAM, backgroundImage: `url(${HERO_BG})` }}
      >
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-8 md:grid-cols-2">
          <div className="max-md:text-center">
            <h1
              className="font-heading text-[45px] font-black leading-[55px] tracking-[-0.8px] md:text-[50px] md:leading-[70px]"
              style={{ color: ORANGE }}
            >
              Why Bitcoin Only ?
            </h1>
            <p
              className="mt-5 max-w-[111%] text-justify text-[17px] leading-7 tracking-[-0.4px] md:text-lg md:leading-[30px] max-md:mx-auto max-md:max-w-xl"
              style={{ color: TEXT }}
            >
              {HERO_INTRO}
            </p>
          </div>
          <div className="hidden min-h-[280px] md:block" aria-hidden />
        </div>
      </section>

      {/* 12 reason cards — 2-column grid */}
      <section className="px-4 pb-5 pt-0 sm:px-6 md:pb-5" style={{ backgroundColor: GRID_CREAM }}>
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-x-5 md:gap-y-4">
          {REASONS.map((card) => (
            <ReasonCardBlock key={card.title} card={card} />
          ))}
        </div>
      </section>

      {/* Course signup */}
      <section
        className="px-4 py-12 sm:px-6 md:pb-[150px] md:pt-[60px]"
        style={{ backgroundColor: HERO_CREAM }}
      >
        <div className="mx-auto max-w-[800px] text-center">
          <h2
            className="font-heading text-xl font-extrabold capitalize leading-8 tracking-[-0.6px] sm:text-2xl"
            style={{ color: ORANGE }}
          >
            SIGN UP FOR OUR FREE
            <br />
            BITCOIN FOR BEGINNERS COURSE
          </h2>
          <p
            className="mx-auto mt-4 max-w-lg text-base leading-7 tracking-[-0.4px]"
            style={{ color: TEXT }}
          >
            {COURSE_BLURB}
          </p>
          <div className="mt-8">
            <CourseModalBlockComponent
              triggerLabel="Start the Course!"
              variant="primary-orange"
              layout="inline"
              websiteUrl="https://course.bitcoiners.africa"
              fullWidth
            />
          </div>
        </div>
      </section>

      {/* Bounty CTA */}
      <section
        className="px-4 pb-16 pt-4 sm:px-6 md:pb-[100px] md:pt-[60px]"
        style={{ backgroundColor: GRID_CREAM }}
      >
        <div className="mx-auto max-w-[600px] text-center">
          <h2
            className="font-heading text-2xl font-bold tracking-[-0.8px] sm:text-3xl"
            style={{ color: BOUNTY_HEADING }}
          >
            Get 1,000 sats for your brilliant ideas!
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-base leading-7 tracking-[-0.5px] sm:text-[17px] sm:leading-[30px]"
            style={{ color: TEXT }}
          >
            Have a genius idea or spot something in our African Bitcoiners initiatives that could be even
            better? Submit your feedback to us and we&apos;re excited to reward you for them.
          </p>
          <div className="mt-8">
            <Link
              href={LINKS.bounty}
              className="inline-flex rounded px-16 py-[15px] text-[17px] font-semibold tracking-[-0.2px] text-white shadow-[2px_4px_8px_rgba(0,0,0,0.2)] transition-colors hover:bg-brand-secondary sm:px-20"
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
