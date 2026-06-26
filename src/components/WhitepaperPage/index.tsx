import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { CourseModalBlockComponent } from '@/blocks/CourseModal/Component'
import {
  COURSE_BLURB,
  LINKS,
  SECTIONS,
  type ContentBlock,
  type WhitepaperSection,
} from '@/components/WhitepaperPage/data'

const CREAM = '#FFF2E0'
const BOUNTY_CREAM = '#FFF3EA'
const ORANGE = '#E1640C'
const TEXT = '#584538'
const BOUNTY_HEADING = '#2D1300'
const BOUNTY_BTN = '#F45341'

function Block({ block }: { block: ContentBlock }) {
  if (block.type === 'image') {
    return (
      <div className={`my-4 ${block.wide ? 'flex justify-center' : ''}`}>
        <Image
          src={block.src}
          alt=""
          width={block.width}
          height={block.height}
          className={`h-auto object-contain ${block.wide ? 'w-[75%] max-w-full' : 'max-w-full'}`}
          sizes={block.wide ? '75vw' : '100vw'}
        />
      </div>
    )
  }

  if (block.code) {
    return (
      <pre
        className="my-4 overflow-x-auto whitespace-pre-wrap rounded bg-white/60 p-4 font-mono text-sm leading-6"
        style={{ color: TEXT }}
      >
        {block.text}
      </pre>
    )
  }

  const lines = block.text.split('\n')
  const isReferences = block.text.trimStart().startsWith('[')

  return (
    <p
      className={`text-[17px] leading-7 tracking-[-0.6px] sm:text-xl sm:leading-8 ${
        isReferences ? 'italic' : 'text-justify sm:text-start'
      }`}
      style={{ color: TEXT }}
    >
      {lines.length > 1 ? (
        lines.map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i < lines.length - 1 ? <br /> : null}
          </React.Fragment>
        ))
      ) : (
        block.text
      )}
    </p>
  )
}

function WhitepaperSectionBlock({
  section,
  isFirst,
}: {
  section: WhitepaperSection
  isFirst?: boolean
}) {
  const isHero = section.level === 'hero'

  return (
    <section
      className={`px-4 sm:px-6 ${isFirst ? 'pt-12 md:pt-[60px]' : 'pt-5 md:pt-5'} ${isHero ? 'pb-2' : 'pb-2'}`}
      style={{ backgroundColor: CREAM }}
    >
      <div className="mx-auto max-w-[1000px]">
        {isHero ? (
          <h1
            className="font-heading text-[40px] font-black capitalize leading-tight tracking-[-0.8px] sm:text-[45px] sm:leading-[55px] md:text-[50px] md:leading-[60px]"
            style={{ color: ORANGE }}
          >
            {section.title}
          </h1>
        ) : section.level === 'h4' ? (
          <h4 className="font-heading text-lg font-bold capitalize" style={{ color: ORANGE }}>
            {section.title}
          </h4>
        ) : (
          <h3
            className="font-heading text-2xl font-black capitalize leading-tight tracking-[-0.8px] sm:text-3xl sm:leading-[50px] md:leading-[60px]"
            style={{ color: ORANGE }}
          >
            {section.title}
          </h3>
        )}
        <div className={`space-y-4 ${isHero ? 'mt-5' : 'mt-3 sm:mt-4'}`}>
          {section.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function WhitepaperPage() {
  return (
    <div className="overflow-x-hidden font-sans" style={{ backgroundColor: CREAM }}>
      {SECTIONS.map((section, i) => (
        <WhitepaperSectionBlock key={`${section.title}-${i}`} section={section} isFirst={i === 0} />
      ))}

      {/* Course signup */}
      <section className="px-4 py-12 sm:px-6 md:pb-[150px] md:pt-[60px]" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-[800px]">
          <div className="rounded-2xl border border-[#603913]/20 bg-white px-5 py-10 sm:px-8 md:px-12 md:py-[50px]">
            <h2
              className="text-center font-heading text-xl font-extrabold capitalize leading-8 tracking-[-0.6px] sm:text-2xl"
              style={{ color: ORANGE }}
            >
              SIGN UP FOR OUR FREE
              <br />
              BITCOIN FOR BEGINNERS COURSE
            </h2>
            <p
              className="mx-auto mt-4 max-w-lg text-center text-base leading-7 tracking-[-0.4px]"
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
        </div>
      </section>

      {/* Bounty CTA */}
      <section
        className="px-4 pb-16 pt-4 sm:px-6 md:pb-[100px] md:pt-[60px]"
        style={{ backgroundColor: BOUNTY_CREAM }}
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
