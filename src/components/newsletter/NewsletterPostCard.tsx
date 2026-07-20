import Link from 'next/link'
import React from 'react'

import { getArchiveExcerpt } from '@/components/newsletter/utils'

const LINK_BLUE = '#046bd2'

type Post = {
  id: string | number
  title: string
  slug?: string | null
  excerpt?: string | null
  rawHtml?: string | null
}

export function NewsletterPostCard({
  post,
  postBasePath = '/bitcoin-newsletter',
}: {
  post: Post
  postBasePath?: string
}) {
  if (!post.slug) return null

  const excerpt = getArchiveExcerpt(post)
  const href = `${postBasePath}/${post.slug}`

  return (
    <article className="mb-8 overflow-hidden bg-white p-8 shadow-[0px_6px_15px_-2px_rgba(16,24,40,0.05)] md:p-12">
      <h2 className="entry-title text-[1.529rem] font-bold leading-snug">
        <Link
          href={href}
          className="text-[#334155] underline decoration-[#334155]/30 underline-offset-2 transition-colors hover:text-[#046bd2]"
        >
          {post.title}
        </Link>
      </h2>

      {excerpt && (
        <div className="ast-excerpt-container mt-4 text-[17px] leading-[1.5] text-[#334155]">
          <p>{excerpt}</p>
        </div>
      )}

      <p className="mt-4">
        <Link
          href={href}
          className="text-[17px] font-medium transition-colors hover:text-[#045cb4]"
          style={{ color: LINK_BLUE }}
        >
          Read More &raquo;
        </Link>
      </p>
    </article>
  )
}
