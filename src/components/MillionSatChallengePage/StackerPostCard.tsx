import Link from 'next/link'
import React from 'react'

import { getArchiveExcerpt } from '@/components/newsletter/utils'

const LINK_ORANGE = '#E1640C'

type Post = {
  title: string
  slug?: string | null
  excerpt?: string | null
  rawHtml?: string | null
  publishedDate?: string | null
}

function formatDate(dateStr?: string | null): string | null {
  if (!dateStr) return null
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return null
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export function StackerPostCard({ post }: { post: Post }) {
  if (!post.slug) return null

  const excerpt = getArchiveExcerpt(post)
  const href = `/bitcoin-newsletter/${post.slug}`
  const dateLabel = formatDate(post.publishedDate)

  return (
    <article className="flex h-full flex-col bg-white p-6 shadow-[0px_6px_15px_-2px_rgba(16,24,40,0.05)] md:p-8">
      <h2 className="text-lg font-bold leading-snug text-[#384958] md:text-xl">
        <Link href={href} className="transition-colors hover:text-[#E1640C]">
          {post.title}
        </Link>
      </h2>

      {excerpt && (
        <p className="mt-4 flex-1 text-[15px] leading-[1.5] text-[#384958]/90">{excerpt}</p>
      )}

      <div className="mt-5">
        <Link
          href={href}
          className="text-[15px] font-medium transition-colors hover:opacity-80"
          style={{ color: LINK_ORANGE }}
        >
          Read More
        </Link>
      </div>

      {dateLabel && (
        <p className="mt-4 flex items-center gap-2 text-sm text-[#384958]/70">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <time dateTime={post.publishedDate ?? undefined}>{dateLabel}</time>
        </p>
      )}
    </article>
  )
}
