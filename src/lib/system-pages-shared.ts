import type { Payload } from 'payload'

import { SYSTEM_PAGE_WRITE_CONTEXT } from '@/collections/Pages/hooks/guardSystemPages'

export const SYSTEM_PAGE_NOTICE =
  'This is a system page rendered by code. Content cannot be edited here.'

export type SystemPageDef = {
  title: string
  slug: string
}

/** Code-based routes listed in admin for URL visibility only. */
export const QUIZ_SYSTEM_PAGE_DEFS: SystemPageDef[] = [
  { title: 'Final Quiz (English)', slug: 'final-quiz' },
  { title: 'Final Quiz (French)', slug: 'final-quiz-fr' },
  { title: 'Final Quiz - Telegram (English)', slug: 'final-quiz-tg' },
  { title: 'Final Quiz - Telegram (French)', slug: 'final-quiz-tg-fr' },
  { title: 'Quiz Results - Passed', slug: 'final-quiz-passed' },
  { title: 'Quiz Results - Failed', slug: 'final-quiz-failed' },
  { title: 'Get Certificate', slug: 'get-certificate' },
  { title: 'Certificate View', slug: 'result-page' },
]

async function ensureSystemTemplateEnum(payload: Payload): Promise<void> {
  const pool = (payload.db as { pool?: { query: (sql: string) => Promise<unknown> } }).pool
  if (!pool) return

  const enums = ['enum_pages_template', 'enum__pages_v_version_template']

  for (const enumName of enums) {
    try {
      await pool.query(`ALTER TYPE "${enumName}" ADD VALUE IF NOT EXISTS 'system'`)
    } catch (err) {
      const message = (err as Error).message ?? ''
      if (!message.includes('already exists')) throw err
    }
  }
}

export async function seedSystemPages(
  payload: Payload,
  defs: SystemPageDef[] = QUIZ_SYSTEM_PAGE_DEFS,
): Promise<{ created: number; updated: number }> {
  await ensureSystemTemplateEnum(payload)

  let created = 0
  let updated = 0

  for (const def of defs) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: def.slug } },
      limit: 1,
      overrideAccess: true,
    })

    const data = {
      title: def.title,
      slug: def.slug,
      template: 'system' as const,
      content: [] as never[],
      _status: 'published' as const,
    }

    if (existing.docs[0]) {
      await payload.update({
        collection: 'pages',
        id: existing.docs[0].id,
        data,
        overrideAccess: true,
        context: { [SYSTEM_PAGE_WRITE_CONTEXT]: true },
      })
      updated++
    } else {
      await payload.create({
        collection: 'pages',
        data,
        overrideAccess: true,
        context: { [SYSTEM_PAGE_WRITE_CONTEXT]: true },
      })
      created++
    }
  }

  return { created, updated }
}
