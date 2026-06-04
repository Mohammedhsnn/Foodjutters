import { NextResponse } from 'next/server'
import type { Reservation } from '@/lib/admin/types'
import {
  deleteReservation,
  getReservation,
  saveReservation,
} from '@/lib/admin/store'

type Params = { params: Promise<{ id: string }> }

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params
  const reservation = await getReservation(id)
  if (!reservation) {
    return NextResponse.json({ error: 'Reservering niet gevonden' }, { status: 404 })
  }
  return NextResponse.json({ reservation })
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params
  const existing = await getReservation(id)
  if (!existing) {
    return NextResponse.json({ error: 'Reservering niet gevonden' }, { status: 404 })
  }
  const body = (await request.json()) as Reservation
  if (body.id !== id) {
    return NextResponse.json({ error: 'ID komt niet overeen' }, { status: 400 })
  }
  const reservation = await saveReservation({
    ...body,
    createdAt: existing.createdAt,
  })
  return NextResponse.json({ reservation })
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params
  const ok = await deleteReservation(id)
  if (!ok) {
    return NextResponse.json({ error: 'Reservering niet gevonden' }, { status: 404 })
  }
  return NextResponse.json({ ok: true })
}
