import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { BRING_ITEMS, GAIN_ITEMS, IMG, LINKS, NIGERIA_NOTICE } from '@/components/GraduateProgramPage/data'
import { ShareOpportunityButton } from '@/components/GraduateProgramPage/ShareOpportunityButton'
import { GraduateProgramPageForm } from '@/components/forms/GraduateProgramPageForm'

const CREAM = '#FCF4EC'
const CTA_CREAM = '#FFFDF5'
const HEADING = '#384958'
const ACCENT = '#37312C'
const ORANGE = '#F27202'
const ORANGE_LINK = '#F76A00'
const TAG_BG = '#FFF8F0'

function MetaTag({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded px-2 py-1" style={{ backgroundColor: TAG_BG }}>
      <Image src={icon} alt="" width={24} height={24} className="h-5 w-5 shrink-0 object-contain" />
      <span className="text-[15px] font-bold tracking-[-0.2px] md:text-base" style={{ color: HEADING }}>
        {label}
      </span>
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="font-heading text-xl font-bold tracking-[-0.4px] md:text-2xl" style={{ color: HEADING }}>
      {children}
    </h4>
  )
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="list-none space-y-2 p-0">
      {items.map((item) => (
        <li key={item.slice(0, 32)} className="flex gap-3 text-[15px] leading-[26px] tracking-[-0.4px] md:text-[17px]" style={{ color: HEADING }}>
          <span className="mt-2.5 h-[6px] w-[6px] shrink-0 rounded-full bg-[#384958]" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function Divider() {
  return <hr className="my-6 border-black/10" />
}

export function GraduateProgramPage() {
  return (
    <div className="font-body">
      <section className="px-4 pt-5 sm:px-6" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-[1200px]">
          <Link href={LINKS.jobsList} className="inline-block transition-opacity hover:opacity-80">
            <Image src={IMG.backArrow} alt="Back to Bitcoiner Jobs" width={117} height={117} className="h-[80px] w-[80px] md:h-[117px] md:w-[117px]" />
          </Link>
        </div>
      </section>

      <section className="px-4 pb-[100px] sm:px-6" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 lg:grid-cols-[65%_35%]">
          <div className="border border-black/20 bg-white p-6 md:p-8 lg:mr-2.5">
            <h4 className="font-heading text-[32px] font-bold tracking-[-0.4px] md:text-[35px]" style={{ color: HEADING }}>
              African Bitcoiners Graduate Program
            </h4>

            <div className="mt-4 flex flex-wrap gap-3">
              <MetaTag icon={IMG.locationPin} label="Remote" />
              <MetaTag icon={IMG.clock} label="12 months program" />
            </div>

            <Divider />

            <SectionHeading>What You Bring With You</SectionHeading>
            <div className="mt-4">
              <BulletList items={BRING_ITEMS} />
            </div>

            <Divider />

            <SectionHeading>What You Stand to Gain</SectionHeading>
            <div className="mt-4">
              <BulletList items={GAIN_ITEMS} />
            </div>

            <Divider />

            <SectionHeading>Pleas Note 📌📌</SectionHeading>
            <p className="mt-4 text-[15px] leading-[26px] font-medium md:text-base" style={{ color: HEADING }}>
              <strong>N.B:</strong> {NIGERIA_NOTICE.replace(/^N\.B:\s*/, '')}
            </p>

            <div id="apply" className="relative mt-10 scroll-mt-24">
              <div className="relative z-10 text-left">
                <Image
                  src={IMG.applyIcon}
                  alt=""
                  width={100}
                  height={101}
                  className="h-auto w-[12%] min-w-[72px] max-w-[100px]"
                />
              </div>

              <div className="-mt-14 px-0 py-[50px] md:px-5" style={{ backgroundColor: CREAM }}>
                <div className="mx-auto w-[95%] max-w-full rounded-2xl border border-[#60391333] bg-white p-6 md:p-10">
                  <h3 className="text-center font-heading text-2xl font-extrabold tracking-[-0.6px]" style={{ color: '#E1640C' }}>
                    Apply Here
                  </h3>
                  <div className="mt-8">
                    <GraduateProgramPageForm />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="border border-black/20 bg-white px-6 py-[30px] pb-[50px] text-center md:px-[30px]">
              <Link
                href="#apply"
                className="inline-flex items-center justify-center gap-2 rounded-[5px] px-[90px] py-[25px] text-[18px] font-semibold tracking-[-0.5px] text-white shadow-[2px_4px_8px_rgba(0,0,0,0.2)] transition-colors hover:bg-[#384958] max-md:px-20 max-md:py-[25px] max-md:text-base"
                style={{ backgroundColor: ORANGE }}
              >
                <span aria-hidden>→</span>
                Apply Now
              </Link>
              <p className="mt-4 text-base tracking-[-0.4px]" style={{ color: HEADING }}>
                Aways accepting applications
              </p>
              <Divider />
              <p className="text-[17px] font-bold tracking-[-0.4px]" style={{ color: HEADING }}>
                Know someone who would be a great fit?
              </p>
              <div className="mt-5">
                <ShareOpportunityButton />
              </div>
            </div>

            <div className="hidden pt-5 lg:block">
              <Image src={IMG.sidebar} alt="" width={681} height={681} className="h-auto w-full" />
            </div>
          </aside>
        </div>
      </section>

      <section className="px-4 py-[50px] sm:px-6 md:py-[50px]" style={{ backgroundColor: CTA_CREAM }}>
        <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-12 md:grid-cols-2 md:gap-8">
          <div className="text-center">
            <h3
              className="font-heading text-[25px] font-bold capitalize leading-[35px] tracking-[-0.4px] md:text-[35px]"
              style={{ color: ACCENT }}
            >
              Curious About
              <br />
              More Opportunities?
            </h3>
            <p className="mt-6 text-center text-[17px] leading-7 tracking-[-0.4px]" style={{ color: HEADING }}>
              <Link href={LINKS.placesToEarn} className="font-bold transition-colors hover:text-[#FFC567]" style={{ color: ORANGE_LINK }}>
                See other ways to earn
              </Link>{' '}
              and keep stacking sats while building your skills.
            </p>
          </div>

          <div className="text-center">
            <h3
              className="font-heading text-[25px] font-bold capitalize leading-[35px] tracking-[-0.4px] md:text-[35px]"
              style={{ color: ACCENT }}
            >
              Want To Be Part Of Something Bigger?
            </h3>
            <p className="mt-6 text-center text-[17px] leading-7 tracking-[-0.4px]" style={{ color: HEADING }}>
              <Link href={LINKS.ecosystem} className="font-bold transition-colors hover:text-[#FFC567]" style={{ color: ORANGE_LINK }}>
                Contribute to the ecosystem
              </Link>{' '}
              and help grow Bitcoin adoption across Africa.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
