import { cookies } from 'next/headers'

export const ADMIN_SESSION_COOKIE = 'fj_admin_session'

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? 'foodjutters-admin'
}

export function verifyAdminPassword(password: string): boolean {
  const expected = getAdminPassword()
  if (password.length !== expected.length) return false
  let mismatch = 0
  for (let i = 0; i < expected.length; i++) {
    mismatch |= password.charCodeAt(i) ^ expected.charCodeAt(i)
  }
  return mismatch === 0
}

export function createSessionToken(): string {
  const secret = process.env.ADMIN_SESSION_SECRET ?? getAdminPassword()
  return Buffer.from(`fj:${secret}`).toString('base64url')
}

export function isValidSessionToken(token: string | undefined): boolean {
  if (!token) return false
  return token === createSessionToken()
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value
  return isValidSessionToken(token)
}
