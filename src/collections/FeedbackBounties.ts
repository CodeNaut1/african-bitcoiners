import type {
  CollectionAfterChangeHook,
  CollectionBeforeChangeHook,
  CollectionConfig,
} from 'payload'
import { adminOrEditor } from '../access/adminOrEditor'
import { sendEmail } from '../lib/email'
import { bountyAcceptedEmail } from '../lib/email-templates/bounty-accepted'
import { bountyRejectedEmail } from '../lib/email-templates/bounty-rejected'
import { bountyIdeaEmail } from '../lib/email-templates/bounty-idea'
import { bountyUnderReviewEmail } from '../lib/email-templates/bounty-under-review'

const BOUNTY_ENTRY_ID_START = 37208
const ACCEPTED_EMAIL_CC = ['em@bitcoiners.africa', 'megasley@freerouting.africa']

function rewardStatusForStatus(status: string): string {
  switch (status) {
    case 'Pending':
      return 'Pending'
    case 'Under review':
      return 'Processing'
    case 'Idea':
      return 'Pending'
    case 'Accepted':
      return 'Paid'
    case 'Not accepted':
      return 'Not paid'
    case 'Implemented':
      return 'Paid'
    default:
      return 'Pending'
  }
}

const beforeChange: CollectionBeforeChangeHook = async ({ data, operation, req }) => {
  const now = new Date().toISOString()
  data.lastActivity = now

  if (operation === 'create') {
    if (!data.dateAdded) {
      data.dateAdded = now
    }

    delete data.entryId

    const result = await req.payload.find({
      collection: 'feedback-bounties',
      where: {
        entryId: { greater_than_equal: BOUNTY_ENTRY_ID_START },
      },
      sort: '-entryId',
      limit: 1,
      overrideAccess: true,
    })

    const rawMax = result.docs[0]?.entryId
    const maxEntryId = typeof rawMax === 'number' && Number.isFinite(rawMax) ? rawMax : NaN

    data.entryId = Number.isFinite(maxEntryId) ? maxEntryId + 1 : BOUNTY_ENTRY_ID_START

    if (!data.status) data.status = 'Pending'
    if (!data.rewardStatus) data.rewardStatus = 'Pending'
  }

  return data
}

const afterStatusChange: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  operation,
  req,
}) => {
  if (req.context?.skipBountyStatusHook) return doc

  const now = new Date().toISOString()
  const newStatus = doc.status as string
  const oldStatus = (previousDoc?.status ?? '') as string

  if (operation === 'create' || newStatus === oldStatus) {
    return doc
  }

  const payload = req.payload
  const email = doc.email as string | undefined
  const name = (doc.name as string) ?? 'Community Member'
  const feedbackTitle = (doc.feedbackTitle as string) ?? 'Your Feedback'
  const entryId = doc.entryId as number | undefined

  const updateData: Record<string, unknown> = {
    rewardStatus: rewardStatusForStatus(newStatus),
    lastActivity: now,
    voucherNote: null,
  }

  if (newStatus === 'Implemented') {
    updateData.implementationDate = now
  }

  let assignedVoucher: string | null = null

  if (newStatus === 'Accepted') {
    try {
      const vouchers = await payload.find({
        collection: 'vouchers',
        where: {
          or: [{ sentTo: { exists: false } }, { sentTo: { equals: '' } }],
        },
        limit: 1,
        overrideAccess: true,
      })

      const voucher = vouchers.docs?.[0] as
        | { id: number; voucherCode?: string | null }
        | undefined

      if (voucher?.voucherCode) {
        await payload.update({
          collection: 'vouchers',
          id: voucher.id,
          data: {
            sentTo: email ?? '',
            sentDate: now,
            feedbackBountyId: doc.id,
          },
          overrideAccess: true,
          context: { skipBountyStatusHook: true },
        })

        assignedVoucher = voucher.voucherCode
        updateData.voucherCode = voucher.voucherCode
        updateData.voucherSentDate = now
      } else {
        console.warn('[bounty] No available vouchers!')
        updateData.voucherNote = '⚠ No voucher assigned — none available'
        updateData.voucherCode = null
        updateData.voucherSentDate = null
      }
    } catch (err) {
      console.error('[bounty] Voucher assignment error:', err)
      updateData.voucherNote = '⚠ No voucher assigned — none available'
    }
  }

  try {
    await payload.update({
      collection: 'feedback-bounties',
      id: doc.id,
      data: updateData,
      overrideAccess: true,
      context: { skipBountyStatusHook: true },
    })
  } catch (err) {
    console.error('[bounty] Failed to update bounty after status change:', err)
  }

  if (!email) return doc

  try {
    if (newStatus === 'Accepted') {
      const tpl = bountyAcceptedEmail({
        name,
        feedbackTitle,
        entryId,
        voucherCode: assignedVoucher,
      })
      await sendEmail([email], tpl.subject, tpl.html, { cc: ACCEPTED_EMAIL_CC })
    } else if (newStatus === 'Not accepted') {
      const tpl = bountyRejectedEmail({ name, feedbackTitle, entryId })
      await sendEmail([email], tpl.subject, tpl.html)
    } else if (newStatus === 'Idea') {
      const tpl = bountyIdeaEmail({ name, feedbackTitle, entryId })
      await sendEmail([email], tpl.subject, tpl.html)
    } else if (newStatus === 'Under review') {
      const tpl = bountyUnderReviewEmail({ name, feedbackTitle, entryId })
      await sendEmail([email], tpl.subject, tpl.html)
    }
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
    read: () => true,
    update: adminOrEditor,
  },
  admin: {
    defaultColumns: ['entryId', 'dateAdded', 'name', 'category', 'status', 'rewardStatus'],
    listSearchableFields: ['name', 'email', 'feedbackTitle', 'category'],
    useAsTitle: 'feedbackTitle',
    description:
      'Community feedback submissions. Change "Status" to trigger automated emails and voucher assignment.',
  },
  fields: [
    {
      name: 'entryId',
      type: 'number',
      unique: true,
      admin: {
        readOnly: true,
        description: 'Public Bounty ID shown in the matrix and emails.',
      },
    },
    {
      name: 'dateAdded',
      type: 'date',
      admin: {
        readOnly: true,
        description: 'Auto-set when the submission is created.',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
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
      required: true,
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
      name: 'attachment',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional screenshot or PDF attachment from the submitter.',
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
        readOnly: true,
        description: 'Auto-updated on any change.',
      },
    },
    {
      name: 'voucherCode',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Auto-populated when status changes to Accepted.',
      },
    },
    {
      name: 'voucherSentDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Auto-set when a voucher is assigned.',
      },
    },
    {
      name: 'voucherNote',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Shows a warning when Accepted but no voucher was available.',
      },
    },
  ],
  hooks: {
    beforeChange: [beforeChange],
    afterChange: [afterStatusChange],
  },
}
