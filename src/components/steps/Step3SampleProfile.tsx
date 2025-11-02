import { useState } from 'react'
import { useCampaign } from '@/contexts/CampaignContext'
import { Linkedin } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

interface Step3SampleProfileProps {
  onNext: () => void
  onBack: () => void
}

export function Step3SampleProfile({ onNext, onBack }: Step3SampleProfileProps) {
  const { state, updateState } = useCampaign()
  const [sampleProfileUrl, setSampleProfileUrl] = useState(state.sampleProfileUrl)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateState({ sampleProfileUrl })
    setIsLoading(true)
    
    // Simulate AI processing
    setTimeout(() => {
      setIsLoading(false)
      onNext()
    }, 1500)
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-1 text-[var(--text)]">Provide a sample prospect</h2>
      <p className="text-[var(--subtle)] mb-6">
        Share a LinkedIn profile of an ideal prospect. We'll extract ICP attributes and generate example messages.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <Linkedin className="w-4 h-4" />
            Sample Prospect Profile URL
          </label>
          <Input
            type="url"
            value={sampleProfileUrl}
            onChange={(e) => setSampleProfileUrl(e.target.value)}
            placeholder="https://linkedin.com/in/prospect"
            required
            disabled={isLoading}
          />
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)] mx-auto mb-4"></div>
              <p className="text-sm text-[var(--color-text-secondary)]">Analyzing prospect and extracting ICP attributes...</p>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button variant="secondary" type="button" onClick={onBack} disabled={isLoading} className="flex-1">
            Back
          </Button>
          <Button type="submit" disabled={!sampleProfileUrl.trim() || isLoading} className="flex-1">
            {isLoading ? 'Processing...' : 'Continue'}
          </Button>
        </div>
      </form>
    </Card>
  )
}

