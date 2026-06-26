'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { COUNTRIES, HERO_HTML, IMG, VALUES } from '@/components/AboutPage/data'

const ORANGE_HEADING = '#CB5F00'
const TEXT_DARK = '#332A1ECC'
const TEXT_MID = '#332A1ED9'
const BOUNTY_TEXT = '#2D1300'

function OutlineButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="mt-5 inline-flex items-center gap-3 rounded-[5px] border border-[#F27202] bg-transparent px-[45px] py-[25px] text-[17px] tracking-[-0.5px] text-[#F27202] transition-colors hover:bg-[#F27202] hover:text-white md:px-[50px] md:text-lg"
    >
      <svg className="h-4 w-4 shrink-0" viewBox="0 0 448 512" fill="currentColor" aria-hidden>
        <path d="M313.941 216H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h301.941v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.569 0-33.941l-86.059-86.059c-15.119-15.119-40.971-4.411-40.971 16.971V216z" />
      </svg>
      {children}
    </Link>
  )
}

function FeatureBlock({
  icon,
  title,
  body,
  href,
  buttonLabel,
  image,
  imageWidth,
  imageHeight,
  imageAlt,
  imagePosition = 'right',
}: {
  icon: string
  title: string
  body: string
  href: string
  buttonLabel: string
  image: string
  imageWidth: number
  imageHeight: number
  imageAlt: string
  imagePosition?: 'left' | 'right'
}) {
  const textCol = (
    <div>
      <Image src={icon} alt="" width={97} height={97} className="mb-4 h-[97px] w-[97px] object-contain" />
      <h3
        className="font-heading text-[32px] font-medium leading-[50px] tracking-[-0.6px] md:text-[40px]"
        style={{ color: ORANGE_HEADING }}
      >
        {title}
      </h3>
      <p className="mt-2 text-[17px] leading-7 tracking-[-0.6px] md:text-[19px] md:leading-[30px]" style={{ color: TEXT_DARK }}>
        {body}
      </p>
      <OutlineButton href={href}>{buttonLabel}</OutlineButton>
    </div>
  )

  const imageCol = (
    <div className={`flex justify-center ${imagePosition === 'right' ? 'md:justify-end' : 'md:justify-start'}`}>
      <Image
        src={image}
        alt={imageAlt}
        width={imageWidth}
        height={imageHeight}
        className="h-auto w-full max-w-[684px] rounded-2xl"
        sizes="(max-width: 768px) 90vw, 45vw"
      />
    </div>
  )

  if (imagePosition === 'left') {
    return (
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div className="order-1">{imageCol}</div>
        <div className="order-2">{textCol}</div>
      </div>
    )
  }

  return (
    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
      <div className="order-2 md:order-1">{textCol}</div>
      <div className="order-1 md:order-2">{imageCol}</div>
    </div>
  )
}

function DecorativeVectors() {
  return (
    <div className="relative hidden h-[120px] md:grid md:grid-cols-2 md:gap-14">
      <div className="relative">
        <Image
          src={IMG.vectorEye}
          alt=""
          width={203}
          height={283}
          className="pointer-events-none absolute -top-16 left-0 opacity-40"
          aria-hidden
        />
      </div>
      <div className="relative">
        <Image
          src={IMG.vectorTarget}
          alt=""
          width={368}
          height={314}
          className="pointer-events-none absolute -top-20 right-0 opacity-40"
          aria-hidden
        />
      </div>
    </div>
  )
}

function ValueCard({
  title,
  body,
  bg,
  className,
  titlePad,
}: {
  title: string
  body: string
  bg: string
  className?: string
  titlePad: string
}) {
  return (
    <div
      className={`relative min-h-[280px] bg-contain bg-center bg-no-repeat px-8 py-10 md:min-h-[320px] md:px-10 md:py-10 ${className ?? ''}`}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <h5 className={`font-heading text-lg font-semibold tracking-[-0.5px] text-white ${titlePad}`}>{title}</h5>
      <p className="mt-1 text-[13px] leading-5 tracking-[-0.5px] text-white md:text-base md:leading-[25px]">{body}</p>
    </div>
  )
}

function CommunityForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !country) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, country }),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const fieldClass =
    'w-full rounded-none border border-[#60391333] bg-[#F9F7F0]/70 px-4 py-3 text-[#384958] outline-none focus:border-[#F27202]'

  return (
    <div
      className="mx-auto w-full max-w-3xl border border-black/50 px-6 py-10 md:px-[170px] md:pb-2.5 md:pt-10"
      style={{ backgroundColor: '#FFE4CB' }}
    >
      <h3 className="mb-6 text-center font-heading text-2xl text-[#332A1E] md:text-[28px]">Signup for Updates</h3>
      {status === 'success' ? (
        <p className="py-6 text-center text-base font-semibold text-[#332A1E]">
          Thanks for signing up! Check your inbox.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          <div>
            <label className="mb-1 block text-sm font-medium text-[#332A1E]">
              Name<span className="text-brand-primary">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (or Nym)"
              className={fieldClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[#332A1E]">
              Email<span className="text-brand-primary">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className={fieldClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[#332A1E]">
              What African Country are you from?<span className="text-brand-primary">*</span>
            </label>
            <select
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={`${fieldClass} appearance-none`}
            >
              <option value="">Select a Country/Continent</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="mt-2 w-full rounded-none bg-[#F27202] px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-[#253343] disabled:opacity-60"
          >
            {status === 'loading' ? 'Submitting…' : 'Sign me up!'}
          </button>
          {status === 'error' && (
            <p className="text-center text-sm text-red-700">Something went wrong. Please try again.</p>
          )}
        </form>
      )}
    </div>
  )
}

export function AboutPage() {
  return (
    <article>
      {/* Hero */}
      <section
        className="bg-gradient-to-b from-[#FFF3E3] to-[#FFFFFE] px-4 py-[30px] md:py-[50px]"
      >
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
          <div className="order-2 md:order-1">
            <h1
              className="font-heading text-[36px] font-medium leading-[50px] tracking-[-0.6px] md:text-[42px]"
              style={{ color: ORANGE_HEADING }}
            >
              ABOUT US
            </h1>
            <div
              className="mt-4 text-[17px] font-medium leading-7 tracking-[-0.6px] md:text-[19px] md:leading-[30px] [&_a]:font-semibold [&_a]:text-[#F27202] [&_a]:underline hover:[&_a]:text-[#CB5F00]"
              style={{ color: TEXT_DARK }}
              dangerouslySetInnerHTML={{ __html: HERO_HTML }}
            />
          </div>
          <div className="order-1 flex justify-center md:order-2 md:justify-end">
            <Image
              src={IMG.hero}
              alt="African Bitcoiners community"
              width={794}
              height={694}
              className="h-auto w-full max-w-[794px] rounded-2xl"
              sizes="(max-width: 768px) 90vw, 45vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* Why + Vision + Goal + Team */}
      <section className="bg-[#FFF3E3] px-4 py-5 md:px-6 md:py-[30px] md:pb-[60px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2
              className="font-heading text-[32px] font-medium leading-[50px] tracking-[-0.6px] md:text-[40px]"
              style={{ color: ORANGE_HEADING }}
            >
              Why are we doing this?
            </h2>
            <p className="mt-3 text-[17px] leading-7 tracking-[-0.6px] md:text-[19px] md:leading-7" style={{ color: TEXT_MID }}>
              Because money is central to everyone&apos;s ability to achieve their full potential. Bitcoin is the
              world&apos;s only free and fair money and we believe that if Africa adopts it first, we have our one and
              only chance to unlock our enormous potential and undo the inequality in the world.
            </p>
          </div>

          <div className="space-y-12 md:space-y-16">
            <FeatureBlock
              icon={IMG.visionIcon}
              title="Our Vision"
              body="Freedom in Africa. An Africa where every person has an equal opportunity to reach their full potential."
              href="/learn-bitcoin"
              buttonLabel="Start Your Journey"
              image={IMG.visionImage}
              imageWidth={684}
              imageHeight={615}
              imageAlt="Freedom in Africa"
            />

            <DecorativeVectors />

            <FeatureBlock
              icon={IMG.goalIcon}
              title="Our Crazy Goal"
              body="1 Billion Africans each holding the private keys to at least 1 million sats. We know we will likely never reach this goal, but the closer we get, the more we change the world!"
              href="/learn-bitcoin"
              buttonLabel="Start Your Journey"
              image={IMG.goalImage}
              imageWidth={684}
              imageHeight={615}
              imageAlt="Celebrating together"
              imagePosition="left"
            />

            <FeatureBlock
              icon={IMG.teamIcon}
              title="Our Team"
              body="Meet the individuals shaping Bitcoin in Africa at African Bitcoiners. Our dedicated team is committed to propelling Bitcoin education and adoption in Africa, driving innovation and growth."
              href="/about-us/our-team/"
              buttonLabel="Meet the team"
              image={IMG.teamImage}
              imageWidth={920}
              imageHeight={1024}
              imageAlt="The African Bitcoiners team"
            />
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-gradient-to-b from-[#FFBF6F] to-white px-4 py-5 md:px-6 md:py-[30px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2
              className="font-heading text-[32px] font-medium tracking-[-0.6px] md:text-[40px]"
              style={{ color: ORANGE_HEADING }}
            >
              Our Values
            </h2>
            <p className="mt-3 text-base leading-relaxed" style={{ color: TEXT_DARK }}>
              African Bitcoiners will bring Freedom to Africa through Bitcoin and we will do it by living these 5
              values.
            </p>
          </div>

          <div className="hidden md:block">
            <div className="grid grid-cols-4">
              <div />
              <ValueCard {...VALUES[0]} />
              <ValueCard {...VALUES[1]} />
              <div />
            </div>
            <div className="grid grid-cols-3">
              {VALUES.slice(2).map((v) => (
                <ValueCard key={v.title} {...v} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6 md:hidden">
            {VALUES.map((v) => (
              <ValueCard key={v.title} {...v} className="" titlePad="pt-[70px]" />
            ))}
          </div>
        </div>
      </section>

      {/* Community signup */}
      <section className="bg-[#FF8C3F] px-4 py-5 md:px-6 md:py-[50px]">
        <div className="mx-auto max-w-[1000px]">
          <h2 className="mb-8 text-center font-heading text-[28px] tracking-[-0.6px] text-white md:text-[36px]">
            Please Join Our Community To Become Part of This Vision
          </h2>
          <CommunityForm />
        </div>
      </section>

      {/* Bounty CTA */}
      <section className="bg-[#FFF3EA] px-4 py-[30px] md:px-6 md:py-[100px]">
        <div className="mx-auto max-w-[600px] text-center">
          <h2
            className="font-heading text-[28px] font-bold leading-10 tracking-[-0.8px] md:text-[32px]"
            style={{ color: BOUNTY_TEXT }}
          >
            Get 1,000 sats for your brilliant ideas!
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-[17px] leading-7 tracking-[-0.6px] md:text-lg md:leading-7"
            style={{ color: BOUNTY_TEXT }}
          >
            Have a genius idea or spot something in our African Bitcoiners initiatives that could be even better?
            Submit your feedback to us and we&apos;re excited to reward you for them.
          </p>
          <Link
            href="/earn-bitcoin/1000-sats-feedback-bounty/"
            className="mt-8 inline-block rounded px-20 py-[15px] text-[17px] font-semibold tracking-[-0.2px] text-white shadow-[2px_4px_8px_rgba(0,0,0,0.2)] transition-colors hover:bg-[#253343]"
            style={{ backgroundColor: '#F45341' }}
          >
            Get Started
          </Link>
        </div>
      </section>
    </article>
  )
}
