import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'
import { pathForPageSlug } from '@/utilities/homePage'

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = pathForPageSlug(doc.slug)

      payload.logger.info(`Revalidating page at path: ${path}`)

      try { revalidatePath(path); revalidateTag('pages-sitemap', 'max') } catch { /* outside Next.js runtime */ }
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = pathForPageSlug(previousDoc.slug)

      payload.logger.info(`Revalidating old page at path: ${oldPath}`)

      try { revalidatePath(oldPath); revalidateTag('pages-sitemap', 'max') } catch { /* outside Next.js runtime */ }
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = pathForPageSlug(doc?.slug ?? '')
    try { revalidatePath(path); revalidateTag('pages-sitemap', 'max') } catch { /* outside Next.js runtime */ }
  }

  return doc
}
