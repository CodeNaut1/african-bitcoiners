import { isHomePageSlug } from './homePage'

export const SITE_NAME = 'African Bitcoiners'

const SITE_SUFFIX_PATTERN = /\s(?:[-|–—])\s*African Bitcoiners\s*$/i

export function hasYoastPlaceholders(value: string): boolean {
  return value.includes('%%')
}

export function normalizeTitle(title: string): string {
  return title.replace(/\s\|\s*/g, ' - ').replace(/\s+/g, ' ').trim()
}

/** Remove layout suffixes so the root title template does not duplicate the site name. */
export function stripSiteSuffix(title: string): string {
  let result = normalizeTitle(title)
  while (SITE_SUFFIX_PATTERN.test(result)) {
    result = result.replace(SITE_SUFFIX_PATTERN, '').trim()
  }
  return result
}

/** Plain page title for Next.js metadata (layout adds " - African Bitcoiners"). */
export function formatDocumentTitle(options: {
  metaTitle?: string | null
  pageTitle?: string | null
  slug?: string | null
}): string {
  const { metaTitle, pageTitle, slug } = options

  const cleanedMeta =
    metaTitle && !hasYoastPlaceholders(metaTitle) ? stripSiteSuffix(metaTitle) : null

  if (slug && isHomePageSlug(slug)) {
    return cleanedMeta || SITE_NAME
  }

  if (cleanedMeta) {
    return cleanedMeta
  }

  if (pageTitle?.trim()) {
    return pageTitle.trim()
  }

  return SITE_NAME
}

/** Full title for Open Graph / social previews. */
export function fullPageTitle(plainTitle: string): string {
  if (plainTitle === SITE_NAME) return SITE_NAME
  return `${plainTitle} - ${SITE_NAME}`
}
