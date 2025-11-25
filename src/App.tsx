import { useState, useEffect } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { CampaignProvider, useCampaign } from './contexts/CampaignContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { LandingPage } from './components/LandingPage'
import { GTMBudLandingPage } from './components/GTMBudLandingPage'
import { Sidenav } from './components/Sidenav'
import { Card } from './components/ui/Card'
import { StepIndicator } from './components/StepIndicator'
import { Step1ProfileInput } from './components/steps/Step1ProfileInput'
import { Step2StrategySelection } from './components/steps/Step2StrategySelection'
import { Step3SampleProfile } from './components/steps/Step3SampleProfile'
import { Step4ICPRefinement } from './components/steps/Step4ICPRefinement'
import { Step5MessageGeneration } from './components/steps/Step5MessageGeneration'
import { Step7SampleLeads } from './components/steps/Step7SampleLeads'
import { Step8OrderPlacement } from './components/steps/Step8OrderPlacement'
import { Step9QualificationForm } from './components/steps/Step9QualificationForm'

const TOTAL_STEPS = 8

function AppContent() {
  const { state, updateState } = useCampaign()
  const { isAnonymous, setAnonymous } = useAuth()
  const [isEarlyAccess, setIsEarlyAccess] = useState(false)
  
  useEffect(() => {
    // Check if we're on the /early-access route
    // The 404.html script converts query string back to pathname before React loads
    const pathname = window.location.pathname
    setIsEarlyAccess(
      pathname === '/early-access' || 
      pathname === '/gtm-bud/early-access' || 
      pathname.endsWith('/early-access') ||
      window.location.search.includes('/early-access')
    )
  }, [])

  const [currentStep, setCurrentStep] = useState(() => {
    // Start at step 2 if user is anonymous (they already provided profile info)
    return isAnonymous && state.linkedInUrl && state.website ? 2 : 1
  })
  const [showLanding, setShowLanding] = useState(() => {
    // Show landing page if user has no data (first visit)
    return !state.linkedInUrl && !state.website
  })

  const handleLandingSubmit = (website: string, linkedInUrl: string) => {
    // Mark as anonymous and store the data
    setAnonymous(true)
    updateState({ website, linkedInUrl })
    setShowLanding(false)
    setCurrentStep(2) // Skip Step 1, start at Step 2
  }

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleStepClick = (step: number) => {
    setCurrentStep(step)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1ProfileInput onNext={handleNext} />
      case 2:
        return <Step2StrategySelection onNext={handleNext} onBack={handleBack} />
      case 3:
        return <Step3SampleProfile onNext={handleNext} onBack={handleBack} />
      case 4:
        return <Step4ICPRefinement onNext={handleNext} onBack={handleBack} />
      case 5:
        return <Step5MessageGeneration onNext={handleNext} onBack={handleBack} />
      case 6:
        return <Step7SampleLeads onNext={handleNext} onBack={handleBack} />
      case 7:
        return <Step8OrderPlacement onNext={handleNext} onBack={handleBack} />
      case 8:
        return <Step9QualificationForm onComplete={() => alert('Campaign submitted successfully! 🎉')} />
      default:
        return null
    }
  }

  // Show early access landing page
  if (isEarlyAccess) {
    return <GTMBudLandingPage />
  }

  // Show landing page
  if (showLanding) {
    return <LandingPage onSubmit={handleLandingSubmit} />
  }

  // Show main campaign builder
  return (
    <div className="min-h-screen flex">
      <Sidenav />
      <main className="flex-1 ml-[260px] p-8 lg:p-12">
        <div className="max-w-[1200px] mx-auto">
          <Card className="mb-8">
            <StepIndicator
              currentStep={currentStep}
              totalSteps={TOTAL_STEPS}
              onStepClick={handleStepClick}
            />
          </Card>

          <div className="animate-in fade-in duration-300">
            {renderStep()}
          </div>
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CampaignProvider>
          <AppContent />
        </CampaignProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
