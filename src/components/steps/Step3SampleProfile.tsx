import { useState } from 'react'
import { useCampaign } from '@/contexts/CampaignContext'
import { Linkedin, Plus, X } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface Step3SampleProfileProps {
  onNext: () => void
  onBack: () => void
}

export function Step3SampleProfile({ onNext, onBack }: Step3SampleProfileProps) {
  const { state, updateState } = useCampaign()
  const initialUrls = state.sampleProfileUrls && state.sampleProfileUrls.length > 0 
    ? state.sampleProfileUrls 
    : [state.sampleProfileUrl || '']
  const [sampleProfileUrls, setSampleProfileUrls] = useState<string[]>(
    initialUrls.filter(url => url.trim() !== '')
  )
  const [isLoading, setIsLoading] = useState(false)

  const handleAddUrl = () => {
    setSampleProfileUrls([...sampleProfileUrls, ''])
  }

  const handleRemoveUrl = (index: number) => {
    if (sampleProfileUrls.length > 1) {
      setSampleProfileUrls(sampleProfileUrls.filter((_, i) => i !== index))
    }
  }

  const handleUrlChange = (index: number, value: string) => {
    const newUrls = [...sampleProfileUrls]
    newUrls[index] = value
    setSampleProfileUrls(newUrls)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validUrls = sampleProfileUrls.filter(url => url.trim() !== '')
    if (validUrls.length === 0) return
    
    updateState({ 
      sampleProfileUrls: validUrls,
      sampleProfileUrl: validUrls[0] // Keep for backward compatibility
    })
    setIsLoading(true)
    
    // Simulate AI processing
    setTimeout(() => {
      setIsLoading(false)
      onNext()
    }, 1500)
  }

  const isValid = sampleProfileUrls.some(url => url.trim() !== '')

  return (
    <Card className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2 text-[var(--text)] tracking-tight">Provide sample prospects</h2>
      <p className="text-[var(--subtle)] mb-2 font-medium">
        Share LinkedIn profiles of ideal prospects. We'll extract ICP attributes and generate example messages.
      </p>
      <p className="text-sm text-[var(--subtle)] mb-8">
        Adding more profiles will make the next step more accurate.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {sampleProfileUrls.map((url, index) => (
          <div key={index} className="relative">
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2 text-[var(--text)]">
              <Linkedin className="w-4 h-4 text-[var(--color-accent)]" />
              Sample Prospect Profile URL {sampleProfileUrls.length > 1 ? `#${index + 1}` : ''}
            </label>
            <div className="flex gap-2">
              <Input
                type="url"
                value={url}
                onChange={(e) => handleUrlChange(index, e.target.value)}
                placeholder="https://linkedin.com/in/prospect"
                required={index === 0}
                disabled={isLoading}
                className="flex-1"
              />
              {sampleProfileUrls.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveUrl(index)}
                  disabled={isLoading}
                  className="px-4 py-3 rounded-[var(--radius-ctl)] bg-[var(--muted)] hover:bg-red-100 dark:hover:bg-red-900/20 text-[var(--subtle)] hover:text-red-600 transition-premium border-0 disabled:opacity-50"
                  title="Remove URL"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="secondary"
          onClick={handleAddUrl}
          disabled={isLoading}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Another URL
        </Button>

        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)] mx-auto mb-4"></div>
              <p className="text-sm text-[var(--subtle)]">Analyzing prospects and extracting ICP attributes...</p>
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <Button variant="secondary" type="button" onClick={onBack} disabled={isLoading} className="flex-1">
            Back
          </Button>
          <Button type="submit" disabled={!isValid || isLoading} className="flex-1">
            {isLoading ? 'Processing...' : 'Continue'}
          </Button>
        </div>
      </form>
    </Card>
  )
}

