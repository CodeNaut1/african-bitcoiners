import type { Block } from 'payload'

export const FeedbackMatrixBlock: Block = {
  slug: 'feedbackMatrix',
  interfaceName: 'FeedbackMatrixBlock',
  labels: { singular: 'Feedback Matrix', plural: 'Feedback Matrices' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Feedback Bounty Leaderboard' },
    { name: 'subheading', type: 'text' },
    {
      name: 'showSearch',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'rewardPerItem',
      type: 'text',
      defaultValue: '1,000 sats',
      admin: { description: 'Reward shown in the heading (e.g. "1,000 sats")' },
    },
  ],
}
