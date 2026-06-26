import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { GRADUATE_PROGRAM, IMG, LINKS } from '@/components/BitcoinerJobsPage/data'
import { JobSubmissionPageForm } from '@/components/forms/JobSubmissionPageForm'
import { JobsUpskillForm } from '@/components/forms/JobsUpskillForm'

const HERO_ORANGE = '#FF7F00'
const SECTION_CREAM = '#FCF4EC'
const BOUNTY_CREAM = '#FFF3EA'
const HEADING_DARK = '#384958'
const TAG_BG = '#FFF8F0'
const BTN_ORANGE = '#F27202'
const BOUNTY_BTN = '#F45341'
const BOUNTY_HEADING = '#2D1300'

export type JobListing = {
  id: string
  title: string
  company: string
  location?: string | null
  type?: string | null
  postedDate?: string | null
  slug?: string | null
}

function formatJobType(type?: string | null) {
  if (!type) return 'Full time'
  return type
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function formatDate(date?: string | null) {
  if (!date) return 'Always Open'
  try {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  } catch {
    return 'Always Open'
  }
}

function MetaTag({ icon, label }: { icon?: React.ReactNode; label: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded px-2 py-1 text-sm tracking-[-0.4px] text-[#384958]"
      style={{ backgroundColor: TAG_BG }}
    >
      {icon}
      {label}
    </span>
  )
}

function JobCard({
  logo,
  title,
  company,
  location,
  jobType,
  tag,
  status,
  href,
  buttonLabel,
}: {
  logo?: string
  title: string
  company: string
  location: string
  jobType: string
  tag?: string
  status: string
  href: string
  buttonLabel: string
}) {
  return (
    <article className="mt-[30px] border border-black/20 bg-white p-5">
      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_2fr_1fr]">
        <div className="flex justify-center md:justify-start">
          <Image src={logo || IMG.logo} alt="" width={120} height={120} className="h-[100px] w-[100px] object-contain" />
        </div>
        <div>
          <h5 className="font-heading text-[25px] font-bold tracking-[-0.4px]" style={{ color: HEADING_DARK }}>
            {title}
          </h5>
          <p className="-mt-2 pb-5 text-base" style={{ color: HEADING_DARK }}>
            {company}
          </p>
          <div className="flex flex-wrap gap-2">
            <MetaTag
              icon={<Image src={IMG.locationPin} alt="" width={24} height={24} className="h-5 w-5" />}
              label={location}
            />
            <MetaTag icon={<Image src={IMG.clock} alt="" width={21} height={20} className="h-5 w-5" />} label={jobType} />
            {tag && <MetaTag label={tag} />}
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 md:items-end">
          <p className="text-sm tracking-[-0.4px] text-[#384958] md:text-end">{status}</p>
          <Link
            href={href}
            className="inline-block rounded-[5px] border px-[30px] py-[18px] text-sm font-extrabold tracking-[-0.4px] transition-colors hover:bg-[#F27202] hover:text-white"
            style={{ borderColor: BTN_ORANGE, color: BTN_ORANGE }}
          >
            {buttonLabel}
          </Link>
        </div>
      </div>
    </article>
  )
}

type Props = {
  jobs: JobListing[]
}

export function BitcoinerJobsPage({ jobs }: Props) {
  return (
    <div className="overflow-x-hidden font-sans">
      {/* Hero — background image with text overlay */}
      <section
        className="bg-cover bg-bottom bg-no-repeat px-4 py-[60px] max-md:bg-left max-md:pb-[50px] md:pb-20"
        style={{ backgroundColor: HERO_ORANGE, backgroundImage: `url(${IMG.heroBg})` }}
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-xl">
            <h1 className="font-heading text-[37px] font-bold leading-[48px] text-white md:text-[50px] md:leading-[70px]">
              WORK WITH BITCOINERS IN AFRICA
            </h1>
            <p className="mt-4 pr-0 text-lg leading-7 tracking-[-0.4px] text-white md:pr-[50px] [&_a]:font-semibold [&_a]:underline [&_a]:hover:opacity-90">
              African Bitcoiner Jobs allows job seekers to find jobs from a wide range of available opportunities and{' '}
              <a href={LINKS.postJob}>allows employers to quickly and easily post job listings</a>, so you can start
              recruiting the perfect candidate.
            </p>
          </div>
        </div>
      </section>

      {/* Job listings */}
      <section id="jobs-list" className="px-4 py-[50px] sm:px-6" style={{ backgroundColor: SECTION_CREAM }}>
        <div className="mx-auto max-w-[1000px]">
          <JobCard
            logo={IMG.logo}
            title={GRADUATE_PROGRAM.title}
            company={GRADUATE_PROGRAM.company}
            location={GRADUATE_PROGRAM.location}
            jobType={GRADUATE_PROGRAM.type}
            tag={GRADUATE_PROGRAM.tag}
            status={GRADUATE_PROGRAM.status}
            href={GRADUATE_PROGRAM.href}
            buttonLabel={GRADUATE_PROGRAM.buttonLabel}
          />
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              company={job.company}
              location={job.location || 'Remote'}
              jobType={formatJobType(job.type)}
              status={formatDate(job.postedDate)}
              href={job.slug ? `/earn-bitcoin/bitcoiner-jobs/${job.slug}` : '#'}
              buttonLabel="MORE INFO"
            />
          ))}
        </div>
      </section>

      {/* Post a job form */}
      <section id="post-job" className="scroll-mt-20 px-4 py-[30px] sm:px-6" style={{ backgroundColor: SECTION_CREAM }}>
        <div className="mx-auto max-w-[800px]">
          <div className="rounded-[5px] border border-[#60391333] bg-white px-6 py-[50px] sm:px-12 md:px-20 md:pb-20">
            <h3 className="text-center font-heading text-xl font-bold leading-8 tracking-[-0.6px] text-[#E1640C] md:text-2xl">
              Looking for talent to join your Bitcoin startup? -Then post your Bitcoiner Job here for FREE!
            </h3>
            <div className="mt-8">
              <JobSubmissionPageForm />
            </div>
          </div>
        </div>
      </section>

      {/* Upskill / course signup */}
      <section className="px-4 pb-[100px] pt-[30px] sm:px-6" style={{ backgroundColor: SECTION_CREAM }}>
        <div className="mx-auto max-w-[800px]">
          <div className="rounded-[5px] border border-[#60391333] bg-white px-6 py-[50px] shadow-[0px_0px_15px_-2px_rgba(0,0,0,0.5)] sm:px-12 md:px-20 md:pb-20">
            <h3 className="text-center font-heading text-xl font-bold leading-8 tracking-[-0.6px] text-[#253343] md:text-2xl">
              Want to upskill yourself so you stand a better chance of landing one of these jobs? Sign up for our FREE
              learning journey today!
            </h3>
            <div className="mt-8">
              <JobsUpskillForm />
            </div>
          </div>
        </div>
      </section>

      {/* Feedback bounty CTA */}
      <section className="px-4 py-[60px] pb-[100px] sm:px-6 max-md:py-[30px]" style={{ backgroundColor: BOUNTY_CREAM }}>
        <div className="mx-auto max-w-[600px] text-center">
          <h4 className="font-heading text-2xl font-bold tracking-[-0.8px] max-md:leading-10" style={{ color: BOUNTY_HEADING }}>
            Get 1,000 sats for your brilliant ideas!
          </h4>
          <p className="mt-4 text-lg leading-7 tracking-[-0.5px]" style={{ color: BOUNTY_HEADING }}>
            Have a genius idea or spot something in our African Bitcoiners initiatives that could be even better? Submit
            your feedback to us and we&apos;re excited to reward you for them.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href={LINKS.bounty}
              className="inline-block rounded px-20 py-[15px] text-[17px] font-semibold tracking-[-0.2px] text-white shadow-[2px_4px_8px_rgba(0,0,0,0.2)] transition-colors hover:bg-[#253343] max-md:px-20 max-md:py-[18px]"
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
