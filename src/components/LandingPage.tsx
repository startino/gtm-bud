import { useState } from 'react'
import { Linkedin, Globe, Zap, Target, Rocket } from 'lucide-react'
import { Input } from './ui/Input'
import { Button } from './ui/Button'

interface LandingPageProps {
  onSubmit: (website: string, linkedInUrl: string) => void
}

export function LandingPage({ onSubmit }: LandingPageProps) {
  const [website, setWebsite] = useState('')
  const [linkedInUrl, setLinkedInUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!website.trim() || !linkedInUrl.trim()) return
    
    setIsSubmitting(true)
    
    // Small delay to simulate processing
    await new Promise(resolve => setTimeout(resolve, 300))
    
    onSubmit(website.trim(), linkedInUrl.trim())
    setIsSubmitting(false)
  }

  const isValid = website.trim() !== '' && linkedInUrl.trim() !== ''

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--bg-gradient)] to-[var(--bg)]">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section with Input Form - Above the Fold */}
        <div className="text-center mb-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-[var(--text)]">
            Build Your Outreach Campaign
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#50ace4] to-[#6b9eff] block mt-2">
              In Minutes, Not Days
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--subtle)] max-w-2xl mx-auto mb-10">
            The easiest way to create personalized LinkedIn outreach campaigns. 
            Start generating qualified leads in seconds.
          </p>

          {/* Main Input Form - Prominently Featured */}
          <div className="max-w-3xl mx-auto">
            <div className="p-8 md:p-10 rounded-[var(--radius-card)] bg-[var(--surface)] shadow-[var(--shadow-card)]">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Website Input */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--text)] flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Website
                  </label>
                  <Input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://youragency.com"
                    required
                    disabled={isSubmitting}
                    className="text-base"
                  />
                </div>

                {/* LinkedIn Input */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--text)] flex items-center gap-2">
                    <Linkedin className="w-4 h-4" />
                    LinkedIn Profile URL
                  </label>
                  <Input
                    type="url"
                    value={linkedInUrl}
                    onChange={(e) => setLinkedInUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                    required
                    disabled={isSubmitting}
                    className="text-base"
                  />
                </div>

                {/* CTA Button */}
                <Button 
                  type="submit" 
                  disabled={!isValid || isSubmitting} 
                  className="w-full text-base py-3.5 mt-2"
                >
                  {isSubmitting ? 'Creating Your Campaign...' : 'Create My Campaign →'}
                </Button>

                <p className="text-xs text-center text-[var(--subtle)] mt-2">
                  No credit card required • Try it free
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Value Props - Below the Fold */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mt-16 md:mt-20">
          <div className="p-6 rounded-[var(--radius-card)] bg-[var(--surface)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#50ace4] to-[#6b9eff] flex items-center justify-center mb-3">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[var(--text)]">Lightning Fast</h3>
            <p className="text-sm text-[var(--subtle)]">
              Go from zero to complete campaign in minutes with AI-powered automation
            </p>
          </div>

          <div className="p-6 rounded-[var(--radius-card)] bg-[var(--surface)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#50ace4] to-[#6b9eff] flex items-center justify-center mb-3">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[var(--text)]">Precision Targeting</h3>
            <p className="text-sm text-[var(--subtle)]">
              Get leads that match your ICP with intelligent filtering and matching
            </p>
          </div>

          <div className="p-6 rounded-[var(--radius-card)] bg-[var(--surface)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#50ace4] to-[#6b9eff] flex items-center justify-center mb-3">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[var(--text)]">Ready to Launch</h3>
            <p className="text-sm text-[var(--subtle)]">
              Everything you need - messages, leads, and outreach ready to go
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

