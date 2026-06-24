import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { Container } from '@/components/ui/container'
import { NewsletterPagination } from '@/components/newsletter/NewsletterPagination'
import { NewsletterSignupSidebar } from '@/components/newsletter/NewsletterSignupSidebar'
import { PromoCard } from '@/components/newsletter/PromoCard'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import React from 'react'

export const dynamic = 'force-static'
export const revalidate = 600

const POSTS_PER_PAGE = 5

const PROMO_CARDS = [
  {
    title: 'Africa Free Routing',
    description: 'Lightning routing node serving the African continent — connecting Africa to the Bitcoin network.',
    href: 'https://freerouting.africa',
    bgColor: '#F7931A',
  },
  {
    title: 'BFB Course',
    description: 'Free Bitcoin for Beginners course designed specifically for Africans. Earn sats as you learn.',
    href: '/learn-bitcoin/free-bitcoin-course',
    bgColor: '#253343',
  },
  {
    title: 'Sats2Data',
    description: 'Buy mobile data with Bitcoin across Africa. Stay connected, stay sovereign.',
    href: '/spend-bitcoin/places-to-spend-bitcoin',
    bgColor: '#2B4899',
  },
]

export default async function NewsletterArchivePage() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: POSTS_PER_PAGE,
    page: 1,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      excerpt: true,
      publishedDate: true,
      category: true,
    },
  })

  return (
    <div className="min-h-screen bg-brand-cream">
      <Container className="py-8">
        <Breadcrumbs items={[{ label: 'Bitcoin Newsletter' }]} />

        <h1 className="mt-4 mb-8 text-3xl font-bold text-brand-secondary">Bitcoin Newsletter</h1>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* ── Main column ── */}
          <main className="flex-1 min-w-0">
            {posts.docs.length === 0 && (
              <p className="text-brand-text-muted">No newsletter posts yet. Check back soon.</p>
            )}

            <div className="flex flex-col gap-5">
              {posts.docs.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-card border border-brand-border-light p-5"
                >
                  <h2 className="text-base font-bold text-brand-secondary mb-1 leading-snug">
                    <Link
                      href={`/bitcoin-newsletter/${post.slug}`}
                      className="hover:text-brand-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  {post.publishedDate && (
                    <time dateTime={post.publishedDate} className="text-xs text-brand-text-muted font-medium block mb-2">
                      {new Date(post.publishedDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                  )}
                  {post.excerpt && (
                    <p className="text-sm text-brand-text-mid leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  <Link
                    href={`/bitcoin-newsletter/${post.slug}`}
                    className="inline-block mt-3 text-sm font-semibold text-brand-primary hover:text-brand-secondary transition-colors"
                  >
                    Read More »
                  </Link>
                </article>
              ))}
            </div>

            {posts.totalPages > 1 && (
              <NewsletterPagination page={posts.page ?? 1} totalPages={posts.totalPages} />
            )}
          </main>

          {/* ── Sidebar ── */}
          <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-24 flex flex-col gap-5">
            <NewsletterSignupSidebar />
            {PROMO_CARDS.map((card) => (
              <PromoCard key={card.title} {...card} />
            ))}
          </aside>
        </div>
      </Container>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Bitcoin Newsletter | African Bitcoiners',
    description:
      'Weekly updates on Bitcoin adoption, education, and community across Africa from African Bitcoiners.',
    openGraph: {
      title: 'Bitcoin Newsletter | African Bitcoiners',
      description: 'Weekly updates on Bitcoin adoption, education, and community across Africa.',
    },
  }
}
