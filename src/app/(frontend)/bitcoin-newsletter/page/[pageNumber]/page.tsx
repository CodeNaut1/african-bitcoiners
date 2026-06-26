import type { Metadata } from 'next'

import { NewsletterArchiveLayout } from '@/components/newsletter/NewsletterArchiveLayout'
import { POSTS_PER_PAGE } from '@/components/newsletter/data'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

export const revalidate = 600

type Args = { params: Promise<{ pageNumber: string }> }

export default async function NewsletterArchivePageN({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const page = Number(pageNumber)

  if (!Number.isInteger(page) || page < 2) notFound()

  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: POSTS_PER_PAGE,
    page,
    sort: '-publishedDate',
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      excerpt: true,
      publishedDate: true,
      category: true,
    },
  })

  if (!posts.docs.length) notFound()

  return (
    <NewsletterArchiveLayout
      posts={posts.docs}
      page={page}
      totalPages={posts.totalPages}
      breadcrumbTail={`Page ${page}`}
    />
  )
}

export function generateMetadata(): Metadata {
  return { title: 'Bitcoin Newsletter | African Bitcoiners' }
}
