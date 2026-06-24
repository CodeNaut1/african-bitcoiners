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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Bitcoin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bitcoin is a decentralised digital currency that operates without a central authority. It enables peer-to-peer transactions across the world without banks or governments.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is Bitcoin important for Africa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Bitcoin gives Africans a tool to protect their savings from inflation, send money across borders cheaply and instantly, and participate in the global economy without needing a bank account.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I start learning about Bitcoin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'African Bitcoiners offers a free Bitcoin for Beginners course delivered daily via email or Telegram. Visit /learn-bitcoin/free-bitcoin-course/ to sign up for free.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Bitcoin legal in Africa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bitcoin legality varies by country across Africa. In many countries it is legal to own and use Bitcoin, though some countries have restrictions. Always check your local regulations.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I earn Bitcoin in Africa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "You can earn Bitcoin through the 1,000 Sats Feedback Bounty programme, Bitcoin jobs listed on the African Bitcoiners platform, and by accepting Bitcoin as payment for your goods and services.",
      },
    },
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

  let page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({
    slug: pageSlug,
  })

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { content } = page
  const parent = page.parent && typeof page.parent === 'object' ? (page.parent as any) : null
  const grandparent = parent?.parent && typeof parent.parent === 'object' ? parent.parent : null

  const breadcrumbItems =
    parent
      ? [
          ...(grandparent
            ? [{ label: grandparent.title, href: `/${grandparent.slug}` }]
            : []),
          { label: parent.title, href: `/${parent.slug}` },
          { label: page.title },
        ]
      : []

  const isHome = pageSlug === HOME_PAGE_SLUG
  const isFaqs = pageSlug === 'faqs'

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
              name: breadcrumbItems[breadcrumbItems.length - 1]?.label ?? page.title,
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      )}

      <RenderBlocks blocks={(content as any[]) ?? []} />
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug: rawSlug } = await paramsPromise

  const pageSlug = rawSlug ? decodeURIComponent(rawSlug) : HOME_PAGE_SLUG
  const url = isHomePageSlug(pageSlug) ? '/' : `/${pageSlug}`
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
