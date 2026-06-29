import Link from 'next/link'
import React from 'react'

import { SIDEBAR_PROMOS } from '@/components/newsletter/data'
import { NewsletterPagination } from '@/components/newsletter/NewsletterPagination'
import { NewsletterPostCard } from '@/components/newsletter/NewsletterPostCard'
import { NewsletterSignupSidebar } from '@/components/newsletter/NewsletterSignupSidebar'
import { PromoCard } from '@/components/newsletter/PromoCard'

type Post = {
  id: string | number
  title: string
  slug?: string | null
  excerpt?: string | null
  rawHtml?: string | null
}

type Props = {
  posts: Post[]
  page: number
  totalPages: number
  breadcrumbTail?: string
}

function ArchiveBreadcrumbs({ tail }: { tail?: string }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-[#e2e8f0] bg-white py-3 text-sm">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <ol className="trail-items flex flex-wrap items-center gap-0 text-[17px]">
          <li className="trail-item">
            <Link href="/" className="text-black/60 transition-colors hover:text-[#f27202]">
              Home
            </Link>
          </li>
          <li aria-hidden className="trail-item px-[0.3em] text-black/60">
            &raquo;
          </li>
          {tail ? (
            <>
              <li className="trail-item">
                <Link
                  href="/bitcoin-newsletter"
                  className="text-black/60 transition-colors hover:text-[#f27202]"
                >
                  Bitcoin Newsletter
                </Link>
              </li>
              <li aria-hidden className="trail-item px-[0.3em] text-black/60">
                &raquo;
              </li>
              <li className="trail-item trail-end font-medium text-[#f27202]">{tail}</li>
            </>
          ) : (
            <li className="trail-item trail-end font-medium text-[#f27202]">Bitcoin Newsletter</li>
          )}
        </ol>
      </div>
    </nav>
  )
}

export function NewsletterArchiveLayout({ posts, page, totalPages, breadcrumbTail }: Props) {
  return (
    <div className="min-h-screen bg-[#f9fafb] font-sans">
      <ArchiveBreadcrumbs tail={breadcrumbTail} />

      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
          <main className="min-w-0 lg:w-3/4 lg:pr-[60px]">
            {posts.length === 0 && (
              <p className="text-[#334155]">No newsletter posts yet. Check back soon.</p>
            )}

            {posts.map((post) => (
              <NewsletterPostCard key={post.id} post={post} />
            ))}

            {totalPages > 1 && <NewsletterPagination page={page} totalPages={totalPages} />}
          </main>

          <aside className="flex w-full shrink-0 flex-col gap-8 lg:sticky lg:top-4 lg:w-1/4 lg:self-start">
            <NewsletterSignupSidebar />
            {SIDEBAR_PROMOS.map((card) => (
              <PromoCard key={card.title} {...card} />
            ))}
          </aside>
        </div>
      </div>
    </div>
  )
}
