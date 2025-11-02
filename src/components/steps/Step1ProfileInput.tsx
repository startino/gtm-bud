import { useState } from 'react'
import { useCampaign } from '@/contexts/CampaignContext'
import { Linkedin, Globe } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

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
    <Card className="max-w-2xl mx-auto animate-in">
      <h2 className="text-2xl font-semibold mb-2 text-[var(--text)] tracking-tight">Tell us about yourself</h2>
      <p className="text-[var(--subtle)] mb-8 font-medium">
        We'll analyze your profile and website to create personalized outreach strategies
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* LinkedIn URL */}
        <div>
          <label className="block text-sm font-semibold mb-3 flex items-center gap-2 text-[var(--text)]">
            <Linkedin className="w-4 h-4 text-[var(--color-accent)]" />
            LinkedIn Profile URL
          </label>
          <Input
            type="url"
            value={linkedInUrl}
            onChange={(e) => setLinkedInUrl(e.target.value)}
            placeholder="https://linkedin.com/in/yourprofile"
            required
          />
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-semibold mb-3 flex items-center gap-2 text-[var(--text)]">
            <Globe className="w-4 h-4 text-[var(--color-accent)]" />
            Website
          </label>
          <Input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://youragency.com"
            required
          />
        </div>

        {/* Next Button */}
        <Button type="submit" disabled={!isValid} className="w-full mt-8">
          Continue
        </Button>
      </form>
    </Card>
  )
}

