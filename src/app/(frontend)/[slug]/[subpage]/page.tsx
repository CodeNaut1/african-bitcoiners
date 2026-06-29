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
import { SEO as africanBitcoinCommunitiesSeo } from '@/components/AfricanBitcoinCommunitiesPage/data'
import { AfricanBitcoinProjectsPage } from '@/components/AfricanBitcoinProjectsPage'
import { SEO as africanBitcoinProjectsSeo } from '@/components/AfricanBitcoinProjectsPage/data'
import { JuniorCopywriterJobPage } from '@/components/JuniorCopywriterJobPage'
import { SEO as juniorCopywriterJobSeo } from '@/components/JuniorCopywriterJobPage/data'
import { JuniorPhpCoderJobPage } from '@/components/JuniorPhpCoderJobPage'
import { SEO as juniorPhpCoderJobSeo } from '@/components/JuniorPhpCoderJobPage/data'
import { UxDesignerJobPage } from '@/components/UxDesignerJobPage'
import { SEO as uxDesignerJobSeo } from '@/components/UxDesignerJobPage/data'
import { GreatAfricanBitcoinSurveyPage } from '@/components/GreatAfricanBitcoinSurveyPage'
import { SEO as greatAfricanBitcoinSurveySeo } from '@/components/GreatAfricanBitcoinSurveyPage/data'
import { Top21AfricanBitcoinCountriesPage } from '@/components/Top21AfricanBitcoinCountriesPage'
import { SEO as top21AfricanBitcoinCountriesSeo } from '@/components/Top21AfricanBitcoinCountriesPage/data'
import { generateMeta } from '@/utilities/generateMeta'
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
        <Breadcrumbs
          variant={
            isFeedbackBounty ||
            isBitcoinerJobs ||
            isPlacesToEarnSats ||
            isMillionSatChallenge ||
            isRecommendedWallets ||
            isColdStorage ||
            isBuyingBitcoinP2P ||
            isAfricanBitcoinCommunities ||
            isAfricanBitcoinProjects ||
            isJuniorCopywriterJob ||
            isJuniorPhpCoderJob ||
            isUxDesignerJob ||
            isGreatAfricanBitcoinSurvey ||
            isTop21AfricanBitcoinCountries
              ? 'light'
              : 'dark'
          }
          items={breadcrumbItems}
        />
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

  if (slug === 'save-bitcoin' && subpage === 'million-sat-challenge') {
    return {
      title: 'The Million Sat Challenge - African Bitcoiners',
      description:
        'Join the Million Sat Challenge to earn and earn satoshis while learning about the power of Bitcoin and Bitcoin savings. Become part of our community dedicated to financial freedom.',
    }
  }

  if (slug === 'save-bitcoin' && subpage === 'recommended-bitcoin-and-lightning-wallets') {
    return {
      title: 'Recommended Bitcoin and Lightning Wallets',
      description:
        'Having a secure method for protecting your Bitcoin private keys is essential. Explore some of the best Bitcoin wallets we recommend, including desktop and mobile wallets.',
    }
  }

  if (slug === 'save-bitcoin' && subpage === 'how-to-setup-your-bitcoin-cold-storage-for-free') {
    return {
      title: 'How To Set Up Your Bitcoin Cold Storage For Free - African Bitcoiners',
      description:
        'Learn how to set up Bitcoin cold storage for free using paper wallets and mnemonic seed phrases. A step-by-step guide to keeping your Bitcoin safe offline.',
    }
  }

  if (slug === 'save-bitcoin' && subpage === 'buying-bitcoin-peer-to-peer') {
    return {
      title: 'Buying Bitcoin Peer to Peer - African Bitcoiners',
      description:
        'Discover trusted peer-to-peer platforms to buy Bitcoin privately in Africa. Compare fees, devices, and Lightning support.',
    }
  }

  if (slug === 'stale-pages-not-indexed' && subpage === 'african-bitcoin-communities') {
    return {
      title: africanBitcoinCommunitiesSeo.title,
      description: africanBitcoinCommunitiesSeo.description,
    }
  }

  if (slug === 'stale-pages-not-indexed' && subpage === 'african-bitcoin-projects') {
    return {
      title: africanBitcoinProjectsSeo.title,
      description: africanBitcoinProjectsSeo.description,
    }
  }

  if (slug === 'stale-pages-not-indexed' && subpage === 'junior-copywriter-and-community-manager') {
    return {
      title: juniorCopywriterJobSeo.title,
      description: juniorCopywriterJobSeo.description,
    }
  }

  if (slug === 'stale-pages-not-indexed' && subpage === 'junior-php-coder') {
    return {
      title: juniorPhpCoderJobSeo.title,
      description: juniorPhpCoderJobSeo.description,
    }
  }

  if (slug === 'stale-pages-not-indexed' && subpage === 'ux-designer') {
    return {
      title: uxDesignerJobSeo.title,
      description: uxDesignerJobSeo.description,
    }
  }

  if (slug === 'stale-pages-not-indexed' && subpage === 'the-great-african-bitcoin-survey') {
    return {
      title: greatAfricanBitcoinSurveySeo.title,
      description: greatAfricanBitcoinSurveySeo.description,
    }
  }

  if (slug === 'stale-pages-not-indexed' && subpage === 'top-21-african-bitcoin-countries') {
    return {
      title: top21AfricanBitcoinCountriesSeo.title,
      description: top21AfricanBitcoinCountriesSeo.description,
    }
  }

  const page = await queryPageBySlug({ slug: fullSlug })
  return generateMeta({ doc: page, url: `/${fullSlug}` })
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
