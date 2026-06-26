'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { BTC_ADDRESS, COPY, IMG, SPONSORSHIP_DECK_URL } from '@/components/SupportUsPage/data'
import { SupportUsLightningForm } from '@/components/SupportUsPage/SupportUsLightningForm'

const HERO_BG = '#FFF3E0'
const DONATION_BG = '#FEF8F0'
const BROWN = '#584538'
const ORANGE = '#E1640C'
const ICON_TITLE = '#F45341'
const MUTED = '#475467'
const COPY_BTN = '#FF1900'
const NAVY = '#253343'

function LightningIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="62" height="61" viewBox="0 0 62 61" fill="none" aria-hidden>
      <rect x="4.83594" y="4.39844" width="52.3346" height="52.3346" rx="26.1673" fill="#FFDAD6" />
      <rect
        x="4.83594"
        y="4.39844"
        width="52.3346"
        height="52.3346"
        rx="26.1673"
        stroke="#FEF3F2"
        strokeWidth="7.85019"
      />
      <path
        d="M32.0929 19.6562L22.382 31.3093C22.0017 31.7656 21.8116 31.9938 21.8087 32.1865C21.8061 32.3541 21.8808 32.5134 22.0111 32.6188C22.161 32.7399 22.458 32.7399 23.0521 32.7399H31.0026L29.9123 41.4623L39.6231 29.8093C40.0034 29.353 40.1936 29.1248 40.1965 28.9321C40.199 28.7645 40.1243 28.6051 39.994 28.4998C39.8441 28.3787 39.5471 28.3787 38.953 28.3787H31.0026L32.0929 19.6562Z"
        stroke="#F45341"
        strokeWidth="2.18061"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function OnchainIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="62" height="61" viewBox="0 0 62 61" fill="none" aria-hidden>
      <rect x="4.83594" y="4.39844" width="52.3346" height="52.3346" rx="26.1673" fill="#FFDAD6" />
      <rect
        x="4.83594"
        y="4.39844"
        width="52.3346"
        height="52.3346"
        rx="26.1673"
        stroke="#FEF3F2"
        strokeWidth="7.85019"
      />
      <path
        d="M19.4453 19.6641L21.6259 21.8447M41.2514 19.6641L39.0708 21.8447M41.2514 41.4701L39.0708 39.2895M19.4453 41.4701L21.6259 39.2895M19.4453 34.9283H21.0808M25.9871 19.6641V21.2995M41.2514 26.2059H39.6159M34.7096 41.4701V39.8347M36.8902 34.9283H40.7062M34.7096 19.6641V24.0253M19.4453 26.2059H23.8065M25.9871 41.4701V37.1089M34.7096 30.5671C34.7096 32.9757 32.757 34.9283 30.3484 34.9283C27.9397 34.9283 25.9871 32.9757 25.9871 30.5671C25.9871 28.1585 27.9397 26.2059 30.3484 26.2059C32.757 26.2059 34.7096 28.1585 34.7096 30.5671Z"
        stroke="#F45341"
        strokeWidth="2.18061"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 448 512" fill="currentColor" aria-hidden>
      <path d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v48H64v256h192v-32h48v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z" />
    </svg>
  )
}

function PaymentCard({
  title,
  description,
  icon,
  children,
  dividerRight = false,
  className = '',
}: {
  title: string
  description: string
  icon: React.ReactNode
  children: React.ReactNode
  dividerRight?: boolean
  className?: string
}) {
  return (
    <div
      className={`rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-[0px_4px_6px_-2px_rgba(16,24,40,0.08)] md:px-5 md:py-[50px] ${dividerRight ? 'md:border-r md:border-[#EAECF0]' : ''} ${className}`}
    >
      <div className="flex flex-col gap-0.5">
        <div className="mb-2 flex flex-col gap-2">
          <div className="[&_svg]:h-[45px] [&_svg]:w-[45px]">{icon}</div>
          <h3 className="font-heading text-[20px] font-semibold leading-tight" style={{ color: ICON_TITLE }}>
            {title}
          </h3>
          <p className="text-sm leading-5 md:text-base" style={{ color: MUTED }}>
            {description}
          </p>
        </div>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  )
}

function OnchainCard() {
  const [copied, setCopied] = useState(false)

  function copyAddress() {
    navigator.clipboard.writeText(BTC_ADDRESS).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <PaymentCard
      title={COPY.onchain.title}
      description={COPY.onchain.description}
      icon={<OnchainIcon />}
      className="mt-[30px] md:mt-0"
    >
      <div className="flex flex-col items-center gap-5">
        <Image
          src={IMG.onchainQr}
          alt="African Bitcoiners on-chain donation QR code"
          width={280}
          height={280}
          className="h-auto w-full max-w-[280px]"
          sizes="(max-width: 768px) 80vw, 280px"
        />
        <button
          type="button"
          onClick={copyAddress}
          className="inline-flex w-full max-w-full flex-row-reverse items-center justify-center gap-3 rounded-md px-[60px] py-[15px] text-base font-semibold tracking-[-0.5px] text-white shadow-sm transition-colors md:px-[55px]"
          style={{ backgroundColor: COPY_BTN }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = NAVY
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = COPY_BTN
          }}
        >
          <CopyIcon />
          <span>{copied ? 'Copied!' : COPY.onchain.copyLabel}</span>
        </button>
      </div>
    </PaymentCard>
  )
}

export function SupportUsPage() {
  return (
    <article>
      {/* Hero */}
      <section style={{ backgroundColor: HERO_BG }}>
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 px-4 py-10 md:grid-cols-2 md:gap-10 md:px-6 md:py-[50px] md:pb-20">
          <div>
            <h1
              className="font-heading text-[40px] font-black capitalize leading-[55px] tracking-[-0.6px] md:text-[45px]"
              style={{ color: ORANGE }}
            >
              {COPY.heroTitle}
            </h1>
            <div className="mt-3 space-y-0">
              {COPY.heroParagraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className={`text-base leading-[26px] tracking-[-0.5px] md:text-lg md:leading-7 ${i > 0 ? 'pt-2.5 md:pt-3' : ''} ${i === 0 ? 'text-left' : 'text-justify md:text-left'}`}
                  style={{ color: BROWN }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="hidden justify-end md:flex">
            <Image
              src={IMG.heroHandshake}
              alt=""
              width={648}
              height={677}
              className="h-auto w-[70%] max-w-[648px] rounded-lg object-contain"
              sizes="35vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* Donation + Sponsorship */}
      <section style={{ backgroundColor: DONATION_BG }}>
        <div className="mx-auto max-w-[900px] px-4 py-[30px] pb-[100px] md:px-6 md:py-[50px] md:pb-[100px]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <PaymentCard
              title={COPY.lightning.title}
              description={COPY.lightning.description}
              icon={<LightningIcon />}
              dividerRight
            >
              <SupportUsLightningForm />
            </PaymentCard>
            <OnchainCard />
          </div>

          {/* Sponsorship */}
          <div className="pt-10 text-center md:pt-[40px]">
            <h2 className="font-heading text-[40px] font-black capitalize leading-[38px] tracking-[-0.6px] md:text-[45px] md:leading-[70px]">
              <Link href={COPY.sponsor.titleHref} className="hover:opacity-90" style={{ color: ORANGE }}>
                {COPY.sponsor.title}
              </Link>
            </h2>
            <p
              className="mx-auto mt-3 max-w-[720px] text-base leading-[26px] tracking-[-0.5px] md:mt-3 md:text-lg md:leading-7"
              style={{ color: BROWN }}
            >
              {COPY.sponsor.description}
            </p>
            <div className="mt-3 flex justify-center md:mt-3">
              <a
                href={SPONSORSHIP_DECK_URL}
                target="_blank"
                rel="noopener noreferrer"
                download="African-Bitcoiners-sponsorship-deck-Final.pdf"
                className="inline-block rounded-lg px-10 py-[22px] text-base font-bold tracking-[-0.4px] text-white transition-colors md:px-[100px]"
                style={{ backgroundColor: ORANGE }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = NAVY
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = ORANGE
                }}
              >
                {COPY.sponsor.buttonLabel}
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
