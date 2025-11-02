import { useState, useEffect } from 'react'
import { useCampaign } from '@/contexts/CampaignContext'
import { mockSampleLeads } from '@/lib/mockData'
import { CheckCircle } from 'lucide-react'

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
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">Finding your best leads</h2>
        <p className="text-[var(--color-text-secondary)] mb-8">
          Searching for qualified prospects matching your ICP...
        </p>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)]"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">Sample leads ready</h2>
      <p className="text-[var(--color-text-secondary)] mb-8">
        Here are 6 example prospects that match your criteria. Your full list will be delivered within 24 hours.
      </p>

      <div className="space-y-4 mb-8">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="p-6 rounded-xl border border-[var(--color-card)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold">{lead.name}</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">{lead.title} • {lead.company}</p>
              </div>
              {lead.hasOpenInMail && (
                <span className="px-3 py-1 text-xs font-semibold bg-[var(--color-accent)] text-white rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Open InMail
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 text-xs bg-[var(--color-card)] rounded">{lead.industry}</span>
              <span className="px-2 py-1 text-xs bg-[var(--color-card)] rounded">{lead.companySize}</span>
              <span className="px-2 py-1 text-xs bg-[var(--color-card)] rounded">{lead.location}</span>
            </div>
            <div className="p-4 rounded-lg bg-[var(--color-card)] text-sm text-[var(--color-text-secondary)] whitespace-pre-line">
              {lead.message}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-3 px-6 rounded-lg font-semibold bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-card)] transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-3 px-6 rounded-lg font-semibold bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)] text-white hover:shadow-lg hover:shadow-[var(--color-accent)]/30 hover:scale-[1.02] transition-all"
        >
          Order Full Campaign
        </button>
      </div>
    </div>
  )
}

