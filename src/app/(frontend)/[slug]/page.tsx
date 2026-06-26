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
import { FeedbackBountySubmissionPage } from '@/components/FeedbackBountySubmissionPage'
import { FreedomMoneyPage } from '@/components/FreedomMoneyPage'
import { PartnershipPage } from '@/components/PartnershipPage'
import { MIAB2025Page } from '@/components/MIAB2025Page'
import { EcosystemPage } from '@/components/EcosystemPage'
import { TreasuryManifestoPage } from '@/components/TreasuryManifestoPage'
import { MiningPage } from '@/components/MiningPage'
import { HallOfFamePage } from '@/components/HallOfFamePage'
import { MeetupsPage } from '@/components/MeetupsPage'
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

  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({
    slug: pageSlug,
  })

  if (!page && !isFeedbackSubmission) {
    return <PayloadRedirects url={url} />
  }

  const content = page?.content
  const parent = page?.parent && typeof page.parent === 'object' ? (page.parent as any) : null
  const grandparent = parent?.parent && typeof parent.parent === 'object' ? parent.parent : null

  const breadcrumbItems = isFeedbackSubmission
    ? [{ label: 'Feedback Bounty Submission' }]
    : parent
      ? [
          ...(grandparent ? [{ label: grandparent.title, href: `/${grandparent.slug}` }] : []),
          { label: parent.title, href: `/${parent.slug}` },
          { label: page!.title },
        ]
      : []

  const isHome = pageSlug === HOME_PAGE_SLUG
  const isFreedomMoney = pageSlug === 'bitcoin-africas-guide-to-freedom-money'
  const isPartnership = pageSlug === 'bitcoin-education-partnership'
  const isMIAB2025 = pageSlug === 'the-most-impactful-african-bitcoiners-of-2025'
  const isEcosystem = pageSlug === 'african-bitcoin-ecosystem'
  const isTreasuryManifesto = pageSlug === 'african-bitcoin-treasury-manifesto'
  const isMiningPage = pageSlug === 'bitcoin-mining-in-africa'
  const isHallOfFame = pageSlug === 'hall-of-fame'
  const isBitcoinMeetups = pageSlug === 'bitcoin-meetups'

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
              name:
                breadcrumbItems[breadcrumbItems.length - 1]?.label ??
                page?.title ??
                'Feedback Bounty Submission',
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
      {breadcrumbSchema && <JsonLd data={breadcrumbSchema as Record<string, unknown>} />}

      {breadcrumbItems.length > 0 && (
        <Breadcrumbs variant={isFeedbackSubmission ? 'light' : 'dark'} items={breadcrumbItems} />
      )}

      {isFeedbackSubmission ? (
        <FeedbackBountySubmissionPage />
      ) : isFreedomMoney ? (
        <FreedomMoneyPage />
      ) : isPartnership ? (
        <PartnershipPage />
      ) : isMIAB2025 ? (
        <MIAB2025Page />
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
