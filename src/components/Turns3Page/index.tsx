'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { COMMUNITY, IMG, INITIATIVES, PARTNERS, TESTIMONIALS } from '@/components/Turns3Page/data'

const HEADING = '#1D4744'
const BODY = '#37312C'
const ORANGE = '#F45341'
const ORANGE_CTA = '#EC6744'
const LINK_ORANGE = '#F27202'

function FilmIcon() {
  return (
    <svg className="h-10 w-10" viewBox="0 0 512 512" fill="currentColor" aria-hidden>
      <path d="M464 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM48 96h416v304H48V96zm96 160c0-17.7 14.3-32 32-32s32 14.3 32 32-14.3 32-32 32-32-14.3-32-32zm128 0c0-17.7 14.3-32 32-32s32 14.3 32 32-14.3 32-32 32-32-14.3-32-32zm-128 64c0-17.7 14.3-32 32-32s32 14.3 32 32-14.3 32-32 32-32-14.3-32-32zm128 0c0-17.7 14.3-32 32-32s32 14.3 32 32-14.3 32-32 32-32-14.3-32-32z" />
    </svg>
  )
}

function BookIcon() {
  return (
    <svg className="h-10 w-10" viewBox="0 0 576 512" fill="currentColor" aria-hidden>
      <path d="M542.2 211.8c-11.1-9.4-25.9-9.4-37 0L384 312.2l-11.5-9.7c-5.1-4.3-11.5-6.6-18.1-6.6H256V64c0-35.3-28.7-64-64-64H64C28.7 0 0 28.7 0 64v384c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V256l-70.8-44.2zM64 64h128v256H64V64zm384 384H64v-64h384v64zm0-128H256v-64h117.5l90.7 76.8c11.1 9.4 25.9 9.4 37 0l90.7-76.8H448v64z" />
    </svg>
  )
}

function SectionHeading({ children, as = 'h2' }: { children: React.ReactNode; as?: 'h2' | 'h4' }) {
  const Tag = as
  const className =
    as === 'h2'
      ? 'font-heading text-[36px] font-medium tracking-[-0.6px] md:text-[40px]'
      : 'font-heading text-[28px] font-medium tracking-[-0.6px] md:text-[32px]'
  return (
    <Tag className={`text-center ${className}`} style={{ color: HEADING }}>
      {children}
    </Tag>
  )
}

function SectionIntro({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mx-auto mt-4 max-w-3xl text-center text-[15px] leading-7 tracking-[-0.5px] md:text-base md:leading-7"
      style={{ color: BODY }}
    >
      {children}
    </p>
  )
}

function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-block rounded-lg px-16 py-6 text-[17px] font-bold tracking-[-0.2px] text-white shadow-[2px_4px_8px_rgba(0,0,0,0.2)] transition-colors hover:bg-brand-secondary md:px-20"
      style={{ backgroundColor: ORANGE_CTA }}
    >
      {children}
    </Link>
  )
}

function AnniversaryRibbon() {
  return (
    <div className="pointer-events-none absolute left-0 top-0 z-20" aria-hidden>
      <span className="anniversary-ribbon absolute block bg-[#F45341] py-[7px] text-center text-[11px] font-semibold tracking-wide text-[#FFF5E2] md:py-2.5 md:text-xs">
        3 YEARS ANNIVERSARY
      </span>
      <style jsx>{`
        .anniversary-ribbon {
          width: 250px;
          transform: rotate(-40deg) translate(-93px, -85px);
        }
        @media (min-width: 768px) {
          .anniversary-ribbon {
            width: 400px;
            transform: rotate(-40deg) translate(-208px, -230px);
          }
        }
      `}</style>
    </div>
  )
}

function InitiativeCard({
  title,
  icon,
  iconW,
  iconH,
  image,
  imageW,
  imageH,
  body,
  href,
  cta,
  external,
}: (typeof INITIATIVES)[number]) {
  const LinkWrap = external ? 'a' : Link
  const linkProps = external
    ? { href, target: '_blank' as const, rel: 'noopener noreferrer' }
    : { href }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[10px] border border-black/[0.15] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.07)]">
      <div className="flex items-center gap-6 bg-[#FFFDFB] px-5 py-5 md:px-10 md:py-6">
        {icon && (
          <Image
            src={icon}
            alt=""
            width={iconW ?? 96}
            height={iconH ?? 96}
            className="h-14 w-14 shrink-0 object-contain md:h-16 md:w-16"
          />
        )}
        <h4
          className={`font-heading text-xl font-black leading-9 md:text-2xl ${icon ? '' : 'w-full text-center md:text-left'}`}
          style={{ color: HEADING }}
        >
          {title}
        </h4>
      </div>
      <div className="border-x border-black/[0.15] bg-white">
        <Image
          src={image}
          alt={title}
          width={imageW}
          height={imageH}
          className="h-auto w-full"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="flex-1 border-x border-black/[0.15] bg-[#FFF8F0] px-5 py-5 md:px-10 md:py-6">
        <p className="text-[15px] leading-7 tracking-[-0.5px]" style={{ color: BODY }}>
          {body}
        </p>
      </div>
      <div className="border border-t-0 border-black/[0.15] bg-[#FFF8F0] px-5 py-4 md:px-10 md:py-5">
        <LinkWrap
          {...linkProps}
          className="inline-block px-4 py-3 text-base font-medium uppercase tracking-[-0.5px] transition-colors hover:bg-[#F27202] hover:text-white md:px-5 md:py-4"
          style={{ color: LINK_ORANGE }}
        >
          {cta}
        </LinkWrap>
      </div>
    </div>
  )
}

function CommunityCard({
  title,
  description,
  bg,
  icon,
  className = '',
}: (typeof COMMUNITY)[number] & { className?: string }) {
  return (
    <div
      className={`relative min-h-[300px] overflow-hidden rounded-[10px] bg-contain bg-top bg-no-repeat md:min-h-[360px] ${className}`}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 rounded-[inherit] bg-[#181717]/50" />
      <div className="relative flex min-h-[300px] flex-col items-center justify-center gap-4 px-6 py-12 text-center text-white md:min-h-[360px]">
        {icon === 'book' ? <BookIcon /> : <FilmIcon />}
        <h3 className="font-heading text-xl font-semibold">{title}</h3>
        <p className="text-base">{description}</p>
      </div>
    </div>
  )
}

function TestimonialCard({
  label,
  body,
  variant,
  quoteTop,
  quoteBottom,
  className = '',
}: (typeof TESTIMONIALS)[number] & { className?: string }) {
  const isOrange = variant === 'orange-right'
  const isLeftShape = variant === 'green-left'
  const fill = isOrange ? ORANGE : '#1C756F'

  const outerRadius = isLeftShape ? 'rounded-[120px_0_120px_0]' : 'rounded-[0_120px_0_120px]'
  const innerRadius = isLeftShape ? 'rounded-[100px_0_100px_0]' : 'rounded-[0_100px_0_100px]'

  const quoteTopClass = isLeftShape
    ? 'left-0 top-[-10px] md:left-[-30px] md:top-[-15px]'
    : 'left-0 top-[-10px] md:left-[30px] md:top-[-15px]'
  const quoteBottomClass = isLeftShape
    ? 'bottom-[-10px] left-0 md:bottom-[-15px] md:left-[30px]'
    : 'bottom-[-10px] right-0 md:bottom-[-15px] md:right-[-30px]'

  return (
    <div className={`relative ${className}`}>
      <Image
        src={quoteTop}
        alt=""
        width={93}
        height={71}
        className={`pointer-events-none absolute z-20 h-auto w-[16%] min-w-[52px] max-w-[72px] ${quoteTopClass}`}
        aria-hidden
      />
      <Image
        src={quoteBottom}
        alt=""
        width={93}
        height={77}
        className={`pointer-events-none absolute z-20 h-auto w-[16%] min-w-[52px] max-w-[72px] ${quoteBottomClass}`}
        aria-hidden
      />

      <div className={`border border-[#854500] ${outerRadius} p-2.5 md:p-[15px] md:pb-0`}>
        <div
          className={`relative z-10 px-6 py-8 text-white md:px-10 md:py-10 ${innerRadius}`}
          style={{ backgroundColor: fill }}
        >
          <p className="text-center text-[30px] font-black leading-[35px]">{label}</p>
          <p className="mt-4 text-justify text-[17px] leading-[25px]">&ldquo;{body}&rdquo;</p>
        </div>
      </div>
    </div>
  )
}

export function Turns3Page() {
  return (
    <article className="font-sans">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#FFF5E2] px-4 py-[30px] md:px-6 md:py-20 md:pb-[100px]">
        <AnniversaryRibbon />
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 md:grid-cols-2 md:gap-14">
          <div className="relative md:pr-[70px]">
            <h1
              className="relative z-[1] pt-6 font-heading text-[42px] font-extrabold leading-[1.1] tracking-[-0.6px] md:-mt-10 md:pt-0 md:text-[50px]"
              style={{ color: HEADING }}
            >
              Three Years of Building Bitcoin in Africa
            </h1>
            <p className="mt-5 text-[15px] leading-7 tracking-[-0.5px] md:text-base" style={{ color: BODY }}>
              Three years ago, we dared to dream of a{' '}
              <span style={{ color: ORANGE }}>billion Africans holding their own keys.</span> Today, we celebrate three
              years of showing up—failing, fixing, building, and believing in Africa&apos;s Bitcoin future.
            </p>
            <Link
              href="/about-us/support-us/"
              className="mt-8 inline-block rounded-md border border-[#F45341] px-14 py-5 text-base font-semibold tracking-[-0.5px] text-[#FFF5E2] shadow-sm transition-colors hover:bg-brand-secondary"
              style={{ backgroundColor: ORANGE }}
            >
              Be a sponsor of our Mission
            </Link>
          </div>
          <div className="flex justify-center md:justify-end">
            <Image
              src={IMG.hero}
              alt="African Bitcoiners 3rd anniversary"
              width={1518}
              height={1422}
              className="h-auto w-full max-w-[600px]"
              sizes="(max-width: 768px) 90vw, 45vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-[#FFF9F3] px-4 py-10 md:px-[15px] md:py-[40px] md:pb-[100px]">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading as="h4">Partners Who Believed In Our Vision</SectionHeading>
          <SectionIntro>
            We haven&apos;t built this alone. These incredible brands took a chance on our small team, giving us the
            courage to build loud, bold, and local across Africa.
          </SectionIntro>
          <div className="mt-10 grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-6">
            {PARTNERS.map((p) => (
              <a
                key={p.alt}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-20 w-full items-center justify-center transition-opacity hover:opacity-80"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={p.w}
                  height={p.h}
                  className="h-auto max-h-16 w-auto max-w-[140px] object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="bg-[#FFE9CD] px-4 py-[30px] md:py-[50px]">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading>Initiatives</SectionHeading>
          <SectionIntro>
            Only Africans understand how to build for Bitcoin adoption in Africa here are our products and initiatives
            tailored to solve African challenges through Bitcoin.
          </SectionIntro>
          <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {INITIATIVES.map((item) => (
              <InitiativeCard key={item.title} {...item} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <PrimaryButton href="/about-us/support-us/">Please donate to our mission</PrimaryButton>
          </div>
        </div>
      </section>

      {/* Community Activities */}
      <section className="bg-[#FFF4E5] px-4 py-[30px] md:py-[50px]">
        <div className="mx-auto max-w-[1000px]">
          <SectionHeading>Community Activities</SectionHeading>
          <SectionIntro>
            We believe in hands-on community development so we are building an array of activities designed to educate
            and connect with our expanding Bitcoin Community.
          </SectionIntro>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-0">
            {COMMUNITY.map((item, index) => (
              <CommunityCard
                key={item.title}
                {...item}
                className={
                  index === 0 ? 'md:rounded-r-none' : index === 2 ? 'md:rounded-l-none' : 'md:rounded-none'
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="bg-[#FDECD4] px-4 py-[30px] pb-[100px] md:py-[50px] md:pb-[150px]"
        style={{ backgroundImage: `url(${IMG.testimonialsBg})` }}
      >
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading>Testimonials</SectionHeading>
          <SectionIntro>
            Community testimonials speak volumes about the impact we&apos;ve made in the African Bitcoin Space.
          </SectionIntro>
          <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-y-0">
            <div className="md:mr-[15px]">
              <TestimonialCard {...TESTIMONIALS[0]} />
            </div>
            <div className="md:ml-[15px] md:mt-[30px]">
              <TestimonialCard {...TESTIMONIALS[1]} />
            </div>
            <div className="md:mr-[15px]">
              <TestimonialCard {...TESTIMONIALS[2]} />
            </div>
            <div className="md:ml-[15px] md:mt-[30px]">
              <TestimonialCard {...TESTIMONIALS[3]} />
            </div>
          </div>
          <div className="mt-12 text-center">
            <PrimaryButton href="/about-us/support-us/">Be a sponsor of our Mission</PrimaryButton>
          </div>
        </div>
      </section>
    </article>
  )
}
