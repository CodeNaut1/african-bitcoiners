'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { JOIN_HREF, TEAM, type TeamBg } from '@/components/OurTeamPage/data'

const SECTION_BG = '#FCF4EC'
const TEXT = '#384958'
const BTN = '#EC6744'

const BG: Record<TeamBg, string> = {
  orange: '#EB5528',
  yellow: '#F3B650',
  red: '#D72D32',
}

const ROWS: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7],
]

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 64 64" fill="none" aria-hidden>
      <path d="M56.5 0H7.5C3.35786 0 0 3.35786 0 7.5V56.5C0 60.6421 3.35786 64 7.5 64H56.5C60.6421 64 64 60.6421 64 56.5V7.5C64 3.35786 60.6421 0 56.5 0Z" fill="black" />
      <path
        d="M44.4877 12.5H51.1038L36.6498 29.02L53.6537 51.5H40.3398L29.9118 37.866L17.9797 51.5H11.3598L26.8197 33.83L10.5078 12.5H24.1597L33.5857 24.962L44.4877 12.5ZM42.1658 47.54H45.8317L22.1677 16.252H18.2337L42.1658 47.54Z"
        fill="white"
      />
    </svg>
  )
}

function TeamCard({
  member,
  indexInRow,
}: {
  member: (typeof TEAM)[number]
  indexInRow: number
}) {
  const { name, role, image, imageW, imageH, bg, xUrl } = member
  const { imageScale, framePadTop, imageCorner, socialPadTop } = member as {
    imageScale?: '84' | '90'
    framePadTop?: boolean
    imageCorner?: boolean
    socialPadTop?: boolean
  }

  const widthClass =
    imageScale === '84'
      ? 'mx-auto block w-[84%]'
      : imageScale === '90'
        ? 'mx-auto block w-[80%] md:w-[90%]'
        : 'block w-full'

  return (
    <article className={indexInRow > 0 ? 'mt-[30px] md:mt-0' : ''}>
      <div
        className={`overflow-hidden rounded-tl-[20px] rounded-br-[20px] ${framePadTop ? 'pt-5' : ''} ${imageScale ? 'text-center' : ''}`}
        style={{ backgroundColor: BG[bg] }}
      >
        <Image
          src={image}
          alt={name}
          width={imageW}
          height={imageH}
          className={`h-auto ${widthClass} ${imageCorner ? 'rounded-br-[20px] rounded-bl-[10px]' : ''}`}
          sizes="(max-width: 768px) 70vw, 220px"
        />
      </div>
      <p className="mt-3 font-sans text-base font-bold leading-snug" style={{ color: TEXT }}>
        {name}
      </p>
      <p className="mt-1 font-sans text-base leading-[22px]" style={{ color: TEXT }}>
        {role}
      </p>
      <a
        href={xUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex transition-opacity hover:opacity-80 ${socialPadTop ? 'mt-[22px]' : 'mt-3'}`}
        aria-label={`${name} on X`}
      >
        <XIcon />
      </a>
    </article>
  )
}

export function OurTeamPage() {
  return (
    <section
      className="px-0 pb-[100px] pt-10 md:pb-[150px] md:pt-10 lg:pb-[200px] lg:pt-[60px]"
      style={{ backgroundColor: SECTION_BG }}
    >
      <div className="mx-auto max-w-[1200px]">
        <h1
          className="px-5 text-center font-heading text-[40px] tracking-[-2px] md:px-0 md:text-[50px]"
          style={{ color: TEXT }}
        >
          Meet The Team
        </h1>

        <div className="mx-auto max-w-[700px]">
          {ROWS.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid grid-cols-1 px-[25px] md:grid-cols-[28%_8%_28%_8%_28%] md:px-6 ${rowIndex === 0 ? 'pt-5' : 'pt-10'}`}
            >
              {row.map((memberIndex, colIndex) => (
                <React.Fragment key={TEAM[memberIndex].name}>
                  {colIndex > 0 && <div className="hidden md:block" aria-hidden />}
                  <TeamCard member={TEAM[memberIndex]} indexInRow={colIndex} />
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>

        <div className="pt-[50px] text-center">
          <Link
            href={JOIN_HREF}
            className="inline-block rounded-lg px-16 py-6 font-sans text-[17px] font-bold tracking-[-0.2px] text-white shadow-[2px_4px_8px_rgba(0,0,0,0.2)] transition-colors hover:bg-[#384958] md:px-[90px] md:py-[25px]"
            style={{ backgroundColor: BTN }}
          >
            Join Our Team
          </Link>
        </div>
      </div>
    </section>
  )
}
