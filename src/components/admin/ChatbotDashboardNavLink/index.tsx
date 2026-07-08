'use client'

import React from 'react'
import { useAuth, Link } from '@payloadcms/ui'
import { MessageCircle } from 'lucide-react'

import './index.scss'

export default function ChatbotDashboardNavLink() {
  const { user } = useAuth()

  if (!user || (user as { role?: string }).role !== 'admin') {
    return null
  }

  return (
    <Link href="/admin/chatbot-dashboard" className="chatbot-dashboard-nav-link">
      <span className="chatbot-dashboard-nav-link__icon">
        <MessageCircle size={16} strokeWidth={2} />
      </span>
      <span className="chatbot-dashboard-nav-link__label">Chatbot Dashboard</span>
    </Link>
  )
}
