import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { FeedbackMatrixClient } from './Client'

type Props = {
  heading?: string
  subheading?: string
  showSearch?: boolean
  rewardPerItem?: string
}

export async function FeedbackMatrixBlockComponent({
  heading = 'Feedback Bounty Leaderboard',
  subheading,
  showSearch = true,
  rewardPerItem = '1,000 sats',
}: Props) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'feedback-bounties',
    limit: 200,
    overrideAccess: true, // public leaderboard — strip sensitive fields below
    pagination: false,
    sort: '-lastActivity',
  })

  // Strip sensitive fields before passing to client
  const rows = result.docs.map((doc: any) => ({
    id: doc.id as string,
    feedbackTitle: doc.feedbackTitle as string,
    category: doc.category as string,
    description: doc.description as string,
    status: doc.status as string,
    rewardStatus: doc.rewardStatus as string,
    implementationDate: doc.implementationDate as string | null,
    lastActivity: doc.lastActivity as string | null,
  }))

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="mb-8">
          <SectionHeading heading={heading} subheading={subheading} align="left" />
          <p className="text-sm text-brand-text-muted mt-2">
            Each accepted feedback earns <strong className="text-brand-primary">{rewardPerItem}</strong> via BTCPay Server.
          </p>
        </div>
        <FeedbackMatrixClient rows={rows} showSearch={showSearch} />
      </Container>
    </section>
  )
}
