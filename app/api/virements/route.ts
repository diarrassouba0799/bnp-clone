import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { beneficiaire, iban, montant, motif } = body

  if (!beneficiaire || !iban || !montant || montant <= 0) {
    return NextResponse.json({ success: false, message: 'Données invalides' }, { status: 400 })
  }

  // Simuler un délai bancaire
  await new Promise((r) => setTimeout(r, 1000))

  return NextResponse.json({
    success: true,
    reference: `VIR-${Date.now()}`,
    message: `Virement de ${montant}€ vers ${beneficiaire} effectué avec succès`,
  })
}