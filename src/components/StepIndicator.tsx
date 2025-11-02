import { cn } from '@/lib/utils'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  onStepClick: (step: number) => void
}

export function StepIndicator({ currentStep, totalSteps, onStepClick }: StepIndicatorProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center gap-2 mb-6">
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
                'h-8 px-3 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200 border-0',
                isActive
                  ? 'bg-[var(--color-accent)] text-white shadow'
                  : isCompleted
                  ? 'bg-[var(--muted)] text-[var(--text)]'
                  : 'bg-transparent text-[var(--subtle)] cursor-not-allowed'
              )}
            >
              {step}
            </button>
            {step < totalSteps && (
              <div
                className={cn(
                  'w-4 h-0.5 transition-colors duration-200',
                  isCompleted ? 'bg-[var(--color-accent)]' : 'bg-[var(--border)]'
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

