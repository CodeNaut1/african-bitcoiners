import type { CollectionConfig, CollectionAfterChangeHook } from 'payload'
import { adminOrEditor } from '../access/adminOrEditor'
import { sendEmail } from '../lib/email'
import { bountyAcceptedEmail } from '../lib/email-templates/bounty-accepted'
import { bountyRejectedEmail } from '../lib/email-templates/bounty-rejected'
import { bountyIdeaEmail } from '../lib/email-templates/bounty-idea'
import { bountyUnderReviewEmail } from '../lib/email-templates/bounty-under-review'

const afterStatusChange: CollectionAfterChangeHook = async ({ doc, previousDoc, operation, req }) => {
  // Only act on status changes during updates
  if (operation !== 'update') return doc
  const newStatus = doc.status as string
  const oldStatus = (previousDoc?.status ?? '') as string
  if (newStatus === oldStatus) return doc

  const payload = req.payload
  const email = doc.email as string | undefined
  const name = (doc.name as string) ?? 'Community Member'
  const feedbackTitle = (doc.feedbackTitle as string) ?? 'Your Feedback'
  const now = new Date().toISOString()

  // ── Set rewardStatus and implementationDate based on new status ────────────
  let rewardStatus: string | null = null
  let implementationDate: string | null = null

  if (newStatus === 'Accepted') {
    rewardStatus = 'Paid'
  } else if (newStatus === 'Not accepted') {
    rewardStatus = 'Not paid'
  } else if (newStatus === 'Idea') {
    rewardStatus = 'Pending'
  } else if (newStatus === 'Under review') {
    rewardStatus = 'Processing'
  } else if (newStatus === 'Implemented') {
    rewardStatus = 'Paid'
    implementationDate = now
  } else if (newStatus === 'Pending') {
    rewardStatus = 'Pending'
  }

  // Build the update payload
  const updateData: Record<string, unknown> = { lastActivity: now }
  if (rewardStatus) updateData.rewardStatus = rewardStatus
  if (implementationDate) updateData.implementationDate = implementationDate

  // ── For Accepted: find and assign a voucher ────────────────────────────────
  let assignedVoucher: string | null = null
  if (newStatus === 'Accepted' && email) {
    try {
      const vouchers = await payload.find({
        collection: 'vouchers',
        where: { and: [{ sentTo: { exists: false } }, { voucherCode: { exists: true } }] },
        limit: 1,
        overrideAccess: true,
      })
      const voucher = vouchers.docs?.[0] as any
      if (voucher) {
        await payload.update({
          collection: 'vouchers',
          id: voucher.id,
          data: { sentTo: email, sentDate: now },
          overrideAccess: true,
        })
        assignedVoucher = voucher.voucherCode as string
      } else {
        console.warn('[bounty] No unused vouchers available for', email)
      }
    } catch (err) {
      console.error('[bounty] Voucher assignment error:', err)
    }
  }

  // ── Persist the rewardStatus / lastActivity update ─────────────────────────
  try {
    await payload.update({
      collection: 'feedback-bounties',
      id: doc.id,
      data: updateData,
      overrideAccess: true,
    })
  } catch (err) {
    console.error('[bounty] Failed to update rewardStatus:', err)
  }

  // ── Send email ─────────────────────────────────────────────────────────────
  if (!email) return doc

  try {
    if (newStatus === 'Accepted') {
      const tpl = bountyAcceptedEmail({ name, feedbackTitle, voucherCode: assignedVoucher ?? 'Code pending — contact us' })
      await sendEmail([email], tpl.subject, tpl.html)
    } else if (newStatus === 'Not accepted') {
      const tpl = bountyRejectedEmail({ name, feedbackTitle })
      await sendEmail([email], tpl.subject, tpl.html)
    } else if (newStatus === 'Idea') {
      const tpl = bountyIdeaEmail({ name, feedbackTitle })
      await sendEmail([email], tpl.subject, tpl.html)
    } else if (newStatus === 'Under review') {
      const tpl = bountyUnderReviewEmail({ name, feedbackTitle })
      await sendEmail([email], tpl.subject, tpl.html)
    }
    // Implemented and Pending: no email
  } catch (err) {
    console.error('[bounty] Email send error:', err)
  }

  return doc
}

export const FeedbackBounties: CollectionConfig = {
  slug: 'feedback-bounties',
  access: {
    create: () => true,
    delete: adminOrEditor,
    read: () => true, // public — sensitive fields stripped in the block component
    update: adminOrEditor,
  },
  admin: {
    defaultColumns: ['feedbackTitle', 'name', 'email', 'category', 'status', 'rewardStatus', 'implementationDate', 'lastActivity'],
    useAsTitle: 'feedbackTitle',
    description: 'Community feedback submissions. Change "Status" to trigger automated emails and voucher assignment.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'feedbackTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Course Content', value: 'Course Content' },
        { label: 'Course Delivery', value: 'Course Delivery' },
        { label: 'Website', value: 'Website' },
        { label: 'Network/Community', value: 'Network/Community' },
        { label: 'Suggestion', value: 'Suggestion' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'feedbackBefore',
      type: 'select',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
      ],
      admin: {
        description: 'Has this feedback been submitted before?',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'Pending',
      options: [
        { label: 'Pending', value: 'Pending' },
        { label: 'Under Review', value: 'Under review' },
        { label: 'Accepted', value: 'Accepted' },
        { label: 'Not Accepted', value: 'Not accepted' },
        { label: 'Idea', value: 'Idea' },
        { label: 'Implemented', value: 'Implemented' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Changing this triggers automated email and reward assignment.',
      },
    },
    {
      name: 'rewardStatus',
      type: 'select',
      defaultValue: 'Pending',
      options: [
        { label: 'Pending', value: 'Pending' },
        { label: 'Processing', value: 'Processing' },
        { label: 'Paid', value: 'Paid' },
        { label: 'Not Paid', value: 'Not paid' },
      ],
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Auto-managed by status changes.',
      },
    },
    {
      name: 'implementationDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'Auto-set when status changes to Implemented.',
      },
    },
    {
      name: 'lastActivity',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'Auto-updated on any status change.',
      },
    },
  ],
  hooks: {
    afterChange: [afterStatusChange],
  },
}
