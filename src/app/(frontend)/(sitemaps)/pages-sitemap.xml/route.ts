import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { isHomePageSlug } from '@/utilities/homePage'

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const results = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const defaultSitemap = [
      { loc: `${SITE_URL}/`, lastmod: dateFallback },
      { loc: `${SITE_URL}/bitcoin-newsletter`, lastmod: dateFallback },
      { loc: `${SITE_URL}/search`, lastmod: dateFallback },
    ]

    const sitemap = results.docs
      ? results.docs
          .filter((page) => Boolean(page?.slug) && !isHomePageSlug(page?.slug))
          .map((page) => ({
            loc: `${SITE_URL}/${page?.slug}`,
            lastmod: page.updatedAt || dateFallback,
          }))
      : []

    // Deduplicate by loc (defaultSitemap already includes /)
    const seen = new Set(defaultSitemap.map((e) => e.loc))
    const uniquePageSitemap = sitemap.filter((e) => {
      if (seen.has(e.loc)) return false
      seen.add(e.loc)
      return true
    })

    return [...defaultSitemap, ...uniquePageSitemap]
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
