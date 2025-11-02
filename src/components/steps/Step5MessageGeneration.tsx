import { useState, useEffect } from 'react'
import { useCampaign } from '@/contexts/CampaignContext'
import { mockMessages } from '@/lib/mockData'
import { Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface Step5MessageGenerationProps {
  onNext: () => void
  onBack: () => void
}

export function Step5MessageGeneration({ onNext, onBack }: Step5MessageGenerationProps) {
  const { updateState } = useCampaign()
  const [isGenerating, setIsGenerating] = useState(true)

  // Simulate AI message generation
  useEffect(() => {
    const timer = setTimeout(() => {
      const generatedMessages = [
        ...mockMessages.casual.slice(0, 2),
        ...mockMessages.professional.slice(0, 2),
        ...mockMessages['value-first'].slice(0, 2),
      ]
      updateState({ generatedMessages })
      setIsGenerating(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [updateState])

  return (
    <Card className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
        <Sparkles className="w-8 h-8 text-[var(--color-accent)]" />
        Generating personalized messages
      </h2>
      <p className="text-[var(--subtle)] mb-6">
        AI is crafting multiple message variations for your sample prospect...
      </p>

      {isGenerating && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-pulse">
              <Sparkles className="w-16 h-16 text-[var(--color-accent)] mx-auto mb-4" />
            </div>
            <p className="text-lg font-semibold mb-2">Generating messages...</p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              This may take a few moments
            </p>
          </div>
        </div>
      )}

      {!isGenerating && (
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onBack} className="flex-1">Back</Button>
          <Button onClick={onNext} className="flex-1">View Messages</Button>
        </div>
      )}
    </Card>
  )
}
