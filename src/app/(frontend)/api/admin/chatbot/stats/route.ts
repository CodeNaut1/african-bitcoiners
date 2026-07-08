import { NextRequest, NextResponse } from 'next/server'
import type { ChatbotConversation } from '@/payload-types'
import { requireAdmin } from '@/lib/chatbot/admin-auth'
import { computeChatbotStats } from '@/lib/chatbot/stats'

export const dynamic = 'force-dynamic'

async function fetchAllConversations(payload: Awaited<ReturnType<typeof requireAdmin>>['payload']) {
  if (!payload) return []

  const all: ChatbotConversation[] = []
  let page = 1

  while (true) {
    const result = await payload.find({
      collection: 'chatbot-conversations',
      page,
      limit: 500,
      depth: 0,
      overrideAccess: true,
      sort: '-lastMessageAt',
    })

    all.push(...(result.docs as ChatbotConversation[]))
    if (!result.hasNextPage) break
    page++
  }

  return all
}

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req)
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.error === 'Forbidden' ? 403 : 401 })
  }

  try {
    const conversations = await fetchAllConversations(auth.payload)
    const stats = computeChatbotStats(conversations)
    return NextResponse.json(stats)
  } catch (err) {
    console.error('[chatbot/stats]', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal error' },
      { status: 500 },
    )
  }
}
