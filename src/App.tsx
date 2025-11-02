import { useState } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { CampaignProvider } from './contexts/CampaignContext'
import { Sidenav } from './components/Sidenav'
import { SectionHeader } from './components/ui/SectionHeader'
import { Button } from './components/ui/Button'
import { Card } from './components/ui/Card'
import { StepIndicator } from './components/StepIndicator'
import { Step1ProfileInput } from './components/steps/Step1ProfileInput'
import { Step2StrategySelection } from './components/steps/Step2StrategySelection'
import { Step3SampleProfile } from './components/steps/Step3SampleProfile'
import { Step4ICPRefinement } from './components/steps/Step4ICPRefinement'
import { Step5MessageGeneration } from './components/steps/Step5MessageGeneration'
import { Step6MessageSelection } from './components/steps/Step6MessageSelection'
import { Step7SampleLeads } from './components/steps/Step7SampleLeads'
import { Step8OrderPlacement } from './components/steps/Step8OrderPlacement'
import { Step9QualificationForm } from './components/steps/Step9QualificationForm'

const TOTAL_STEPS = 9

function AppContent() {
  const [currentStep, setCurrentStep] = useState(1)

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
        return <Step6MessageSelection onNext={handleNext} onBack={handleBack} />
      case 7:
        return <Step7SampleLeads onNext={handleNext} onBack={handleBack} />
      case 8:
        return <Step8OrderPlacement onNext={handleNext} onBack={handleBack} />
      case 9:
        return <Step9QualificationForm onComplete={() => alert('Campaign submitted successfully! 🎉')} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex">
      <Sidenav />
      <main className="flex-1 ml-[260px] p-8">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            title="Campaign Builder"
            subtitle="Create and preview your outreach assets"
            actions={
              <div className="flex items-center gap-2">
                <Button variant="secondary">Help</Button>
                <Button>Export</Button>
              </div>
            }
          />

          <Card className="mb-6">
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
      <CampaignProvider>
        <AppContent />
      </CampaignProvider>
    </ThemeProvider>
  )
}

export default App
