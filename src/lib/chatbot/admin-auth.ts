import { getPayload } from 'payload'
import config from '@payload-config'
import type { NextRequest } from 'next/server'
import type { Payload } from 'payload'
import type { User } from '@/payload-types'

type AdminAuthResult =
  | { payload: Payload; user: User; error: null }
  | { payload: null; user: null; error: 'Forbidden' | 'Unauthorized' }

export async function requireAdmin(req: NextRequest): Promise<AdminAuthResult> {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: req.headers })

  if (!user) {
    return { payload: null, user: null, error: 'Unauthorized' }
  }

  if ((user as User).role !== 'admin') {
    return { payload: null, user: null, error: 'Forbidden' }
  }

  return { payload, user: user as User, error: null }
}
