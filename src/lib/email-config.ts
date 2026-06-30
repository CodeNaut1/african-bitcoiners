/**
 * Notification group configuration.
 * Recipients are set via environment variables as comma-separated email lists.
 *
 * Routing:
 *   community  — Meetups, Map locations, Volunteers, Mining, Ecosystem submissions
 *   general    — Contact, Feedback Bounty, NPS, Jobs, MIAB nominations, Partnerships
 *   sensitive  — Donations (Blink payments), Admin security alerts
 *   test       — Staging / QA notifications
 */

function parseEmails(raw: string | undefined): string[] {
  if (!raw) return []
  return raw
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean)
}

export const COMMUNITY_TEAM = parseEmails(process.env.EMAIL_GROUP_COMMUNITY)
export const GENERAL_TEAM = parseEmails(process.env.EMAIL_GROUP_GENERAL)
export const SENSITIVE_TEAM = parseEmails(process.env.EMAIL_GROUP_SENSITIVE)
export const TEST_TEAM = parseEmails(process.env.EMAIL_GROUP_TEST)

export type NotificationGroupType = 'community' | 'general' | 'sensitive' | 'test'

export function getNotificationGroup(type: NotificationGroupType): string[] {
  switch (type) {
    case 'community':
      return COMMUNITY_TEAM
    case 'general':
      return GENERAL_TEAM
    case 'sensitive':
      return SENSITIVE_TEAM
    case 'test':
      return TEST_TEAM
  }
}
