import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import PageClient from '../[slug]/page.client'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

export const revalidate = 600

export default async function LearnBitcoinPage() {
  const { isEnabled: draft } = await draftMode()
  const page = await queryPage()

  if (!page) return <PayloadRedirects url="/learn-bitcoin" />

  return (
    <div>
      <PageClient />
      <PayloadRedirects disableNotFound url="/learn-bitcoin" />
      {draft && <LivePreviewListener />}
      <RenderBlocks blocks={(page.content as any[]) ?? []} />
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryPage()
  return generateMeta({ doc: page })
}

const queryPage = cache(async () => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    draft,
    depth: 2,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: { slug: { equals: 'learn-bitcoin' } },
  })
  return result.docs?.[0] || null
})
