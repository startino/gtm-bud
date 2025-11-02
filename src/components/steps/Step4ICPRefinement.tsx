import { useState } from 'react'
import { useCampaign } from '@/contexts/CampaignContext'
import { UserSearch } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

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
    <Card className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
        <UserSearch className="w-8 h-8 text-[var(--color-accent)]" />
        Refine your Ideal Customer Profile
      </h2>
      <p className="text-[var(--subtle)] mb-6">
        We've extracted these attributes from your sample. Mark which ones are required vs nice-to-have.
      </p>

      <div className="space-y-3 mb-6">
        {attributes.map((attr) => (
          <div
            key={attr.id}
            className={cn(
              'p-4 rounded-[var(--radius-card)] border transition-all bg-[var(--surface)]',
              attr.required
                ? 'border-[var(--color-accent)] shadow-[var(--shadow-card)]'
                : 'border-[var(--border)]'
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-[var(--text)]">{attr.label}</h3>
                  {attr.required && (
                    <span className="px-2 py-0.5 text-xs bg-[var(--color-accent)] text-white rounded">Required</span>
                  )}
                </div>
                <p className="text-sm text-[var(--subtle)]">{attr.value}</p>
              </div>
              <button
                onClick={() => handleToggleRequired(attr.id)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap',
                  attr.required
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'bg-[var(--muted)] text-[var(--text)] border border-[var(--border)] hover:bg-white'
                )}
              >
                {attr.required ? 'Required' : 'Nice-to-have'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="secondary" onClick={onBack} className="flex-1">Back</Button>
        <Button onClick={handleNext} className="flex-1">Continue</Button>
      </div>
    </Card>
  )
}

