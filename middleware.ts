import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  ADMIN_SESSION_COOKIE,
  createSessionToken,
  isValidSessionToken,
} from '@/lib/admin/auth'

const PUBLIC_ADMIN_PATHS = ['/admin/login']

function isProtectedAdminPath(pathname: string) {
  if (pathname.startsWith('/api/admin')) {
    return !pathname.startsWith('/api/admin/auth')
  }
  if (pathname.startsWith('/admin')) {
    return !PUBLIC_ADMIN_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))
  }
  return false
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (!isProtectedAdminPath(pathname)) {
    return NextResponse.next()
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
  if (isValidSessionToken(token)) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/api/admin')) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
  }

  const loginUrl = new URL('/admin/login', request.url)
  loginUrl.searchParams.set('from', pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
