import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { COPY, FEATURED, MEMBERS, IMG, type HofMember } from '@/components/HallOfFamePage/data'
import { HallOfFameTicker } from '@/components/HallOfFamePage/HallOfFameTicker'
import { MedalIcon } from '@/components/HallOfFamePage/MedalIcon'

const HERO_BG = '#291713'
const DARK_BG = '#1B0804'
const CREAM_TEXT = '#FFFCF0'
const TITLE_CREAM = '#FFF5E3'
const BADGE_BG = '#683D00'
const LINK_ORANGE = '#ff9500'

function HeroBadge({ year, href }: { year: number; href: string }) {
  return (
    <Link
      href={href}
      className="flex w-full items-center gap-1.5 border border-dotted px-1.5 py-1.5 text-[10px] leading-[1.2] tracking-[-0.2px] transition-colors hover:opacity-90 sm:px-2 sm:text-[11px]"
      style={{
        backgroundColor: BADGE_BG,
        borderColor: 'rgba(255, 252, 240, 0.7)',
        color: CREAM_TEXT,
      }}
    >
      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center [&_svg]:h-5 [&_svg]:w-5">
        <MedalIcon />
      </span>
      <span className="text-left">Most Impactful African Bitcoiner {year}</span>
    </Link>
  )
}

function MiabBadge({ year, href }: { year: number; href: string }) {
  return (
    <Link
      href={href}
      className="mt-3 inline-flex items-center gap-2 border border-dotted px-3 py-2 text-[13px] tracking-[-0.2px] transition-colors hover:bg-[#683D00]/80"
      style={{
        backgroundColor: BADGE_BG,
        borderColor: 'rgba(255, 252, 240, 0.7)',
        color: CREAM_TEXT,
      }}
    >
      <MedalIcon />
      <span>Most Impactful African Bitcoiner {year}</span>
    </Link>
  )
}

function BioContent({ html }: { html: string }) {
  return (
    <div
      className="hof-bio space-y-4 text-base leading-[26px] tracking-[-0.4px]"
      style={{ color: CREAM_TEXT }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

function MemberRow({ member }: { member: HofMember }) {
  const heading = (
    <div>
      <h2 className="font-heading text-[28px] font-bold leading-tight tracking-[-0.4px] md:text-[35px]" style={{ color: CREAM_TEXT }}>
        {member.name}{' '}
        <span className="text-2xl md:text-3xl" aria-label={member.country}>
          {member.flag}
        </span>
      </h2>
      <MiabBadge year={member.year} href={member.miabHref} />
    </div>
  )

  const photo = (
    <div className="flex justify-center md:justify-start">
      <Image
        src={member.photo}
        alt={member.name}
        width={879}
        height={1024}
        className="h-auto w-full max-w-[520px] rounded-lg object-contain md:max-w-none md:w-[85%]"
        sizes="(max-width: 768px) 90vw, 45vw"
      />
    </div>
  )

  const bio = <BioContent html={member.bioHtml} />

  return (
    <section className="px-4 py-10 sm:px-6 md:py-14" style={{ backgroundColor: DARK_BG }}>
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-10">
        {member.imageOnLeft ? (
          <>
            <div>
              <div className="mb-6 md:hidden">{heading}</div>
              {photo}
            </div>
            <div>
              <div className="mb-6 hidden md:block">{heading}</div>
              {bio}
            </div>
          </>
        ) : (
          <>
            <div className="order-2 md:order-1">
              <div className="mb-6 hidden md:block">{heading}</div>
              {bio}
            </div>
            <div className="order-1 md:order-2">
              <div className="mb-6 md:hidden">{heading}</div>
              {photo}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export function HallOfFamePage() {
  return (
    <div className="overflow-x-hidden font-sans">
      <style>{`
        .hof-bio a { color: ${LINK_ORANGE}; text-decoration: underline; }
        .hof-bio a:hover { color: #ffffff; }
        .hof-bio strong { font-weight: 700; }
        .hof-intro strong { font-weight: 700; }
      `}</style>

      {/* Hero */}
      <section
        className="bg-cover bg-center bg-no-repeat px-4 pt-5 pb-0 sm:px-6 md:pt-[30px]"
        style={{ backgroundColor: HERO_BG, backgroundImage: `url("${IMG.heroBg}")`, backgroundSize: '105% auto' }}
      >
        <div className="mx-auto max-w-[1200px] text-center">
          <h1 className="text-[18px] font-semibold tracking-[-0.4px] md:text-[22px]" style={{ color: CREAM_TEXT }}>
            {COPY.eyebrow}
          </h1>
          <h2
            className="mt-1 font-heading text-[42px] font-bold leading-[0.95] tracking-tight md:text-[90px] md:leading-[75px]"
            style={{ color: TITLE_CREAM }}
          >
            {COPY.titleMain}{' '}
            <span className="font-serif text-[36px] font-extralight italic md:text-[72px]">{COPY.titleOf}</span>{' '}
            {COPY.titleFame}
          </h2>

          <div className="mx-auto mt-5 max-w-[800px] pt-5">
            <div className="grid grid-cols-4 gap-1 sm:gap-1.5">
              {FEATURED.map((item) => (
                <div key={item.year} className="min-w-0">
                  <div className="overflow-hidden rounded-t-md">
                    <Image
                      src={item.thumb}
                      alt={item.alt}
                      width={347}
                      height={554}
                      className="h-auto w-full object-cover"
                      sizes="200px"
                    />
                  </div>
                  <HeroBadge year={item.year} href={item.href} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Intro — same 800px column as gallery, left-aligned */}
      <section className="px-4 pb-10 sm:px-6" style={{ backgroundColor: DARK_BG }}>
        <div className="mx-auto max-w-[800px] pt-5 text-start md:pt-[50px]">
          <div className="hof-intro space-y-4 text-[15px] leading-[23px] tracking-[-0.4px] md:text-base md:leading-[26px]" style={{ color: CREAM_TEXT }}>
            {COPY.introParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>
          <h3
            className="mt-5 font-heading text-[30px] font-bold leading-tight tracking-[-0.4px]"
            style={{ color: CREAM_TEXT }}
          >
            {COPY.celebratingTitle}
          </h3>
          <p
            className="mt-4 text-[15px] leading-[23px] tracking-[-0.4px] md:text-base md:leading-[26px]"
            style={{ color: CREAM_TEXT }}
            dangerouslySetInnerHTML={{ __html: COPY.celebratingBody }}
          />
        </div>
      </section>

      {/* Profiles */}
      {MEMBERS.map((member) => (
        <MemberRow key={member.name} member={member} />
      ))}

      {/* Year ticker */}
      <section className="px-4 py-5 pb-[100px] sm:px-6" style={{ backgroundColor: DARK_BG }}>
        <HallOfFameTicker />
      </section>
    </div>
  )
}
