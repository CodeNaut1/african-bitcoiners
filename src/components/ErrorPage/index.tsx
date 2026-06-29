import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { IMG, LINKS } from '@/components/ErrorPage/data'

const PAGE_BG = '#FFFCFA'
const HEADING = '#37312C'
const BODY = '#37312C'
const BTN = '#F45341'

export function ErrorPage() {
  return (
    <div className="font-body" style={{ backgroundColor: PAGE_BG }}>
      <section className="px-4 py-[60px] pb-[100px] sm:px-6 max-md:py-[40px]">
        <div className="mx-auto max-w-[600px] text-center">
          <Image
            src={IMG.icon}
            alt=""
            width={250}
            height={250}
            className="mx-auto h-auto w-[200px] max-w-[250px] sm:w-[250px]"
            priority
          />
          <h3
            className="mt-6 font-heading text-[30px] font-bold leading-snug tracking-[-0.6px] md:text-[40px]"
            style={{ color: HEADING }}
          >
            Error Encountered!
          </h3>
          <p className="mt-4 text-lg leading-7 tracking-[-0.4px]" style={{ color: BODY }}>
            You are seeing this error because the email entered is not recognised.{' '}
            <strong>
              Please ensure you have completed the course and taken the final quiz. If you&apos;ve done so, then confirm
              that you entered the right email.
            </strong>{' '}
            Otherwise contact support.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href={LINKS.contactSupport}
              className="inline-block rounded px-8 py-3 text-[15px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#dd8512]"
              style={{ backgroundColor: BTN }}
            >
              CONTACT SUPPORT
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
