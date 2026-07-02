'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

import { FinalCourseFeedbackForm } from '@/components/forms/FinalCourseFeedbackForm'
import { IMG, MORE_CARDS, SHARE_LINKS } from '@/components/FinalQuizPassedPage/data'
import { FINAL_QUIZ_TOTAL_QUESTIONS } from '@/data/final-quiz-questions'

const PAGE_BG = '#FFFCFA'
const HEADING = '#37312C'
const BODY = '#37312C'
const ORANGE = '#F45341'
const FORM_BG = '#FFF3DE'

const SHARE_BUTTONS = [
  { label: 'Share on Whatsapp', href: SHARE_LINKS.whatsapp },
  { label: 'Share on Twitter', href: SHARE_LINKS.twitter },
  { label: 'Share on Facebook', href: SHARE_LINKS.facebook },
  { label: 'Share on LinkedIn', href: SHARE_LINKS.linkedin },
]

function certificateHref(email?: string, uniqueId?: string): string {
  if (uniqueId) {
    return `/get-certificate-tg?uniqueId=${encodeURIComponent(uniqueId)}`
  }
  if (email) {
    return `/get-certificate?email=${encodeURIComponent(email)}`
  }
  return '/get-certificate'
}

export function FinalQuizPassedContent() {
  const searchParams = useSearchParams()
  const score = searchParams.get('score')
  const percent = searchParams.get('percent')
  const email = searchParams.get('email') ?? undefined
  const uniqueId = searchParams.get('uniqueId') ?? undefined
  const certLink = certificateHref(email, uniqueId)

  const scoreDisplay =
    score != null && percent != null
      ? `${score} out of ${FINAL_QUIZ_TOTAL_QUESTIONS} (${percent}%)`
      : score != null
        ? `${score} out of ${FINAL_QUIZ_TOTAL_QUESTIONS}`
        : percent != null
          ? `${percent}%`
          : '—'

  return (
    <div className="font-body" style={{ backgroundColor: PAGE_BG }}>
      <section className="px-4 py-10 sm:px-6 md:py-14">
        <div className="mx-auto max-w-[600px] text-center">
          <Image
            src={IMG.celebrate}
            alt=""
            width={1000}
            height={1000}
            className="mx-auto h-auto w-full max-w-[280px] sm:max-w-[320px]"
            priority
          />
          <h2
            className="mt-2 font-heading text-[40px] font-bold leading-tight tracking-[-0.8px] sm:text-[50px]"
            style={{ color: HEADING }}
          >
            Congratulations! You passed! 🎉
          </h2>
          <p className="mt-6 text-lg leading-7 tracking-[-0.4px]" style={{ color: BODY }}>
            You scored {scoreDisplay}.
          </p>
          <div className="mt-8">
            <Link
              href={certLink}
              className="inline-block rounded px-8 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#dd8512]"
              style={{ backgroundColor: ORANGE }}
            >
              Get Your Certificate
            </Link>
          </div>
          <p className="mt-6 text-base leading-7 tracking-[-0.4px]" style={{ color: BODY }}>
            Your certificate will be available 19 days after your course signup date.
          </p>
          <p className="mt-6 text-lg leading-7 tracking-[-0.4px]" style={{ color: BODY }}>
            Please take a few seconds to give us your feedback with the form below👇🏼
          </p>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6">
        <div className="mx-auto max-w-[800px] text-center">
          <h3
            className="mt-4 font-heading text-[28px] font-bold tracking-[-0.6px] md:text-[40px]"
            style={{ color: HEADING }}
          >
            Tell Others About the Bitcoin for Beginners Course
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SHARE_BUTTONS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded px-4 py-3 text-center text-[15px] font-medium text-white transition-colors hover:bg-[#dd8512]"
                style={{ backgroundColor: ORANGE }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6" style={{ backgroundColor: FORM_BG }}>
        <div className="mx-auto max-w-[700px]">
          <h4 className="mb-6 text-center font-heading text-2xl font-bold tracking-[-0.6px]" style={{ color: HEADING }}>
            FINAL COURSE FEEDBACK
          </h4>
          <div className="border border-black/10 bg-white px-6 py-8 sm:px-9">
            <FinalCourseFeedbackForm email={email} formType="final-quiz-passed" />
          </div>
        </div>
      </section>

      <section className="px-4 py-12 pb-20 sm:px-6">
        <div className="mx-auto max-w-[1000px] text-center">
          <h3
            className="font-heading text-[28px] font-bold tracking-[-0.6px] md:text-[40px]"
            style={{ color: HEADING }}
          >
            More from African Bitcoiners
          </h3>
          <p className="mx-auto mt-4 max-w-[700px] text-lg leading-7 tracking-[-0.4px]" style={{ color: BODY }}>
            Bitcoin adoption in Africa is important to us because we believe that Bitcoin means freedom for Africa. Check
            out some of our available projects below
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MORE_CARDS.map((card) => (
              <article key={card.title} className="flex h-full flex-col border border-black/15 bg-white">
                <div className="flex justify-center p-6 pb-2">
                  <Image src={card.image} alt="" width={120} height={120} className="h-[100px] w-[100px] object-contain" />
                </div>
                <div className="flex flex-1 flex-col px-5 pb-6 text-center">
                  <h3 className="text-xl font-bold" style={{ color: HEADING }}>
                    {card.title}
                  </h3>
                  <p className="mt-2 flex-1 text-base leading-relaxed" style={{ color: BODY }}>
                    {card.description}
                  </p>
                  <div className="mt-5">
                    <Link
                      href={card.href}
                      className="inline-block rounded px-8 py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-[#dd8512]"
                      style={{ backgroundColor: ORANGE }}
                    >
                      {card.cta}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
