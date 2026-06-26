'use client'

import React, { useState } from 'react'
import { BookOpen, ChevronDown, FileText } from 'lucide-react'
import { cn } from '@/utilities/ui'

const R2 = 'https://pub-d2aef463d8a6497d90ac252cbcb0dcbf.r2.dev'

type Lang = 'en' | 'fr'

const OPTIONS = {
  en: [
    {
      href: 'https://www.amazon.com/dp/B0FDDYYC82',
      title: 'PRINT VERSION NOW ON AMAZON!',
      subtitle: 'NOW AVAILABLE IN PRINT FOR $19',
      Icon: BookOpen,
    },
    {
      href: `${R2}/uploads/2026/03/BITCOIN_Africa-Guide-to-Freedom-Money_by-African-Bitcoiners-2ND-EDITION.pdf`,
      title: 'DOWNLOAD FREE PDF (2ND EDITION)',
      subtitle: 'Get the digital version at no cost',
      Icon: FileText,
    },
  ],
  fr: [
    {
      href: 'https://www.amazon.com/dp/B0GV9PHXR6',
      title: 'VERSION PAPIER SUR AMAZON !',
      subtitle: 'DISPONIBLE EN IMPRIMÉ POUR 19 $',
      Icon: BookOpen,
    },
    {
      href: `${R2}/uploads/2026/03/Le-Guide-Africain-vers-la-Liberte-Monetaire-Version2.pdf`,
      title: 'TÉLÉCHARGER LE PDF GRATUIT',
      subtitle: 'Obtenez la version numérique gratuitement',
      Icon: FileText,
    },
  ],
}

export function GuideModal() {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState<Lang>('en')

  return (
    <div className="relative inline-block w-full max-w-md">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'inline-flex w-full cursor-pointer items-center justify-between gap-8 rounded-[5px] bg-[#FFC567] px-6 py-4 text-base font-semibold text-black shadow-[0_4px_8px_rgba(255,197,103,0.3)] transition-all duration-200 sm:gap-16 sm:px-9 sm:py-[22px]',
          'hover:-translate-y-0.5 hover:bg-black hover:text-[#FFC567] hover:shadow-[0_6px_16px_rgba(0,0,0,0.25)]',
        )}
      >
        <span>Get the guide</span>
        <ChevronDown size={18} className={cn('shrink-0 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="relative z-[1000] mt-2 w-full overflow-hidden rounded-[5px] bg-[#F9F9F9] shadow-[0_8px_32px_rgba(0,0,0,0.12)] md:absolute md:left-0 md:right-0 md:top-[calc(100%+12px)] md:mt-0">
          <div className="flex border-b border-black/10 bg-[#F9F9F9] px-4 py-4 sm:px-12">
            {(['en', 'fr'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setLang(tab)}
                className={cn(
                  'flex-1 border-b-[3px] px-3 py-3 text-sm font-medium transition-colors',
                  lang === tab
                    ? 'border-[#FFC567] bg-[#FFC567]/40 text-black'
                    : 'border-transparent text-black hover:bg-[#FFC567]/30',
                )}
              >
                {tab === 'en' ? 'English' : 'Français'}
              </button>
            ))}
          </div>
          <div className="p-5">
            <p className="mb-3 text-sm font-semibold tracking-[-0.4px] text-black">
              CHOOSE YOUR PREFERRED FORMAT
            </p>
            <div className="flex flex-col gap-3">
              {OPTIONS[lang].map((opt) => (
                <a
                  key={opt.title}
                  href={opt.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 rounded-lg border border-black/[0.12] bg-[#F9F9F9] p-3.5 transition-all hover:translate-x-1 hover:border-[#FFC567] hover:bg-[#FFC567]/15"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center">
                    <opt.Icon size={22} className="text-black" />
                  </span>
                  <span className="min-w-0 flex-1 text-left">
                    <span className="block text-sm font-bold text-black">{opt.title}</span>
                    <span className="block text-xs font-medium text-black">{opt.subtitle}</span>
                  </span>
                  <span className="shrink-0 text-lg text-black/30">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
