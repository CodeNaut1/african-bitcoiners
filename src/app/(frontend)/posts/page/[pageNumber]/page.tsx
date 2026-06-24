import type { Metadata } from 'next/types'

import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 600

type Args = {
  params: Promise<{ pageNumber: string }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const sanitizedPageNumber = Number(pageNumber)
  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      excerpt: true,
      publishedDate: true,
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
        {posts?.page && posts?.totalPages > 1 && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Bitcoin Newsletter — Page ${pageNumber} | African Bitcoiners`,
  }
}
