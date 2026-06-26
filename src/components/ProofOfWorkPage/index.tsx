'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { IMG, PROJECTS, SUPPORT_BULLETS } from '@/components/ProofOfWorkPage/data'
import { ReceiptHero } from '@/components/ProofOfWorkPage/ReceiptHero'
import { TestimonialCarousel } from '@/components/ProofOfWorkPage/TestimonialCarousel'

const HERO_BG = '#FDF7EB'
const MISSION_BG = '#FDF7EB'
const GRID_BG = '#FFFBF5'
const CARD_BG = '#FFFAF0'
const SUPPORT_BG = '#F7F4EA'
const QR_BG = '#FBF9F5'
const ORANGE = '#F6841A'
const TEXT_DARK = '#4D4B4A'
const TEXT_MID = '#4D4D4D'
const TEXT_BODY = '#4B4B49'

function MissionIconOrange() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none" aria-hidden>
      <circle cx="22.3337" cy="22.3337" r="21.8337" fill="#F6841A" stroke="#4D4B4A" />
      <path
        d="M15.0263 22.457C15.0263 18.9134 16.8613 16.5088 19.7405 16.5088C22.6039 16.5088 24.439 18.9134 24.439 22.457C24.439 26.0165 22.683 28.3736 19.7405 28.3736C16.7822 28.3736 15.0263 26.0165 15.0263 22.457ZM16.5608 22.457C16.5608 25.273 17.7314 26.9815 19.7405 26.9815C21.7496 26.9815 22.9045 25.273 22.9045 22.457C22.9045 19.6095 21.7496 17.901 19.7405 17.901C17.7314 17.901 16.5608 19.6095 16.5608 22.457ZM27.8617 18.1224H25.4571V16.7303H29.3488V28.168H27.8617V18.1224Z"
        fill="black"
      />
    </svg>
  )
}

function MissionIconGreen() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none" aria-hidden>
      <circle cx="22.3337" cy="22.3337" r="21.8337" fill="#2F691D" stroke="#4D4B4A" />
      <path
        d="M12.8578 22.457C12.8578 18.9134 14.6929 16.5088 17.572 16.5088C20.4354 16.5088 22.2705 18.9134 22.2705 22.457C22.2705 26.0165 20.5145 28.3736 17.572 28.3736C14.6138 28.3736 12.8578 26.0165 12.8578 22.457ZM14.3923 22.457C14.3923 25.273 15.5629 26.9815 17.572 26.9815C19.5811 26.9815 20.736 25.273 20.736 22.457C20.736 19.6095 19.5811 17.901 17.572 17.901C15.5629 17.901 14.3923 19.6095 14.3923 22.457ZM31.1827 28.1521L23.4627 28.168V26.9815L27.1487 23.8017C28.9996 22.2039 29.5216 21.4288 29.5216 20.2106C29.5216 18.771 28.699 17.9168 27.3227 17.9168C25.9147 17.9168 24.9972 18.9451 24.9655 20.5745H23.4152C23.4627 18.1224 25.013 16.5246 27.3385 16.5246C29.6324 16.5246 31.1036 17.9168 31.1036 20.1157C31.1036 21.7452 30.2968 22.9 28.2719 24.656L25.8989 26.7126H31.1827V28.1521Z"
        fill="#FFFBF5"
      />
    </svg>
  )
}

function MissionIconBurnt() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none" aria-hidden>
      <circle cx="22.3337" cy="22.3337" r="21.8337" fill="#FF6801" stroke="#4D4B4A" />
      <path
        d="M12.9582 22.457C12.9582 18.9134 14.7933 16.5088 17.6725 16.5088C20.5358 16.5088 22.3709 18.9134 22.3709 22.457C22.3709 26.0165 20.6149 28.3736 17.6725 28.3736C14.7142 28.3736 12.9582 26.0165 12.9582 22.457ZM14.4927 22.457C14.4927 25.273 15.6634 26.9815 17.6725 26.9815C19.6816 26.9815 20.8364 25.273 20.8364 22.457C20.8364 19.6095 19.6816 17.901 17.6725 17.901C15.6634 17.901 14.4927 19.6095 14.4927 22.457ZM26.7925 22.2514H25.6535V21.2231L28.8966 18.1066H23.7551V16.7303H30.8582V17.9801L27.7259 20.97C29.6717 21.2073 31.143 22.5203 31.143 24.5769C31.143 26.8866 29.4028 28.3578 27.0773 28.3578C24.8309 28.3578 23.2173 26.9815 23.2173 24.6085H24.7518C24.7518 26.0956 25.6693 26.9657 27.1089 26.9657C28.596 26.9657 29.561 26.0165 29.561 24.5452C29.561 23.1689 28.6118 22.2514 26.7925 22.2514Z"
        fill="#FDF7EA"
      />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="47" viewBox="0 0 47 47" fill="none" aria-hidden>
      <path
        d="M17.6252 17.6264H29.3752V29.3764M29.3752 17.6264L17.6252 29.3762M43.0832 23.5013C43.0832 34.3169 34.3154 43.0846 23.4998 43.0846C12.6843 43.0846 3.9165 34.3169 3.9165 23.5013C3.9165 12.6857 12.6843 3.91797 23.4998 3.91797C34.3154 3.91797 43.0832 12.6857 43.0832 23.5013Z"
        stroke="#4D4D4D"
        strokeWidth="2.20312"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        stroke="#826A56"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Eyebrow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="mb-2.5 flex items-center gap-2.5">
      {icon}
      <span className="text-[15px] font-medium tracking-[-0.3px]" style={{ color: TEXT_BODY }}>
        {label}
      </span>
    </div>
  )
}

function MissionHeading({ children, align = 'start' }: { children: React.ReactNode; align?: 'start' | 'end' | 'center' }) {
  return (
    <h3
      className={`font-heading text-[42px] font-medium leading-[45px] tracking-[-0.6px] md:text-[70px] md:leading-[75px] ${
        align === 'end' ? 'text-end md:text-end' : align === 'center' ? 'text-center' : 'text-start'
      }`}
      style={{ color: TEXT_DARK }}
    >
      {children}
    </h3>
  )
}

type Project = (typeof PROJECTS)[number]

function ProjectCard({ project }: { project: Project }) {
  const isExternal = project.href.startsWith('http')
  const LinkWrap = isExternal ? 'a' : Link
  const linkProps = isExternal
    ? { href: project.href, target: '_blank', rel: 'noopener noreferrer' }
    : { href: project.href }

  return (
    <div
      className="flex h-full flex-col rounded-[18px] border border-black/10 p-[25px] md:mx-2.5 md:p-[30px]"
      style={{ backgroundColor: CARD_BG }}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex flex-wrap items-baseline gap-x-1">
          {'titleLines' in project && project.titleLines ? (
            project.titleLines.map((line) => (
              <h3
                key={line}
                className="font-heading text-[28px] font-medium leading-[35px] tracking-[-0.6px]"
                style={{ color: TEXT_MID }}
              >
                {line}
              </h3>
            ))
          ) : (
            <h3
              className="font-heading text-[28px] font-medium leading-[35px] tracking-[-0.6px]"
              style={{ color: TEXT_MID }}
            >
              {project.title}
            </h3>
          )}
        </div>
        <LinkWrap {...(linkProps as any)} className="shrink-0 transition-opacity hover:opacity-80" aria-label={`Visit ${project.title}`}>
          <ExternalLinkIcon />
        </LinkWrap>
      </div>

      {'descriptionHtml' in project && project.descriptionHtml ? (
        <p
          className="mt-5 text-[15px] leading-[22px] tracking-[-0.3px]"
          style={{ color: TEXT_BODY }}
          dangerouslySetInnerHTML={{ __html: project.descriptionHtml }}
        />
      ) : (
        <p className="mt-5 text-[15px] leading-[22px] tracking-[-0.3px]" style={{ color: TEXT_BODY }}>
          {project.description}
        </p>
      )}

      <div className="mt-5 overflow-hidden rounded-lg">
        <Image
          src={project.image}
          alt={project.title}
          width={project.width}
          height={project.height}
          className="h-auto w-full object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
    </div>
  )
}

export function ProofOfWorkPage() {
  return (
    <article>
      {/* Hero */}
      <section style={{ backgroundColor: HERO_BG }}>
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 px-4 py-[50px] md:grid-cols-2 md:px-6 md:pb-20 md:pt-[50px]">
          <div className="md:pr-8">
            <h1
              className="text-center font-heading text-[80px] font-medium leading-[75px] tracking-[-0.8px] md:text-start md:text-[95px]"
              style={{ color: TEXT_DARK }}
            >
              Proof of{' '}
              <span className="italic" style={{ color: ORANGE }}>
                Work{' '}
              </span>
            </h1>
            <p
              className="mt-5 text-center text-lg leading-[30px] tracking-[-0.3px] md:px-0 md:text-start md:text-[22px] md:leading-[38px]"
              style={{ color: TEXT_MID }}
            >
              We don&apos;t just talk about Bitcoin in Africa. We build, we ship, and{' '}
              <strong>we measure real impact.</strong>
            </p>
            <div className="mt-5 flex justify-center md:justify-start">
              <Link
                href="/about-us/support-us/"
                className="inline-block rounded-full px-[35px] py-[15px] text-[13px] font-bold uppercase tracking-[-0.3px] text-[#FFFBF5] shadow-sm transition-colors hover:opacity-90 md:text-[17px]"
                style={{ backgroundColor: ORANGE }}
              >
                Support oUR mISSION
              </Link>
            </div>
          </div>
          <ReceiptHero />
        </div>
      </section>

      {/* Mission row 1 */}
      <section style={{ backgroundColor: MISSION_BG }}>
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-8 px-4 py-[30px] md:grid-cols-2 md:px-6 md:pb-[50px] md:pt-[30px]">
          <div>
            <Eyebrow icon={<MissionIconOrange />} label="OUR MISSION" />
            <MissionHeading>
              We are building toward a future where{' '}
              <span style={{ color: ORANGE }}>
                one billion Africans hold the keys to at least one million sats each.
              </span>
            </MissionHeading>
          </div>
          <div className="flex justify-center md:justify-end">
            <Image
              src={IMG.bitcoinKeys}
              alt=""
              width={490}
              height={435}
              className="h-auto w-full max-w-[490px]"
              sizes="(max-width: 768px) 90vw, 45vw"
            />
          </div>
        </div>
      </section>

      {/* Mission row 2 */}
      <section style={{ backgroundColor: MISSION_BG }}>
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-8 px-4 pb-10 md:grid-cols-2 md:flex-row-reverse md:px-6 md:pb-[50px]">
          <div className="order-2 md:order-1">
            <Image
              src={IMG.bitcoinFlower}
              alt=""
              width={517}
              height={520}
              className="mx-auto h-auto w-full max-w-[517px]"
              sizes="(max-width: 768px) 90vw, 45vw"
            />
          </div>
          <div className="order-1 md:order-2">
            <Eyebrow icon={<MissionIconGreen />} label="WHY THIS PAGE EXISTS" />
            <MissionHeading align="end">
              <span className="md:text-end">
                We believe in accountability that is why we openly share{' '}
                <span style={{ color: ORANGE }}>
                  what we are building, what is working, what is growing and where we are going.
                </span>
              </span>
            </MissionHeading>
          </div>
        </div>
      </section>

      {/* Initiatives intro */}
      <section style={{ backgroundColor: MISSION_BG }}>
        <div className="mx-auto max-w-[1100px] px-4 pb-10 md:px-6 md:pb-[50px]">
          <Eyebrow icon={<MissionIconBurnt />} label="OUR INITIATIVES" />
          <MissionHeading>
            We build tools, programs, and systems designed specifically for Bitcoin adoption in Africa.
          </MissionHeading>
        </div>
      </section>

      {/* Project grid */}
      <section style={{ backgroundColor: GRID_BG }}>
        <div className="mx-auto max-w-[1200px] px-4 py-[30px] md:px-6 md:py-[50px]">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-0">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ backgroundColor: GRID_BG }}>
        <div className="mx-auto max-w-[1200px] px-4 pb-10 md:px-6">
          <h2
            className="text-center font-heading text-[42px] font-medium leading-[45px] tracking-[-0.6px] md:text-[65px] md:leading-[75px]"
            style={{ color: TEXT_DARK }}
          >
            What People are saying
          </h2>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Support */}
      <section style={{ backgroundColor: SUPPORT_BG }}>
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-stretch gap-0 px-2.5 pb-[100px] pt-0 md:grid-cols-2 md:px-6 md:pb-[150px] md:pt-[50px]">
          <div className="flex flex-col justify-center px-4 py-10 md:px-8">
            <h2
              className="font-heading text-[40px] font-medium leading-[45px] tracking-[-0.3px] md:text-[60px]"
              style={{ color: TEXT_DARK }}
            >
              Support Our Mission
            </h2>
            <p
              className="mb-2.5 mt-3 text-[17px] leading-7 tracking-[-0.3px] md:text-[19px] md:leading-8"
              style={{ color: '#4C2C12' }}
            >
              Help us onboard millions of Africans to Bitcoin through education, tools, and community.
            </p>
            <ul className="mb-6 space-y-3">
              {SUPPORT_BULLETS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-[22px]" style={{ color: TEXT_BODY }}>
                  <span className="mt-0.5 shrink-0">
                    <CheckIcon />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/about-us/support-us/"
                className="inline-flex justify-center rounded-full px-[35px] py-[15px] text-[15px] font-bold tracking-[-0.3px] text-[#FFFBF5] shadow-sm transition-colors hover:opacity-90"
                style={{ backgroundColor: ORANGE }}
              >
                Support Our Mission
              </Link>
              <Link
                href="/bitcoin-education-partnership/"
                className="inline-flex justify-center rounded-full border border-[#E0E0E0] bg-[#FFFBF5] px-[50px] py-[15px] text-[15px] tracking-[-0.3px] shadow-sm transition-colors hover:bg-white sm:-ml-9"
                style={{ color: TEXT_MID }}
              >
                Partner With Us
              </Link>
            </div>
          </div>

          <div
            className="flex items-center justify-center p-2.5 md:p-[60px]"
            style={{ backgroundColor: QR_BG }}
          >
            <Image
              src={IMG.supportQr}
              alt="African Bitcoiners support QR code"
              width={470}
              height={475}
              className="h-auto w-full max-w-[470px]"
              sizes="(max-width: 768px) 80vw, 470px"
            />
          </div>
        </div>
      </section>
    </article>
  )
}
