'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Banner, Button, Gutter, useAuth } from '@payloadcms/ui'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import './index.scss'

type Metrics = {
  totalConversations: number
  conversationsToday: number
  conversationsThisWeek: number
  totalMessages: number
  averageMessagesPerConversation: number
}

type ChartPoint = { date: string; count: number }
type HourPoint = { hour: string; count: number }
type TopicPoint = { topic: string; count: number }

type StatsResponse = {
  metrics: Metrics
  conversationsPerDay: ChartPoint[]
  peakHours: HourPoint[]
  topTopics: TopicPoint[]
}

type ConversationSummary = {
  id: number
  conversationId: string
  startedAt: string
  lastMessageAt: string
  messageCount: number
  firstUserMessage: string
}

type ConversationMessage = {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

type ConversationDetail = {
  id: number
  conversationId: string
  startedAt: string
  lastMessageAt: string
  messageCount: number
  userIp?: string | null
  topicTags: { tag?: string | null }[]
  messages: ConversationMessage[]
}

type ConversationsResponse = {
  docs: ConversationSummary[]
  totalDocs: number
  totalPages: number
  page: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

function formatDateTime(value: string): string {
  return new Date(value).toLocaleString()
}

function formatChartDate(date: string): string {
  const d = new Date(`${date}T12:00:00`)
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function LoadingBlock({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="chatbot-dashboard__loading">
      <span className="chatbot-dashboard__spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}

export default function ChatbotDashboardView() {
  const { user } = useAuth()
  const isAdmin = Boolean(user && (user as { role?: string }).role === 'admin')

  const [stats, setStats] = useState<StatsResponse | null>(null)
  const [statsLoading, setStatsLoading] = useState(true)
  const [statsError, setStatsError] = useState('')

  const [conversations, setConversations] = useState<ConversationSummary[]>([])
  const [convPage, setConvPage] = useState(1)
  const [convTotalPages, setConvTotalPages] = useState(1)
  const [convTotalDocs, setConvTotalDocs] = useState(0)
  const [convLoading, setConvLoading] = useState(true)
  const [convError, setConvError] = useState('')

  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [detail, setDetail] = useState<ConversationDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const fetchStats = useCallback(async () => {
    setStatsLoading(true)
    setStatsError('')
    try {
      const res = await fetch('/api/admin/chatbot/stats', { credentials: 'include' })
      if (!res.ok) throw new Error('Failed to load stats')
      setStats((await res.json()) as StatsResponse)
    } catch {
      setStatsError('Failed to load dashboard stats.')
    } finally {
      setStatsLoading(false)
    }
  }, [])

  const fetchConversations = useCallback(async (page: number) => {
    setConvLoading(true)
    setConvError('')
    try {
      const res = await fetch(`/api/admin/chatbot/conversations?page=${page}&limit=20`, {
        credentials: 'include',
      })
      if (!res.ok) throw new Error('Failed to load conversations')
      const data = (await res.json()) as ConversationsResponse
      setConversations(data.docs)
      setConvPage(data.page)
      setConvTotalPages(data.totalPages)
      setConvTotalDocs(data.totalDocs)
    } catch {
      setConvError('Failed to load conversations.')
    } finally {
      setConvLoading(false)
    }
  }, [])

  const fetchDetail = useCallback(async (id: number) => {
    setDetailLoading(true)
    setSelectedId(id)
    try {
      const res = await fetch(`/api/admin/chatbot/conversations/${id}`, { credentials: 'include' })
      if (!res.ok) throw new Error('Failed to load conversation')
      setDetail((await res.json()) as ConversationDetail)
    } catch {
      setDetail(null)
      setSelectedId(null)
    } finally {
      setDetailLoading(false)
    }
  }, [])

  const handleDelete = useCallback(async () => {
    if (!selectedId) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/chatbot/conversations/${selectedId}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      if (!res.ok) throw new Error('Delete failed')
      setSelectedId(null)
      setDetail(null)
      await Promise.all([fetchStats(), fetchConversations(convPage)])
    } catch {
      // keep modal open on error
    } finally {
      setDeleting(false)
    }
  }, [selectedId, convPage, fetchStats, fetchConversations])

  useEffect(() => {
    if (isAdmin) {
      fetchStats()
      fetchConversations(1)
    }
  }, [isAdmin, fetchStats, fetchConversations])

  if (!isAdmin) {
    return (
      <Gutter>
        <Banner type="error">Access Denied — This dashboard is restricted to admin users only.</Banner>
      </Gutter>
    )
  }

  return (
    <Gutter>
      <div className="chatbot-dashboard">
        <header className="chatbot-dashboard__header">
          <h1>Chatbot Dashboard</h1>
          <p>Analytics and conversation logs for the African Bitcoiners AI assistant.</p>
        </header>

        {statsError && <Banner type="error">{statsError}</Banner>}

        <section className="chatbot-dashboard__section">
          <h2>Key Metrics</h2>
          {statsLoading ? (
            <LoadingBlock />
          ) : (
            <div className="chatbot-dashboard__metrics">
              <MetricCard label="Total Conversations" value={stats?.metrics.totalConversations ?? 0} />
              <MetricCard label="Conversations Today" value={stats?.metrics.conversationsToday ?? 0} />
              <MetricCard
                label="Conversations This Week"
                value={stats?.metrics.conversationsThisWeek ?? 0}
              />
              <MetricCard label="Total Messages" value={stats?.metrics.totalMessages ?? 0} />
              <MetricCard
                label="Avg Messages / Conversation"
                value={stats?.metrics.averageMessagesPerConversation ?? 0}
              />
            </div>
          )}
        </section>

        <section className="chatbot-dashboard__section">
          <h2>Charts</h2>
          {statsLoading ? (
            <LoadingBlock />
          ) : (
            <div className="chatbot-dashboard__charts">
              <div className="chatbot-dashboard__chart-card">
                <h3>Conversations per Day (Last 30 Days)</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={stats?.conversationsPerDay ?? []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={formatChartDate}
                      tick={{ fontSize: 11 }}
                      interval="preserveStartEnd"
                    />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                    <Tooltip
                      labelFormatter={(label) => formatChartDate(String(label))}
                      formatter={(value) => [value, 'Conversations']}
                    />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#fd5a47"
                      strokeWidth={2}
                      dot={{ r: 3, fill: '#fd5a47' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="chatbot-dashboard__chart-card">
                <h3>Peak Hours (Messages by Hour)</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={stats?.peakHours ?? []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="hour" tick={{ fontSize: 10 }} interval={2} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(value) => [value, 'Messages']} />
                    <Bar dataKey="count" fill="#253343" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </section>

        <section className="chatbot-dashboard__section">
          <h2>Most Common Topics</h2>
          {statsLoading ? (
            <LoadingBlock />
          ) : stats?.topTopics.length === 0 ? (
            <p className="chatbot-dashboard__empty">No topic data yet.</p>
          ) : (
            <div className="chatbot-dashboard__topics">
              {stats?.topTopics.map(({ topic, count }) => (
                <div key={topic} className="chatbot-dashboard__topic-tag">
                  <span className="chatbot-dashboard__topic-label">{topic}</span>
                  <span className="chatbot-dashboard__topic-count">{count}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="chatbot-dashboard__section">
          <div className="chatbot-dashboard__section-header">
            <h2>Recent Conversations</h2>
            <span className="chatbot-dashboard__meta">{convTotalDocs.toLocaleString()} total</span>
          </div>

          {convError && <Banner type="error">{convError}</Banner>}

          {convLoading ? (
            <LoadingBlock />
          ) : conversations.length === 0 ? (
            <p className="chatbot-dashboard__empty">No conversations yet.</p>
          ) : (
            <>
              <div className="chatbot-dashboard__table-wrap">
                <table className="chatbot-dashboard__table">
                  <thead>
                    <tr>
                      <th>Conversation ID</th>
                      <th>Started At</th>
                      <th>Messages</th>
                      <th>First User Message</th>
                      <th>Last Message At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {conversations.map((conv) => (
                      <tr key={conv.id}>
                        <td>
                          <button
                            type="button"
                            className="chatbot-dashboard__link"
                            onClick={() => fetchDetail(conv.id)}
                          >
                            {conv.conversationId.slice(0, 8)}…
                          </button>
                        </td>
                        <td>{formatDateTime(conv.startedAt)}</td>
                        <td>{conv.messageCount}</td>
                        <td className="chatbot-dashboard__truncate">{conv.firstUserMessage}</td>
                        <td>{formatDateTime(conv.lastMessageAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="chatbot-dashboard__pagination">
                <Button
                  buttonStyle="secondary"
                  disabled={convPage <= 1 || convLoading}
                  onClick={() => fetchConversations(convPage - 1)}
                >
                  Previous
                </Button>
                <span>
                  Page {convPage} of {Math.max(convTotalPages, 1)}
                </span>
                <Button
                  buttonStyle="secondary"
                  disabled={convPage >= convTotalPages || convLoading}
                  onClick={() => fetchConversations(convPage + 1)}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </section>

        {(selectedId !== null || detailLoading) && (
          <div className="chatbot-dashboard__modal-overlay" role="presentation">
            <div
              className="chatbot-dashboard__modal"
              role="dialog"
              aria-label="Conversation detail"
            >
              {detailLoading ? (
                <LoadingBlock label="Loading conversation…" />
              ) : detail ? (
                <>
                  <div className="chatbot-dashboard__modal-header">
                    <div>
                      <h2>Conversation</h2>
                      <p className="chatbot-dashboard__modal-id">{detail.conversationId}</p>
                      <p className="chatbot-dashboard__modal-meta">
                        Started {formatDateTime(detail.startedAt)} · {detail.messageCount} messages
                        {detail.userIp ? ` · IP ${detail.userIp}` : ''}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="chatbot-dashboard__modal-close"
                      onClick={() => {
                        setSelectedId(null)
                        setDetail(null)
                      }}
                      aria-label="Close"
                    >
                      ×
                    </button>
                  </div>

                  <div className="chatbot-dashboard__transcript">
                    {detail.messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`chatbot-dashboard__bubble chatbot-dashboard__bubble--${msg.role}`}
                      >
                        <div className="chatbot-dashboard__bubble-meta">
                          {msg.role === 'user' ? 'User' : 'Assistant'} ·{' '}
                          {formatDateTime(msg.timestamp)}
                        </div>
                        <div className="chatbot-dashboard__bubble-content">{msg.content}</div>
                      </div>
                    ))}
                  </div>

                  <div className="chatbot-dashboard__modal-actions">
                    <Button
                      buttonStyle="secondary"
                      onClick={() => {
                        setSelectedId(null)
                        setDetail(null)
                      }}
                    >
                      Close
                    </Button>
                    <Button buttonStyle="error" disabled={deleting} onClick={handleDelete}>
                      {deleting ? 'Deleting…' : 'Delete Conversation'}
                    </Button>
                  </div>
                </>
              ) : (
                <Banner type="error">Could not load this conversation.</Banner>
              )}
            </div>
          </div>
        )}
      </div>
    </Gutter>
  )
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="chatbot-dashboard__metric-card">
      <span className="chatbot-dashboard__metric-value">{value.toLocaleString()}</span>
      <span className="chatbot-dashboard__metric-label">{label}</span>
    </div>
  )
}
