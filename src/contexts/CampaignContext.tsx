import { createContext, useContext, useState } from 'react'
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
  
  // Step 4
  icpAttributes: ICPAttribute[]
  
  // Step 5 & 6
  generatedMessages: Message[]
  selectedMessageTone: 'casual' | 'professional' | 'value-first' | null
  
  // Step 7
  sampleLeads: SampleLead[]
  
  // Step 8
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
  icpAttributes: mockICPAttributes,
  generatedMessages: [],
  selectedMessageTone: null,
  sampleLeads: [],
  quantity: 100,
  deliverySpeed: 'standard',
  businessRevenue: '',
  consultingInterest: false,
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined)

export function CampaignProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CampaignState>(initialState)

  const updateState = (updates: Partial<CampaignState>) => {
    setState((prev) => ({ ...prev, ...updates }))
  }

  const resetCampaign = () => {
    setState(initialState)
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

