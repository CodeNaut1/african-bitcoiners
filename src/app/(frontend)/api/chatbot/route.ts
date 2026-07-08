import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import OpenAI from 'openai'
import {
  checkConversationLimit,
  checkGlobalDailyLimit,
  checkIpRateLimit,
  getChatbotRateLimitConfig,
  recordRateLimitUsage,
} from '@/lib/chatbot/rate-limit'

export const dynamic = 'force-dynamic'

const SYSTEM_PROMPT = `You are the African Bitcoiners assistant, a helpful and friendly chatbot on bitcoiners.africa. You help visitors learn about Bitcoin, navigate the website, and find resources.

About African Bitcoiners:
- A Bitcoin education and adoption platform dedicated to building a Bitcoin-friendly Africa
- Founded to help Africans understand and adopt Bitcoin
- Offers a free 21-day Bitcoin for Beginners course (email and Telegram versions)
- Publishes a weekly Bitcoin newsletter covering African Bitcoin news
- Runs the 1000 Sats Feedback Bounty program
- Tracks 170+ African Bitcoin projects in the Live Directory
- Operates Africa Free Routing (Lightning routing node)
- Partners include HRF, Trezor Academy, BTrust, iPayBTC

Key pages to direct users to:
- Learn about Bitcoin: /learn-bitcoin
- Free Bitcoin course: /learn-bitcoin/free-bitcoin-course
- Bitcoin newsletter: /bitcoin-newsletter
- Earn Bitcoin: /earn-bitcoin
- Save Bitcoin: /save-bitcoin
- Spend Bitcoin: /spend-bitcoin
- Bitcoin Inflation Simulator: /save-bitcoin/bitcoin-inflation-simulator
- Community: /community
- About us: /about-us
- Contact: /about-us/connect-with-us
- Support/Donate: /about-us/support-us
- Bitcoin Mining in Africa: /bitcoin-mining-in-africa
- Graduate Program: /graduate-program

Guidelines:
- Be friendly, encouraging, and educational
- Always recommend the Bitcoin for Beginners course to newcomers
- For complex technical questions, provide clear simple explanations
- When suggesting pages, provide the full URL path so the chat widget can make them clickable
- Stay focused on Bitcoin education and African Bitcoiners resources
- Do not provide financial advice — always say this is not financial advice
- Keep responses concise — 2-3 paragraphs max
- Use simple English accessible to non-native speakers`

const TOPIC_KEYWORDS = [
  'bitcoin',
  'lightning',
  'course',
  'newsletter',
  'mining',
  'donate',
  'community',
  'africa',
  'wallet',
  'sats',
  'graduate',
  'earn',
  'save',
  'spend',
  'inflation',
]

function extractTopicTags(text: string): { tag: string }[] {
  const lower = text.toLowerCase()
  return TOPIC_KEYWORDS.filter((kw) => lower.includes(kw)).map((tag) => ({ tag }))
}

type HistoryMessage = { role: string; content: string }

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      console.error('[chatbot] OPENAI_API_KEY is not configured')
      return NextResponse.json({ message: 'Chatbot is not configured' }, { status: 503 })
    }

    const body = await req.json()
    const { message, conversationId: incomingId, history } = body as {
      message?: string
      conversationId?: string
      history?: HistoryMessage[]
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ message: 'Message is required' }, { status: 400 })
    }

    const trimmedMessage = message.trim()
    const conversationId =
      incomingId && typeof incomingId === 'string' ? incomingId : crypto.randomUUID()

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      ''
    const rateLimitConfig = getChatbotRateLimitConfig()

    const globalCheck = checkGlobalDailyLimit(rateLimitConfig)
    if (!globalCheck.allowed) {
      return NextResponse.json(
        { error: globalCheck.error, rateLimited: true, limitType: globalCheck.limitType },
        { status: 429 },
      )
    }

    const ipCheck = checkIpRateLimit(ip, rateLimitConfig)
    if (!ipCheck.allowed) {
      return NextResponse.json(
        { error: ipCheck.error, rateLimited: true, limitType: ipCheck.limitType },
        { status: 429 },
      )
    }

    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'chatbot-conversations',
      where: { conversationId: { equals: conversationId } },
      limit: 1,
      overrideAccess: true,
    })

    const existingMessageCount =
      docs.length > 0
        ? (docs[0].messageCount ?? docs[0].messages?.length ?? 0)
        : (history ?? []).length

    const conversationCheck = checkConversationLimit(existingMessageCount, rateLimitConfig)
    if (!conversationCheck.allowed) {
      return NextResponse.json(
        { error: conversationCheck.error, rateLimited: true, limitType: conversationCheck.limitType },
        { status: 429 },
      )
    }

    recordRateLimitUsage(ip)

    const historyMessages = (history ?? [])
      .slice(-10)
      .filter((m) => m.content && (m.role === 'user' || m.role === 'assistant'))
      .map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }))

    const openai = new OpenAI({ apiKey })
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...historyMessages,
        { role: 'user', content: trimmedMessage },
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    const reply = completion.choices[0]?.message?.content?.trim()
    if (!reply) {
      throw new Error('Empty response from OpenAI')
    }

    const now = new Date().toISOString()
    const newMessages = [
      { role: 'user' as const, content: trimmedMessage, timestamp: now },
      { role: 'assistant' as const, content: reply, timestamp: now },
    ]
    const newTags = extractTopicTags(trimmedMessage)

    if (docs.length > 0) {
      const doc = docs[0]
      const existingMessages = doc.messages ?? []
      const updatedMessages = [...existingMessages, ...newMessages]
      const existingTags = (doc.topicTags ?? []).map((t) => (typeof t === 'object' ? t.tag : t))
      const mergedTags = [...new Set([...existingTags, ...newTags.map((t) => t.tag)])].map((tag) => ({
        tag,
      }))

      await payload.update({
        collection: 'chatbot-conversations',
        id: doc.id,
        data: {
          messages: updatedMessages,
          lastMessageAt: now,
          messageCount: updatedMessages.length,
          topicTags: mergedTags,
        },
        overrideAccess: true,
      })
    } else {
      await payload.create({
        collection: 'chatbot-conversations',
        data: {
          conversationId,
          messages: newMessages,
          userIp: ip || undefined,
          startedAt: now,
          lastMessageAt: now,
          messageCount: newMessages.length,
          topicTags: newTags,
        },
        overrideAccess: true,
      })
    }

    return NextResponse.json({ reply, conversationId })
  } catch (error) {
    console.error('[chatbot] error:', error)
    return NextResponse.json(
      {
        message:
          'Sorry, I am having trouble connecting. Please try again or contact us at hello@bitcoiners.africa',
      },
      { status: 500 },
    )
  }
}
