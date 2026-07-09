import { getPayload } from 'payload'
import config from '@payload-config'
import type { NextRequest } from 'next/server'
import type { Payload } from 'payload'
import type { User } from '@/payload-types'

type AdminOrEditorAuthResult =
  | { payload: Payload; user: User; error: null }
  | { payload: null; user: null; error: 'Forbidden' | 'Unauthorized' }

function isAdminOrEditor(user: User): boolean {
  return user.role === 'admin' || user.role === 'editor'
}

export async function requireAdminOrEditor(req: NextRequest): Promise<AdminOrEditorAuthResult> {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: req.headers })

  if (!user) {
    return { payload: null, user: null, error: 'Unauthorized' }
  }

  if (!isAdminOrEditor(user as User)) {
    return { payload: null, user: null, error: 'Forbidden' }
  }

  return { payload, user: user as User, error: null }
}
