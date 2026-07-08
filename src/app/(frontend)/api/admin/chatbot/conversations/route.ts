import { NextRequest, NextResponse } from 'next/server'
import type { ChatbotConversation } from '@/payload-types'
import { requireAdmin } from '@/lib/chatbot/admin-auth'
import { formatConversationSummary } from '@/lib/chatbot/stats'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req)
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.error === 'Forbidden' ? 403 : 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10) || 1)
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '20', 10) || 20))

    const result = await auth.payload.find({
      collection: 'chatbot-conversations',
      page,
      limit,
      depth: 0,
      overrideAccess: true,
      sort: '-lastMessageAt',
    })

    return NextResponse.json({
      docs: (result.docs as ChatbotConversation[]).map(formatConversationSummary),
      totalDocs: result.totalDocs,
      totalPages: result.totalPages,
      page: result.page,
      hasNextPage: result.hasNextPage,
      hasPrevPage: result.hasPrevPage,
    })
  } catch (err) {
    console.error('[chatbot/conversations]', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal error' },
      { status: 500 },
    )
  }
}
