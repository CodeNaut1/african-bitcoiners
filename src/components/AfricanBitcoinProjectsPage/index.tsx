import Link from 'next/link'
import React from 'react'

import { CommunityCard } from '@/components/AfricanBitcoinCommunitiesPage/CommunityCard'
import { CountryCarousel } from '@/components/AfricanBitcoinCommunitiesPage/CountryCarousel'
import { IMG, LINKS, PROJECTS } from '@/components/AfricanBitcoinProjectsPage/data'

const PAGE_BG = '#FFFCFA'
const FEEDBACK_CREAM = '#FFF3EA'
const HEADING = '#37312C'
const BODY = '#37312C'
const BOUNTY_HEADING = '#2D1300'
const BOUNTY_BTN = '#F45341'
const CTA_ORANGE = '#F45341'
const SUBMIT_BG = '#FEF6EC'

const HERO_OVERLAY =
  'linear-gradient(90deg, rgba(65, 32, 40, 0.92) 0%, rgba(80, 45, 55, 0.78) 42%, rgba(130, 50, 35, 0.55) 100%)'

export function AfricanBitcoinProjectsPage() {
  return (
    <div className="font-body" style={{ backgroundColor: PAGE_BG }}>
      <section
        className="relative bg-cover bg-center bg-no-repeat px-4 pb-14 pt-8 sm:px-6 md:pb-20 md:pt-10"
        style={{ backgroundImage: `url(${IMG.heroBg})` }}
      >
        <div className="absolute inset-0" style={{ background: HERO_OVERLAY }} aria-hidden />
        <div className="relative mx-auto max-w-[1100px]">
          <CountryCarousel />

          <div className="mt-10 max-w-[580px] md:mt-12">
            <h1 className="font-heading text-[32px] font-bold leading-[1.15] tracking-[-0.6px] text-white md:text-[42px] md:leading-[52px]">
              TOP AFRICAN BITCOIN PROJECTS
            </h1>
            <p className="mt-4 text-base leading-relaxed tracking-[-0.2px] text-white/90 md:text-lg">
              As Bitcoin is growing in Africa, so are it&apos;s entrepreneurs. They are waking up and
              seeing the incredible array of opportunities that this new money will open up.
              Importantly however, while Bitcoin will permeate every aspect of our lives, Africa is
              different and needs solutions that are built by the people of Africa for the people of
              Africa.
            </p>
            <p className="mt-4 text-base leading-relaxed tracking-[-0.2px] text-white/90 md:text-lg">
              These are the Bitcoin organisations that are building in Africa for Africa.
            </p>
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-24 px-4 py-12 sm:px-6 md:py-16">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project) => (
              <CommunityCard key={project.name} community={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 md:py-16" style={{ backgroundColor: SUBMIT_BG }}>
        <div className="mx-auto max-w-[640px] text-center">
          <h2
            className="font-heading text-xl font-bold tracking-[-0.5px] md:text-2xl"
            style={{ color: HEADING }}
          >
            Submit a Community/Project for the Bitcoin Ecosystem Infographic
          </h2>
          <p className="mt-4 text-base leading-relaxed tracking-[-0.2px]" style={{ color: BODY }}>
            Know a Bitcoin project that should be featured on our African Bitcoin ecosystem map? Get
            in touch and tell us about it.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={LINKS.submitProject}
              className="inline-flex rounded-sm px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: CTA_ORANGE }}
            >
              Submit a project
            </Link>
            <Link
              href={LINKS.ecosystem}
              className="inline-flex rounded-sm border px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-80"
              style={{ borderColor: CTA_ORANGE, color: CTA_ORANGE }}
            >
              View ecosystem map
            </Link>
          </div>
        </div>
      </section>

      <section
        className="px-4 py-[60px] pb-[100px] sm:px-6 max-md:py-[30px]"
        style={{ backgroundColor: FEEDBACK_CREAM }}
      >
        <div className="mx-auto max-w-[600px] text-center">
          <h4
            className="font-heading text-2xl font-bold tracking-[-0.8px] max-md:leading-10"
            style={{ color: BOUNTY_HEADING }}
          >
            Get 1,000 sats for your brilliant ideas!
          </h4>
          <p className="mt-4 text-base tracking-[-0.2px]" style={{ color: BOUNTY_HEADING }}>
            Share feedback on this page and earn sats through our feedback bounty program.
          </p>
          <Link
            href={LINKS.feedbackBounty}
            className="mt-6 inline-flex rounded-sm px-8 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: BOUNTY_BTN }}
          >
            Learn more
          </Link>
        </div>
      </section>
    </div>
  )
}
