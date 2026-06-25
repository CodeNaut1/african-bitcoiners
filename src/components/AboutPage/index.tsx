'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'

import { cn } from '@/utilities/ui'
import { ABButton } from '@/components/ui/ab-button'

const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'
const IMG = {
  hero: `${R2}/African-Bitcoiners_About-Us-Page-hero-image.png`,
  visionIcon: `${R2}/Our-Vision-Icon.png`,
  visionImage: `${R2}/African-Bitcoiners_Our-Vision-Image.png`,
  goalIcon: `${R2}/Our-Crazy-Goal-Icon.png`,
  goalImage: `${R2}/African-Bitcoiners_Our-Crazy-Goal-Image.png`,
  teamImage: `${R2}/African_Bitcoiners_Generic_Partnership_page_image1-920x1024.png`,
}

const VALUES = [
  {
    title: 'Accountability',
    body: 'We are dependable. We make sure our tasks and objectives are delivered on time every time and at the highest quality. We communicate about roadblocks well in advance. African Bitcoiners will bring Freedom to Africa through Bitcoin.',
    color: 'bg-[#FCE7A6]',
    rotate: '-rotate-2',
  },
  {
    title: 'Truth Seeking',
    body: 'We are open minded and evidence-based. We strive to be objective and facts focussed and constantly challenge group think and the “status quo” in pursuit of the underlying truth. We make decisions from hard data wherever possible and are mindful of our cognitive biases.',
    color: 'bg-[#BFE3F2]',
    rotate: 'rotate-1',
  },
  {
    title: 'Kindness',
    body: 'We are trustworthy, humble, fun to work with and sincerely want the utmost success for each other and our community. We always treat each other and our community with kindness and respect.',
    color: 'bg-[#F8C6D5]',
    rotate: '-rotate-1',
  },
  {
    title: 'Growth Mindset',
    body: 'We believe that with hard work and relentless curiousity we can achieve anything. We are always reading, testing, learning and improving. We move forward with urgency making fast decisions and continuously learning from our many failures.',
    color: 'bg-[#D9C7F1]',
    rotate: 'rotate-2',
  },
  {
    title: 'Privacy',
    body: 'We are leaders of a peaceful revolution. This comes with risks particularly when the inevitable state backlash comes against Bitcoin. To protect themselves and their loved ones, many of our team prefer to remain pseudonymous and so we always operate with their privacy front of mind.',
    color: 'bg-[#F8C6D5]',
    rotate: '-rotate-1',
  },
]

function SectionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="mt-6 inline-flex items-center gap-2 border-l-2 border-brand-primary pl-3 text-sm font-semibold uppercase tracking-wide text-brand-primary transition-colors hover:text-brand-secondary"
    >
      {children}
      <ArrowRight size={16} className="shrink-0" />
    </Link>
  )
}

function CommunityForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl rounded-2xl bg-white p-6 shadow-elevated md:p-8">
      <h3 className="mb-5 text-center font-heading text-xl font-semibold text-brand-secondary md:text-2xl">
        Signup for Updates
      </h3>
      {status === 'success' ? (
        <p className="py-6 text-center text-base font-semibold text-brand-secondary">
          Thanks for signing up! Check your inbox.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          <div>
            <label className="mb-1 block text-sm font-medium text-brand-secondary">
              Name<span className="text-brand-primary">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (or Nym)"
              className="w-full rounded-lg border border-brand-border-light bg-white px-4 py-3 text-brand-secondary outline-none transition-colors placeholder:text-brand-text-mid/60 focus:border-brand-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-brand-secondary">
              Email<span className="text-brand-primary">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full rounded-lg border border-brand-border-light bg-white px-4 py-3 text-brand-secondary outline-none transition-colors placeholder:text-brand-text-mid/60 focus:border-brand-primary"
            />
          </div>
          <ABButton
            type="submit"
            variant="primary"
            disabled={status === 'loading'}
            className="mt-2 w-full"
          >
            {status === 'loading' ? 'Submitting…' : 'Sign me up!'}
          </ABButton>
          {status === 'error' && (
            <p className="text-center text-sm text-red-600">Something went wrong. Please try again.</p>
          )}
        </form>
      )}
    </div>
  )
}

export function AboutPage() {
  return (
    <div className="bg-[#FDF4EC]">
      {/* ABOUT US hero */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <h1 className="mb-5 font-heading text-3xl font-bold text-brand-secondary md:text-4xl">
              ABOUT US
            </h1>
            <p className="text-base leading-relaxed text-brand-text-dark md:text-lg">
              We are a Bitcoin community helping to onboard new African users and guide them safely
              on their Bitcoin journey from earning sats to self custody. We try and pay our bills
              through sponsorships and by building out Bitcoin services which add value to our
              community members. Most notably, we offer a free Bitcoin for Beginners course and our
              services include{' '}
              <a href="https://freerouting.africa/" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-primary hover:underline">
                Africa Free Routing
              </a>
              ,{' '}
              <a href="https://bitcoinertest.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-primary hover:underline">
                The Bitcoiner Test
              </a>{' '}
              and{' '}
              <a href="https://sats2data.africa/" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-primary hover:underline">
                Sats2Data
              </a>
              .
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src={IMG.hero}
              alt="African Bitcoiners community"
              width={794}
              height={694}
              className="h-auto w-full max-w-md rounded-2xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Why are we doing this? */}
      <section className="px-4 pb-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 font-heading text-2xl font-bold text-brand-secondary md:text-3xl">
            Why are we doing this?
          </h2>
          <p className="text-base leading-relaxed text-brand-text-dark md:text-lg">
            Because money is central to everyone’s ability to achieve their full potential. Bitcoin
            is the world’s only free and fair money and we believe that if Africa adopts it first,
            we have our one and only chance to unlock our enormous potential and undo the inequality
            in the world.
          </p>
        </div>
      </section>

      {/* Our Vision */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <Image src={IMG.visionIcon} alt="" width={64} height={64} className="mb-4 h-14 w-14 object-contain" />
            <h2 className="mb-4 font-heading text-2xl font-bold text-brand-secondary md:text-3xl">
              Our Vision
            </h2>
            <p className="text-base leading-relaxed text-brand-text-dark md:text-lg">
              Freedom in Africa. An Africa where every person has an equal opportunity to reach their
              full potential.
            </p>
            <SectionLink href="/learn-bitcoin">Start Your Journey</SectionLink>
          </div>
          <div className="flex justify-center">
            <Image
              src={IMG.visionImage}
              alt="Freedom in Africa"
              width={684}
              height={615}
              className="h-auto w-full max-w-md rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Our Crazy Goal (reversed) */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div className="order-2 flex justify-center md:order-1">
            <Image
              src={IMG.goalImage}
              alt="Celebrating together"
              width={684}
              height={615}
              className="h-auto w-full max-w-md rounded-2xl"
            />
          </div>
          <div className="order-1 md:order-2">
            <Image src={IMG.goalIcon} alt="" width={64} height={64} className="mb-4 h-14 w-14 object-contain" />
            <h2 className="mb-4 font-heading text-2xl font-bold text-brand-secondary md:text-3xl">
              Our Crazy Goal
            </h2>
            <p className="text-base leading-relaxed text-brand-text-dark md:text-lg">
              1 Billion Africans each holding the private keys to at least 1 million sats. We know we
              will likely never reach this goal, but the closer we get, the more we change the world!
            </p>
            <SectionLink href="/learn-bitcoin">Start Your Journey</SectionLink>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <h2 className="mb-4 font-heading text-2xl font-bold text-brand-secondary md:text-3xl">
              Our Team
            </h2>
            <p className="text-base leading-relaxed text-brand-text-dark md:text-lg">
              Meet the individuals shaping Bitcoin in Africa at African Bitcoiners. Our dedicated
              team is committed to propelling Bitcoin education and adoption in Africa, driving
              innovation and growth.
            </p>
            <SectionLink href="/about-us/our-team/">Meet the team</SectionLink>
          </div>
          <div className="flex justify-center">
            <Image
              src={IMG.teamImage}
              alt="The African Bitcoiners team"
              width={920}
              height={1024}
              className="h-auto w-full max-w-sm rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Our Values + Community signup (orange) */}
      <section className="bg-brand-primary px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-3 font-heading text-2xl font-bold text-white md:text-3xl">Our Values</h2>
            <p className="text-base leading-relaxed text-white/90">
              African Bitcoiners will bring Freedom to Africa through Bitcoin and we will do it by
              living these 5 values.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className={cn(
                  'relative w-full max-w-xs rounded-md p-6 text-brand-secondary shadow-lg transition-transform sm:w-[300px]',
                  v.color,
                  v.rotate,
                  'hover:rotate-0',
                )}
              >
                <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-brand-secondary/70 shadow" />
                <h3 className="mb-2 font-heading text-lg font-bold">{v.title}</h3>
                <p className="text-sm leading-relaxed text-brand-secondary/80">{v.body}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-2xl text-center">
            <h2 className="mb-8 font-heading text-2xl font-bold text-white md:text-3xl">
              Please Join Our Community To Become Part of This Vision
            </h2>
            <CommunityForm />
          </div>
        </div>
      </section>

      {/* Get 1,000 sats CTA (peach) */}
      <section className="bg-[#FCEEE8] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 font-heading text-2xl font-bold text-brand-secondary md:text-3xl">
            Get 1,000 sats for your brilliant ideas!
          </h2>
          <p className="mb-8 text-base leading-relaxed text-brand-text-mid md:text-lg">
            Have a genius idea or spot something in our African Bitcoiners initiatives that could be
            even better? Submit your feedback to us and we’re excited to reward you for them.
          </p>
          <ABButton asChild variant="primary">
            <Link href="/earn-bitcoin/1000-sats-feedback-bounty/">Get Started</Link>
          </ABButton>
        </div>
      </section>
    </div>
  )
}
