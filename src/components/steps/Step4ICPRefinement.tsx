import { useState } from 'react'
import { useCampaign } from '@/contexts/CampaignContext'
import { UserSearch } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Step4ICPRefinementProps {
  onNext: () => void
  onBack: () => void
}

export function Step4ICPRefinement({ onNext, onBack }: Step4ICPRefinementProps) {
  const { state, updateState } = useCampaign()
  const [attributes, setAttributes] = useState(state.icpAttributes)

  const handleToggleRequired = (id: string) => {
    setAttributes((prev) =>
      prev.map((attr) =>
        attr.id === id ? { ...attr, required: !attr.required } : attr
      )
    )
  }

  const handleNext = () => {
    updateState({ icpAttributes: attributes })
    onNext()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
        <UserSearch className="w-8 h-8 text-[var(--color-accent)]" />
        Refine your Ideal Customer Profile
      </h2>
      <p className="text-[var(--color-text-secondary)] mb-8">
        We've extracted these attributes from your sample. Mark which ones are required vs nice-to-have.
      </p>

      <div className="space-y-4 mb-8">
        {attributes.map((attr) => (
          <div
            key={attr.id}
            className={cn(
              'p-4 rounded-lg border-2 transition-all',
              attr.required
                ? 'border-[var(--color-accent)] bg-[var(--color-card)]'
                : 'border-[var(--color-card)]'
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{attr.label}</h3>
                  {attr.required && (
                    <span className="px-2 py-0.5 text-xs bg-[var(--color-accent)] text-white rounded">Required</span>
                  )}
                </div>
                <p className="text-sm text-[var(--color-text-secondary)]">{attr.value}</p>
              </div>
              <button
                onClick={() => handleToggleRequired(attr.id)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap',
                  attr.required
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-card)]'
                )}
              >
                {attr.required ? 'Required' : 'Nice-to-have'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-3 px-6 rounded-lg font-semibold bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-card)] transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="flex-1 py-3 px-6 rounded-lg font-semibold bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)] text-white hover:shadow-lg hover:shadow-[var(--color-accent)]/30 hover:scale-[1.02] transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

