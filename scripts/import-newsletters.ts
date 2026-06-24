/**
 * import-newsletters.ts
 *
 * Imports WP newsletter posts from scripts/exports/posts.json into the
 * Payload Posts collection.
 *
 * - Category "Bitcoin Newsletter" → category: "weekly-newsletter"
 * - Category "Saturday Stacker"  → category: "saturday-stacker"
 * - Preserves published dates
 * - Replaces WP media URLs with local/R2 URLs from url-mapping.json
 * - Skips posts that already exist (by slug) unless --force is passed
 *
 * Usage: pnpm import:newsletters
 *        pnpm import:newsletters --force     (re-import all posts)
 *        pnpm import:newsletters --dry-run   (print what would happen)
 *        pnpm import:newsletters --since=2025-01-01  (only posts after date)
 */

import { getPayload } from 'payload'
import config from '@/payload.config'
import fs from 'fs'
import path from 'path'

const EXPORT_DIR = path.join(import.meta.dirname, 'exports')
const POSTS_FILE = path.join(EXPORT_DIR, 'posts.json')
const URL_MAP_FILE = path.join(EXPORT_DIR, 'url-mapping.json')

const args = process.argv.slice(2)
const FORCE = args.includes('--force')
const DRY_RUN = args.includes('--dry-run')
const sinceArg = args.find((a) => a.startsWith('--since='))
const SINCE = sinceArg ? new Date(sinceArg.split('=')[1]) : null

interface WPPost {
  postId: number
  title: string
  slug: string
  status: string
  postDate: string
  postModified: string
  content: string
  excerpt: string
  categories: string[]
  meta: Record<string, string>
}

function mapCategory(categories: string[]): 'weekly-newsletter' | 'saturday-stacker' | 'announcement' {
  if (categories.includes('Saturday Stacker')) return 'saturday-stacker'
  return 'weekly-newsletter'
}

function replaceImageUrls(html: string, urlMap: Record<string, string>): string {
  let result = html
  for (const [old, newUrl] of Object.entries(urlMap)) {
    result = result.split(old).join(newUrl)
  }
  return result
}


async function main() {
  if (!fs.existsSync(POSTS_FILE)) {
    console.error(`posts.json not found. Run pnpm export:wp first.`)
    process.exit(1)
  }

  const urlMap: Record<string, string> = fs.existsSync(URL_MAP_FILE)
    ? JSON.parse(fs.readFileSync(URL_MAP_FILE, 'utf-8'))
    : {}

  const wpPosts: WPPost[] = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'))
  console.log(`Loaded ${wpPosts.length} WP newsletter posts`)

  // Filter by date if --since is provided
  const filteredPosts = SINCE
    ? wpPosts.filter((p) => new Date(p.postDate) >= SINCE!)
    : wpPosts

  if (SINCE) console.log(`Filtering to posts since ${SINCE.toISOString().slice(0, 10)}: ${filteredPosts.length} posts`)

  const payload = await getPayload({ config })

  // Load existing slugs to detect duplicates
  const existingPosts = await payload.find({
    collection: 'posts',
    limit: 5000,
    pagination: false,
    select: { slug: true, id: true },
  })
  const existingSlugToId: Record<string, string | number> = {}
  for (const p of existingPosts.docs) {
    if (p.slug) existingSlugToId[p.slug] = p.id
  }

  let created = 0
  let updated = 0
  let skipped = 0
  const failures: Array<{ slug: string; title: string; error: string }> = []

  for (const wpPost of filteredPosts) {
    const { slug, title, content, excerpt, categories, meta, postDate } = wpPost

    if (!slug) {
      skipped++
      continue
    }

    try {
      const html = replaceImageUrls(content || '', urlMap)
      const category = mapCategory(categories)
      const seoTitle = meta['_yoast_wpseo_title'] || ''
      const seoDesc = meta['_yoast_wpseo_metadesc'] || excerpt || ''
      const publishedDate = postDate ? new Date(postDate).toISOString() : new Date().toISOString()

      if (existingSlugToId[slug]) {
        if (!FORCE) {
          skipped++
          continue
        }

        if (DRY_RUN) {
          console.log(`  [dry-run] Would update: ${slug}`)
          updated++
          continue
        }

        await payload.update({
          collection: 'posts',
          id: existingSlugToId[slug],
          data: {
            title,
            slug,
            category,
            publishedDate,
            excerpt: excerpt || '',
            rawHtml: html,
            meta: { title: seoTitle || title, description: seoDesc },
            _status: 'published',
          } as any,
        })
        updated++
      } else {
        if (DRY_RUN) {
          console.log(`  [dry-run] Would create: ${slug} (${category})`)
          created++
          continue
        }

        await payload.create({
          collection: 'posts',
          data: {
            title,
            slug,
            category,
            publishedDate,
            excerpt: excerpt || '',
            rawHtml: html,
            meta: { title: seoTitle || title, description: seoDesc },
            _status: 'published',
          } as any,
        })
        existingSlugToId[slug] = slug
        created++
      }
    } catch (err: any) {
      const message = err?.message ?? String(err)
      failures.push({ slug, title, error: message })
      console.error(`  ✗  FAILED ${slug}: ${message.slice(0, 120)}`)
    }

    if ((created + updated) % 25 === 0 && created + updated > 0) {
      process.stdout.write(`  ${created + updated} done...\r`)
    }
  }

  console.log(`\n─────────────────────────────────────────`)
  console.log(`✅ Created: ${created}  Updated: ${updated}  Skipped: ${skipped}  Failed: ${failures.length}`)
  if (failures.length > 0) {
    console.log(`\nFailed posts:`)
    for (const f of failures) {
      console.log(`  • ${f.slug}`)
      console.log(`    ${f.error.slice(0, 200)}`)
    }
  }

  process.exit(failures.length > 0 ? 1 : 0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
