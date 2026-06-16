import { NextResponse } from 'next/server'
import { getSiteSetting, saveSiteSetting } from '@/lib/admin/store'
import { MENU_PAGE_VISIBLE_KEY, parseMenuPageVisible } from '@/lib/site/nav'

export async function GET() {
  const value = await getSiteSetting(MENU_PAGE_VISIBLE_KEY, 'false')
  return NextResponse.json({ menuPageVisible: parseMenuPageVisible(value) })
}

export async function PATCH(request: Request) {
  const body = (await request.json()) as { menuPageVisible?: boolean }

  if (typeof body.menuPageVisible !== 'boolean') {
    return NextResponse.json({ error: 'menuPageVisible is verplicht' }, { status: 400 })
  }

  await saveSiteSetting(MENU_PAGE_VISIBLE_KEY, body.menuPageVisible ? 'true' : 'false')

  return NextResponse.json({ menuPageVisible: body.menuPageVisible })
}
