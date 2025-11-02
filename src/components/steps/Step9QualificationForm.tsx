import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Step9QualificationFormProps {
  onComplete: () => void
}

export function Step9QualificationForm({ onComplete }: Step9QualificationFormProps) {
  const [businessRevenue, setBusinessRevenue] = useState('')
  const [consultingInterest, setConsultingInterest] = useState(false)
  const [additionalInfo, setAdditionalInfo] = useState('')

  const isQualifiedForSalesCall = businessRevenue && parseFloat(businessRevenue) >= 10000

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to Tally or another form service
    onComplete()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">Thank you! 🎉</h2>
      <p className="text-[var(--color-text-secondary)] mb-8">
        Your campaign is being prepared. Help us serve you better with a quick question:
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Revenue */}
        <div>
          <label className="block text-sm font-medium mb-2">
            What's your current monthly revenue?
          </label>
          <select
            value={businessRevenue}
            onChange={(e) => setBusinessRevenue(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-card)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
            required
          >
            <option value="">Select monthly revenue</option>
            <option value="0">Less than $1,000</option>
            <option value="1000">$1,000 - $4,999</option>
            <option value="5000">$5,000 - $9,999</option>
            <option value="10000">$10,000 - $24,999</option>
            <option value="25000">$25,000 - $49,999</option>
            <option value="50000">$50,000+</option>
          </select>
        </div>

        {/* Consulting Interest */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Are you interested in a personalized strategy session?
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setConsultingInterest(true)}
              className={cn(
                'flex-1 p-4 rounded-lg border-2 transition-all',
                consultingInterest
                  ? 'border-[var(--color-accent)] bg-[var(--color-card)]'
                  : 'border-[var(--color-card)] hover:border-[var(--color-accent)]/50'
              )}
            >
              Yes, I'm interested
            </button>
            <button
              type="button"
              onClick={() => setConsultingInterest(false)}
              className={cn(
                'flex-1 p-4 rounded-lg border-2 transition-all',
                !consultingInterest
                  ? 'border-[var(--color-accent)] bg-[var(--color-card)]'
                  : 'border-[var(--color-card)] hover:border-[var(--color-accent)]/50'
              )}
            >
              Not right now
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Anything else you'd like us to know?
          </label>
          <textarea
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-card)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all resize-none"
            placeholder="Optional..."
          />
        </div>

        {/* Sales Call CTA for qualified users */}
        {isQualifiedForSalesCall && (
          <div className="p-6 rounded-xl bg-gradient-to-r from-[var(--color-accent)]/20 to-[var(--color-primary)]/20 border-2 border-[var(--color-accent)]">
            <div className="flex items-start gap-3 mb-3">
              <CheckCircle className="w-6 h-6 text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-lg mb-1">You're qualified for a sales call!</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Based on your revenue, our full-service agency program could be a perfect fit. Let's chat.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="w-full mt-4 py-3 px-6 rounded-lg font-semibold bg-[var(--color-accent)] text-white hover:shadow-lg hover:shadow-[var(--color-accent)]/30 transition-all"
            >
              Book a Sales Call
            </button>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 px-6 rounded-lg font-semibold bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)] text-white hover:shadow-lg hover:shadow-[var(--color-accent)]/30 hover:scale-[1.02] transition-all"
        >
          Complete
        </button>
      </form>
    </div>
  )
}

