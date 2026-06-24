import { getCachedGlobal } from '@/utilities/getGlobals'
import { ChatbotWidget } from '@/components/ChatbotWidget'
import { ScrollToTop } from '@/components/ui/scroll-to-top'
import { Logo } from '@/components/Logo/Logo'
import { Facebook, Instagram, Linkedin, Twitter, Zap } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import type { Footer as FooterType, Media, SiteSetting } from '@/payload-types'

// ── Inline SVGs for platforms not covered by lucide-react ────────────────────

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.046 22l4.978-1.306A9.966 9.966 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.975 7.975 0 01-4.08-1.117l-.29-.172-3.008.789.805-2.92-.19-.302A7.951 7.951 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8zm4.406-5.845c-.242-.12-1.43-.705-1.652-.786-.22-.08-.382-.12-.543.121-.16.242-.623.786-.764.948-.14.161-.281.181-.523.06-.242-.12-1.021-.376-1.945-1.2-.718-.64-1.203-1.43-1.344-1.672-.14-.24-.015-.37.106-.49.108-.107.242-.281.363-.422.12-.14.16-.24.24-.402.08-.16.04-.301-.02-.422-.06-.12-.543-1.31-.744-1.79-.196-.47-.394-.406-.543-.414-.14-.007-.301-.009-.463-.009-.16 0-.422.06-.643.301-.22.242-.845.826-.845 2.014 0 1.188.865 2.336.985 2.497.12.16 1.703 2.601 4.124 3.648.576.249 1.025.397 1.375.509.578.185 1.104.158 1.52.096.464-.07 1.43-.584 1.63-1.149.2-.563.2-1.046.14-1.148-.06-.102-.221-.162-.464-.282z" />
  </svg>
)

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
    <path d="M22.265 2.428a1.457 1.457 0 00-1.487-.209L1.638 9.788a1.49 1.49 0 00.072 2.77l4.008 1.363 1.968 5.9a1.49 1.49 0 002.39.596l2.62-2.37 4.627 3.382a1.49 1.49 0 002.333-1.014L22.98 3.904a1.46 1.46 0 00-.715-1.476zM9.43 14.817l-.6 2.876-1.297-3.885 9.742-7.284-7.845 8.293zm2.293 2.95l.449-2.146 1.043.762-1.492 1.384zm6.693 1.682l-5.396-3.944 8.327-8.808-2.931 12.752z" />
  </svg>
)

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
)

// ── Social icon registry ──────────────────────────────────────────────────────

type Platform = NonNullable<SiteSetting['socialLinks']>[number]['platform']

const SOCIAL_ICONS: Partial<Record<Platform, React.FC>> = {
  whatsapp: WhatsAppIcon,
  twitter: () => <Twitter className="h-5 w-5" />,
  instagram: () => <Instagram className="h-5 w-5" />,
  facebook: () => <Facebook className="h-5 w-5" />,
  linkedin: () => <Linkedin className="h-5 w-5" />,
  telegram: TelegramIcon,
  discord: DiscordIcon,
  nostr: () => <Zap className="h-5 w-5" />,
}

const PLATFORM_LABELS: Partial<Record<Platform, string>> = {
  whatsapp: 'WhatsApp',
  twitter: 'Twitter',
  instagram: 'Instagram',
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  telegram: 'Telegram',
  discord: 'Discord',
  nostr: 'Nostr',
  youtube: 'YouTube',
}

// ── Footer server component ───────────────────────────────────────────────────

export async function Footer() {
  const [footerData, siteData] = await Promise.all([
    getCachedGlobal('footer', 1)() as Promise<FooterType>,
    getCachedGlobal('site-settings', 1)() as Promise<SiteSetting>,
  ])

  const quickLinks = footerData?.quickLinks || []
  const utilityLinks = footerData?.utilityLinks || []
  const description =
    footerData?.description ||
    'African Bitcoiners is a Bitcoin education and adoption platform dedicated to building a Bitcoin-friendly Africa.'
  const copyrightText = footerData?.copyrightText || '© 2026 African Bitcoiners'
  const socialLinks = siteData?.socialLinks || []
  const logoMedia = siteData?.logo && typeof siteData.logo === 'object'
    ? (siteData.logo as Media)
    : null
  const logoUrl = logoMedia?.url ?? null

  return (
    <>
      <footer className="mt-auto bg-brand-secondary text-white">
        {/* ── 3-column main grid ───────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">

            {/* Col 1 — Logo + description */}
            <div className="flex flex-col gap-5">
              <Link href="/" aria-label="African Bitcoiners home">
                <Logo src={logoUrl} markOnly />
              </Link>
              <p className="text-sm leading-relaxed text-white/70 max-w-xs">{description}</p>
            </div>

            {/* Col 2 — Quick links */}
            <div>
              <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-white/40">
                Quick Links
              </h3>
              <ul className="flex flex-col gap-3">
                {quickLinks.map(({ label, url }, i) => (
                  <li key={i}>
                    <Link
                      href={url}
                      className="text-sm font-bold uppercase tracking-wide underline underline-offset-4 decoration-white/30 text-white/80 hover:text-brand-primary hover:decoration-brand-primary transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Utility links */}
            <div>
              <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-white/40">
                Useful Links
              </h3>
              <ul className="flex flex-col gap-3">
                {utilityLinks.map(({ label, url }, i) => (
                  <li key={i}>
                    <Link
                      href={url}
                      className="text-sm font-bold uppercase tracking-wide underline underline-offset-4 decoration-white/30 text-white/80 hover:text-brand-primary hover:decoration-brand-primary transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Social icons row ─────────────────────────────────── */}
          {socialLinks.length > 0 && (
            <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap gap-3">
              {socialLinks.map(({ platform, url }, i) => {
                const Icon = SOCIAL_ICONS[platform]
                if (!Icon) return null
                return (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={PLATFORM_LABELS[platform] ?? platform}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-brand-primary hover:text-white transition-colors duration-200"
                  >
                    <Icon />
                  </a>
                )
              })}
            </div>
          )}
        </div>

        {/* ── Bottom copyright bar ────────────────────────────────── */}
        <div className="border-t border-white/10 bg-black/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
            <span>{copyrightText}</span>
            <span>Built with ♥ for Africa&apos;s Bitcoin future</span>
          </div>
        </div>
      </footer>

      {/* Fixed floating elements — present on every page */}
      <ScrollToTop />
      <ChatbotWidget />
    </>
  )
}
