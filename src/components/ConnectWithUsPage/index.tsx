'use client'

import Image from 'next/image'
import React from 'react'

import { COPY, IMG, SOCIAL } from '@/components/ConnectWithUsPage/data'
import { ContactForm } from '@/components/forms/ContactForm'

const HERO_BG = '#F56700'
const SECTION_BG = '#FEF6EC'
const CARD_BG = '#FFFBF8'
const CARD_BORDER = 'rgba(0,0,0,0.24)'
const TITLE_BROWN = '#5D422F'

function SocialIcon({ type }: { type: (typeof SOCIAL)[number]['icon'] }) {
  const cls = 'h-[28px] w-[28px] md:h-[28px] md:w-[28px]'
  switch (type) {
    case 'x':
      return (
        <svg className={cls} viewBox="0 0 512 512" fill="currentColor" aria-hidden>
          <path d="M389.2 48h70.6L305.6 224.2 487 464H345.9L238.6 318.2 113.6 464H43L186.6 275.9 18.8 48h144.5l95.5 126.2L389.2 48zm-36.8 374.4h19.5L154.1 69.2H131.8l221.4 353.2z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg className={cls} viewBox="0 0 448 512" fill="currentColor" aria-hidden>
          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9 114.9-51.3 114.9-114.9S287.7 141 224.1 141zm0 189.6c-41.2 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.5 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.9-26.9 26.9-14.9 0-26.9-12-26.9-26.9s12-26.9 26.9-26.9 26.9 12 26.9 26.9zm76.1 27.2c-1.7-35.3-9.9-66.7-36.2-93-26.3-26.3-57.7-34.5-93-36.2-36.7-2.1-147.1-2.1-183.8 0-35.3 1.7-66.7 9.9-93 36.2s-34.5 57.7-36.2 93c-2.1 36.7-2.1 147.1 0 183.8 1.7 35.3 9.9 66.7 36.2 93s57.7 34.5 93 36.2c36.7 2.1 147.1 2.1 183.8 0 35.3-1.7 66.7-9.9 93-36.2 26.3-26.3 34.5-57.7 36.2-93 2.1-36.7 2.1-147.1 0-183.8zM398.8 388c-7.8 19.5-22.9 34.6-42.4 42.4-29.4 11.7-99.2 9-132.4 9s-103 2.6-132.4-9c-19.5-7.8-34.6-22.9-42.4-42.4-11.7-29.4-9-99.2-9-132.4s-2.6-103 9-132.4c7.8-19.5 22.9-34.6 42.4-42.4 29.4-11.7 99.2-9 132.4-9s103-2.6 132.4 9c19.5 7.8 34.6 22.9 42.4 42.4 11.7 29.4 9 99.2 9 132.4s2.6 103-9 132.4z" />
        </svg>
      )
    case 'facebook':
      return (
        <svg className={cls} viewBox="0 0 512 512" fill="currentColor" aria-hidden>
          <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.8 90.7 226.4 209.3 245V327h-63v-77h63v-59.6c0-62.2 37-96.5 93.7-96.5 27.1 0 55.5 4.8 55.5 4.8v61h-31.3c-30.8 0-40.4 19.1-40.4 38.7V256h68.8l-11 71.2h-57.8V501C413.3 482.4 504 379.8 504 256z" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg className={cls} viewBox="0 0 448 512" fill="currentColor" aria-hidden>
          <path d="M100.3 448H7.4V148.9h92.9v299.1zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 1 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
        </svg>
      )
    case 'whatsapp':
      return (
        <svg className={cls} viewBox="0 0 448 512" fill="currentColor" aria-hidden>
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.9 34.9 54.1 81.2 54.1 130.4 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.7-32.7-16.1-37.8-18-5.1-1.9-8.8-2.7-12.5 2.7-3.7 5.5-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.7-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.5-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.7-13.4 37.3-26.3 4.6-13 4.6-24.1 3.2-26.3-1.3-2.2-5.1-3.2-10.6-5.9z" />
        </svg>
      )
    case 'discord':
      return (
        <svg className={cls} viewBox="0 0 576 512" fill="currentColor" aria-hidden>
          <path d="M524.5 69.8a1.5 1.5 0 0 0-.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0-1.9.9 337.5 337.5 0 0 0-14.9 30.6 447.8 447.8 0 0 0-134.4 0 309.5 309.5 0 0 0-15.1-30.6 1.9 1.9 0 0 0-1.9-.9A483.7 483.7 0 0 0 52.3 69.1a1.7 1.7 0 0 0-.8.7C4.2 142.5-25.5 212.1 2.4 280.6a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0-1-2.6 321.2 321.2 0 0 1-45.9-21.9 1.9 1.9 0 0 1-.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9.2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1-.2 3.1 301.4 301.4 0 0 1-45.9 21.8 1.9 1.9 0 0 0-1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1.7A486 486 0 0 0 573.5 282.1a2 2 0 0 0 .8-1.4C605.5 212.1 575.2 142.6 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2s23.2-59.2 52.8-59.2c29.7 0 53 26.6 52.8 59.2 0 32.7-23.2 59.2-52.8 59.2zm185.1 0c-29 0-52.8-26.6-52.8-59.2s23.2-59.2 52.8-59.2c29.7 0 53 26.6 52.8 59.2 0 32.7-23.5 59.2-52.8 59.2z" />
        </svg>
      )
    case 'telegram':
      return (
        <svg className={cls} viewBox="0 0 496 512" fill="currentColor" aria-hidden>
          <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z" />
        </svg>
      )
    case 'nostr':
      return (
        <Image src={IMG.nostr} alt="" width={28} height={28} className="h-[22px] w-[22px] object-contain brightness-0 invert" aria-hidden />
      )
  }
}

function SocialLink({ item }: { item: (typeof SOCIAL)[number] }) {
  const isNostr = item.icon === 'nostr'

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={item.label}
      className={`group flex h-[46px] w-[46px] items-center justify-center rounded-xl border border-black/10 transition-colors ${
        isNostr
          ? 'bg-[#EB6433] text-white hover:bg-[#584538]'
          : 'bg-white text-[#EB6433] hover:bg-[#584538] hover:text-white'
      }`}
    >
      <SocialIcon type={item.icon} />
    </a>
  )
}

export function ConnectWithUsPage() {
  return (
    <article>
      {/* Hero — background image behind text, not side-by-side */}
      <section
        className="min-h-[300px] bg-cover bg-no-repeat px-4 py-12 pb-24 [background-position:center_78%] md:min-h-[420px] md:px-6 md:pt-20 md:pb-40 md:[background-position:right_72%]"
        style={{
          backgroundColor: HERO_BG,
          backgroundImage: `url("${IMG.heroBg}")`,
        }}
      >
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-center md:pr-[50px]">
            <h1 className="text-center font-heading text-[45px] font-black leading-[55px] tracking-[-0.6px] text-white md:text-left md:text-[50px] md:leading-[70px]">
              {COPY.heroTitle}
            </h1>
            <p className="mt-4 text-center font-sans text-[17px] leading-7 tracking-[-0.5px] text-white/85 md:text-left">
              {COPY.heroBody}
            </p>
          </div>
          <div className="hidden md:block" aria-hidden />
        </div>
      </section>

      {/* Get In Touch card + form */}
      <section className="px-4 py-[30px] pb-[100px] md:px-[30px] md:py-20 md:pb-[150px]" style={{ backgroundColor: SECTION_BG }}>
        <div className="mx-auto max-w-[950px]">
          <div
            className="rounded-[5px] border px-[15px] py-[30px] md:px-[190px] md:py-[50px]"
            style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}
          >
            <h2
              className="text-center font-heading text-[26px] font-black tracking-[-0.6px] md:text-[32px]"
              style={{ color: TITLE_BROWN }}
            >
              {COPY.cardTitle}
            </h2>

            <div className="flex flex-wrap justify-center gap-3 pt-5 md:gap-[15px] md:pt-5">
              {SOCIAL.map((item) => (
                <SocialLink key={item.label} item={item} />
              ))}
            </div>

            <div
              className="mt-6 rounded-[5px] border p-0 md:mt-8 md:p-10"
              style={{ backgroundColor: '#FFFAF5', borderColor: 'rgba(0,0,0,0.3)' }}
            >
              <ContactForm variant="page" />
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
