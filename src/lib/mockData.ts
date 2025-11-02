export interface Strategy {
  id: string
  title: string
  description: string
  icon: string
}

export interface ICPAttribute {
  id: string
  label: string
  value: string
  type: 'qualitative' | 'quantitative'
  required: boolean
}

export interface Message {
  id: string
  tone: 'casual' | 'professional' | 'value-first'
  content: string
}

export interface SampleLead {
  id: string
  name: string
  title: string
  company: string
  industry: string
  companySize: string
  location: string
  hasOpenInMail: boolean
  message: string
}

export const mockStrategies: Strategy[] = [
  {
    id: '1',
    title: 'AI Product Potential Scan',
    description: 'A simple 1-page report that scores their agency\'s AI product potential based on their current services and client pain points. Helps them see if their unique knowledge can be turned into a valuable AI product.',
    icon: '📊',
  },
  {
    id: '2',
    title: 'Recurring Revenue Roadmap',
    description: 'A customizable 1-page roadmap template that outlines key steps to shift towards a recurring revenue model. Shows a clear path to escaping the \'find, do, replace\' work cycle.',
    icon: '🗺️',
  },
  {
    id: '3',
    title: 'Agency Valuation Booster',
    description: 'A simple calculator (spreadsheet or web-based) that shows the potential increase in agency valuation by integrating a SaaS component. Taps into desire for stronger exit strategy.',
    icon: '📈',
  },
]

export const mockICPAttributes: ICPAttribute[] = [
  { id: 'job-title', label: 'Job Title', value: 'Agency Owner, Founder, CEO', type: 'quantitative', required: true },
  { id: 'company-size', label: 'Company Size', value: '5-50 employees', type: 'quantitative', required: true },
  { id: 'industry', label: 'Industry', value: 'Marketing Agency, Creative Agency, Consulting', type: 'quantitative', required: true },
  { id: 'revenue', label: 'Revenue', value: '$500K-$5M annual revenue', type: 'quantitative', required: true },
  { id: 'qualitative-1', label: 'Looking to scale', value: 'Actively expanding or planning to expand', type: 'qualitative', required: false },
  { id: 'qualitative-2', label: 'Interested in productization', value: 'Considering turning services into products', type: 'qualitative', required: false },
  { id: 'qualitative-3', label: 'Has established client base', value: 'Stable recurring clients', type: 'qualitative', required: false },
]

// Plain-English criteria suggestions for autocomplete
export const criteriaSuggestions = [
  'currently founder of an agency established before november 2020',
  'agency annual revenue is between $500,000 and $10,000,000',
  'founder is at least 35 years old',
  'agency or founder is based in north america, europe, or oceania',
  'agency has more than 10 employees',
  'founder has at least 5 years of experience in their industry',
  'agency specializes in marketing, creative, or consulting services',
  'founder is actively seeking to scale their business',
  'agency has recurring revenue from long-term clients',
  'founder is interested in productizing their services',
  'agency has been operating for at least 3 years',
  'founder has previous experience with SaaS products',
]

export function getCriteriaSuggestions(urls: string[]): string[] {
  // In a real implementation, this would analyze URLs and return relevant suggestions
  // For now, return a mix of suggestions based on URL count
  if (urls.length === 0) return criteriaSuggestions
  
  // Return suggestions that might match common patterns
  return criteriaSuggestions.slice(0, Math.min(urls.length * 2 + 3, criteriaSuggestions.length))
}

export const mockMessages: Record<string, Message[]> = {
  casual: [
    {
      id: '1',
      tone: 'casual',
      content: 'Hey Sarah,\n\nNoticed you\'ve built BrandMakers into something impressive in Austin. I put together a quick AI Product Potential Scan for your agency that shows exactly where your SEO expertise could turn into a recurring revenue stream.\n\nWant me to send it over?',
    },
    {
      id: '2',
      tone: 'casual',
      content: 'Hey Mark,\n\nReally cool work Flow Dynamics is doing with enterprise automation. I created a simple Agency Valuation Calculator that shows how adding one AI tool to your stack could boost your exit value by 3-5x.\n\nInterested?',
    },
  ],
  professional: [
    {
      id: '3',
      tone: 'professional',
      content: 'Hi Sarah,\n\nI came across BrandMakers and was impressed by your portfolio of SEO wins for mid-market clients.\n\nI\'ve prepared an AI Product Potential Scan specifically for agencies like yours. It evaluates your service mix against AI product opportunities.\n\nWould you like me to send it over?',
    },
    {
      id: '4',
      tone: 'professional',
      content: 'Hi Mark,\n\nYour work building Flow Dynamics\' automation platform caught my attention.\n\nI\'ve developed a valuation calculator that models the impact of productization on agency multiples. It might be useful for your growth planning.\n\nHappy to share if you\'re interested.',
    },
  ],
  'value-first': [
    {
      id: '5',
      tone: 'value-first',
      content: 'Sarah,\n\nBrandMakers\' SEO expertise is prime for productization. I mapped 3 AI tool opportunities from your current service mix—here\'s the scan:\n\n[Report Preview]\n\nShould I send the full analysis?',
    },
    {
      id: '6',
      tone: 'value-first',
      content: 'Mark,\n\nOne SaaS addition could 5x Flow Dynamics\' valuation. Calculated it here:\n\n[Calculator Preview]\n\nWant the model?',
    },
  ],
}

export const mockSampleLeads: SampleLead[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    title: 'Founder & CEO',
    company: 'BrandMakers Agency',
    industry: 'Marketing Agency',
    companySize: '15 employees',
    location: 'Austin, TX',
    hasOpenInMail: true,
    message: 'Hey Sarah,\n\nNoticed you\'ve built BrandMakers into something impressive in Austin. I put together a quick AI Product Potential Scan for your agency that shows exactly where your SEO expertise could turn into a recurring revenue stream.\n\nWant me to send it over?',
  },
  {
    id: '2',
    name: 'Mark Rodriguez',
    title: 'Agency Owner',
    company: 'Flow Dynamics',
    industry: 'Consulting',
    companySize: '28 employees',
    location: 'San Francisco, CA',
    hasOpenInMail: true,
    message: 'Hey Mark,\n\nReally cool work Flow Dynamics is doing with enterprise automation. I created a simple Agency Valuation Calculator that shows how adding one AI tool to your stack could boost your exit value by 3-5x.\n\nInterested?',
  },
  {
    id: '3',
    name: 'Emily Park',
    title: 'Managing Director',
    company: 'Creative Collective',
    industry: 'Creative Agency',
    companySize: '42 employees',
    location: 'New York, NY',
    hasOpenInMail: false,
    message: 'Hi Emily,\n\nCreative Collective\'s design portfolio is impressive. I mapped your service mix and identified 3 AI product opportunities that align with your brand identity work.\n\nWant to see the analysis?',
  },
  {
    id: '4',
    name: 'David Kim',
    title: 'Founder',
    company: 'Growth Hive',
    industry: 'Marketing Agency',
    companySize: '12 employees',
    location: 'Seattle, WA',
    hasOpenInMail: true,
    message: 'David,\n\nYour performance marketing wins could become recurring products. Here\'s the scan:\n\n[Report Preview]\n\nShould I send the full analysis?',
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    title: 'CEO',
    company: 'Strategy Hub',
    industry: 'Consulting',
    companySize: '35 employees',
    location: 'Chicago, IL',
    hasOpenInMail: true,
    message: 'Hi Lisa,\n\nStrategy Hub\'s framework library is perfect for productization. I built a recurring revenue roadmap showing how to package your methodologies into a SaaS offering.\n\nInterested in seeing it?',
  },
  {
    id: '6',
    name: 'James Wilson',
    title: 'Agency Owner',
    company: 'Digital Frontier',
    industry: 'Marketing Agency',
    companySize: '9 employees',
    location: 'Denver, CO',
    hasOpenInMail: false,
    message: 'James,\n\nOne product addition could 5x Digital Frontier\'s valuation. Calculated the impact here:\n\n[Calculator Preview]\n\nWant the model?',
  },
]

