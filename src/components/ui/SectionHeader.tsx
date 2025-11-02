import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  actions?: ReactNode
  className?: string
}

export function SectionHeader({ title, subtitle, actions, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-6 flex items-center justify-between', className)}>
      <div>
        <h2 className="text-2xl font-semibold text-[var(--text)]">{title}</h2>
        {subtitle && (
          <p className="text-sm text-[var(--subtle)] mt-1">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}


