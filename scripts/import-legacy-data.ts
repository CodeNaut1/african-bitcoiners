/**
 * import-legacy-data.ts
 *
 * CLI script for importing legacy WordPress database exports into Payload collections.
 *
 * Usage:
 *   pnpm import:legacy -- --collection course-signups --file scripts/exports/course_signups.csv
 *   pnpm import:legacy -- --collection course-completions --file scripts/exports/course_completions.csv --format csv
 *   pnpm import:legacy -- --collection form-submissions --file scripts/exports/gravity_forms.json --format json
 *
 * Flags:
 *   --dry-run   Parse and validate but do not write to DB
 *   --force     Re-import even if record appears to exist (matched on email or certNumber)
 */

import { getPayload } from 'payload'
import config from '@/payload.config'
import fs from 'fs'
import {
  IMPORT_COLLECTIONS,
  importRowExists,
  mapImportRow,
  type ImportCollectionSlug,
} from '@/lib/legacy-import'

const args = process.argv.slice(2)
function getArg(name: string): string | undefined {
  const idx = args.indexOf(`--${name}`)
  return idx !== -1 ? args[idx + 1] : undefined
}

const COLLECTION = getArg('collection')
const FILE = getArg('file')
const FORMAT = (getArg('format') ?? 'csv') as 'csv' | 'json'
const DRY_RUN = args.includes('--dry-run')
const FORCE = args.includes('--force')

const VALID = IMPORT_COLLECTIONS.map((c) => c.slug)

if (!COLLECTION || !FILE) {
  console.error('Usage: --collection <slug> --file <path> [--format csv|json] [--dry-run] [--force]')
  console.error(`Valid collections: ${VALID.join(', ')}`)
  process.exit(1)
}

if (!VALID.includes(COLLECTION as ImportCollectionSlug)) {
  console.error(`Unknown collection: ${COLLECTION}`)
  process.exit(1)
}

if (!fs.existsSync(FILE)) {
  console.error(`File not found: ${FILE}`)
  process.exit(1)
}

function parseCsv(text: string): Record<string, string>[] {
  const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n')
  if (lines.length < 2) return []

  const headers = parseCsvLine(lines[0]!)
  const rows: Record<string, string>[] = []

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]!.trim()
    if (!line) continue
    const values = parseCsvLine(line)
    const row: Record<string, string> = {}
    headers.forEach((h, idx) => {
      row[h.trim()] = (values[idx] ?? '').trim()
    })
    rows.push(row)
  }

  return rows
}

function parseCsvLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]!
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else inQuotes = !inQuotes
    } else if (ch === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += ch
    }
  }
  result.push(current)
  return result
}

async function main() {
  console.log(`\nLegacy Data Import`)
  console.log(`  Collection : ${COLLECTION}`)
  console.log(`  File       : ${FILE}`)
  console.log(`  Format     : ${FORMAT}`)
  console.log(`  Mode       : ${DRY_RUN ? 'dry-run' : 'live'}${FORCE ? ' + force' : ''}\n`)

  const raw = fs.readFileSync(FILE!, 'utf-8')
  let rows: Record<string, unknown>[]

  if (FORMAT === 'json') {
    const parsed = JSON.parse(raw)
    rows = Array.isArray(parsed) ? parsed : [parsed]
  } else {
    rows = parseCsv(raw) as Record<string, unknown>[]
  }

  console.log(`  Parsed ${rows.length} row(s)\n`)

  if (rows.length === 0) {
    console.log('Nothing to import.')
    process.exit(0)
  }

  const payload = await getPayload({ config })

  let imported = 0
  let skipped = 0
  let failed = 0
  const errors: Array<{ row: number; error: string }> = []

  for (let i = 0; i < rows.length; i++) {
    try {
      const data = mapImportRow(COLLECTION!, rows[i]!)

      if (!FORCE) {
        const exists = await importRowExists(payload, COLLECTION!, data)
        if (exists) {
          skipped++
          continue
        }
      }

      if (DRY_RUN) {
        console.log(`  [row ${i + 1}] would import:`, JSON.stringify(data).slice(0, 120))
        imported++
        continue
      }

      await payload.create({
        collection: COLLECTION as ImportCollectionSlug,
        data: data as never,
        overrideAccess: true,
      })

      imported++
      if (imported % 50 === 0) process.stdout.write(`  Imported ${imported}/${rows.length}...\r`)
    } catch (err: unknown) {
      failed++
      const msg = err instanceof Error ? err.message : String(err)
      errors.push({ row: i + 1, error: msg })
      if (failed <= 5) console.error(`  [row ${i + 1}] ERROR: ${msg}`)
    }
  }

  console.log(`
─────────────────────────────────────────
Imported : ${imported}
Skipped  : ${skipped}
Failed   : ${failed}
`)

  if (errors.length > 0) {
    console.log('First errors:')
    errors.slice(0, 10).forEach((e) => console.log(`  row ${e.row}: ${e.error}`))
  }

  await payload.db.destroy?.()
  process.exit(failed > 0 ? 1 : 0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
