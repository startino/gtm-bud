import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const base = 'inline-flex items-center justify-center rounded-[var(--radius-ctl)] px-5 py-2.5 text-sm font-medium transition-premium disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden'

    const variants: Record<Variant, string> = {
      primary:
        'bg-gradient-to-r from-[#50ace4] to-[#6b9eff] text-white hover:shadow-[var(--shadow-button)] hover:scale-[1.02] active:scale-[0.98] border-0 font-semibold',
      secondary:
        'bg-[var(--muted)] text-[var(--text)] hover:bg-[var(--surface)] hover:shadow-[var(--shadow-sm)] border border-[var(--border-subtle)] hover:border-[var(--border)]',
      ghost:
        'bg-transparent text-[var(--text)] hover:bg-[var(--muted)] border-0 hover:shadow-[var(--shadow-sm)]',
    }

    return (
      <button ref={ref} className={cn(base, variants[variant], className)} {...props} />
    )
  }
)

Button.displayName = 'Button'


