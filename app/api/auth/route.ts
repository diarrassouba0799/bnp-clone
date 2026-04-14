import { NextResponse } from 'next/server'
import { verifierCredentials, verifier2FA } from '@/lib/auth'
import { mockUser } from '@/lib/data'

export async function POST(request: Request) {
  const body = await request.json()
  const { action, email, password, code } = body

  if (action === 'login') {
    if (verifierCredentials(email, password)) {
      return NextResponse.json({ success: true, step: '2fa' })
    }
    return NextResponse.json({ success: false, message: 'Identifiants incorrects' }, { status: 401 })
  }

  if (action === '2fa') {
    if (verifier2FA(code)) {
      return NextResponse.json({ success: true, user: mockUser })
    }
    return NextResponse.json({ success: false, message: 'Code incorrect' }, { status: 401 })
  }

  return NextResponse.json({ success: false }, { status: 400 })
}