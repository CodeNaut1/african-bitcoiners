import type { Payload } from 'payload'

type LogEntry = {
  timestamp: string
  action: string
  collection?: string
  details: string
  user?: string
}

export async function logAdminOperation(
  payload: Payload,
  entry: Omit<LogEntry, 'timestamp'>,
): Promise<void> {
  try {
    const existing = await payload.findGlobal({
      slug: 'admin-ops-log',
      depth: 0,
      overrideAccess: true,
    })

    const entries = ((existing as { entries?: LogEntry[] })?.entries ?? []).slice(0, 99)
    const next: LogEntry = {
      ...entry,
      timestamp: new Date().toISOString(),
    }

    await payload.updateGlobal({
      slug: 'admin-ops-log',
      data: { entries: [next, ...entries] },
      overrideAccess: true,
    })
  } catch {
    // Non-fatal — logging should not block admin operations
  }
}
