import { NextResponse } from 'next/server'
import { mockCartes } from '@/lib/data'

export async function GET() {
  return NextResponse.json({ cartes: mockCartes })
}

export async function PATCH(request: Request) {
  const body = await request.json()
  const { carteId, action } = body

  if (!carteId || !['bloquer', 'debloquer'].includes(action)) {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  return NextResponse.json({
    success: true,
    statut: action === 'bloquer' ? 'bloquee' : 'active',
  })
}