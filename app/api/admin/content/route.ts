import { NextResponse } from 'next/server'
import { getContentPages } from '@/lib/admin/store'

export async function GET() {
  const pages = await getContentPages()
  return NextResponse.json({ pages })
}
