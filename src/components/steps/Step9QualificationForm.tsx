import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
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
  const [additionalInfo, setAdditionalInfo] = useState('')

  const isQualifiedForSalesCall = businessRevenue && parseFloat(businessRevenue) >= 10000

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to Tally or another form service
    onComplete()
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-1 text-[var(--text)]">Thank you! 🎉</h2>
      <p className="text-[var(--subtle)] mb-6">Your campaign is being prepared. Help us serve you better with a quick question:</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Revenue */}
        <div>
          <label className="block text-sm font-medium mb-2">
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
            className="w-full px-4 py-3 rounded-[var(--radius-ctl)] bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--subtle)] focus:outline-none focus:ring-4 focus:ring-[color:rgb(80_172_228_/_20%)] transition-all resize-none"
            placeholder="Optional..."
          />
        </div>

        {/* Sales Call CTA for qualified users */}
        {isQualifiedForSalesCall && (
          <div className="p-6 rounded-[var(--radius-card)] bg-[var(--muted)] border border-[var(--border)]">
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
  )
}

