import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { cache } from 'react'

import { HOME_PAGE_SLUG } from '@/utilities/homePage'

import PageTemplate from './[slug]/page'

const queryHomePage = cache(async () => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    depth: 0,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: { slug: { equals: HOME_PAGE_SLUG } },
  })

  return result.docs?.[0] ?? null
})

export default PageTemplate

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryHomePage()

  return {
    title: {
      absolute: page?.meta?.title || 'African Bitcoiners - Bringing Freedom to Africa',
    },
  }
}
