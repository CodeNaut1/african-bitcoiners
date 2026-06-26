import Link from 'next/link'
import React from 'react'

import { PROMO_CARDS } from '@/components/newsletter/data'
import { NewsletterPagination } from '@/components/newsletter/NewsletterPagination'
import { NewsletterPostCard } from '@/components/newsletter/NewsletterPostCard'
import { NewsletterSignupSidebar } from '@/components/newsletter/NewsletterSignupSidebar'
import { PromoCard } from '@/components/newsletter/PromoCard'

type Post = {
  id: string | number
  title: string
  slug?: string | null
  excerpt?: string | null
}

type Props = {
  posts: Post[]
  page: number
  totalPages: number
  breadcrumbTail?: string
}

function ArchiveBreadcrumbs({ tail }: { tail?: string }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-black/5 bg-brand-cream py-3 text-sm">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-1 text-black/60">
          <li>
            <Link href="/" className="transition-colors hover:text-brand-primary">
              Home
            </Link>
          </li>
          <li aria-hidden className="select-none text-[#cccccc]">
            &gt;
          </li>
          {tail ? (
            <>
              <li>
                <Link href="/bitcoin-newsletter" className="transition-colors hover:text-brand-primary">
                  Bitcoin Newsletter
                </Link>
              </li>
              <li aria-hidden className="select-none text-[#cccccc]">
                &gt;
              </li>
              <li>
                <span className="font-medium text-brand-primary">{tail}</span>
              </li>
            </>
          ) : (
            <li>
              <span className="font-medium text-brand-primary">Bitcoin Newsletter</span>
            </li>
          )}
        </ol>
      </div>
    </nav>
  )
}

export function NewsletterArchiveLayout({ posts, page, totalPages, breadcrumbTail }: Props) {
  return (
    <div className="min-h-screen bg-brand-cream font-sans">
      <ArchiveBreadcrumbs tail={breadcrumbTail} />

      <div className="mx-auto max-w-[1240px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
          <main className="min-w-0 lg:w-3/4 lg:pr-8">
            {posts.length === 0 && (
              <p className="text-brand-text-mid">No newsletter posts yet. Check back soon.</p>
            )}

            {posts.map((post) => (
              <NewsletterPostCard key={post.id} post={post} />
            ))}

            {totalPages > 1 && <NewsletterPagination page={page} totalPages={totalPages} />}
          </main>

          <aside className="flex w-full shrink-0 flex-col gap-8 lg:w-1/4 lg:pl-2">
            <NewsletterSignupSidebar />
            {PROMO_CARDS.map((card) => (
              <PromoCard key={card.title} {...card} />
            ))}
          </aside>
        </div>
      </div>
    </div>
  )
}
