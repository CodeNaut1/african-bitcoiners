/**
 * Seeds the inflation-simulator-data global from WP plugin source values.
 *
 * Run: pnpm seed:inflation
 *
 * IMPORTANT: The first time you add this global, set `push: true` in payload.config.ts,
 * restart the dev server so Payload creates the DB tables, run this script, then set
 * `push: false` again.
 */
import { getPayload } from 'payload'

import config from '@/payload.config'
import { seedInflationSimulatorData, SEED_BITCOIN_PRICES, SEED_CURRENCIES } from '@/lib/inflation-simulator-seed-data'

async function main() {
  const payload = await getPayload({ config })

  await seedInflationSimulatorData(payload)

  payload.logger.info(
    `✓ Inflation simulator data seeded (${SEED_CURRENCIES.length} currencies, ${SEED_BITCOIN_PRICES.length} Bitcoin price years)`,
  )

  await payload.db.destroy?.()
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
