import { useState } from 'react'
import { useCampaign } from '@/contexts/CampaignContext'
import { Linkedin } from 'lucide-react'
import { cn } from '@/lib/utils'

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
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">Provide a sample prospect</h2>
      <p className="text-[var(--color-text-secondary)] mb-8">
        Share a LinkedIn profile of an ideal prospect. We'll extract ICP attributes and generate example messages.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <Linkedin className="w-4 h-4" />
            Sample Prospect Profile URL
          </label>
          <input
            type="url"
            value={sampleProfileUrl}
            onChange={(e) => setSampleProfileUrl(e.target.value)}
            placeholder="https://linkedin.com/in/prospect"
            className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-card)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
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

        <div className="flex gap-4">
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading}
            className="flex-1 py-3 px-6 rounded-lg font-semibold bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-card)] transition-colors disabled:opacity-50"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!sampleProfileUrl.trim() || isLoading}
            className={cn(
              'flex-1 py-3 px-6 rounded-lg font-semibold transition-all',
              sampleProfileUrl.trim() && !isLoading
                ? 'bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)] text-white hover:shadow-lg hover:shadow-[var(--color-accent)]/30 hover:scale-[1.02]'
                : 'bg-[var(--color-card)] text-[var(--color-text-muted)] cursor-not-allowed'
            )}
          >
            {isLoading ? 'Processing...' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  )
}

