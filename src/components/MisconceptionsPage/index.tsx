import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import {
  HERO_BG,
  HERO_INTRO,
  LINKS,
  SECTIONS,
  type RichPart,
  type SectionBlock,
} from '@/components/MisconceptionsPage/data'
import { NewsletterSignupForm } from '@/components/forms/NewsletterSignupForm'

const HERO_CREAM = '#FFF2E0'
const CONTENT_CREAM = '#FFF9F0'
const BOUNTY_CREAM = '#FFFCF7'
const ORANGE = '#E1640C'
const ORANGE_LINK = '#E1640C'
const TEXT = '#584538'
const BOUNTY_HEADING = '#2D1300'
const BOUNTY_BTN = '#F45341'

function RichText({ parts }: { parts: RichPart[] }) {
  return (
    <>
      {parts.map((part, i) => {
        if (typeof part === 'string') return <React.Fragment key={i}>{part}</React.Fragment>
        const className = 'font-semibold hover:underline'
        const style = { color: ORANGE_LINK }
        if (part.external) {
          return (
            <a key={i} href={part.href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
              {part.text}
            </a>
          )
        }
        return (
          <Link key={i} href={part.href} className={className} style={style}>
            {part.text}
          </Link>
        )
      })}
    </>
  )
}

function Block({ block }: { block: SectionBlock }) {
  if (block.type === 'image') {
    return (
      <div className="my-6">
        <Image
          src={block.src}
          alt={block.alt}
          width={block.width}
          height={block.height}
          className="h-auto w-full max-w-[768px]"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>
    )
  }

  return (
    <p className="text-[17px] leading-7 tracking-[-0.6px] sm:text-lg sm:leading-8" style={{ color: TEXT }}>
      <RichText parts={block.parts} />
    </p>
  )
}

function MisconceptionSection({
  orange,
  title,
  blocks,
  isFirst,
}: {
  orange: string
  title: string
  blocks: SectionBlock[]
  isFirst?: boolean
}) {
  return (
    <section
      className={`px-4 sm:px-6 ${isFirst ? 'pt-10 md:pt-[60px]' : 'pt-8 md:pt-10'}`}
      style={{ backgroundColor: CONTENT_CREAM }}
    >
      <div className="mx-auto max-w-[1000px] pb-8 md:pb-10">
        <h3 className="font-heading text-[22px] font-medium capitalize leading-[1.2] tracking-[-0.8px] sm:text-[26px] sm:leading-[50px] md:text-[28px]">
          <span className="font-black" style={{ color: ORANGE }}>
            {orange}
          </span>
          {title ? (
            <span style={{ color: TEXT }}> {title}</span>
          ) : null}
        </h3>
        <div className="mt-4 space-y-4 sm:mt-5 sm:space-y-5">
          {blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function MisconceptionsPage() {
  return (
    <div className="overflow-x-hidden bg-[#FFF9F0] font-sans">
      {/* Hero — background image with text overlay (not side-by-side image) */}
      <section
        className="bg-cover bg-center bg-no-repeat px-4 pb-12 pt-10 sm:px-6 md:pb-[60px] md:pt-[50px]"
        style={{ backgroundColor: HERO_CREAM, backgroundImage: `url(${HERO_BG})` }}
      >
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-8 md:grid-cols-2">
          <div>
            <h1
              className="font-heading text-[36px] font-black capitalize leading-tight tracking-[-0.8px] sm:text-[45px] sm:leading-[55px] md:text-[50px] md:leading-[60px]"
              style={{ color: ORANGE }}
            >
              Top 10 Bitcoin Misconceptions Explained
            </h1>
            <p
              className="mt-5 text-[17px] leading-7 tracking-[-0.6px] sm:text-lg sm:leading-8 md:mt-6"
              style={{ color: TEXT }}
            >
              {HERO_INTRO}
            </p>
          </div>
          <div className="hidden min-h-[200px] md:block" aria-hidden />
        </div>
      </section>

      {/* 10 misconception sections */}
      {SECTIONS.map((section, i) => (
        <MisconceptionSection key={section.orange} {...section} isFirst={i === 0} />
      ))}

      {/* Newsletter */}
      <section className="px-4 py-12 sm:px-6 md:pb-[100px] md:pt-[50px]" style={{ backgroundColor: HERO_CREAM }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="border border-black/15 bg-white px-5 py-10 sm:px-10 md:px-[170px] md:py-[50px]">
            <h2
              className="text-center font-heading text-2xl font-bold tracking-[-0.6px]"
              style={{ color: TEXT }}
            >
              Get our weekly African Bitcoin updates
            </h2>
            <div className="mt-8">
              <NewsletterSignupForm
                submitLabel="Sign me up!"
                namePlaceholder="Your name (or Nym)"
                emailPlaceholder="Your email address"
                countryLabel="What African Country are you from?"
                countryPlaceholder="Select a Country/Continent"
                fullWidthButton
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bounty CTA */}
      <section className="px-4 pb-16 pt-4 sm:px-6 md:pb-[100px] md:pt-[60px]" style={{ backgroundColor: BOUNTY_CREAM }}>
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
