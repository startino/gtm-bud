import { useState } from 'react'
import { useCampaign } from '@/contexts/CampaignContext'
import { mockStrategies } from '@/lib/mockData'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

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
    <Card className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-1 text-[var(--text)]">Choose your outreach strategy</h2>
      <p className="text-[var(--subtle)] mb-6">
        AI has generated these strategies based on your profile. Pick the one that resonates most.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {mockStrategies.map((strategy) => (
            <button
              key={strategy.id}
              onClick={() => handleSelect(strategy)}
              className={cn(
                'p-5 rounded-[var(--radius-card)] border transition-all text-left bg-[var(--surface)]',
                selectedStrategy?.id === strategy.id
                  ? 'border-[var(--color-accent)] shadow-[var(--shadow-card)]'
                  : 'border-[var(--border)] hover:border-[var(--color-accent)]/50'
              )}
            >
              <div className="text-4xl mb-3">{strategy.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--text)]">{strategy.title}</h3>
              <p className="text-sm text-[var(--subtle)]">{strategy.description}</p>
            </button>
          ))}
      </div>

      <div className="flex gap-3">
        <Button variant="secondary" onClick={onBack} className="flex-1">Back</Button>
        <Button onClick={handleNext} disabled={!selectedStrategy} className="flex-1">Continue</Button>
      </div>
    </Card>
  )
}

