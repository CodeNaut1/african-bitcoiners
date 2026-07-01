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

async function fetchMaintenanceMode(request: NextRequest): Promise<boolean> {
  try {
    const url = new URL('/api/globals/site-settings', request.url)
    const res = await fetch(url, {
      next: { revalidate: 10 },
      headers: {
        Accept: 'application/json',
      },
    })

    if (!res.ok) return false

    const data = (await res.json()) as { maintenanceMode?: boolean }
    return Boolean(data.maintenanceMode)
  } catch {
    return false
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/maintenance' || pathname.startsWith('/maintenance/')) {
    return maintenancePageResponse()
  }

  if (shouldBypassMaintenance(pathname)) {
    return NextResponse.next()
  }

  const maintenanceMode = await fetchMaintenanceMode(request)

  if (!maintenanceMode) {
    return NextResponse.next()
  }

  return NextResponse.rewrite(new URL('/maintenance', request.url), { status: 503 })
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2)$).*)',
  ],
}
