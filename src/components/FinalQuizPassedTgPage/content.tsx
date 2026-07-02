'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

import { FinalCourseFeedbackForm } from '@/components/forms/FinalCourseFeedbackForm'
import { IMG, MORE_CARDS, SHARE_LINKS, certificateHref } from '@/components/FinalQuizPassedTgPage/data'

const PAGE_BG = '#FFFCFA'
const HEADING = '#37312C'
const BODY = '#37312C'
const ORANGE = '#F45341'
const LINK = '#F45341'
const FORM_BG = '#FFF3DE'

const SHARE_BUTTONS = [
  { label: 'Share on Whatsapp', href: SHARE_LINKS.whatsapp },
  { label: 'Share on Twitter', href: SHARE_LINKS.twitter },
  { label: 'Share on Facebook', href: SHARE_LINKS.facebook },
  { label: 'Share on LinkedIn', href: SHARE_LINKS.linkedin },
]

export function FinalQuizPassedTgContent() {
  const searchParams = useSearchParams()
  const score = searchParams.get('score')
  const uniqueId = searchParams.get('uniqueId')
  const certLink = certificateHref(uniqueId)

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
            Congratulations!
          </h2>
          <h4 className="mt-3 text-2xl font-bold tracking-[-0.5px] md:text-[30px]" style={{ color: HEADING }}>
            You passed the course!
          </h4>
          <div className="mx-auto mt-6 max-w-[280px] text-left">
            <label className="mb-1 block text-sm font-medium" style={{ color: BODY }}>
              Score Percentage
            </label>
            <input
              type="text"
              readOnly
              value={score != null ? `${score}%` : '—'}
              className="w-full rounded border border-[#d4d4d4] bg-[#f9f7f0] px-4 py-3 text-base"
              style={{ color: BODY }}
            />
          </div>
          <div className="mt-8">
            <Link
              href={certLink}
              target="_blank"
              className="inline-block rounded px-8 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#dd8512]"
              style={{ backgroundColor: ORANGE }}
            >
              Get Your Certificate
            </Link>
          </div>
          <p className="mt-6 text-lg leading-7 tracking-[-0.4px]" style={{ color: BODY }}>
            Please take a few seconds to give us your feedback with the form below👇🏼
          </p>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6">
        <div className="mx-auto max-w-[800px] text-center">
          <p className="text-lg leading-7 tracking-[-0.4px]" style={{ color: BODY }}>
            Please click on this{' '}
            <Link href={certLink} target="_blank" className="font-semibold hover:underline" style={{ color: LINK }}>
              link to download your certificate.
            </Link>
          </p>
          <h3
            className="mt-10 font-heading text-[28px] font-bold tracking-[-0.6px] md:text-[40px]"
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
            <FinalCourseFeedbackForm formType="final-quiz-passed" />
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
