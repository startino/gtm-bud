import { useState, useRef, useEffect } from 'react'
import { useCampaign } from '@/contexts/CampaignContext'
import { Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Toggle } from '@/components/ui/Toggle'
import { getCriteriaSuggestions } from '@/lib/mockData'

interface Step4ICPRefinementProps {
  onNext: () => void
  onBack: () => void
}

interface Criterion {
  id: string
  text: string
  mustHave: boolean
}

export function Step4ICPRefinement({ onNext, onBack }: Step4ICPRefinementProps) {
  const { state, updateState } = useCampaign()
  
  // Initialize criteria from existing ICP attributes or use defaults
  const initialCriteria: Criterion[] = state.icpCriteria && state.icpCriteria.length > 0
    ? state.icpCriteria.map((text, idx) => ({
        id: `criterion-${idx}`,
        text,
        mustHave: true,
      }))
    : [
        { id: '1', text: 'currently founder of an agency established before november 2020', mustHave: true },
        { id: '2', text: 'agency annual revenue is between $500,000 and $10,000,000', mustHave: true },
        { id: '3', text: 'founder is at least 35 years old', mustHave: false },
      ]

  const [criteria, setCriteria] = useState<Criterion[]>(initialCriteria)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestionInput, setSuggestionInput] = useState('')
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const urls = state.sampleProfileUrls || (state.sampleProfileUrl ? [state.sampleProfileUrl] : [])

  useEffect(() => {
    const suggestions = getCriteriaSuggestions(urls)
    if (suggestionInput.trim()) {
      const filtered = suggestions.filter(s => 
        s.toLowerCase().includes(suggestionInput.toLowerCase())
      )
      setFilteredSuggestions(filtered.length > 0 ? filtered : suggestions)
    } else {
      setFilteredSuggestions(suggestions)
    }
  }, [suggestionInput, urls])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleAddCriteria = (text?: string) => {
    const criterionText = text || suggestionInput.trim()
    if (!criterionText) return

    const newCriterion: Criterion = {
      id: `criterion-${Date.now()}`,
      text: criterionText,
      mustHave: true,
    }
    setCriteria([...criteria, newCriterion])
    setSuggestionInput('')
    setShowSuggestions(false)
  }

  const handleRemoveCriteria = (id: string) => {
    setCriteria(criteria.filter(c => c.id !== id))
  }

  const handleToggleMustHave = (id: string) => {
    setCriteria(criteria.map(c => 
      c.id === id ? { ...c, mustHave: !c.mustHave } : c
    ))
  }

  const handleSelectSuggestion = (suggestion: string) => {
    handleAddCriteria(suggestion)
  }

  const handleNext = () => {
    const criteriaTexts = criteria.map(c => c.text)
    updateState({ icpCriteria: criteriaTexts })
    onNext()
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2 text-[var(--text)] tracking-tight">Define your ideal customer profile</h2>
      <p className="text-[var(--subtle)] mb-8 font-medium">
        Add criteria in plain English that describe your ideal prospects.
      </p>

      {/* Criteria List */}
      <div className="space-y-3 mb-6">
        {criteria.map((criterion) => {
          return (
          <div
              key={criterion.id}
            className={cn(
                'p-5 rounded-[var(--radius-card)] transition-premium',
                criterion.mustHave
                  ? 'bg-[var(--color-accent-light)] shadow-[var(--shadow-sm)]'
                  : 'bg-[var(--muted)]'
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                  <p className="text-sm font-medium text-[var(--text)] mb-4">
                    {criterion.text}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      'text-xs font-medium transition-premium',
                      !criterion.mustHave ? 'text-[var(--text)]' : 'text-[var(--subtle)]'
                    )}>
                      Nice-to-have
                    </span>
                    <Toggle
                      checked={criterion.mustHave}
                      onChange={() => handleToggleMustHave(criterion.id)}
                    />
                    <span className={cn(
                      'text-xs font-medium transition-premium',
                      criterion.mustHave ? 'text-[var(--color-accent)]' : 'text-[var(--subtle)]'
                    )}>
                      Must-have
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleRemoveCriteria(criterion.id)}
                    className="p-2 rounded-lg bg-[var(--surface)] hover:bg-red-100 dark:hover:bg-red-900/20 text-[var(--subtle)] hover:text-red-600 transition-premium"
                    title="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Add Criteria */}
      <div className="relative mb-6">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              type="text"
              value={suggestionInput}
              onChange={(e) => {
                setSuggestionInput(e.target.value)
                setShowSuggestions(true)
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Type or select a criteria..."
              className="pr-10"
            />
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute z-10 w-full mt-2 bg-[var(--surface)] rounded-[var(--radius-card)] shadow-[var(--shadow-lg)] max-h-60 overflow-y-auto"
              >
                {filteredSuggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSuggestion(suggestion)}
                    className="w-full text-left px-4 py-3 text-sm text-[var(--text)] hover:bg-[var(--muted)] transition-premium first:rounded-t-[var(--radius-card)] last:rounded-b-[var(--radius-card)]"
                  >
                    {suggestion}
              </button>
                ))}
            </div>
            )}
          </div>
          <Button
            type="button"
            onClick={() => handleAddCriteria()}
            disabled={!suggestionInput.trim()}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="secondary" onClick={onBack} className="flex-1">Back</Button>
        <Button onClick={handleNext} disabled={criteria.length === 0} className="flex-1">Continue</Button>
      </div>
    </Card>
  )
}
