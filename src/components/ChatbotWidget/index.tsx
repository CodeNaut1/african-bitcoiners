'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { MessageCircle, X, Send } from 'lucide-react'

import { cn } from '@/utilities/ui'

const STORAGE_KEY = 'ab_chatbot_state'
const SEND_COOLDOWN_MS = 1000

type Role = 'user' | 'assistant' | 'system'
type Message = { role: Role; content: string }

interface StoredState {
  conversationId: string
  messages: Message[]
}

function loadState(): StoredState | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as StoredState
  } catch {
    return null
  }
}

function saveState(state: StoredState) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // sessionStorage may be unavailable in some contexts
  }
}

function renderMessageContent(text: string): React.ReactNode[] {
  const parts = text.split(/(\/(?:[\w-]+\/)*[\w-]+(?:\/[\w-]+)*|https?:\/\/[^\s]+)/g)

  return parts.map((part, i) => {
    if (!part) return null

    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-80"
        >
          {part}
        </a>
      )
    }

    if (/^\/[\w-]/.test(part)) {
      return (
        <Link key={i} href={part} className="underline hover:opacity-80">
          {part}
        </Link>
      )
    }

    return part
  })
}

export const ChatbotWidget: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [conversationId, setConversationId] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sendCooldown, setSendCooldown] = useState(false)
  const [inputBlocked, setInputBlocked] = useState(false)
  const [showStartNewChat, setShowStartNewChat] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const stored = loadState()
    if (stored) {
      setConversationId(stored.conversationId)
      setMessages(stored.messages)
    }
  }, [])

  useEffect(() => {
    if (open && !conversationId) {
      setConversationId(crypto.randomUUID())
    }
  }, [open, conversationId])

  useEffect(() => {
    if (conversationId) {
      saveState({ conversationId, messages })
    }
  }, [conversationId, messages])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open && !inputBlocked) inputRef.current?.focus()
  }, [open, inputBlocked])

  const ensureConversationId = useCallback((): string => {
    if (conversationId) return conversationId
    const id = crypto.randomUUID()
    setConversationId(id)
    return id
  }, [conversationId])

  const startNewChat = useCallback(() => {
    const newId = crypto.randomUUID()
    setConversationId(newId)
    setMessages([])
    setInput('')
    setInputBlocked(false)
    setShowStartNewChat(false)
    saveState({ conversationId: newId, messages: [] })
    inputRef.current?.focus()
  }, [])

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || loading || sendCooldown || inputBlocked) return

      setInput('')
      const userMessage: Message = { role: 'user', content: trimmed }
      setMessages((prev) => [...prev, userMessage])
      setLoading(true)
      setSendCooldown(true)
      setTimeout(() => setSendCooldown(false), SEND_COOLDOWN_MS)

      const convId = ensureConversationId()

      try {
        const res = await fetch('/api/chatbot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: trimmed,
            conversationId: convId,
            history: messages,
          }),
        })

        const data = (await res.json()) as {
          reply?: string
          conversationId?: string
          error?: string
          rateLimited?: boolean
          limitType?: 'ip' | 'conversation' | 'global'
        }

        if (res.status === 429 && data.rateLimited && data.error) {
          setMessages((prev) => [...prev, { role: 'system', content: data.error! }])
          setInputBlocked(true)

          if (data.limitType === 'conversation') {
            setShowStartNewChat(true)
          }
          return
        }

        if (!res.ok) {
          throw new Error(data.error ?? 'Request failed')
        }

        if (data.conversationId && data.conversationId !== conversationId) {
          setConversationId(data.conversationId)
        }

        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply ?? '' }])
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              'Sorry, I am having trouble connecting. Please try again or contact us at hello@bitcoiners.africa',
          },
        ])
      } finally {
        setLoading(false)
      }
    },
    [loading, sendCooldown, inputBlocked, messages, conversationId, ensureConversationId],
  )

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  const sendDisabled = loading || sendCooldown || inputBlocked || !input.trim()

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className={cn(
          'fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-elevated transition-transform duration-200 hover:scale-105 flex items-center justify-center',
          'bg-brand-primary text-white',
        )}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Chat with African Bitcoiners"
          className={cn(
            'fixed bottom-24 right-6 z-50 flex flex-col rounded-section bg-white shadow-elevated border border-brand-border-light overflow-hidden',
            'w-[calc(100vw-24px)] sm:w-[400px] h-[500px] max-h-[calc(100vh-120px)]',
          )}
        >
          <div className="flex items-center justify-between bg-brand-secondary px-4 py-3 flex-shrink-0">
            <p className="font-semibold text-sm text-white">Chat with us</p>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-white/70 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 min-h-0">
            {messages.length === 0 && !loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-tl-none bg-gray-100 px-3 py-2 text-sm text-brand-text-dark max-w-[85%] leading-relaxed">
                  Hello! I&apos;m the African Bitcoiners assistant. Ask me about Bitcoin, our free
                  course, or how to navigate the site.
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  'flex',
                  msg.role === 'user' ? 'justify-end' : 'justify-start',
                  msg.role === 'system' && 'justify-center',
                )}
              >
                <div
                  className={cn(
                    'rounded-2xl px-3 py-2 text-sm max-w-[85%] leading-relaxed whitespace-pre-wrap',
                    msg.role === 'user' && 'bg-brand-primary text-white rounded-br-none',
                    msg.role === 'assistant' && 'bg-gray-100 text-brand-text-dark rounded-tl-none',
                    msg.role === 'system' &&
                      'bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-center max-w-[95%]',
                  )}
                >
                  {msg.role === 'assistant' ? renderMessageContent(msg.content) : msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-tl-none bg-gray-100 px-4 py-2.5 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-text-muted animate-bounce [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-text-muted animate-bounce [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-text-muted animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}

            {showStartNewChat && (
              <div className="flex justify-center pt-1">
                <button
                  type="button"
                  onClick={startNewChat}
                  className="text-sm font-semibold px-4 py-2 rounded-lg bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors"
                >
                  Start New Chat
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-brand-border-light px-3 py-2 flex gap-2 flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={inputBlocked ? 'Messaging unavailable' : 'Type a message…'}
              disabled={loading || inputBlocked}
              className="flex-1 text-sm px-3 py-2 rounded-lg border border-brand-border-light focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30 disabled:opacity-60 text-brand-text-dark placeholder:text-brand-text-muted"
            />
            <button
              onClick={() => send(input)}
              disabled={sendDisabled}
              aria-label="Send message"
              className="flex-shrink-0 h-9 w-9 rounded-lg bg-brand-primary flex items-center justify-center text-white hover:bg-brand-primary/90 transition-colors disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>

          <p className="text-center text-[10px] text-brand-text-muted pb-2 flex-shrink-0">
            Powered by African Bitcoiners
          </p>
        </div>
      )}
    </>
  )
}
