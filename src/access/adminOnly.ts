import type { AccessArgs } from 'payload'

export const adminOnly = ({ req: { user } }: AccessArgs): boolean => {
  return (user as any)?.role === 'admin'
}
