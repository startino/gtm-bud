# GTM Bud Demo

A hyper-modern, premium clickable prototype for GTM Bud - an AI-driven outreach generator. This demo showcases the complete user flow from profile input to order placement and qualification.

## 🎨 Features

- **9-Step Workflow**: Complete onboarding flow with AI-generated strategies and messages
- **Dark/Light Mode**: Toggle between premium dark and light themes
- **Modern Design**: Hyper-modern UI with brand colors (#210aae, #50ace4)
- **Responsive**: Works seamlessly on desktop and tablet
- **Interactive**: Smooth animations and loading states
- **Mock AI**: Realistic templated responses for demonstration

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

Build output will be in the `dist/` directory.

## 📦 Deployment

This project is configured for GitHub Pages deployment:

1. Push to the `alpha` or `main` branch
2. GitHub Actions will automatically build and deploy
3. The app will be available at `https://<username>.github.io/gtm-bud/`

## 🏗️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS v3** - Styling
- **Lucide React** - Icons
- **Context API** - State management

## 📋 User Flow

1. **Profile Input** - User enters LinkedIn profile and website
2. **Strategy Selection** - AI generates 3 outreach strategies
3. **Sample Profile** - User provides sample prospect profile
4. **ICP Refinement** - Extract and refine ideal customer attributes
5. **Message Generation** - AI crafts personalized messages
6. **Message Selection** - User chooses preferred tone
7. **Sample Leads** - Preview sample leads with messages
8. **Order Placement** - Select quantity and delivery speed
9. **Qualification** - Tally-style form for upselling

## 🎯 Design System

### Colors
- **Primary**: #210aae (Dark navy)
- **Accent**: #50ace4 (Sky blue)
- **Background**: Layered shades of primary
- **Text**: High contrast for accessibility

### Typography
- System fonts for optimal performance
- Clear hierarchy with bold headings
- Readable sizes and line heights

## 📝 License

Private project for demonstration purposes.
