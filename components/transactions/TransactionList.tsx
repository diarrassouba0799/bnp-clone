'use client'
import { useState } from 'react'
import { Transaction } from '@/types'
import { formatMontant, formatDate } from '@/lib/utils'
import { ArrowDownLeft, ArrowUpRight, Search } from 'lucide-react'
import Input from '@/components/ui/Input'

const categorieEmoji: Record<string, string> = {
  Salaire: '💼', Courses: '🛒', Loisirs: '🎬', Transport: '🚆',
  Factures: '⚡', Virement: '↔️', Shopping: '🛍️', Santé: '💊', Logement: '🏠',
}

export default function TransactionList({ transactions }: { transactions: Transaction[] }) {
  const [search, setSearch] = useState('')
  const [filtre, setFiltre] = useState<'tous' | 'debit' | 'credit'>('tous')

  const filtered = transactions.filter((t) => {
    const matchSearch = t.libelle.toLowerCase().includes(search.toLowerCase())
    const matchFiltre = filtre === 'tous' || t.type === filtre
    return matchSearch && matchFiltre
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="Rechercher une opération..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search size={16} />}
          className="flex-1"
        />
        <div className="flex gap-2">
          {(['tous', 'debit', 'credit'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFiltre(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filtre === f ? 'bg-[#009B4E] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              {f === 'tous' ? 'Tous' : f === 'debit' ? 'Débits' : 'Crédits'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-50">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-12 text-sm">Aucune opération trouvée</p>
          ) : (
            filtered.map((t) => (
              <div key={t.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-base flex-shrink-0">
                  {categorieEmoji[t.categorie] || '💳'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{t.libelle}</p>
                  <p className="text-xs text-gray-400">{formatDate(t.date)} · {t.categorie}</p>
                </div>
                <div className={`flex items-center gap-1 font-semibold text-sm ${t.type === 'credit' ? 'text-[#009B4E]' : 'text-gray-800'}`}>
                  {t.type === 'credit' ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                  {t.type === 'credit' ? '+' : ''}{formatMontant(Math.abs(t.montant))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}