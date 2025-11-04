import { cn } from '@/lib/utils'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  onStepClick: (step: number) => void
}

const STEP_LABELS = [
  'Profile',
  'Value Offer',
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
        const label = STEP_LABELS[step - 1] || `Step ${step}`

        return (
          <div key={step} className="flex items-start flex-1">
            <div className="flex flex-col items-center flex-shrink-0">
            <button
                onClick={() => onStepClick(step)}
              className={cn(
                  'h-9 w-9 rounded-full flex items-center justify-center text-xs font-semibold transition-premium border-0 cursor-pointer',
                isActive
                    ? 'bg-[var(--color-accent)] text-white shadow-[var(--shadow-button)] scale-110'
                  : isCompleted
                    ? 'bg-[var(--muted)] text-[var(--color-accent)] hover:bg-[var(--muted)]/80'
                    : 'bg-[var(--muted)] text-[var(--subtle)] hover:bg-[var(--muted)]/80 hover:text-[var(--text)]'
              )}
            >
              {step}
            </button>
              <span
                className={cn(
                  'text-xs font-medium mt-2 text-center w-full transition-premium',
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
            {step < totalSteps && (
              <div
                className={cn(
                  'h-1 rounded-full transition-premium mx-2 flex-1 mt-4',
                  isCompleted 
                    ? 'bg-[var(--color-accent)]' 
                    : 'bg-[var(--border-subtle)]'
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

