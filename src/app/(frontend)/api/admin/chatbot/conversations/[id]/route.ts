import { NextRequest, NextResponse } from 'next/server'
import type { ChatbotConversation } from '@/payload-types'
import { requireAdmin } from '@/lib/chatbot/admin-auth'

export const dynamic = 'force-dynamic'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(req: NextRequest, context: RouteContext) {
  const auth = await requireAdmin(req)
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.error === 'Forbidden' ? 403 : 401 })
  }

  try {
    const { id } = await context.params
    const numericId = parseInt(id, 10)
    if (Number.isNaN(numericId)) {
      return NextResponse.json({ error: 'Invalid conversation id' }, { status: 400 })
    }

    const conversation = await auth.payload.findByID({
      collection: 'chatbot-conversations',
      id: numericId,
      depth: 0,
      overrideAccess: true,
    })

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 })
    }

    const doc = conversation as ChatbotConversation

    return NextResponse.json({
      id: doc.id,
      conversationId: doc.conversationId,
      startedAt: doc.startedAt,
      lastMessageAt: doc.lastMessageAt,
      messageCount: doc.messageCount ?? doc.messages?.length ?? 0,
      userIp: doc.userIp,
      topicTags: doc.topicTags ?? [],
      messages: doc.messages ?? [],
    })
  } catch (err) {
    console.error('[chatbot/conversations/[id]] GET', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal error' },
      { status: 500 },
    )
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  const auth = await requireAdmin(req)
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.error === 'Forbidden' ? 403 : 401 })
  }

  try {
    const { id } = await context.params
    const numericId = parseInt(id, 10)
    if (Number.isNaN(numericId)) {
      return NextResponse.json({ error: 'Invalid conversation id' }, { status: 400 })
    }

    await auth.payload.delete({
      collection: 'chatbot-conversations',
      id: numericId,
      overrideAccess: true,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[chatbot/conversations/[id]] DELETE', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal error' },
      { status: 500 },
    )
  }
}
