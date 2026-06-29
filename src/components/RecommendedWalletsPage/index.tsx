import Link from 'next/link'
import React from 'react'

import {
  DESKTOP_COLUMNS,
  DESKTOP_WALLETS,
  IMG,
  LINKS,
  MOBILE_COLUMNS,
  MOBILE_WALLETS,
  PREFERRED_DESKTOP_HREF,
  PREFERRED_MOBILE_HREF,
} from '@/components/RecommendedWalletsPage/data'
import { WalletComparisonTable } from '@/components/RecommendedWalletsPage/WalletComparisonTable'

type Column = { key: string; label: string; tooltip: string }

const ACCENT = '#652A00'
const ORANGE = '#FF6A00'
const ORANGE_LINK = '#ff6a00'

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-center font-heading text-2xl font-black capitalize tracking-[-0.8px] md:text-3xl md:leading-[70px]"
      style={{ color: ORANGE }}
    >
      {children}
    </h2>
  )
}

function WalletSection<T extends { href: string; logo: string; logoAlt: string; description: string }>({
  titleAccent,
  preferredBadge,
  preferredWalletHref,
  columns,
  wallets,
}: {
  titleAccent: 'Desktop Wallets' | 'Mobile Wallets'
  preferredBadge?: string
  preferredWalletHref?: string
  columns: Column[]
  wallets: T[]
}) {
  return (
    <section className="bg-[#FFF3DD] py-10 md:py-12">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SectionTitle>
          Top 5 <span style={{ color: ACCENT }}>{titleAccent}</span>
        </SectionTitle>

        <div className="mt-8">
          <WalletComparisonTable
            wallets={wallets}
            columns={columns}
            preferredBadge={preferredBadge}
            preferredWalletHref={preferredWalletHref}
            getHref={(w) => w.href}
            getLogo={(w) => ({ src: w.logo, alt: w.logoAlt })}
            getDescription={(w) => w.description}
          />
        </div>
      </div>
    </section>
  )
}

export function RecommendedWalletsPage() {
  return (
    <div className="font-body">
      <section
        className="relative overflow-hidden bg-[#FFE6BE] bg-cover bg-no-repeat py-10 md:py-[60px] md:pb-[100px]"
        style={{
          backgroundImage: `url(${IMG.hero})`,
          backgroundPosition: 'right -140px',
          backgroundSize: 'cover',
        }}
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <h1
              className="font-heading text-[36px] font-black capitalize leading-[55px] tracking-[-0.8px] md:text-[45px]"
              style={{ color: ORANGE }}
            >
              Bitcoin wallets <span style={{ color: ACCENT }}>we recommend</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#384958] md:text-[17px] md:leading-[30px]">
              Having a secure method for{' '}
              <Link
                href={LINKS.keepBitcoin}
                className="font-bold hover:opacity-80"
                style={{ color: ORANGE_LINK }}
              >
                protecting your Bitcoin private keys
              </Link>{' '}
              is essential. The best way to do this is to use a hardware wallet that allows you to store your private
              keys offline. This means that the keys to access your Bitcoin will remain safe even if your computer or
              device is hacked. But for Africans who can&apos;t afford hardware wallets, below you will find some
              desktop and mobile wallets we recommend.
            </p>
            <Link
              href={LINKS.freeCourse}
              className="mt-8 inline-block rounded-md border border-[#D0D5DD] bg-white px-10 py-[15px] text-[17px] font-semibold tracking-[-0.5px] text-[#344054] shadow-sm transition-colors hover:text-[#EC6744] md:px-16"
            >
              Start Your Journey Here
            </Link>
          </div>
        </div>
      </section>

      <WalletSection
        titleAccent="Desktop Wallets"
        preferredBadge={IMG.preferredDesktop}
        preferredWalletHref={PREFERRED_DESKTOP_HREF}
        columns={DESKTOP_COLUMNS}
        wallets={DESKTOP_WALLETS}
      />

      <WalletSection
        titleAccent="Mobile Wallets"
        preferredBadge={IMG.preferredMobile}
        preferredWalletHref={PREFERRED_MOBILE_HREF}
        columns={MOBILE_COLUMNS}
        wallets={MOBILE_WALLETS}
      />

      <section id="course-signup" className="bg-[#F8F9FD] py-12 md:py-[50px] md:pb-[150px]">
        <div className="mx-auto max-w-[700px] px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white px-6 py-10 shadow-sm md:px-10 md:py-12">
            <h4 className="font-heading text-xl font-bold leading-snug tracking-[-0.8px] text-[#384958] md:text-2xl md:leading-10">
              Sign up for our <span className="text-[#EC6744]">free</span>
              <br />
              Bitcoin for beginners course
            </h4>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-[#384958]">
              Learn everything you need to know about Bitcoin in our easy-to-follow Bitcoin course, from its mysterious
              origins to its technical design.
            </p>
            <Link
              href={LINKS.freeCourse}
              className="mt-8 inline-block rounded-md bg-[#E1640C] px-8 py-3 text-[16px] font-semibold text-white shadow-[2px_4px_8px_rgba(0,0,0,0.2)] transition-colors hover:bg-[#253343]"
            >
              Start the Course!
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#FFFCF7] py-12 md:py-[60px] md:pb-[100px]">
        <div className="mx-auto max-w-[600px] px-4 text-center sm:px-6 lg:px-8">
          <h4 className="font-heading text-xl font-bold tracking-[-0.8px] text-[#2D1300] md:text-2xl md:leading-10">
            Get 1,000 sats for your brilliant ideas!
          </h4>
          <p className="mt-5 text-base leading-relaxed text-[#2D1300]">
            Have a genius idea or spot something in our African Bitcoiners initiatives that could be even better? Submit
            your feedback to us and we&apos;re excited to reward you for them.
          </p>
          <Link
            href={LINKS.feedbackBounty}
            className="mt-8 inline-block rounded-md bg-[#E1640C] px-8 py-3 text-[15px] font-semibold text-white shadow-[2px_4px_8px_rgba(0,0,0,0.2)] transition-colors hover:bg-[#253343]"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  )
}
