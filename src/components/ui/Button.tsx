import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const base = 'inline-flex items-center justify-center rounded-[var(--radius-ctl)] px-4 py-2 text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed'

    const variants: Record<Variant, string> = {
      primary:
        'bg-[var(--color-accent)] text-white shadow-[var(--shadow-card)] hover:opacity-90',
      secondary:
        'bg-[var(--muted)] text-[var(--text)] border border-[var(--border)] hover:bg-white',
      ghost:
        'bg-transparent text-[var(--text)] hover:bg-[var(--muted)] border border-transparent',
    }

    return (
      <button ref={ref} className={cn(base, variants[variant], className)} {...props} />
    )
  }
)

Button.displayName = 'Button'


