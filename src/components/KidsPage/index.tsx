import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { CourseModalBlockComponent } from '@/blocks/CourseModal/Component'

const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'
const IMG = {
  heroBg: `${R2}/uploads/2025/01/Bitcoin-education-for-kids-hero.png`,
}

const KIDS_ORANGE = '#E1640C'
const KIDS_TEXT = '#584538'
const KIDS_BODY = '#37312C'

type Resource = {
  title: string
  description: string
  image: string
  imageLayout?: 'square' | 'banner'
  buttonLabel: 'Watch' | 'Read'
  href: string
}

const FREE_RESOURCES: Resource[] = [
  {
    title: 'What is Bitcoin? for Kids and Beginners',
    description:
      'This video concisely explains the concept of Bitcoins. It could be used by kids & teens to learn about Bitcoin or used by parents to teach their children about Bitcoin.',
    image: `${R2}/uploads/2024/12/African-Bitcoiners_What_is_Bitcoin_for_Kids_and_Beginners-1.jpg`,
    buttonLabel: 'Watch',
    href: 'https://www.youtube.com/watch?v=xvo_m_r2ubg&t=8s',
  },
  {
    title: 'Goodnight Bitcoin',
    description:
      'Goodnight Bitcoin by Mallory Sibley and Scott Sibley is an origin tale recounting how Satoshi Nakamoto created Bitcoin and sent it out into the world.',
    image: `${R2}/uploads/2024/12/African-Bitcoiners_Goodnight_Bitcoin_book_for_kids.jpeg`,
    buttonLabel: 'Read',
    href: 'https://shamory.com/product/goodnight-bitcoin/',
  },
  {
    title: 'Tuttle Twins',
    description:
      'The Tuttle Twins show is a show by Connar Boyack about tween twins, a crazy grandma & a time-traveling wheelchair. The show teaches kids about freedom, economics, and Bitcoin.',
    image: `${R2}/uploads/2024/12/African-Bitcoiners-Bitcoin_for_Kids_Tuttle_Twins.jpg`,
    buttonLabel: 'Watch',
    href: 'https://www.youtube.com/@tuttletwins',
  },
  {
    title: 'Mitología Bitcoin',
    description:
      'Mitología Bitcoin explores the cultural narratives, myths, and collective imagination surrounding Bitcoin. Through historical parallels, expert interviews, and playful analysis, the book examines how blockchain technology, economic liberty, and digital sovereignty have inspired a modern storytelling tradition. It demystifies the jargon while offering critical perspectives on decentralization, trust, and the future of money. The English version will be coming up very soon.',
    image: `${R2}/uploads/2026/02/Mitologia-Bitcoin.png`,
    imageLayout: 'banner',
    buttonLabel: 'Read',
    href: 'https://veintiuno.btc.pub/libro/nins/mitologia-bitcoin/',
  },
]

const PAID_RESOURCES: Resource[] = [
  {
    title: 'Blockchain for Babies by Chris Ferrie',
    description:
      'This board book is part of the popular "Baby University" series, which simplifies complex concepts for young children. Blockchain for Babies introduces the basics of blockchain technology in a fun and accessible way.',
    image: `${R2}/uploads/2024/12/Blockchain-for-Babies-Bitcoin-book.jpg`,
    buttonLabel: 'Read',
    href: 'https://www.amazon.com/Blockchain-Babies-University-Chris-Ferrie/dp/1492680788',
  },
  {
    title: 'Bitcoin for Babies by Fernn Ray Gorodenzik',
    description:
      'Aimed at very young readers, this book focuses on introducing Bitcoin in the simplest terms. It uses cute illustrations and easy-to-understand language to explain what Bitcoin is.',
    image: `${R2}/uploads/2024/12/Bitcoin-for-Babies-by-Fernn-Ray-Gorodenzik-Bitcoin-bookc.jpg`,
    buttonLabel: 'Read',
    href: 'https://www.amazon.com/Bitcoin-Babies-bitcoin-trading-daycare/dp/198172365X',
  },
  {
    title: 'B is for Bitcoin by Graeme Moore',
    description:
      'This alphabet book takes kids on a journey from A to Z, with each letter representing a term related to Bitcoin or cryptocurrency, making learning fun and engaging.',
    image: `${R2}/uploads/2024/12/B-is-for-Bitcoin-by-Graeme-Moore_Bitcoin-for-kids-book.jpg`,
    buttonLabel: 'Read',
    href: 'https://www.amazon.com/B-Bitcoin-Graeme-Moore/dp/1999411102',
  },
  {
    title: 'The Valley of Prosperity: A Kid-Friendly Story of Bitcoin and Money',
    description:
      'Set in a fictional land, this storybook explains Bitcoin and the broader concept of money through the adventures of its young protagonists in the Valley of Prosperity.',
    image: `${R2}/uploads/2024/12/The-Valley-of-Prosperity_A-Kid-Friendly-Story-of-Bitcoin-and-Money.jpg`,
    buttonLabel: 'Read',
    href: 'https://www.amazon.com/Valley-Prosperity-mission-Invictus-mysterious/dp/83676510',
  },
  {
    title: 'Bitcoin for Kids: An Illustrated Guide by Michele',
    description:
      'This beautifully illustrated book is designed to make Bitcoin and blockchain concepts accessible and engaging for young readers through clear explanations and visuals.',
    image: `${R2}/uploads/2024/12/Bitcoin-for-Kids_An-Illustrated-Guide-by-Michele-Zaniolo.jpg`,
    buttonLabel: 'Read',
    href: 'https://www.amazon.com/Bitcoin-Kids-Illustrated-Michele-Zaniolo/dp/B0D12HFBT6',
  },
  {
    title: 'Bitcoin Money: A Tale of Bitville Discovering Good Money',
    description:
      "Bitcoin Money: A Tale of Bitville Discovering Good Money by Michael Caras is one of the most popular Bitcoin kids' books. It tells the story of a town discovering what makes money valuable.",
    image: `${R2}/uploads/2024/12/African-Bitcoiners_Bitcoin_Money_book_for_kids_by_Michael-Caras.jpg`,
    buttonLabel: 'Read',
    href: 'https://www.amazon.com/Bitcoin-Money-Tale-Bitville-Discovering/dp/0578490676',
  },
  {
    title: '99 Bitcoins and an Elephant',
    description:
      '99 Bitcoins and an Elephant is a tale of a young girl lost in a huge department store that becomes flush with Bitcoin. The story teaches kids about Bitcoin in an adventurous way.',
    image: `${R2}/uploads/2024/12/African-Bitcoiners_99_Bitcoins-__an_Elephant_book_for_kids.jpg`,
    buttonLabel: 'Read',
    href: 'https://www.amazon.com/99-Bitcoins-Elephant-Vincent-Chen/dp/1732557713',
  },
  {
    title: 'The Year a Girl Hears About Bitcoin',
    description:
      "The Year a Girl Hears About Bitcoin is a children's book that follows the journey of a 10-year-old girl who learns about Bitcoin and how it can change her family's financial future.",
    image: `${R2}/uploads/2024/12/African-Bitcoiners_The_Year_a_Girl_hears_about_Bitcoin_book_for_Kids.jpg`,
    buttonLabel: 'Read',
    href: 'https://www.amazon.com/Year-Girl-Hears-About-Bitcoin/dp/B0C1JB1W8G',
  },
  {
    title: 'The Bitcoin Whitepaper for Children',
    description:
      'The Bitcoin White Paper for kids was created by Ivan Campos. The White Paper is a simplified version of the original document, making Satoshi\'s vision accessible to young minds.',
    image: `${R2}/uploads/2024/12/African-Bitcoiners_Bitcoin_Whitepaper_For_Kids.png`,
    buttonLabel: 'Read',
    href: 'https://medium.com/@ivancampos/the-bitcoin-whitepaper-for-children-4b5a1f8bd6fa',
  },
  {
    title: 'The Bitcoin Kids',
    description:
      "Driven by a desire for his son's financial stability, Nzonda redirects his life mission to educate kids (2 to 15 y/o) about Bitcoin and financial literacy through engaging content.",
    image: `${R2}/uploads/2024/12/African-Bitcoiners_Bitcoin_Kids_Financial_Literacy_book_by_Nzonda.webp`,
    buttonLabel: 'Read',
    href: 'https://thebitcoinkids.com/',
  },
  {
    title: 'Bitcoin for KIDS With Dr. Gretchen',
    description:
      'In this one-day class, students will learn about Bitcoin and how to start investing in it. The class will be structured with interactive lessons designed for young learners.',
    image: `${R2}/uploads/2024/12/African-Bitcoiners_Bitcoin_for_Kids_with_Dr_Gretchen.png`,
    buttonLabel: 'Read',
    href: 'https://outschool.com/classes/bitcoin-for-kids-with-dr-gretchen-eUmu3dOc',
  },
  {
    title: 'Rhyming Bitcoin',
    description:
      "Dive into the world of 'Rhyming Bitcoin,' a playful journey by Bitcoin artist Brekkie von Bitcoin and illustrated by Florencia that teaches kids about Bitcoin through rhyme.",
    image: `${R2}/uploads/2024/12/African-Bitcoiners_Bitcoin_for_kids-Rhyming_Bitcoin.jpg`,
    buttonLabel: 'Read',
    href: 'https://www.amazon.com/Rhyming-Bitcoin-Jason-Don/dp/B0BKMPPTM1',
  },
  {
    title: 'Bitcoin for Smart Kids: Teaching Your Kids About Bitcoin',
    description:
      'In Bitcoin Smart Kids, Andy LaPointe and his 14-year-old daughter teach kids of all ages about Bitcoin. Simplifying the complex into lessons families can learn together.',
    image: `${R2}/uploads/2024/12/African-Bitcoiners_Bitcoin_Smart_Kids_Bitcoin-eduation.jpg`,
    buttonLabel: 'Read',
    href: 'https://www.amazon.com/Bitcoin-Smart-Kids-Teaching-Every/dp/108893658X',
  },
  {
    title: 'Bitcoin for Kids: Kids Guide to Understanding the Future of Money',
    description:
      'Discover the world of Bitcoin in this engaging book designed for children under 10. With simple explanations and colourful illustrations, it makes learning about money fun.',
    image: `${R2}/uploads/2024/12/African-Bitcoiners_Bitcoin_for_Kids_book.jpg`,
    buttonLabel: 'Read',
    href: 'https://www.amazon.com/Bitcoin-Kids-Quick-Understanding-Future/dp/B0BV1K51P6',
  },
]

function ResourceCard({ resource }: { resource: Resource }) {
  const isBanner = resource.imageLayout === 'banner'

  return (
    <article className="flex h-full flex-col rounded-tl-[40px] rounded-br-[40px] border border-black/[0.15] bg-white p-5">
      {isBanner ? (
        <Image
          src={resource.image}
          alt=""
          width={1103}
          height={189}
          className="mb-6 h-auto w-full object-contain"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      ) : (
        <div className="relative mb-6 aspect-square w-full overflow-hidden">
          <Image
            src={resource.image}
            alt={resource.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      <h3
        className="mb-5 font-heading text-[23px] font-bold leading-[30px] tracking-[-0.5px]"
        style={{ color: KIDS_ORANGE }}
      >
        {resource.title}
      </h3>
      <p className="mb-6 flex-1 text-[15px] leading-[25px]" style={{ color: KIDS_BODY }}>
        {resource.description}
      </p>
      <a
        href={resource.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-fit border border-[#E1640C] px-10 py-[15px] text-[15px] font-bold tracking-[-0.6px] text-[#E1640C] transition-colors hover:bg-[#E1640C] hover:text-white sm:px-[65px]"
      >
        {resource.buttonLabel}
      </a>
    </article>
  )
}

export function KidsPage() {
  return (
    <div className="overflow-x-hidden bg-[#FFFAF2] font-sans">
      {/* Hero */}
      <section
        className="bg-[#FFF2E0] bg-[length:100%_auto] bg-[position:0_-80px] bg-no-repeat pb-16 pt-8 sm:bg-[position:0_-120px] sm:pb-24 sm:pt-0 md:pb-[100px]"
        style={{ backgroundImage: `url(${IMG.heroBg})` }}
      >
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-8 px-4 sm:px-6 lg:px-8 md:grid-cols-2">
          <div className="pt-6 md:pt-[110px]">
            <h1
              className="text-left font-heading text-4xl font-black capitalize leading-tight tracking-[-0.6px] sm:text-5xl md:text-[56px] md:leading-[70px]"
              style={{ color: KIDS_ORANGE }}
            >
              Bitcoin Education for Kids
            </h1>
            <p
              className="mt-5 max-w-xl text-left text-base leading-7 tracking-[-0.5px] sm:text-[17px] sm:leading-[30px]"
              style={{ color: KIDS_TEXT }}
            >
              We believe financial education is vital for people of any age and this very much includes our
              children. In particular we believe it is healthy for children to learn about Bitcoin and hard
              money and why it is so important for humanity. There are many ways to teach them with analogies
              or by letting them experience it first hand.
            </p>
            <div className="mt-8">
              <a
                href="#free-resources"
                className="inline-flex rounded-md border border-[#D0D5DD] bg-white px-8 py-4 text-base font-semibold tracking-[-0.5px] text-[#344054] transition-colors hover:text-[#EC6744] sm:px-20"
              >
                Start Your Journey Here
              </a>
            </div>
          </div>
          <div className="hidden min-h-[280px] md:block" aria-hidden />
        </div>
      </section>

      {/* Free Resources */}
      <section id="free-resources" className="bg-[#FFFAF2] px-4 pb-4 pt-10 sm:px-6 md:pt-10">
        <div className="mx-auto max-w-[1200px]">
          <h2
            className="text-center font-heading text-4xl font-bold leading-tight md:text-5xl md:leading-[70px]"
            style={{ color: KIDS_ORANGE }}
          >
            Free Resources
          </h2>
          <div className="mx-auto mt-8 grid max-w-[1100px] grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {FREE_RESOURCES.map((r) => (
              <ResourceCard key={r.title} resource={r} />
            ))}
          </div>
        </div>
      </section>

      {/* Paid Resources */}
      <section className="bg-[#FFFAF3] px-4 py-12 sm:px-6 md:pt-[50px]">
        <div className="mx-auto max-w-[1100px]">
          <h2
            className="text-center font-heading text-4xl font-bold leading-tight md:text-5xl md:leading-[70px]"
            style={{ color: KIDS_ORANGE }}
          >
            Paid Resources
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PAID_RESOURCES.map((r) => (
              <ResourceCard key={r.title} resource={r} />
            ))}
          </div>
        </div>
      </section>

      {/* Course signup */}
      <section className="bg-[#FFFAF3] px-4 py-12 sm:px-6 md:py-16">
        <div className="mx-auto max-w-[800px] rounded-2xl border border-black/10 bg-white px-5 py-10 shadow-card sm:px-10 sm:py-12">
          <h2
            className="text-center font-heading text-lg font-bold uppercase leading-snug tracking-[-0.5px] sm:text-xl md:text-2xl"
            style={{ color: KIDS_ORANGE }}
          >
            Sign up for our free Bitcoin for Beginners course
          </h2>
          <div className="mt-8">
            <CourseModalBlockComponent
              triggerLabel="Start learning for free"
              variant="primary-orange"
              layout="inline"
              websiteUrl="https://course.bitcoiners.africa"
              fullWidth
            />
          </div>
        </div>
      </section>

      {/* Feedback CTA */}
      <section className="bg-[#FFFAF3] px-4 pb-16 pt-4 sm:px-6 md:pb-24">
        <div className="mx-auto max-w-[700px] text-center">
          <h2
            className="font-heading text-2xl font-bold leading-tight sm:text-3xl md:text-4xl md:leading-[50px]"
            style={{ color: KIDS_ORANGE }}
          >
            Get 1,000 sats for your brilliant ideas!
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 tracking-[-0.5px] sm:text-[17px] sm:leading-[30px]" style={{ color: KIDS_TEXT }}>
            Have a genius idea or spot something in our African Bitcoiners initiatives that could be even
            better? Submit your feedback to us and we&rsquo;re excited to reward you for them.
          </p>
          <div className="mt-8">
            <Link
              href="/earn-bitcoin/1000-sats-feedback-bounty/"
              className="inline-flex rounded-md border border-[#D0D5DD] bg-white px-10 py-4 text-base font-semibold tracking-[-0.5px] text-[#344054] transition-colors hover:text-brand-primary sm:px-16"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
