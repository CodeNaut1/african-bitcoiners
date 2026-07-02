'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Container } from '@/components/ui/container'
import { CertificatePreview, type CertificatePreviewData } from '@/components/CertificatePreview'

export function ResultPageContent() {
  const searchParams = useSearchParams()
  const certId = searchParams.get('cert_id')
  const certHash = searchParams.get('cert_hash')

  const [data, setData] = useState<CertificatePreviewData | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!certId || !certHash) {
      setError('Invalid certificate link.')
      return
    }

    async function loadCertificate() {
      try {
        const res = await fetch(
          `/api/course/certificate/${encodeURIComponent(certId!)}?cert_hash=${encodeURIComponent(certHash!)}`,
        )
        const json = await res.json()
        if (!res.ok) {
          setError(json.error ?? 'Certificate not found.')
          return
        }
        setData({
          name: json.name,
          certNumber: json.certNumber,
          completionDate: json.completionDate,
          language: json.language,
          templateUrl: json.templateUrl,
        })
      } catch {
        setError('Could not load certificate.')
      }
    }

    void loadCertificate()
  }, [certId, certHash])

  async function trackDownload() {
    if (!certId || !certHash) return
    await fetch(`/api/course/certificate/${encodeURIComponent(certId)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cert_hash: certHash }),
    })
  }

  return (
    <div className="min-h-screen bg-brand-cream py-12">
      <Container narrow>
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-2 text-2xl font-bold text-brand-secondary sm:text-3xl">Your Certificate</h1>
          <p className="mb-8 text-sm text-brand-text-muted">
            Download your Bitcoin for Beginners course certificate below.
          </p>

          {error && (
            <div className="mx-auto mb-6 max-w-lg rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {data && <CertificatePreview data={data} onDownload={trackDownload} />}
        </div>
      </Container>
    </div>
  )
}
