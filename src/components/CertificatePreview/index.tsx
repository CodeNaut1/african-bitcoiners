'use client'

import React, { useRef, useState } from 'react'
import { Oleo_Script_Swash_Caps, Montserrat } from 'next/font/google'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { ABButton } from '@/components/ui/ab-button'
import { formatCertificateDate } from '@/lib/certificate-shared'

const oleo = Oleo_Script_Swash_Caps({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-certificate-name',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: '600',
  variable: '--font-certificate-body',
})

export type CertificatePreviewData = {
  name: string
  certNumber: string
  completionDate: string
  language: 'English' | 'French'
  templateUrl: string
}

type Props = {
  data: CertificatePreviewData
  onDownload?: () => Promise<void>
}

export function CertificatePreview({ data, onDownload }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [downloading, setDownloading] = useState<'png' | 'pdf' | null>(null)
  const [error, setError] = useState('')

  const dateLabel = formatCertificateDate(data.completionDate)
  const isFrench = data.language === 'French'

  async function renderCanvas() {
    if (!ref.current) throw new Error('Certificate preview not ready.')
    return html2canvas(ref.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      logging: false,
    })
  }

  async function handlePngDownload() {
    setDownloading('png')
    setError('')
    try {
      const canvas = await renderCanvas()
      const url = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = url
      link.download = `certificate-${data.certNumber}.png`
      link.click()
      await onDownload?.()
    } catch {
      setError('Could not generate PNG. Please try again.')
    } finally {
      setDownloading(null)
    }
  }

  async function handlePdfDownload() {
    setDownloading('pdf')
    setError('')
    try {
      const canvas = await renderCanvas()
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: canvas.width >= canvas.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      })
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
      pdf.save(`certificate-${data.certNumber}.pdf`)
      await onDownload?.()
    } catch {
      setError('Could not generate PDF. Please try again.')
    } finally {
      setDownloading(null)
    }
  }

  return (
    <div className={`${oleo.variable} ${montserrat.variable}`}>
      <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-card border border-brand-border-light bg-white shadow-card">
        <div
          ref={ref}
          className="relative mx-auto aspect-[1.414/1] w-full bg-white"
          style={{ fontFamily: 'var(--font-certificate-body), sans-serif' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.templateUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            crossOrigin="anonymous"
          />

          <div
            className="absolute left-1/2 top-[42%] w-[78%] -translate-x-1/2 -translate-y-1/2 text-center text-[clamp(1.5rem,4vw,2.75rem)] leading-tight text-[#1f2937]"
            style={{ fontFamily: 'var(--font-certificate-name), cursive' }}
          >
            {data.name}
          </div>

          <div className="absolute bottom-[18%] left-[18%] text-center text-[clamp(0.75rem,1.6vw,1rem)] font-semibold text-[#374151]">
            <p className="text-[0.65em] uppercase tracking-wide opacity-80">
              {isFrench ? 'Date' : 'Date Issued'}
            </p>
            <p>{dateLabel}</p>
          </div>

          <div className="absolute bottom-[18%] right-[18%] text-center text-[clamp(0.75rem,1.6vw,1rem)] font-semibold text-[#374151]">
            <p className="text-[0.65em] uppercase tracking-wide opacity-80">
              {isFrench ? 'Certificat N°' : 'Certificate No.'}
            </p>
            <p>{data.certNumber}</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <ABButton
          type="button"
          variant="primary"
          size="lg"
          disabled={downloading !== null}
          onClick={handlePngDownload}
          className="min-w-[220px] justify-center"
        >
          {downloading === 'png' ? 'Preparing PNG…' : 'Download as Image (PNG)'}
        </ABButton>
        <ABButton
          type="button"
          variant="outline"
          size="lg"
          disabled={downloading !== null}
          onClick={handlePdfDownload}
          className="min-w-[220px] justify-center"
        >
          {downloading === 'pdf' ? 'Preparing PDF…' : 'Download as PDF'}
        </ABButton>
      </div>
    </div>
  )
}
