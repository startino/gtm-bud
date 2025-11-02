import { useState } from 'react'
import { useCampaign } from '@/contexts/CampaignContext'
import { mockStrategies } from '@/lib/mockData'
import type { Strategy } from '@/lib/mockData'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Edit2, Plus } from 'lucide-react'

interface Step2StrategySelectionProps {
  onNext: () => void
  onBack: () => void
}

export function Step2StrategySelection({ onNext, onBack }: Step2StrategySelectionProps) {
  const { state, updateState } = useCampaign()
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(state.selectedStrategy)
  const [editingStrategyId, setEditingStrategyId] = useState<string | null>(null)
  const [editedStrategy, setEditedStrategy] = useState<Strategy | null>(null)
  const [showCustomForm, setShowCustomForm] = useState(false)
  const [customStrategy, setCustomStrategy] = useState<Strategy>({
    id: 'custom',
    title: '',
    description: '',
    icon: '✨',
  })

  const handleSelect = (strategy: Strategy) => {
    setSelectedStrategy(strategy)
    setEditingStrategyId(null)
    setShowCustomForm(false)
  }

  const handleEdit = (strategy: Strategy) => {
    setEditingStrategyId(strategy.id)
    setEditedStrategy({ ...strategy })
    setShowCustomForm(false)
  }

  const handleSaveEdit = () => {
    if (editedStrategy) {
      setSelectedStrategy(editedStrategy)
      setEditingStrategyId(null)
      setEditedStrategy(null)
    }
  }

  const handleCancelEdit = () => {
    setEditingStrategyId(null)
    setEditedStrategy(null)
  }

  const handleCreateCustom = () => {
    if (customStrategy.title.trim() && customStrategy.description.trim()) {
      setSelectedStrategy(customStrategy)
      setShowCustomForm(false)
    }
  }

  const handleNext = () => {
    if (selectedStrategy) {
      updateState({ selectedStrategy })
      onNext()
    }
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2 text-[var(--text)] tracking-tight">Choose your outreach strategy</h2>
      <p className="text-[var(--subtle)] mb-8 font-medium">
        AI has generated these strategies based on your profile. Pick one, edit it, or create your own.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {mockStrategies.map((strategy) => {
          const isEditing = editingStrategyId === strategy.id
          const isSelected = selectedStrategy?.id === strategy.id && !isEditing

          if (isEditing && editedStrategy) {
            return (
              <Card key={strategy.id} className="p-5">
                <div className="space-y-4">
                  <Input
                    value={editedStrategy.icon}
                    onChange={(e) => setEditedStrategy({ ...editedStrategy, icon: e.target.value })}
                    placeholder="Icon (emoji)"
                    className="text-center text-2xl"
                  />
                  <Input
                    value={editedStrategy.title}
                    onChange={(e) => setEditedStrategy({ ...editedStrategy, title: e.target.value })}
                    placeholder="Strategy title"
                  />
                  <textarea
                    value={editedStrategy.description}
                    onChange={(e) => setEditedStrategy({ ...editedStrategy, description: e.target.value })}
                    placeholder="Strategy description"
                    rows={4}
                    className="w-full px-4 py-3 rounded-[var(--radius-ctl)] bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--subtle)] focus:outline-none focus:ring-4 focus:ring-[var(--color-accent-light)] transition-premium resize-none"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleSaveEdit} className="flex-1 text-sm py-2">Save</Button>
                    <Button variant="secondary" onClick={handleCancelEdit} className="flex-1 text-sm py-2">Cancel</Button>
                  </div>
                </div>
              </Card>
            )
          }

          return (
            <div key={strategy.id} className="relative">
              <button
                onClick={() => handleSelect(strategy)}
                className={cn(
                  'w-full p-5 rounded-[var(--radius-card)] transition-premium text-left bg-[var(--surface)] border-0',
                  isSelected
                    ? 'shadow-[var(--shadow-card-hover)] border-2 border-[var(--color-accent)]'
                    : 'hover:shadow-[var(--shadow-card)] border border-[var(--border-subtle)]'
                )}
              >
                <div className="text-4xl mb-3">{strategy.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-[var(--text)]">{strategy.title}</h3>
                <p className="text-sm text-[var(--subtle)]">{strategy.description}</p>
              </button>
              {isSelected && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEdit(strategy)
                  }}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-[var(--muted)] hover:bg-[var(--color-accent)] hover:text-white text-[var(--subtle)] transition-premium border-0"
                  title="Edit strategy"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Create Custom Strategy */}
      {!showCustomForm ? (
        <div className="mb-6">
          <Button
            variant="secondary"
            onClick={() => {
              setShowCustomForm(true)
              setEditingStrategyId(null)
            }}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Custom Strategy
          </Button>
        </div>
      ) : (
        <Card className="p-6 mb-6 border-2 border-[var(--color-accent)]">
          <h3 className="text-lg font-semibold mb-4 text-[var(--text)]">Create Custom Strategy</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-[var(--text)]">Icon (emoji)</label>
              <Input
                value={customStrategy.icon}
                onChange={(e) => setCustomStrategy({ ...customStrategy, icon: e.target.value })}
                placeholder="✨"
                className="text-center text-2xl"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-[var(--text)]">Title</label>
              <Input
                value={customStrategy.title}
                onChange={(e) => setCustomStrategy({ ...customStrategy, title: e.target.value })}
                placeholder="Strategy title"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-[var(--text)]">Description</label>
              <textarea
                value={customStrategy.description}
                onChange={(e) => setCustomStrategy({ ...customStrategy, description: e.target.value })}
                placeholder="Describe your outreach strategy..."
                rows={4}
                className="w-full px-4 py-3 rounded-[var(--radius-ctl)] bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--subtle)] focus:outline-none focus:ring-4 focus:ring-[var(--color-accent-light)] transition-premium resize-none"
              />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleCreateCustom}
                disabled={!customStrategy.title.trim() || !customStrategy.description.trim()}
                className="flex-1"
              >
                Use This Strategy
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowCustomForm(false)
                  setCustomStrategy({ id: 'custom', title: '', description: '', icon: '✨' })
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="flex gap-3">
        <Button variant="secondary" onClick={onBack} className="flex-1">Back</Button>
        <Button onClick={handleNext} disabled={!selectedStrategy} className="flex-1">Continue</Button>
      </div>
    </Card>
  )
}

