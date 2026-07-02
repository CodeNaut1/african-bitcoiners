'use client'

import React, { useMemo } from 'react'
import { Send } from 'lucide-react'

const TELEGRAM_BOT_URL = 'https://t.me/bitcoin_for_beginners_course_bot/'

type Props = {
  name: string
  code: string
  lang: 'en' | 'fr'
}

export function ConfirmationTelegramStart({ name, code, lang }: Props) {
  const isFrench = lang === 'fr'

  const telegramUrl = useMemo(() => {
    const encoded = btoa(`${name}:${code}:${lang}`)
    return `${TELEGRAM_BOT_URL}?start=${encoded}`
  }, [name, code, lang])

  return (
    <div className="mt-8 flex w-full max-w-lg flex-col items-center text-center">
      <a
        href={telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-primary px-8 py-4 text-lg font-bold text-white shadow-[0_4px_14px_rgba(253,90,71,0.35)] transition-colors hover:bg-brand-secondary"
      >
        <Send size={20} aria-hidden />
        {isFrench ? 'Commencer le cours sur Telegram →' : 'Start Course on Telegram →'}
      </a>
      <p className="mt-4 text-sm leading-relaxed text-brand-text-muted">
        {isFrench
          ? 'Cliquez sur le bouton ci-dessus pour ouvrir notre bot Telegram et commencer votre parcours d\'apprentissage Bitcoin de 21 jours.'
          : 'Click the button above to open our Telegram bot and begin your 21-day Bitcoin learning journey.'}
      </p>
    </div>
  )
}
