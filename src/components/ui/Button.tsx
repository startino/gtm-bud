import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const base = 'inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition-premium disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden'

    const variants: Record<Variant, string> = {
      primary:
        'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] hover:shadow-[var(--shadow-button)] hover:scale-[1.02] active:scale-[0.98] border-0 font-semibold',
      secondary:
        'bg-[var(--muted)] text-[var(--text)] hover:bg-[var(--muted)]/80 border-2 border-[var(--border)] shadow-[var(--shadow-sm)]',
      outline:
        'bg-transparent text-[var(--text)] hover:bg-[var(--muted)] border-2 border-[var(--border)] shadow-[var(--shadow-sm)] hover:border-[var(--color-accent)]',
      ghost:
        'bg-transparent text-[var(--text)] hover:bg-[var(--muted)]/50 border-0',
    }

    return (
      <button ref={ref} className={cn(base, variants[variant], className)} {...props} />
    )
  }
)

Button.displayName = 'Button'


