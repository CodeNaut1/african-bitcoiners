import { getPayload } from 'payload'
import config from '@/payload.config'

const rawPublicUrl = process.env.R2_PUBLIC_URL

if (!rawPublicUrl) {
  console.error('Missing R2_PUBLIC_URL in .env')
  process.exit(1)
}

// Normalise: strip trailing slash so we always append "/uploads/" cleanly
const R2_BASE = rawPublicUrl.replace(/\/+$/, '')
const R2_UPLOADS = `${R2_BASE}/uploads/`

const WP_PATTERNS = [
  'https://bitcoiners.africa/wp-content/uploads/',
  'http://bitcoiners.africa/wp-content/uploads/',
  '/wp-content/uploads/',
]

function rewriteUrls(html: string): string {
  let result = html
  for (const pattern of WP_PATTERNS) {
    result = result.replaceAll(pattern, R2_UPLOADS)
  }
  return result
}

async function run() {
  const payload = await getPayload({ config })
  const pool = (payload.db as any).pool as {
    query: (sql: string, params?: unknown[]) => Promise<{ rows: any[]; rowCount: number }>
  }

  // ── Page blocks (pages_blocks_rich_content.raw_html) ───────────────────────
  const { rows: blockRows } = await pool.query(`
    SELECT id, raw_html
    FROM pages_blocks_rich_content
    WHERE raw_html IS NOT NULL
      AND (
        raw_html LIKE '%bitcoiners.africa/wp-content/uploads/%'
        OR raw_html LIKE '%/wp-content/uploads/%'
      )
  `)

  let pageBlocksUpdated = 0
  for (const row of blockRows) {
    const rewritten = rewriteUrls(row.raw_html as string)
    if (rewritten === row.raw_html) continue

    await pool.query(
      'UPDATE pages_blocks_rich_content SET raw_html = $1 WHERE id = $2',
      [rewritten, row.id],
    )
    pageBlocksUpdated++
  }

  // ── Posts (rawHtml is a top-level field on the post document) ──────────────
  const allPosts = await payload.find({
    collection: 'posts',
    limit: 2000,
    pagination: false,
    depth: 0,
    overrideAccess: true,
    select: { id: true, rawHtml: true } as any,
  })

  let postsUpdated = 0
  for (const post of allPosts.docs) {
    const raw = (post as any).rawHtml as string | null | undefined
    if (!raw) continue

    const rewritten = rewriteUrls(raw)
    if (rewritten === raw) continue

    await (payload.update as any)({
      collection: 'posts',
      id: post.id,
      data: { rawHtml: rewritten },
      overrideAccess: true,
      context: { disableRevalidate: true },
    })
    postsUpdated++
  }

  console.log(`Updated ${pageBlocksUpdated} page blocks, ${postsUpdated} posts`)

  await payload.db.destroy?.()
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
