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
import { MostImpactfulNominationsPage } from '@/components/MostImpactfulNominationsPage'
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
import { GetCertificatePage } from '@/components/GetCertificatePage'
import { FinalQuizFailedPage } from '@/components/FinalQuizFailedPage'
import { FinalQuizPassedPage } from '@/components/FinalQuizPassedPage'
import { getFinalCourseFeedbackFields } from '@/lib/quiz-questions'
import { FaqsPage } from '@/components/FaqsPage'
import { faqSchema } from '@/components/FaqsPage/data'
import { getPageSeo } from '@/lib/seo-page-data'
import { buildStaticPageMetadata } from '@/utilities/buildStaticPageMetadata'
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
  const isMiabNominations = pageSlug === 'most-impactful-nominations'
  const isFaqs = pageSlug === 'faqs'

  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({
    slug: pageSlug,
  })

  if (!page && !isFeedbackSubmission && !isMiabNominations) {
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
  // isMiabNominations defined above for null-page guard
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

  const needsFinalFeedback = isFinalQuizFailed || isFinalQuizPassed || isFinalQuizPassedTg
  const finalFeedbackFields = needsFinalFeedback
    ? await getFinalCourseFeedbackFields('en')
    : []

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
      ) : isMiabNominations ? (
        <MostImpactfulNominationsPage />
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
        <FinalQuizFailedPage feedbackFields={finalFeedbackFields} />
      ) : isFinalQuizPassed || isFinalQuizPassedTg ? (
        <FinalQuizPassedPage feedbackFields={finalFeedbackFields} />
      ) : isGetCertificate || isGetCertificateTg ? (
        <GetCertificatePage />
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
    return buildStaticPageMetadata({
      title: 'Feedback Bounty Submission',
      description:
        'Submit your feedback on African Bitcoiners initiatives and earn 1,000 sats if your idea is implemented.',
      path: url,
    })
  }

  if (pageSlug === 'error') {
    return buildStaticPageMetadata({
      title: 'Error',
      description:
        'The email entered was not recognised. Please complete the course and final quiz, or contact support for help.',
      path: url,
    })
  }

  if (pageSlug === 'feedback-bounty-matrix') {
    return buildStaticPageMetadata({
      title: 'Feedback Bounty Matrix',
      description:
        'See every community feedback submission, its review status, and reward outcome on the African Bitcoiners bounty matrix.',
      path: url,
    })
  }

  const page = await queryPageBySlug({ slug: isHomePageSlug(pageSlug) ? HOME_PAGE_SLUG : pageSlug })

  // Keep Payload meta.image (for correct OG image) while overriding title/description from our SEO checklist.
  const staticSeo = getPageSeo(pageSlug)

  // If we have an explicit OG image in the checklist, use it directly (stronger than whatever is in Payload).
  if (staticSeo?.ogImage) {
    return buildStaticPageMetadata({
      title: staticSeo.title,
      description: staticSeo.description,
      path: url,
      ogImage: staticSeo.ogImage,
      slug: pageSlug,
    })
  }

  const docForMeta =
    staticSeo && page
      ? {
          ...page,
          meta: {
            ...(page as any).meta,
            title: staticSeo.title,
            description: staticSeo.description,
          },
        }
      : page

  return generateMeta({ doc: docForMeta, url })
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
