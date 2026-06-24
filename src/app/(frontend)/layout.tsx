import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Sora } from 'next/font/google'
import localFont from 'next/font/local'
import React from 'react'
import Script from 'next/script'

const satoshi = localFont({
  src: [
    {
      path: '../../../public/fonts/satoshi/Satoshi-Variable.woff2',
      style: 'normal',
      weight: '300 900',
    },
    {
      path: '../../../public/fonts/satoshi/Satoshi-VariableItalic.woff2',
      style: 'italic',
      weight: '300 900',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
  preload: true,
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { draftMode } from 'next/headers'
import type { Media, SiteSetting } from '@/payload-types'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  const siteData = await (getCachedGlobal('site-settings', 1)() as Promise<SiteSetting>)
  const faviconMedia = siteData?.favicon && typeof siteData.favicon === 'object'
    ? (siteData.favicon as Media)
    : null
  const faviconUrl = faviconMedia?.url ?? null

  return (
    <html className={cn(satoshi.variable, sora.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        {/* Static fallback favicon — always present */}
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        {/* Dynamic favicon from SiteSettings (overrides static fallback when present) */}
        {faviconUrl && <link href={faviconUrl} rel="icon" type="image/webp" sizes="32x32" />}

        {/* Google Tag Manager */}
        {GTM_ID && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        )}
      </head>
      <body>
        {/* GTM noscript fallback */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        <Providers>
          <AdminBar adminBarProps={{ preview: isEnabled }} />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    template: '%s | African Bitcoiners',
    default: 'African Bitcoiners - Bringing Freedom to Africa through Bitcoin',
  },
  description:
    'Bitcoin education and adoption platform dedicated to building a Bitcoin-friendly Africa.',
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    site: '@afribitcoiners',
    creator: '@afribitcoiners',
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }),
}
