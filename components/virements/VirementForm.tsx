'use client'
import { useState } from 'react'
import { CheckCircle, AlertCircle } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { mockComptes } from '@/lib/data'
import { formatMontant } from '@/lib/utils'

export default function VirementForm() {
  const [form, setForm] = useState({ beneficiaire: '', iban: '', montant: '', motif: '' })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate(): boolean {
    const e: Record<string, string> = {}
    if (!form.beneficiaire.trim()) e.beneficiaire = 'Le nom du bénéficiaire est requis'
    if (!form.iban.trim() || form.iban.length < 14) e.iban = 'IBAN invalide'
    if (!form.montant || +form.montant <= 0) e.montant = 'Montant invalide'
    if (+form.montant > mockComptes[0].solde) e.montant = 'Solde insuffisant'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setStatus('success')
    setLoading(false)
  }

  if (status === 'success') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
        <CheckCircle size={48} className="text-[#009B4E] mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Virement effectué !</h3>
        <p className="text-gray-500 text-sm mb-2">
          {formatMontant(+form.montant)} vers {form.beneficiaire}
        </p>
        <p className="text-xs text-gray-400 mb-6">Référence : VIR-{Date.now()}</p>
        <Button onClick={() => { setStatus('idle'); setForm({ beneficiaire: '', iban: '', montant: '', motif: '' }) }}>
          Nouveau virement
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <div>
          <h3 className="font-semibold text-gray-900">Émettre un virement</h3>
          <p className="text-xs text-gray-500 mt-0.5">Compte débité : Compte Courant · {formatMontant(mockComptes[0].solde)}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input label="Nom du bénéficiaire" placeholder="Jean Martin" value={form.beneficiaire}
          onChange={(e) => setForm({ ...form, beneficiaire: e.target.value })} error={errors.beneficiaire} />
        <Input label="IBAN du bénéficiaire" placeholder="FR76 3000 4028 ..." value={form.iban}
          onChange={(e) => setForm({ ...form, iban: e.target.value })} error={errors.iban} />
        <Input label="Montant (€)" type="number" placeholder="0,00" min="0.01" step="0.01"
          value={form.montant} onChange={(e) => setForm({ ...form, montant: e.target.value })} error={errors.montant} />
        <Input label="Motif (facultatif)" placeholder="Remboursement restaurant..." value={form.motif}
          onChange={(e) => setForm({ ...form, motif: e.target.value })} />
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2">
          <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700">Vérifiez l'IBAN avant de valider. Les virements sont irréversibles.</p>
        </div>
        <Button type="submit" className="w-full" size="lg" loading={loading}>
          Valider le virement
        </Button>
      </form>
    </div>
  )
}