import { NextResponse } from 'next/server'
import {
  ADMIN_SESSION_COOKIE,
  createSessionToken,
  verifyAdminPassword,
} from '@/lib/admin/auth'

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string }
  const password = body.password ?? ''

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: 'Onjuist wachtwoord' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
  return response
}
