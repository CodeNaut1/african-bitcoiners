import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { BitcoinForHerForm } from '@/components/forms/BitcoinForHerForm'
import { BODY_PARAGRAPHS, IMG, META_ITEMS, SPEAKERS } from '@/components/HerPage/data'

const HERO_ORANGE = '#E98327'
const DARK = '#261B01'
const SPEAKERS_RED = '#A2020C'
const TWITTER_BLUE = '#1C96E8'

function MetaIcon({ type }: { type: 'bookmark' | 'calendar' | 'pin' }) {
  const paths = {
    bookmark:
      'M6 2h12a1 1 0 0 1 1 1v18l-7-4-7 4V3a1 1 0 0 1 1-1z',
    calendar:
      'M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7zm12 8H5v10h14V10z',
    pin: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z',
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0" aria-hidden>
      <path d={paths[type]} />
    </svg>
  )
}

function DottedDivider() {
  return (
    <div className="my-8 flex justify-center" aria-hidden>
      <div className="h-4 w-[70%] max-w-[500px] opacity-80" style={{ backgroundImage: 'radial-gradient(circle, #FFA500 2px, transparent 2px)', backgroundSize: '14px 14px' }} />
    </div>
  )
}

export function HerPage() {
  return (
    <div className="font-body bg-white">
      <section
        className="bg-cover bg-center bg-no-repeat px-4 pb-3 pt-14 sm:px-6 md:pt-[120px]"
        style={{
          backgroundColor: HERO_ORANGE,
          backgroundImage: `url(${IMG.heroBg})`,
        }}
      >
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 lg:grid-cols-[60%_40%]">
          <div>
            <h1 className="font-heading text-[40px] font-bold leading-tight tracking-[-0.8px] md:text-[50px]" style={{ color: DARK }}>
              BITCOIN FOR HER
            </h1>
            <h4 className="mt-3 text-xl font-bold tracking-[-0.5px] md:text-2xl" style={{ color: DARK }}>
              AN ONLINE COMMUNITY EMPOWERING AFRICAN WOMEN WITH BITCOIN
            </h4>
            <p className="mt-4 text-lg leading-[30px] text-white md:text-[18px]">
              Here is your chance to connect with a vibrant online community of passionate African women who are eager
              to share their experiences, insights, and success stories with Bitcoin.
            </p>
            <ul className="mt-6 space-y-3">
              {META_ITEMS.map(({ icon, label }) => (
                <li key={label} className="flex items-end gap-3 text-lg text-white md:text-[18px]">
                  <MetaIcon type={icon} />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                href="#her-signup"
                className="inline-flex items-center gap-2.5 rounded px-8 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#201601]"
                style={{ backgroundColor: '#553700' }}
              >
                Sign Up Here
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-8 pt-12 sm:px-6" style={{ backgroundColor: HERO_ORANGE }}>
        <div className="mx-auto max-w-[1200px]">
          <h4 className="text-center text-2xl font-bold md:text-[28px]" style={{ color: SPEAKERS_RED }}>
            Inspiring Speakers
          </h4>
          <div className="mt-6 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {SPEAKERS.map((speaker) => (
              <article key={speaker.name} className="text-center">
                <div className="mx-auto flex justify-center" style={{ width: speaker.imageWidth, maxWidth: '100%' }}>
                  <Image
                    src={speaker.image}
                    alt=""
                    width={400}
                    height={400}
                    className="h-auto w-full object-contain"
                  />
                </div>
                <h3 className="mt-3 text-[22px] font-bold text-white">{speaker.name}</h3>
                <p className="mt-1 text-base text-white">{speaker.role}</p>
                <a
                  href={speaker.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex transition-opacity hover:opacity-80"
                  aria-label={`${speaker.name} on Twitter`}
                >
                  <svg viewBox="0 0 24 24" fill={TWITTER_BLUE} className="h-9 w-9" aria-hidden>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-[1000px] text-center">
          <DottedDivider />
          <div className="space-y-4 text-lg leading-[30px] text-black md:text-[18px]">
            {BODY_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
          <DottedDivider />
        </div>
      </section>

      <section id="her-signup" className="scroll-mt-8 px-4 pb-[100px] pt-5 sm:px-6">
        <div className="mx-auto max-w-[600px] px-[45px] py-[45px] shadow-[0_0_10px_rgba(0,0,0,0.99)]" style={{ backgroundColor: DARK }}>
          <h3 className="mb-6 text-center font-heading text-[22px] font-bold md:text-[30px]" style={{ color: '#FFA500' }}>
            Join Our Community to attend
          </h3>
          <BitcoinForHerForm />
        </div>
      </section>
    </div>
  )
}
