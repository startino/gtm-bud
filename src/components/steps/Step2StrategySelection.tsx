import { useState } from 'react'
import { useCampaign } from '@/contexts/CampaignContext'
import { mockStrategies } from '@/lib/mockData'
import { cn } from '@/lib/utils'

interface Step2StrategySelectionProps {
  onNext: () => void
  onBack: () => void
}

export function Step2StrategySelection({ onNext, onBack }: Step2StrategySelectionProps) {
  const { state, updateState } = useCampaign()
  const [selectedStrategy, setSelectedStrategy] = useState(state.selectedStrategy)

  const handleSelect = (strategy: typeof mockStrategies[0]) => {
    setSelectedStrategy(strategy)
  }

  const handleNext = () => {
    if (selectedStrategy) {
      updateState({ selectedStrategy })
      onNext()
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">Choose your outreach strategy</h2>
      <p className="text-[var(--color-text-secondary)] mb-8">
        AI has generated these strategies based on your profile. Pick the one that resonates most.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {mockStrategies.map((strategy) => (
            <button
              key={strategy.id}
              onClick={() => handleSelect(strategy)}
              className={cn(
                'p-6 rounded-xl border-2 transition-all text-left',
                selectedStrategy?.id === strategy.id
                  ? 'border-[var(--color-accent)] bg-[var(--color-card)] shadow-lg shadow-[var(--color-accent)]/20'
                  : 'border-[var(--color-card)] hover:border-[var(--color-accent)]/50'
              )}
            >
              <div className="text-4xl mb-3">{strategy.icon}</div>
              <h3 className="text-xl font-bold mb-2">{strategy.title}</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">{strategy.description}</p>
            </button>
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
          disabled={!selectedStrategy}
          className={cn(
            'flex-1 py-3 px-6 rounded-lg font-semibold transition-all',
            selectedStrategy
              ? 'bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)] text-white hover:shadow-lg hover:shadow-[var(--color-accent)]/30 hover:scale-[1.02]'
              : 'bg-[var(--color-card)] text-[var(--color-text-muted)] cursor-not-allowed'
          )}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

