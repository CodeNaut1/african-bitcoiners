// Script to push Drizzle schema to the database
// Run with: NODE_ENV=development PAYLOAD_FORCE_DRIZZLE_PUSH=true tsx scripts/push-schema.ts

import { getPayload } from 'payload'
import configPromise from '@payload-config'

process.env.PAYLOAD_FORCE_DRIZZLE_PUSH = 'true'

const payload = await getPayload({ config: configPromise })
payload.logger.info('Schema push complete')
await payload.db.destroy?.()
process.exit(0)
