import Link from 'next/link'
import React from 'react'

import { CourseModalBlockComponent } from '@/blocks/CourseModal/Component'
import { HERO_BG, TABLE_ROWS, type LanguageLink } from '@/components/AfricanLanguagePage/data'

const TEXT = '#384958'

function LanguageLinks({ languages }: { languages: LanguageLink[] }) {
  return (
    <span className="leading-[25px]">
      {languages.map((lang, i) => (
        <React.Fragment key={`${lang.label}-${i}`}>
          {i > 0 && ', '}
          <a
            href={lang.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#384958] underline-offset-2 hover:text-[#EC6744] hover:underline"
          >
            {lang.label}
          </a>
        </React.Fragment>
      ))}
    </span>
  )
}

export function AfricanLanguagePage() {
  return (
    <div className="overflow-x-hidden bg-white font-sans">
      <section
        className="relative bg-[#F67837] bg-cover bg-center bg-no-repeat px-4 py-8 sm:px-6 md:py-[50px] max-md:bg-[position:bottom_left]"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      >
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8">
          <div>
            <h1 className="font-heading text-[45px] font-extrabold uppercase leading-tight tracking-[-1.5px] text-white md:text-[50px]">
              African Language Resources
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 tracking-[-0.2px] text-white md:pr-12 md:text-lg md:leading-[28px]">
              Diverse Bitcoin resources in your language. Here is a collection of essential Bitcoin resources
              tailored to various languages. Discover guides, tutorials, and more, designed to empower you with
              basic Bitcoin knowledge in your preferred language.
            </p>
          </div>
          <div className="hidden min-h-[260px] md:block" aria-hidden />
        </div>
      </section>

      <section className="bg-white px-4 py-10 sm:px-6 md:py-[50px]">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-4 text-center text-base tracking-[-0.2px] text-[#384958] md:hidden">
            Scroll left to view all stats.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-[#384958]/20">
            <table className="min-w-[900px] w-full border-collapse bg-[#FFFAF4] text-left text-base leading-[25px] tracking-[-0.4px] text-[#384958]">
              <thead>
                <tr className="bg-white">
                  <th className="px-6 py-6 pr-8 font-extrabold sm:px-9 sm:py-7">TITLE</th>
                  <th className="px-6 py-6 pr-8 font-extrabold sm:px-9 sm:py-7">AUTHOR</th>
                  <th className="px-6 py-6 pr-8 font-extrabold sm:px-9 sm:py-7">SOURCE</th>
                  <th className="px-6 py-6 pr-8 font-extrabold sm:px-9 sm:py-7">LANGUAGES TRANSLATED</th>
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row) => (
                  <tr key={row.title} className="border-t border-[#384958]/20">
                    <td className="px-6 py-6 align-top font-extrabold sm:px-9 sm:py-6 sm:text-lg">
                      {row.title}
                    </td>
                    <td className="px-6 py-6 align-top sm:px-9 sm:py-6">{row.author}</td>
                    <td className="px-6 py-6 align-top sm:px-9 sm:py-6">{row.source}</td>
                    <td className="px-6 py-6 align-top sm:px-9 sm:py-6">
                      <LanguageLinks languages={row.languages} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="get-course" className="scroll-mt-24 bg-[#F8F9FD] px-4 py-12 sm:px-6 md:pb-[150px] md:pt-[50px]">
        <div className="mx-auto max-w-[900px] border border-[#603913]/20 bg-white px-5 py-10 sm:px-8 sm:py-12 md:px-12">
          <h2 className="text-center font-heading text-xl font-bold leading-snug tracking-[-0.5px] sm:text-2xl">
            <span className="text-[#37312C]">Sign up for our </span>
            <span className="text-[#EC6744]">free</span>
            <br />
            <span className="text-[#37312C]">Bitcoin for beginners course</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-center text-base leading-7" style={{ color: TEXT }}>
            Learn everything you need to know about Bitcoin in this easy-to-follow Bitcoin course, from its
            mysterious origins to its technical design.
          </p>
          <div className="mt-8">
            <CourseModalBlockComponent
              triggerLabel="Start the Course!"
              variant="primary-orange"
              layout="inline"
              websiteUrl="https://course.bitcoiners.africa"
              fullWidth
            />
          </div>
        </div>
      </section>

      <section className="bg-[#F8F9FD] px-4 pb-16 pt-0 sm:px-6 md:pb-24">
        <div className="mx-auto max-w-[700px] text-center">
          <h2 className="font-heading text-2xl font-bold leading-tight text-[#E1640C] sm:text-3xl md:text-4xl">
            Get 1,000 sats for your brilliant ideas!
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 tracking-[-0.5px] text-[#584538] sm:text-[17px]">
            Have a genius idea or spot something in our African Bitcoiners initiatives that could be even
            better? Submit your feedback to us and we&apos;re excited to reward you for them.
          </p>
          <div className="mt-8">
            <Link
              href="/earn-bitcoin/1000-sats-feedback-bounty/"
              className="inline-flex border border-[#E1640C] px-10 py-[15px] text-[15px] font-bold tracking-[-0.6px] text-[#E1640C] transition-colors hover:bg-[#E1640C] hover:text-white sm:px-16"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
