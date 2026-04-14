import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-xl border border-gray-200 shadow-sm p-5',
        onClick && 'cursor-pointer hover:shadow-md transition-shadow duration-200',
        className
      )}
    >
      {children}
    </div>
  )
}