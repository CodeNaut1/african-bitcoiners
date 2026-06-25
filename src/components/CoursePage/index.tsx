import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BookOpen, ListChecks } from 'lucide-react'

import { cn } from '@/utilities/ui'
import { CourseModalBlockComponent } from '@/blocks/CourseModal/Component'

const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'
const IMG = {
  avatars: `${R2}/People-count-avatar.png`,
  eclipse: `${R2}/Eclipse-image.png`,
  hero: `${R2}/BFB-course-side-image.png`,
  whatToGet: `${R2}/What-to-get-image.png`,
  ipaybtc: `${R2}/iPayBTC_Logo_Blue-scaled.png`,
  citrusrate: `${R2}/Citrusrate.jpg`,
}

const COURSE_SIGNUP = {
  websiteUrl: 'https://course.bitcoiners.africa',
}

const FEATURES = [
  { icon: BookOpen, text: 'Short, easy lessons designed for beginners', tone: 'cream' as const },
  { icon: ListChecks, text: 'Quick quizzes to reinforce what you learn', tone: 'blue' as const },
  { icon: BookOpen, text: 'Short, easy lessons designed for beginners', tone: 'cream' as const },
  { icon: ListChecks, text: 'Quick quizzes to reinforce what you learn', tone: 'blue' as const },
]

export function CoursePage() {
  return (
    <div className="bg-white">
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="bg-brand-cream">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
            {/* Text */}
            <div className="relative">
              <h1 className="font-heading text-3xl font-bold leading-tight text-brand-secondary sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
                Start Your Bitcoin Journey, <span className="text-brand-primary">Free</span>{' '}
                Beginner&rsquo;s Course
              </h1>

              <p className="mt-5 text-base leading-relaxed text-brand-text-dark">
                <strong className="font-bold text-brand-secondary">
                  A Beginner-Friendly Way to Learn Bitcoin.
                </strong>{' '}
                This free course makes Bitcoin easy to understand through short, practical lessons
                designed for complete beginners.{' '}
                <strong className="font-bold text-brand-secondary">
                  You will learn: What Bitcoin is. How it works. Why it matters.
                </strong>{' '}
                How it can help you take control of money. Perfect for anyone who&rsquo;s curious but
                overwhelmed by tech jargon.
              </p>

              {/* Signup dropdown (left-aligned) */}
              <div className="mt-6 [&_#course-signup]:!items-start [&_#course-signup]:py-0">
                <CourseModalBlockComponent
                  triggerLabel="Start learning for free"
                  variant="primary-orange"
                  layout="inline"
                  websiteUrl={COURSE_SIGNUP.websiteUrl}
                />
              </div>

              {/* Social proof */}
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <Image
                    src={IMG.avatars}
                    alt="Course graduates"
                    width={120}
                    height={40}
                    className="h-9 w-auto"
                  />
                  <span className="text-sm font-semibold text-brand-secondary">Join 652 Graduates</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-brand-secondary">4.8 ⭐</span>
                  <span className="text-sm text-brand-text-mid">Average Course Rating</span>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-md">
                <Image
                  src={IMG.hero}
                  alt="Learn Bitcoin online"
                  width={720}
                  height={560}
                  className="h-auto w-full rounded-3xl"
                  priority
                />
                <Image
                  src={IMG.eclipse}
                  alt=""
                  width={140}
                  height={140}
                  aria-hidden
                  className="pointer-events-none absolute -bottom-5 -right-3 h-24 w-24 select-none md:h-28 md:w-28"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What You'll Get ────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
            {/* Image */}
            <div className="flex justify-center">
              <Image
                src={IMG.whatToGet}
                alt="What you will get from the course"
                width={620}
                height={620}
                className="h-auto w-full max-w-md rounded-[2rem] rounded-tl-[5rem]"
              />
            </div>

            {/* Cards */}
            <div>
              <h2 className="mb-8 font-heading text-2xl font-bold text-brand-secondary md:text-3xl">
                What You&rsquo;ll Get
              </h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {FEATURES.map((f, i) => {
                  const Icon = f.icon
                  return (
                    <div
                      key={i}
                      className={cn(
                        'rounded-2xl p-6',
                        f.tone === 'cream' ? 'bg-[#FDF3EC]' : 'bg-[#EAF4FA]',
                      )}
                    >
                      <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-primary shadow-sm">
                        <Icon size={20} />
                      </span>
                      <p className="text-sm leading-relaxed text-brand-text-dark">{f.text}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Partners ───────────────────────────────────── */}
      <section className="bg-brand-cream">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 md:py-16 lg:px-8">
          <h2 className="mb-8 font-heading text-2xl font-bold text-brand-secondary md:text-3xl">
            Our Partners
          </h2>
          <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-8 rounded-2xl bg-white px-8 py-6 shadow-card sm:gap-12">
            <Image
              src={IMG.ipaybtc}
              alt="iPayBTC"
              width={160}
              height={48}
              className="h-9 w-auto object-contain md:h-10"
            />
            <Image
              src={IMG.citrusrate}
              alt="Citrusrate"
              width={160}
              height={48}
              className="h-9 w-auto object-contain md:h-10"
            />
          </div>
        </div>
      </section>

      {/* ── Ready to Begin ─────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-brand-primary px-6 py-12 md:px-16 md:py-16">
            {/* decorative bubbles */}
            <div className="pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 md:block">
              <div className="flex items-end gap-3 opacity-90">
                <span className="h-16 w-16 rounded-full bg-[#FCBF7E]" />
                <span className="h-28 w-28 rounded-full bg-[#F7A23B]" />
                <span className="h-10 w-10 rounded-full bg-[#FCD9A8]" />
              </div>
            </div>

            <div className="relative max-w-xl">
              <h2 className="mb-3 font-heading text-2xl font-bold text-white md:text-3xl">
                Ready to Begin?
              </h2>
              <p className="mb-8 text-base leading-relaxed text-white/90">
                Whether you&rsquo;re here to understand Bitcoin, earn sats, or protect your financial
                future, this course is your gateway.
              </p>
              <div className="[&_#course-signup]:!items-start [&_#course-signup]:py-0">
                <CourseModalBlockComponent
                  triggerLabel="Start learning for free"
                  variant="white-solid"
                  layout="inline"
                  websiteUrl={COURSE_SIGNUP.websiteUrl}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Finished the course ────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-2xl px-4 pb-20 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 font-heading text-xl font-bold text-brand-secondary md:text-2xl">
            Finished the course?
          </h2>
          <p className="text-base leading-relaxed text-brand-text-mid">
            It&rsquo;s time to{' '}
            <Link
              href="/earn-bitcoin/places-to-earn-sats/"
              className="font-semibold text-brand-primary hover:underline"
            >
              put your knowledge into action
            </Link>{' '}
            by earning sats through real opportunities.
          </p>
        </div>
      </section>
    </div>
  )
}
