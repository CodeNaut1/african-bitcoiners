/**
 * Upserts Task 3 Form Settings + ActiveCampaign mappings into Payload globals.
 * Safe to re-run: only adds missing rows, does not overwrite existing ones.
 *
 * Usage: pnpm forms:task3
 */

import { getPayload } from 'payload'

import config from '@/payload.config'
import { DEFAULT_FORM_SETTINGS } from './seed-form-settings'

const TASK3_FORM_SLUGS = [
  'meetup',
  'places-earn',
  'map-location',
  'savings-challenge',
  'job-submission',
  'mining-org',
  'miab-nomination',
] as const

/** AC list names that existed / are known for Task 3 forms from the migration. */
const TASK3_AC_MAPPINGS: Array<{
  formSlug: string
  listNames: string[]
  enabled: boolean
}> = [
  {
    formSlug: 'savings-challenge',
    listNames: ['A Billion African Millionaires'],
    enabled: true,
  },
  // Newsletter opt-in on Places to Earn / Map Location (synced via newsletter-signup in code)
  {
    formSlug: 'newsletter-signup',
    listNames: ['Newsletter Consent/Sign up'],
    enabled: true,
  },
  {
    formSlug: 'master',
    listNames: ['Master Contact List'],
    enabled: true,
  },
]

function toFormSettingsRow(form: (typeof DEFAULT_FORM_SETTINGS)[number]) {
  return {
    formSlug: form.formSlug,
    formTitle: form.formTitle,
    enabled: form.formSlug === 'miab-nomination' ? false : true,
    confirmationHeading: form.confirmationHeading,
    confirmationDescription: form.confirmationDescription,
    showNpsFeedback: form.showNpsFeedback ?? false,
    redirectToConfirmation: true,
    teamNotificationEnabled: true,
    teamEmailGroup: form.teamEmailGroup,
    teamNotificationSubjectTemplate: 'New Entry: {{form_title}}',
    userNotificationEnabled: form.userNotificationEnabled ?? false,
    userNotificationSubjectTemplate: form.userNotificationSubject ?? '',
    userNotificationBodyTemplate: form.userNotificationBody ?? '',
    userNotificationFromName: 'African Bitcoiners',
  }
}

async function upsertFormSettings(payload: Awaited<ReturnType<typeof getPayload>>) {
  const existing = await payload.findGlobal({
    slug: 'form-settings',
    overrideAccess: true,
  })

  const current = [...((existing.forms as any[]) ?? [])]
  const existingSlugs = new Set(current.map((f) => f.formSlug))

  const needed = DEFAULT_FORM_SETTINGS.filter((f) =>
    (TASK3_FORM_SLUGS as readonly string[]).includes(f.formSlug),
  )

  let added = 0
  for (const form of needed) {
    if (existingSlugs.has(form.formSlug)) {
      console.log(`  ↷ Form Settings already has: ${form.formSlug}`)
      continue
    }
    current.push(toFormSettingsRow(form))
    existingSlugs.add(form.formSlug)
    added++
    console.log(`  ✓ Added Form Settings: ${form.formSlug}`)
  }

  if (added > 0) {
    await payload.updateGlobal({
      slug: 'form-settings',
      data: { forms: current } as any,
      overrideAccess: true,
    })
  }

  console.log(`Form Settings: ${added} added, ${needed.length - added} already present`)
}

async function upsertAcSettings(payload: Awaited<ReturnType<typeof getPayload>>) {
  const existing = await (payload.findGlobal as any)({
    slug: 'ac-settings',
    overrideAccess: true,
  })

  const current = [...(existing?.listMappings ?? [])]
  const existingSlugs = new Set(current.map((m: any) => m.formSlug))

  let added = 0
  for (const mapping of TASK3_AC_MAPPINGS) {
    if (existingSlugs.has(mapping.formSlug)) {
      console.log(`  ↷ AC mapping already has: ${mapping.formSlug}`)
      continue
    }
    current.push({
      formSlug: mapping.formSlug,
      listNames: mapping.listNames.map((listName) => ({ listName })),
      enabled: mapping.enabled,
    })
    existingSlugs.add(mapping.formSlug)
    added++
    console.log(`  ✓ Added AC mapping: ${mapping.formSlug} → ${mapping.listNames.join(', ')}`)
  }

  if (added > 0) {
    await (payload.updateGlobal as any)({
      slug: 'ac-settings',
      data: { listMappings: current },
      overrideAccess: true,
    })
  }

  console.log(`AC Settings: ${added} added`)
}

async function ensureMiabNominationsPage(payload: Awaited<ReturnType<typeof getPayload>>) {
  const slug = 'most-impactful-nominations'
  const found = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: true,
  })

  if (found.docs[0]) {
    console.log(`  ↷ Page already exists: /${slug}`)
    return
  }

  const community = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'community' } },
    limit: 1,
    overrideAccess: true,
  })

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Most Impactful African Bitcoiners Nominations',
      slug,
      parent: community.docs[0]?.id,
      _status: 'published',
      meta: {
        title: 'Most Impactful African Bitcoiners Nominations',
        description:
          'Nominate the most impactful African Bitcoiners of the year. Celebrate advocates driving Bitcoin adoption across the continent.',
      },
      content: [],
    } as any,
    overrideAccess: true,
  })
  console.log(`  ✓ Created page: /${slug}`)
}

async function ensureFormSlugEnums(payload: Awaited<ReturnType<typeof getPayload>>) {
  const pool = (payload.db as { pool?: { query: (sql: string) => Promise<unknown> } }).pool
  if (!pool) return

  for (const value of ['places-earn', 'miab-nomination']) {
    try {
      await pool.query(
        `ALTER TYPE "enum_form_settings_forms_form_slug" ADD VALUE IF NOT EXISTS '${value}'`,
      )
    } catch {
      // value may already exist
    }
  }
}

async function run() {
  const payload = await getPayload({ config })

  await ensureFormSlugEnums(payload)

  console.log('\n── Form Settings (Task 3) ──')
  await upsertFormSettings(payload)

  console.log('\n── ActiveCampaign Settings ──')
  await upsertAcSettings(payload)

  console.log('\n── MIAB nominations page ──')
  await ensureMiabNominationsPage(payload)

  console.log('\nDone. Open Payload → Form Settings / ActiveCampaign Settings to review.')
  await payload.db.destroy?.()
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
