'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { MeetupAttendForm, MeetupHostForm } from '@/components/MeetupsPage/MeetupsAuxForms'
import { COPY, IMG, SECTIONS, type MeetupCard } from '@/components/MeetupsPage/data'
import { MeetupSubmissionForm } from '@/components/forms/MeetupSubmissionForm'

const HERO_BG = '#FEF6EC'
const SECTION_BG = '#FFECD1'
const CARD_BG = '#FFFAF5'
const CARD_BORDER = '#CECACA'
const FORM_BG = '#FFF2E0'
const BOUNTY_BG = '#FFF3EA'
const BROWN = '#584538'
const BROWN_MID = '#59462E'
const ORANGE = '#E1640C'
const ORANGE_HOVER = '#EF8B45'

function CalendarIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 512 512" fill={ORANGE} aria-hidden>
      <path d="M448 96h-48V64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v32H192V64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v32H80c-26.5 0-48 21.5-48 48v320c0 26.5 21.5 48 48 48h368c26.5 0 48-21.5 48-48V144c0-26.5-21.5-48-48-48zM80 176h368v256H80V176z" />
    </svg>
  )
}

function MapIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 384 512" fill={ORANGE} aria-hidden>
      <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
    </svg>
  )
}

function CardImage({ card }: { card: MeetupCard }) {
  const frame = card.imageFrame
  const objectFit = frame?.objectFit ?? 'cover'
  const bleedWrap = (children: React.ReactNode) => (
    <div className="-mx-[18px] overflow-hidden rounded-t-[10px]">{children}</div>
  )

  // Small intrinsic logo — not stretched (BitDevs Abuja)
  if (frame?.intrinsic) {
    return bleedWrap(
      <div className="flex w-full items-center justify-center py-5" style={{ backgroundColor: CARD_BG }}>
        <Image
          src={card.image}
          alt={card.title}
          width={card.imageWidth}
          height={card.imageHeight}
          className="h-auto w-auto max-w-[min(100%,280px)]"
          sizes="280px"
        />
      </div>,
    )
  }

  // Centered logo in fixed frame (BitcoinJHB)
  if (frame?.centered && frame.height) {
    return bleedWrap(
      <div
        className="flex w-full items-center justify-center"
        style={{ height: frame.height, backgroundColor: CARD_BG }}
      >
        <Image
          src={card.image}
          alt={card.title}
          width={card.imageWidth}
          height={card.imageHeight}
          className="h-full w-auto max-w-[61%] object-contain"
          sizes="(max-width: 768px) 61vw, 30vw"
        />
      </div>,
    )
  }

  // Fixed-height banner crop (Cape Town, Accra, Lagos, Nairobi BitDevs)
  if (frame?.height) {
    return bleedWrap(
      <div className="relative w-full" style={{ height: frame.height }}>
        <Image
          src={card.image}
          alt={card.title}
          fill
          className={objectFit === 'contain' ? 'object-contain' : 'object-cover'}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>,
    )
  }

  // Natural proportions — width 100%, height from source image
  return bleedWrap(
    <Image
      src={card.image}
      alt={card.title}
      width={card.imageWidth}
      height={card.imageHeight}
      className="h-auto w-full"
      sizes="(max-width: 768px) 100vw, 50vw"
    />,
  )
}

function SectionDividerTitle({ title }: { title: string }) {
  const bar = (
    <span
      className="block h-[14px] flex-1 border border-[#CECACA] bg-white"
      aria-hidden
    />
  )

  return (
    <div className="flex items-center gap-4 md:gap-6">
      {bar}
      <h2
        className="shrink-0 text-center font-heading text-[22px] font-extrabold capitalize leading-[35px] tracking-[-0.7px] md:text-[25px]"
        style={{ color: BROWN }}
      >
        {title}
      </h2>
      {bar}
    </div>
  )
}

function MeetupCardItem({ card }: { card: MeetupCard }) {
  const isExternal = card.ctaHref.startsWith('http')
  const isMailto = card.ctaHref.startsWith('mailto:')

  return (
    <article
      className="h-full overflow-hidden rounded-[10px] border border-solid px-[18px]"
      style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}
    >
      <CardImage card={card} />

      <div className="pb-6 pt-4">
        <h3
          className="font-heading text-[22px] font-bold leading-[30px] tracking-[-0.6px] sm:text-[26px]"
          style={{ color: BROWN }}
        >
          {card.title}
        </h3>

        <ul className="mt-3 space-y-2 text-sm" style={{ color: BROWN_MID }}>
          <li className="flex items-start gap-2">
            <CalendarIcon />
            <span>{card.date}</span>
          </li>
          <li className="flex items-start gap-2">
            <MapIcon />
            <span>{card.location}</span>
          </li>
        </ul>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={card.ctaHref}
            target={isExternal && !isMailto ? '_blank' : undefined}
            rel={isExternal && !isMailto ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center justify-center rounded-lg px-10 py-[17px] text-center text-[17px] font-bold tracking-[-0.2px] text-white shadow-[2px_4px_8px_rgba(0,0,0,0.2)] transition-colors hover:text-white sm:w-auto"
            style={{ backgroundColor: ORANGE }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = ORANGE_HOVER
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = ORANGE
            }}
          >
            {card.ctaText}
          </a>

          {card.linkText && card.linkHref && (
            <a
              href={card.linkHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-right text-[15px] font-medium tracking-[-0.6px] underline transition-opacity hover:opacity-80 sm:max-w-[50%]"
              style={{ color: ORANGE }}
            >
              {card.linkText}
            </a>
          )}
        </div>

        {card.about && (
          <div className="mt-5">
            <h4
              className="font-heading text-lg font-bold tracking-[-0.6px] sm:text-[25px] sm:leading-[55px]"
              style={{ color: BROWN }}
            >
              About the Event
            </h4>
            <p className="mt-1 text-base leading-[26px] tracking-[-0.4px]" style={{ color: BROWN_MID }}>
              {card.about}
            </p>
          </div>
        )}
      </div>
    </article>
  )
}

function MeetupSection({ title, cards }: { title: string; cards: MeetupCard[] }) {
  return (
    <>
      {/* Section title row — separate band with bordered white flanking bars (WP layout) */}
      <section style={{ backgroundColor: SECTION_BG }} className="px-4 pt-8 md:pt-10">
        <div className="mx-auto max-w-[1200px]">
          <SectionDividerTitle title={title} />
        </div>
      </section>

      {/* Cards grid */}
      <section style={{ backgroundColor: SECTION_BG }} className="px-4 pb-8 pt-6 md:pb-10 md:pt-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-x-5 gap-y-6 md:grid-cols-2">
            {cards.map((card) => (
              <MeetupCardItem key={card.title} card={card} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function FormSection({
  id,
  title,
  bg,
  narrow,
  children,
}: {
  id?: string
  title: string
  bg: string
  narrow?: boolean
  children: React.ReactNode
}) {
  return (
    <section id={id} style={{ backgroundColor: bg }} className="px-4 py-12 md:py-16">
      <div className={narrow ? 'mx-auto max-w-[700px]' : 'mx-auto max-w-[900px]'}>
        <h2
          className="mb-8 text-center font-heading text-2xl font-bold leading-tight tracking-[-0.4px] md:text-[30px]"
          style={{ color: BROWN }}
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  )
}

export function MeetupsPage() {
  return (
    <div className="overflow-x-hidden font-sans">
      {/* Hero */}
      <section style={{ backgroundColor: HERO_BG }} className="px-4 py-12 md:py-[60px]">
        <div className="mx-auto max-w-[1200px] text-center">
          <h1
            className="font-heading text-[36px] font-black leading-[1.2] tracking-[-0.5px] md:text-[50px] md:leading-[70px]"
            style={{ color: BROWN }}
          >
            {COPY.heroTitle}
          </h1>

          <div
            className="mx-auto mt-6 max-w-3xl space-y-4 text-base leading-[30px] tracking-[-0.8px] md:text-lg"
            style={{ color: BROWN_MID }}
          >
            {COPY.heroParagraphs.map((p, i) => (
              <p key={i} className="whitespace-pre-line">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-8">
            <a
              href="#meetupregister"
              className="inline-flex items-center justify-center rounded-lg px-6 py-[25px] text-[17px] font-extrabold tracking-[-0.4px] text-white shadow-[6px_4px_4px_rgba(0,0,0,0.15)] transition-colors"
              style={{ backgroundColor: ORANGE }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = ORANGE_HOVER
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = ORANGE
              }}
            >
              {COPY.heroCta}
            </a>
          </div>

          <div className="mx-auto mt-10 w-full max-w-[1000px]">
            <Image
              src={IMG.hero}
              alt="African Bitcoiners meetups"
              width={IMG.heroWidth}
              height={IMG.heroHeight}
              className="h-auto w-full rounded-[10px]"
              priority
              sizes="(max-width: 1024px) 100vw, 1000px"
            />
          </div>
        </div>
      </section>

      {/* Meetup grids */}
      {SECTIONS.map((section) => (
        <MeetupSection key={section.title} title={section.title} cards={section.cards} />
      ))}

      {/* Listing form — gform_84 */}
      <FormSection id="meetupregister" title={COPY.listingFormTitle} bg={FORM_BG}>
        <MeetupSubmissionForm variant="page" />
      </FormSection>

      {/* Feedback bounty CTA */}
      <section style={{ backgroundColor: BOUNTY_BG }} className="px-4 py-12 md:py-16">
        <div className="mx-auto max-w-[700px] text-center">
          <h4
            className="font-heading text-xl font-bold tracking-[-0.4px] md:text-2xl"
            style={{ color: BROWN }}
          >
            {COPY.bountyTitle}
          </h4>
          <p className="mt-4 text-base leading-[26px] tracking-[-0.4px]" style={{ color: BROWN_MID }}>
            {COPY.bountyText}
          </p>
          <Link
            href={COPY.bountyHref}
            className="mt-6 inline-flex items-center justify-center rounded-lg px-6 py-4 text-[17px] font-bold tracking-[-0.2px] text-white shadow-[2px_4px_8px_rgba(0,0,0,0.2)] transition-colors"
            style={{ backgroundColor: ORANGE }}
          >
            {COPY.bountyCta}
          </Link>
        </div>
      </section>

      {/* Host proposal form — gform_88 */}
      <FormSection id="host" title={COPY.hostFormTitle} bg={HERO_BG} narrow>
        <MeetupHostForm />
      </FormSection>

      {/* Attend database form — gform_87 */}
      <FormSection id="attend" title={COPY.attendFormTitle} bg={HERO_BG} narrow>
        <MeetupAttendForm />
      </FormSection>
    </div>
  )
}
