import type { NextConfig } from 'next'
import fs from 'fs'
import path from 'path'

type RedirectEntry = {
  source: string
  destination: string
  permanent: boolean
}

// Load generated redirect map (run pnpm redirects:generate to regenerate)
function loadGeneratedRedirects(): RedirectEntry[] {
  const jsonPath = path.join(process.cwd(), 'scripts/exports/redirects.json')
  if (!fs.existsSync(jsonPath)) return []
  try {
    return JSON.parse(fs.readFileSync(jsonPath, 'utf-8')) as RedirectEntry[]
  } catch {
    return []
  }
}

export const redirects: NextConfig['redirects'] = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header' as const,
        key: 'user-agent',
        value: '(.*Trident.*)',
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)',
  }

  const generated = loadGeneratedRedirects()

  const homeRedirects = [
    { source: '/african-bitcoiners', destination: '/', permanent: true },
    { source: '/home', destination: '/', permanent: true },
  ]

  return [internetExplorerRedirect, ...homeRedirects, ...generated]
}
