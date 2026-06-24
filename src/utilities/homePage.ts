/** CMS slug for the homepage. Served at `/`. */
export const HOME_PAGE_SLUG = 'home'

/** Old WP homepage slug — URL redirects to `/` but is no longer in CMS. */
export const LEGACY_HOME_SLUG = 'african-bitcoiners'

const HOME_SLUGS = new Set([HOME_PAGE_SLUG, LEGACY_HOME_SLUG])

export function isHomePageSlug(slug: string | null | undefined): boolean {
  if (!slug) return false
  return HOME_SLUGS.has(slug)
}

/** Public URL path for a page slug (`/` for homepage slugs). */
export function pathForPageSlug(slug: string): string {
  return isHomePageSlug(slug) ? '/' : `/${slug}`
}

/** Normalize redirect destinations — legacy home paths become `/`. */
export function normalizeRedirectPath(path: string): string {
  const trimmed = path.replace(/\/$/, '') || '/'
  if (trimmed === '/') return '/'
  const slug = trimmed.startsWith('/') ? trimmed.slice(1) : trimmed
  return pathForPageSlug(slug)
}
