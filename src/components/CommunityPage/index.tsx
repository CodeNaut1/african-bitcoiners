import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { CARDS, LINKS, type CommunityCard } from '@/components/CommunityPage/data'

const PAGE_BG = '#FFFCFA'
const FEEDBACK_CREAM = '#FFF3EA'
const HEADING = '#37312C'
const BODY = '#37312C'
const BOUNTY_HEADING = '#2D1300'
const BOUNTY_BTN = '#F45341'
const CTA_ORANGE = '#F45341'

function CardCta({ card }: { card: CommunityCard }) {
  if (card.years?.length) {
    return (
      <div className="mt-4 flex flex-wrap gap-3">
        {card.years.map(({ year, href }) => (
          <Link
            key={year}
            href={href}
            className="text-base font-semibold transition-opacity hover:opacity-80"
            style={{ color: CTA_ORANGE }}
          >
            {year}
          </Link>
        ))}
      </div>
    )
  }

  if (!card.href) return null

  return (
    <div className="mt-4">
      <Link
        href={card.href}
        className="text-base font-semibold transition-opacity hover:opacity-80"
        style={{ color: CTA_ORANGE }}
      >
        Visit page
      </Link>
    </div>
  )
}

function CommunityCardItem({ card }: { card: CommunityCard }) {
  const imageFit = card.imageFit ?? 'cover'
  const objectPosition = card.imagePosition === 'top' ? 'object-top' : 'object-center'

  return (
    <article className="flex h-full flex-col border border-black/15 bg-white">
      <div className="relative aspect-[340/240] w-full overflow-hidden bg-white">
        <Image
          src={card.image}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 340px"
          className={`${imageFit === 'contain' ? 'object-contain' : 'object-cover'} ${objectPosition}`}
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3
          className="text-[19px] font-bold leading-snug tracking-[-0.4px]"
          style={{ color: HEADING }}
        >
          {card.title}
        </h3>
        <p className="mt-2 flex-1 text-base font-normal tracking-[-0.2px]" style={{ color: BODY }}>
          {card.description}
        </p>
        <CardCta card={card} />
      </div>
    </article>
  )
}

export function CommunityPage() {
  return (
    <div className="font-body" style={{ backgroundColor: PAGE_BG }}>
      <section className="px-4 pt-[30px] sm:px-6 md:pt-[50px]">
        <div className="mx-auto max-w-[800px] text-center">
          <h1
            className="font-heading text-[35px] font-bold leading-[45px] md:text-[40px]"
            style={{ color: HEADING }}
          >
            COMMUNITY
          </h1>
          <p className="mt-4 text-lg tracking-[-0.4px]" style={{ color: HEADING }}>
            A Bitcoin community bringing Freedom to Africa through Bitcoin. We help to onboard new African users and
            guide them safely on their Bitcoin journey from earning sats to self custody.
          </p>
        </div>
      </section>

      <section className="px-4 pb-[30px] pt-6 sm:px-6 md:pb-[50px]">
        <div className="mx-auto max-w-[1000px]">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CARDS.map((card) => (
              <CommunityCardItem key={card.title} card={card} />
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
