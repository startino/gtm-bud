import { useTheme } from '@/contexts/ThemeContext'
import { useCampaign } from '@/contexts/CampaignContext'
import { Sparkles, Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

function generateCampaignName(state: ReturnType<typeof useCampaign>['state']): string {
  // Generate name based on campaign data
  if (state.selectedStrategy?.title) {
    const strategyTitle = state.selectedStrategy.title.toLowerCase()
    // Extract key words from strategy title
    const words = strategyTitle.split(' ')
    if (words.length > 0) {
      const firstWord = words[0].charAt(0).toUpperCase() + words[0].slice(1)
      return `${firstWord} Campaign`
    }
  }
  
  if (state.icpCriteria && state.icpCriteria.length > 0) {
    // Try to extract something from ICP criteria
    const firstCriterion = state.icpCriteria[0].toLowerCase()
    if (firstCriterion.includes('founder')) {
      return 'Founders Campaign'
    } else if (firstCriterion.includes('agency')) {
      return 'Agencies Campaign'
    } else if (firstCriterion.includes('consultant')) {
      return 'Consultants Campaign'
    }
  }
  
  // Default name
  return 'New Campaign'
}

export function Sidenav() {
  const { theme, toggleTheme } = useTheme()
  const { state } = useCampaign()
  const campaignName = generateCampaignName(state)

  return (
    <div className="fixed left-0 top-0 h-full w-[260px] glass border-r border-[var(--border-subtle)] flex flex-col z-10">
      {/* Logo */}
      <div className="px-6 py-7 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[#6b9eff] flex items-center justify-center shadow-[var(--shadow-sm)] transition-premium hover:scale-105">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[var(--text)] tracking-tight">GTM Bud</h1>
            <p className="text-xs text-[var(--subtle)] font-semibold">AI Outreach</p>
          </div>
        </div>
      </div>

      {/* Campaigns Section */}
      <div className="flex-1 px-5 py-6 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-xs font-bold text-[var(--subtle)] uppercase tracking-wider mb-4 px-2">
          Campaign
        </h2>
          <nav className="space-y-1">
            <button
              className="w-full text-left px-3 py-2.5 rounded-[var(--radius-sm)] text-sm font-medium bg-[var(--muted)] text-[var(--color-accent)] shadow-[var(--shadow-sm)] border-0 transition-premium"
            >
              {campaignName}
            </button>
          </nav>
        </div>
      </div>

      {/* Profile & Theme Toggle */}
      <div className="px-5 py-5 space-y-2 border-t border-[var(--border-subtle)] bg-[var(--surface)]/30">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-[var(--radius-sm)] hover:bg-[var(--muted)] transition-premium group border-0 hover:shadow-[var(--shadow-sm)]"
        >
          {theme === 'dark' ? (
            <Moon className="w-5 h-5 text-[var(--subtle)] group-hover:text-[var(--color-accent)] transition-premium" />
          ) : (
            <Sun className="w-5 h-5 text-[var(--subtle)] group-hover:text-[var(--color-accent)] transition-premium" />
          )}
          <span className="text-sm font-medium text-[var(--text)]">
            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </span>
        </button>

        {/* Profile Button */}
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-[var(--radius-sm)] hover:bg-[var(--muted)] transition-premium group border-0 hover:shadow-[var(--shadow-sm)]">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[#6b9eff] flex items-center justify-center text-white font-semibold shadow-[var(--shadow-sm)]">
            JD
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold text-[var(--text)]">John Doe</p>
            <p className="text-xs text-[var(--subtle)]">john@example.com</p>
          </div>
        </button>
      </div>
    </div>
  )
}

