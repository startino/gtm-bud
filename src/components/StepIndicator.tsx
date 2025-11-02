import { cn } from '@/lib/utils'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  onStepClick: (step: number) => void
}

export function StepIndicator({ currentStep, totalSteps, onStepClick }: StepIndicatorProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {steps.map((step) => {
        const isActive = step === currentStep
        const isCompleted = step < currentStep
        const isClickable = step <= currentStep || isCompleted

        return (
          <div key={step} className="flex items-center">
            <button
              onClick={() => isClickable && onStepClick(step)}
              disabled={!isClickable}
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-accent)]/30 scale-110'
                  : isCompleted
                  ? 'bg-[var(--color-accent)] text-white hover:scale-105 cursor-pointer'
                  : 'bg-[var(--color-card)] text-[var(--color-text-muted)] cursor-not-allowed'
              )}
            >
              {step}
            </button>
            {step < totalSteps && (
              <div
                className={cn(
                  'w-8 h-0.5 transition-colors duration-200',
                  isCompleted ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-card)]'
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

