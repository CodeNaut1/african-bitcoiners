import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/JsonLd'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import React, { cache } from 'react'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { AboutPage } from '@/components/AboutPage'
import { FeedbackBountySubmissionPage } from '@/components/FeedbackBountySubmissionPage'
import { FreedomMoneyPage } from '@/components/FreedomMoneyPage'
import { PartnershipPage } from '@/components/PartnershipPage'
import { MIAB2025Page } from '@/components/MIAB2025Page'
import { MIAB2022Page } from '@/components/MIAB2022Page'
import { MIAB2023Page } from '@/components/MIAB2023Page'
import { MIAB2024Page } from '@/components/MIAB2024Page'
import { EcosystemPage } from '@/components/EcosystemPage'
import { TreasuryManifestoPage } from '@/components/TreasuryManifestoPage'
import { MiningPage } from '@/components/MiningPage'
import { HallOfFamePage } from '@/components/HallOfFamePage'
import { MeetupsPage } from '@/components/MeetupsPage'
import { Turns3Page } from '@/components/Turns3Page'
import { BuyBitcoinPrivatelyPage } from '@/components/BuyBitcoinPrivatelyPage'
import { GraduateProgramPage } from '@/components/GraduateProgramPage'
import { CommunityBuildersPage } from '@/components/CommunityBuildersPage'
import { BitcoinExpertPackPage } from '@/components/BitcoinExpertPackPage'
import { BitcoinIntermediatePackPage } from '@/components/BitcoinIntermediatePackPage'
import { BitcoinStarterPackPage } from '@/components/BitcoinStarterPackPage'
import { BtrustPartnersPage } from '@/components/BtrustPartnersPage'
import { CommunityPage } from '@/components/CommunityPage'
import { CommunityOutreachPage } from '@/components/CommunityOutreachPage'
import { DonationConfirmationPage } from '@/components/DonationConfirmationPage'
import { EarnBitcoinPage } from '@/components/EarnBitcoinPage'
import { SaveBitcoinPage } from '@/components/SaveBitcoinPage'
import { SpendBitcoinPage } from '@/components/SpendBitcoinPage'
import { ErrorPage } from '@/components/ErrorPage'
import { FeedbackBountyMatrixPage } from '@/components/FeedbackBountyMatrixPage'
import { HerPage } from '@/components/HerPage'
import { OrganizationActivityUpdatePage } from '@/components/OrganizationActivityUpdatePage'
import { NostrGuidePage } from '@/components/NostrGuidePage'
import { SEO as nostrGuideSeo } from '@/components/NostrGuidePage/data'
import { GetCertificatePage } from '@/components/GetCertificatePage'
import { GetCertificateTgPage } from '@/components/GetCertificateTgPage'
import { FinalQuizFailedPage } from '@/components/FinalQuizFailedPage'
import { FinalQuizPassedPage } from '@/components/FinalQuizPassedPage'
import { FinalQuizPassedTgPage } from '@/components/FinalQuizPassedTgPage'
import { FaqsPage } from '@/components/FaqsPage'
import { faqSchema } from '@/components/FaqsPage/data'
import { generateMeta } from '@/utilities/generateMeta'
import { HOME_PAGE_SLUG, isHomePageSlug } from '@/utilities/homePage'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://bitcoiners.africa'

export const revalidate = 600

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'African Bitcoiners',
  url: SITE_URL,
  logo: `${SITE_URL}/images/ab-logo.png`,
  description:
    'Bitcoin education and adoption platform dedicated to building a Bitcoin-friendly Africa.',
  sameAs: [
    'https://twitter.com/afribitcoiners',
    'https://www.instagram.com/africanbitcoiners',
    'https://www.facebook.com/africanbitcoiners',
    'https://www.linkedin.com/company/africanbitcoiners',
    'https://t.me/africanbitcoiners',
  ],
}

type Args = {
  params: Promise<{ slug?: string }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug: rawSlug } = await paramsPromise

  if (rawSlug) {
    const decodedSlug = decodeURIComponent(rawSlug)
    if (isHomePageSlug(decodedSlug)) {
      redirect('/')
    }
  }

  const pageSlug = rawSlug ? decodeURIComponent(rawSlug) : HOME_PAGE_SLUG
  const url = rawSlug ? '/' + pageSlug : '/'
  const isFeedbackSubmission = pageSlug === 'feedback-bounty-submission'
  const isFaqs = pageSlug === 'faqs'

  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({
    slug: pageSlug,
  })

  if (!page && !isFeedbackSubmission) {
    return <PayloadRedirects url={url} />
  }

  const content = page?.content
  const parent = page?.parent && typeof page.parent === 'object' ? (page.parent as any) : null
  const grandparent = parent?.parent && typeof parent.parent === 'object' ? parent.parent : null

  const breadcrumbItems = isFaqs
    ? []
    : isFeedbackSubmission
    ? [{ label: 'Feedback Bounty Submission' }]
    : parent
      ? [
          ...(grandparent
            ? [{ label: grandparent.title, href: `/${grandparent.slug}` }]
            : []),
          { label: parent.title, href: `/${parent.slug}` },
          { label: page!.title },
        ]
      : []

  const isHome = pageSlug === HOME_PAGE_SLUG
  const isAboutUs = pageSlug === 'about-us'
  const isFreedomMoney = pageSlug === 'bitcoin-africas-guide-to-freedom-money'
  const isPartnership = pageSlug === 'bitcoin-education-partnership'
  const isMIAB2025 = pageSlug === 'the-most-impactful-african-bitcoiners-of-2025'
  const isMIAB2022 = pageSlug === 'the-most-impactful-african-bitcoiners-of-2022'
  const isMIAB2023 = pageSlug === 'the-most-impactful-african-bitcoiners-of-2023'
  const isMIAB2024 = pageSlug === 'the-most-impactful-african-bitcoiners-of-2024'
  const isEcosystem = pageSlug === 'african-bitcoin-ecosystem'
  const isTreasuryManifesto = pageSlug === 'african-bitcoin-treasury-manifesto'
  const isMiningPage = pageSlug === 'bitcoin-mining-in-africa'
  const isHallOfFame = pageSlug === 'hall-of-fame'
  const isBitcoinMeetups = pageSlug === 'bitcoin-meetups'
  const isTurns3 = pageSlug === 'african-bitcoiners-turns-3'
  const isBuyBitcoinPrivately = pageSlug === 'where-to-buy-bitcoin-privately-in-africa'
  const isGraduateProgram = pageSlug === 'graduate-program'
  const isCommunityBuilders = pageSlug === 'african-bitcoiners-community-builders'
  const isBitcoinExpertPack = pageSlug === 'bitcoin-expert-pack'
  const isBitcoinIntermediatePack = pageSlug === 'bitcoin-intermediate-pack'
  const isBitcoinStarterPack = pageSlug === 'bitcoin-starter-pack'
  const isBtrustPartners = pageSlug === 'btrust-partners-with-africa-freee-routing'
  const isCommunity = pageSlug === 'community'
  const isCommunityOutreach = pageSlug === 'community-outreach'
  const isDonationConfirmation = pageSlug === 'donation-confirmation'
  const isEarnBitcoin = pageSlug === 'earn-bitcoin'
  const isSaveBitcoin = pageSlug === 'save-bitcoin'
  const isSpendBitcoin = pageSlug === 'spend-bitcoin'
  const isError = pageSlug === 'error'
  const isFeedbackBountyMatrix = pageSlug === 'feedback-bounty-matrix'
  const isFinalQuizFailed = pageSlug === 'final-quiz-failed'
  const isFinalQuizPassed = pageSlug === 'final-quiz-passed'
  const isFinalQuizPassedTg = pageSlug === 'final-quiz-passed-tg'
  const isGetCertificate = pageSlug === 'get-certificate'
  const isGetCertificateTg = pageSlug === 'get-certificate-tg'
  const isHer = pageSlug === 'her'
  const isOrganizationActivityUpdate = pageSlug === 'organization-activity-update'
  const isNostrGuide = pageSlug === 'step-by-step-guide-for-nostr'

  const breadcrumbSchema =
    breadcrumbItems.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            ...breadcrumbItems
              .filter((item) => item.href)
              .map((item, index) => ({
                '@type': 'ListItem',
                position: index + 2,
                name: item.label,
                item: `${SITE_URL}${item.href}`,
              })),
            {
              '@type': 'ListItem',
              position: breadcrumbItems.length + 1,
              name: breadcrumbItems[breadcrumbItems.length - 1]?.label ?? page?.title ?? 'Feedback Bounty Submission',
            },
          ],
        }
      : null

  return (
    <div>
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      {isHome && <JsonLd data={organizationSchema as Record<string, unknown>} />}
      {isFaqs && <JsonLd data={faqSchema as Record<string, unknown>} />}
      {breadcrumbSchema && <JsonLd data={breadcrumbSchema as Record<string, unknown>} />}

      {breadcrumbItems.length > 0 && (
        <Breadcrumbs items={breadcrumbItems} />
      )}

      {isFeedbackSubmission ? (
        <FeedbackBountySubmissionPage />
      ) : isAboutUs ? (
        <AboutPage />
      ) : isFreedomMoney ? (
        <FreedomMoneyPage />
      ) : isPartnership ? (
        <PartnershipPage />
      ) : isMIAB2025 ? (
        <MIAB2025Page />
      ) : isMIAB2022 ? (
        <MIAB2022Page />
      ) : isMIAB2023 ? (
        <MIAB2023Page />
      ) : isMIAB2024 ? (
        <MIAB2024Page />
      ) : isEcosystem ? (
        <EcosystemPage />
      ) : isTreasuryManifesto ? (
        <TreasuryManifestoPage />
      ) : isMiningPage ? (
        <MiningPage />
      ) : isHallOfFame ? (
        <HallOfFamePage />
      ) : isBitcoinMeetups ? (
        <MeetupsPage />
      ) : isTurns3 ? (
        <Turns3Page />
      ) : isFaqs ? (
        <FaqsPage />
      ) : isBuyBitcoinPrivately ? (
        <BuyBitcoinPrivatelyPage />
      ) : isGraduateProgram ? (
        <GraduateProgramPage />
      ) : isCommunityBuilders ? (
        <CommunityBuildersPage />
      ) : isBitcoinExpertPack ? (
        <BitcoinExpertPackPage />
      ) : isBitcoinIntermediatePack ? (
        <BitcoinIntermediatePackPage />
      ) : isBitcoinStarterPack ? (
        <BitcoinStarterPackPage />
      ) : isBtrustPartners ? (
        <BtrustPartnersPage />
      ) : isCommunity ? (
        <CommunityPage />
      ) : isCommunityOutreach ? (
        <CommunityOutreachPage />
      ) : isDonationConfirmation ? (
        <DonationConfirmationPage />
      ) : isEarnBitcoin ? (
        <EarnBitcoinPage />
      ) : isSaveBitcoin ? (
        <SaveBitcoinPage />
      ) : isSpendBitcoin ? (
        <SpendBitcoinPage />
      ) : isError ? (
        <ErrorPage />
      ) : isFeedbackBountyMatrix ? (
        <FeedbackBountyMatrixPage />
      ) : isFinalQuizFailed ? (
        <FinalQuizFailedPage />
      ) : isFinalQuizPassed ? (
        <FinalQuizPassedPage />
      ) : isFinalQuizPassedTg ? (
        <FinalQuizPassedTgPage />
      ) : isGetCertificate ? (
        <GetCertificatePage />
      ) : isGetCertificateTg ? (
        <GetCertificateTgPage />
      ) : isHer ? (
        <HerPage />
      ) : isOrganizationActivityUpdate ? (
        <OrganizationActivityUpdatePage />
      ) : isNostrGuide ? (
        <NostrGuidePage />
      ) : (
        <RenderBlocks blocks={(content as any[]) ?? []} isHome={isHome} />
      )}
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug: rawSlug } = await paramsPromise

  const pageSlug = rawSlug ? decodeURIComponent(rawSlug) : HOME_PAGE_SLUG
  const url = isHomePageSlug(pageSlug) ? '/' : `/${pageSlug}`

  if (pageSlug === 'feedback-bounty-submission') {
    return {
      title: 'Feedback Bounty Submission — African Bitcoiners',
      description:
        'Submit your feedback on African Bitcoiners initiatives and earn 1,000 sats if your idea is implemented.',
      alternates: { canonical: url },
    }
  }

  if (pageSlug === 'where-to-buy-bitcoin-privately-in-africa') {
    return {
      title: 'Where to Buy Bitcoin Privately in Africa - African Bitcoiners',
      description:
        'Learn how to buy Bitcoin anonymously in Africa using safe, privacy-focused methods. Discover trusted platforms, practical tips, and tools for staying private while going Bitcoin.',
      alternates: { canonical: url },
    }
  }

  if (pageSlug === 'graduate-program') {
    return {
      title: 'Graduate Program - African Bitcoiners',
      description:
        'Are you a young African Bitcoiner? Join a fast-growing team bringing freedom to Africa through Bitcoin. Build your skills and lay the foundation for a career in Bitcoin.',
      alternates: { canonical: url },
    }
  }

  if (pageSlug === 'african-bitcoiners-community-builders') {
    return {
      title: 'African Bitcoiners Community Builders - African Bitcoiners',
      description:
        'Join us in revolutionizing Bitcoin adoption across Africa as we empower communities through meetups and events — all driven by our dedicated Community Builders.',
      alternates: { canonical: url },
    }
  }

  if (pageSlug === 'bitcoin-expert-pack') {
    return {
      title: 'Bitcoin Expert Pack - African Bitcoiners',
      description:
        'Already deep into Bitcoin? The Expert Pack offers advanced insights, tools, and resources for seasoned Bitcoiners looking to lead, build, or contribute more to the ecosystem.',
      alternates: { canonical: url },
    }
  }

  if (pageSlug === 'bitcoin-intermediate-pack') {
    return {
      title: 'Bitcoin Intermediate Pack - African Bitcoiners',
      description:
        'Level up your Bitcoin knowledge with our Intermediate Pack. Learn key concepts, tools, and strategies to grow your confidence and navigate Bitcoin like a pro',
      alternates: { canonical: url },
    }
  }

  if (pageSlug === 'bitcoin-starter-pack') {
    return {
      title: 'Bitcoin Starter Pack - African Bitcoiners',
      description:
        'New to Bitcoin? Start your journey here! Our Bitcoin Starter Pack breaks down the basics, helping beginners understand Bitcoin in simple, practical terms.',
      alternates: { canonical: url },
    }
  }

  if (pageSlug === 'btrust-partners-with-africa-freee-routing') {
    return {
      title: 'Btrust Partnership - African Bitcoiners',
      description:
        '₿trust partners with African Bitcoiners to launch Lightning-focused developer bootcamps across Africa supporting local talent, open-source contribution, and Bitcoin education in the Global South.',
      alternates: { canonical: url },
    }
  }

  if (pageSlug === 'community') {
    return {
      title: 'Community - African Bitcoiners',
      description:
        'A Bitcoin community bringing Freedom to Africa through Bitcoin. We help to onboard new African users and guide them safely on their Bitcoin journey from earning sats to self custody.',
      alternates: { canonical: url },
    }
  }

  if (pageSlug === 'community-outreach') {
    return {
      title: 'Community Outreach - African Bitcoiners',
      description:
        'Discover how African Bitcoiners brings Bitcoin education and outreach to communities across the continent — through meetups, partnerships, builders, and local events.',
      alternates: { canonical: url },
    }
  }

  if (pageSlug === 'donation-confirmation') {
    return {
      title: 'Thank You for Your Donation - African Bitcoiners',
      description:
        'Thank you for supporting African Bitcoiners. Share your feedback on the donation experience and help us improve.',
      alternates: { canonical: url },
    }
  }

  if (pageSlug === 'earn-bitcoin') {
    return {
      title: 'Earn Bitcoin - African Bitcoiners',
      description:
        'Discover how to earn Bitcoin in Africa with African Bitcoiners. Learn about the different ways to earn and start building your Bitcoin portfolio today.',
      alternates: { canonical: url },
    }
  }

  if (pageSlug === 'save-bitcoin') {
    return {
      title: 'Save Bitcoin - African Bitcoiners',
      description:
        'Learn how to save Bitcoin with African Bitcoiners. Find out about the best practices and tools to store your Bitcoin securely and protect your wealth.',
      alternates: { canonical: url },
    }
  }

  if (pageSlug === 'spend-bitcoin') {
    return {
      title: 'Spend Bitcoin - African Bitcoiners',
      description:
        'Find vendors and services that accept Bitcoin as payment. Explore the Bitcoiners Map and places to spend sats online across Africa.',
      alternates: { canonical: url },
    }
  }

  if (pageSlug === 'error') {
    return {
      title: 'Error - African Bitcoiners',
      description:
        'The email entered was not recognised. Please complete the course and final quiz, or contact support for help.',
      alternates: { canonical: url },
    }
  }

  if (pageSlug === 'feedback-bounty-matrix') {
    return {
      title: 'Feedback Bounty Matrix - African Bitcoiners',
      description:
        'See every community feedback submission, its review status, and reward outcome on the African Bitcoiners bounty matrix.',
      alternates: { canonical: url },
    }
  }

  if (pageSlug === 'final-quiz-failed') {
    return {
      title: 'Final Quiz Failed - African Bitcoiners',
      description:
        'You did not meet the pass mark on the Bitcoin for Beginners final quiz. Share your feedback and retake the quiz in a few days.',
      alternates: { canonical: url },
    }
  }

  if (pageSlug === 'final-quiz-passed') {
    return {
      title: 'Final Quiz Passed - African Bitcoiners',
      description:
        'Congratulations! You passed the Bitcoin for Beginners final quiz. Download your certificate and share your course feedback.',
      alternates: { canonical: url },
    }
  }

  if (pageSlug === 'final-quiz-passed-tg') {
    return {
      title: 'Final Quiz Passed (Telegram) - African Bitcoiners',
      description:
        'Congratulations! You passed the Bitcoin for Beginners final quiz via Telegram. Download your certificate and share your feedback.',
      alternates: { canonical: url },
    }
  }

  if (pageSlug === 'get-certificate') {
    return {
      title: 'Get Certificate - African Bitcoiners',
      description:
        'Download your Bitcoin for Beginners course certificate. Enter the email address you used to sign up and take the course.',
      alternates: { canonical: url },
    }
  }

  if (pageSlug === 'get-certificate-tg') {
    return {
      title: 'Get Certificate (Telegram) - African Bitcoiners',
      description:
        'Download your Bitcoin for Beginners course certificate. Enter the unique ID provided when you signed up via Telegram.',
      alternates: { canonical: url },
    }
  }

  if (pageSlug === 'her') {
    return {
      title: 'Bitcoin for Her: Empowering African Women with Bitcoin - African Bitcoiners',
      description:
        'Empower African women with Bitcoin at "Bitcoin for Her": Join our transformative Twitter Space event and ignite a movement of inclusion, innovation, and prosperity.',
      alternates: { canonical: url },
    }
  }

  if (pageSlug === 'organization-activity-update') {
    return {
      title: 'Organization Activity Update - African Bitcoiners',
      description:
        'Bitcoin Organization Activity Form — update whether your Bitcoin-focused organization is still active on African Bitcoiners.',
      alternates: { canonical: url },
    }
  }

  if (pageSlug === 'the-most-impactful-african-bitcoiners-of-2024') {
    return {
      title: 'The Most Impactful African Bitcoiners of 2024 - African Bitcoiners',
      description:
        'Uncover the stories of the top 21 African Bitcoin trailblazers revolutionizing Bitcoin and financial liberation in Africa. Their passion for Bitcoin is fueling adoption and empowering individuals across the continent.',
      alternates: { canonical: url },
    }
  }

  if (pageSlug === 'the-most-impactful-african-bitcoiners-of-2023') {
    return {
      title: 'The Most Impactful African Bitcoiners of 2023 - African Bitcoiners',
      description:
        'Uncover the stories of the top 21 African Bitcoin trailblazers revolutionizing Bitcoin and financial liberation in Africa. Their passion for Bitcoin is fueling adoption and empowering individuals across the continent.',
      alternates: { canonical: url },
    }
  }

  if (pageSlug === 'the-most-impactful-african-bitcoiners-of-2022') {
    return {
      title: 'The Most Impactful African Bitcoiners of 2022 - African Bitcoiners',
      description:
        'Discover the impact of 21 African bitcoiners making waves in Bitcoin news. These individuals are not only passionate about Bitcoin but are also using it to bring freedom to Africans.',
      alternates: { canonical: url },
    }
  }

  if (pageSlug === 'step-by-step-guide-for-nostr') {
    return {
      title: nostrGuideSeo.title,
      description: nostrGuideSeo.description,
      alternates: { canonical: url },
    }
  }

  const page = await queryPageBySlug({ slug: isHomePageSlug(pageSlug) ? HOME_PAGE_SLUG : pageSlug })
  return generateMeta({ doc: page, url })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    depth: 2,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: { slug: { equals: slug } },
  })

  return result.docs?.[0] || null
})
