import { useState } from 'react'
import { CheckCircle, PlayCircle, ExternalLink, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'

interface Step9QualificationFormProps {
  onComplete: () => void
}

export function Step9QualificationForm({ onComplete }: Step9QualificationFormProps) {
  const [businessRevenue, setBusinessRevenue] = useState('')
  const [consultingInterest, setConsultingInterest] = useState(false)

  const isQualifiedForSalesCall = businessRevenue && parseFloat(businessRevenue) >= 10000

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to Tally or another form service
    onComplete()
  }

  return (
    <div className="max-w-7xl mx-auto animate-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left Column - Upsell Form */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-2 text-[var(--text)] tracking-tight">Your campaign is being prepared</h2>
          <p className="text-[var(--subtle)] font-medium mb-6">We'll send your leads to your email within the delivery window you selected.</p>
          <Card>
            <p className="text-sm text-[var(--subtle)] mb-6">Help us serve you better with a quick question:</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Revenue */}
              <div>
                <label className="block text-sm font-semibold mb-3 text-[var(--text)]">
                  What's your current monthly revenue?
                </label>
                <Select value={businessRevenue} onChange={(e) => setBusinessRevenue(e.target.value)} required>
                  <option value="">Select monthly revenue</option>
                  <option value="0">Less than $1,000</option>
                  <option value="1000">$1,000 - $4,999</option>
                  <option value="5000">$5,000 - $9,999</option>
                  <option value="10000">$10,000 - $24,999</option>
                  <option value="25000">$25,000 - $49,999</option>
                  <option value="50000">$50,000+</option>
                </Select>
              </div>

              {/* Consulting Interest */}
              <div>
                <label className="block text-sm font-semibold mb-3 text-[var(--text)]">
                  Are you interested in a personalized strategy session?
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setConsultingInterest(true)}
                    className={cn(
                      'flex-1 p-4 rounded-md transition-premium border-0 font-medium shadow-[var(--shadow-sm)]',
                      consultingInterest
                        ? 'bg-[var(--color-accent)] text-white shadow-[var(--shadow-button)]'
                        : 'bg-[#e2e6ed] text-[var(--text)] hover:bg-[#d4dae4] hover:shadow-[var(--shadow-md)]'
                    )}
                  >
                    Yes, I'm interested
                  </button>
                  <button
                    type="button"
                    onClick={() => setConsultingInterest(false)}
                    className={cn(
                      'flex-1 p-4 rounded-md transition-premium border-0 font-medium shadow-[var(--shadow-sm)]',
                      !consultingInterest
                        ? 'bg-[var(--color-accent)] text-white shadow-[var(--shadow-button)]'
                        : 'bg-[#e2e6ed] text-[var(--text)] hover:bg-[#d4dae4] hover:shadow-[var(--shadow-md)]'
                    )}
                  >
                    Not right now
                  </button>
                </div>
              </div>

              {/* Sales Call CTA for qualified users */}
              {isQualifiedForSalesCall && (
                <div className="p-6 rounded-[var(--radius-card)] bg-[var(--muted)] border-0">
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-[var(--text)]">You're qualified for a sales call!</h3>
                      <p className="text-sm text-[var(--subtle)]">
                        Based on your revenue, our full-service agency program could be a perfect fit. Let's chat.
                      </p>
                    </div>
                  </div>
                  <Button type="button" className="w-full mt-2">Book a Sales Call</Button>
                </div>
              )}

              <Button type="submit" className="w-full">Complete</Button>
            </form>
          </Card>
        </div>

        {/* Right Column - Recommended Resources */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold mb-6 text-[var(--text)]">Helpful Resources</h3>
          <Card className="sticky top-8">
            <div className="space-y-4">
              {/* Booking BUD */}
              <a
                href="#"
                className="block p-4 rounded-[var(--radius-card)] bg-[var(--surface)] hover:bg-[var(--surface)] hover:shadow-[var(--shadow-card)] transition-premium group border-0"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--muted)] flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-[var(--color-accent)]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-[var(--text)] mb-1 group-hover:text-[var(--color-accent)] transition-premium">
                      Booking BUD
                    </h4>
                    <p className="text-xs text-[var(--subtle)] mb-2">
                      Manage full campaigns on autopilot with AI. Use your lead list seamlessly.
                    </p>
                    <span className="text-xs font-medium text-[var(--color-accent)] flex items-center gap-1">
                      Learn more
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </a>

              {/* LinkedIn Strategy Videos */}
              <a
                href="#"
                className="block p-4 rounded-[var(--radius-card)] bg-[var(--surface)] hover:bg-[var(--surface)] hover:shadow-[var(--shadow-card)] transition-premium group border-0"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--muted)] flex items-center justify-center flex-shrink-0">
                    <PlayCircle className="w-5 h-5 text-[var(--color-accent)]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-[var(--text)] mb-1 group-hover:text-[var(--color-accent)] transition-premium">
                      LinkedIn Outreach Strategy
                    </h4>
                    <p className="text-xs text-[var(--subtle)] mb-2">
                      Master the art of LinkedIn outreach with proven tactics.
                    </p>
                    <span className="text-xs font-medium text-[var(--color-accent)] flex items-center gap-1">
                      Watch video
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </a>

              <a
                href="#"
                className="block p-4 rounded-[var(--radius-card)] bg-[var(--surface)] hover:bg-[var(--surface)] hover:shadow-[var(--shadow-card)] transition-premium group border-0"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--muted)] flex items-center justify-center flex-shrink-0">
                    <PlayCircle className="w-5 h-5 text-[var(--color-accent)]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-[var(--text)] mb-1 group-hover:text-[var(--color-accent)] transition-premium">
                      Building Your ICP
                    </h4>
                    <p className="text-xs text-[var(--subtle)] mb-2">
                      Learn how to refine your ideal customer profile for better targeting.
                    </p>
                    <span className="text-xs font-medium text-[var(--color-accent)] flex items-center gap-1">
                      Watch video
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </a>

              <a
                href="#"
                className="block p-4 rounded-[var(--radius-card)] bg-[var(--surface)] hover:bg-[var(--surface)] hover:shadow-[var(--shadow-card)] transition-premium group border-0"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--muted)] flex items-center justify-center flex-shrink-0">
                    <PlayCircle className="w-5 h-5 text-[var(--color-accent)]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-[var(--text)] mb-1 group-hover:text-[var(--color-accent)] transition-premium">
                      Message Personalization Tips
                    </h4>
                    <p className="text-xs text-[var(--subtle)] mb-2">
                      Create compelling messages that get responses.
                    </p>
                    <span className="text-xs font-medium text-[var(--color-accent)] flex items-center gap-1">
                      Watch video
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

