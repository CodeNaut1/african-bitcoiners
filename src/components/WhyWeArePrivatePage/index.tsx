'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { BOUNTY, HERO_INTRO, IMG, SECTIONS } from '@/components/WhyWeArePrivatePage/data'
import { NewsletterSignupForm } from '@/components/forms/NewsletterSignupForm'

const HERO_BG_COLOR = '#FDF1E2'
const CONTENT_BG = '#FFF6E5'
const TEXT = '#5D422F'
const TEXT_MID = 'rgba(93,66,47,0.85)'
const ORANGE = '#EA6000'
const BOUNTY_HEADING = '#2D1300'
const BOUNTY_BTN = '#F45341'

function SectionIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden className="shrink-0">
      <path
        d="M9.99545 17.3361C7.42602 17.3361 5.32878 19.4334 5.32878 22.0028C5.32878 24.5722 7.42602 26.6695 9.99545 26.6695C12.3384 26.6695 14.287 24.925 14.6126 22.6695H17.3783C17.7039 24.925 19.6525 26.6695 21.9955 26.6695C24.5649 26.6695 26.6621 24.5722 26.6621 22.0028C26.6621 19.4334 24.5649 17.3361 21.9955 17.3361C19.6525 17.3361 17.7039 19.0806 17.3783 21.3361H14.6126C14.287 19.0806 12.3384 17.3361 9.99545 17.3361ZM9.99545 18.6695C11.8443 18.6695 13.3288 20.154 13.3288 22.0028C13.3288 23.8517 11.8443 25.3362 9.99545 25.3362C8.1466 25.3362 6.66211 23.8517 6.66211 22.0028C6.66211 20.154 8.1466 18.6695 9.99545 18.6695ZM21.9955 18.6695C23.8443 18.6695 25.3288 20.154 25.3288 22.0028C25.3288 23.8517 23.8443 25.3362 21.9955 25.3362C20.1466 25.3362 18.6621 23.8517 18.6621 22.0028C18.6621 20.154 20.1466 18.6695 21.9955 18.6695ZM10.3184 5.33614C8.98319 5.32051 7.73499 6.20808 7.37305 7.56791L5.48503 14.6695H3.32878C2.96059 14.6695 2.66211 14.968 2.66211 15.3361C2.66211 15.7043 2.96059 16.0028 3.32878 16.0028C11.7732 16.0028 20.2177 16.0028 28.6621 16.0028C29.0303 16.0028 29.3288 15.7043 29.3288 15.3361C29.3288 14.968 29.0303 14.6695 28.6621 14.6695H26.5059L24.6179 7.56791C24.1724 5.89428 22.3818 4.93781 20.7429 5.4976L16.2116 7.04447C16.0716 7.09228 15.9193 7.09228 15.7793 7.04447L11.2481 5.4976C10.9408 5.39264 10.6265 5.33975 10.3184 5.33614ZM10.2975 6.66427C10.4697 6.66724 10.6447 6.6987 10.8184 6.75802L15.3496 8.30489C15.7688 8.44806 16.2221 8.44806 16.6413 8.30489L21.1725 6.75802C22.0988 6.44166 23.077 6.96583 23.3288 7.91166L25.1283 14.6695H6.86263L8.66211 7.91166C8.86666 7.14317 9.55131 6.65138 10.2975 6.66427Z"
        fill={ORANGE}
      />
    </svg>
  )
}

function ContentSection({ title, body }: { title: string; body: string }) {
  return (
    <div className="mb-8 last:mb-0 md:mb-10">
      <div className="flex items-start gap-3">
        <SectionIcon />
        <h2
          className="font-heading text-[28px] font-black leading-[30px] tracking-[-0.6px] md:text-[35px]"
          style={{ color: TEXT }}
        >
          {title}
        </h2>
      </div>
      <p
        className="mt-4 text-justify font-sans text-[17px] leading-[30px] tracking-[-0.4px] md:text-lg md:tracking-[-0.5px]"
        style={{ color: TEXT_MID }}
      >
        {body}
      </p>
    </div>
  )
}

export function WhyWeArePrivatePage() {
  return (
    <article className="overflow-x-hidden font-sans">
      {/* Hero */}
      <section
        className="bg-cover bg-center bg-no-repeat px-4 py-8 max-md:bg-bottom max-md:bg-left md:px-6 md:py-[50px]"
        style={{ backgroundColor: HERO_BG_COLOR, backgroundImage: `url("${IMG.heroBg}")` }}
      >
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="max-md:text-center">
            <h1
              className="font-heading text-[45px] font-black leading-[55px] md:text-left md:text-[50px] md:leading-[70px]"
              style={{ color: TEXT }}
            >
              Why We Are <span style={{ color: ORANGE }}>Private</span>
            </h1>
            <p
              className="mt-4 text-left font-sans text-[17px] leading-[30px] tracking-[-0.5px] max-md:text-center md:text-lg"
              style={{ color: TEXT_MID }}
            >
              {HERO_INTRO}
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <Image
              src={IMG.heroIllustration}
              alt=""
              width={500}
              height={500}
              className="h-auto w-[50%] max-w-[360px] md:w-[60%]"
              sizes="(max-width: 768px) 50vw, 35vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* Content sections */}
      <section className="px-4 py-8 md:px-6 md:py-[50px]" style={{ backgroundColor: CONTENT_BG }}>
        <div className="mx-auto max-w-[850px] px-0 md:px-2">
          {SECTIONS.map((section) => (
            <ContentSection key={section.title} title={section.title} body={section.body} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-4 py-[50px] pb-[100px] md:px-[30px] md:pb-[150px] md:pt-[50px]" style={{ backgroundColor: HERO_BG_COLOR }}>
        <div className="mx-auto max-w-[950px]">
          <div className="border border-[#60391333] bg-white px-[30px] py-[30px] md:px-14 md:py-14">
            <h2
              className="text-center font-heading text-[26px] font-bold tracking-[-0.6px] md:text-[30px]"
              style={{ color: '#584538' }}
            >
              Get our weekly African Bitcoin updates
            </h2>
            <div className="mt-6 md:mt-8">
              <NewsletterSignupForm
                variant="page"
                submitLabel="Sign me up!"
                namePlaceholder="Your name (or Nym)"
                emailPlaceholder="Your email address"
                countryLabel="What African Country are you from?"
                countryPlaceholder="Select a Country/Continent"
                fullWidthButton
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bounty CTA */}
      <section className="px-4 pb-[100px] pt-[30px] md:px-6 md:pb-[100px] md:pt-[60px]" style={{ backgroundColor: CONTENT_BG }}>
        <div className="mx-auto max-w-[600px] pr-0 text-center md:pr-[30px]">
          <h2
            className="font-heading text-2xl font-bold leading-10 tracking-[-0.8px] md:text-[28px]"
            style={{ color: BOUNTY_HEADING }}
          >
            {BOUNTY.title}
          </h2>
          <p
            className="mx-auto mt-4 font-sans text-[17px] leading-7 tracking-[-0.6px] md:text-lg md:leading-[28px]"
            style={{ color: BOUNTY_HEADING }}
          >
            {BOUNTY.body}
          </p>
          <div className="mt-8">
            <Link
              href={BOUNTY.href}
              className="inline-flex rounded px-16 py-[15px] font-sans text-[17px] font-semibold tracking-[-0.2px] text-white shadow-[2px_4px_8px_rgba(0,0,0,0.2)] transition-colors hover:bg-[#253343] md:px-20 md:py-[18px]"
              style={{ backgroundColor: BOUNTY_BTN }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
