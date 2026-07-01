'use client'

import React from 'react'
import { useAuth, Link } from '@payloadcms/ui'
import { Upload } from 'lucide-react'

import './index.scss'

export default function ImportCsvNavLink() {
  const { user } = useAuth()

  if (!user || (user as { role?: string }).role !== 'admin') {
    return null
  }

  return (
    <Link href="/admin/import-csv" className="import-csv-nav-link">
      <span className="import-csv-nav-link__icon">
        <Upload size={16} strokeWidth={2} />
      </span>
      <span className="import-csv-nav-link__label">Import CSV</span>
    </Link>
  )
}
