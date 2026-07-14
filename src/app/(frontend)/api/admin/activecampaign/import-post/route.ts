import { NextRequest, NextResponse } from 'next/server'
import { requireAdminOrEditor } from '@/lib/admin-auth'
import { cleanupActiveCampaignHtml } from '@/lib/activecampaign/cleanup-html'
import { rewriteActiveCampaignImageUrls } from '@/lib/activecampaign/import-images'

export const dynamic = 'force-dynamic'

const VALID_CATEGORIES = new Set(['weekly-newsletter', 'saturday-stacker', 'announcement'])

type ImportPostBody = {
  title: string
  slug: string
  category: string
  publishedDate: string
  seoTitle: string
  seoDescription: string
  htmlContent: string
  status: 'published' | 'draft'
}

export async function POST(req: NextRequest) {
  const auth = await requireAdminOrEditor(req)
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.error === 'Forbidden' ? 403 : 401 })
  }

  try {
    const body = (await req.json()) as ImportPostBody
    const { title, slug, category, publishedDate, seoTitle, seoDescription, htmlContent, status } = body

    if (!title?.trim() || !slug?.trim()) {
      return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 })
    }

    if (!VALID_CATEGORIES.has(category)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
    }

    if (status !== 'published' && status !== 'draft') {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const existing = await auth.payload.find({
      collection: 'posts',
      where: { slug: { equals: slug.trim() } },
      limit: 1,
      overrideAccess: true,
    })

    if (existing.docs.length > 0) {
      return NextResponse.json({ error: `A post with slug "${slug}" already exists` }, { status: 409 })
    }

    let cleanedHtml = cleanupActiveCampaignHtml(htmlContent || '')
    cleanedHtml = await rewriteActiveCampaignImageUrls(cleanedHtml, auth.payload)

    const post = await auth.payload.create({
      collection: 'posts',
      data: {
        title: title.trim(),
        slug: slug.trim(),
        category: category as 'weekly-newsletter' | 'saturday-stacker' | 'announcement',
        publishedDate: publishedDate ? new Date(publishedDate).toISOString() : new Date().toISOString(),
        rawHtml: cleanedHtml,
        meta: {
          title: seoTitle?.trim() || title.trim(),
          description: seoDescription?.trim() || '',
        },
        _status: status,
      } as any,
      overrideAccess: true,
    })

    return NextResponse.json({
      ok: true,
      postId: post.id,
      slug: post.slug,
    })
  } catch (err) {
    console.error('[ac/import-post]', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to create post' },
      { status: 500 },
    )
  }
}
