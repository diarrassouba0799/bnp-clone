import Topbar from '@/components/layout/Topbar'
import CarteVisuelle from '@/components/cartes/CarteVisuelle'
import { mockCartes } from '@/lib/data'

export default function CartesPage() {
  return (
    <div>
      <Topbar title="Mes cartes" />
      <div className="p-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {mockCartes.map((carte) => (
            <CarteVisuelle key={carte.id} carte={carte} />
          ))}
        </div>
      </div>
    </div>
  )
}