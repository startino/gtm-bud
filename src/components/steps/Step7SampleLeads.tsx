import { useState, useEffect } from 'react'
import { useCampaign } from '@/contexts/CampaignContext'
import { mockSampleLeads } from '@/lib/mockData'
import { CheckCircle } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface Step7SampleLeadsProps {
  onNext: () => void
  onBack: () => void
}

export function Step7SampleLeads({ onNext, onBack }: Step7SampleLeadsProps) {
  const { updateState } = useCampaign()
  const [isLoading, setIsLoading] = useState(true)
  const [leads] = useState(mockSampleLeads)

  useEffect(() => {
    const timer = setTimeout(() => {
      updateState({ sampleLeads: leads })
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [updateState, leads])

  if (isLoading) {
    return (
      <Card className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-1 text-[var(--text)]">Finding your best leads</h2>
        <p className="text-[var(--subtle)] mb-6">
          Searching for qualified prospects matching your ICP...
        </p>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)]"></div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-1 text-[var(--text)]">Sample leads ready</h2>
      <p className="text-[var(--subtle)] mb-6">
        Here are 6 example prospects that match your criteria. Your full list will be delivered within 24 hours.
      </p>

      <div className="space-y-3 mb-6">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="p-5 rounded-[var(--radius-card)] bg-[var(--surface)] transition-all shadow-[var(--shadow-card)] border-0"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text)]">{lead.name}</h3>
                <p className="text-sm text-[var(--subtle)]">{lead.title} • {lead.company}</p>
              </div>
              {lead.hasOpenInMail && (
                <span className="px-3 py-1 text-xs font-semibold bg-[var(--color-accent)] text-white rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Open InMail
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 text-xs bg-[var(--muted)] rounded border-0">{lead.industry}</span>
              <span className="px-2 py-1 text-xs bg-[var(--muted)] rounded border-0">{lead.companySize}</span>
              <span className="px-2 py-1 text-xs bg-[var(--muted)] rounded border-0">{lead.location}</span>
            </div>
            <div className="p-4 rounded-lg bg-[var(--muted)] text-sm text-[var(--subtle)] whitespace-pre-line border-0">
              {lead.message}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="secondary" onClick={onBack} className="flex-1">Back</Button>
        <Button onClick={onNext} className="flex-1">Order Full Campaign</Button>
      </div>
    </Card>
  )
}

