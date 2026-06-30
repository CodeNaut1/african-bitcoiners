import type { Payload } from 'payload'

const AC_URL = process.env.ACTIVECAMPAIGN_API_URL
const AC_KEY = process.env.ACTIVECAMPAIGN_API_KEY

// In-process cache: AC list name → AC list ID
const listIdCache = new Map<string, string>()

async function acFetch(path: string, method = 'GET', body?: unknown) {
  if (!AC_URL || !AC_KEY) return null
  const res = await fetch(`${AC_URL}/api/3${path}`, {
    method,
    headers: { 'Api-Token': AC_KEY, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const text = await res.text()
    console.error(`[ac] ${method} ${path} → ${res.status}`, text.slice(0, 200))
    return null
  }
  return res.json()
}

// Resolve an AC list name to its ID (with in-process cache)
async function getListIdByName(name: string): Promise<string | null> {
  if (listIdCache.has(name)) return listIdCache.get(name)!

  const data = await acFetch('/lists?limit=100')
  if (!data?.lists) return null

  for (const l of data.lists) {
    listIdCache.set(l.name, l.id)
  }

  const id = listIdCache.get(name) ?? null
  if (!id) console.warn(`[ac] List "${name}" not found in AC account`)
  return id
}

// Upsert a contact and subscribe them to each of the given AC list names
async function upsertAndSubscribe(email: string, name: string, listNames: string[]): Promise<void> {
  if (!AC_URL || !AC_KEY) {
    console.log(`[ac:stub] addContact email=${email} lists=${listNames.join(', ')}`)
    return
  }
  if (!email) return

  const parts = name.trim().split(' ')
  const firstName = parts[0] ?? ''
  const lastName = parts.slice(1).join(' ') || ''

  const contactRes = await acFetch('/contacts/sync', 'POST', {
    contact: { email, firstName, lastName },
  })
  const contactId = contactRes?.contact?.id
  if (!contactId) return

  await Promise.all(
    listNames.map(async (listName) => {
      const listId = await getListIdByName(listName)
      if (!listId) return
      await acFetch('/contactLists', 'POST', {
        contactList: { list: listId, contact: contactId, status: 1 },
      })
    }),
  )
}

// ── Public API ────────────────────────────────────────────────────────────────

type AcListMapping = {
  formSlug: string
  listNames?: Array<{ listName?: string | null }> | null
  /** @deprecated legacy single-list field — kept for existing DB rows until re-saved */
  listName?: string | null
  enabled?: boolean | null
}

function extractMappingListNames(mapping: AcListMapping | undefined): string[] {
  if (!mapping) return []

  const fromArray = (mapping.listNames ?? [])
    .map((item) => item.listName?.trim())
    .filter((name): name is string => Boolean(name))

  if (fromArray.length) return fromArray

  const legacy = mapping.listName?.trim()
  return legacy ? [legacy] : []
}

/**
 * Add a contact from a form submission.
 * Reads list mappings from the ac-settings global.
 * Always also subscribes to the "master" list (every form).
 */
export async function addContactForForm(
  email: string,
  name: string,
  formSlug: string,
  payload: Payload,
): Promise<void> {
  if (!email) {
    console.log(`[ac] addContactForForm skipped — no email (formSlug="${formSlug}")`)
    return
  }

  const listNames: string[] = []

  try {
    const settings = await (payload.findGlobal as any)({ slug: 'ac-settings', overrideAccess: true })
    const mappings: AcListMapping[] = settings?.listMappings ?? []

    console.log(`[ac] addContactForForm formSlug="${formSlug}" — ${mappings.length} mapping(s) in ac-settings`)

    const match = mappings.find((m) => m.formSlug === formSlug && m.enabled)
    for (const listName of extractMappingListNames(match)) {
      if (!listNames.includes(listName)) listNames.push(listName)
    }

    const master = mappings.find((m) => m.formSlug === 'master' && m.enabled)
    for (const listName of extractMappingListNames(master)) {
      if (!listNames.includes(listName)) listNames.push(listName)
    }
  } catch (err) {
    console.warn('[ac] Failed to read ac-settings global:', (err as Error).message)
  }

  if (listNames.length === 0) {
    console.log(`[ac] No enabled mapping found for formSlug="${formSlug}" — skipping AC sync`)
    return
  }

  console.log(`[ac] upserting contact email=${email} lists=[${listNames.join(', ')}]`)
  await upsertAndSubscribe(email, name, listNames)
  console.log(`[ac] sync complete for email=${email}`)
}

/** Map a form submission to ActiveCampaign using ac-settings list mappings. */
export async function syncActiveCampaignForSubmission(
  formType: string,
  data: Record<string, unknown>,
  payload: Payload,
): Promise<void> {
  const str = (v: unknown) => String(v ?? '')

  switch (formType) {
    case 'newsletter-signup':
      await addContactForForm(str(data.email), str(data.name), 'newsletter-signup', payload)
      break

    case 'savings-challenge':
      await addContactForForm(str(data.email), str(data.name), 'savings-challenge', payload)
      break

    case 'bitcoin-for-her': {
      const email = str(data.email)
      const name = str(data.name)
      await addContactForForm(email, name, 'bitcoin-for-her', payload)
      if (data.newsletterConsent) {
        await addContactForForm(email, name, 'newsletter-signup', payload)
      }
      break
    }

    case 'map-location': {
      const email = str(data.email)
      if (data.newsletter && email) {
        await addContactForForm(email, str(data.merchantName), 'map-location', payload)
      }
      break
    }

    case 'final-quiz-passed':
      if (data.email) {
        await addContactForForm(str(data.email), '', 'final-quiz-passed', payload)
      }
      break

    case 'final-quiz-failed':
      if (data.email) {
        await addContactForForm(str(data.email), '', 'final-quiz-failed', payload)
      }
      break

    case 'graduate-programme':
      if (data.email) {
        await addContactForForm(str(data.email), str(data.name ?? ''), 'graduate-programme', payload)
      }
      break

    case 'partnership-inquiry':
      if (data.email) {
        await addContactForForm(
          str(data.email),
          str(data.contactName ?? data.name ?? ''),
          'education-partnership',
          payload,
        )
      }
      break

    case 'job-application-signup':
      await addContactForForm(str(data.email), str(data.name), 'job-application-signup', payload)
      break

    case 'places-earn':
      if (data.newsletter && data.contactEmail) {
        await addContactForForm(str(data.contactEmail), str(data.companyName), 'places-earn', payload)
      }
      break

    case 'places-spend':
      if (data.newsletter && data.contactEmail) {
        await addContactForForm(str(data.contactEmail), str(data.merchantName), 'places-spend', payload)
      }
      break

    default:
      break
  }
}

/** Sync course signup to the English or French AC list mapping. */
export async function syncActiveCampaignForCourseSignup(
  email: string | null | undefined,
  name: string,
  courseLang: string,
  payload: Payload,
): Promise<void> {
  if (!email) return
  const slug = courseLang === 'French' ? 'course-signup-french' : 'course-signup-english'
  await addContactForForm(email, name, slug, payload)
}

/** Get subscriber count for an AC list by its exact name. */
export async function getListCount(listName: string): Promise<number> {
  if (!AC_URL || !AC_KEY) return 0
  const listId = await getListIdByName(listName)
  if (!listId) return 0
  const data = await acFetch(`/lists/${listId}`)
  return Number(data?.list?.subscriber_count ?? 0)
}

/** Return all active lists from AC (used by admin "Fetch Lists" helper). */
export async function getAllLists(): Promise<Array<{ id: string; name: string; subscriberCount: string }>> {
  const data = await acFetch('/lists?limit=100&filters[status]=1')
  return (data?.lists ?? []).map((l: any) => ({
    id: l.id,
    name: l.name,
    subscriberCount: String(l.subscriber_count ?? 0),
  }))
}
