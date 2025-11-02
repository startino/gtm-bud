import { cn } from '@/lib/utils'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  onStepClick: (step: number) => void
}

const STEP_LABELS = [
  'Profile',
  'Strategy',
  'Samples',
  'ICP',
  'Messages',
  'Leads',
  'Order',
  'Complete',
]

export function StepIndicator({ currentStep, totalSteps, onStepClick }: StepIndicatorProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1)

  return (
    <div className="flex items-start justify-center gap-1.5 mb-6 py-4">
      {steps.map((step) => {
        const isActive = step === currentStep
        const isCompleted = step < currentStep
        const isClickable = step <= currentStep || isCompleted
        const label = STEP_LABELS[step - 1] || `Step ${step}`

        return (
          <div key={step} className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              <button
                onClick={() => isClickable && onStepClick(step)}
                disabled={!isClickable}
                className={cn(
                  'h-9 w-9 rounded-full flex items-center justify-center text-xs font-semibold transition-premium border-0 flex-shrink-0',
                  isActive
                    ? 'bg-gradient-to-br from-[var(--color-accent)] to-[#6b9eff] text-white shadow-[var(--shadow-button)] scale-110'
                    : isCompleted
                    ? 'bg-[var(--muted)] text-[var(--color-accent)] hover:bg-[var(--surface)] hover:shadow-[var(--shadow-sm)] cursor-pointer border border-[var(--border-subtle)]'
                    : 'bg-transparent text-[var(--subtle)] cursor-not-allowed border border-[var(--border-subtle)]'
                )}
              >
                {step}
              </button>
              {step < totalSteps && (
                <div
                  className={cn(
                    'h-1 rounded-full transition-premium mx-2 flex-1',
                    isCompleted 
                      ? 'bg-gradient-to-r from-[var(--color-accent)] to-[#6b9eff]' 
                      : 'bg-[var(--border-subtle)]'
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                'text-xs font-medium mt-2 text-center transition-premium',
                isActive
                  ? 'text-[var(--color-accent)]'
                  : isCompleted
                  ? 'text-[var(--text)]'
                  : 'text-[var(--subtle)]'
              )}
            >
              {label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

