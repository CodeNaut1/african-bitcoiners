import { NextRequest, NextResponse } from 'next/server'

function shouldBypassMaintenance(pathname: string): boolean {
  return (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next')
  )
}

async function fetchMaintenanceMode(request: NextRequest): Promise<boolean> {
  try {
    const url = new URL('/api/globals/site-settings', request.url)
    const res = await fetch(url, {
      cache: 'no-store',
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

  if (shouldBypassMaintenance(pathname)) {
    return NextResponse.next()
  }

  const maintenanceMode = await fetchMaintenanceMode(request)

  if (!maintenanceMode) {
    return NextResponse.next()
  }

  return NextResponse.next({
    status: 503,
    headers: {
      'Retry-After': '3600',
    },
  })
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2)$).*)',
  ],
}
