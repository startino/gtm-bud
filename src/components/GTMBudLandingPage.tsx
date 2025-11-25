import { Linkedin, Globe, CheckCircle2, ArrowRight, Download, Upload, X, Heart, Zap, Target, Rocket, Shield } from 'lucide-react'
import { Button } from './ui/Button'
import { Card, CardContent } from './ui/Card'
import { Input } from './ui/Input'

export function GTMBudLandingPage() {
  const tallyFormUrl = 'https://tally.so/r/Zjjl0V'

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--bg-gradient)] to-[var(--bg)]">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[var(--text)] leading-[1.2] py-1">
            Book 3 Sales Calls Per Week
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#50ace4] to-[#6b9eff] block mt-2 py-1">
              Without an Agency
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--subtle)] max-w-3xl mx-auto mb-8">
            GTM Bud is an AI co-pilot that generates ready-to-execute LinkedIn outreach campaigns. 
            Uses the same proven Value Offer Strategy™ that books 3 calls per week for our agency clients.
          </p>

          {/* CTA */}
          <div className="flex justify-center items-center mb-6">
            <a
              href={tallyFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md px-8 py-4 text-lg font-semibold transition-premium bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] hover:shadow-[var(--shadow-button)] hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              Get Early Access
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>

          {/* Guarantee Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-light)] border border-[var(--color-accent)]/30">
            <Shield className="w-4 h-4 text-[var(--color-accent)]" />
            <span className="text-sm font-medium text-[var(--text)]">
              3 meetings guaranteed or full refund + personal help
            </span>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[var(--text)] leading-tight">
            Tired of Manual LinkedIn Outreach?
          </h2>
          <p className="text-lg md:text-xl text-[var(--subtle)] max-w-2xl mx-auto">
            Most founders and consultants struggle with these same problems
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: Target,
              title: 'No Strategic Guidance',
              description: 'You know LinkedIn works, but you don\'t know what to say or who to target.'
            },
            {
              icon: Zap,
              title: 'Agency Too Risky',
              description: 'Outbound agencies charge $2,000+/month. That\'s a big commitment.'
            },
            {
              icon: Rocket,
              title: 'Time-Consuming Research',
              description: 'Finding the right prospects and personalizing messages takes forever.'
            }
          ].map((pain, idx) => (
            <Card 
              key={idx} 
              className="bg-[var(--surface)] shadow-[var(--shadow-card)] border border-[var(--border)] hover:shadow-[var(--shadow-card-hover)] transition-all group relative overflow-hidden"
            >
              {/* Gradient accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#50ace4] to-[#6b9eff]"></div>
              
              <CardContent className="p-8 pt-10">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#50ace4] to-[#6b9eff] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <pain.icon className="w-7 h-7 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-[var(--text)] leading-tight">
                  {pain.title}
                </h3>
                <p className="text-[var(--subtle)] leading-relaxed">
                  {pain.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Solution/Outcomes Section */}
      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--text)]">
            Here's What You Get
          </h2>
          <p className="text-lg text-[var(--subtle)] max-w-2xl mx-auto">
            ICP-perfect prospects with ready-to-send messages using The Value Offer Strategy™
          </p>
        </div>

        {/* UVP Callouts */}
        <div className="mb-12">
          <div className="grid md:grid-cols-3 gap-6">
            {/* UVP 1: Personalized Messages */}
            <Card className="bg-[var(--surface)] shadow-[var(--shadow-card)] border border-[var(--border)] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#50ace4] to-[#6b9eff]"></div>
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#50ace4] to-[#6b9eff] flex items-center justify-center mx-auto mb-4">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-[var(--text)]">Deep Research Personalization</h3>
                <p className="text-sm text-[var(--subtle)]">
                  Each message is personalized based on company research, recent posts, and role-specific insights
                </p>
              </CardContent>
            </Card>

            {/* UVP 2: Value Offer Strategy */}
            <Card className="bg-[var(--surface)] shadow-[var(--shadow-card)] border border-[var(--border)] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#50ace4] to-[#6b9eff]"></div>
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#50ace4] to-[#6b9eff] flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-[var(--text)]">Value Offer Strategy™</h3>
                <p className="text-sm text-[var(--subtle)]">
                  Every message uses our proven strategy that books 3 calls per week for agency clients
                </p>
              </CardContent>
            </Card>

            {/* UVP 3: Ready to Execute */}
            <Card className="bg-[var(--surface)] shadow-[var(--shadow-card)] border border-[var(--border)] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#50ace4] to-[#6b9eff]"></div>
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#50ace4] to-[#6b9eff] flex items-center justify-center mx-auto mb-4">
                  <Rocket className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-[var(--text)]">Execute Immediately</h3>
                <p className="text-sm text-[var(--subtle)]">
                  Export to CSV or import directly into your sequencer. No setup, no learning curve
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Visual Lead List */}
        <Card className="bg-[var(--surface)] shadow-[var(--shadow-card)] border border-[var(--border)] mb-12" id="lead-list">
          <CardContent className="p-6">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 pb-4 border-b border-[var(--border)] mb-4">
              <div className="col-span-4">
                <span className="text-xs font-semibold text-[var(--subtle)] uppercase tracking-wide">PROSPECT</span>
              </div>
              <div className="col-span-3">
                <span className="text-xs font-semibold text-[var(--subtle)] uppercase tracking-wide">ICP MATCH</span>
              </div>
              <div className="col-span-5" id="message-column">
                <span className="text-xs font-semibold text-[var(--subtle)] uppercase tracking-wide">MESSAGE</span>
              </div>
            </div>

            {/* Lead Rows */}
            <div className="space-y-4">
              {[
                {
                  name: 'Emma Jenkins',
                  title: 'Product Lead',
                  initials: 'EJ',
                  icpMatch: 100,
                  message: 'Hey Emma, saw you\'re leading product at Acme Corp. One outreach play that could work well is a product-market fit audit offer. Helps executives benchmark their positioning and identify gaps. I\'ve got a few other outreach ideas like this that could help start the right discussions with your target prospects. Want me to send them over or hop on a short call?'
                },
                {
                  name: 'Matthew Johnson',
                  title: 'Senior Product Manager',
                  initials: 'MJ',
                  icpMatch: 99,
                  message: 'Hey Matthew, noticed you\'re owning monetization at TechScale. One outreach play that could work well is a conversion funnel audit offer. Helps product leaders identify revenue leaks and quick wins. I\'ve got a few other outreach ideas like this that could help start the right discussions with your target prospects. Want me to send them over?'
                },
                {
                  name: 'Sophia Williams',
                  title: 'Senior Product Manager',
                  initials: 'SW',
                  icpMatch: 98,
                  message: 'Sophia, you\'ve shipped several launches around user engagement. One outreach play that could work well is a retention audit offer. Helps product teams benchmark their retention metrics and identify improvement opportunities. I\'ve got a few other outreach ideas like this. Want me to send them over or hop on a short call?'
                },
                {
                  name: 'Daniel Lee',
                  title: 'Growth Product Manager',
                  initials: 'DL',
                  icpMatch: 97,
                  message: 'Daniel, based on your focus on activation and onboarding, one outreach play that could work well is an activation audit offer. Helps growth teams identify friction points and optimize their onboarding flow. I\'ve got a few other outreach ideas like this that could help start the right discussions. Want me to send them over?'
                },
                {
                  name: 'Olivia Chen',
                  title: 'Product Manager',
                  initials: 'OC',
                  icpMatch: 96,
                  message: 'Olivia, your work on user research stood out. One outreach play that could work well is a discovery process audit offer. Helps product managers benchmark their research methods and identify gaps in their user understanding. I\'ve got a few other outreach ideas like this. Want me to send them over or hop on a short call?'
                }
              ].map((lead, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-4 items-center py-3 hover:bg-[var(--muted)]/50 rounded-lg px-2 -mx-2 transition-premium">
                  {/* Prospect */}
                  <div className="col-span-4 flex items-center gap-3">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${lead.name}`}
                      alt={lead.name}
                      className="w-10 h-10 rounded-full flex-shrink-0 border-2 border-[var(--border)]"
                    />
                    <div>
                      <p className="text-sm font-semibold text-[var(--text)]">{lead.name}</p>
                      <p className="text-xs text-[var(--subtle)]">{lead.title}</p>
                    </div>
                  </div>
                  
                  {/* ICP Match */}
                  <div className="col-span-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all"
                          style={{ width: `${lead.icpMatch}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-[var(--text)] min-w-[35px]">{lead.icpMatch}%</span>
                    </div>
                  </div>
                  
                  {/* Message */}
                  <div className="col-span-5">
                    <p className="text-xs text-[var(--text)] line-clamp-2">{lead.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Export/Import Buttons */}
            <div className="mt-6 pt-6 border-t border-[var(--border)] flex justify-end gap-3" id="export-buttons">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
              <Button className="gap-2">
                <Upload className="w-4 h-4" />
                Import into Sequencer
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* How It Works - Visual Flow */}
      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--text)]">
            How It Works
          </h2>
          <p className="text-lg text-[var(--subtle)] max-w-2xl mx-auto">
            Super simple. No technical skills required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Step 1: URL Inputs */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#50ace4] to-[#6b9eff] flex items-center justify-center text-white font-bold text-lg">
                1
              </div>
              <h3 className="text-xl font-semibold text-[var(--text)]">Enter Your Info</h3>
            </div>
            <Card className="bg-[var(--surface)] shadow-[var(--shadow-card)] border border-[var(--border)] flex-1 flex flex-col">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="space-y-4 flex-1">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--text)] flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Website
                    </label>
                    <Input
                      type="url"
                      placeholder="https://youragency.com"
                      disabled
                      className="bg-[var(--muted)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--text)] flex items-center gap-2">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn Profile URL
                    </label>
                    <Input
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      disabled
                      className="bg-[var(--muted)]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Step 2: ICP Single Input */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#50ace4] to-[#6b9eff] flex items-center justify-center text-white font-bold text-lg">
                2
              </div>
              <h3 className="text-xl font-semibold text-[var(--text)]">Describe Your Ideal Client</h3>
            </div>
            <Card className="bg-[var(--surface)] shadow-[var(--shadow-card)] border border-[var(--border)] flex-1 flex flex-col">
              <CardContent className="p-6 flex-1 flex flex-col">
                <label className="block text-sm font-medium mb-2 text-[var(--text)]">
                  Just tell us who you want to reach (in plain English)
                </label>
                <textarea
                  disabled
                  className="w-full rounded-md px-4 py-4 text-[var(--text)] placeholder-[var(--subtle)] border border-[var(--border)] outline-none bg-[var(--muted)] min-h-[120px] flex-1 resize-none"
                  placeholder="e.g., Founders of B2B SaaS companies with 10-50 employees who are struggling with lead generation..."
                />
                <p className="text-xs text-[var(--subtle)] mt-2">
                  No complex filters. No technical jargon. Just describe your ideal client.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Step 3: Tinder-Style Swipe */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#50ace4] to-[#6b9eff] flex items-center justify-center text-white font-bold text-lg">
                3
              </div>
              <h3 className="text-xl font-semibold text-[var(--text)]">Refine Your ICP</h3>
            </div>
            <Card className="bg-[var(--surface)] shadow-[var(--shadow-card)] border border-[var(--border)] flex-1 flex flex-col">
              <CardContent className="p-6 flex-1 flex flex-col">
                <p className="text-sm text-[var(--subtle)] text-center mb-4">
                  Swipe through sample prospects to fine-tune your targeting
                </p>
                <div className="relative flex-1 min-h-[350px]">
                  {/* Card */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Card 1 (front) */}
                    <div className="absolute w-full bg-[var(--surface)] rounded-[var(--radius-card)] p-6 shadow-[var(--shadow-card)] border border-[var(--border)]" style={{ zIndex: 3 }}>
                      <div className="mb-4 text-center">
                        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#50ace4] to-[#6b9eff] mx-auto mb-3 flex items-center justify-center text-white text-xl font-bold">
                          JS
                        </div>
                        <h4 className="text-lg font-semibold text-[var(--text)] mb-1">John Smith</h4>
                        <p className="text-xs text-[var(--subtle)] mb-1">CEO & Co-Founder</p>
                        <p className="text-xs text-[var(--text-secondary)] font-medium">TechStart Inc.</p>
                      </div>
                      
                      <div className="space-y-2 mb-4 text-xs">
                        <div className="flex items-start gap-2">
                          <span className="text-[var(--subtle)] min-w-[70px]">Company:</span>
                          <div>
                            <p className="text-[var(--text)] font-medium">B2B SaaS Platform</p>
                            <p className="text-[var(--subtle)] text-xs">25 employees • Series A</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-[var(--subtle)] min-w-[70px]">Location:</span>
                          <p className="text-[var(--text)]">San Francisco, CA</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-[var(--subtle)] min-w-[70px]">Experience:</span>
                          <p className="text-[var(--text)]">12+ years • Ex-Google</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-center gap-6 mt-6">
                        <button className="w-12 h-12 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-premium border-2 border-red-300">
                          <X className="w-6 h-6 text-red-600" />
                        </button>
                        <button className="w-12 h-12 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center transition-premium border-2 border-green-300">
                          <Heart className="w-6 h-6 text-green-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-center text-[var(--subtle)] mt-3">
                  Swipe left to reject, right to accept.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Step 4: Leads Screen */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#50ace4] to-[#6b9eff] flex items-center justify-center text-white font-bold text-lg">
                4
              </div>
              <h3 className="text-xl font-semibold text-[var(--text)]">Get Your Leads & Execute</h3>
            </div>
            <Card className="bg-[var(--surface)] shadow-[var(--shadow-card)] border border-[var(--border)] flex-1 flex flex-col">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <h4 className="text-base font-semibold text-[var(--text)]">Your Qualified Leads</h4>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button variant="outline" className="gap-2 text-xs px-3 py-2 flex-1 sm:flex-none">
                      <Download className="w-3 h-3" />
                      Export CSV
                    </Button>
                    <Button className="gap-2 text-xs px-3 py-2 flex-1 sm:flex-none">
                      <Upload className="w-3 h-3" />
                      Import
                    </Button>
                  </div>
                </div>
                <div className="border border-[var(--border)] rounded-lg overflow-hidden flex-1 flex flex-col min-h-0">
                  <table className="w-full">
                    <thead className="bg-[var(--muted)]">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-[var(--text)]">Name</th>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-[var(--text)]">Title</th>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-[var(--text)]">Company</th>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-[var(--text)]">Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Sarah Johnson', title: 'CEO', company: 'GrowthCo', message: 'Ready' },
                        { name: 'Mike Chen', title: 'Founder', company: 'SaaSStart', message: 'Ready' },
                        { name: 'Emily Davis', title: 'VP Marketing', company: 'TechScale', message: 'Ready' }
                      ].map((lead, idx) => (
                        <tr key={idx} className="border-t border-[var(--border)] hover:bg-[var(--muted)]/50">
                          <td className="px-3 py-2 text-xs text-[var(--text)]">{lead.name}</td>
                          <td className="px-3 py-2 text-xs text-[var(--subtle)]">{lead.title}</td>
                          <td className="px-3 py-2 text-xs text-[var(--subtle)]">{lead.company}</td>
                          <td className="px-3 py-2 text-xs">
                            <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-medium">
                              {lead.message}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-[var(--subtle)] mt-3">
                  All leads come with personalized messages. Just export and start sending.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <Card className="bg-gradient-to-br from-[var(--surface)] to-[var(--muted)] border-2 border-[var(--color-accent)]/30 shadow-[var(--shadow-card)]">
          <CardContent className="p-8 text-center">
            <div className="mb-6 flex justify-center">
              <img 
                src="https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/sites/92156/images/XuqCY3QT8KHovoohoXvn_Referral_Program_Pros_-_LOGO_2.png" 
                alt="Referral Program Pros Logo" 
                className="h-16 object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[var(--text)]">
              Built by the Referral Program Pros Team
            </h3>
            <p className="text-[var(--subtle)] max-w-2xl mx-auto">
              We've put our years of LinkedIn outbound experience and learnings from hundreds of campaigns into this simple tool - GTM Bud.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--text)]">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-[var(--subtle)] max-w-2xl mx-auto">
            Pay for what you use. No monthly subscriptions, no hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Early Access */}
          <Card className="bg-[var(--surface)] shadow-[var(--shadow-card)] border-2 border-[var(--color-accent)] relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-[var(--color-accent)] text-white px-4 py-1 rounded-full text-sm font-semibold">
                Early Access
              </span>
            </div>
            <CardContent className="p-8 pt-12">
              <h3 className="text-2xl font-bold mb-2 text-[var(--text)]">Early Access</h3>
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-[var(--text)]">$100</span>
                  <span className="text-xl text-[var(--subtle)] line-through">$200</span>
                </div>
                <p className="text-sm text-[var(--subtle)]">One-time payment</p>
              </div>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
                  <span className="text-[var(--text)]">400 qualified leads</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
                  <span className="text-[var(--text)]">Personalized messages for each</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
                  <span className="text-[var(--text)]">Delivered within 24 hours</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
                  <span className="text-[var(--text)]">3 meetings guaranteed or refund</span>
                </li>
              </ul>
              <a
                href={tallyFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-semibold transition-premium bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] hover:shadow-[var(--shadow-button)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Early Access
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <p className="text-xs text-[var(--subtle)] mt-4 text-center">
                Limited to first 10 users
              </p>
            </CardContent>
          </Card>

          {/* Future Product */}
          <Card className="bg-[var(--surface)] shadow-[var(--shadow-card)] border border-[var(--border)]">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-2 text-[var(--text)]">Coming Soon</h3>
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-[var(--text)]">$0.50</span>
                  <span className="text-xl text-[var(--subtle)]">per lead</span>
                </div>
                <p className="text-sm text-[var(--subtle)]">Credit-based system</p>
              </div>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[var(--subtle)] flex-shrink-0 mt-0.5" />
                  <span className="text-[var(--text)]">Buy leads in batches</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[var(--subtle)] flex-shrink-0 mt-0.5" />
                  <span className="text-[var(--text)]">Instant delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[var(--subtle)] flex-shrink-0 mt-0.5" />
                  <span className="text-[var(--text)]">Self-service platform</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[var(--subtle)] flex-shrink-0 mt-0.5" />
                  <span className="text-[var(--text)]">Use credits anytime</span>
                </li>
              </ul>
              <div className="w-full text-center inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-semibold bg-[var(--muted)] text-[var(--subtle)] border border-[var(--border)] cursor-not-allowed">
                Coming Soon
              </div>
              <p className="text-xs text-[var(--subtle)] mt-4 text-center">
                Full product launching Q1 2026
              </p>
            </CardContent>
          </Card>
        </div>
      </section>


      {/* Final CTA */}
      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--text)]">
            Ready to Book More Sales Calls?
          </h2>
          <p className="text-lg text-[var(--subtle)] mb-8 max-w-2xl mx-auto">
            Get early access to GTM Bud and receive 400 qualified leads with personalized messages. 
            Full self-service platform coming soon.
          </p>
          <a
            href={tallyFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md px-8 py-4 text-lg font-semibold transition-premium bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] hover:shadow-[var(--shadow-button)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Early Access
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </section>
    </div>
  )
}

