/**
 * Launch pre-cutover checklist (STEP 26).
 *
 * Run the day before DNS cutover:
 *   pnpm launch:precheck
 *   pnpm launch:precheck -- --since=2026-06-01
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const args = process.argv.slice(2)
const sinceArg = args.find((a) => a.startsWith('--since='))
const SINCE = sinceArg?.split('=')[1]

const checks: Array<{ label: string; ok: boolean; detail: string }> = []

function record(label: string, ok: boolean, detail: string) {
  checks.push({ label, ok, detail })
  console.log(`${ok ? '✓' : '✗'} ${label}: ${detail}`)
}

function main() {
  console.log('\nLaunch Pre-Cutover Checklist\n')

  const redirectsPath = path.join(process.cwd(), 'scripts/exports/redirects.json')
  if (fs.existsSync(redirectsPath)) {
    const redirects = JSON.parse(fs.readFileSync(redirectsPath, 'utf-8')) as unknown[]
    record('301 redirects file', Array.isArray(redirects) && redirects.length > 0, `${redirects.length} redirects ready`)
  } else {
    record('301 redirects file', false, 'run pnpm redirects:generate')
  }

  const postsPath = path.join(process.cwd(), 'scripts/exports/posts.json')
  if (fs.existsSync(postsPath)) {
    const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8')) as Array<{ date?: string }>
    record('Newsletter export baseline', posts.length >= 200, `${posts.length} posts in export`)
  } else {
    record('Newsletter export baseline', false, 'run pnpm export:wp')
  }

  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? ''
  record(
    'Production URL configured',
    siteUrl.startsWith('https://'),
    siteUrl || 'set NEXT_PUBLIC_SERVER_URL to https://bitcoiners.africa before cutover',
  )

  record(
    'BTCPay/Blink webhook target',
    siteUrl.includes('bitcoiners.africa') || siteUrl.includes('onrender.com'),
    `Update webhooks to ${siteUrl || '<production-url>'}/api/webhooks/blink after deploy`,
  )

  record(
    'Schema push disabled',
    process.env.PAYLOAD_PUSH !== 'true',
    process.env.PAYLOAD_PUSH === 'true' ? 'set PAYLOAD_PUSH=false in production' : 'PAYLOAD_PUSH is not true',
  )

  console.log('\nManual steps (cannot be automated):')
  console.log('  □ Full WordPress backup via hosting provider')
  console.log('  □ Inform team of content freeze window')
  console.log('  □ Schedule DNS cutover for low-traffic window (early morning UTC)')
  console.log('  □ Cloudflare DNS: point bitcoiners.africa to Render')
  console.log('  □ Verify Render custom domain + SSL certificate')

  if (SINCE) {
    console.log(`\nSyncing new newsletter posts since ${SINCE}...`)
    try {
      execSync(`pnpm import:newsletters -- --since=${SINCE}`, { stdio: 'inherit' })
      record('Newsletter delta import', true, `imported posts since ${SINCE}`)
    } catch {
      record('Newsletter delta import', false, `pnpm import:newsletters --since=${SINCE} failed`)
    }
  } else {
    console.log('\nTip: run with --since=YYYY-MM-DD to import only new WP posts before cutover')
  }

  const failed = checks.filter((c) => !c.ok)
  console.log(`\n─────────────────────────────────────────`)
  console.log(`Automated checks: ${checks.length - failed.length}/${checks.length} passed`)
  if (failed.length > 0) process.exit(1)
}

main()
