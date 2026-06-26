import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { CourseModalBlockComponent } from '@/blocks/CourseModal/Component'
import { BULB_ICON, HERO_BG, RESOURCE_SECTIONS, type ResourceItem } from '@/components/LearningResourcesPage/data'

const ORANGE = '#E1640C'
const TEXT = '#584538'

function ResourceLink({
  href,
  className,
  children,
}: {
  href: string
  className: string
  children: React.ReactNode
}) {
  const isExternal = href.startsWith('http')
  const isHash = href.startsWith('#')

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    )
  }

  if (isHash) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

function ResourceCard({ item }: { item: ResourceItem }) {
  return (
    <article className="flex h-full flex-col border border-black/20 bg-[#FFFAF2] p-3 pb-6 sm:p-3 sm:pb-[25px]">
      <div className="relative mb-4 aspect-square w-full overflow-hidden bg-white">
        <Image
          src={item.image}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <h3
        className="mb-0 font-heading text-[22px] font-black leading-10 tracking-[-1px] sm:text-[28px]"
        style={{ color: ORANGE }}
      >
        {item.title}
      </h3>
      <p className="mt-4 flex-1 text-base leading-[27px] sm:text-lg" style={{ color: TEXT }}>
        {item.description}
      </p>
      <ResourceLink
        href={item.href}
        className="mt-6 inline-flex w-fit border border-[#E1640C] px-8 py-[15px] text-[15px] font-bold tracking-[-0.6px] text-[#E1640C] transition-colors hover:bg-[#E1640C] hover:text-white sm:px-12"
      >
        {item.buttonLabel}
      </ResourceLink>
    </article>
  )
}

function ResourceSectionBlock({
  id,
  heading,
  items,
  showTipAfter,
}: {
  id: string
  heading: string
  items: ResourceItem[]
  showTipAfter?: boolean
}) {
  return (
    <>
      <section id={id} className="bg-[#FFFAF2] px-4 pt-6 sm:px-6 md:pt-10">
        <div className="mx-auto max-w-[1200px]">
          <h2
            className="text-center font-heading text-4xl font-bold leading-tight md:text-5xl md:leading-[70px]"
            style={{ color: ORANGE }}
          >
            {heading}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {items.map((item) => (
              <ResourceCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      {showTipAfter && (
        <section className="bg-[#FFFAF2] px-4 py-8 sm:px-6 md:py-10">
          <div className="mx-auto grid max-w-[900px] grid-cols-1 items-center gap-6 sm:grid-cols-[68px_1fr] sm:gap-8">
            <Image src={BULB_ICON} alt="" width={68} height={68} className="mx-auto sm:mx-0" />
            <div className="rounded border border-[#D0D5DD] bg-[#F8FAFC] px-5 py-4">
              <p className="font-bold text-[#37312C]">
                Top Tip: Teach your brain to listen to podcasts at faster speeds.
              </p>
              <p className="mt-2 text-base leading-7" style={{ color: TEXT }}>
                To train yourself, simple start with the next fastest speed (like 1.1 or 1.2) and when
                you&apos;re used to that, slowly increase. Within a few months you can be taking in knowledge
                at twice the speed!
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export function LearningResourcesPage() {
  return (
    <div className="overflow-x-hidden bg-[#FFFAF2] font-sans">
      <section
        className="bg-[#FFF4E5] bg-cover bg-center bg-no-repeat px-4 pb-16 pt-10 sm:px-6 md:pb-[100px] md:pt-[60px]"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      >
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-8 md:grid-cols-2">
          <div>
            <h1
              className="font-heading text-4xl font-bold leading-tight tracking-[-0.6px] sm:text-5xl md:text-[56px] md:leading-[70px]"
              style={{ color: ORANGE }}
            >
              Free Bitcoin Learning Resources
            </h1>
            <div className="mt-6 space-y-5 text-lg leading-[30px] sm:text-xl" style={{ color: TEXT }}>
              <p>
                Learning about Bitcoin isn&apos;t an overnight experience. If you want to truly understand why
                Bitcoin is the best money ever discovered and why it will have a profound impact on the human
                race, you need to commit to at least 100 hours of learning.
              </p>
              <p>
                Is it worth it? We&apos;d argue that 100 hours is a small investment to be so far ahead of the
                pack in understanding something so powerful and important. As you will soon realize, it is almost
                inevitable that the entire world will eventually use Bitcoin as money. Maybe it&apos;s time to
                learn why that will happen, why that is such an important change, and most importantly, why the
                world is going to be a much better place for it. Below we have put together a{' '}
                <strong>100% FREE learning journey</strong> that we think will give you the best value for your
                100 hours.
              </p>
            </div>
          </div>
          <div className="hidden min-h-[200px] md:block" aria-hidden />
        </div>
      </section>

      <ResourceSectionBlock {...RESOURCE_SECTIONS[0]} />
      <ResourceSectionBlock {...RESOURCE_SECTIONS[1]} showTipAfter />
      <ResourceSectionBlock {...RESOURCE_SECTIONS[2]} />

      <section id="get-course" className="scroll-mt-24 bg-[#FFFAF2] px-4 py-12 sm:px-6 md:py-16">
        <div className="mx-auto max-w-[800px] rounded-2xl border border-black/10 bg-white px-5 py-10 shadow-card sm:px-10 sm:py-12">
          <h2 className="text-center font-heading text-xl font-bold leading-snug tracking-[-0.5px] sm:text-2xl">
            <span className="text-[#37312C]">Sign up for our </span>
            <span style={{ color: '#EC6744' }}>free</span>
            <br />
            <span className="text-[#37312C]">Bitcoin for beginners course</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-center text-base leading-7" style={{ color: TEXT }}>
            Learn everything you need to know about Bitcoin in this easy-to-follow Bitcoin course, from its
            mysterious origins to its technical design.
          </p>
          <div className="mt-8">
            <CourseModalBlockComponent
              triggerLabel="Start the Course!"
              variant="primary-orange"
              layout="inline"
              websiteUrl="https://course.bitcoiners.africa"
              fullWidth
            />
          </div>
        </div>
      </section>

      <section className="bg-[#FFFAF2] px-4 pb-16 pt-4 sm:px-6 md:pb-24">
        <div className="mx-auto max-w-[700px] text-center">
          <h2
            className="font-heading text-2xl font-bold leading-tight sm:text-3xl md:text-4xl md:leading-[50px]"
            style={{ color: ORANGE }}
          >
            Get 1,000 sats for your brilliant ideas!
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-base leading-7 tracking-[-0.5px] sm:text-[17px] sm:leading-[30px]"
            style={{ color: TEXT }}
          >
            Have a genius idea or spot something in our African Bitcoiners initiatives that could be even
            better? Submit your feedback to us and we&apos;re excited to reward you for them.
          </p>
          <div className="mt-8">
            <Link
              href="/earn-bitcoin/1000-sats-feedback-bounty/"
              className="inline-flex border border-[#E1640C] px-10 py-[15px] text-[15px] font-bold tracking-[-0.6px] text-[#E1640C] transition-colors hover:bg-[#E1640C] hover:text-white sm:px-16"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
