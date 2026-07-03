import { getPayload } from 'payload'
import config from '@/payload.config'
import { seedSystemPages } from '@/lib/system-pages-shared'

async function main() {
  const payload = await getPayload({ config })
  const { created, updated } = await seedSystemPages(payload)
  payload.logger.info(`✓ System pages: ${created} created, ${updated} updated`)
  await payload.db.destroy?.()
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
