import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Media, SiteSetting } from '@/payload-types'
import React from 'react'

export async function Header() {
  const [headerData, siteData] = await Promise.all([
    getCachedGlobal('header', 1)(),
    getCachedGlobal('site-settings', 1)() as Promise<SiteSetting>,
  ])

  const logoMedia = siteData?.logo && typeof siteData.logo === 'object'
    ? (siteData.logo as Media)
    : null
  const logoUrl = logoMedia?.url ?? null

  return <HeaderClient data={headerData} logoUrl={logoUrl} />
}
