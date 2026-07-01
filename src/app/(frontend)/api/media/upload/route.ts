import config from '@payload-config'
import { getPayload } from 'payload'
import { NextRequest, NextResponse } from 'next/server'

const MAX_FILE_SIZE = 1048576

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
])

const ALLOWED_EXTENSIONS = /\.(jpe?g|png|gif|webp|pdf)$/i

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) {
      return NextResponse.json({ message: 'No file provided' }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ message: 'File size must be under 1MB' }, { status: 400 })
    }

    if (!ALLOWED_MIME_TYPES.has(file.type) && !ALLOWED_EXTENSIONS.test(file.name)) {
      return NextResponse.json({ message: 'File type not allowed' }, { status: 400 })
    }

    const payload = await getPayload({ config })
    const buffer = Buffer.from(await file.arrayBuffer())

    const media = await payload.create({
      collection: 'media',
      data: {
        alt: file.name,
      },
      file: {
        data: buffer,
        mimetype: file.type || 'application/octet-stream',
        name: file.name,
        size: file.size,
      },
      overrideAccess: true,
    })

    return NextResponse.json({ id: media.id, url: (media as { url?: string }).url ?? null })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Upload failed'
    if (message.includes('1MB')) {
      return NextResponse.json({ message: 'File size must be under 1MB' }, { status: 400 })
    }
    console.error('[media/upload]', err)
    return NextResponse.json({ message: 'Upload failed' }, { status: 500 })
  }
}
