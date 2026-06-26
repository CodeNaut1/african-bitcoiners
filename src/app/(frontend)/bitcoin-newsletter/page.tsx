import type { Metadata } from 'next'

import { NewsletterArchiveLayout } from '@/components/newsletter/NewsletterArchiveLayout'
import { POSTS_PER_PAGE } from '@/components/newsletter/data'
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
