import Image from 'next/image'
import React from 'react'

import { JobApplicationSignUpForm } from '@/components/forms/JobApplicationSignUpForm'
import type { StaleJobPostingData } from '@/components/StaleJobPostingPage/types'

const PAGE_BG = '#FFFCFA'
const SECTION_GRAY = '#F3F3F3'
const HEADING = '#384958'
const TAG_BG = '#FFF8F0'

function MetaTag({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded px-3 py-2 text-sm font-medium tracking-[-0.2px]"
      style={{ backgroundColor: TAG_BG, color: HEADING }}
    >
      {icon}
      {label}
    </span>
  )
}

function RequirementList({ items }: { items: readonly string[] }) {
  return (
    <ul className="list-none space-y-3 p-0">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base leading-relaxed tracking-[-0.2px]" style={{ color: HEADING }}>
          <span className="mt-1 shrink-0 text-[#F27202]" aria-hidden>
            ⚡
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

type Props = {
  data: StaleJobPostingData
}

export function StaleJobPostingPage({ data }: Props) {
  const { heroImage, heroImageWidth, heroImageHeight, job, requirements, copy } = data

  return (
    <div className="font-body" style={{ backgroundColor: PAGE_BG }}>
      <section className="px-4 py-10 sm:px-6 md:py-14">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div className="flex justify-center md:justify-start">
            <Image
              src={heroImage}
              alt=""
              width={heroImageWidth}
              height={heroImageHeight}
              priority
              className="h-auto w-full max-w-[520px] object-contain"
            />
          </div>
          <div>
            <h1 className="font-heading text-[36px] font-bold leading-tight tracking-[-0.6px] md:text-[44px]" style={{ color: HEADING }}>
              {copy.heroTitle}
            </h1>
            <p className="mt-4 text-lg font-medium tracking-[-0.3px]" style={{ color: HEADING }}>
              {copy.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-[1100px] rounded-sm px-6 py-8 md:px-8 md:py-10" style={{ backgroundColor: SECTION_GRAY }}>
          <h2 className="font-heading text-[28px] font-bold tracking-[-0.5px] md:text-[32px]" style={{ color: HEADING }}>
            {job.title}
          </h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <MetaTag
              icon={
                <svg className="h-4 w-4" viewBox="0 0 512 512" fill="currentColor" aria-hidden>
                  <path d="M320 336c0 8.84-7.16 16-16 16h-96c-8.84 0-16-7.16-16-16v-48H0v144c0 25.6 22.4 48 48 48h416c26.4 0 48-22.4 48-48V288H320v48zm144-208h-80V80c0-25.6-22.4-48-48-48H176c-25.6 0-48 22.4-48 48v48H48c-26.4 0-48 22.4-48 48v80h512v-80c0-25.6-22.4-48-48-48zm-144 0H192V96h128v32z" />
                </svg>
              }
              label={job.type}
            />
            <MetaTag
              icon={
                <svg className="h-4 w-4" viewBox="0 0 448 512" fill="currentColor" aria-hidden>
                  <path d="M436 160H12c-6.627 0-12-5.373-12-12v-36c0-26.51 21.49-48 48-48h48V12c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v52h128V12c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v52h48c26.51 0 48 21.49 48 48v36c0 6.627-5.373 12-12 12zM12 192h424c6.627 0 12 5.373 12 12v260c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V204c0-6.627 5.373-12 12-12z" />
                </svg>
              }
              label={job.location}
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 md:py-12">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-heading text-2xl font-bold tracking-[-0.5px] md:text-[28px]" style={{ color: HEADING }}>
            REQUIREMENTS
          </h2>
          <div className="mt-6">
            <RequirementList items={requirements} />
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-base leading-relaxed tracking-[-0.2px] md:text-lg" style={{ color: HEADING }}>
            {copy.applyIntro}
          </p>
        </div>
      </section>

      <section id="apply" className="scroll-mt-24 px-4 py-10 sm:px-6 md:py-14">
        <div className="mx-auto max-w-[800px]">
          <div
            className="rounded-sm px-6 py-10 shadow-[0_0_15px_-2px_rgba(0,0,0,0.5)] md:px-14 md:py-14"
            style={{ backgroundColor: SECTION_GRAY }}
          >
            <h2 className="text-center font-heading text-2xl font-bold tracking-[-0.5px] md:text-[28px]" style={{ color: HEADING }}>
              {copy.applyHeading}
            </h2>
            <div className="mt-8">
              <JobApplicationSignUpForm role={job.roleSlug} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
