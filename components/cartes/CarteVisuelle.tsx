'use client'
import { useState } from 'react'
import { Carte } from '@/types'
import { formatMontant } from '@/lib/utils'
import { Lock, Unlock, Wifi } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function CarteVisuelle({ carte }: { carte: Carte }) {
  const [bloquee, setBloquee] = useState(carte.statut === 'bloquee')
  const pct = Math.round((carte.depensesMois / carte.plafond) * 100)

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-5">
      {/* Visuel carte */}
      <div className={`relative rounded-2xl p-5 text-white h-44 overflow-hidden transition-all ${bloquee ? 'bg-gray-400' : 'bg-gradient-to-br from-[#1a1a2e] to-[#16213e]'}`}>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-white/60 uppercase tracking-widest">BNP Paribas</p>
            <div className="mt-1"><Wifi size={18} className="text-white/60 rotate-90" /></div>
          </div>
          <span className="text-xs font-bold uppercase bg-white/10 px-2 py-0.5 rounded">
            {carte.type === 'visa' ? 'VISA' : 'Mastercard'}
          </span>
        </div>
        <div className="absolute bottom-5 left-5 right-5">
          <p className="font-mono text-sm tracking-widest mb-2">{carte.numero}</p>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] text-white/50 uppercase">Titulaire</p>
              <p className="text-sm font-medium">{carte.titulaire}</p>
            </div>
            <div>
              <p className="text-[10px] text-white/50 uppercase">Expire</p>
              <p className="text-sm font-medium">{carte.expiration}</p>
            </div>
          </div>
        </div>
        {bloquee && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl">
            <span className="text-white font-bold text-sm bg-black/50 px-3 py-1 rounded-full">CARTE BLOQUÉE</span>
          </div>
        )}
      </div>

      {/* Plafond */}
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1.5">
          <span>Dépenses ce mois</span>
          <span>{formatMontant(carte.depensesMois)} / {formatMontant(carte.plafond)}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${pct > 80 ? 'bg-red-500' : 'bg-[#009B4E]'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">{pct}% du plafond utilisé</p>
      </div>

      {/* Action */}
      <Button
        variant={bloquee ? 'primary' : 'danger'}
        className="w-full"
        onClick={() => setBloquee(!bloquee)}
      >
        {bloquee ? <><Unlock size={16} className="mr-2" /> Débloquer la carte</> : <><Lock size={16} className="mr-2" /> Bloquer la carte</>}
      </Button>
    </div>
  )
}