import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { IMG, LINKS, PLACES } from '@/components/PlacesToEarnSatsPage/data'
import { GraduateProgramPageForm } from '@/components/forms/GraduateProgramPageForm'
import { PageCommentForm } from '@/components/forms/PageCommentForm'
import { PlacesEarnSubmissionForm } from '@/components/forms/PlacesEarnSubmissionForm'

const HERO_ORANGE = '#FF7F00'
const GRID_CREAM = '#FFF0DD'
const FORM_CREAM = '#FFF7EA'
const HEADING_DARK = '#384958'
const BTN_ORANGE = '#F27202'
const BOUNTY_CREAM = '#FFF7EA'
const BOUNTY_HEADING = '#2D1300'
const BOUNTY_BTN = '#F45341'

function PlaceCard({
  title,
  description,
  image,
  href,
  external,
}: {
  title: string
  description: string
  image: string
  href: string
  external: boolean
}) {
  const button = (
    <span className="inline-block rounded-none border px-[30px] py-[18px] text-sm font-bold tracking-[-0.4px] transition-colors hover:bg-[#F27202] hover:text-white max-md:px-[30px] max-md:py-5 max-md:text-base"
      style={{ borderColor: BTN_ORANGE, color: BTN_ORANGE }}
    >
      LEARN MORE
    </span>
  )

  return (
    <article className="flex h-full flex-col border border-black/20 bg-white p-[30px] text-center">
      <div className="mx-auto mb-5 flex justify-center">
        <Image src={image} alt="" width={128} height={128} className="h-32 w-32 object-contain" />
      </div>
      <h5 className="mb-5 font-heading text-[22px] font-bold tracking-[-0.4px] max-md:text-base" style={{ color: HEADING_DARK }}>
        {title}
      </h5>
      <p className="mb-5 flex-1 text-base font-medium leading-[25px] tracking-[-0.2px] max-md:text-base" style={{ color: HEADING_DARK }}>
        {description}
      </p>
      <div className="pt-5">
        {external ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {button}
          </a>
        ) : (
          <Link href={href}>{button}</Link>
        )}
      </div>
    </article>
  )
}

export function PlacesToEarnSatsPage() {
  return (
    <div className="overflow-x-hidden font-sans">
      {/* Hero — background image with text overlay */}
      <section
        className="bg-cover bg-bottom bg-no-repeat px-4 py-[60px] max-md:bg-left max-md:pb-[50px] md:pb-[70px]"
        style={{ backgroundColor: HERO_ORANGE, backgroundImage: `url(${IMG.heroBg})` }}
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-xl">
            <h1 className="font-heading text-[37px] font-bold leading-[48px] text-white md:text-[50px] md:leading-[70px]">
              EARN BITCOIN FROM HOME
            </h1>
            <p className="mt-4 text-lg leading-7 tracking-[-0.4px] text-white [&_a]:font-semibold [&_a]:underline [&_a]:hover:opacity-90">
              The best way to get sats into your hands is to earn them. It&apos;s not yet easy to get a{' '}
              <Link href={LINKS.bitcoinerJobs}>full-time job that pays in Bitcoin</Link>, but there are lots of ways
              you can earn a few sats on the side while sitting at home, often on your phone.{' '}
              <strong>Below is a list of places where you can easily earn Bitcoin.</strong> Also, if you would like to
              list places <Link href={LINKS.submitPlace}>CLICK HERE</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Service grid */}
      <section className="px-4 py-[50px] sm:px-6" style={{ backgroundColor: GRID_CREAM }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PLACES.map((place) => (
              <PlaceCard key={place.title} {...place} />
            ))}
          </div>
        </div>
      </section>

      {/* Looking for more ways CTA */}
      <section className="px-4 pb-[30px] pt-5 sm:px-6" style={{ backgroundColor: GRID_CREAM }}>
        <div className="mx-auto max-w-[800px] text-center">
          <h4 className="font-heading text-2xl font-bold tracking-[-0.8px] leading-10" style={{ color: BOUNTY_HEADING }}>
            Looking for more ways to earn in Bitcoin?
          </h4>
          <div className="mt-5 flex justify-center">
            <Link
              href={LINKS.learnBitcoin}
              className="inline-block rounded-none border border-[#D0D5DD] bg-white px-[65px] py-[15px] text-[17px] font-semibold tracking-[-0.5px] text-[#344054] transition-colors hover:text-[#EC6744] max-md:px-16"
            >
              Start Your Journey Here
            </Link>
          </div>
          <p className="mt-5 text-center text-[17px] leading-7 tracking-[-0.4px] text-[#2D1300] [&_a]:hover:opacity-80">
            Now, check out our <Link href={LINKS.earnBitcoin}>Earn Bitcoin</Link> section to explore various options. You
            can also discover <Link href={LINKS.bitcoinerJobs}>jobs that pay in Bitcoin</Link> and turn your skills into
            sats!
          </p>
        </div>
      </section>

      {/* Submit a place form */}
      <section
        id="list_of_places_to_earn_sats"
        className="scroll-mt-20 px-4 pb-[100px] pt-[30px] sm:px-6"
        style={{ backgroundColor: FORM_CREAM }}
      >
        <div className="mx-auto max-w-[800px]">
          <div className="rounded-[5px] border border-[#38495833] bg-white px-5 py-[50px] sm:px-12 md:px-20 md:pb-20">
            <h3 className="text-center font-heading text-xl font-bold leading-8 tracking-[-0.6px] text-brand-text-dark md:text-2xl">
              Have an idea where Bitcoiners can earn sats? Let us know below.
            </h3>
            <div className="mt-8">
              <PlacesEarnSubmissionForm />
            </div>
          </div>
        </div>
      </section>

      {/* Feedback bounty CTA */}
      <section className="px-4 py-[60px] sm:px-6 max-md:py-[30px]" style={{ backgroundColor: BOUNTY_CREAM }}>
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
              href={LINKS.feedbackBounty}
              className="inline-block rounded px-20 py-[15px] text-[17px] font-semibold tracking-[-0.2px] text-white shadow-[2px_4px_8px_rgba(0,0,0,0.2)] transition-colors hover:bg-[#253343] max-md:px-20 max-md:py-[18px]"
              style={{ backgroundColor: BOUNTY_BTN }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Graduate program application */}
      <section className="px-4 pb-[100px] pt-[60px] sm:px-6 max-md:py-[30px]" style={{ backgroundColor: GRID_CREAM }}>
        <div className="mx-auto max-w-[900px]">
          <div className="rounded-[30px] border border-[#38495833] border-groove bg-white p-[30px] shadow-sm sm:mx-[50px] sm:p-[30px]">
            <h3 className="mb-6 text-center font-heading text-xl font-bold text-brand-text-dark md:text-2xl">
              Apply to the African Bitcoiners Graduate Program
            </h3>
            <GraduateProgramPageForm />
          </div>
        </div>
      </section>

      {/* Comments */}
      <section className="bg-white px-4 pb-16 pt-8 sm:px-6">
        <div className="mx-auto max-w-[800px]">
          <h3 className="mb-2 font-heading text-2xl font-bold text-brand-text-dark">Leave a Reply</h3>
          <PageCommentForm />
        </div>
      </section>
    </div>
  )
}
