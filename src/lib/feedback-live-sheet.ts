/**
 * Shared Google Sheet config for “Feedback Live sheet & management”.
 * One spreadsheet ID, multiple tab names.
 */

export const FEEDBACK_LIVE_SPREADSHEET_ID =
  process.env.GSHEET_FEEDBACK_LIVE?.trim() ||
  process.env.GSHEET_FEEDBACK_BOUNTY?.trim() ||
  process.env.GSHEET_BFB_FEEDBACK?.trim() ||
  process.env.GSHEET_NPS?.trim() ||
  process.env.GSHEET_MIAB?.trim() ||
  process.env.GSHEET_GRAD?.trim() ||
  ''

/** Exact tab titles inside the Feedback Live workbook (must match Google Sheets). */
export const FEEDBACK_LIVE_TABS = {
  bfbDailyFeedback: 'BFB Daily Feedback (Days 1-20)',
  miabNominations: 'MIAB Nominations',
  feedbackBounty: '1000 Sats Feedback Bounty',
  graduateProgramme: 'Graduate Programme',
  npsFeedback: 'NPS Feedback',
} as const

export type FeedbackLiveTabKey = keyof typeof FEEDBACK_LIVE_TABS

/** Header row written when creating a missing tab. */
export const FEEDBACK_LIVE_HEADERS: Record<FeedbackLiveTabKey, string[]> = {
  bfbDailyFeedback: [
    'Timestamp',
    'Day',
    'Language',
    'Email',
    'Understanding Rating',
    'Explanation Rating',
    'Content Rating',
    'Improvement Advice',
  ],
  miabNominations: [
    'Timestamp',
    'Nominee Name',
    'Nominee Country',
    'Reason',
    'Nominee Social',
    'Nominator Name',
    'Nominator Email',
  ],
  feedbackBounty: [
    'Timestamp',
    'Name',
    'Email',
    'Category',
    'Feedback Title',
    'Description',
  ],
  graduateProgramme: [
    'Timestamp',
    'Name',
    'Email',
    'Country',
    'Qualification',
    'Skills',
    'Why Work With Us',
    'Why Bitcoin',
    'Useful Ways',
    'Project Link',
    'Twitter',
    'Nostr',
    'LinkedIn',
    'Newsletter',
  ],
  npsFeedback: [
    'Timestamp',
    'Source Form Slug',
    'Source Form Title',
    'Recommend Score',
    'Recommend Reason',
    'Process Score',
    'Process Reason',
    'Improvement Advice',
  ],
}
