import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { CARDS, LINKS, type ResourceCard } from '@/components/BitcoinStarterPackPage/data'

const PAGE_BG = '#FFFCFA'
const FEEDBACK_CREAM = '#FFF3EA'
const HEADING = '#384958'
const CARD_TITLE = '#B54708'
const BODY = '#384958'
const BOUNTY_HEADING = '#2D1300'
const BOUNTY_BTN = '#F45341'

function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className="inline-block h-[0.85em] w-[0.85em] align-baseline"
      fill="currentColor"
      aria-hidden
    >
      <path d="M320 0H288V64H373.5L154.6 282.9l22.6 22.6L396.1 86.6V172H460V32 0H428 320zM132.9 64H64V64 448v64H448V384H384V448H128V128h64V64z" />
    </svg>
  )
}

function CardLink({ href, external }: { href: string; external?: boolean }) {
  const className = 'ml-1 inline-flex align-middle transition-opacity hover:opacity-70'
  const icon = <ExternalLinkIcon />

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label="Open link">
        {icon}
      </a>
    )
  }

  return (
    <Link href={href} className={className} aria-label="Open link">
      {icon}
    </Link>
  )
}

function ResourceCard({ card }: { card: ResourceCard }) {
  return (
    <article className="bg-white">
      <Image
        src={card.image}
        alt=""
        width={card.imageWidth}
        height={card.imageHeight}
        className="h-auto w-full rounded-t-[15px]"
      />
      <div className="px-4 pb-5 pt-4">
        <h2 className="text-start text-[19px] font-bold leading-snug" style={{ color: CARD_TITLE }}>
          {card.title}
          <CardLink href={card.href} external={card.external} />
        </h2>
        <p className="mt-2 text-start text-[15px] font-normal tracking-[-0.4px]" style={{ color: BODY }}>
          {card.description}
        </p>
      </div>
    </article>
  )
}

export function BitcoinStarterPackPage() {
  return (
    <div className="font-body" style={{ backgroundColor: PAGE_BG }}>
      <section className="px-4 pt-[50px] sm:px-6">
        <div className="mx-auto max-w-[800px] text-center">
          <h1
            className="font-heading text-[35px] font-bold leading-[45px] md:text-[40px]"
            style={{ color: HEADING }}
          >
            Bitcoin Starter Pack
          </h1>
          <p className="mt-4 text-base" style={{ color: HEADING }}>
            Based on the questions you answered you are a Bitcoin Beginner. These are some contents that will help your
            journey
          </p>
        </div>
      </section>

      <section className="px-4 pb-[30px] pt-0 sm:px-6 md:pb-[50px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-[10px] lg:gap-y-5">
            {CARDS.map((card) => (
              <ResourceCard key={card.title} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-[60px] pb-[100px] sm:px-6 max-md:py-[30px]" style={{ backgroundColor: FEEDBACK_CREAM }}>
        <div className="mx-auto max-w-[600px] text-center">
          <h4
            className="font-heading text-2xl font-bold tracking-[-0.8px] max-md:leading-10"
            style={{ color: BOUNTY_HEADING }}
          >
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
