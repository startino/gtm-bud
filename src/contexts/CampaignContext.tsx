import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { mockICPAttributes } from '@/lib/mockData'
import type { Strategy, ICPAttribute, Message, SampleLead } from '@/lib/mockData'

interface CampaignState {
  // Step 1
  linkedInUrl: string
  website: string
  
  // Step 2
  selectedStrategy: Strategy | null
  
  // Step 3
  sampleProfileUrl: string
  sampleProfileUrls: string[]
  
  // Step 4
  icpAttributes: ICPAttribute[]
  icpCriteria: string[]
  
  // Step 5
  generatedMessages: Message[]
  selectedMessage: Message | null
  selectedMessageTone: 'casual' | 'professional' | 'value-first' | null
  
  // Step 7
  sampleLeads: SampleLead[]
  
  // Step 8
  email: string
  quantity: number
  deliverySpeed: 'standard' | 'rush'
  
  // Step 9
  businessRevenue: string
  consultingInterest: boolean
}

interface CampaignContextType {
  state: CampaignState
  updateState: (updates: Partial<CampaignState>) => void
  resetCampaign: () => void
}

const initialState: CampaignState = {
  linkedInUrl: '',
  website: '',
  selectedStrategy: null,
  sampleProfileUrl: '',
  sampleProfileUrls: [],
  icpAttributes: mockICPAttributes,
  icpCriteria: [],
  generatedMessages: [],
  selectedMessage: null,
  selectedMessageTone: null,
  sampleLeads: [],
  email: '',
  quantity: 100,
  deliverySpeed: 'standard',
  businessRevenue: '',
  consultingInterest: false,
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined)

export function CampaignProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CampaignState>(() => {
    // Load from localStorage on mount
    try {
      const stored = localStorage.getItem('gtm-bud-campaign-data')
      if (stored) {
        return { ...initialState, ...JSON.parse(stored) }
      }
    } catch (e) {
      console.error('Failed to load campaign data from localStorage:', e)
    }
    return initialState
  })

  // Persist to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem('gtm-bud-campaign-data', JSON.stringify(state))
    } catch (e) {
      console.error('Failed to save campaign data to localStorage:', e)
    }
  }, [state])

  const updateState = (updates: Partial<CampaignState>) => {
    setState((prev) => ({ ...prev, ...updates }))
  }

  const resetCampaign = () => {
    setState(initialState)
    localStorage.removeItem('gtm-bud-campaign-data')
  }

  return (
    <CampaignContext.Provider value={{ state, updateState, resetCampaign }}>
      {children}
    </CampaignContext.Provider>
  )
}

export function useCampaign() {
  const context = useContext(CampaignContext)
  if (context === undefined) {
    throw new Error('useCampaign must be used within a CampaignProvider')
  }
  return context
}

