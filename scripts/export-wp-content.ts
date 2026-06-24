/**
 * export-wp-content.ts
 *
 * Parses the WordPress WXR export file at scripts/exports/wordpress-export.xml
 * and writes three JSON files:
 *   - scripts/exports/pages.json       → all WP pages (published)
 *   - scripts/exports/posts.json       → all WP newsletter posts (published)
 *   - scripts/exports/media.json       → all WP attachments (media library)
 *
 * Usage: pnpm export:wp
 */

import fs from 'fs'
import path from 'path'

const EXPORT_DIR = path.join(import.meta.dirname, 'exports')
const XML_FILE = path.join(EXPORT_DIR, 'wordpress-export.xml')

export interface WPItem {
  postId: number
  title: string
  slug: string
  link: string
  status: string
  postType: string
  postDate: string
  postModified: string
  parentId: number
  content: string
  excerpt: string
  attachmentUrl: string
  categories: string[]
  meta: Record<string, string>
}

function extractCDATA(block: string, tag: string): string {
  const regex = new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`)
  const m = block.match(regex)
  if (m) return m[1]
  const m2 = block.match(new RegExp(`<${tag}>([^<]*)<\\/${tag}>`))
  return m2 ? m2[1].trim() : ''
}

function extractPlain(block: string, tag: string): string {
  const m = block.match(new RegExp(`<${tag}>([^<]*)<\\/${tag}>`))
  return m ? m[1].trim() : ''
}

function extractAllMeta(block: string): Record<string, string> {
  const meta: Record<string, string> = {}
  const metaRegex = /<wp:postmeta>([\s\S]*?)<\/wp:postmeta>/g
  let m: RegExpExecArray | null
  while ((m = metaRegex.exec(block)) !== null) {
    const inner = m[1]
    const keyMatch = inner.match(/<wp:meta_key><!\[CDATA\[(.*?)\]\]><\/wp:meta_key>/)
    const valMatch = inner.match(/<wp:meta_value><!\[CDATA\[([\s\S]*?)\]\]><\/wp:meta_value>/)
    if (keyMatch && valMatch) {
      // Only store a limited set of useful meta keys to keep output size manageable
      const key = keyMatch[1]
      if (
        key.startsWith('_yoast_wpseo') ||
        key === '_thumbnail_id' ||
        key === '_wp_attached_file'
      ) {
        meta[key] = valMatch[1]
      }
    }
  }
  return meta
}

function parseItem(block: string): WPItem {
  const meta = extractAllMeta(block)

  const cats: string[] = []
  const catRegex = /<category domain="category"[^>]*><!\[CDATA\[(.*?)\]\]><\/category>/g
  let cm: RegExpExecArray | null
  while ((cm = catRegex.exec(block)) !== null) cats.push(cm[1])

  return {
    postId: parseInt(extractPlain(block, 'wp:post_id') || '0', 10),
    title: extractCDATA(block, 'title'),
    slug: extractCDATA(block, 'wp:post_name'),
    link: extractPlain(block, 'link'),
    status: extractCDATA(block, 'wp:status'),
    postType: extractCDATA(block, 'wp:post_type'),
    postDate: extractCDATA(block, 'wp:post_date'),
    postModified: extractCDATA(block, 'wp:post_modified'),
    parentId: parseInt(extractPlain(block, 'wp:post_parent') || '0', 10),
    content: extractCDATA(block, 'content:encoded'),
    excerpt: extractCDATA(block, 'excerpt:encoded'),
    attachmentUrl: extractCDATA(block, 'wp:attachment_url'),
    categories: cats,
    meta,
  }
}

function parseWXR(filePath: string): WPItem[] {
  console.log(`Reading ${filePath}...`)
  const raw = fs.readFileSync(filePath, 'utf-8')
  console.log(`Parsing ${(raw.length / 1024 / 1024).toFixed(1)} MB XML...`)

  const items: WPItem[] = []
  let searchFrom = 0

  while (true) {
    const start = raw.indexOf('<item>', searchFrom)
    if (start === -1) break
    const end = raw.indexOf('</item>', start)
    if (end === -1) break
    const block = raw.slice(start, end + '</item>'.length)
    items.push(parseItem(block))
    searchFrom = end + '</item>'.length
  }

  return items
}

async function main() {
  if (!fs.existsSync(XML_FILE)) {
    console.error(`WXR file not found: ${XML_FILE}`)
    console.error('Place your WordPress export at scripts/exports/wordpress-export.xml')
    process.exit(1)
  }

  const items = parseWXR(XML_FILE)
  console.log(`Parsed ${items.length} total items`)

  const pages = items.filter((i) => i.postType === 'page' && i.status === 'publish' && i.slug)

  // Newsletter posts: category is "Bitcoin Newsletter" or "Saturday Stacker"
  const newsletterCats = new Set(['Bitcoin Newsletter', 'Saturday Stacker'])
  const posts = items.filter(
    (i) =>
      i.postType === 'post' &&
      i.status === 'publish' &&
      i.slug &&
      i.categories.some((c) => newsletterCats.has(c)),
  )

  const media = items.filter((i) => i.postType === 'attachment' && i.attachmentUrl)

  // Build a map of postId → permalink slug for parent resolution
  const slugById: Record<number, string> = {}
  for (const p of pages) slugById[p.postId] = p.slug
  // Add all items including drafts for parent lookup
  for (const i of items) {
    if (i.postType === 'page' && i.postId) slugById[i.postId] = i.slug
  }

  // Attach parent slug to each page
  const pagesWithParent = pages.map((p) => ({
    ...p,
    parentSlug: p.parentId ? (slugById[p.parentId] ?? null) : null,
  }))

  console.log(`Pages (published): ${pages.length}`)
  console.log(`Newsletter posts (published): ${posts.length}`)
  console.log(`Media items: ${media.length}`)

  fs.writeFileSync(
    path.join(EXPORT_DIR, 'pages.json'),
    JSON.stringify(pagesWithParent, null, 2),
  )
  fs.writeFileSync(path.join(EXPORT_DIR, 'posts.json'), JSON.stringify(posts, null, 2))
  fs.writeFileSync(path.join(EXPORT_DIR, 'media.json'), JSON.stringify(media, null, 2))

  console.log('✅ Exported to scripts/exports/{pages,posts,media}.json')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
