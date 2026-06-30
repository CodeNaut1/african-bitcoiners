import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Media, SiteSetting } from '@/payload-types'

export async function getSiteSettingsLive(): Promise<SiteSetting> {
  const payload = await getPayload({ config: configPromise })
  return payload.findGlobal({
    slug: 'site-settings',
    depth: 1,
  }) as Promise<SiteSetting>
}

export async function isMaintenanceModeEnabled(): Promise<boolean> {
  try {
    const settings = await getSiteSettingsLive()
    return Boolean(settings.maintenanceMode)
  } catch {
    // Column may not exist until schema push — treat as maintenance off
    return false
  }
}

export function getSiteLogoUrl(siteData: SiteSetting): string | null {
  const logo = siteData?.logo
  if (logo && typeof logo === 'object') {
    return (logo as Media).url ?? null
  }
  return null
}
