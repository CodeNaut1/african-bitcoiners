import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { AdvantageIcon } from '@/components/MiningPage/AdvantageIcons'
import { MiningDirectoryForm } from '@/components/forms/MiningDirectoryForm'
import {
  ADVANTAGES,
  COPY,
  COUNTRY_GROUPS,
  IMG,
  LINKS,
  type MiningOrg,
} from '@/components/MiningPage/data'

const DIRECTORY_CREAM = '#FBFAF7'
const WHY_CREAM = '#FFF9F0'
const TEXT_MID = '#384958'
const ORANGE = '#FD5A47'

function ReportButton({ className = '' }: { className?: string }) {
  return (
    <a
      href={LINKS.reportPdf}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block rounded-md bg-brand-primary px-5 py-[15px] text-[13px] font-semibold tracking-[-0.4px] text-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-colors hover:bg-[#553700] md:text-sm ${className}`}
    >
      {COPY.reportCta}
    </a>
  )
}

function LinkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12.7076 18.3644L11.2933 19.7786C9.34072 21.7313 6.1749 21.7313 4.22228 19.7786C2.26966 17.826 2.26966 14.6602 4.22228 12.7076L5.63649 11.2933M18.3644 12.7076L19.7786 11.2933C21.7312 9.34072 21.7312 6.1749 19.7786 4.22228C17.826 2.26966 14.6602 2.26966 12.7076 4.22228L11.2933 5.63649M8.50045 15.5004L15.5005 8.50043"
        stroke="#384958"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" aria-hidden>
      <path
        d="M 9 9.878 C 9 10.360, 9.700 11.336, 10.555 12.045 C 13.913 14.832, 14.116 16.709, 11.408 19.928 C 8.353 23.557, 9.625 24.093, 12.934 20.570 L 15.217 18.140 17.404 20.683 C 18.607 22.081, 20.366 23.062, 21.313 22.863 C 22.828 22.543, 22.719 22.058, 20.399 18.808 L 17.763 15.116 19.896 12.405 C 22.583 8.989, 21.757 7.941, 18.665 10.845 L 16.338 13.031 14.514 11.016 C 12.684 8.994, 9 8.233, 9 9.878"
        fill="#212121"
        fillRule="evenodd"
      />
    </svg>
  )
}

function OrgCard({ org }: { org: MiningOrg }) {
  return (
    <article className="flex h-full flex-col border border-[#384958]/20 bg-[#FBFAF7] px-[30px] pb-[30px] pt-[50px]">
      <div className="flex items-center gap-4">
        <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-2">
          <Image
            src={org.logo}
            alt={`${org.name} logo`}
            width={80}
            height={80}
            className="h-[80%] w-[80%] rounded-full object-contain"
          />
        </div>
        <h4
          className="flex-1 font-heading text-[17px] font-semibold leading-tight tracking-[-0.5px] md:text-base"
          style={{ color: TEXT_MID }}
        >
          {org.name}
        </h4>
      </div>
      <p
        className="mt-5 text-base leading-[25px] tracking-[-0.4px]"
        style={{ color: TEXT_MID }}
      >
        {org.description}
      </p>
      <div className="mt-auto flex items-center gap-3 pt-6">
        {org.website && (
          <a
            href={org.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex transition-opacity hover:opacity-70"
            aria-label={`${org.name} website`}
          >
            <LinkIcon />
          </a>
        )}
        {org.twitter && (
          <a
            href={org.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex transition-opacity hover:opacity-70"
            aria-label={`${org.name} on X`}
          >
            <XIcon />
          </a>
        )}
      </div>
    </article>
  )
}

export function MiningPage() {
  return (
    <div className="overflow-x-hidden font-sans">
      {/* Hero — background image + gradient overlay */}
      <section
        className="relative bg-cover bg-center px-4 py-16 md:px-6 md:py-20 md:pb-[60px] md:pt-[80px]"
        style={{ backgroundImage: `url("${IMG.heroBg}")` }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            backgroundImage: 'linear-gradient(260deg, rgba(201,14,14,0) 0%, #000000 65%)',
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1200px]">
          <div className="max-w-[600px] text-start">
            <h1 className="font-heading text-[45px] font-normal leading-tight tracking-[-0.4px] text-white md:text-[50px]">
              {COPY.heroTitle}{' '}
              <span className="text-brand-primary">{COPY.heroTitleAccent}</span>
            </h1>
            <p
              id="mining-link"
              className="mt-5 text-base leading-[25px] tracking-[-0.4px] text-white"
            >
              {COPY.heroBody}{' '}
              <Link href={LINKS.form} className="text-brand-primary underline hover:text-white">
                {COPY.heroListLink}
              </Link>
            </p>
            <div className="mt-6">
              <ReportButton />
            </div>
          </div>
        </div>
      </section>

      {/* Directory */}
      <section className="px-4 py-10 sm:px-6 md:py-[50px]" style={{ backgroundColor: DIRECTORY_CREAM }}>
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-center font-heading text-2xl font-bold tracking-[-0.4px] text-black md:text-[28px] md:leading-10">
            {COPY.directoryTitle}
          </h2>
          <p
            className="mx-auto mt-4 max-w-3xl text-center text-base leading-[25px] tracking-[-0.4px]"
            style={{ color: TEXT_MID }}
          >
            {COPY.directoryIntro}
          </p>

          <div className="mt-10 space-y-10">
            {COUNTRY_GROUPS.map((group) => (
              <div key={group.country}>
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <h3 className="font-heading text-[22px] font-bold tracking-[-0.8px] text-brand-primary md:text-[30px]">
                    {group.country}
                  </h3>
                  {group.flag && (
                    <span className="text-2xl leading-none md:text-3xl" aria-hidden>
                      {group.flag}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {group.orgs.map((org) => (
                    <OrgCard key={org.name} org={org} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Africa */}
      <section className="px-4 py-8 sm:px-6 md:py-[30px]" style={{ backgroundColor: WHY_CREAM }}>
        <div className="mx-auto max-w-[1200px]">
          <h2
            className="text-center font-heading text-2xl font-bold tracking-[-0.4px] md:text-[28px]"
            style={{ color: TEXT_MID }}
          >
            {COPY.whyTitle}
          </h2>

          <div className="mt-5 md:mt-[30px]">
            <Image
              src={IMG.landscape}
              alt="African landscape at sunset"
              width={1628}
              height={484}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {ADVANTAGES.map((item, index) => (
              <div key={item.title} className="flex flex-col gap-3">
                <AdvantageIcon index={index} />
                <p className="text-base leading-[25px] tracking-[-0.4px]" style={{ color: TEXT_MID }}>
                  <span className="font-medium text-brand-primary">{item.title} – </span>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <ReportButton />
          </div>
        </div>
      </section>

      {/* Investing */}
      <section className="px-4 py-8 sm:px-6 md:py-[30px] md:pb-[50px]" style={{ backgroundColor: DIRECTORY_CREAM }}>
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <h2
              className="font-heading text-2xl font-bold leading-10 tracking-[-0.4px] md:text-[28px]"
              style={{ color: TEXT_MID }}
            >
              {COPY.investingTitle}
            </h2>
            <p
              id="mining-link"
              className="mt-5 text-base leading-[25px] tracking-[-0.4px]"
              style={{ color: TEXT_MID }}
            >
              {COPY.investingBody}{' '}
              <em>
                <strong>{COPY.investingHighlight}</strong>
              </em>{' '}
              <Link href={LINKS.form} className="text-brand-primary underline hover:text-brand-secondary">
                {COPY.investingListLink}
              </Link>
            </p>
            <div className="mt-6">
              <ReportButton />
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <Image
              src={IMG.miningRig}
              alt="Bitcoin mining rig illustration"
              width={977}
              height={630}
              className="h-auto w-full max-w-[620px] object-contain lg:max-w-[720px] lg:w-[105%]"
            />
          </div>
        </div>
      </section>

      {/* Form */}
      <section
        id="form"
        className="px-4 py-10 pb-[100px] sm:px-6 md:px-[10px] md:py-[60px] md:pb-[100px]"
        style={{ backgroundColor: DIRECTORY_CREAM }}
      >
        <div className="mx-auto max-w-[700px]">
          <h2 className="text-center font-heading text-2xl font-extrabold capitalize leading-8 tracking-[-0.6px] text-brand-primary md:text-[28px]">
            {COPY.formTitle}
          </h2>
          <div className="mt-8 rounded-sm border border-[#603913]/20 bg-white px-5 py-10 md:px-[55px] md:py-[55px]">
            <MiningDirectoryForm variant="page" />
          </div>
        </div>
      </section>
    </div>
  )
}
