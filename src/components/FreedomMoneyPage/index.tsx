import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { GuideModal } from '@/components/GuideModal'
import { TeachCheckIcon, WhoIcon, type WhoIconType } from '@/components/FreedomMoneyPage/icons'

const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'
const IMG = {
  heroBg: `${R2}/uploads/2025/03/Bitcoin-as-Africa-Freedom-Money-Hero.png`,
  bookCover: `${R2}/uploads/2025/03/Bitcoin-as-Africa-Freedom-Money-Bookcover.png`,
  bookDouble: `${R2}/uploads/2025/03/Bitcoin-as-Africa-Guide-to-Freedom-Money-Book-Cover.png`,
}

const TEACH = [
  {
    title: 'Why Your Money is Failing',
    description: 'The ugly truth about inflation, corrupt banking systems, and government controls.',
  },
  {
    title: 'Bitcoin to the Rescue',
    description: 'How Bitcoin empowers YOU to save, earn, and transact without middlemen.',
  },
  {
    title: 'How to Use Bitcoin in Africa',
    description: 'A step-by-step guide on choosing a wallet, buying Bitcoin, and securing it like a pro.',
  },
  {
    title: 'Protecting Your Wealth',
    description: 'How Bitcoin safeguards your money from greedy governments and failing currencies.',
  },
]

const WHO: { icon: WhoIconType; text: React.ReactNode }[] = [
  { icon: 'bank', text: <>If you <strong>don&rsquo;t trust banks</strong> (spoiler: you shouldn&rsquo;t).</> },
  { icon: 'chart', text: <>If you&rsquo;re <strong>tired of your money losing value overnight.</strong></> },
  {
    icon: 'exchange',
    text: (
      <>
        If you want to <strong>send &amp; receive money freely, without limits.</strong>
      </>
    ),
  },
  {
    icon: 'globe',
    text: (
      <>
        If you&rsquo;re curious about <strong>Bitcoin and how it&rsquo;s changing Africa.</strong>
      </>
    ),
  },
]

function FeatureItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start gap-[15px]">
      <TeachCheckIcon />
      <div>
        <p className="text-lg font-bold tracking-[-0.4px] text-[#384958]">{title}</p>
        <p className="mt-4 text-[17px] leading-7 tracking-[-0.4px] text-[#384958]">{description}</p>
      </div>
    </div>
  )
}

function WhoItem({ icon, children }: { icon: WhoIconType; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-[17px] leading-7 tracking-[-0.4px] text-[#384958]">
      <WhoIcon type={icon} />
      <span>{children}</span>
    </li>
  )
}

function DarkBanner({
  title,
  subtitle,
  bookPriority,
}: {
  title: React.ReactNode
  subtitle: React.ReactNode
  bookPriority?: boolean
}) {
  return (
    <section
      className="bg-[#240703] bg-cover bg-center bg-no-repeat pt-8 md:pt-20 md:pb-0"
      style={{ backgroundImage: `url(${IMG.heroBg})` }}
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 px-4 pb-12 sm:px-6 lg:px-8 md:grid-cols-2 md:gap-6 md:pb-[100px]">
        <div className="z-10">
          <div className="font-heading text-4xl font-normal leading-tight tracking-[-0.4px] text-white sm:text-[42px] sm:leading-[50px] md:text-[50px] md:leading-[58px]">
            {title}
          </div>
          <div className="mt-5 max-w-lg text-base leading-[25px] tracking-[-0.4px] text-white">{subtitle}</div>
          <div className="mt-8">
            <GuideModal />
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <Image
            src={IMG.bookCover}
            alt="Bitcoin: Africa's Guide to Freedom Money book cover"
            width={282}
            height={384}
            priority={bookPriority}
            className="h-auto w-[200px] sm:w-[240px] md:-mb-[30px] md:w-[282px]"
            sizes="(max-width: 768px) 200px, 282px"
          />
        </div>
      </div>
    </section>
  )
}

export function FreedomMoneyPage() {
  return (
    <div className="overflow-x-hidden bg-[#FFFDF5] font-sans">
      <DarkBanner
        bookPriority
        title={
          <>
            <span className="text-[#FFC567]">Bitcoin:</span> Africa&rsquo;s Guide to
            <br />
            Freedom Money
          </>
        }
        subtitle={
          <>
            Ditch the Banks. Escape Inflation. Take Control of Your Money.{' '}
            <strong>2ND EDITION OUT NOW!</strong>
          </>
        }
      />

      {/* What this book will teach you */}
      <section className="bg-[#FFFDF5] px-4 py-10 sm:px-6 md:py-[50px]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-center font-heading text-[28px] font-bold capitalize tracking-[-0.4px] text-[#37312C] sm:text-[35px]">
            What this book will teach you
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-8">
            <div className="flex flex-col gap-10">
              <FeatureItem {...TEACH[0]} />
              <FeatureItem {...TEACH[2]} />
            </div>
            <div className="flex flex-col gap-10">
              <FeatureItem {...TEACH[1]} />
              <FeatureItem {...TEACH[3]} />
            </div>
            <div className="hidden items-center justify-center lg:flex">
              <Image
                src={IMG.bookDouble}
                alt="Bitcoin Africa Guide book covers"
                width={600}
                height={808}
                className="h-auto w-full max-w-[320px] object-contain"
                sizes="320px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who should read */}
      <section className="bg-[#FFFDF5] px-4 pb-12 pt-4 sm:px-6 md:pb-[50px]">
        <div className="mx-auto max-w-[900px]">
          <h2 className="text-center font-heading text-[28px] font-bold capitalize tracking-[-0.4px] text-[#37312C] sm:text-[35px]">
            Who Should Read This?
          </h2>
          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8">
            {WHO.map((item, i) => (
              <WhoItem key={i} icon={item.icon}>
                {item.text}
              </WhoItem>
            ))}
          </ul>
        </div>
      </section>

      <DarkBanner
        title={<span className="font-bold">Grab your copy now!</span>}
        subtitle={
          <>The future of money is here, and Africa is leading the charge. Don&rsquo;t get left behind!</>
        }
      />

      {/* Bottom links */}
      <section className="bg-[#FFFDF5] px-4 py-12 sm:px-6 md:py-16">
        <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <h3 className="font-heading text-xl font-bold capitalize leading-snug tracking-[-0.4px] text-[#37312C] sm:text-2xl">
              Ready to deepen
              <br />
              your understanding Of Bitcoin ?
            </h3>
            <p className="mt-4 text-base font-bold leading-7 text-[#384958]">
              Ready to deepen your understanding of Bitcoin?{' '}
              <Link href="/learn-bitcoin/free-bitcoin-course/" className="text-brand-primary hover:underline">
                Take the next step
              </Link>{' '}
              with our free Bitcoin course and start your journey today.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold capitalize leading-snug tracking-[-0.4px] text-[#37312C] sm:text-2xl">
              See how Bitcoin is transforming lives across the continent
            </h3>
            <p className="mt-4 text-base font-bold leading-7 text-[#384958]">
              Discover the{' '}
              <Link href="/african-bitcoin-ecosystem/" className="text-brand-primary hover:underline">
                African communities
              </Link>{' '}
              that have already achieved freedom
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
