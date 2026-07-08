import type { ChatbotConversation } from '@/payload-types'
import { aggregateTopics } from './extract-topics'

function startOfDay(d = new Date()): Date {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

function startOfWeek(d = new Date()): Date {
  const x = startOfDay(d)
  x.setDate(x.getDate() - x.getDay())
  return x
}

function truncate(text: string, max = 100): string {
  if (text.length <= max) return text
  return `${text.slice(0, max)}…`
}

function getFirstUserMessage(conversation: ChatbotConversation): string {
  const msg = conversation.messages?.find((m) => m.role === 'user')
  return msg?.content ? truncate(msg.content) : '—'
}

export function computeChatbotStats(conversations: ChatbotConversation[]) {
  const todayStart = startOfDay()
  const weekStart = startOfWeek()

  const totalConversations = conversations.length
  let conversationsToday = 0
  let conversationsThisWeek = 0
  let totalMessages = 0

  for (const conv of conversations) {
    const started = new Date(conv.startedAt)
    if (started >= todayStart) conversationsToday++
    if (started >= weekStart) conversationsThisWeek++
    totalMessages += conv.messageCount ?? conv.messages?.length ?? 0
  }

  const averageMessagesPerConversation =
    totalConversations > 0 ? Math.round((totalMessages / totalConversations) * 10) / 10 : 0

  const dayBuckets: Record<string, number> = {}
  for (let i = 29; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    dayBuckets[d.toISOString().slice(0, 10)] = 0
  }

  for (const conv of conversations) {
    const key = new Date(conv.startedAt).toISOString().slice(0, 10)
    if (key in dayBuckets) dayBuckets[key]++
  }

  const conversationsPerDay = Object.entries(dayBuckets).map(([date, count]) => ({
    date,
    count,
  }))

  const hourBuckets = Array.from({ length: 24 }, (_, hour) => ({ hour, count: 0 }))

  for (const conv of conversations) {
    for (const msg of conv.messages ?? []) {
      const h = new Date(msg.timestamp).getHours()
      hourBuckets[h].count++
    }
  }

  const peakHours = hourBuckets.map(({ hour, count }) => ({
    hour: `${hour.toString().padStart(2, '0')}:00`,
    count,
  }))

  const topTopics = aggregateTopics(conversations, 20)

  return {
    metrics: {
      totalConversations,
      conversationsToday,
      conversationsThisWeek,
      totalMessages,
      averageMessagesPerConversation,
    },
    conversationsPerDay,
    peakHours,
    topTopics,
  }
}

export function formatConversationSummary(conversation: ChatbotConversation) {
  return {
    id: conversation.id,
    conversationId: conversation.conversationId,
    startedAt: conversation.startedAt,
    lastMessageAt: conversation.lastMessageAt,
    messageCount: conversation.messageCount ?? conversation.messages?.length ?? 0,
    firstUserMessage: getFirstUserMessage(conversation),
  }
}
