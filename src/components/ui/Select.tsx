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
          'w-full rounded-md bg-[#e2e6ed] px-4 py-3 text-[var(--text)] outline-none border-0 focus:ring-4 focus:ring-[var(--color-accent-light)] focus:bg-[#d4dae4] shadow-[var(--shadow-sm)]',
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


