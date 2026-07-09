import type { Metadata } from 'next'

import { NewsletterArchiveLayout } from '@/components/newsletter/NewsletterArchiveLayout'
import { ARCHIVE_META, POSTS_PER_PAGE } from '@/components/newsletter/data'
import { buildStaticPageMetadata } from '@/utilities/buildStaticPageMetadata'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function NewsletterArchivePage() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: POSTS_PER_PAGE,
    page: 1,
    sort: '-publishedDate',
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      excerpt: true,
      rawHtml: true,
      publishedDate: true,
      category: true,
    },
  })

  return (
    <NewsletterArchiveLayout
      posts={posts.docs}
      page={posts.page ?? 1}
      totalPages={posts.totalPages}
    />
  )
}

export function generateMetadata(): Metadata {
  return buildStaticPageMetadata({
    title: ARCHIVE_META.title,
    description: ARCHIVE_META.description,
    path: '/bitcoin-newsletter',
  })
}
