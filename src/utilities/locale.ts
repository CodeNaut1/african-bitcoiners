import { DEFAULT_LOCALE, type SupportedLocale } from './locale-shared'

export { DEFAULT_LOCALE, SUPPORTED_LOCALES, type SupportedLocale } from './locale-shared'

export function getLocale(): SupportedLocale {
  return DEFAULT_LOCALE
}
