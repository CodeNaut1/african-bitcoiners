'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { X, Send } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL ?? ''
const LOG_URL = process.env.NEXT_PUBLIC_CHATBOT_LOG_URL ?? ''

const SUGGESTIONS = [
  'What is Bitcoin?',
  'Why does Bitcoin matter for Africa?',
  'Who are African Bitcoiners?',
]

type Role = 'user' | 'bot' | 'error'
type Message = { id: number; role: Role; text: string }

function genId(key: 'ab_user_id' | 'ab_session_id', storage: Storage): string {
  const existing = storage.getItem(key)
  if (existing) return existing
  const id = crypto.randomUUID()
  storage.setItem(key, id)
  return id
}

let msgCounter = 0

export const ChatbotWidget: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const userIdRef = useRef<string>('')
  const sessionIdRef = useRef<string>('')

  // Initialise IDs on first client render
  useEffect(() => {
    userIdRef.current = genId('ab_user_id', localStorage)
    sessionIdRef.current = genId('ab_session_id', sessionStorage)
  }, [])

  // Scroll to bottom whenever messages change or loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Focus input when panel opens
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const addMessage = (role: Role, text: string) => {
    setMessages((prev) => [...prev, { id: ++msgCounter, role, text }])
  }

  const send = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    setInput('')
    setShowSuggestions(false)
    addMessage('user', trimmed)
    setLoading(true)

    let botResponse = ''
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, user_id: userIdRef.current }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      botResponse = data?.response ?? data?.message ?? data?.answer ?? JSON.stringify(data)
      addMessage('bot', botResponse)
    } catch {
      addMessage('error', 'Sorry, I couldn\'t reach the server. Please try again.')
    } finally {
      setLoading(false)
    }

    // Log conversation (fire-and-forget, never block UI)
    if (LOG_URL && botResponse) {
      fetch(LOG_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userIdRef.current,
          session_id: sessionIdRef.current,
          user_input: trimmed,
          ai_response: botResponse,
        }),
      }).catch(() => {})
    }
  }, [loading])

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  function handleSuggestion(text: string) {
    send(text)
  }

  const hasMessages = messages.length > 0

  return (
    <>
      {/* ── Trigger button ─────────────────────────────────────────────────── */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat with your African Bitcoin Sidekick'}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-brand-secondary shadow-elevated hover:bg-brand-primary transition-colors duration-200 flex items-center justify-center overflow-hidden"
      >
        {open ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          /* Bitcoin ₿ avatar */
          <span className="text-2xl font-bold text-brand-primary leading-none select-none">₿</span>
        )}
      </button>

      {/* ── Chat panel ─────────────────────────────────────────────────────── */}
      {open && (
        <div
          role="dialog"
          aria-label="African Bitcoin Sidekick chat"
          className="fixed bottom-24 right-6 z-50 flex flex-col rounded-section bg-white shadow-elevated border border-brand-border-light overflow-hidden"
          style={{ width: 380, maxWidth: 'calc(100vw - 24px)', height: '90vh', maxHeight: 600 }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 bg-brand-secondary px-4 py-3 flex-shrink-0">
            <div>
              <p className="font-bold text-sm text-white leading-snug">
                Hey, I'm your African Bitcoin Sidekick
              </p>
              <p className="text-xs text-white/75 mt-0.5">
                Ask me anything about Bitcoin in Africa
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="mt-0.5 flex-shrink-0 text-white/70 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 min-h-0">

            {/* Welcome message when no messages yet */}
            {!hasMessages && (
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 h-7 w-7 rounded-full bg-brand-secondary flex items-center justify-center text-brand-primary font-bold text-xs">
                  ₿
                </div>
                <div className="rounded-2xl rounded-tl-none bg-gray-100 px-3 py-2 text-sm text-brand-text-dark max-w-[80%]">
                  Hello! I'm your African Bitcoin Sidekick. Ask me anything about Bitcoin, Lightning Network, or how Bitcoin is changing Africa. 🌍
                </div>
              </div>
            )}

            {/* Conversation messages */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role !== 'user' && (
                  <div className="flex-shrink-0 h-7 w-7 rounded-full bg-brand-secondary flex items-center justify-center text-brand-primary font-bold text-xs self-start">
                    ₿
                  </div>
                )}
                <div
                  className={`rounded-2xl px-3 py-2 text-sm max-w-[80%] leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-brand-primary text-white rounded-br-none'
                      : msg.role === 'error'
                        ? 'bg-red-50 text-red-600 border border-red-100 rounded-tl-none'
                        : 'bg-gray-100 text-brand-text-dark rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Thinking indicator */}
            {loading && (
              <div className="flex items-end gap-2">
                <div className="flex-shrink-0 h-7 w-7 rounded-full bg-brand-secondary flex items-center justify-center text-brand-primary font-bold text-xs self-start">
                  ₿
                </div>
                <div className="rounded-2xl rounded-tl-none bg-gray-100 px-4 py-2.5 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-text-muted animate-bounce [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-text-muted animate-bounce [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-text-muted animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {showSuggestions && (
            <div className="px-4 pb-3 flex flex-col gap-1.5 flex-shrink-0">
              <p className="text-xs font-semibold text-brand-text-muted mb-0.5">Suggested questions</p>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  disabled={loading}
                  className="text-left text-xs px-3 py-2 rounded-lg border border-brand-border-light text-brand-text-mid hover:border-brand-primary hover:text-brand-primary transition-colors disabled:opacity-50"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input bar */}
          <div className="border-t border-brand-border-light px-3 py-3 flex gap-2 flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message…"
              disabled={loading}
              className="flex-1 text-sm px-3 py-2 rounded-lg border border-brand-border-light focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30 disabled:opacity-60 text-brand-text-dark placeholder:text-brand-text-muted"
            />
            <button
              onClick={() => send(input)}
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="flex-shrink-0 h-9 w-9 rounded-lg bg-brand-primary flex items-center justify-center text-white hover:bg-brand-primary/90 transition-colors disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
