'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Banner, Button, Gutter, useAuth } from '@payloadcms/ui'

import { toKebabCase } from '@/utilities/toKebabCase'

type Campaign = {
  id: string
  name: string
  subject: string
  sendDate: string | null
  status: string
  htmlContent: string
}

type PostCategory = 'weekly-newsletter' | 'saturday-stacker' | 'announcement'

const CATEGORY_OPTIONS: Array<{ label: string; value: PostCategory }> = [
  { label: 'Weekly Newsletter', value: 'weekly-newsletter' },
  { label: 'Saturday Stacker', value: 'saturday-stacker' },
  { label: 'Announcement', value: 'announcement' },
]

function slugifyTitle(title: string): string {
  return toKebabCase(
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim(),
  )
}

function toDatetimeLocalValue(isoDate: string | null): string {
  if (!isoDate) return ''
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function formatSendDate(isoDate: string | null): string {
  if (!isoDate) return '—'
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return isoDate
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const fieldLabelStyle: React.CSSProperties = {
  fontWeight: 600,
  fontSize: '0.875rem',
}

const inputStyle: React.CSSProperties = {
  padding: '0.5rem 0.75rem',
  borderRadius: 'var(--style-radius-s)',
  border: '1px solid var(--theme-elevation-200)',
  fontSize: '0.875rem',
  width: '100%',
}

export default function ImportNewsletterClient() {
  const { user } = useAuth()
  const role = (user as { role?: string } | null)?.role
  const canAccess = Boolean(user && (role === 'admin' || role === 'editor'))

  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [fetching, setFetching] = useState(false)
  const [fetchError, setFetchError] = useState('')
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)
  const [category, setCategory] = useState<PostCategory | ''>('')
  const [publishedDate, setPublishedDate] = useState('')
  const [seoTitle, setSeoTitle] = useState('')
  const [seoDescription, setSeoDescription] = useState('')
  const [importing, setImporting] = useState(false)
  const [importError, setImportError] = useState('')

  const previewHtml = useMemo(() => selectedCampaign?.htmlContent ?? '', [selectedCampaign])

  useEffect(() => {
    if (!slugTouched) {
      setSlug(slugifyTitle(title))
    }
  }, [title, slugTouched])

  const fetchCampaigns = useCallback(async () => {
    setFetching(true)
    setFetchError('')

    try {
      const response = await fetch('/api/admin/activecampaign/campaigns', {
        credentials: 'include',
      })
      const data = (await response.json()) as { campaigns?: Campaign[]; error?: string }

      if (!response.ok) {
        setFetchError(data.error ?? 'Failed to fetch campaigns')
        return
      }

      setCampaigns(data.campaigns ?? [])
    } catch (err) {
      setFetchError(err instanceof Error ? err.message : 'Network error')
    } finally {
      setFetching(false)
    }
  }, [])

  const selectCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign)
    setTitle(campaign.subject || campaign.name)
    setSlugTouched(false)
    setSlug(slugifyTitle(campaign.subject || campaign.name))
    setCategory('')
    setPublishedDate(toDatetimeLocalValue(campaign.sendDate))
    setSeoTitle(campaign.subject || campaign.name)
    setSeoDescription('')
    setImportError('')
  }

  const submitPost = async (status: 'published' | 'draft') => {
    if (!selectedCampaign) return

    if (!title.trim()) {
      setImportError('Title is required')
      return
    }
    if (!slug.trim()) {
      setImportError('Slug is required')
      return
    }
    if (!category) {
      setImportError('Please select a category')
      return
    }

    setImporting(true)
    setImportError('')

    try {
      const response = await fetch('/api/admin/activecampaign/import-post', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          slug: slug.trim(),
          category,
          publishedDate: publishedDate ? new Date(publishedDate).toISOString() : null,
          seoTitle: seoTitle.trim() || title.trim(),
          seoDescription: seoDescription.trim(),
          htmlContent: selectedCampaign.htmlContent,
          status,
        }),
      })

      const data = (await response.json()) as {
        ok?: boolean
        error?: string
      }

      if (!response.ok) {
        setImportError(data.error ?? 'Import failed')
        return
      }

      window.location.href = '/admin/collections/posts'
    } catch (err) {
      setImportError(err instanceof Error ? err.message : 'Network error')
    } finally {
      setImporting(false)
    }
  }

  if (!canAccess) {
    return (
      <Gutter>
        <Banner type="error">
          <strong>Access Denied</strong> — This tool is restricted to admin and editor users.
        </Banner>
      </Gutter>
    )
  }

  return (
    <Gutter>
      <div style={{ maxWidth: '1100px', paddingTop: 'var(--base)', paddingBottom: 'calc(var(--base) * 2)' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Import Newsletter</h1>
        <p style={{ color: 'var(--theme-elevation-600)', marginBottom: '1.5rem' }}>
          Fetch recent sent campaigns from ActiveCampaign and publish them as newsletter posts.
        </p>

        {fetchError && (
          <div style={{ marginBottom: '1rem' }}>
            <Banner type="error">{fetchError}</Banner>
          </div>
        )}

        {importError && (
          <div style={{ marginBottom: '1rem' }}>
            <Banner type="error">{importError}</Banner>
          </div>
        )}

        <section style={{ marginBottom: '2rem' }}>
          {!selectedCampaign ? (
            <>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                Section A — Fetch Campaigns
              </h2>
              <Button buttonStyle="primary" disabled={fetching} onClick={() => void fetchCampaigns()}>
                {fetching ? 'Fetching…' : 'Fetch Recent Campaigns'}
              </Button>

              {campaigns.length > 0 && (
                <div style={{ marginTop: '1.25rem', overflowX: 'auto' }}>
                  <table
                    style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      fontSize: '0.875rem',
                      border: '1px solid var(--theme-elevation-150)',
                    }}
                  >
                    <thead>
                      <tr>
                        {['Campaign Name', 'Subject', 'Send Date', 'Status', ''].map((header) => (
                          <th
                            key={header || 'action'}
                            style={{
                              textAlign: 'left',
                              padding: '0.625rem',
                              borderBottom: '1px solid var(--theme-elevation-150)',
                              background: 'var(--theme-elevation-50)',
                              whiteSpace: header === 'Send Date' ? 'nowrap' : undefined,
                            }}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {campaigns.map((campaign) => (
                        <tr key={campaign.id}>
                          <td style={{ padding: '0.625rem', borderBottom: '1px solid var(--theme-elevation-100)' }}>
                            {campaign.name}
                          </td>
                          <td style={{ padding: '0.625rem', borderBottom: '1px solid var(--theme-elevation-100)' }}>
                            {campaign.subject}
                          </td>
                          <td
                            style={{
                              padding: '0.625rem',
                              borderBottom: '1px solid var(--theme-elevation-100)',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {formatSendDate(campaign.sendDate)}
                          </td>
                          <td style={{ padding: '0.625rem', borderBottom: '1px solid var(--theme-elevation-100)' }}>
                            {campaign.status}
                          </td>
                          <td style={{ padding: '0.625rem', borderBottom: '1px solid var(--theme-elevation-100)' }}>
                            <Button buttonStyle="secondary" onClick={() => selectCampaign(campaign)}>
                              Import as Post
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {!fetching && campaigns.length === 0 && (
                <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--theme-elevation-600)' }}>
                  Click &quot;Fetch Recent Campaigns&quot; to load sent campaigns from ActiveCampaign.
                </p>
              )}
            </>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                <Button
                  buttonStyle="secondary"
                  disabled={importing}
                  onClick={() => {
                    setSelectedCampaign(null)
                    setImportError('')
                  }}
                >
                  Back to list
                </Button>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0 }}>Section B — Import Form</h2>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--theme-elevation-600)', marginBottom: '1.25rem' }}>
                Importing: <strong>{selectedCampaign.name}</strong>
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                }}
              >
                <label style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  <span style={fieldLabelStyle}>Title</span>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  <span style={fieldLabelStyle}>Slug</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => {
                      setSlugTouched(true)
                      setSlug(e.target.value)
                    }}
                    style={inputStyle}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  <span style={fieldLabelStyle}>Category</span>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as PostCategory)}
                    style={inputStyle}
                  >
                    <option value="">— Select category —</option>
                    {CATEGORY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  <span style={fieldLabelStyle}>Published Date</span>
                  <input
                    type="datetime-local"
                    value={publishedDate}
                    onChange={(e) => setPublishedDate(e.target.value)}
                    style={inputStyle}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  <span style={fieldLabelStyle}>SEO Title</span>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    style={inputStyle}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', gridColumn: '1 / -1' }}>
                  <span style={fieldLabelStyle}>SEO Description</span>
                  <textarea
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </label>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.5rem' }}>Content Preview</h3>
                <div
                  style={{
                    border: '1px solid var(--theme-elevation-150)',
                    borderRadius: 'var(--style-radius-s)',
                    padding: '1rem',
                    background: 'var(--theme-elevation-0)',
                    maxHeight: '480px',
                    overflow: 'auto',
                  }}
                  dangerouslySetInnerHTML={{ __html: previewHtml }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Button
                  buttonStyle="primary"
                  disabled={importing}
                  onClick={() => void submitPost('published')}
                >
                  {importing ? 'Publishing…' : 'Publish Post'}
                </Button>
                <Button
                  buttonStyle="secondary"
                  disabled={importing}
                  onClick={() => void submitPost('draft')}
                >
                  {importing ? 'Saving…' : 'Save as Draft'}
                </Button>
              </div>
            </>
          )}
        </section>
      </div>
    </Gutter>
  )
}
