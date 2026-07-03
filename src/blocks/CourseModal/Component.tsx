'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ChevronDown, X } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { ABButton } from '@/components/ui/ab-button'
import { ABInput, ABSelect } from '@/components/ui/ab-form-fields'
import { AFRICAN_COUNTRIES } from '@/components/forms/africanCountries'
import { applyFormSubmitResponse } from '@/lib/form-submit-client'
import type { FormSubmitResponse } from '@/lib/form-settings-shared'

const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev/uploads/2026/01'
const FORMAT_ICONS = {
  website: `${R2}/Website-course-option-icon.png`,
  email: `${R2}/Email-option-icon.png`,
  telegram: `${R2}/Telegram-option-icon.png`,
}

type Props = {
  triggerLabel?: string
  variant?: 'primary-orange' | 'white-outline' | 'dark-blue' | 'white-solid'
  websiteUrl?: string
  layout?: 'inline' | 'modal'
  fullWidth?: boolean
}

type Lang = 'en' | 'fr'
type Method = 'email' | 'telegram'
type FormatStep = 'choose' | Method

const TRIGGER_STYLES: Record<string, string> = {
  'primary-orange':
    'bg-brand-primary text-white hover:bg-brand-secondary shadow-[0_4px_8px_rgba(255,107,74,0.3)] hover:shadow-[0_6px_16px_rgba(255,107,74,0.4)] hover:-translate-y-0.5',
  'white-outline': 'border-2 border-white text-white hover:bg-white/10',
  'dark-blue': 'bg-brand-secondary text-white hover:bg-brand-primary',
  'white-solid':
    'bg-white text-brand-primary border-2 border-brand-primary shadow-[0_4px_8px_rgba(253,90,71,0.15)] hover:bg-[#FFF6F5] hover:text-brand-secondary hover:border-brand-secondary hover:shadow-[0_6px_16px_rgba(37,51,67,0.2)]',
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
  const router = useRouter()
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
        formSlug:
          method === 'telegram'
            ? isFr
              ? 'course-signup-telegram-french'
              : 'course-signup-telegram-english'
            : undefined,
        honey: data.honey,
      }),
    })
    const json = (await res.json()) as FormSubmitResponse & {
      uniqueCode?: string
      code?: string
      telegramDeepLink?: string | null
      redirectUrl?: string
    }
    if (json.redirectUrl) {
      router.push(json.redirectUrl)
      return
    }
    if (res.ok) {
      const successState = {
        stage: 'success' as const,
        uniqueCode: json.code ?? json.uniqueCode ?? '',
        method,
        lang,
        telegramDeepLink: json.telegramDeepLink,
      }
      if (!applyFormSubmitResponse(json, router, () => onSuccess(successState))) {
        onSuccess(successState)
      }
    }
  }

  const t = {
    name: isFr ? 'Nom ou Pseudo' : 'Name or Nym',
    email: isFr ? 'Adresse e-mail' : 'Email address',
    country: isFr ? 'De quel pays d\'Afrique êtes-vous originaire ?' : 'What African Country are you from?',
    how: isFr ? 'Comment avez-vous entendu parler du cours ?' : 'How did you hear about the course?',
    consent: isFr
      ? "Je souhaite recevoir les dernières nouvelles, ressources et mises à jour sur le Bitcoin en Afrique."
      : 'I would like to receive latest news, resources and updates about Bitcoin in Africa.',
    submit: isFr ? 'Commencer gratuitement' : 'Start Learning Free',
    submitting: isFr ? 'Envoi...' : 'Signing up…',
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-3 bg-white p-5">
      <input {...register('honey')} type="text" className="hidden" tabIndex={-1} aria-hidden />
      <ABInput label={t.name} placeholder="Amara Diallo" error={errors.name?.message} {...register('name')} />
      {needsEmail && (
        <ABInput label={t.email} type="email" placeholder="amara@example.com" error={errors.email?.message} {...register('email')} />
      )}
      <ABSelect label={t.country} error={errors.country?.message} {...register('country')}>
        <option value="">{isFr ? 'Sélectionnez...' : 'Select...'}</option>
        {AFRICAN_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
      </ABSelect>
      <ABSelect label={t.how} {...register('howHeard')}>
        <option value="">{isFr ? 'Optionnel...' : 'Optional...'}</option>
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
    <div className="bg-white p-5 text-center flex flex-col items-center gap-3">
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

function FormatChooser({
  lang,
  websiteUrl,
  onSelect,
}: {
  lang: Lang
  websiteUrl: string
  onSelect: (method: Method) => void
}) {
  const isFr = lang === 'fr'
  const options = [
    {
      key: 'website' as const,
      icon: FORMAT_ICONS.website,
      title: isFr ? 'Cours sur le site' : 'Website Course',
      subtitle: isFr ? 'Commencez pour des blocs bon marché et du Hodling' : 'Start for cheap blocks and Hodling',
      href: websiteUrl,
    },
    {
      key: 'email' as const,
      icon: FORMAT_ICONS.email,
      title: isFr ? 'E-mail quotidien' : 'Email Drip',
      subtitle: isFr ? 'Une leçon par jour pendant 21 jours' : 'One lesson per day for 21 days',
    },
    {
      key: 'telegram' as const,
      icon: FORMAT_ICONS.telegram,
      title: isFr ? 'Bot Telegram' : 'Telegram Bot',
      subtitle: isFr ? 'Interactif et en déplacement' : 'Interactive and on the go',
    },
  ]

  return (
    <div className="bg-[#F9F9F9] p-5">
      <p className="mb-1.5 text-sm font-semibold tracking-[-0.4px] text-brand-text-dark">
        {isFr ? 'Choisissez votre format d\'apprentissage préféré' : 'Choose your preferred learning format'}
      </p>
      <div className="flex flex-col gap-3">
        {options.map((opt) => {
          const inner = (
            <>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center">
                <Image src={opt.icon} alt="" width={32} height={32} className="h-8 w-8 object-contain" />
              </span>
              <span className="min-w-0 flex-1 text-left">
                <span className="block text-sm font-bold text-brand-text-dark">{opt.title}</span>
                <span className="block text-xs font-medium text-brand-text-dark">{opt.subtitle}</span>
              </span>
              <span className="shrink-0 text-lg text-[#D1D5DB]">→</span>
            </>
          )

          const className =
            'flex w-full items-center gap-3.5 rounded-lg border border-[#E5E7EB] bg-white p-3.5 transition-all hover:border-[#FF6B4A] hover:bg-[#FFF5F3] hover:translate-x-1'

          if (opt.key === 'website') {
            return (
              <a key={opt.key} href={websiteUrl} target="_blank" rel="noopener noreferrer" className={className}>
                {inner}
              </a>
            )
          }

          return (
            <button key={opt.key} type="button" onClick={() => onSelect(opt.key)} className={className}>
              {inner}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function SignupPanel({ websiteUrl = 'https://course.bitcoiners.africa' }: { websiteUrl?: string }) {
  const [lang, setLang] = useState<Lang>('en')
  const [formatStep, setFormatStep] = useState<FormatStep>('choose')
  const [signupState, setSignupState] = useState<SignupState>({ stage: 'form' })

  function resetFlow() {
    setFormatStep('choose')
    setSignupState({ stage: 'form' })
  }

  return (
    <div className="relative z-[1000] mt-2 w-full overflow-hidden rounded-[5px] bg-[#F9F9F9] shadow-[0_8px_32px_rgba(0,0,0,0.12)] md:absolute md:left-0 md:right-0 md:top-[calc(100%+12px)] md:mt-0">
      <div className="flex border-b border-[#E5E7EB] bg-white px-4 py-4 sm:px-6 md:px-12">
        {(['en', 'fr'] as Lang[]).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => { setLang(l); resetFlow() }}
            className={cn(
              'flex-1 border-b-[3px] px-3 py-4 text-sm font-medium transition-colors',
              lang === l
                ? 'border-brand-primary bg-[#FFF6F5] text-brand-primary'
                : 'border-transparent bg-[#F9FAFB] text-brand-text-muted hover:text-brand-primary',
            )}
          >
            {l === 'en' ? 'English' : 'Français'}
          </button>
        ))}
      </div>

      {signupState.stage === 'success' ? (
        <SuccessPanel state={signupState} />
      ) : formatStep === 'choose' ? (
        <FormatChooser lang={lang} websiteUrl={websiteUrl} onSelect={setFormatStep} />
      ) : (
        <>
          <button
            type="button"
            onClick={() => setFormatStep('choose')}
            className="w-full border-b border-[#E5E7EB] bg-white px-4 py-2 text-left text-xs font-semibold text-brand-primary hover:bg-[#FFF6F5]"
          >
            ← {lang === 'fr' ? 'Retour aux formats' : 'Back to formats'}
          </button>
          <SignupForm lang={lang} method={formatStep} onSuccess={setSignupState} />
        </>
      )}
    </div>
  )
}

export function CourseModalBlockComponent({
  triggerLabel = 'Start learning for free ↓',
  variant = 'primary-orange',
  layout = 'inline',
  websiteUrl = 'https://course.bitcoiners.africa',
  fullWidth = false,
}: Props) {
  const [open, setOpen] = useState(false)

  const triggerClass = cn(
    'inline-flex w-full items-center justify-between gap-4 rounded-[5px] px-5 py-4 text-[15px] font-semibold transition-all duration-200 cursor-pointer sm:gap-12 sm:px-[35px] sm:py-[22px] sm:text-base',
    TRIGGER_STYLES[variant] ?? TRIGGER_STYLES['primary-orange'],
    !fullWidth && 'max-w-md',
  )

  const Panel = open ? <SignupPanel websiteUrl={websiteUrl} /> : null

  if (layout === 'modal') {
    return (
      <>
        <button type="button" onClick={() => setOpen(true)} className={triggerClass}>{triggerLabel}</button>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setOpen(false)}>
            <div className="relative w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={() => setOpen(false)} className="absolute -top-10 right-0 text-white" aria-label="Close">
                <X size={24} />
              </button>
              <div className="relative">
                <SignupPanel websiteUrl={websiteUrl} />
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <div className={cn('relative inline-block w-full', !fullWidth && 'max-w-md')} id="course-signup">
      <button type="button" onClick={() => setOpen((v) => !v)} className={triggerClass}>
        <span>{triggerLabel}</span>
        <ChevronDown size={18} className={cn('shrink-0 transition-transform', open ? 'rotate-180' : '')} />
      </button>
      {Panel}
    </div>
  )
}
