import Link from 'next/link'
import React from 'react'

import { SavingsChallengeForm } from '@/components/forms/SavingsChallengeForm'
import {
  ANDROID_CLIENTS,
  COPY,
  IMG,
  INTRO,
  IOS_CLIENTS,
  LINKS,
  PUBLIC_KEY,
  REWARD_STEPS,
  SETUP_STEPS,
  TERMS,
  WEB_CLIENTS,
} from '@/components/NostrGuidePage/data'

const PAGE_BG = '#FFFCFA'
const HEADING = '#384958'
const BODY = '#384958'
const TERM_BG = '#F6F6F6'
const SETUP_PANEL = '#FFA500'
const SETUP_INNER = '#FFF8F0'
const LINK_COLOR = '#E1640C'
const HERO_OVERLAY = 'rgba(57, 33, 56, 0.72)'

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80" style={{ color: LINK_COLOR }}>
      {children}
    </a>
  )
}

function ClientList({ label, clients }: { label: string; clients: readonly { name: string; href: string }[] }) {
  return (
    <li>
      {label}:{' '}
      {clients.map((client, index) => (
        <React.Fragment key={client.href}>
          {index > 0 && (index === clients.length - 1 ? ', and ' : ', ')}
          <ExternalLink href={client.href}>{client.name}</ExternalLink>
        </React.Fragment>
      ))}
    </li>
  )
}

function TermCard({ title, description, link }: (typeof TERMS)[number]) {
  return (
    <article className="h-full px-5 py-6 md:px-6" style={{ backgroundColor: TERM_BG }}>
      <h3 className="font-heading text-lg font-bold tracking-[-0.3px]" style={{ color: HEADING }}>
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed tracking-[-0.2px] md:text-base" style={{ color: BODY }}>
        {description}{' '}
        {link && (
          <ExternalLink href={link.href}>{link.label}</ExternalLink>
        )}
      </p>
    </article>
  )
}

export function NostrGuidePage() {
  return (
    <div className="font-body" style={{ backgroundColor: PAGE_BG }}>
      <section
        className="relative bg-cover bg-center bg-no-repeat px-4 py-20 sm:px-6 md:py-24"
        style={{ backgroundImage: `url(${IMG.heroBg})` }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: HERO_OVERLAY }} aria-hidden />
        <div className="relative mx-auto max-w-[1200px]">
          <h1 className="max-w-[640px] font-heading text-[32px] font-bold leading-tight tracking-[-0.6px] text-white md:text-[40px]">
            {COPY.heroTitle}
          </h1>
          <p className="mt-5 max-w-[640px] text-base leading-relaxed tracking-[-0.2px] text-white/90 md:text-lg">
            {COPY.heroSubtitle}
          </p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 md:py-14">
        <div className="mx-auto max-w-[900px] space-y-5">
          {INTRO.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-base leading-relaxed tracking-[-0.2px] md:text-lg" style={{ color: BODY }}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 md:pb-16">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold tracking-[-0.5px] md:text-[28px]" style={{ color: HEADING }}>
            {COPY.termsTitle}
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TERMS.map((term) => (
              <TermCard key={term.title} {...term} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 md:pb-20">
        <div
          className="mx-auto max-w-[1200px] rounded-[35px] px-5 py-10 sm:px-8 md:px-12 md:py-12"
          style={{ backgroundColor: SETUP_PANEL }}
        >
          <h2 className="text-center font-heading text-2xl font-bold tracking-[-0.5px] text-white md:text-[28px]">
            {COPY.setupTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-[900px] whitespace-pre-line text-center text-sm leading-relaxed text-white/95 md:text-base">
            {COPY.setupIntro}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            <article className="rounded-sm px-5 py-6 md:px-6" style={{ backgroundColor: SETUP_INNER }}>
              <h3 className="font-heading text-lg font-bold" style={{ color: SETUP_PANEL }}>
                {COPY.pubkeyTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed md:text-base" style={{ color: BODY }}>
                {COPY.pubkeyBody}{' '}
                <strong>Here is our public key as an example: {PUBLIC_KEY}</strong>
              </p>
            </article>
            <article className="rounded-sm px-5 py-6 md:px-6" style={{ backgroundColor: SETUP_INNER }}>
              <h3 className="font-heading text-lg font-bold" style={{ color: SETUP_PANEL }}>
                {COPY.privateKeyTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed md:text-base" style={{ color: BODY }}>
                {COPY.privateKeyBody}
              </p>
            </article>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <article className="rounded-sm px-5 py-6 md:px-6" style={{ backgroundColor: SETUP_INNER }}>
              <h3 className="font-heading text-lg font-bold" style={{ color: SETUP_PANEL }}>
                {COPY.clientsTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed md:text-base" style={{ color: BODY }}>
                {COPY.clientsIntro}
              </p>
              <ul className="nostr-guide-clients mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed md:text-base" style={{ color: BODY }}>
                <ClientList label="Web Clients" clients={WEB_CLIENTS} />
                <ClientList label="Android Clients" clients={ANDROID_CLIENTS} />
                <ClientList label="iOS Clients" clients={IOS_CLIENTS} />
              </ul>
              <p className="mt-4 text-sm md:text-base">
                <ExternalLink href={LINKS.moreClients}>See more clients here</ExternalLink>
              </p>
            </article>
            <article className="rounded-sm px-5 py-6 md:px-6" style={{ backgroundColor: SETUP_INNER }}>
              <h3 className="font-heading text-lg font-bold" style={{ color: SETUP_PANEL }}>
                {COPY.setupStepsTitle}
              </h3>
              <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed md:text-base" style={{ color: BODY }}>
                {SETUP_STEPS.map((step, index) => (
                  <li key={step}>
                    {index === 0 ? (
                      <>
                        Choose a client above or from the{' '}
                        <ExternalLink href={LINKS.moreClients}>recommended ones on the Nostr website.</ExternalLink>
                      </>
                    ) : (
                      step
                    )}
                  </li>
                ))}
              </ol>
            </article>
          </div>

          <div className="mt-8 rounded-sm px-5 py-6 md:px-6" style={{ backgroundColor: SETUP_INNER }}>
            <p className="whitespace-pre-line text-sm leading-relaxed md:text-base" style={{ color: BODY }}>
              {COPY.rewardIntro}
            </p>
            <ul className="mt-5 space-y-4">
              {REWARD_STEPS.map((step) => (
                <li key={step} className="flex gap-3 text-sm leading-relaxed md:text-base" style={{ color: BODY }}>
                  <span className="mt-0.5 shrink-0 text-[#E1640C]" aria-hidden>
                    →
                  </span>
                  <span>
                    {step === 'Join the Million Sat Challenge.' ? (
                      <>
                        Join the{' '}
                        <Link href={LINKS.millionSatChallenge} className="underline hover:opacity-80" style={{ color: LINK_COLOR }}>
                          Million Sat Challenge
                        </Link>
                        .
                      </>
                    ) : step === 'Follow us on Nostr.' ? (
                      <>
                        <ExternalLink href={LINKS.nostrProfile}>Follow us on Nostr.</ExternalLink>
                      </>
                    ) : step.startsWith('Post your thoughts') ? (
                      <>
                        Post your thoughts on the most important reasons why Africa will benefit from Bitcoin and tag{' '}
                        @AfricanBitcoiners. If your post is good, we will repost it to help you get followers (
                        <strong>{PUBLIC_KEY}</strong>).
                      </>
                    ) : (
                      step
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="MSC" className="scroll-mt-24 px-4 pb-16 sm:px-6 md:pb-20">
        <div className="mx-auto max-w-[640px]">
          <h2 className="mb-6 text-center font-heading text-xl font-bold tracking-[-0.4px] md:text-2xl" style={{ color: HEADING }}>
            {COPY.mscFormTitle}
          </h2>
          <SavingsChallengeForm variant="million-sat-challenge" />
        </div>
      </section>
    </div>
  )
}
