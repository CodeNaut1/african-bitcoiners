/**
 * Pre-launch QA checks (STEP 25).
 *
 * Static checks (always run):
 *   pnpm qa
 *
 * HTTP smoke tests against a running server:
 *   QA_BASE_URL=https://staging.bitcoiners.africa pnpm qa
 *   QA_BASE_URL=http://localhost:3000 pnpm qa
 */

import fs from 'fs'
import path from 'path'

const ROOT = process.cwd()
const BASE_URL = (process.env.QA_BASE_URL ?? '').replace(/\/$/, '')

const REQUIRED_ENV = [
  'DATABASE_URI',
  'PAYLOAD_SECRET',
  'NEXT_PUBLIC_SERVER_URL',
]

const PRODUCTION_ENV = [
  'STORAGE_ADAPTER',
  'R2_ACCOUNT_ID',
  'R2_ACCESS_KEY_ID',
  'R2_SECRET_ACCESS_KEY',
  'R2_BUCKET',
  'R2_PUBLIC_URL',
  'ACTIVECAMPAIGN_API_URL',
  'ACTIVECAMPAIGN_API_KEY',
  'NEXT_PUBLIC_GTM_ID',
]

const SMOKE_PATHS = [
  '/',
  '/learn-bitcoin',
  '/learn-bitcoin/free-bitcoin-course',
  '/academie-bitcoin-afrique',
  '/bitcoin-newsletter',
  '/faqs',
  '/about-us/support-us',
  '/sitemap.xml',
  '/robots.txt',
  '/pages-sitemap.xml',
  '/posts-sitemap.xml',
  '/admin',
]

const REDIRECT_SAMPLES = [
  '/free-bitcoin-for-beginners-course/',
  '/bitcoiner-jobs/',
]

type Result = { name: string; ok: boolean; detail: string }

const results: Result[] = []

function pass(name: string, detail: string) {
  results.push({ name, ok: true, detail })
  console.log(`  ✓ ${name}: ${detail}`)
}

function fail(name: string, detail: string) {
  results.push({ name, ok: false, detail })
  console.log(`  ✗ ${name}: ${detail}`)
}

function checkRedirectsFile() {
  const jsonPath = path.join(ROOT, 'scripts/exports/redirects.json')
  if (!fs.existsSync(jsonPath)) {
    fail('redirects.json', 'missing — run pnpm redirects:generate')
    return
  }
  const redirects = JSON.parse(fs.readFileSync(jsonPath, 'utf-8')) as unknown[]
  if (!Array.isArray(redirects) || redirects.length < 50) {
    fail('redirects.json', `expected 50+ redirects, got ${Array.isArray(redirects) ? redirects.length : 0}`)
    return
  }
  pass('redirects.json', `${redirects.length} redirects loaded`)
}

function checkExports() {
  const pages = path.join(ROOT, 'scripts/exports/pages.json')
  const posts = path.join(ROOT, 'scripts/exports/posts.json')
  if (fs.existsSync(pages)) {
    const data = JSON.parse(fs.readFileSync(pages, 'utf-8')) as unknown[]
    pass('pages export', `${data.length} pages in scripts/exports/pages.json`)
  } else {
    fail('pages export', 'scripts/exports/pages.json missing')
  }
  if (fs.existsSync(posts)) {
    const data = JSON.parse(fs.readFileSync(posts, 'utf-8')) as unknown[]
    pass('posts export', `${data.length} posts in scripts/exports/posts.json`)
  } else {
    fail('posts export', 'scripts/exports/posts.json missing')
  }
}

function checkEnv() {
  for (const key of REQUIRED_ENV) {
    if (process.env[key]) pass(`env:${key}`, 'set')
    else fail(`env:${key}`, 'missing')
  }

  const strict = Boolean(BASE_URL) || process.env.QA_STRICT === 'true'
  if (!strict) {
    pass('production env', 'skipped (set QA_BASE_URL or QA_STRICT=true for full check)')
    return
  }

  for (const key of PRODUCTION_ENV) {
    if (process.env[key]) pass(`env:${key}`, 'set')
    else fail(`env:${key}`, 'missing (required for production)')
  }
}

async function fetchStatus(url: string): Promise<{ status: number; location?: string }> {
  const res = await fetch(url, { redirect: 'manual' })
  return { status: res.status, location: res.headers.get('location') ?? undefined }
}

async function checkHttp() {
  if (!BASE_URL) {
    console.log('\n  (Skipping HTTP checks — set QA_BASE_URL to run smoke tests)\n')
    return
  }

  console.log(`\n  HTTP smoke tests against ${BASE_URL}\n`)

  for (const p of SMOKE_PATHS) {
    try {
      const { status } = await fetchStatus(`${BASE_URL}${p}`)
      if (status >= 200 && status < 400) {
        pass(`GET ${p}`, String(status))
      } else {
        fail(`GET ${p}`, `status ${status}`)
      }
    } catch (err) {
      fail(`GET ${p}`, err instanceof Error ? err.message : String(err))
    }
  }

  for (const p of REDIRECT_SAMPLES) {
    try {
      const { status, location } = await fetchStatus(`${BASE_URL}${p}`)
      if (status === 301 || status === 308 || status === 307) {
        pass(`REDIRECT ${p}`, `${status} → ${location ?? '?'}`)
      } else {
        fail(`REDIRECT ${p}`, `expected 301/308, got ${status}`)
      }
    } catch (err) {
      fail(`REDIRECT ${p}`, err instanceof Error ? err.message : String(err))
    }
  }
}

async function main() {
  console.log('\nPre-launch QA Check\n')

  console.log('Static checks:')
  checkRedirectsFile()
  checkExports()
  checkEnv()

  await checkHttp()

  const failed = results.filter((r) => !r.ok)
  console.log(`\n─────────────────────────────────────────`)
  console.log(`Passed: ${results.length - failed.length}/${results.length}`)
  if (failed.length > 0) {
    console.log(`Failed: ${failed.length}`)
    failed.forEach((f) => console.log(`  - ${f.name}: ${f.detail}`))
    process.exit(1)
  }
  console.log('All checks passed.\n')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
