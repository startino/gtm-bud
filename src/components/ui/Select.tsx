import { forwardRef } from 'react'
import type { SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'w-full rounded-[var(--radius-ctl)] bg-[var(--surface)] border border-[var(--border)] px-4 py-3 text-[var(--text)] outline-none focus:ring-4 focus:ring-[color:rgb(80_172_228_/_20%)] focus:border-[var(--color-accent)]',
          className
        )}
        {...props}
      >
        {children}
      </select>
    )
  }
)

Select.displayName = 'Select'


