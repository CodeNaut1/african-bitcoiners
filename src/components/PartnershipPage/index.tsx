import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { PartnersMarquee } from '@/components/PartnershipPage/PartnersMarquee'
import { PartnershipPricing } from '@/components/PartnershipPage/PartnershipPricing'
import { IMG, WHY_PARTNER } from '@/components/PartnershipPage/data'
import { PartnershipForm } from '@/components/forms/PartnershipForm'

const CREAM = '#FFFAF2'
const ORANGE = '#E1640C'
const TEXT = '#584538'
const HEADING = '#37312C'

function Scribble({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M58 12c-8 14-22 18-32 10-6-5-4-14 4-16 10-2 14 12 6 20-12 12-32 8-40-4"
        stroke="#8B5E3C"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="flex flex-col items-start">
      <div className="mb-5 flex h-16 w-16 items-center justify-center">
        <Image src={icon} alt="" width={64} height={64} className="h-16 w-16 object-contain" />
      </div>
      <h3 className="font-heading text-lg font-bold leading-snug sm:text-xl" style={{ color: HEADING }}>
        {title}
      </h3>
      <p className="mt-3 text-base leading-7 tracking-[-0.4px]" style={{ color: TEXT }}>
        {description}
      </p>
    </div>
  )
}

export function PartnershipPage() {
  return (
    <div className="overflow-x-hidden font-sans" style={{ backgroundColor: CREAM }}>
      <PartnersMarquee />

      {/* CTA card */}
      <section className="px-4 py-8 sm:px-6 md:py-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="overflow-hidden rounded-2xl border border-[#37312C]/15 bg-white shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative min-h-[240px] sm:min-h-[300px]">
                <Image
                  src={IMG.ctaPhoto}
                  alt="Bitcoin education partners collaborating"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-10" style={{ backgroundColor: ORANGE }}>
                <h2 className="font-heading text-2xl font-normal leading-tight text-white sm:text-3xl md:text-[34px] md:leading-[42px]">
                  Unlock the Power of Bitcoin Education:
                </h2>
                <p className="mt-1 font-heading text-2xl font-bold leading-tight text-white sm:text-3xl md:text-[34px] md:leading-[42px]">
                  Join Our Partnership Program
                </p>
                <p className="mt-5 max-w-lg text-base leading-7 text-white/95 sm:text-[17px] sm:leading-[30px]">
                  Are you a Bitcoin organization looking to empower your African audience with essential knowledge
                  about Bitcoin? Look no further! Our Education Partnership Program offers a seamless solution for
                  integrating comprehensive Bitcoin education tailored for Africans into your website.
                </p>
                <div className="mt-8">
                  <a
                    href="#partnership-form"
                    className="inline-flex rounded-lg px-8 py-3 text-[15px] font-bold tracking-[-0.6px] transition-opacity hover:opacity-90"
                    style={{ backgroundColor: CREAM, color: ORANGE }}
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="relative px-4 py-12 sm:px-6 md:py-16">
        <Scribble className="pointer-events-none absolute right-6 top-6 h-16 w-16 opacity-80 sm:right-12 sm:top-8 sm:h-20 sm:w-20" />
        <div className="mx-auto max-w-[1200px]">
          <h2
            className="text-center font-heading text-[28px] font-bold tracking-[-0.4px] sm:text-[35px]"
            style={{ color: HEADING }}
          >
            Why Partner With Us
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            {WHY_PARTNER.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <PartnershipPricing />

      {/* Get In Touch */}
      <section className="px-4 py-12 sm:px-6 md:py-16">
        <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src={IMG.getInTouchPhoto}
              alt="Partner support call"
              width={600}
              height={500}
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="relative">
            <Scribble className="pointer-events-none absolute -right-2 -top-4 h-14 w-14 opacity-80 sm:-top-6 sm:h-16 sm:w-16" />
            <h2
              className="font-heading text-3xl font-bold leading-tight sm:text-4xl md:text-[42px] md:leading-[50px]"
              style={{ color: HEADING }}
            >
              Get In Touch
            </h2>
            <p className="mt-5 text-base leading-7 tracking-[-0.4px] sm:text-[17px] sm:leading-[30px]" style={{ color: TEXT }}>
              Empower your audience with the knowledge they need to navigate the Bitcoin space. Join our
              Education Partnership Program today and be a catalyst for positive change in the Bitcoin
              ecosystem.
            </p>
            <div className="mt-8">
              <a
                href="#partnership-form"
                className="inline-flex rounded-lg px-10 py-3.5 text-[15px] font-bold tracking-[-0.6px] text-white transition-opacity hover:opacity-90 sm:px-12"
                style={{ backgroundColor: ORANGE }}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership form */}
      <section id="partnership-form" className="scroll-mt-20 px-4 py-12 sm:px-6 md:py-16">
        <div className="mx-auto max-w-[640px]">
          <div className="rounded-2xl border border-[#EAECF0] bg-white p-6 shadow-sm sm:p-8 md:p-10">
            <h2
              className="text-center font-heading text-xl font-bold uppercase tracking-wide sm:text-2xl"
              style={{ color: ORANGE }}
            >
              Get Started
            </h2>
            <p
              className="mx-auto mt-4 max-w-md text-center text-base leading-7 tracking-[-0.4px] sm:text-[17px] sm:leading-[30px]"
              style={{ color: TEXT }}
            >
              Join our Education Partnership Program today and be a catalyst for positive change in the
              Bitcoin ecosystem.
            </p>
            <div className="mt-8">
              <PartnershipForm variant="page" />
            </div>
          </div>
        </div>
      </section>

      {/* Feedback bounty */}
      <section className="px-4 pb-16 pt-4 sm:px-6 md:pb-24">
        <div className="mx-auto max-w-[700px] text-center">
          <h2
            className="font-heading text-2xl font-bold leading-tight sm:text-3xl md:text-4xl md:leading-[50px]"
            style={{ color: HEADING }}
          >
            Get 1,000 sats for your brilliant ideas!
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-base leading-7 tracking-[-0.5px] sm:text-[17px] sm:leading-[30px]"
            style={{ color: TEXT }}
          >
            Have a genius idea or spot something in our African Bitcoiners initiatives that could be even better?
            Submit your feedback to us and we&apos;re excited to reward you for them.
          </p>
          <div className="mt-8">
            <Link
              href="/earn-bitcoin/1000-sats-feedback-bounty/"
              className="inline-flex rounded-lg px-10 py-3.5 text-[15px] font-bold tracking-[-0.6px] text-white transition-opacity hover:opacity-90 sm:px-16"
              style={{ backgroundColor: ORANGE }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
