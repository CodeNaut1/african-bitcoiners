'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@/utilities/ui'
import { ABButton } from '@/components/ui/ab-button'
import { ABInput, ABSelect } from '@/components/ui/ab-form-fields'
import { AFRICAN_COUNTRIES } from './africanCountries'
import { applyFormSubmitResponse } from '@/lib/form-submit-client'
import type { FormSubmitResponse } from '@/lib/form-settings-shared'

type Lang = 'en' | 'fr'
type Method = 'email' | 'telegram'

const HOW_HEARD = [
  'Twitter / X',
  'Telegram',
  'Friend or family',
  'Google search',
  'YouTube',
  'WhatsApp',
  'Instagram',
  'Facebook',
  'African Bitcoiners Newsletter',
  'Other',
]

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required').optional().or(z.literal('')),
  country: z.string().min(1, 'Country required'),
  howHeard: z.string().optional(),
  consent: z.literal(true, { errorMap: () => ({ message: 'Please accept to continue' }) }),
  honey: z.string().max(0),
})

type Fields = z.infer<typeof schema>

type SignupState =
  | { stage: 'form' }
  | { stage: 'success'; uniqueCode: string; method: Method; lang: Lang; telegramDeepLink?: string | null }

function getCourseSignupFormSlug(method: Method, lang: Lang): string | undefined {
  if (method === 'telegram') {
    return lang === 'fr' ? 'course-signup-telegram-french' : 'course-signup-telegram-english'
  }
  return undefined
}

export function CourseSignupForm() {
  const router = useRouter()
  const [lang, setLang] = useState<Lang>('en')
  const [method, setMethod] = useState<Method>('email')
  const [signupState, setSignupState] = useState<SignupState>({ stage: 'form' })

  const isFr = lang === 'fr'
  const needsEmail = method === 'email'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Fields>({
    resolver: zodResolver(
      needsEmail
        ? schema.refine((d) => !!d.email, {
            path: ['email'],
            message: isFr ? 'Email requis' : 'Email required',
          })
        : schema,
    ),
    defaultValues: { honey: '' },
  })

  async function onSubmit(data: Fields) {
    const res = await fetch('/api/course/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        email: needsEmail ? data.email : null,
        country: data.country,
        howHeard: data.howHeard,
        courseLang: isFr ? 'French' : 'English',
        deliveryMethod: method,
        formSlug: getCourseSignupFormSlug(method, lang),
        honey: data.honey,
      }),
    })
    const json = (await res.json()) as FormSubmitResponse & {
      uniqueCode?: string
      code?: string
      telegramDeepLink?: string | null
    }
    if (res.ok) {
      if (
        !applyFormSubmitResponse(json, router, () => {
          setSignupState({
            stage: 'success',
            uniqueCode: json.code ?? json.uniqueCode ?? '',
            method,
            lang,
            telegramDeepLink: json.telegramDeepLink,
          })
        })
      ) {
        setSignupState({
          stage: 'success',
          uniqueCode: json.code ?? json.uniqueCode ?? '',
          method,
          lang,
          telegramDeepLink: json.telegramDeepLink,
        })
      }
      reset()
    }
  }

  const t = {
    name: isFr ? 'Votre prénom' : 'Your Name',
    email: isFr ? 'Adresse e-mail' : 'Email Address',
    country: isFr ? 'Votre pays' : 'Your Country',
    how: isFr ? 'Comment nous avez-vous trouvé ?' : 'How did you hear about us?',
    consent: isFr
      ? "J'accepte de recevoir le cours gratuit Bitcoin par e-mail / Telegram."
      : 'I agree to receive the free Bitcoin course via email / Telegram.',
    submit: isFr ? 'Commencer gratuitement' : 'Start Learning Free',
    submitting: isFr ? 'Envoi...' : 'Signing up…',
    success: isFr ? 'Inscription réussie !' : "You're signed up!",
    code: isFr ? 'Votre code unique :' : 'Your unique code:',
    telegram: isFr ? 'Ouvrir Telegram →' : 'Open Telegram →',
    inbox: isFr ? 'Vérifiez votre boîte mail pour le premier cours.' : 'Check your inbox for your first lesson!',
  }

  return (
    <div className="my-8 rounded-card border border-brand-border-light bg-white shadow-card overflow-hidden max-w-lg mx-auto not-prose">
      <div className="flex border-b border-brand-border-light">
        {(['en', 'fr'] as Lang[]).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => {
              setLang(l)
              setSignupState({ stage: 'form' })
            }}
            className={cn(
              'flex-1 py-2.5 text-sm font-semibold transition-colors',
              lang === l ? 'bg-brand-primary text-white' : 'text-brand-text-muted hover:bg-brand-cream',
            )}
          >
            {l === 'en' ? '🇬🇧 English' : '🇫🇷 Français'}
          </button>
        ))}
      </div>
      <div className="flex border-b border-brand-border-light">
        {(['email', 'telegram'] as Method[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMethod(m)
              setSignupState({ stage: 'form' })
            }}
            className={cn(
              'flex-1 py-2 text-xs font-semibold transition-colors',
              method === m ? 'bg-brand-secondary/10 text-brand-secondary' : 'text-brand-text-muted hover:bg-brand-cream',
            )}
          >
            {m === 'email' ? '✉️ Email' : '✈️ Telegram'}
          </button>
        ))}
      </div>

      {signupState.stage === 'success' ? (
        <div className="p-5 text-center flex flex-col items-center gap-3">
          <p className="font-bold text-brand-secondary">{t.success}</p>
          <p className="text-sm text-brand-text-muted">
            {t.code}{' '}
            <strong className="text-brand-primary font-mono tracking-widest">{signupState.uniqueCode}</strong>
          </p>
          {signupState.method === 'telegram' && signupState.telegramDeepLink && (
            <a href={signupState.telegramDeepLink} target="_blank" rel="noopener noreferrer">
              <ABButton variant="primary" size="sm">
                {t.telegram}
              </ABButton>
            </a>
          )}
          {signupState.method === 'email' && (
            <p className="text-xs text-brand-text-muted">{t.inbox}</p>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-3 p-4">
          <input {...register('honey')} type="text" className="hidden" tabIndex={-1} aria-hidden />
          <ABInput label={t.name} placeholder="Amara Diallo" error={errors.name?.message} {...register('name')} />
          {needsEmail && (
            <ABInput
              label={t.email}
              type="email"
              placeholder="amara@example.com"
              error={errors.email?.message}
              {...register('email')}
            />
          )}
          <ABSelect label={t.country} error={errors.country?.message} {...register('country')}>
            <option value="">Select...</option>
            {AFRICAN_COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </ABSelect>
          <ABSelect label={t.how} {...register('howHeard')}>
            <option value="">Optional...</option>
            {HOW_HEARD.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </ABSelect>
          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" {...register('consent')} className="mt-1 h-4 w-4 accent-brand-primary" />
            <span className="text-xs text-brand-text-mid">{t.consent}</span>
          </label>
          {errors.consent && <p className="text-xs text-red-600">{errors.consent.message}</p>}
          <ABButton type="submit" variant="primary" size="sm" disabled={isSubmitting} className="w-full justify-center mt-1">
            {isSubmitting ? t.submitting : t.submit}
          </ABButton>
        </form>
      )}
    </div>
  )
}
