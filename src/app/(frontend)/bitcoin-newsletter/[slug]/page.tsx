import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { Container } from '@/components/ui/container'
import { JsonLd } from '@/components/JsonLd'
import { SocialShare } from '@/components/SocialShare'
import RichText from '@/components/RichText'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://bitcoiners.africa'

export const revalidate = 600

type Args = { params: Promise<{ slug?: string }> }

export default async function NewsletterPostPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/bitcoin-newsletter/' + decodedSlug

  const post = await queryPostBySlug({ slug: decodedSlug })

  if (!post) return <PayloadRedirects url={url} />

  const canonicalUrl = `${SITE_URL}${url}`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt ?? '',
    datePublished: post.publishedDate ?? post.createdAt,
    dateModified: post.updatedAt,
    url: canonicalUrl,
    author: {
      '@type': 'Organization',
      name: 'African Bitcoiners',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'African Bitcoiners',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/ab-logo.png`,
      },
    },
    ...(post.featuredImage &&
      typeof post.featuredImage === 'object' &&
      'url' in post.featuredImage && {
        image: `${SITE_URL}${(post.featuredImage as { url: string }).url}`,
      }),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Bitcoin Newsletter',
        item: `${SITE_URL}/bitcoin-newsletter`,
      },
      { '@type': 'ListItem', position: 3, name: post.title },
    ],
  }

  return (
    <div>
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <JsonLd data={articleSchema as Record<string, unknown>} />
      <JsonLd data={breadcrumbSchema as Record<string, unknown>} />

      <Breadcrumbs
        items={[
          { label: 'Bitcoin Newsletter', href: '/bitcoin-newsletter' },
          { label: post.title },
        ]}
      />

      <div className="bg-white">
      <Container narrow className="py-10">
        {post.excerpt && (
          <p className="text-lg text-brand-text-mid leading-relaxed mb-8 font-medium border-l-4 border-brand-primary pl-4">
            {post.excerpt}
          </p>
        )}

        {(post as any).rawHtml ? (
          <div
            className="newsletter-content text-brand-text-dark"
            dangerouslySetInnerHTML={{ __html: (post as any).rawHtml }}
          />
        ) : (
          post.content && <RichText data={post.content} enableGutter={false} />
        )}

        {/* Footer actions */}
        <div className="mt-12 pt-8 border-t border-brand-border-light flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <SocialShare url={canonicalUrl} title={post.title} />

          <a
            href={`mailto:newsletter@bitcoiners.africa?subject=Re: ${encodeURIComponent(post.title)}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-btn border-2 border-brand-secondary text-brand-secondary font-semibold text-sm hover:bg-brand-secondary hover:text-white transition-colors duration-200"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 0 1 8 8v2M3 10l6 6m-6-6 6-6" />
            </svg>
            Reply to this Post
          </a>
        </div>
      </Container>
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ slug: decodedSlug })
  return generateMeta({ doc: post, url: `/bitcoin-newsletter/${decodedSlug}` })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    draft,
    depth: 2,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: { slug: { equals: slug } },
  })
  return result.docs?.[0] || null
})
