import { NextRequest, NextResponse } from 'next/server'

const STATIC_EXTENSIONS = /\.(?:js|css|png|jpg|jpeg|svg|webp|ico|woff|woff2)$/i

function shouldBypassMaintenance(pathname: string): boolean {
  return (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname === '/maintenance' ||
    pathname.startsWith('/maintenance/') ||
    pathname === '/sitemap.xml' ||
    STATIC_EXTENSIONS.test(pathname)
  )
}

function maintenancePageResponse(): NextResponse {
  return NextResponse.next({
    status: 503,
    headers: {
      'Retry-After': '3600',
    },
  })
}

async function fetchMaintenanceMode(): Promise<boolean> {
  console.log('[middleware] checking maintenance mode...')

  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const res = await fetch(`${siteUrl}/api/globals/site-settings`, {
    next: { revalidate: 10 },
    headers: {
      Accept: 'application/json',
    },
  })

  if (!res.ok) return false

  const data = (await res.json()) as { maintenanceMode?: boolean }
  console.log('[middleware] maintenance mode is:', data.maintenanceMode)
  return Boolean(data.maintenanceMode)
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/maintenance' || pathname.startsWith('/maintenance/')) {
    return maintenancePageResponse()
  }

  if (shouldBypassMaintenance(pathname)) {
    return NextResponse.next()
  }

  try {
    const maintenanceMode = await fetchMaintenanceMode()

    if (!maintenanceMode) {
      return NextResponse.next()
    }

    return NextResponse.rewrite(new URL('/maintenance', request.url), { status: 503 })
  } catch (error) {
    console.error('[middleware] failed to check maintenance:', error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2)$).*)',
  ],
}
