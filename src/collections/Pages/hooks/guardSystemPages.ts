import type { CollectionBeforeChangeHook } from 'payload'

export const SYSTEM_PAGE_WRITE_CONTEXT = 'allowSystemPageWrite'

export function isSystemPageWriteAllowed(req: { context?: Record<string, unknown> }): boolean {
  return req.context?.[SYSTEM_PAGE_WRITE_CONTEXT] === true
}

/** Prevent admin edits to code-rendered system pages (seed/scripts bypass via context). */
export const guardSystemPages: CollectionBeforeChangeHook = ({ data, originalDoc, req }) => {
  if (isSystemPageWriteAllowed(req)) return data
  if (originalDoc?.template !== 'system') return data

  return {
    ...data,
    title: originalDoc.title,
    slug: originalDoc.slug,
    template: 'system',
    content: originalDoc.content ?? [],
    parent: originalDoc.parent ?? null,
    meta: originalDoc.meta ?? {},
  }
}
