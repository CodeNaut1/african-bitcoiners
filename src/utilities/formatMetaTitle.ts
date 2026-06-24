import { isHomePageSlug } from './homePage'

const SITE_NAME = 'African Bitcoiners'
export const DEFAULT_HOME_TITLE = 'African Bitcoiners - Bringing Freedom to Africa'
const DEFAULT_SITE_TITLE = `${SITE_NAME} - Bringing Freedom to Africa through Bitcoin`

export function hasYoastPlaceholders(value: string): boolean {
  return value.includes('%%')
}

/** Build a clean SEO title for storage or rendering. */
export function formatDocumentTitle(options: {
  metaTitle?: string | null
  pageTitle?: string | null
  slug?: string | null
}): string {
  const { metaTitle, pageTitle, slug } = options
  const isHome = slug ? isHomePageSlug(slug) : false

  if (isHome) {
    return DEFAULT_HOME_TITLE
  }

  const cleanedMeta =
    metaTitle && !hasYoastPlaceholders(metaTitle) ? normalizeTitle(metaTitle) : null

  if (cleanedMeta) {
    return ensureSiteSuffix(cleanedMeta)
  }

  if (pageTitle) {
    return `${pageTitle} - ${SITE_NAME}`
  }

  return DEFAULT_SITE_TITLE
}

function normalizeTitle(title: string): string {
  return title.replace(/\s\|\s*/g, ' - ').replace(/\s+/g, ' ').trim()
}

function ensureSiteSuffix(title: string): string {
  const result = normalizeTitle(title)
  const suffixPattern = new RegExp(`\\s[-|]\\s*${escapeRegex(SITE_NAME)}\\s*$`, 'i')

  if (suffixPattern.test(result)) {
    return result.replace(/\s\|\s*African Bitcoiners\s*$/i, ' - African Bitcoiners')
  }

  return `${result} - ${SITE_NAME}`
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
