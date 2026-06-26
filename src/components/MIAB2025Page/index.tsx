import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { IMG, LINKS, PEOPLE, type MIABPerson } from '@/components/MIAB2025Page/data'
import { MIAB2025Ticker } from '@/components/MIAB2025Page/MIAB2025Ticker'

const HERO_CREAM = '#FFFBF7'
const LIST_CREAM = '#FFFBF6'
const HERO_ORANGE = '#CC5E00'
const BODY_TEXT = '#364152'
const NAME_COLOR = '#202939'
const RANK_ORANGE = '#F2780F'

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 64 64" fill="none" aria-hidden>
      <g clipPath="url(#miab-li)">
        <path
          d="M60.4444 0H3.55556C1.59188 0 0 1.59188 0 3.55556V60.4444C0 62.4081 1.59188 64 3.55556 64H60.4444C62.4081 64 64 62.4081 64 60.4444V3.55556C64 1.59188 62.4081 0 60.4444 0Z"
          fill="#117EB8"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.678 24.754H20.2318V52.2758H11.678V24.754ZM15.9562 11.0732C18.6914 11.0732 20.9136 13.2954 20.9136 16.0305C20.9136 18.7683 18.6914 20.9914 15.9562 20.9914C15.2971 21.0039 14.6421 20.8848 14.0295 20.6412C13.4169 20.3976 12.859 20.0343 12.3885 19.5726C11.9179 19.1108 11.5441 18.5599 11.2889 17.952C11.0338 17.3442 10.9023 16.6915 10.9023 16.0323C10.9023 15.373 11.0338 14.7204 11.2889 14.1125C11.5441 13.5046 11.9179 12.9537 12.3885 12.492C12.859 12.0302 13.4169 11.6669 14.0295 11.4233C14.6421 11.1797 15.2971 11.0607 15.9562 11.0732ZM25.5971 24.7532H33.8016V28.514H33.9154C35.0576 26.3505 37.8478 24.0696 42.0087 24.0696C50.67 24.0696 52.27 29.77 52.27 37.1807V52.2758H43.7216V38.8918C43.7216 35.7007 43.6629 31.5949 39.2771 31.5949C34.8265 31.5949 34.1429 35.0714 34.1429 38.6616V52.2758H25.5962V24.754L25.5971 24.7532Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="miab-li">
          <rect width="64" height="64" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 64 64" fill="none" aria-hidden>
      <g clipPath="url(#miab-x)">
        <path
          d="M56.5 0H7.5C3.35786 0 0 3.35786 0 7.5V56.5C0 60.6421 3.35786 64 7.5 64H56.5C60.6421 64 64 60.6421 64 56.5V7.5C64 3.35786 60.6421 0 56.5 0Z"
          fill="black"
        />
        <path
          d="M44.4877 12.5H51.1038L36.6498 29.02L53.6537 51.5H40.3398L29.9118 37.866L17.9797 51.5H11.3598L26.8197 33.83L10.5078 12.5H24.1597L33.5857 24.962L44.4877 12.5ZM42.1658 47.54H45.8317L22.1677 16.252H18.2337L42.1658 47.54Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="miab-x">
          <rect width="64" height="64" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

function RankBadge({ rank }: { rank: number }) {
  return (
    <div
      className="mb-8 inline-block rounded-[10px] px-6 py-2 text-[28px] font-bold leading-none text-white shadow-[4px_4px_0_0_#000] md:mb-10 md:text-[35px]"
      style={{ backgroundColor: RANK_ORANGE }}
    >
      #{rank}
    </div>
  )
}

function PersonContent({ person }: { person: MIABPerson }) {
  return (
    <div className="flex flex-1 flex-col justify-center px-0 py-2 md:px-2">
      <div className="hidden md:block">
        <RankBadge rank={person.rank} />
      </div>

      <h4
        className="mb-4 font-heading text-[22px] font-extrabold leading-tight tracking-[-0.8px] md:text-[28px]"
        style={{ color: NAME_COLOR }}
      >
        {person.name}{' '}
        <span title={person.country} className="inline-block text-[0.9em]">
          {person.flag}
        </span>
      </h4>

      <div
        className="space-y-4 text-[17px] font-normal leading-[26px] tracking-[-0.5px] [&_a]:font-semibold [&_a]:text-[#CB5F00] [&_a]:underline-offset-2 hover:[&_a]:underline [&_strong]:font-bold"
        style={{ color: BODY_TEXT }}
      >
        {person.paragraphs.map((html, i) => (
          <p key={i} dangerouslySetInnerHTML={{ __html: html }} />
        ))}
      </div>

      {person.socials.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-5">
          {person.socials.map((social) => (
            <a
              key={social.url}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.platform}
              className="transition-transform hover:scale-110"
            >
              {social.platform === 'LinkedIn' ? <LinkedInIcon /> : <XIcon />}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

function overlayJustify(align: MIABPerson['overlayAlign']) {
  if (align === 'end') return 'justify-end'
  if (align === 'start') return 'justify-start'
  return 'justify-center'
}

function PersonPhoto({ person }: { person: MIABPerson }) {
  return (
    <div
      className="relative h-full min-h-[380px] w-full flex-1 overflow-hidden rounded-[20px] md:min-h-0 md:rounded-[28px]"
      style={{
        backgroundColor: person.photoBg,
        backgroundImage: person.photo ? `url("${person.photo}")` : undefined,
        backgroundPosition: person.photoPosition,
        backgroundSize: person.photoSize,
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute left-3 top-3 z-10 md:hidden">
        <RankBadge rank={person.rank} />
      </div>

      {/* Decorative figure — pinned to bottom of frame like WP (align-items: flex-end) */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end ${overlayJustify(person.overlayAlign)}`}
      >
        <Image
          src={person.photoOverlay}
          alt=""
          width={person.overlayWidthPx}
          height={person.overlayHeightPx}
          sizes="(max-width: 768px) 80vw, 40vw"
          className="block h-auto max-w-none"
          style={{ width: person.overlayWidth }}
        />
      </div>
    </div>
  )
}

function PersonRow({ person }: { person: MIABPerson }) {
  const photoFirst = person.photoOnLeft
  const mobileReverse = !photoFirst

  return (
    <article
      className="mt-[50px] rounded-[18px] p-[30px_10px] shadow-[-4px_-4px_4px_0_#FFF4E1] first:mt-0 md:p-[40px_50px]"
      style={{ backgroundColor: person.contentBg }}
    >
      <div
        className={`flex flex-col gap-5 md:flex-row md:items-stretch md:gap-5 ${
          mobileReverse ? 'flex-col-reverse' : ''
        }`}
      >
        {photoFirst ? (
          <>
            <div className="flex flex-1 md:min-h-[480px]">
              <PersonPhoto person={person} />
            </div>
            <PersonContent person={person} />
          </>
        ) : (
          <>
            <PersonContent person={person} />
            <div className="flex flex-1 md:min-h-[480px]">
              <PersonPhoto person={person} />
            </div>
          </>
        )}
      </div>
    </article>
  )
}

export function MIAB2025Page() {
  return (
    <div className="overflow-x-hidden font-sans">
      {/* Hero */}
      <section
        className="bg-cover bg-center bg-no-repeat px-4 py-[50px] pb-10 sm:px-6"
        style={{ backgroundColor: HERO_CREAM, backgroundImage: `url("${IMG.heroBg}")` }}
      >
        <div className="mx-auto max-w-[700px] text-center">
          <div className="mb-6 flex justify-center md:hidden">
            <Image
              src={IMG.heroMobile}
              alt="Most Impactful African Bitcoiners"
              width={322}
              height={67}
              className="h-auto w-full max-w-[322px]"
              priority
            />
          </div>

          <h1
            className="font-heading text-[32px] font-bold uppercase leading-[1.35] tracking-[-1px] md:text-[45px] md:leading-[65px]"
            style={{ color: HERO_ORANGE }}
          >
            The Most Impactful
            <br />
            African Bitcoiners of 2025
          </h1>

          <p
            className="mx-auto mt-5 max-w-[600px] text-[17px] leading-7 tracking-[-0.4px]"
            style={{ color: BODY_TEXT }}
          >
            Celebrating the Africans driving Bitcoin&apos;s promise of freedom and financial empowerment — the
            leaders, educators, and innovators shaping the continent&apos;s future.
          </p>

          <div className="mt-8">
            <p className="text-[10px] font-medium uppercase tracking-[-0.3px] text-[#4F4945] md:text-xs">
              Sponsored by:
            </p>
            <div className="mt-3 flex justify-center">
              <Link href={LINKS.trezor} target="_blank" rel="noopener noreferrer">
                <Image
                  src={IMG.trezorLogo}
                  alt="Trezor Academy Logo"
                  width={235}
                  height={45}
                  className="h-auto w-[180px] md:w-[235px]"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Nominees list */}
      <section className="px-4 py-10 sm:px-6 md:py-14" style={{ backgroundColor: LIST_CREAM }}>
        <div className="mx-auto max-w-[1200px]">
          {PEOPLE.map((person) => (
            <PersonRow key={person.rank} person={person} />
          ))}
        </div>
      </section>

      {/* Year ticker */}
      <section className="px-4 py-10 pb-16 sm:px-6" style={{ backgroundColor: LIST_CREAM }}>
        <MIAB2025Ticker />
      </section>
    </div>
  )
}
