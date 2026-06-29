import Image from 'next/image'
import React from 'react'

import { IMG } from '@/components/DonationConfirmationPage/data'
import { DonationConfirmationForm } from '@/components/forms/DonationConfirmationForm'

const PAGE_BG = '#FFFCFA'
const TEXT = '#584538'
const ORANGE = '#E1640C'

export function DonationConfirmationPage() {
  return (
    <div className="font-body" style={{ backgroundColor: PAGE_BG }}>
      <section className="px-4 pt-6 sm:px-6 md:pt-10">
        <div className="mx-auto max-w-[600px] px-4 text-center md:px-12">
          <Image
            src={IMG.celebrate}
            alt=""
            width={1000}
            height={1000}
            className="mx-auto h-auto w-full max-w-[320px]"
            priority
          />
          <p
            className="-mt-2 text-[22px] leading-7 tracking-[-0.6px]"
            style={{ color: TEXT }}
          >
            Thank you for supporting our mission! ♥
          </p>
        </div>
      </section>

      <section className="px-4 pb-[100px] pt-4 sm:px-6">
        <div className="mx-auto max-w-[600px] border border-black/15 bg-white px-6 py-8 sm:px-9 sm:py-9">
          <h2
            className="font-heading text-lg font-bold tracking-[-0.6px]"
            style={{ color: ORANGE }}
          >
            Please give us your feedback
          </h2>
          <div className="mt-8">
            <DonationConfirmationForm />
          </div>
        </div>
      </section>
    </div>
  )
}
