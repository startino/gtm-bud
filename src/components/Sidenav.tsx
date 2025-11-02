import { useTheme } from '@/contexts/ThemeContext'
import { Sparkles, Moon, Sun } from 'lucide-react'

const campaigns = [
  'SaaS Founders Q1',
  'Marketing Agencies',
  'Consultants Dec 2024',
  'Tech Startups',
]

export function Sidenav() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="fixed left-0 top-0 h-full w-[280px] bg-[var(--color-primary)] border-r border-[var(--color-card)] flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[var(--color-card)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">GTM Bud</h1>
            <p className="text-xs text-[var(--color-text-muted)]">AI Outreach</p>
          </div>
        </div>
      </div>

      {/* Campaigns Section */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
          Campaigns
        </h2>
        <nav className="space-y-2">
          {campaigns.map((campaign) => (
            <button
              key={campaign}
              className="w-full text-left px-4 py-3 rounded-lg text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-card)] hover:text-white transition-colors"
            >
              {campaign}
            </button>
          ))}
        </nav>
      </div>

      {/* Profile & Theme Toggle */}
      <div className="p-6 border-t border-[var(--color-card)] space-y-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[var(--color-card)] transition-colors group"
        >
          {theme === 'dark' ? (
            <Moon className="w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors" />
          ) : (
            <Sun className="w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors" />
          )}
          <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-white transition-colors">
            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </span>
        </button>

        {/* Profile Button */}
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[var(--color-card)] transition-colors group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] flex items-center justify-center text-white font-semibold">
            JD
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-white">John Doe</p>
            <p className="text-xs text-[var(--color-text-muted)]">john@example.com</p>
          </div>
        </button>
      </div>
    </div>
  )
}

