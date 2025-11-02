import { useState } from 'react'
import { useCampaign } from '@/contexts/CampaignContext'
import { cn } from '@/lib/utils'

interface Step6MessageSelectionProps {
  onNext: () => void
  onBack: () => void
}

export function Step6MessageSelection({ onNext, onBack }: Step6MessageSelectionProps) {
  const { state, updateState } = useCampaign()
  const [selectedTone, setSelectedTone] = useState<'casual' | 'professional' | 'value-first' | null>(
    state.selectedMessageTone
  )

  const tones = [
    { id: 'casual', label: 'Casual & Conversational', icon: '💬' },
    { id: 'professional', label: 'Professional & Consultative', icon: '🤝' },
    { id: 'value-first', label: 'Direct & Value-First', icon: '🎯' },
  ] as const

  const getMessagesForTone = (tone: typeof selectedTone) => {
    if (!tone || !state.generatedMessages.length) return []
    return state.generatedMessages.filter((msg) => msg.tone === tone)
  }

  const handleSelect = (tone: 'casual' | 'professional' | 'value-first') => {
    setSelectedTone(tone)
    updateState({ selectedMessageTone: tone })
  }

  const handleNext = () => {
    if (selectedTone) {
      onNext()
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">Choose your message style</h2>
      <p className="text-[var(--color-text-secondary)] mb-8">
        Select the tone that best matches your brand voice. All messages are fully personalized.
      </p>

      <div className="space-y-6 mb-8">
        {tones.map((tone) => {
          const messages = getMessagesForTone(tone.id)
          return (
            <div key={tone.id}>
              <button
                onClick={() => handleSelect(tone.id)}
                className={cn(
                  'w-full p-4 rounded-lg border-2 transition-all text-left',
                  selectedTone === tone.id
                    ? 'border-[var(--color-accent)] bg-[var(--color-card)]'
                    : 'border-[var(--color-card)] hover:border-[var(--color-accent)]/50'
                )}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{tone.icon}</span>
                  <h3 className="text-lg font-semibold">{tone.label}</h3>
                </div>
                {messages[0] && (
                  <div className="pl-11">
                    <div className="p-3 rounded bg-[var(--color-surface)] text-sm text-[var(--color-text-secondary)] whitespace-pre-line">
                      {messages[0].content}
                    </div>
                  </div>
                )}
              </button>
            </div>
          )
        })}
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
          disabled={!selectedTone}
          className={cn(
            'flex-1 py-3 px-6 rounded-lg font-semibold transition-all',
            selectedTone
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

