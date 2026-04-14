import Topbar from '@/components/layout/Topbar'
import TransactionList from '@/components/transactions/TransactionList'
import { mockTransactions } from '@/lib/data'

export default function TransactionsPage() {
  return (
    <div>
      <Topbar title="Historique des opérations" />
      <div className="p-6 max-w-4xl mx-auto">
        <TransactionList transactions={mockTransactions} />
      </div>
    </div>
  )
}