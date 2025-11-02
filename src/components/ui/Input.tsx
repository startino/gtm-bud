import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full rounded-[var(--radius-ctl)] bg-[var(--surface)] px-4 py-3 text-[var(--text)] placeholder-[var(--subtle)]',
          'border border-[var(--border)] outline-none',
          'transition-premium',
          'focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent-light)]',
          'hover:border-[var(--color-accent)]/50',
          'disabled:bg-[var(--muted)] disabled:cursor-not-allowed',
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'


