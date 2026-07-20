import type { Metadata } from 'next'

import { NewsletterArchiveLayout } from '@/components/newsletter/NewsletterArchiveLayout'
import { POSTS_PER_PAGE } from '@/components/newsletter/data'
import { buildStaticPageMetadata } from '@/utilities/buildStaticPageMetadata'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-static'
export const revalidate = 600

const ARCHIVE_META = {
  title: 'Saturday Stacker',
  description:
    'Weekly action steps from the Saturday Stacker newsletter — practical Bitcoin stacking tips for African Bitcoiners.',
} as const

export default async function SaturdayStackerArchivePage() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: POSTS_PER_PAGE,
    page: 1,
    sort: '-publishedDate',
    overrideAccess: false,
    where: {
      category: { equals: 'saturday-stacker' },
    },
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
      archiveLabel="Saturday Stacker"
      archiveHref="/saturday-stacker"
      postBasePath="/saturday-stacker"
    />
  )
}

export function generateMetadata(): Metadata {
  return buildStaticPageMetadata({
    title: ARCHIVE_META.title,
    description: ARCHIVE_META.description,
    path: '/saturday-stacker',
  })
}
