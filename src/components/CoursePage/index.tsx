import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { CourseModalBlockComponent } from '@/blocks/CourseModal/Component'
import {
  FeatureIconLessons,
  FeatureIconLessonsAlt,
  FeatureIconQuiz,
  FeatureIconQuizAlt,
} from './FeatureIcons'

const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'
const IMG = {
  avatars: `${R2}/People-count-avatar.png`,
  eclipse: `${R2}/Eclipse-image.png`,
  hero: `${R2}/BFB-course-side-image.png`,
  whatToGet: `${R2}/What-to-get-image.png`,
  ipaybtc: `${R2}/uploads/2025/04/iPayBTC_Logo_Blue-scaled.png`,
  citrusrate: `${R2}/uploads/2024/10/Citrusrate.jpg`,
  readyBg: `${R2}/uploads/2026/01/Ready-signup-scaled.png`,
}

const FEATURES = [
  { Icon: FeatureIconLessons, text: 'Short, easy lessons designed for beginners', bg: 'bg-[#FFF7EB]' },
  { Icon: FeatureIconQuiz, text: 'Quick quizzes to reinforce what you learn', bg: 'bg-[#F5F8F2]' },
  { Icon: FeatureIconLessonsAlt, text: 'Short, easy lessons designed for beginners', bg: 'bg-[#FEF3EC]' },
  { Icon: FeatureIconQuizAlt, text: 'Quick quizzes to reinforce what you learn', bg: 'bg-[#F5FBFF]' },
]

export function CoursePage() {
  return (
    <div className="overflow-x-hidden bg-white font-sans">
      {/* Hero */}
      <section className="overflow-x-hidden bg-brand-cream py-8 sm:py-10 md:py-20 md:pb-[50px]">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-8 px-4 sm:gap-10 sm:px-6 lg:px-8 md:grid-cols-[55%_45%] md:gap-6">
          {/* Image first on mobile, right on desktop */}
          <div className="relative order-1 w-full md:order-2 md:pl-[30px]">
            <div className="relative mx-auto w-full max-w-[360px] overflow-visible sm:max-w-[420px] md:max-w-none md:-mr-[50px] md:-mt-[45px] md:w-[90%]">
              <Image
                src={IMG.hero}
                alt="Learn Bitcoin online"
                width={1488}
                height={1608}
                className="relative z-0 mx-auto h-auto w-full rounded-2xl md:ml-auto md:mr-0"
                priority
                sizes="(max-width: 768px) 90vw, 45vw"
              />
              <Image
                src={IMG.eclipse}
                alt=""
                width={414}
                height={207}
                aria-hidden
                className="pointer-events-none absolute -bottom-4 -right-2 z-10 h-[72px] w-auto max-w-[45vw] select-none sm:-bottom-5 sm:-right-3 sm:h-[96px] md:-bottom-8 md:-right-6 md:h-[132px] md:max-w-none md:translate-x-[22%] md:translate-y-[15%] lg:h-[155px]"
              />
            </div>
          </div>

          {/* Text + CTA */}
          <div className="relative order-2 md:order-1 md:pr-[30px]">
            <h1 className="text-left font-heading text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.5px] text-brand-text-dark sm:text-[35px] sm:leading-[38px] md:text-[42px] md:leading-[50px]">
              Start Your Bitcoin Journey,
              <br />
              <span className="font-bold text-brand-primary">Free Beginner&rsquo;s Course</span>
            </h1>

            <p className="mt-4 text-left text-base leading-7 tracking-[-0.5px] text-brand-text-dark sm:text-[17px] sm:leading-[30px] md:mt-5 md:pr-[30px]">
              <strong className="font-bold text-brand-secondary">
                A Beginner-Friendly Way to Learn Bitcoin.
              </strong>{' '}
              This free course makes Bitcoin easy to understand through short, practical lessons
              designed for complete beginners.{' '}
              <strong className="font-bold text-brand-secondary">
                You will learn: What Bitcoin is. How it works. Why it matters. How it can help you
                take control of money.
              </strong>{' '}
              Perfect for anyone who&rsquo;s curious but overwhelmed by tech jargon.
            </p>

            <div className="mt-5 md:mt-6">
              <CourseModalBlockComponent
                triggerLabel="Start learning for free"
                variant="primary-orange"
                layout="inline"
                websiteUrl="https://course.bitcoiners.africa"
                fullWidth
              />
            </div>

            <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="relative">
                <div className="flex flex-wrap items-center gap-2">
                  <Image
                    src={IMG.avatars}
                    alt=""
                    width={144}
                    height={67}
                    className="h-[36px] w-auto shrink-0 sm:h-[42px]"
                  />
                  <p className="text-sm tracking-[-0.4px] text-brand-text-dark sm:text-base">
                    Join <strong className="font-black">652</strong> Graduates
                  </p>
                </div>
                <div aria-hidden className="mt-3 ml-4 h-10 w-20 overflow-hidden sm:ml-6 sm:h-14 sm:w-28 md:ml-8">
                  <div className="h-20 w-20 rounded-full bg-brand-primary sm:h-28 sm:w-28" />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 md:pt-1">
                <span className="text-base font-extrabold tracking-[-0.4px] text-brand-text-dark sm:text-lg">
                  4.8 ⭐️
                </span>
                <span className="text-sm tracking-[-0.4px] text-brand-text-mid sm:text-base">
                  Average Course Rating
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="bg-white py-10 md:py-[50px]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-left font-heading text-[28px] font-bold leading-tight tracking-[-0.5px] text-brand-secondary sm:text-[32px] sm:leading-[48px] md:hidden">
            What You&rsquo;ll Get
          </h2>
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[45%_55%] md:gap-10">
            <div className="flex justify-center">
              <Image
                src={IMG.whatToGet}
                alt="What you will get from the course"
                width={1346}
                height={1604}
                className="h-auto w-full max-w-[320px] object-contain sm:max-w-[380px] md:w-[85%] md:max-w-none"
                sizes="(max-width: 768px) 85vw, 40vw"
              />
            </div>
            <div className="md:pl-2 md:pr-[30px]">
              <h2 className="mb-6 hidden font-heading text-[38px] font-bold leading-[50px] tracking-[-0.5px] text-brand-secondary md:mb-8 md:block">
                What You&rsquo;ll Get
              </h2>
              <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-5">
                {FEATURES.map((f, i) => {
                  const Icon = f.Icon
                  return (
                    <div
                      key={i}
                      className={`flex flex-col items-center rounded-[6px] border border-black/[0.06] px-4 py-8 text-center sm:px-5 sm:py-10 ${f.bg}`}
                    >
                      <div className="mb-4 flex justify-center sm:mb-[18px]">
                        <Icon />
                      </div>
                      <p className="text-base leading-snug tracking-[-0.3px] text-brand-text-dark sm:text-lg sm:leading-[25px]">
                        {f.text}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Partners */}
      <section className="bg-white py-10 md:py-[50px]">
        <div className="mx-auto w-full max-w-[400px] px-4 sm:px-6">
          <h2 className="text-center font-heading text-[28px] font-bold leading-tight tracking-[-0.5px] text-brand-secondary sm:text-[32px] sm:leading-[48px] md:text-[38px] md:leading-[50px]">
            Our Partners
          </h2>
          <div className="mt-4 grid grid-cols-2 overflow-hidden rounded-sm border border-black/10 bg-white">
            <div className="flex items-center justify-center border-r border-black/10 px-3 py-6 sm:px-6 sm:py-8">
              <a
                href="https://ipaybtc.app/bitcoin-education"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={IMG.ipaybtc}
                  alt="iPayBTC"
                  width={2560}
                  height={695}
                  className="mx-auto h-8 w-auto max-w-[110px] object-contain sm:h-10 sm:max-w-[130px] md:h-11"
                />
              </a>
            </div>
            <div className="flex items-center justify-center px-3 py-6 sm:px-6 sm:py-8">
              <Image
                src={IMG.citrusrate}
                alt="Citrusrate"
                width={2470}
                height={800}
                className="mx-auto h-8 w-auto max-w-[110px] object-contain sm:h-10 sm:max-w-[130px] md:h-11"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Begin */}
      <section className="bg-white pb-10 pt-4 md:pb-[50px] md:pt-8">
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6">
          <div
            className="overflow-hidden rounded-[16px] bg-brand-primary bg-cover bg-center bg-no-repeat px-4 py-10 sm:rounded-[20px] sm:px-8 sm:py-12 md:px-[50px] md:py-20"
            style={{ backgroundImage: `url(${IMG.readyBg})` }}
          >
            <h2 className="font-heading text-xl font-bold text-white sm:text-2xl md:text-3xl">
              Ready to Begin?
            </h2>
            <p className="mt-3 max-w-xl text-left text-base leading-7 tracking-[-0.5px] text-white sm:text-[17px] sm:leading-[30px] md:max-w-[60%]">
              Whether you&rsquo;re here to understand Bitcoin, earn sats, or protect your financial
              future, this course is your gateway.
            </p>
            <div className="mt-6 w-full md:max-w-md">
              <CourseModalBlockComponent
                triggerLabel="Start learning for free"
                variant="white-solid"
                layout="inline"
                websiteUrl="https://course.bitcoiners.africa"
                fullWidth
              />
            </div>
          </div>
        </div>
      </section>

      {/* Finished */}
      <section className="bg-white py-10 sm:py-12 md:py-[60px] md:pb-[100px]">
        <div className="mx-auto max-w-[600px] px-4 text-center sm:px-6">
          <h4 className="font-heading text-lg font-bold tracking-[-0.8px] text-[#2D1300] sm:text-xl md:text-2xl md:leading-10">
            Finished the course?
          </h4>
          <p className="mt-3 text-sm leading-6 tracking-[-0.6px] text-[#2D1300] sm:text-base sm:leading-7 md:text-[17px]">
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
