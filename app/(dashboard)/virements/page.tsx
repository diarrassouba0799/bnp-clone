import Topbar from '@/components/layout/Topbar'
import VirementForm from '@/components/virements/VirementForm'

export default function VirementsPage() {
  return (
    <div>
      <Topbar title="Virements" />
      <div className="p-6 max-w-2xl mx-auto">
        <VirementForm />
      </div>
    </div>
  )
}