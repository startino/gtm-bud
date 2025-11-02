import { useState } from 'react'
import { useCampaign } from '@/contexts/CampaignContext'
import { Linkedin, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Step1ProfileInputProps {
  onNext: () => void
}

export function Step1ProfileInput({ onNext }: Step1ProfileInputProps) {
  const { state, updateState } = useCampaign()
  const [linkedInUrl, setLinkedInUrl] = useState(state.linkedInUrl)
  const [website, setWebsite] = useState(state.website)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateState({ linkedInUrl, website })
    onNext()
  }

  const isValid = linkedInUrl.trim() !== '' && website.trim() !== ''

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">Tell us about yourself</h2>
      <p className="text-[var(--color-text-secondary)] mb-8">
        We'll analyze your profile and website to create personalized outreach strategies
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* LinkedIn URL */}
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <Linkedin className="w-4 h-4" />
            LinkedIn Profile URL
          </label>
          <input
            type="url"
            value={linkedInUrl}
            onChange={(e) => setLinkedInUrl(e.target.value)}
            placeholder="https://linkedin.com/in/yourprofile"
            className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-card)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
            required
          />
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Website
          </label>
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://youragency.com"
            className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-card)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
            required
          />
        </div>

        {/* Next Button */}
        <button
          type="submit"
          disabled={!isValid}
          className={cn(
            'w-full py-3 px-6 rounded-lg font-semibold transition-all',
            isValid
              ? 'bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)] text-white hover:shadow-lg hover:shadow-[var(--color-accent)]/30 hover:scale-[1.02]'
              : 'bg-[var(--color-card)] text-[var(--color-text-muted)] cursor-not-allowed'
          )}
        >
          Continue
        </button>
      </form>
    </div>
  )
}

