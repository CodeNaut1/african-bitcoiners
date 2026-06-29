import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { IMG, INTRO_PARAGRAPHS, LINKS } from '@/components/BuyBitcoinPrivatelyPage/data'
import { PlatformCards, PlatformTableCompactLink } from '@/components/BuyBitcoinPrivatelyPage/PlatformCards'
import { PlatformTable } from '@/components/BuyBitcoinPrivatelyPage/PlatformTable'

const HERO_ORANGE = '#FF7F00'
const CREAM = '#FFF0DD'
const INTRO_BG = '#FFFCFA'
const FEEDBACK_CREAM = '#FFF3EA'
const HEADING = '#384958'
const BOUNTY_HEADING = '#2D1300'
const BOUNTY_BTN = '#F45341'
const ACCENT = '#652A00'

type Props = {
  variant?: 'hub' | 'standalone'
}

export function BuyBitcoinPrivatelyPage({ variant = 'standalone' }: Props) {
  const isHub = variant === 'hub'
  const title = isHub ? 'Buying Bitcoin Peer 2 Peer' : 'Where to Buy Bitcoin Privately In Africa'
  const subtitle = isHub
    ? 'Want to buy Bitcoin in Africa but not sure where to start? Peer-to-peer is more private — here are the platforms we trust.'
    : null

  return (
    <div className="overflow-x-hidden font-body">
      {/* Hero */}
      <section
        className="relative overflow-hidden px-4 py-12 sm:px-6 md:py-16"
        style={{ backgroundColor: HERO_ORANGE }}
      >
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white/90">Save Bitcoin</p>
            <h1 className="mt-2 font-heading text-[34px] font-bold leading-tight tracking-[-0.6px] text-white md:text-[48px] md:leading-[1.15]">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-lg leading-7 tracking-[-0.4px] text-white/95">{subtitle}</p>
            )}
            {!isHub && (
              <p className="mt-4 text-lg leading-7 tracking-[-0.4px] text-white/95">{INTRO_PARAGRAPHS[0]}</p>
            )}
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="overflow-hidden rounded-xl border-4 border-white/30 shadow-lg">
              <Image
                src={isHub ? IMG.card : IMG.hero}
                alt=""
                width={isHub ? 340 : 1024}
                height={isHub ? 240 : 768}
                className="h-auto w-full max-w-[420px] object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 420px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="px-4 py-10 sm:px-6 md:py-12" style={{ backgroundColor: INTRO_BG }}>
        <div className="mx-auto max-w-[800px] space-y-4 text-[17px] leading-7 tracking-[-0.4px]" style={{ color: HEADING }}>
          {(isHub ? INTRO_PARAGRAPHS : INTRO_PARAGRAPHS.slice(1)).map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Platforms */}
      <section className="px-4 py-10 sm:px-6 md:py-14 md:pb-16" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-[1200px]">
          <h2
            className="text-center font-heading text-2xl font-black capitalize tracking-[-0.8px] md:text-3xl"
            style={{ color: ACCENT }}
          >
            Trusted <span style={{ color: HERO_ORANGE }}>P2P Platforms</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-base leading-relaxed" style={{ color: HEADING }}>
            Compare fees, devices, and Lightning support. Always do your own research before trading.
          </p>

          <div className="mt-10 lg:hidden">
            <PlatformCards />
          </div>

          <div className="mt-10 hidden lg:block">
            <PlatformTable />
          </div>

          <PlatformTableCompactLink />
        </div>
      </section>

      {/* Feedback bounty */}
      <section className="px-4 py-12 sm:px-6 md:py-16 md:pb-24" style={{ backgroundColor: FEEDBACK_CREAM }}>
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
          <Link
            href={LINKS.feedbackBounty}
            className="mt-8 inline-block rounded px-20 py-[15px] text-[17px] font-semibold tracking-[-0.2px] text-white shadow-[2px_4px_8px_rgba(0,0,0,0.2)] transition-colors hover:bg-[#253343]"
            style={{ backgroundColor: BOUNTY_BTN }}
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  )
}
