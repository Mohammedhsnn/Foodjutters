import { NextResponse } from 'next/server'
import { getContentPagesSummary } from '@/lib/admin/store'

export async function GET() {
  const pages = await getContentPagesSummary()
  return NextResponse.json({ pages })
}
