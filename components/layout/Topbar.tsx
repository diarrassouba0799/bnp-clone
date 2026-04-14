'use client'
import { Bell, Settings } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'

export default function Topbar({ title }: { title: string }) {
  const { user } = useAuthStore()

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      <div className="flex items-center gap-3">
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
          <Settings size={20} />
        </button>
        <div className="w-8 h-8 rounded-full bg-[#009B4E]/10 flex items-center justify-center ml-1">
          <span className="text-[#009B4E] font-bold text-xs">
            {user?.prenom?.[0]}{user?.nom?.[0]}
          </span>
        </div>
      </div>
    </header>
  )
}