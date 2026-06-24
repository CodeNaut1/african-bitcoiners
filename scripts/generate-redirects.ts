/**
 * generate-redirects.ts
 *
 * Compares WP page slugs/URLs with the new Next.js route structure and generates
 * a 301 redirect map for any URLs that changed.
 *
 * Outputs:
 *   - scripts/exports/redirects.json  → array of {source, destination, permanent}
 *
 * The redirects.json is then manually imported into redirects.ts, or loaded
 * automatically if redirects.ts is updated to import it.
 *
 * Usage: pnpm redirects:generate
 */

import fs from 'fs'
import path from 'path'

const EXPORT_DIR = path.join(import.meta.dirname, 'exports')
const PAGES_FILE = path.join(EXPORT_DIR, 'pages.json')
const POSTS_FILE = path.join(EXPORT_DIR, 'posts.json')
const REDIRECTS_OUT = path.join(EXPORT_DIR, 'redirects.json')
const REDIRECTS_TS = path.join(import.meta.dirname, '..', 'redirects.ts')

interface Redirect {
  source: string
  destination: string
  permanent: boolean
}

interface WPItem {
  slug: string
  link: string
  parentSlug?: string | null
}

// Known WP URL patterns that changed in the new site
// source → destination (both should start with /)
const KNOWN_RENAMES: Record<string, string> = {
  // Old WP URL structure → New Next.js route
  '/bitcoiner-jobs/': '/earn-bitcoin/bitcoiner-jobs/',
  '/free-bitcoin-for-beginners-course/': '/learn-bitcoin/free-bitcoin-course/',
  '/african-language-resources/': '/learn-bitcoin/african-language-resources/',
  '/bitcoin-learning-resources/': '/learn-bitcoin/bitcoin-learning-resources/',
  '/bitcoin-whitepaper/': '/learn-bitcoin/bitcoin-whitepaper/',
  '/bitcoin-misconceptions/': '/learn-bitcoin/top-10-bitcoin-misconceptions/',
  '/bitcoin-for-kids/': '/learn-bitcoin/bitcoin-for-kids/',
  '/why-bitcoin-only/': '/learn-bitcoin/why-bitcoin-only/',
  '/how-to-keep-bitcoin-in-your-head/': '/learn-bitcoin/how-to-keep-bitcoin-in-your-head/',
  '/1000-sats-feedback-bounty/': '/earn-bitcoin/1000-sats-feedback-bounty/',
  '/feedback-bounty/': '/earn-bitcoin/1000-sats-feedback-bounty/',
  '/places-to-earn-sats/': '/earn-bitcoin/places-to-earn-sats/',
  '/bitcoin-inflation-simulator/': '/save-bitcoin/bitcoin-inflation-simulator/',
  '/million-sat-challenge/': '/save-bitcoin/million-sat-challenge/',
  '/recommended-wallets/': '/save-bitcoin/recommended-bitcoin-and-lightning-wallets/',
  '/5-year-bitcoin-savings-calculator/': '/save-bitcoin/5-year-bitcoin-savings-calculator/',
  '/bitcoin-cold-storage/': '/save-bitcoin/how-to-setup-your-bitcoin-cold-storage-for-free/',
  '/bitcoin-to-fiat-converter/': '/save-bitcoin/bitcoin-to-fiat-converter/',
  '/bitcoiners-map/': '/spend-bitcoin/bitcoiners-map/',
  '/places-to-spend-bitcoin/': '/spend-bitcoin/places-to-spend-bitcoin/',
  '/proof-of-work/': '/about-us/african-bitcoiners-proof-of-work/',
  '/support-us/': '/about-us/support-us/',
  '/our-team/': '/about-us/our-team/',
  '/connect-with-us/': '/about-us/connect-with-us/',
  '/why-we-are-private/': '/about-us/why-we-are-private/',
  // Newsletter was at /newsletter/ or /?cat=X
  '/newsletter/': '/bitcoin-newsletter/',
  '/category/bitcoin-newsletter/': '/bitcoin-newsletter/',
  '/category/saturday-stacker/': '/bitcoin-newsletter/',
}

function wpLinkToPath(link: string): string {
  try {
    const url = new URL(link)
    return url.pathname
  } catch {
    return link.startsWith('/') ? link : `/${link}`
  }
}

function buildNewPath(item: WPItem): string {
  const slug = item.slug
  const parent = item.parentSlug

  // If parent exists, build nested path
  if (parent && parent !== '') {
    return `/${parent}/${slug}/`
  }
  return `/${slug}/`
}

async function main() {
  if (!fs.existsSync(PAGES_FILE)) {
    console.error(`pages.json not found. Run pnpm export:wp first.`)
    process.exit(1)
  }

  const pages: WPItem[] = JSON.parse(fs.readFileSync(PAGES_FILE, 'utf-8'))
  const posts: WPItem[] = fs.existsSync(POSTS_FILE)
    ? JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'))
    : []

  const redirects: Redirect[] = []
  const seen = new Set<string>()

  // Add known manual renames first
  for (const [source, destination] of Object.entries(KNOWN_RENAMES)) {
    if (!seen.has(source)) {
      redirects.push({ source, destination, permanent: true })
      seen.add(source)
    }
  }

  // Check pages: if WP URL != new URL, add redirect
  for (const page of pages) {
    if (!page.slug || !page.link) continue

    const wpPath = wpLinkToPath(page.link)
    const newPath = buildNewPath(page)

    // Normalize: ensure trailing slash
    const normalWp = wpPath.endsWith('/') ? wpPath : `${wpPath}/`
    const normalNew = newPath.endsWith('/') ? newPath : `${newPath}/`

    if (normalWp !== normalNew && !seen.has(normalWp)) {
      redirects.push({ source: normalWp, destination: normalNew, permanent: true })
      seen.add(normalWp)
    }
  }

  // Newsletter posts: WP posts were at /<slug>/, now at /bitcoin-newsletter/<slug>/
  for (const post of posts) {
    if (!post.slug) continue
    const oldPath = `/${post.slug}/`
    const newPath = `/bitcoin-newsletter/${post.slug}/`
    if (!seen.has(oldPath)) {
      redirects.push({ source: oldPath, destination: newPath, permanent: true })
      seen.add(oldPath)
    }
  }

  // Write JSON output
  fs.writeFileSync(REDIRECTS_OUT, JSON.stringify(redirects, null, 2))
  console.log(`✅ Generated ${redirects.length} redirects → scripts/exports/redirects.json`)

  // Update redirects.ts to load from the JSON file
  const newRedirectsTs = `import type { NextConfig } from 'next'
import fs from 'fs'
import path from 'path'

// Load generated redirect map (run pnpm redirects:generate to regenerate)
function loadGeneratedRedirects(): NextConfig['redirects'] extends () => Promise<infer R> ? R : never {
  const jsonPath = path.join(process.cwd(), 'scripts/exports/redirects.json')
  if (!fs.existsSync(jsonPath)) return []
  try {
    return JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
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

  return [internetExplorerRedirect, ...generated]
}
`

  fs.writeFileSync(REDIRECTS_TS, newRedirectsTs)
  console.log(`✅ Updated redirects.ts to load from redirects.json`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
