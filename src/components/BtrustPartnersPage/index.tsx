import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { ARTICLE_HTML, CONTACTS, IMG, LINKS } from '@/components/BtrustPartnersPage/data'

const ORANGE = '#FF9A00'
const FOOTER_TEXT = '#FFFBFB'

export function BtrustPartnersPage() {
  return (
    <article className="bg-white font-body text-black">
      <section className="px-4 py-8 sm:px-6 md:py-12">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
          <h1
            className="font-heading text-[32px] font-bold leading-tight tracking-[1.4px] md:text-[40px] md:leading-[100px]"
            style={{ color: ORANGE }}
          >
            Press Release
          </h1>
          <div className="flex justify-start md:justify-end">
            <Image
              src={IMG.logo}
              alt="African Bitcoiners"
              width={200}
              height={200}
              className="h-auto w-[140px] md:w-[200px]"
              priority
            />
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-[1200px]">
          <hr className="border-0 border-t-[3px] py-[15px]" style={{ borderColor: ORANGE }} />
          <h2 className="font-heading text-sm font-bold leading-10" style={{ color: '#000000' }}>
            Africa, April 2025
          </h2>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 md:pb-12">
        <div className="mx-auto max-w-[1200px]">
          <div
            className="btrust-article space-y-4 text-base font-normal leading-8 [&_a]:text-[#B1881F] [&_a]:underline [&_a]:transition-opacity hover:[&_a]:opacity-80 [&_p]:text-black"
            dangerouslySetInnerHTML={{ __html: ARTICLE_HTML }}
          />
        </div>
      </section>

      <section className="px-4 py-10 pb-16 sm:px-6 md:py-14" style={{ backgroundColor: ORANGE }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
            <div>
              <h2 className="font-heading text-2xl font-bold" style={{ color: FOOTER_TEXT }}>
                Press Contact
              </h2>
              <div className="mt-4 space-y-4 text-base leading-7" style={{ color: FOOTER_TEXT }}>
                <div>
                  <p className="font-bold">{CONTACTS.sarah.name}</p>
                  <p>{CONTACTS.sarah.org}</p>
                  <p>
                    <a href={`mailto:${CONTACTS.sarah.email}`} className="underline" style={{ color: FOOTER_TEXT }}>
                      {CONTACTS.sarah.email}
                    </a>
                  </p>
                </div>
                <div>
                  <p className="font-bold">{CONTACTS.megasley.name}</p>
                  <p>{CONTACTS.megasley.org}</p>
                  <p>
                    <a href={`mailto:${CONTACTS.megasley.email}`} className="underline" style={{ color: FOOTER_TEXT }}>
                      {CONTACTS.megasley.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold" style={{ color: FOOTER_TEXT }}>
                African Bitcoiners
              </h2>
              <p className="mt-4 text-base" style={{ color: FOOTER_TEXT }}>
                <Link href={LINKS.website} className="underline" style={{ color: FOOTER_TEXT }}>
                  www.bitcoiners.africa
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
