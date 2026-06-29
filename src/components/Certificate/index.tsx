'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useSearchParams, useRouter } from 'next/navigation'
import { ABButton } from '@/components/ui/ab-button'
import { ABInput } from '@/components/ui/ab-form-fields'

type Props = {
  mode: 'email' | 'telegram'
  hideIntro?: boolean
  submitLabel?: string
  redirectOnNotFound?: string
}

type CertData = {
  name: string
  certNumber: string
  completionDate: string
  scorePercent: number
  courseLang: string
}

const emailSchema = z.object({ email: z.string().email('Valid email required') })
const codeSchema = z.object({ uniqueCode: z.string().min(7, '7-character code required') })
type EmailFields = z.infer<typeof emailSchema>
type CodeFields = z.infer<typeof codeSchema>

export function Certificate({ mode, hideIntro, submitLabel, redirectOnNotFound }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [certData, setCertData] = useState<CertData | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [waitRequired, setWaitRequired] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const emailForm = useForm<EmailFields>({ resolver: zodResolver(emailSchema) })
  const codeForm = useForm<CodeFields>({ resolver: zodResolver(codeSchema) })

  async function lookup(query: Record<string, string>) {
    setNotFound(false)
    setWaitRequired(false)
    const qs = new URLSearchParams(query).toString()
    const res = await fetch(`/api/course/certificate/lookup?${qs}`)
    if (res.status === 404) {
      if (redirectOnNotFound) {
        router.push(redirectOnNotFound)
        return
      }
      setNotFound(true)
      return
    }
    if (res.status === 403) { setWaitRequired(true); return }
    if (!res.ok) { setNotFound(true); return }
    const data = await res.json()
    setCertData(data)
  }

  useEffect(() => {
    if (mode !== 'telegram') return
    const code = searchParams.get('uniqueId') ?? searchParams.get('uniqueCode')
    if (!code) return
    codeForm.setValue('uniqueCode', code)
    void lookup({ uniqueCode: code })
  }, [mode, searchParams, codeForm])

  useEffect(() => {
    if (mode !== 'email') return
    const email = searchParams.get('email')
    if (!email) return
    emailForm.setValue('email', email)
  }, [mode, searchParams, emailForm])

  async function downloadPng() {
    if (!certData) return
    setDownloading(true)
    const res = await fetch(`/api/course/certificate/${certData.certNumber}`)
    if (!res.ok) { setDownloading(false); return }
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `certificate-${certData.certNumber}.png`
    a.click()
    URL.revokeObjectURL(url)
    setDownloading(false)
  }

  if (certData) {
    const dateStr = new Date(certData.completionDate).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric',
    })
    return (
      <div className="max-w-2xl mx-auto py-8 flex flex-col items-center gap-6">
        {/* Certificate preview */}
        <div className="w-full bg-white border-4 border-brand-primary rounded-2xl p-8 text-center shadow-md">
          <p className="text-xs tracking-[0.3em] text-brand-primary font-bold mb-4">AFRICAN BITCOINERS</p>
          <p className="text-5xl text-brand-primary mb-4">₿</p>
          <h2 className="text-2xl font-bold text-brand-secondary mb-2">Certificate of Completion</h2>
          <div className="w-32 h-px bg-brand-primary mx-auto mb-4" />
          <p className="text-sm text-brand-text-muted mb-2">This certifies that</p>
          <p className="text-3xl font-bold text-brand-secondary mb-4">{certData.name}</p>
          <p className="text-sm text-brand-text-mid">has successfully completed the Bitcoin for Beginners course</p>
          <p className="text-sm text-brand-text-muted mb-6">delivered by African Bitcoiners</p>
          <div className="flex justify-around text-center">
            <div>
              <p className="text-xs text-brand-text-muted">Certificate No.</p>
              <p className="font-mono font-bold text-brand-secondary">{certData.certNumber}</p>
            </div>
            <div>
              <p className="text-xs text-brand-text-muted">Completed</p>
              <p className="font-semibold text-brand-secondary">{dateStr}</p>
            </div>
            <div>
              <p className="text-xs text-brand-text-muted">Score</p>
              <p className="font-semibold text-brand-secondary">{certData.scorePercent}%</p>
            </div>
          </div>
        </div>

        {/* Download button */}
        <ABButton
          type="button"
          variant="primary"
          size="lg"
          onClick={downloadPng}
          disabled={downloading}
          className="w-full justify-center max-w-xs"
        >
          {downloading ? 'Preparing download…' : 'Download Certificate (PNG)'}
        </ABButton>

        <p className="text-xs text-brand-text-muted text-center">
          Share your achievement! Cert #{certData.certNumber}
        </p>
      </div>
    )
  }

  return (
    <div className={hideIntro ? '' : 'max-w-md mx-auto py-8'}>
      {!hideIntro && (
        <>
          <h1 className="text-2xl font-bold text-brand-secondary mb-2">Get Your Certificate</h1>
          <p className="text-sm text-brand-text-muted mb-8">
            {mode === 'email'
              ? 'Enter the email you used to sign up for the course.'
              : 'Enter your 7-character unique code from when you signed up.'}
          </p>
        </>
      )}

      {notFound && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          No certificate found. Make sure you have completed the final quiz.
        </div>
      )}
      {waitRequired && (
        <div className="mb-4 p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm">
          Your certificate is not ready yet. Certificates are available 19 days after signing up for the course. Please check back soon.
        </div>
      )}

      {mode === 'email' ? (
        <form
          onSubmit={emailForm.handleSubmit((d) => lookup({ email: d.email }))}
          noValidate
          className="flex flex-col gap-4"
        >
          <ABInput
            label={hideIntro ? 'Email' : 'Your email address'}
            type="email"
            placeholder="amara@example.com"
            required
            error={emailForm.formState.errors.email?.message}
            {...emailForm.register('email')}
          />
          <ABButton
            type="submit"
            variant="primary"
            size="lg"
            disabled={emailForm.formState.isSubmitting}
            className="w-full justify-center"
          >
            {emailForm.formState.isSubmitting ? 'Looking up…' : (submitLabel ?? 'Find My Certificate')}
          </ABButton>
        </form>
      ) : (
        <form
          onSubmit={codeForm.handleSubmit((d) => lookup({ uniqueCode: d.uniqueCode }))}
          noValidate
          className="flex flex-col gap-4"
        >
          <ABInput
            label={hideIntro ? 'Telegram Unique ID' : 'Your unique code (7 characters)'}
            placeholder="ABC2345"
            required={hideIntro}
            error={codeForm.formState.errors.uniqueCode?.message}
            {...codeForm.register('uniqueCode')}
          />
          <ABButton
            type="submit"
            variant="primary"
            size="lg"
            disabled={codeForm.formState.isSubmitting}
            className="w-full justify-center"
          >
            {codeForm.formState.isSubmitting ? 'Looking up…' : (submitLabel ?? 'Find My Certificate')}
          </ABButton>
        </form>
      )}
    </div>
  )
}
