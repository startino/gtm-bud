import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps {
  children: ReactNode
  className?: string
  dotColor?: string
}

export function Badge({ children, className, dotColor }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full bg-[var(--muted)] text-[var(--text)] px-3 py-1 text-xs border-0',
        className
      )}
    >
      {dotColor && (
        <span className={cn('inline-block w-2 h-2 rounded-full')} style={{ backgroundColor: dotColor }} />
      )}
      {children}
    </span>
  )
}


