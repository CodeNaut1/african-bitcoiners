import { getPayload } from 'payload'
import config from '@/payload.config'
import { seedFormSettings } from './seed-form-settings'

async function main() {
  const payload = await getPayload({ config })
  await seedFormSettings(payload)
  payload.logger.info('Form settings seed complete.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
