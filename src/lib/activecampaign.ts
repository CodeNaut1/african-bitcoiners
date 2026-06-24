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
  if (!email) return

  const listNames: string[] = []

  try {
    const settings = await (payload.findGlobal as any)({ slug: 'ac-settings', overrideAccess: true })
    const mappings: Array<{ formSlug: string; listName: string; enabled: boolean }> =
      settings?.listMappings ?? []

    // Form-specific list
    const match = mappings.find((m) => m.formSlug === formSlug && m.enabled)
    if (match?.listName) listNames.push(match.listName)

    // Master list (added for every contact regardless of form)
    const master = mappings.find((m) => m.formSlug === 'master' && m.enabled)
    if (master?.listName && master.listName !== (match?.listName ?? '')) {
      listNames.push(master.listName)
    }
  } catch (err) {
    console.warn('[ac] Failed to read ac-settings global:', (err as Error).message)
  }

  if (listNames.length === 0) {
    console.log(`[ac] No enabled mapping found for formSlug="${formSlug}" — skipping AC sync`)
    return
  }

  await upsertAndSubscribe(email, name, listNames)
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
