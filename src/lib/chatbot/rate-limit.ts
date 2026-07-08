const HOUR_MS = 60 * 60 * 1000
const DAY_MS = 24 * HOUR_MS
const CLEANUP_INTERVAL_MS = 10 * 60 * 1000

export type ChatbotLimitType = 'ip' | 'conversation' | 'global'

export type ChatbotRateLimitConfig = {
  maxMessagesPerHour: number
  maxMessagesPerDay: number
  maxMessagesPerConversation: number
  globalDailyLimit: number
}

type WindowCounter = {
  count: number
  windowStart: number
}

type IpEntry = {
  hourly: WindowCounter
  daily: WindowCounter
}

type GlobalDailyCounter = {
  count: number
  dayStart: number
}

const ipLimits = new Map<string, IpEntry>()
let globalDaily: GlobalDailyCounter = { count: 0, dayStart: getDayStart() }

function envInt(key: string, defaultVal: number): number {
  const raw = process.env[key]
  if (!raw) return defaultVal
  const parsed = parseInt(raw, 10)
  return Number.isNaN(parsed) || parsed < 0 ? defaultVal : parsed
}

export function getChatbotRateLimitConfig(): ChatbotRateLimitConfig {
  return {
    maxMessagesPerHour: envInt('CHATBOT_MAX_MESSAGES_PER_HOUR', 5),
    maxMessagesPerDay: envInt('CHATBOT_MAX_MESSAGES_PER_DAY', 15),
    maxMessagesPerConversation: envInt('CHATBOT_MAX_MESSAGES_PER_CONVERSATION', 20),
    globalDailyLimit: envInt('CHATBOT_GLOBAL_DAILY_LIMIT', 200),
  }
}

function getDayStart(now = Date.now()): number {
  const d = new Date(now)
  d.setUTCHours(0, 0, 0, 0)
  return d.getTime()
}

function getHourStart(now = Date.now()): number {
  const d = new Date(now)
  d.setMinutes(0, 0, 0)
  return d.getTime()
}

function resetWindow(counter: WindowCounter, windowStart: number, now: number): void {
  if (counter.windowStart !== windowStart) {
    counter.count = 0
    counter.windowStart = windowStart
  }
}

function isIpEntryExpired(entry: IpEntry, now: number): boolean {
  const hourStart = getHourStart(now)
  const dayStart = getDayStart(now)
  return entry.hourly.windowStart < hourStart && entry.daily.windowStart < dayStart
}

function cleanupExpiredEntries(now = Date.now()): void {
  for (const [ip, entry] of ipLimits.entries()) {
    if (isIpEntryExpired(entry, now)) {
      ipLimits.delete(ip)
    }
  }

  const dayStart = getDayStart(now)
  if (globalDaily.dayStart < dayStart) {
    globalDaily = { count: 0, dayStart }
  }
}

if (typeof setInterval !== 'undefined') {
  setInterval(() => cleanupExpiredEntries(), CLEANUP_INTERVAL_MS)
}

export type RateLimitCheckResult =
  | { allowed: true }
  | { allowed: false; error: string; limitType: ChatbotLimitType }

export function checkIpRateLimit(ip: string, config: ChatbotRateLimitConfig, now = Date.now()): RateLimitCheckResult {
  if (!ip) return { allowed: true }

  cleanupExpiredEntries(now)

  const hourStart = getHourStart(now)
  const dayStart = getDayStart(now)

  let entry = ipLimits.get(ip)
  if (!entry) {
    entry = {
      hourly: { count: 0, windowStart: hourStart },
      daily: { count: 0, windowStart: dayStart },
    }
    ipLimits.set(ip, entry)
  }

  resetWindow(entry.hourly, hourStart, now)
  resetWindow(entry.daily, dayStart, now)

  if (entry.hourly.count >= config.maxMessagesPerHour) {
    return {
      allowed: false,
      limitType: 'ip',
      error: "You've reached the message limit. Please try again later.",
    }
  }

  if (entry.daily.count >= config.maxMessagesPerDay) {
    return {
      allowed: false,
      limitType: 'ip',
      error: "You've reached the message limit. Please try again later.",
    }
  }

  return { allowed: true }
}

export function checkGlobalDailyLimit(config: ChatbotRateLimitConfig, now = Date.now()): RateLimitCheckResult {
  cleanupExpiredEntries(now)

  const dayStart = getDayStart(now)
  if (globalDaily.dayStart < dayStart) {
    globalDaily = { count: 0, dayStart }
  }

  if (globalDaily.count >= config.globalDailyLimit) {
    return {
      allowed: false,
      limitType: 'global',
      error:
        'Our chat assistant is currently unavailable. Please try again tomorrow or contact us at hello@bitcoiners.africa',
    }
  }

  return { allowed: true }
}

export function checkConversationLimit(
  currentMessageCount: number,
  config: ChatbotRateLimitConfig,
): RateLimitCheckResult {
  // Each request adds one user message and one assistant reply.
  if (currentMessageCount + 2 > config.maxMessagesPerConversation) {
    return {
      allowed: false,
      limitType: 'conversation',
      error: 'This conversation has reached its limit. Please start a new chat.',
    }
  }

  return { allowed: true }
}

export function recordRateLimitUsage(ip: string, now = Date.now()): void {
  const hourStart = getHourStart(now)
  const dayStart = getDayStart(now)

  if (ip) {
    let entry = ipLimits.get(ip)
    if (!entry) {
      entry = {
        hourly: { count: 0, windowStart: hourStart },
        daily: { count: 0, windowStart: dayStart },
      }
      ipLimits.set(ip, entry)
    }

    resetWindow(entry.hourly, hourStart, now)
    resetWindow(entry.daily, dayStart, now)
    entry.hourly.count++
    entry.daily.count++
  }

  if (globalDaily.dayStart < dayStart) {
    globalDaily = { count: 0, dayStart }
  }
  globalDaily.count++
}
