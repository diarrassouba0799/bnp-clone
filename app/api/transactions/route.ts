import { NextResponse } from 'next/server'
import { mockTransactions } from '@/lib/data'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const q = searchParams.get('q')?.toLowerCase()

  let result = [...mockTransactions]
  if (type && type !== 'tous') result = result.filter((t) => t.type === type)
  if (q) result = result.filter((t) => t.libelle.toLowerCase().includes(q))

  return NextResponse.json({ transactions: result, total: result.length })
}