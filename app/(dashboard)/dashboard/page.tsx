import Topbar from '@/components/layout/Topbar'
import SoldeCard from '@/components/dashboard/SoldeCard'
import RecentTransactions from '@/components/dashboard/RecentTransactions'
import { mockComptes, mockTransactions } from '@/lib/data'
import { formatMontant } from '@/lib/utils'
import { Send, PiggyBank, FileText, HelpCircle } from 'lucide-react'
import Link from 'next/link'

const actions = [
  { label: 'Virer', icon: Send, href: '/virements', color: 'bg-blue-50 text-blue-600' },
  { label: 'Épargner', icon: PiggyBank, href: '/dashboard', color: 'bg-purple-50 text-purple-600' },
  { label: 'Relevés', icon: FileText, href: '/transactions', color: 'bg-amber-50 text-amber-600' },
  { label: 'Aide', icon: HelpCircle, href: '/dashboard', color: 'bg-gray-100 text-gray-600' },
]

export default function DashboardPage() {
  const principal = mockComptes[0]
  const totalPatrimoine = mockComptes.reduce((acc, c) => acc + c.solde, 0)

  return (
    <div>
      <Topbar title="Bonjour, Marie 👋" />
      <div className="p-6 max-w-4xl mx-auto space-y-6">

        {/* Carte solde principal */}
        <SoldeCard compte={principal} />

        {/* Patrimoine total */}
        <div className="grid grid-cols-3 gap-3">
          {mockComptes.map((c) => (
            <div key={c.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <p className="text-xs text-gray-500 mb-1">{c.libelle}</p>
              <p className="text-sm font-semibold text-gray-900">{formatMontant(c.solde)}</p>
            </div>
          ))}
        </div>

        {/* Actions rapides */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Actions rapides</h2>
          <div className="grid grid-cols-4 gap-3">
            {actions.map(({ label, icon: Icon, href, color }) => (
              <Link key={label} href={href} className="flex flex-col items-center gap-2 bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow shadow-sm">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
                  <Icon size={18} />
                </div>
                <span className="text-xs font-medium text-gray-700">{label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Transactions récentes */}
        <RecentTransactions transactions={mockTransactions} />
      </div>
    </div>
  )
}