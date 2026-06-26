import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { EMAIL, IMG } from '@/components/FaqsPage/data'
import { FaqAccordion } from '@/components/FaqsPage/FaqAccordion'

function FaqsBreadcrumbs() {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-black/5 bg-brand-cream py-3 text-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-1 text-black/60">
          <li>
            <Link href="/" className="transition-colors hover:text-brand-primary">
              Home
            </Link>
          </li>
          <li aria-hidden className="select-none text-[#cccccc]">
            &gt;
          </li>
          <li>
            <span className="font-medium text-brand-primary">FAQs</span>
          </li>
        </ol>
      </div>
    </nav>
  )
}

export function FaqsPage() {
  return (
    <article className="font-sans">
      <FaqsBreadcrumbs />

      {/* Hero */}
      <section
        className="bg-cover bg-center bg-no-repeat px-4 py-[50px] md:px-6 md:py-20"
        style={{
          backgroundColor: '#F03318',
          backgroundImage: `url("${IMG.heroBg}")`,
        }}
      >
        <div className="mx-auto max-w-[1200px] text-center">
          <h1 className="font-heading text-[35px] font-bold leading-[35px] tracking-[-0.2px] text-white md:text-[45px]">
            Frequently Asked Questions
          </h1>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="bg-[#FDFAF9] px-4 py-8 md:px-6 md:py-[50px]">
        <div className="mx-auto max-w-[800px]">
          <FaqAccordion />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-4 py-[50px] pb-[100px] md:px-6">
        <div className="mx-auto max-w-[800px]">
          <div className="rounded-[15px] border border-black/10 bg-[#FEFCFB] px-5 py-[30px] text-center md:px-8">
            <div className="mb-4 flex justify-center">
              <Image
                src={IMG.avatars}
                alt=""
                width={124}
                height={60}
                className="h-auto w-[124px]"
              />
            </div>

            <h2 className="font-heading text-xl font-bold tracking-[-0.8px] text-[#101828] md:text-2xl md:leading-10">
              Still have questions?
            </h2>

            <div className="mt-6">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-block rounded-md border border-[#F45341] bg-[#F45341] px-10 py-[15px] font-sans text-base tracking-[-0.5px] text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors hover:border-[#F45341] hover:bg-white hover:text-[#EC6744] md:px-[60px] md:text-[17px]"
              >
                Send us an email
              </a>
            </div>

            <p className="mt-5 font-sans text-[17px] text-[#475467] md:text-lg">or</p>

            <p className="mt-3 font-sans text-[17px] leading-[22px] text-[#475467] md:text-lg">
              <Link
                href="/learn-bitcoin/free-bitcoin-course"
                className="font-semibold text-brand-primary hover:underline"
              >
                Sign up to our Bitcoin for Beginners Course
              </Link>{' '}
              to learn more about Bitcoin
            </p>
          </div>
        </div>
      </section>
    </article>
  )
}
