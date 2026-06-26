import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import {
  BENEFITS,
  IMG,
  LINKS,
  STEP1_RULES,
} from '@/components/FeedbackBountyPage/data'

const HERO_CREAM = '#FFF4EB'
const SECTION_CREAM = '#FFFBF7'
const CTA_CREAM = '#FFF3EA'
const HEADING = '#2D1300'
const TEXT = '#2D1300'
const ORANGE = '#E35725'
const ORANGE_LINK = '#E35725'
const BTN = '#F45341'

function BountyButton({
  href,
  children,
  className = '',
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={`inline-block rounded px-20 py-[15px] text-[17px] font-semibold tracking-[-0.2px] text-white shadow-[2px_4px_8px_rgba(0,0,0,0.2)] transition-colors hover:bg-[#253343] max-md:px-20 max-md:py-[18px] ${className}`}
      style={{ backgroundColor: BTN }}
    >
      {children}
    </Link>
  )
}

function StepCard({
  title,
  children,
  className = '',
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-[7px] bg-white px-7 py-10 text-start shadow-[0px_6px_16px_rgba(16,25,40,0.08)] ${className}`}
    >
      <h5
        className="mb-5 font-heading text-lg font-bold tracking-[-0.6px]"
        style={{ color: ORANGE }}
      >
        {title}
      </h5>
      <div
        className="text-base tracking-[-0.5px] leading-relaxed [&_a]:font-bold [&_a]:underline [&_a]:hover:opacity-80"
        style={{ color: TEXT }}
      >
        {children}
      </div>
    </div>
  )
}

function BenefitIcon({ variant }: { variant: 0 | 1 | 2 }) {
  if (variant === 0) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <circle cx="14" cy="14" r="14" fill="#FFEAE2" />
        <path d="M7.60347 12.185C7.32149 11.3391 6.65767 10.6753 5.81173 10.3933C4.95078 10.1063 4.95078 8.8885 5.81173 8.60152C6.65767 8.31954 7.32149 7.65572 7.60347 6.80977C7.89046 5.94883 9.10824 5.94883 9.39522 6.80977C9.67721 7.65572 10.341 8.31954 11.187 8.60152C12.0479 8.8885 12.0479 10.1063 11.187 10.3933C10.341 10.6753 9.67721 11.3391 9.39522 12.185C9.10824 13.046 7.89046 13.046 7.60347 12.185Z" fill="#E35725" />
        <path d="M14.4316 21.7007C13.9381 20.2203 12.7764 19.0586 11.296 18.5652C9.78935 18.063 9.78935 15.9318 11.296 15.4296C12.7764 14.9361 13.9381 13.7745 14.4316 12.2941C14.9338 10.7874 17.0649 10.7874 17.5671 12.2941C18.0606 13.7745 19.2223 14.9361 20.7027 15.4296C22.2093 15.9318 22.2093 18.063 20.7027 18.5652C19.2223 19.0586 18.0606 20.2203 17.5671 21.7007C17.0649 23.2074 14.9338 23.2074 14.4316 21.7007Z" fill="#E35725" />
      </svg>
    )
  }
  if (variant === 1) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none" aria-hidden>
        <circle cx="14.5" cy="14" r="14" fill="#FFEAE2" />
        <path d="M7.55891 7.93363C6.7559 8.44464 6.375 9.07373 6.375 9.6699C6.375 10.2661 6.7559 10.8952 7.55891 11.4062C8.35451 11.9125 9.49178 12.2461 10.7804 12.2461C12.069 12.2461 13.2062 11.9125 14.0018 11.4062C14.8049 10.8952 15.1858 10.2661 15.1858 9.6699C15.1858 9.07373 14.8049 8.44464 14.0018 7.93363C13.2062 7.42734 12.069 7.09375 10.7804 7.09375C9.49178 7.09375 8.35451 7.42734 7.55891 7.93363Z" fill="#E35725" />
        <path d="M15.1858 12.0865C15.0251 12.221 14.8533 12.346 14.6729 12.4607C13.6479 13.113 12.27 13.4961 10.7804 13.4961C9.29077 13.4961 7.91286 13.113 6.88782 12.4607C6.70744 12.346 6.53562 12.221 6.375 12.0865V13.3284C6.375 13.9245 6.7559 14.5536 7.55891 15.0646C8.35451 15.5709 9.49178 15.9045 10.7804 15.9045C12.069 15.9045 13.2062 15.5709 14.0018 15.0646C14.8049 14.5536 15.1858 13.9245 15.1858 13.3284V12.0865Z" fill="#E35725" />
        <path d="M15.1858 15.745C15.0251 15.8795 14.8533 16.0044 14.6729 16.1192C13.6479 16.7715 12.27 17.1545 10.7804 17.1545C9.29077 17.1545 7.91286 16.7715 6.88782 16.1192C6.70744 16.0044 6.53562 15.8795 6.375 15.745V16.9868C6.375 17.583 6.7559 18.2121 7.55891 18.7231C8.35451 19.2294 9.49178 19.563 10.7804 19.563C12.069 19.563 13.2062 19.2294 14.0018 18.7231C14.8049 18.2121 15.1858 17.583 15.1858 16.9868V15.745Z" fill="#E35725" />
        <path d="M15.1858 19.4035C15.0251 19.5379 14.8533 19.6629 14.6729 19.7777C13.6479 20.43 12.27 20.813 10.7804 20.813C9.29077 20.813 7.91286 20.43 6.88782 19.7777C6.70744 19.6629 6.53562 19.5379 6.375 19.4035V19.7307C6.375 20.3268 6.7559 20.9559 7.55891 21.4669C8.35451 21.9732 9.49178 22.3068 10.7804 22.3068C12.069 22.3068 13.2062 21.9732 14.0018 21.4669C14.8049 20.9559 15.1858 20.3268 15.1858 19.7307V19.4035Z" fill="#E35725" />
        <path d="M17.0406 11.6572C16.4599 12.0267 16.2165 12.4603 16.2165 12.8406C16.2165 13.2209 16.4599 13.6545 17.0406 14.024C17.6138 14.3888 18.444 14.6349 19.3933 14.6349C20.3426 14.6349 21.1727 14.3888 21.746 14.024C22.3267 13.6545 22.57 13.2209 22.57 12.8406C22.57 12.4603 22.3267 12.0267 21.746 11.6572C21.1727 11.2924 20.3426 11.0463 19.3933 11.0463C18.444 11.0463 17.6138 11.2924 17.0406 11.6572Z" fill="#E35725" />
        <path d="M22.57 14.9762C22.5199 15.0115 22.4689 15.0456 22.4171 15.0786C21.6144 15.5894 20.5436 15.8849 19.3933 15.8849C18.2429 15.8849 17.1722 15.5894 16.3695 15.0786C16.3177 15.0456 16.2666 15.0115 16.2165 14.9762V15.6055C16.2165 15.9858 16.4599 16.4194 17.0406 16.7889C17.6138 17.1537 18.444 17.3998 19.3933 17.3998C20.3426 17.3998 21.1727 17.1537 21.746 16.7889C22.3267 16.4194 22.57 15.9858 22.57 15.6055V14.9762Z" fill="#E35725" />
        <path d="M22.57 17.7412C22.5199 17.7764 22.4689 17.8105 22.4171 17.8435C21.6144 18.3543 20.5436 18.6498 19.3933 18.6498C18.2429 18.6498 17.1722 18.3543 16.3695 17.8435C16.3177 17.8105 16.2666 17.7764 16.2165 17.7412V18.3704C16.2165 18.7507 16.4599 19.1843 17.0406 19.5539C17.6138 19.9187 18.444 20.1647 19.3933 20.1647C20.3426 20.1647 21.1727 19.9187 21.746 19.5539C22.3267 19.1843 22.57 18.7507 22.57 18.3704V17.7412Z" fill="#E35725" />
        <path d="M22.5678 20.5077C22.5184 20.5423 22.4681 20.5759 22.4171 20.6084C21.6144 21.1192 20.5436 21.4147 19.3933 21.4147C18.2429 21.4147 17.1722 21.1192 16.3695 20.6084C16.3184 20.5759 16.2682 20.5423 16.2188 20.5077C16.2445 20.8721 16.492 21.2784 17.0406 21.6275C17.6138 21.9923 18.444 22.2384 19.3933 22.2384C20.3426 22.2384 21.1727 21.9923 21.746 21.6275C22.2946 21.2784 22.5421 20.8721 22.5678 20.5077Z" fill="#E35725" />
      </svg>
    )
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none" aria-hidden>
      <circle cx="14.5" cy="14" r="14" fill="#FFEAE2" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12.9048 18.9392C13.5152 19.5297 14.484 19.5297 15.0945 18.9392C15.4436 18.6015 15.929 18.4437 16.4099 18.5118C17.2509 18.6307 18.0346 18.0613 18.1814 17.2247C18.2653 16.7463 18.5653 16.3334 18.9943 16.1058C19.7446 15.7077 20.044 14.7863 19.671 14.0232C19.4577 13.5869 19.4577 13.0765 19.671 12.6401C20.044 11.8771 19.7446 10.9557 18.9943 10.5576C18.5653 10.3299 18.2653 9.91704 18.1814 9.43864C18.0346 8.60206 17.2509 8.03261 16.4099 8.15156C15.929 8.21958 15.4436 8.06187 15.0945 7.72417C14.484 7.13361 13.5152 7.13361 12.9048 7.72417C12.5557 8.06187 12.0703 8.21958 11.5894 8.15156C10.7484 8.03261 9.96461 8.60206 9.81786 9.43864C9.73395 9.91704 9.43396 10.3299 9.00491 10.5576C8.25462 10.9557 7.95524 11.8771 8.32825 12.6401C8.54155 13.0765 8.54155 13.5869 8.32825 14.0232C7.95524 14.7863 8.25462 15.7077 9.00491 16.1058C9.43396 16.3334 9.73395 16.7463 9.81786 17.2247C9.96461 18.0613 10.7484 18.6307 11.5894 18.5118C12.0703 18.4437 12.5557 18.6015 12.9048 18.9392ZM13.4335 11.6334C13.2554 12.1679 12.8359 12.5874 12.3014 12.7655C11.7574 12.9469 11.7574 13.7164 12.3014 13.8977C12.8359 14.0759 13.2554 14.4953 13.4335 15.0299C13.6149 15.5739 14.3844 15.5739 14.5657 15.0299C14.7439 14.4953 15.1633 14.0759 15.6979 13.8977C16.2419 13.7164 16.2419 12.9469 15.6979 12.7655C15.1633 12.5874 14.7439 12.1679 14.5657 11.6334C14.3844 11.0894 13.6149 11.0894 13.4335 11.6334Z" fill="#E35725" />
      <path d="M15.9247 19.4524L14.745 20.0423C14.2758 20.2769 13.7235 20.2769 13.2543 20.0423L12.0746 19.4524C11.864 19.3471 11.6097 19.4619 11.5493 19.6895C11.5164 19.8138 11.4997 19.9419 11.4997 20.0705V22.8335C11.4997 23.7598 12.6912 24.1367 13.2238 23.3789C13.6015 22.8416 14.3978 22.8416 14.7755 23.3789C15.3082 24.1367 16.4997 23.7598 16.4997 22.8335V20.0705C16.4997 19.9419 16.483 19.8138 16.45 19.6895C16.3896 19.4619 16.1354 19.3471 15.9247 19.4524Z" fill="#E35725" />
    </svg>
  )
}

export function FeedbackBountyPage() {
  return (
    <div className="overflow-x-hidden font-sans">
      {/* Hero */}
      <section className="px-4 py-[30px] sm:px-6 md:py-[60px]" style={{ backgroundColor: HERO_CREAM }}>
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <h1
              className="font-heading text-[37px] font-extrabold leading-[48px] tracking-[-0.8px] md:text-[42px] md:leading-tight"
              style={{ color: HEADING }}
            >
              Get 1,000 sats for your brilliant ideas!
            </h1>
            <div
              className="mt-0 pr-0 text-justify text-lg leading-7 tracking-[-0.6px] md:pr-[30px]"
              style={{ color: TEXT }}
            >
              <p className="mt-4">
                Have a genius idea or spot something in our African Bitcoiners initiatives that could be even better?
                Now&apos;s your chance to share your thoughts and earn 1,000 sats! Welcome to our{' '}
                <span className="font-extrabold" style={{ color: ORANGE_LINK }}>
                  Feedback Bounty Party
                </span>
                , your opportunity to help us improve and get rewarded for it!
              </p>
              <p className="mt-4">
                <strong>
                  N.B: Submit one idea per form. Your idea must be specific, actionable, and feasible to implement within
                  12 months.
                </strong>
              </p>
            </div>
            <div className="mt-[30px]">
              <BountyButton href={LINKS.participate}>Get Started</BountyButton>
            </div>
          </div>
          <div className="order-1 hidden md:order-2 md:block">
            <Image
              src={IMG.hero}
              alt=""
              width={1024}
              height={671}
              className="h-auto w-full"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* What is the deal + Why join */}
      <section className="px-4 pb-[50px] pt-[30px] sm:px-6 md:pb-[100px] md:pt-[50px]" style={{ backgroundColor: SECTION_CREAM }}>
        <div className="mx-auto max-w-[900px]">
          {/* What is the deal */}
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <h4
                className="font-heading text-2xl font-bold tracking-[-0.6px]"
                style={{ color: HEADING }}
              >
                What is the deal?
              </h4>
              <p
                className="mt-4 pr-0 text-justify text-lg leading-7 tracking-[-0.6px] md:pr-[30px]"
                style={{ color: TEXT }}
              >
                At African Bitcoiners, we&apos;re committed to being the best for you. That&apos;s why we&apos;re giving
                you this chance to earn Bitcoin by helping you level up. Whether it&apos;s a tweak, a change, or a
                brand-new idea, we&apos;re eager to hear your suggestions. If we use your feedback, you&apos;ll earn 1,000
                sats!
              </p>
            </div>
            <div className="order-1 md:order-2">
              <Image
                src={IMG.whatIsDeal}
                alt=""
                width={1024}
                height={740}
                className="h-auto w-full"
                sizes="(max-width: 768px) 100vw, 450px"
              />
            </div>
          </div>

          {/* Why join */}
          <div className="mt-0 grid grid-cols-1 items-center gap-8 pt-0 md:mt-[50px] md:grid-cols-2">
            <div>
              <Image
                src={IMG.whyJoin}
                alt=""
                width={647}
                height={674}
                className="mx-auto h-auto w-full max-w-[647px]"
                sizes="(max-width: 768px) 100vw, 450px"
              />
            </div>
            <div>
              <h4
                className="font-heading text-2xl font-bold tracking-[-0.6px]"
                style={{ color: HEADING }}
              >
                Why You Should Join the Party?
              </h4>
              <div className="mt-6 space-y-6">
                {BENEFITS.map((benefit, i) => (
                  <div key={benefit.title} className="flex items-start gap-4">
                    <div className="shrink-0 pt-0.5">
                      <BenefitIcon variant={i as 0 | 1 | 2} />
                    </div>
                    <div>
                      <p
                        className="font-heading text-xl font-extrabold tracking-[-0.5px]"
                        style={{ color: HEADING }}
                      >
                        {benefit.title}
                      </p>
                      <p className="mt-2 text-base tracking-[-0.5px]" style={{ color: TEXT }}>
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Participate */}
      <section
        id="participate"
        className="scroll-mt-20 px-4 pb-16 pt-0 sm:px-6 md:pb-[300px]"
        style={{ backgroundColor: SECTION_CREAM }}
      >
        <div className="mx-auto max-w-[850px]">
          <h3
            className="text-center font-heading text-2xl font-bold tracking-[-0.8px] md:text-3xl"
            style={{ color: HEADING }}
          >
            How to Participate?
          </h3>

          {/* Desktop zigzag layout */}
          <div className="relative mt-[30px] hidden md:block">
            <div className="grid grid-cols-[1fr_15%_1fr] gap-5">
              {/* Card 1 */}
              <div className="pt-[30px]">
                <StepCard title="1. Understand the rules">
                  {STEP1_RULES.map((rule, i) => (
                    <React.Fragment key={rule.label}>
                      {i > 0 && (
                        <>
                          <br />
                          <br />
                        </>
                      )}
                      <strong>{rule.label}</strong> {rule.text}
                    </React.Fragment>
                  ))}
                </StepCard>
              </div>

              {/* Arrows column */}
              <div className="relative">
                <Image
                  src={IMG.arrowOneTwo}
                  alt=""
                  width={177}
                  height={164}
                  className="absolute -top-8 left-1/2 h-auto w-[177px] -translate-x-1/2"
                />
                <Image
                  src={IMG.arrowTwoThree}
                  alt=""
                  width={175}
                  height={165}
                  className="absolute left-[96px] top-[182px] h-auto w-[175px]"
                />
                <Image
                  src={IMG.arrowThreeFour}
                  alt=""
                  width={175}
                  height={165}
                  className="absolute left-[351px] top-[471px] h-auto w-[175px] -translate-x-1/2"
                />
              </div>

              {/* Cards 2–4 */}
              <div className="relative min-h-[700px]">
                <StepCard title="2. Submit Your Feedback">
                  Fill out our easy-to-use feedback form below. It&apos;s quick and simple.
                  <br />
                  <br />
                  <Link href={LINKS.submitFeedback} style={{ color: ORANGE_LINK }}>
                    <strong>SUBMIT FEEDBACK HERE</strong>
                  </Link>
                </StepCard>

                <StepCard title="3. Track Your Feedback" className="absolute left-[67px] top-[233px] w-[calc(100%+40px)]">
                  After submission, your feedback enters our Feedback Management Matrix. Check back to see if your ideas
                  have been implemented or rejected.
                  <br />
                  <br />
                  <Link href={LINKS.trackMatrix} style={{ color: ORANGE_LINK }}>
                    <strong>TRACK IT HERE</strong>
                  </Link>
                </StepCard>

                <StepCard title="4. Claim Your Reward" className="absolute -left-[90px] top-[520px] w-[calc(100%+90px)]">
                  If your feedback gets the green light, we&apos;ll contact you via email. You&apos;ll receive your
                  1,000 sats within 7 days of implementing. Plus, your name will be featured in our newsletter!
                </StepCard>
              </div>
            </div>
          </div>

          {/* Mobile stacked layout */}
          <div className="mt-8 space-y-6 md:hidden">
            <StepCard title="1. Understand the rules">
              {STEP1_RULES.map((rule, i) => (
                <React.Fragment key={rule.label}>
                  {i > 0 && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                  <strong>{rule.label}</strong> {rule.text}
                </React.Fragment>
              ))}
            </StepCard>
            <StepCard title="2. Submit Your Feedback">
              Fill out our easy-to-use feedback form below. It&apos;s quick and simple.
              <br />
              <br />
              <Link href={LINKS.submitFeedback} style={{ color: ORANGE_LINK }}>
                <strong>SUBMIT FEEDBACK HERE</strong>
              </Link>
            </StepCard>
            <StepCard title="3. Track Your Feedback">
              After submission, your feedback enters our Feedback Management Matrix. Check back to see if your ideas have
              been implemented or rejected.
              <br />
              <br />
              <Link href={LINKS.trackMatrix} style={{ color: ORANGE_LINK }}>
                <strong>TRACK IT HERE</strong>
              </Link>
            </StepCard>
            <StepCard title="4. Claim Your Reward">
              If your feedback gets the green light, we&apos;ll contact you via email. You&apos;ll receive your 1,000
              sats within 7 days of implementing. Plus, your name will be featured in our newsletter!
            </StepCard>
          </div>
        </div>
      </section>

      {/* CTA — Ready to Make a Difference */}
      <section className="px-4 py-[60px] pb-[100px] sm:px-6" style={{ backgroundColor: CTA_CREAM }}>
        <div className="mx-auto max-w-[600px] text-center">
          <h4
            className="font-heading text-2xl font-bold tracking-[-0.8px]"
            style={{ color: HEADING }}
          >
            Ready to Make a Difference?
          </h4>
          <p className="mt-4 text-lg leading-7 tracking-[-0.5px]" style={{ color: TEXT }}>
            Don&apos;t wait! Start submitting your feedback now! Your insights are invaluable to us, and we&apos;re
            excited to reward you for them.
          </p>
          <div className="mt-8 flex justify-center">
            <BountyButton href={LINKS.submitFeedback}>Submit Feedback</BountyButton>
          </div>
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="px-4 pb-7 pt-[60px] sm:px-6" style={{ backgroundColor: SECTION_CREAM }}>
        <div className="mx-auto max-w-[600px] text-center">
          <h4
            className="font-heading text-2xl font-bold tracking-[-0.8px]"
            style={{ color: HEADING }}
          >
            Want to stack even more sats?
          </h4>
          <p className="mt-4 text-lg leading-7" style={{ color: TEXT }}>
            <Link href={LINKS.earnMoreSats} className="font-normal hover:underline" style={{ color: ORANGE_LINK }}>
              Click here to earn more sats
            </Link>{' '}
            through other opportunities in our community!
          </p>
        </div>
      </section>
    </div>
  )
}
