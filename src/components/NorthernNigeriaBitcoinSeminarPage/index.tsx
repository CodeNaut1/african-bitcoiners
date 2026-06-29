import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import {
  AUDIENCE,
  HIGHLIGHT_ROWS,
  IMG,
  LINKS,
  META_ITEMS,
  WHY_PARTICIPATE,
} from '@/components/NorthernNigeriaBitcoinSeminarPage/data'

const HERO_GREEN = '#144B36'
const LIME = '#D4E72B'
const DARK_GREEN = '#124734'
const DEEP_GREEN = '#084035'
const LIGHT_GREEN = '#DFFBCB'
const CREAM = '#E0FDDF'
const PILL_BG = '#F2F693'
const LIST_GREEN = '#1A4E34'
const META_BOX_BG = '#00411B'
const GRADIENT = 'linear-gradient(270deg, #E3EF26 -38%, #FFFDEE 124%)'
const CARD_GRADIENT = 'linear-gradient(270deg, #FFFDEE -38%, #E3EF26 124%)'

function BorderedTitle({
  children,
  variant,
}: {
  children: React.ReactNode
  variant: 'green' | 'cream'
}) {
  const borderColor = variant === 'green' ? DARK_GREEN : CREAM
  const textColor = variant === 'green' ? DARK_GREEN : CREAM

  return (
    <div className="relative inline-block border px-6 py-2.5" style={{ borderColor }}>
      <span className="absolute -left-1 -top-1 h-2 w-2" style={{ backgroundColor: borderColor }} aria-hidden />
      <span className="absolute -right-1 -top-1 h-2 w-2" style={{ backgroundColor: borderColor }} aria-hidden />
      <h4 className="text-xl font-bold tracking-[-0.4px] md:text-[28px]" style={{ color: textColor }}>
        {children}
      </h4>
      <span className="absolute -bottom-1 -left-1 h-2 w-2" style={{ backgroundColor: borderColor }} aria-hidden />
      <span className="absolute -bottom-1 -right-1 h-2 w-2" style={{ backgroundColor: borderColor }} aria-hidden />
    </div>
  )
}

function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 29 29" fill="none" aria-hidden>
      <path
        d="M24.641 12.153H3.51953M18.774 2.76562V7.4593M9.38662 2.76562V7.4593M9.15194 26.234H19.0086C20.9802 26.234 21.9659 26.234 22.719 25.8503C23.3813 25.5128 23.9199 24.9743 24.2574 24.3119C24.641 23.5589 24.641 22.5731 24.641 20.6016V10.7449C24.641 8.77334 24.641 7.78758 24.2574 7.03455C23.9199 6.37217 23.3813 5.83364 22.719 5.49614C21.9659 5.11246 20.9802 5.11246 19.0086 5.11246H9.15194C7.18041 5.11246 6.19465 5.11246 5.44162 5.49614C4.77924 5.83364 4.24071 6.37217 3.90322 7.03455C3.51953 7.78758 3.51953 8.77334 3.51953 10.7449V20.6016C3.51953 22.5731 3.51953 23.5589 3.90322 24.3119C4.24071 24.9743 4.77924 25.5128 5.44162 25.8503C6.19465 26.234 7.18041 26.234 9.15194 26.234Z"
        stroke={CREAM}
        strokeWidth="2.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 29 29" fill="none" aria-hidden>
      <path
        d="M5.93822 3.9375L2.41797 7.45775M25.8863 7.45775L22.3661 3.9375M7.11164 22.7122L4.7648 25.059M21.1927 22.7122L23.5395 25.059M14.1521 10.978V15.6717L16.499 18.0185M14.1521 25.059C16.6418 25.059 19.0295 24.07 20.79 22.3095C22.5505 20.5491 23.5395 18.1614 23.5395 15.6717C23.5395 13.182 22.5505 10.7943 20.79 9.03382C19.0295 7.27336 16.6418 6.28434 14.1521 6.28434C11.6625 6.28434 9.27476 7.27336 7.51429 9.03382C5.75382 10.7943 4.7648 13.182 4.7648 15.6717C4.7648 18.1614 5.75382 20.5491 7.51429 22.3095C9.27476 24.07 11.6625 25.059 14.1521 25.059Z"
        stroke="#FFFCF0"
        strokeWidth="2.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 29 29" fill="none" aria-hidden>
      <path
        d="M14.5631 15.6732C16.5073 15.6732 18.0834 14.0971 18.0834 12.153C18.0834 10.2088 16.5073 8.63271 14.5631 8.63271C12.6189 8.63271 11.0429 10.2088 11.0429 12.153C11.0429 14.0971 12.6189 15.6732 14.5631 15.6732Z"
        stroke={CREAM}
        strokeWidth="2.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5631 26.234C19.2568 21.5403 23.9505 17.3375 23.9505 12.153C23.9505 6.96848 19.7476 2.76562 14.5631 2.76562C9.37864 2.76562 5.17578 6.96848 5.17578 12.153C5.17578 17.3375 9.86945 21.5403 14.5631 26.234Z"
        stroke={CREAM}
        strokeWidth="2.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MetaIcon({ type }: { type: 'calendar' | 'clock' | 'pin' }) {
  if (type === 'calendar') return <CalendarIcon />
  if (type === 'clock') return <ClockIcon />
  return <PinIcon />
}

function CheckCircleIcon() {
  return (
    <svg className="mt-1 h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke={DARK_GREEN} strokeWidth="1.5" />
      <path
        d="M8 12.5l2.5 2.5L16 9.5"
        stroke={DARK_GREEN}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BriefcaseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" aria-hidden>
      <path
        d="M16.0039 7.25C16.0039 6.32003 16.0039 5.85504 15.9017 5.47354C15.6243 4.43827 14.8156 3.62962 13.7804 3.35222C13.3989 3.25 12.9339 3.25 12.0039 3.25C11.0739 3.25 10.6089 3.25 10.2274 3.35222C9.19217 3.62962 8.38353 4.43827 8.10613 5.47354C8.00391 5.85504 8.00391 6.32003 8.00391 7.25M5.20391 21.25H18.8039C19.924 21.25 20.4841 21.25 20.9119 21.032C21.2882 20.8403 21.5942 20.5343 21.7859 20.158C22.0039 19.7302 22.0039 19.1701 22.0039 18.05V10.45C22.0039 9.32989 22.0039 8.76984 21.7859 8.34202C21.5942 7.96569 21.2882 7.65973 20.9119 7.46799C20.4841 7.25 19.924 7.25 18.8039 7.25H5.20391C4.0838 7.25 3.52375 7.25 3.09593 7.46799C2.7196 7.65973 2.41364 7.96569 2.22189 8.34202C2.00391 8.76984 2.00391 9.32989 2.00391 10.45V18.05C2.00391 19.1701 2.00391 19.7302 2.22189 20.158C2.41364 20.5343 2.7196 20.8403 3.09593 21.032C3.52375 21.25 4.0838 21.25 5.20391 21.25Z"
        stroke={DARK_GREEN}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CodeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none" aria-hidden>
      <path
        d="M17.5039 17.75L22.5039 12.75L17.5039 7.75M7.50391 7.75L2.50391 12.75L7.50391 17.75M14.5039 3.75L10.5039 21.75"
        stroke={DARK_GREEN}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" aria-hidden>
      <path
        d="M12.0039 20.75H5.20391C4.0838 20.75 3.52375 20.75 3.09593 20.532C2.7196 20.3403 2.41364 20.0343 2.22189 19.658C2.00391 19.2302 2.00391 18.6701 2.00391 17.55V7.95C2.00391 6.82989 2.00391 6.26984 2.22189 5.84202C2.41364 5.46569 2.7196 5.15973 3.09593 4.96799C3.52375 4.75 4.0838 4.75 5.20391 4.75H5.60391C7.84412 4.75 8.96422 4.75 9.81987 5.18597C10.5725 5.56947 11.1844 6.18139 11.5679 6.93404C12.0039 7.78968 12.0039 8.90979 12.0039 11.15M12.0039 20.75V11.15M12.0039 20.75H18.8039C19.924 20.75 20.4841 20.75 20.9119 20.532C21.2882 20.3403 21.5942 20.0343 21.7859 19.658C22.0039 19.2302 22.0039 18.6701 22.0039 17.55V7.95C22.0039 6.82989 22.0039 6.26984 21.7859 5.84202C21.5942 5.46569 21.2882 5.15973 20.9119 4.96799C20.4841 4.75 19.924 4.75 18.8039 4.75H18.4039C16.1637 4.75 15.0436 4.75 14.1879 5.18597C13.4353 5.56947 12.8234 6.18139 12.4399 6.93404C12.0039 7.78968 12.0039 8.90979 12.0039 11.15"
        stroke={DARK_GREEN}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function AudienceIcon({ type }: { type: 'briefcase' | 'code' | 'book' }) {
  if (type === 'code') return <CodeIcon />
  if (type === 'book') return <BookIcon />
  return <BriefcaseIcon />
}

function HighlightPill({ label }: { label: string }) {
  return (
    <span
      className="inline-block whitespace-nowrap rounded-full border px-5 py-3 text-center text-sm font-bold tracking-[-0.4px] md:text-base"
      style={{
        backgroundColor: PILL_BG,
        borderColor: DARK_GREEN,
        color: DARK_GREEN,
        boxShadow: '0 10px 0 0 #124734',
      }}
    >
      {label}
    </span>
  )
}

function RegisterButton({
  href = '#get-seminar-reg-form',
  variant = 'lime',
}: {
  href?: string
  variant?: 'lime' | 'dark'
}) {
  const isLime = variant === 'lime'
  return (
    <Link
      href={href}
      className="inline-block rounded px-10 py-5 text-[15px] font-bold tracking-[-0.5px] transition-colors md:px-20"
      style={
        isLime
          ? { backgroundColor: LIME, color: '#275934', boxShadow: '0 0 2px rgba(0,0,0,0.25)' }
          : { backgroundColor: DARK_GREEN, color: '#FFFFFF', border: `1px solid ${DARK_GREEN}` }
      }
    >
      Register Now
    </Link>
  )
}

export function NorthernNigeriaBitcoinSeminarPage() {
  return (
    <div className="font-body">
      {/* Hero — 50/50 : texte à gauche, photo via le fond à droite */}
      <section
        className="relative overflow-hidden bg-cover bg-no-repeat px-4 pb-20 pt-14 sm:px-6 md:pt-[60px]"
        style={{
          backgroundColor: HERO_GREEN,
          backgroundImage: `url(${IMG.heroBg})`,
          backgroundPosition: '0 -120px',
          backgroundSize: '100% auto',
        }}
      >
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 lg:grid-cols-2 lg:gap-8">
          <div className="relative z-10 max-w-[560px]">
            <h1 className="font-heading text-[36px] font-bold capitalize leading-[55px] tracking-[-0.5px] md:text-[50px] md:leading-[70px]">
              <span className="text-white">Kaduna </span>
              <span style={{ color: LIME }}>Bitcoin Seminar</span>
            </h1>
            <p
              className="pt-2.5 text-[17px] font-normal leading-[28px] tracking-[-0.6px] text-white"
            >
              A comprehensive immersion into Bitcoin technologies, featuring a{' '}
              <strong>community meetup</strong> and hands-on{' '}
              <strong>lightning network development bootcamp</strong>.
            </p>

            {/* Barre meta horizontale */}
            <div
              className="mt-5 inline-flex max-w-full flex-wrap items-center gap-x-5 gap-y-2 rounded-[9px] border border-dashed px-3 py-2.5"
              style={{ backgroundColor: META_BOX_BG, borderColor: CREAM }}
            >
              {META_ITEMS.map(({ label, icon }, index) => (
                <React.Fragment key={label}>
                  {index > 0 && (
                    <span
                      className="hidden h-5 w-px shrink-0 sm:block"
                      style={{ backgroundColor: `${CREAM}55` }}
                      aria-hidden
                    />
                  )}
                  <div className="flex shrink-0 items-center gap-2">
                    <MetaIcon type={icon} />
                    <span
                      className="whitespace-nowrap text-[15px] font-extrabold tracking-[-0.5px] sm:text-[17px]"
                      style={{ color: CREAM }}
                    >
                      {label}
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </div>

            <div className="pt-5">
              <RegisterButton variant="lime" />
            </div>

            <div className="mt-8">
              <p className="font-bold text-white">Powered by:</p>
              <a href={LINKS.btrust} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block">
                <Image src={IMG.btrust} alt="Btrust" width={300} height={127} className="h-auto w-[200px] md:w-[300px]" />
              </a>
            </div>

            <div className="mt-6">
              <p className="font-bold text-white">Partners:</p>
              <div className="mt-4 flex max-w-[600px] flex-wrap items-center gap-6">
                <a href={LINKS.ipaybtc} target="_blank" rel="noopener noreferrer">
                  <Image src={IMG.ipaybtc} alt="iPayBTC" width={400} height={108} className="h-auto w-[200px] md:w-[240px]" />
                </a>
                <a href={LINKS.africaFreeRouting} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={IMG.africaFreeRouting}
                    alt="Africa Free Routing"
                    width={320}
                    height={197}
                    className="h-auto w-[180px] md:w-[220px]"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="hidden min-h-[420px] lg:block" aria-hidden />
        </div>
      </section>

      {/* Why Participate — 50/50, titre centré dans la colonne gauche */}
      <section className="px-4 py-14 sm:px-6 md:py-[70px]" style={{ backgroundColor: LIGHT_GREEN }}>
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="lg:pr-6">
            <div className="mb-8 flex justify-center lg:justify-center">
              <BorderedTitle variant="green">Why Participate</BorderedTitle>
            </div>
            <ul className="space-y-4">
              {WHY_PARTICIPATE.map(({ title, text }) => (
                <li
                  key={title}
                  className="flex gap-2.5 text-[15px] leading-[26px] tracking-[-0.5px]"
                  style={{ color: LIST_GREEN }}
                >
                  <CheckCircleIcon />
                  <span>
                    <strong>{title}</strong> {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div
              className="overflow-hidden rounded-2xl border-2 p-1.5"
              style={{ borderColor: DEEP_GREEN }}
            >
              <Image
                src={IMG.whyParticipate}
                alt=""
                width={698}
                height={610}
                className="h-auto w-full max-w-[520px] rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who Should Attend — titre centré, puis image + grille 2×2 */}
      <section className="px-4 py-14 sm:px-6 md:py-[70px]" style={{ backgroundColor: DEEP_GREEN }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="flex justify-center">
            <BorderedTitle variant="cream">Who Should Attend</BorderedTitle>
          </div>

          <div className="mt-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="flex justify-center lg:justify-start">
              <Image
                src={IMG.whoShouldAttend}
                alt=""
                width={708}
                height={510}
                className="h-auto w-full max-w-[520px] rounded-2xl"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {AUDIENCE.map(({ title, description, icon }) => (
                <article
                  key={title}
                  className="rounded-md border"
                  style={{
                    background: CARD_GRADIENT,
                    borderColor: DARK_GREEN,
                    padding: '30px 20px',
                  }}
                >
                  <AudienceIcon type={icon} />
                  <h3
                    className="mt-2.5 text-[17px] font-bold tracking-[-0.3px]"
                    style={{ color: DARK_GREEN }}
                  >
                    {title}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-5 tracking-[-0.3px]"
                    style={{ color: DARK_GREEN }}
                  >
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seminar Highlights — pills en nuage décalé sur 2 rangées */}
      <section className="px-4 py-14 pb-24 sm:px-6 md:py-[50px] md:pb-[100px]" style={{ background: GRADIENT }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="flex justify-center">
            <BorderedTitle variant="green">Seminar Highlights</BorderedTitle>
          </div>

          <div className="mt-10 space-y-5">
            {HIGHLIGHT_ROWS.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`flex flex-wrap items-center justify-center gap-4 md:gap-5 ${
                  rowIndex === 1 ? 'md:translate-x-6' : ''
                }`}
              >
                {row.map(({ label }, colIndex) => (
                  <HighlightPill key={`${rowIndex}-${colIndex}-${label}`} label={label} />
                ))}
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <RegisterButton variant="dark" />
          </div>
        </div>
      </section>

      {/* Developer bootcamp — bouton ghost transparent */}
      <section className="px-4 py-16 sm:px-6 md:py-20" style={{ backgroundColor: DEEP_GREEN }}>
        <div className="mx-auto max-w-[800px] text-center">
          <p className="text-[30px] font-semibold leading-7 tracking-[-0.6px] text-white">
            Are you a developer?
          </p>
          <p className="mt-1 text-xl font-normal leading-7 tracking-[-0.6px] text-white">
            Join the 4 Day Lightning Developer Bootcamp in Kaduna
          </p>
          <div className="mt-8">
            <a
              href={LINKS.bootcamp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded border bg-transparent px-10 py-5 text-[15px] font-bold tracking-[-0.5px] transition-colors hover:bg-[#D4E72B] hover:text-[#275934] md:px-20"
              style={{ borderColor: PILL_BG, color: PILL_BG }}
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Seminar Ended — carte blanche centrée */}
      <section
        id="get-seminar-reg-form"
        className="scroll-mt-8 px-4 py-16 pb-24 sm:px-6 md:py-20 md:pb-[100px]"
        style={{ background: GRADIENT }}
      >
        <div
          className="mx-auto max-w-[700px] rounded-[10px] border bg-white px-8 py-14 md:px-[50px] md:py-[50px]"
          style={{ borderColor: DEEP_GREEN }}
        >
          <h3
            className="text-center font-heading text-[22px] font-bold md:text-[30px]"
            style={{ color: DEEP_GREEN }}
          >
            Seminar Ended
          </h3>
        </div>
      </section>
    </div>
  )
}
