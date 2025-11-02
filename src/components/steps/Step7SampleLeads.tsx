import { useState, useEffect } from 'react'
import { useCampaign } from '@/contexts/CampaignContext'
import { useAuth } from '@/contexts/AuthContext'
import { mockSampleLeads } from '@/lib/mockData'
import { CheckCircle, Linkedin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { SignInModal } from '@/components/SignInModal'

interface Step7SampleLeadsProps {
  onNext: () => void
  onBack: () => void
}

export function Step7SampleLeads({ onNext, onBack }: Step7SampleLeadsProps) {
  const { updateState } = useCampaign()
  const { isAuthenticated, isAnonymous } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [leads] = useState(mockSampleLeads)
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null)
  const [showSignInModal, setShowSignInModal] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      updateState({ sampleLeads: leads })
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [updateState, leads])

  useEffect(() => {
    if (!selectedLeadId && leads.length > 0) {
      setSelectedLeadId(leads[0].id)
    }
  }, [leads, selectedLeadId])

  const selectedLead = leads.find(l => l.id === selectedLeadId) || leads[0]

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

  const handleOrderClick = () => {
    // If anonymous user, show sign-in modal first
    if (isAnonymous && !isAuthenticated) {
      setShowSignInModal(true)
    } else {
      onNext()
    }
  }

  return (
    <>
    <div className="max-w-7xl mx-auto">
      <Card className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-[var(--text)] tracking-tight">Sample leads ready</h2>
        <p className="text-[var(--subtle)] font-medium">
          Here are {leads.length} example prospects that match your criteria. Your full list will be delivered within 24 hours.
        </p>
      </Card>

      <div className="flex gap-6">
        {/* Left Panel - Lead Details */}
        <Card className="w-[400px] flex-shrink-0 h-fit sticky top-8">
          {selectedLead && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-[var(--text)] mb-1">{selectedLead.name}</h3>
                <p className="text-sm text-[var(--subtle)] mb-4">{selectedLead.title} • {selectedLead.company}</p>
                {selectedLead.hasOpenInMail && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-[var(--color-accent)] text-white rounded-full">
                    <CheckCircle className="w-3 h-3" />
                    Open InMail Available
                  </span>
                )}
              </div>

              <div className="space-y-3 pt-4 border-t border-[var(--border-subtle)]">
                <div>
                  <p className="text-xs font-semibold text-[var(--subtle)] uppercase tracking-wider mb-2">Industry</p>
                  <p className="text-sm text-[var(--text)] font-medium">{selectedLead.industry}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--subtle)] uppercase tracking-wider mb-2">Company Size</p>
                  <p className="text-sm text-[var(--text)] font-medium">{selectedLead.companySize}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--subtle)] uppercase tracking-wider mb-2">Location</p>
                  <p className="text-sm text-[var(--text)] font-medium">{selectedLead.location}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)]">
                <p className="text-xs font-semibold text-[var(--subtle)] uppercase tracking-wider mb-3">Personalized Message</p>
                <div className="p-4 rounded-[var(--radius-sm)] bg-[var(--muted)] text-sm text-[var(--text)] whitespace-pre-line">
                  {selectedLead.message}
                </div>
              </div>

              <div className="pt-4">
                <Button variant="secondary" className="w-full">
                  <Linkedin className="w-4 h-4 mr-2" />
                  View LinkedIn Profile
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Right Panel - Leads List */}
        <div className="flex-1">
          <div className="space-y-3 mb-6">
            {leads.map((lead) => {
              const isSelected = lead.id === selectedLeadId
              return (
                <button
                  key={lead.id}
                  onClick={() => setSelectedLeadId(lead.id)}
                  className={cn(
                    'w-full p-5 rounded-[var(--radius-card)] bg-[var(--surface)] transition-premium text-left border-0',
                    isSelected
                      ? 'shadow-[var(--shadow-card-hover)] border-2 border-[var(--color-accent)]'
                      : 'hover:shadow-[var(--shadow-card)] border border-[var(--border-subtle)]'
                  )}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text)] mb-1">{lead.name}</h3>
                      <p className="text-sm text-[var(--subtle)]">{lead.title} • {lead.company}</p>
                    </div>
                    {lead.hasOpenInMail && (
                      <span className="px-3 py-1 text-xs font-semibold bg-[var(--color-accent)] text-white rounded-full flex items-center gap-1 flex-shrink-0 ml-4">
                        <CheckCircle className="w-3 h-3" />
                        Open InMail
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 text-xs bg-[var(--muted)] rounded border-0">{lead.industry}</span>
                    <span className="px-2 py-1 text-xs bg-[var(--muted)] rounded border-0">{lead.companySize}</span>
                    <span className="px-2 py-1 text-xs bg-[var(--muted)] rounded border-0">{lead.location}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[var(--muted)] text-sm text-[var(--subtle)] whitespace-pre-line line-clamp-3 border-0">
                    {lead.message}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={onBack} className="flex-1">Back</Button>
            <Button onClick={handleOrderClick} className="flex-1">Order Full Campaign</Button>
          </div>
        </div>
      </div>
    </div>
    {showSignInModal && (
      <SignInModal
        onClose={() => setShowSignInModal(false)}
        onSuccess={onNext}
      />
    )}
    </>
  )
}

