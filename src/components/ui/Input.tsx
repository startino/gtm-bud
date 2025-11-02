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
          'w-full rounded-[var(--radius-ctl)] bg-[var(--muted)] px-4 py-3 text-[var(--text)] placeholder-[var(--subtle)] outline-none border-0 focus:ring-4 focus:ring-[color:rgb(80_172_228_/_20%)]',
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'


