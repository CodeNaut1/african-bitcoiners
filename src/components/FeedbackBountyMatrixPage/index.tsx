import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { MatrixTable } from '@/components/FeedbackBountyMatrixPage/MatrixTable'
import type { MatrixRow } from '@/components/FeedbackBountyMatrixPage/types'

const PAGE_BG = '#FFFCFA'
const HEADING = '#37312C'

async function queryRows(): Promise<MatrixRow[]> {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'feedback-bounties',
    limit: 500,
    overrideAccess: true,
    pagination: false,
    sort: '-createdAt',
  })

  return result.docs.map((doc) => ({
    id: doc.id as number,
    dateAdded: doc.createdAt as string,
    category: (doc.category as string | null) ?? null,
    description: ((doc.description as string | null) || (doc.feedbackTitle as string) || '').trim(),
    status: (doc.status as string | null) ?? null,
    rewardStatus: (doc.rewardStatus as string | null) ?? null,
    implementationDate: (doc.implementationDate as string | null) ?? null,
  }))
}

export async function FeedbackBountyMatrixPage() {
  const rows = await queryRows()

  return (
    <div className="font-body" style={{ backgroundColor: PAGE_BG }}>
      <section className="px-4 py-[30px] pb-[60px] sm:px-6 md:py-[50px] md:pb-[80px]">
        <div className="mx-auto max-w-[1200px]">
          <h3
            className="mb-8 font-heading text-[30px] font-bold leading-snug tracking-[-0.6px] md:text-[40px]"
            style={{ color: HEADING }}
          >
            Feedback Bounty Management Matrix
          </h3>
          <MatrixTable rows={rows} />
        </div>
      </section>
    </div>
  )
}
