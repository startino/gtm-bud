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
    <div className={cn('mb-8 flex items-center justify-between', className)}>
      <div>
        <h2 className="text-3xl font-semibold text-[var(--text)] tracking-tight mb-1.5">{title}</h2>
        {subtitle && (
          <p className="text-sm text-[var(--subtle)] font-medium">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  )
}


