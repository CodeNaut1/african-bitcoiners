import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { SavingsChallengeForm } from '@/components/forms/SavingsChallengeForm'
import {
  IMG,
  LINKS,
  PARTICIPANT_COUNT,
  WHY_BITCOIN_CARDS,
} from '@/components/MillionSatChallengePage/data'
import { StackerPostCard } from '@/components/MillionSatChallengePage/StackerPostCard'
import { TestimonialCarousel } from '@/components/MillionSatChallengePage/TestimonialCarousel'

const HEADING = '#384958'
const TEXT = '#384958'
const ORANGE = '#E1640C'
const HERO_ORANGE = '#F7733C'

type StackerPost = {
  title: string
  slug?: string | null
  excerpt?: string | null
  rawHtml?: string | null
  publishedDate?: string | null
}

function SectionHeading({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h4
      className={`text-center font-heading text-xl font-bold uppercase tracking-[-1.5px] md:text-2xl md:leading-[45px] ${className}`}
      style={{ color: HEADING }}
    >
      {children}
    </h4>
  )
}

function FeatureCard({
  title,
  text,
  icon,
  alt,
}: {
  title: string
  text: string
  icon: string
  alt: string
}) {
  return (
    <div
      className="flex h-full flex-col rounded-lg border border-[#384958]/20 p-[18px_20px]"
      style={{ backgroundImage: 'linear-gradient(170deg, #FDFBF9 70%, #FFDF6F 250%)' }}
    >
      <h6 className="mb-3 font-heading text-sm font-extrabold leading-[25px] tracking-[-0.8px]" style={{ color: HEADING }}>
        {title}
      </h6>
      <p className="mb-4 flex-1 text-sm leading-relaxed" style={{ color: TEXT }}>
        {text}
      </p>
      <Image src={icon} alt={alt} width={54} height={54} className="mt-auto" />
    </div>
  )
}

export function MillionSatChallengePage({ stackerPosts }: { stackerPosts: StackerPost[] }) {
  return (
    <div className="font-body">
      {/* Hero */}
      <section
        className="bg-cover bg-center bg-no-repeat py-[60px] pb-20"
        style={{
          backgroundColor: HERO_ORANGE,
          backgroundImage: `url(${IMG.heroBanner})`,
        }}
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <h1 className="font-heading text-[36px] font-bold leading-[55px] tracking-[-2px] text-white md:text-[50px]">
              THE MILLION SAT SAVINGS CHALLENGE
            </h1>
            <p className="mt-4 text-[17px] leading-[30px] text-white">
              We aim to ensure that you don&apos;t miss out on the opportunity that Bitcoin savings can offer. Join us
              in this challenge as we strive to create a billion African millionaires!
            </p>
            <p className="mt-6 text-[22px] font-semibold tracking-[-0.6px] text-white">
              Join <span className="font-black">{PARTICIPANT_COUNT}</span> African Bitcoin Savers in this challenge
            </p>
          </div>
        </div>
      </section>

      {/* Billion Africans */}
      <section className="bg-[#FFFCFA] py-14 md:py-16">
        <div className="mx-auto max-w-[1000px] px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading>We want a BILLION Africans each holding the keys to a million sats</SectionHeading>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed md:text-[17px]" style={{ color: TEXT }}>
            No one has ever made a bad decision by saving Bitcoin over 5 years. To test this theory, try putting in a
            fixed monthly amount into our{' '}
            <Link href={LINKS.savingsCalculator} className="font-bold underline hover:opacity-80" style={{ color: ORANGE }}>
              5-year savings calculator
            </Link>
            , and see how much you could have saved compared to saving in fiat currency. Bitcoin is hard money which is
            why it protects your savings over the long term.
          </p>
        </div>
      </section>

      {/* Why Bitcoin */}
      <section className="bg-[#FDF5EF] py-14 md:py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <SectionHeading className="mb-10">WHY BITCOIN IS THE BEST SAVINGS CURRENCY</SectionHeading>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_BITCOIN_CARDS.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials + form */}
      <section className="bg-[#FFFCFA] py-14 md:py-16">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
          <TestimonialCarousel />

          <div className="mt-14 rounded-[10px] border border-[#603913]/20 bg-white px-6 py-10 md:px-20 md:pb-20 md:pt-[50px]">
            <h3
              className="mb-8 text-center font-heading text-[28px] font-black leading-[45px] tracking-[-0.8px] md:text-[35px]"
              style={{ color: HEADING }}
            >
              JOIN US TO START YOUR JOURNEY TO BECOMING A MILLIONAIRE
            </h3>
            <SavingsChallengeForm variant="million-sat-challenge" />
          </div>
        </div>
      </section>

      {/* Saturday Stacker posts */}
      {stackerPosts.length > 0 && (
        <section className="bg-[#FDF5EF] py-14 md:py-16">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <h4
              className="mb-10 text-center font-heading text-xl font-bold tracking-[-1.5px] md:text-2xl md:leading-[45px]"
              style={{ color: HEADING }}
            >
              Saturday Stacker Newsletter Updates
            </h4>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stackerPosts.map((post) => (
                <StackerPostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Feedback bounty CTA */}
      <section className="bg-[#FFFCF7] py-14 md:py-16">
        <div className="mx-auto max-w-[600px] px-4 text-center sm:px-6 lg:px-8">
          <h4
            className="font-heading text-xl font-bold tracking-[-0.8px] md:text-2xl md:leading-10"
            style={{ color: '#2D1300' }}
          >
            Get 1,000 sats for your brilliant ideas!
          </h4>
          <p className="mt-5 text-base leading-relaxed" style={{ color: '#2D1300' }}>
            Have a genius idea or spot something in our African Bitcoiners initiatives that could be even better? Submit
            your feedback to us and we&apos;re excited to reward you for them.
          </p>
          <Link
            href={LINKS.feedbackBounty}
            className="mt-8 inline-block rounded px-8 py-3 text-[15px] font-semibold text-white shadow-[2px_4px_8px_rgba(0,0,0,0.2)] transition-colors hover:bg-[#253343]"
            style={{ backgroundColor: ORANGE }}
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  )
}
