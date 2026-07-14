'use client'

import React from 'react'
import { useAuth, Link } from '@payloadcms/ui'
import { Mail } from 'lucide-react'

import './index.scss'

export default function ImportNewsletterNavLink() {
  const { user } = useAuth()
  const role = (user as { role?: string } | null)?.role

  if (!user || (role !== 'admin' && role !== 'editor')) {
    return null
  }

  return (
    <Link href="/admin/import-newsletter" className="import-newsletter-nav-link">
      <span className="import-newsletter-nav-link__icon">
        <Mail size={16} strokeWidth={2} />
      </span>
      <span className="import-newsletter-nav-link__label">Import Newsletter</span>
    </Link>
  )
}
