import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/JsonLd'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { FeedbackBountyPage } from '@/components/FeedbackBountyPage'
import { BitcoinerJobsPage } from '@/components/BitcoinerJobsPage'
import { PlacesToEarnSatsPage } from '@/components/PlacesToEarnSatsPage'
import { BitcoinersMapPage } from '@/components/BitcoinersMapPage'
import { PlacesToSpendPage } from '@/components/PlacesToSpendPage'
import { SupportUsPage } from '@/components/SupportUsPage'
import { ProofOfWorkPage } from '@/components/ProofOfWorkPage'
import { OurTeamPage } from '@/components/OurTeamPage'
import { ConnectWithUsPage } from '@/components/ConnectWithUsPage'
import { WhyWeArePrivatePage } from '@/components/WhyWeArePrivatePage'
import { MillionSatChallengePage } from '@/components/MillionSatChallengePage'
import { RecommendedWalletsPage } from '@/components/RecommendedWalletsPage'
import { ColdStoragePage } from '@/components/ColdStoragePage'
import { BuyBitcoinPrivatelyPage } from '@/components/BuyBitcoinPrivatelyPage'
import { AfricanBitcoinCommunitiesPage } from '@/components/AfricanBitcoinCommunitiesPage'
import { AfricanBitcoinProjectsPage } from '@/components/AfricanBitcoinProjectsPage'
import { JuniorCopywriterJobPage } from '@/components/JuniorCopywriterJobPage'
import { JuniorPhpCoderJobPage } from '@/components/JuniorPhpCoderJobPage'
import { UxDesignerJobPage } from '@/components/UxDesignerJobPage'
import { GreatAfricanBitcoinSurveyPage } from '@/components/GreatAfricanBitcoinSurveyPage'
import { Top21AfricanBitcoinCountriesPage } from '@/components/Top21AfricanBitcoinCountriesPage'
import { generateMeta } from '@/utilities/generateMeta'
import { getPageSeo } from '@/lib/seo-page-data'
import { buildStaticPageMetadata } from '@/utilities/buildStaticPageMetadata'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://bitcoiners.africa'

export const revalidate = 600

type Args = {
  params: Promise<{ slug: string; subpage: string }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug, subpage } = await paramsPromise
  const fullSlug = `${decodeURIComponent(slug)}/${decodeURIComponent(subpage)}`
  const url = '/' + fullSlug

  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({
    slug: fullSlug,
  })

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { content } = page
  const parent = page.parent && typeof page.parent === 'object' ? (page.parent as any) : null
  const grandparent = parent?.parent && typeof parent.parent === 'object' ? parent.parent : null
  const isFeedbackBounty = slug === 'earn-bitcoin' && subpage === '1000-sats-feedback-bounty'
  const isBitcoinerJobs = slug === 'earn-bitcoin' && subpage === 'bitcoiner-jobs'
  const isPlacesToEarnSats = slug === 'earn-bitcoin' && subpage === 'places-to-earn-sats'
  const isBitcoinersMap = slug === 'spend-bitcoin' && subpage === 'bitcoiners-map'
  const isPlacesToSpend = slug === 'spend-bitcoin' && subpage === 'places-to-spend-bitcoin'
  const isSupportUs = slug === 'about-us' && subpage === 'support-us'
  const isProofOfWork = slug === 'about-us' && subpage === 'african-bitcoiners-proof-of-work'
  const isOurTeam = slug === 'about-us' && subpage === 'our-team'
  const isConnectWithUs = slug === 'about-us' && subpage === 'connect-with-us'
  const isWhyWeArePrivate = slug === 'about-us' && subpage === 'why-we-are-private'
  const isMillionSatChallenge = slug === 'save-bitcoin' && subpage === 'million-sat-challenge'
  const isRecommendedWallets =
    slug === 'save-bitcoin' && subpage === 'recommended-bitcoin-and-lightning-wallets'
  const isColdStorage =
    slug === 'save-bitcoin' && subpage === 'how-to-setup-your-bitcoin-cold-storage-for-free'
  const isBuyingBitcoinP2P = slug === 'save-bitcoin' && subpage === 'buying-bitcoin-peer-to-peer'
  const isAfricanBitcoinCommunities =
    slug === 'stale-pages-not-indexed' && subpage === 'african-bitcoin-communities'
  const isAfricanBitcoinProjects =
    slug === 'stale-pages-not-indexed' && subpage === 'african-bitcoin-projects'
  const isJuniorCopywriterJob =
    slug === 'stale-pages-not-indexed' && subpage === 'junior-copywriter-and-community-manager'
  const isJuniorPhpCoderJob = slug === 'stale-pages-not-indexed' && subpage === 'junior-php-coder'
  const isUxDesignerJob = slug === 'stale-pages-not-indexed' && subpage === 'ux-designer'
  const isGreatAfricanBitcoinSurvey =
    slug === 'stale-pages-not-indexed' && subpage === 'the-great-african-bitcoin-survey'
  const isTop21AfricanBitcoinCountries =
    slug === 'stale-pages-not-indexed' && subpage === 'top-21-african-bitcoin-countries'

  const breadcrumbItems = [
    ...(grandparent ? [{ label: grandparent.title, href: `/${grandparent.slug}` }] : []),
    ...(parent ? [{ label: parent.title, href: `/${parent.slug}` }] : []),
    { label: page.title },
  ]

  const breadcrumbSchema =
    breadcrumbItems.length > 1
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
              name: page.title,
            },
          ],
        }
      : null

  return (
    <div>
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      {breadcrumbSchema && <JsonLd data={breadcrumbSchema as Record<string, unknown>} />}

      {breadcrumbItems.length > 1 && (
        <Breadcrumbs items={breadcrumbItems} />
      )}

      {isFeedbackBounty ? (
        <FeedbackBountyPage />
      ) : isBitcoinerJobs ? (
        <BitcoinerJobsPage jobs={await queryActiveJobs()} />
      ) : isPlacesToEarnSats ? (
        <PlacesToEarnSatsPage />
      ) : isBitcoinersMap ? (
        <BitcoinersMapPage />
      ) : isPlacesToSpend ? (
        <PlacesToSpendPage />
      ) : isSupportUs ? (
        <SupportUsPage />
      ) : isProofOfWork ? (
        <ProofOfWorkPage />
      ) : isOurTeam ? (
        <OurTeamPage />
      ) : isConnectWithUs ? (
        <ConnectWithUsPage />
      ) : isWhyWeArePrivate ? (
        <WhyWeArePrivatePage />
      ) : isMillionSatChallenge ? (
        <MillionSatChallengePage stackerPosts={await querySaturdayStackerPosts()} />
      ) : isRecommendedWallets ? (
        <RecommendedWalletsPage />
      ) : isColdStorage ? (
        <ColdStoragePage />
      ) : isBuyingBitcoinP2P ? (
        <BuyBitcoinPrivatelyPage variant="hub" />
      ) : isAfricanBitcoinCommunities ? (
        <AfricanBitcoinCommunitiesPage />
      ) : isAfricanBitcoinProjects ? (
        <AfricanBitcoinProjectsPage />
      ) : isJuniorCopywriterJob ? (
        <JuniorCopywriterJobPage />
      ) : isJuniorPhpCoderJob ? (
        <JuniorPhpCoderJobPage />
      ) : isUxDesignerJob ? (
        <UxDesignerJobPage />
      ) : isGreatAfricanBitcoinSurvey ? (
        <GreatAfricanBitcoinSurveyPage />
      ) : isTop21AfricanBitcoinCountries ? (
        <Top21AfricanBitcoinCountriesPage />
      ) : (
        <RenderBlocks blocks={(content as any[]) ?? []} />
      )}
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug, subpage } = await paramsPromise
  const fullSlug = `${decodeURIComponent(slug)}/${decodeURIComponent(subpage)}`

  const staticSeo = getPageSeo(fullSlug)
  const page = await queryPageBySlug({ slug: fullSlug })

  if (staticSeo?.ogImage) {
    return buildStaticPageMetadata({
      title: staticSeo.title,
      description: staticSeo.description,
      path: `/${fullSlug}`,
      ogImage: staticSeo.ogImage,
      slug: fullSlug,
    })
  }

  // Keep Payload meta.image (for correct OG image) while overriding title/description from our SEO checklist.
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

  return generateMeta({ doc: docForMeta, url: `/${fullSlug}` })
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

const queryActiveJobs = cache(async () => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'jobs',
    depth: 0,
    limit: 50,
    pagination: false,
    where: { isActive: { equals: true } },
    sort: '-postedDate',
  })
  return (result.docs ?? []).map((job) => ({
    id: String(job.id),
    title: job.title,
    company: job.company,
    location: job.location,
    type: job.type,
    postedDate: job.postedDate,
    slug: typeof job.slug === 'string' ? job.slug : null,
  }))
})

const querySaturdayStackerPosts = cache(async () => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    depth: 0,
    limit: 3,
    pagination: false,
    where: {
      and: [
        { category: { equals: 'saturday-stacker' } },
        { _status: { equals: 'published' } },
      ],
    },
    sort: '-publishedDate',
    select: {
      title: true,
      slug: true,
      excerpt: true,
      rawHtml: true,
      publishedDate: true,
    },
  })

  return result.docs ?? []
})
