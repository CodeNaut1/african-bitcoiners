import Link from 'next/link'
import React from 'react'

type Post = {
  id: string | number
  title: string
  slug?: string | null
  excerpt?: string | null
}

const LINK_BLUE = '#046bd2'

export function NewsletterPostCard({ post }: { post: Post }) {
  if (!post.slug) return null

  return (
    <article className="mb-8 bg-white p-8 shadow-[0px_6px_15px_-2px_rgba(16,24,40,0.05)] md:p-12">
      <h2 className="font-sans text-xl font-bold leading-snug text-black md:text-2xl">
        <Link
          href={`/bitcoin-newsletter/${post.slug}`}
          className="underline decoration-black/30 underline-offset-2 transition-colors hover:opacity-80"
        >
          {post.title}
        </Link>
      </h2>
      {post.excerpt && (
        <p className="mt-4 font-sans text-base leading-relaxed text-brand-text-mid">{post.excerpt}</p>
      )}
      <p className="mt-4">
        <Link
          href={`/bitcoin-newsletter/${post.slug}`}
          className="font-sans text-base transition-opacity hover:opacity-80"
          style={{ color: LINK_BLUE }}
        >
          Read More &raquo;
        </Link>
      </p>
    </article>
  )
}
