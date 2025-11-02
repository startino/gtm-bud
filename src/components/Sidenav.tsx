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
    <div className="fixed left-0 top-0 h-full w-[260px] bg-[var(--surface)]/80 backdrop-blur flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--muted)] flex items-center justify-center border-0">
            <Sparkles className="w-5 h-5 text-[var(--color-accent)]" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-[var(--text)]">GTM Bud</h1>
            <p className="text-xs text-[var(--subtle)]">AI Outreach</p>
          </div>
        </div>
      </div>

      {/* Campaigns Section */}
      <div className="flex-1 p-5 overflow-y-auto">
        <h2 className="text-xs font-semibold text-[var(--subtle)] uppercase tracking-wider mb-3">
          Campaigns
        </h2>
        <nav className="space-y-2">
          {campaigns.map((campaign) => (
            <button
              key={campaign}
              className="w-full text-left px-4 py-2.5 rounded-full text-sm text-[var(--text)] hover:bg-[var(--muted)] border-0 transition-colors"
            >
              {campaign}
            </button>
          ))}
        </nav>
      </div>

      {/* Profile & Theme Toggle */}
      <div className="p-5 space-y-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full hover:bg-[var(--muted)] transition-colors group border-0"
        >
          {theme === 'dark' ? (
            <Moon className="w-5 h-5 text-[var(--subtle)] group-hover:text-[var(--color-accent)] transition-colors" />
          ) : (
            <Sun className="w-5 h-5 text-[var(--subtle)] group-hover:text-[var(--color-accent)] transition-colors" />
          )}
          <span className="text-sm text-[var(--text)] transition-colors">
            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </span>
        </button>

        {/* Profile Button */}
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full hover:bg-[var(--muted)] transition-colors group border-0">
          <div className="w-8 h-8 rounded-full bg-[var(--muted)] flex items-center justify-center text-[var(--text)] font-semibold border-0">
            JD
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-[var(--text)]">John Doe</p>
            <p className="text-xs text-[var(--subtle)]">john@example.com</p>
          </div>
        </button>
      </div>
    </div>
  )
}

