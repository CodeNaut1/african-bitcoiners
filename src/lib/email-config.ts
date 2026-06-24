/**
 * Notification group configuration.
 * Recipients are set via environment variables as comma-separated email lists.
 *
 * Routing:
 *   community  — Meetups, Map locations, Volunteers, Mining, Ecosystem submissions
 *   general    — Contact, Feedback Bounty, NPS, Jobs, MIAB nominations, Partnerships
 *   sensitive  — Donations (Blink payments), Admin security alerts
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

export type NotificationGroupType = 'community' | 'general' | 'sensitive'

export function getNotificationGroup(type: NotificationGroupType): string[] {
  switch (type) {
    case 'community':
      return COMMUNITY_TEAM
    case 'general':
      return GENERAL_TEAM
    case 'sensitive':
      return SENSITIVE_TEAM
  }
}
