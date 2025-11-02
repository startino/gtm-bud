import { useState } from 'react'
import { useCampaign } from '@/contexts/CampaignContext'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

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
    <Card className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-1 text-[var(--text)]">Choose your message style</h2>
      <p className="text-[var(--subtle)] mb-6">
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
                  'w-full p-4 rounded-[var(--radius-card)] transition-all text-left bg-[var(--surface)] border-0',
                  selectedTone === tone.id
                    ? 'shadow-[var(--shadow-card)]'
                    : ''
                )}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{tone.icon}</span>
                  <h3 className="text-lg font-semibold text-[var(--text)]">{tone.label}</h3>
                </div>
                {messages[0] && (
                  <div className="pl-11">
                    <div className="p-3 rounded bg-[var(--muted)] text-sm text-[var(--subtle)] whitespace-pre-line border-0">
                      {messages[0].content}
                    </div>
                  </div>
                )}
              </button>
            </div>
          )
        })}
      </div>

      <div className="flex gap-3">
        <Button variant="secondary" onClick={onBack} className="flex-1">Back</Button>
        <Button onClick={handleNext} disabled={!selectedTone} className="flex-1">Continue</Button>
      </div>
    </Card>
  )
}

