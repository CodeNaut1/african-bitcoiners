import type { Metadata } from 'next/types'

import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import Link from 'next/link'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
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
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Bitcoin Newsletter</h1>
        </div>
      </div>
      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>
      <div className="container">
        <div className="flex flex-col gap-6">
          {posts.docs.map((post) => (
            <div key={post.id} className="border-b border-border pb-6">
              <Link href={`/posts/${post.slug}`} className="text-xl font-semibold hover:underline">
                {post.title}
              </Link>
              {post.excerpt && <p className="mt-2 text-muted-foreground">{post.excerpt}</p>}
            </div>
          ))}
        </div>
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Bitcoin Newsletter | African Bitcoiners',
  }
}
