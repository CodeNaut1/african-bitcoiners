import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { IMG, LEARN_ITEMS, LINKS, PERSONAS } from '@/components/TreasuryManifestoPage/data'
import { ShareManifestoButton } from '@/components/TreasuryManifestoPage/ShareManifestoButton'

const HERO_CREAM = '#FEFAF0'
const SECTION_CREAM = '#FEFBF6'
const WHO_CREAM = '#FBF6EF'
const HEADING = '#37312C'
const HERO_ACCENT = '#F45341'
const CTA_ORANGE = '#FD5A47'

function LearnIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5 1C10.6435 1 8.86301 1.7375 7.55025 3.05025C6.2375 4.36301 5.5 6.14348 5.5 8C5.5 9.20145 5.79462 10.7088 7.29289 12.2071C7.30343 12.2176 7.3142 12.2279 7.32519 12.238C7.89218 12.7564 8.27899 13.4423 8.42933 14.1957C8.53741 14.7373 9.06409 15.0887 9.60569 14.9807C10.1473 14.8726 10.4987 14.3459 10.3907 13.8043C10.1586 12.6414 9.56407 11.5822 8.69272 10.7785C7.66385 9.74236 7.5 8.79486 7.5 8C7.5 6.67392 8.02678 5.40215 8.96447 4.46447C9.90215 3.52678 11.1739 3 12.5 3C13.8261 3 15.0979 3.52678 16.0355 4.46447C16.9732 5.40215 17.5 6.67392 17.5 8L17.5001 8.01696C17.5089 8.53205 17.4085 9.04315 17.2055 9.51666C17.0026 9.99017 16.7017 10.4154 16.3227 10.7643C16.3126 10.7736 16.3026 10.7831 16.2929 10.7929C15.4311 11.6547 14.8324 12.589 14.6065 13.8193C14.5067 14.3625 14.8661 14.8838 15.4093 14.9835C15.9525 15.0833 16.4738 14.7238 16.5735 14.1807C16.7066 13.456 17.0443 12.8733 17.6937 12.2206C18.2727 11.6833 18.7326 11.0306 19.0438 10.3045C19.3568 9.57416 19.5123 8.78605 19.5 7.99162C19.4978 6.13813 18.7605 4.36103 17.4497 3.05025C16.137 1.7375 14.3565 1 12.5 1ZM8.5 18C8.5 17.4477 8.94772 17 9.5 17H15.5C16.0523 17 16.5 17.4477 16.5 18C16.5 18.5523 16.0523 19 15.5 19H9.5C8.94772 19 8.5 18.5523 8.5 18ZM9.5 22C9.5 21.4477 9.94772 21 10.5 21H14.5C15.0523 21 15.5 21.4477 15.5 22C15.5 22.5523 15.0523 23 14.5 23H10.5C9.94772 23 9.5 22.5523 9.5 22Z"
        fill="#020617"
      />
    </svg>
  )
}

function WhoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 7C6 5.34315 7.34315 4 9 4C10.6569 4 12 5.34315 12 7C12 8.65685 10.6569 10 9 10C7.34315 10 6 8.65685 6 7ZM9 2C6.23858 2 4 4.23858 4 7C4 9.76142 6.23858 12 9 12C11.7614 12 14 9.76142 14 7C14 4.23858 11.7614 2 9 2ZM6 14C4.67392 14 3.40215 14.5268 2.46447 15.4645C1.52678 16.4021 1 17.6739 1 19V21C1 21.5523 1.44772 22 2 22C2.55228 22 3 21.5523 3 21V19C3 18.2044 3.31607 17.4413 3.87868 16.8787C4.44129 16.3161 5.20435 16 6 16H12C12.7957 16 13.5587 16.3161 14.1213 16.8787C14.6839 17.4413 15 18.2044 15 19V21C15 21.5523 15.4477 22 16 22C16.5523 22 17 21.5523 17 21V19C17 17.6739 16.4732 16.4021 15.5355 15.4645C14.5979 14.5268 13.3261 14 12 14H6ZM18.0318 14.8799C18.1698 14.3451 18.7153 14.0236 19.25 14.1616C20.3227 14.4386 21.273 15.064 21.9517 15.9395C22.6304 16.8151 22.9992 17.8913 23 18.9991V18.9999V20.9999C23 21.5522 22.5523 21.9999 22 21.9999C21.4477 21.9999 21 21.5522 21 20.9999V19.0006V19.0003C20.9994 18.3357 20.7782 17.6901 20.371 17.1649C19.9638 16.6395 19.3936 16.2643 18.75 16.0981C18.2153 15.9601 17.8937 15.4146 18.0318 14.8799ZM16.248 2.16113C15.713 2.02414 15.1682 2.34682 15.0312 2.88184C14.8943 3.41687 15.2169 3.96164 15.752 4.09863C16.3973 4.26386 16.9692 4.63916 17.3777 5.16537C17.7861 5.69157 18.0078 6.33876 18.0078 7.00488C18.0078 7.67101 17.7861 8.31819 17.3777 8.8444C16.9692 9.37061 16.3973 9.74591 15.752 9.91113C15.2169 10.0481 14.8943 10.5929 15.0312 11.1279C15.1682 11.6629 15.713 11.9856 16.248 11.8486C17.3236 11.5733 18.2768 10.9478 18.9576 10.0707C19.6383 9.19373 20.0078 8.1151 20.0078 7.00488C20.0078 5.89467 19.6383 4.81603 18.9576 3.93902C18.2768 3.06201 17.3236 2.43651 16.248 2.16113Z"
        fill="#020617"
      />
    </svg>
  )
}

function IconPill({ icon, children }: { icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-black px-[15px] py-2 text-[15px] font-medium tracking-[-0.4px] text-[#37312C] md:gap-2.5 md:text-[17px]">
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  )
}

function DownloadButton({ label, className = '' }: { label: string; className?: string }) {
  return (
    <a
      href={LINKS.pdf}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block rounded-md bg-[#F45341] px-[80px] py-[18px] text-[15px] font-semibold tracking-[-0.4px] text-white shadow-[0px_2px_3px_rgba(16,24,40,0.05)] transition-colors hover:bg-[#37312C] md:px-[110px] md:py-[23px] ${className}`}
    >
      {label}
    </a>
  )
}

function LearnItem({ text, iconSrc, iconH }: { text: string; iconSrc: string; iconH: number }) {
  return (
    <div className="flex flex-col items-start pr-4 lg:pr-8">
      <Image
        src={iconSrc}
        alt=""
        width={40}
        height={iconH}
        className="mb-4 h-[45px] w-10 object-contain"
      />
      <p
        className="text-left text-base font-medium leading-[25px] tracking-[-0.4px] md:text-[17px]"
        style={{ color: HEADING }}
      >
        {text}
      </p>
    </div>
  )
}

function PersonaCard({
  title,
  description,
  image,
  width,
  height,
  featured = false,
}: {
  title: string
  description: string
  image: string
  width: number
  height: number
  featured?: boolean
}) {
  return (
    <div className="flex min-w-[28%] shrink-0 snap-center flex-col items-center text-center sm:min-w-[22%] lg:min-w-0 lg:flex-1">
      <Image
        src={image}
        alt={title}
        width={width}
        height={height}
        className={`mx-auto h-auto object-contain ${featured ? 'w-[58%]' : 'w-1/2'}`}
        sizes="(max-width: 1024px) 28vw, 100px"
      />
      <h6
        className="mt-1 font-heading text-[22px] font-bold tracking-[-0.5px]"
        style={{ color: HEADING }}
      >
        {title}
      </h6>
      <p
        className="mt-1 px-1 text-[15px] font-medium leading-[23px] tracking-[-0.4px]"
        style={{ color: HEADING }}
      >
        {description}
      </p>
    </div>
  )
}

export function TreasuryManifestoPage() {
  return (
    <div className="overflow-x-hidden font-sans">
      {/* Hero */}
      <section className="px-4 py-10 md:px-6 md:py-[40px]" style={{ backgroundColor: HERO_CREAM }}>
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 px-[10px] md:grid-cols-2 md:gap-6">
          {/* Cover — first on mobile, right column on desktop */}
          <div className="order-1 flex justify-center md:order-2 md:justify-end">
            <Image
              src={IMG.cover}
              alt="African Bitcoin Treasury Manifesto cover"
              width={1275}
              height={1301}
              className="h-auto w-full max-w-[320px] object-contain sm:max-w-[400px] md:max-w-none"
              sizes="(max-width: 768px) 85vw, 50vw"
              priority
            />
          </div>

          <div className="order-2 text-start md:order-1">
            <h1
              className="font-heading text-[40px] font-semibold leading-[50px] tracking-[-0.6px] md:text-[45px] md:leading-[60px]"
              style={{ color: HEADING }}
            >
              Why African Businesses Need a{' '}
              <span className="font-black" style={{ color: HERO_ACCENT }}>
                Bitcoin Reserve
              </span>
            </h1>
            <p
              className="pt-5 text-[17px] leading-7 tracking-[-0.5px]"
              style={{ color: '#000000' }}
            >
              A powerful manifesto for founders, CFOs, and forward-thinking entrepreneurs ready to
              preserve value and lead Africa&apos;s financial future.
            </p>
            <div className="pt-[10px]">
              <DownloadButton label="Download Manifesto" />
            </div>
          </div>
        </div>
      </section>

      {/* What you'll learn */}
      <section className="px-4 py-10 sm:px-6 md:py-[30px] md:pb-[50px]" style={{ backgroundColor: SECTION_CREAM }}>
        <div className="mx-auto flex max-w-[1000px] flex-col items-center text-center">
          <IconPill icon={<LearnIcon />}>What You&apos;ll Learn</IconPill>
          <h3
            className="mt-4 font-heading text-[30px] font-medium leading-10 tracking-[-0.5px] md:text-[35px] md:leading-[60px]"
            style={{ color: HEADING }}
          >
            This Manifesto Covers
          </h3>

          <div className="mt-8 grid w-full grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-12">
            {LEARN_ITEMS.map((text, i) => (
              <LearnItem key={text} text={text} iconSrc={IMG.icons[i]} iconH={i === 2 ? 46 : 45} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <DownloadButton label="Download Manifesto" />
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section
        className="px-4 py-10 pb-5 sm:px-6 md:py-[50px] md:pb-[100px]"
        style={{ backgroundColor: WHO_CREAM }}
      >
        <div className="mx-auto max-w-[1000px] text-center">
          <IconPill icon={<WhoIcon />}>Who It Is For</IconPill>
          <h3
            className="mt-4 font-heading text-[30px] font-medium leading-10 tracking-[-0.5px] md:text-[35px] md:leading-[60px]"
            style={{ color: HEADING }}
          >
            This Manifesto is for You if You&apos;re a
          </h3>

          <div className="-mx-4 mt-8 flex items-end justify-center gap-2 overflow-x-auto px-4 pb-2 snap-x snap-mandatory lg:mx-0 lg:gap-3 lg:overflow-visible lg:px-0">
            {PERSONAS.map((person) => (
              <PersonaCard key={person.title} {...person} />
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="px-4 py-10 pb-10 sm:px-6 md:py-[50px] md:pb-[100px]" style={{ backgroundColor: SECTION_CREAM }}>
        <div className="mx-auto flex max-w-[1000px] flex-col items-center text-center">
          <IconPill>Bitcoin Isn&apos;t the Future. It&apos;s the Present.</IconPill>
          <p
            className="mt-8 max-w-[800px] font-heading text-[30px] font-medium leading-10 tracking-[-0.5px] md:text-[35px] md:leading-[45px]"
            style={{ color: HEADING }}
          >
            Thousands of companies around the world are already holding Bitcoin in their treasuries.
            Africa leads the world in grassroots Bitcoin adoption. It&apos;s time for African
            businesses to lead from the top too.
          </p>
          <div className="mt-8 w-full max-w-[700px]">
            <div
              className="rounded-[10px] border border-black px-[22px] py-[22px] md:px-[45px] md:py-[45px]"
              style={{ backgroundColor: WHO_CREAM }}
            >
              <p
                className="text-center text-lg font-medium leading-7 tracking-[-0.5px] md:text-[22px] md:leading-7"
                style={{ color: '#000000' }}
              >
                &ldquo;Africa isn&apos;t just adopting Bitcoin—it&apos;s redefining how the world uses
                it.&rdquo;
              </p>
            </div>
            <p className="mt-3 text-right text-base italic tracking-[-0.4px]" style={{ color: HEADING }}>
              — The African Bitcoiners
            </p>
          </div>
        </div>
      </section>

      {/* CTA + email — single orange block */}
      <section className="px-4 pb-[100px] pt-[30px] sm:px-6 md:px-[10px] md:pt-[50px]" style={{ backgroundColor: CTA_ORANGE }}>
        <div className="mx-auto max-w-[1000px]">
          <div
            className="rounded-[18px] border border-black px-5 py-10 text-center md:px-10 md:py-[40px]"
            style={{ backgroundColor: '#FEFBF6' }}
          >
            <h2
              className="font-heading text-[30px] font-bold leading-10 tracking-[-0.6px] md:text-[35px] md:leading-[35px]"
              style={{ color: HEADING }}
            >
              Ready to Start?
            </h2>
            <p className="mt-3 text-base leading-7 tracking-[-0.4px] md:text-[17px]" style={{ color: HEADING }}>
              Download the Manifesto &amp; Build Your Bitcoin Reserve Today.
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-5">
              <DownloadButton
                label="Download PDF"
                className="shadow-[0px_6px_6px_rgba(0,0,0,0.08)] sm:shrink-0"
              />
              <ShareManifestoButton />
            </div>
          </div>

          <div className="mx-auto mt-[30px] max-w-[800px] text-center md:mt-10">
            <p className="text-base leading-7 text-white md:text-[17px]">
              Want to consult on building a Bitcoin treasury strategy for your organization?
            </p>
            <div className="mt-4 flex justify-center">
              <Link
                href={LINKS.email}
                className="inline-block rounded-full border border-[#FEFBF6] px-[15px] py-2 text-[15px] font-medium tracking-[-0.4px] text-[#FEFBF6] transition-opacity hover:opacity-90 md:text-[17px]"
              >
                Email us at <strong>sarahwhite@bitcoiners.africa</strong>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
