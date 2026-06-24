'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ChevronDown, X } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { ABButton } from '@/components/ui/ab-button'
import { ABInput, ABSelect } from '@/components/ui/ab-form-fields'
import { AFRICAN_COUNTRIES } from '@/components/forms/africanCountries'

type Props = {
  triggerLabel?: string
  variant?: 'primary-orange' | 'white-outline' | 'dark-blue'
  emailSignupUrl?: string
  emailSignupUrlFr?: string
  telegramUrl?: string
  telegramUrlFr?: string
  websiteUrl?: string
  layout?: 'inline' | 'modal'
}

type Lang = 'en' | 'fr'
type Method = 'email' | 'telegram'

const TRIGGER_STYLES: Record<string, string> = {
  'primary-orange': 'bg-brand-primary text-white hover:bg-brand-secondary',
  'white-outline': 'border-2 border-white text-white hover:bg-white/10',
  'dark-blue': 'bg-brand-secondary text-white hover:bg-brand-primary',
}

const HOW_HEARD = [
  'Twitter / X', 'Telegram', 'Friend or family', 'Google search',
  'YouTube', 'WhatsApp', 'Instagram', 'Facebook', 'African Bitcoiners Newsletter', 'Other',
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

function SignupForm({
  lang,
  method,
  onSuccess,
}: {
  lang: Lang
  method: Method
  onSuccess: (res: SignupState & { stage: 'success' }) => void
}) {
  const isFr = lang === 'fr'
  const needsEmail = method === 'email'

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Fields>({
    resolver: zodResolver(
      needsEmail
        ? schema.refine((d) => !!d.email, { path: ['email'], message: isFr ? 'Email requis' : 'Email required' })
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
        honey: data.honey,
      }),
    })
    const json = await res.json()
    if (res.ok) {
      onSuccess({ stage: 'success', uniqueCode: json.uniqueCode, method, lang, telegramDeepLink: json.telegramDeepLink })
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
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-3 p-4">
      <input {...register('honey')} type="text" className="hidden" tabIndex={-1} aria-hidden />
      <ABInput label={t.name} placeholder="Amara Diallo" error={errors.name?.message} {...register('name')} />
      {needsEmail && (
        <ABInput label={t.email} type="email" placeholder="amara@example.com" error={errors.email?.message} {...register('email')} />
      )}
      <ABSelect label={t.country} error={errors.country?.message} {...register('country')}>
        <option value="">Select...</option>
        {AFRICAN_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
      </ABSelect>
      <ABSelect label={t.how} {...register('howHeard')}>
        <option value="">Optional...</option>
        {HOW_HEARD.map((h) => <option key={h} value={h}>{h}</option>)}
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
  )
}

function SuccessPanel({ state }: { state: SignupState & { stage: 'success' } }) {
  const isFr = state.lang === 'fr'
  return (
    <div className="p-5 text-center flex flex-col items-center gap-3">
      <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-6 w-6 text-green-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <p className="font-bold text-brand-secondary">{isFr ? 'Inscription réussie !' : "You're signed up!"}</p>
      <p className="text-sm text-brand-text-muted">
        {isFr ? 'Votre code unique :' : 'Your unique code:'}{' '}
        <strong className="text-brand-primary font-mono tracking-widest">{state.uniqueCode}</strong>
      </p>
      {state.method === 'telegram' && state.telegramDeepLink && (
        <a href={state.telegramDeepLink} target="_blank" rel="noopener noreferrer">
          <ABButton variant="primary" size="sm">{isFr ? 'Ouvrir Telegram →' : 'Open Telegram →'}</ABButton>
        </a>
      )}
      {state.method === 'email' && (
        <p className="text-xs text-brand-text-muted">
          {isFr ? 'Vérifiez votre boîte mail pour le premier cours.' : 'Check your inbox for your first lesson!'}
        </p>
      )}
    </div>
  )
}

export function CourseModalBlockComponent({
  triggerLabel = 'Start learning for free ↓',
  variant = 'primary-orange',
  layout = 'inline',
}: Props) {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState<Lang>('en')
  const [method, setMethod] = useState<Method>('email')
  const [signupState, setSignupState] = useState<SignupState>({ stage: 'form' })

  const triggerClass = cn(
    'inline-flex items-center gap-2 px-6 py-3 rounded-btn font-semibold text-base transition-colors duration-200 cursor-pointer',
    TRIGGER_STYLES[variant] ?? TRIGGER_STYLES['primary-orange'],
  )

  const Panel = (
    <div className="mt-4 rounded-card border border-brand-border-light bg-white shadow-elevated overflow-hidden max-w-sm mx-auto">
      <div className="flex border-b border-brand-border-light">
        {(['en', 'fr'] as Lang[]).map((l) => (
          <button
            key={l}
            onClick={() => { setLang(l); setSignupState({ stage: 'form' }) }}
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
            onClick={() => { setMethod(m); setSignupState({ stage: 'form' }) }}
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
        <SuccessPanel state={signupState} />
      ) : (
        <SignupForm lang={lang} method={method} onSuccess={setSignupState} />
      )}
    </div>
  )

  if (layout === 'modal') {
    return (
      <>
        <button onClick={() => setOpen(true)} className={triggerClass}>{triggerLabel}</button>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setOpen(false)}>
            <div className="relative w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setOpen(false)} className="absolute -top-10 right-0 text-white" aria-label="Close">
                <X size={24} />
              </button>
              {Panel}
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <div className="py-4 flex flex-col items-center" id="course-signup">
      <button onClick={() => setOpen((v) => !v)} className={triggerClass}>
        {triggerLabel}
        <ChevronDown size={16} className={cn('transition-transform', open ? 'rotate-180' : '')} />
      </button>
      {open && Panel}
    </div>
  )
}
