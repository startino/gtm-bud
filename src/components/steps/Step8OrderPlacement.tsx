import { useState } from 'react'
import { useCampaign } from '@/contexts/CampaignContext'
import { useAuth } from '@/contexts/AuthContext'
import { Clock, Zap, Mail, Send, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Spinner } from '@/components/ui/Spinner'

interface Step8OrderPlacementProps {
  onNext: () => void
  onBack: () => void
}

export function Step8OrderPlacement({ onNext, onBack }: Step8OrderPlacementProps) {
  const { state, updateState } = useCampaign()
  const { isAuthenticated, signIn } = useAuth()
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [email, setEmail] = useState(state.email || '')
  const [quantity, setQuantity] = useState(state.quantity)
  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'rush'>(state.deliverySpeed)
  const [outboundStrategy, setOutboundStrategy] = useState<'inmail' | 'connections'>(state.outboundStrategy)

  const connectionsPricePerLead = 0.5
  const inmailPricePerLead = 0.75
  const rushFee = 15
  
  const getPricePerLead = () => {
    return outboundStrategy === 'inmail' ? inmailPricePerLead : connectionsPricePerLead
  }

  const calculatePrice = () => {
    const pricePerLead = getPricePerLead()
    const basePrice = quantity * pricePerLead
    const rushPrice = deliverySpeed === 'rush' ? rushFee : 0
    return basePrice + rushPrice
  }

  const handleNext = () => {
    updateState({ email, quantity, deliverySpeed, outboundStrategy })
    onNext()
  }

  const isValidEmail = email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

  const handleSignIn = async () => {
    setIsSigningIn(true)
    try {
      await signIn()
    } catch (error) {
      console.error('Sign in failed:', error)
    } finally {
      setIsSigningIn(false)
    }
  }

  // Show sign-in UI if not authenticated
  if (!isAuthenticated) {
    return (
      <Card className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-2 text-[var(--text)] tracking-tight">Complete your order</h2>
        <p className="text-[var(--subtle)] mb-6 font-medium">
          Create an account to export your full lead list and receive delivery updates.
        </p>

        <div className="space-y-6">
          <div className="p-6 rounded-[var(--radius-card)] bg-[var(--muted)]">
            <p className="text-sm text-[var(--text)] mb-4">
              You need to create an account to proceed with your order. Signing in will allow you to:
            </p>
            <ul className="space-y-2 text-sm text-[var(--subtle)] mb-6">
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-accent)] mt-1">•</span>
                <span>Export your full lead list</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-accent)] mt-1">•</span>
                <span>Receive delivery notifications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-accent)] mt-1">•</span>
                <span>Access your campaign history</span>
              </li>
            </ul>

            <div className="space-y-3">
              {/* Google Sign In */}
              <Button
                onClick={handleSignIn}
                disabled={isSigningIn}
                className="w-full text-base py-3 flex items-center justify-center gap-3"
              >
                {isSigningIn ? (
                  <>
                    <Spinner size="sm" className="text-white" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </>
                )}
              </Button>

              {/* LinkedIn Sign In */}
              <Button
                onClick={handleSignIn}
                disabled={isSigningIn}
                className="w-full text-base py-3 flex items-center justify-center gap-3"
              >
                {isSigningIn ? (
                  <>
                    <Spinner size="sm" className="text-white" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    Continue with LinkedIn
                  </>
                )}
              </Button>

              {/* Facebook Sign In */}
              <Button
                onClick={handleSignIn}
                disabled={isSigningIn}
                className="w-full text-base py-3 flex items-center justify-center gap-3"
              >
                {isSigningIn ? (
                  <>
                    <Spinner size="sm" className="text-white" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Continue with Facebook
                  </>
                )}
              </Button>
            </div>

            <p className="text-xs text-[var(--subtle)] mt-4 text-center">
              By continuing, you agree to our terms of service and privacy policy
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <Button variant="secondary" onClick={onBack} className="flex-1">Back</Button>
        </div>
      </Card>
    )
  }

  // Show order form if authenticated
  return (
    <Card className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2 text-[var(--text)] tracking-tight">Complete your order</h2>
      <p className="text-[var(--subtle)] mb-8 font-medium">Choose your lead quantity and delivery speed</p>

      <div className="space-y-8 mb-8">
        {/* Email Input */}
        <div>
          <label className="block text-sm font-semibold mb-3 flex items-center gap-2 text-[var(--text)]">
            <Mail className="w-4 h-4 text-[var(--color-accent)]" />
            Email Address
          </label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className={cn(
              isValidEmail && email
                ? 'border-[var(--color-accent)]'
                : ''
            )}
          />
          <p className="text-xs text-[var(--subtle)] mt-2">We'll send your leads to this email address</p>
        </div>

        {/* Outbound Strategy */}
        <div>
          <label className="block text-sm font-semibold mb-4 text-[var(--text)]">Outbound Strategy</label>
          <p className="text-xs text-[var(--subtle)] mb-4">Choose your outreach method</p>
          <div className="space-y-3">
            <button
              onClick={() => setOutboundStrategy('connections')}
              className={cn(
                'w-full p-5 rounded-[var(--radius-card)] transition-premium flex items-center justify-between bg-[var(--surface)] border-2',
                outboundStrategy === 'connections'
                  ? 'border-[var(--color-accent)] shadow-[var(--shadow-button)] bg-[var(--color-accent-light)]'
                  : 'border-[var(--border-subtle)] hover:border-[var(--border)] hover:shadow-[var(--shadow-card)]'
              )}
            >
              <div className="flex items-center gap-3">
                <Users className={cn(
                  'w-5 h-5 transition-premium',
                  outboundStrategy === 'connections' ? 'text-[var(--color-accent)]' : 'text-[var(--subtle)]'
                )} />
                <div className="text-left">
                  <div className={cn(
                    'font-semibold mb-1',
                    outboundStrategy === 'connections' ? 'text-[var(--color-accent)]' : 'text-[var(--text)]'
                  )}>
                    Connections (400 or less messages/month)
                  </div>
                  <div className="text-sm text-[var(--subtle)]">General target leads</div>
                </div>
              </div>
              <div className={cn(
                'text-lg font-bold',
                outboundStrategy === 'connections' ? 'text-[var(--color-accent)]' : 'text-[var(--text)]'
              )}>
                ${connectionsPricePerLead.toFixed(2)}
              </div>
            </button>

            <button
              onClick={() => setOutboundStrategy('inmail')}
              className={cn(
                'w-full p-5 rounded-[var(--radius-card)] transition-premium flex items-center justify-between bg-[var(--surface)] border-2',
                outboundStrategy === 'inmail'
                  ? 'border-[var(--color-accent)] shadow-[var(--shadow-button)] bg-[var(--color-accent-light)]'
                  : 'border-[var(--border-subtle)] hover:border-[var(--border)] hover:shadow-[var(--shadow-card)]'
              )}
            >
              <div className="flex items-center gap-3">
                <Send className={cn(
                  'w-5 h-5 transition-premium',
                  outboundStrategy === 'inmail' ? 'text-[var(--color-accent)]' : 'text-[var(--subtle)]'
                )} />
                <div className="text-left">
                  <div className={cn(
                    'font-semibold mb-1',
                    outboundStrategy === 'inmail' ? 'text-[var(--color-accent)]' : 'text-[var(--text)]'
                  )}>
                    InMail (High volume)
                  </div>
                  <div className="text-sm text-[var(--subtle)]">Open profile leads - 5x your volume</div>
                </div>
              </div>
              <div className={cn(
                'text-lg font-bold',
                outboundStrategy === 'inmail' ? 'text-[var(--color-accent)]' : 'text-[var(--text)]'
              )}>
                ${inmailPricePerLead.toFixed(2)}
              </div>
            </button>
          </div>
        </div>

        {/* Quantity Selection */}
        <div>
          <label className="block text-sm font-semibold mb-4 text-[var(--text)]">Select number of leads</label>
          <div className="grid grid-cols-3 gap-3">
            {[100, 250, 500].map((qty) => (
              <button
                key={qty}
                onClick={() => setQuantity(qty)}
                className={cn(
                  'p-5 rounded-[var(--radius-card)] transition-premium bg-[var(--surface)] border-2 text-left',
                  quantity === qty
                    ? 'border-[var(--color-accent)] shadow-[var(--shadow-button)] bg-[var(--color-accent-light)]'
                    : 'border-[var(--border-subtle)] hover:border-[var(--border)] hover:shadow-[var(--shadow-card)]'
                )}
              >
                <div className="text-2xl font-bold text-[var(--text)] mb-1">{qty}</div>
                <div className={cn(
                  'text-xs font-medium',
                  quantity === qty ? 'text-[var(--color-accent)]' : 'text-[var(--subtle)]'
                )}>
                  ${(qty * getPricePerLead()).toFixed(2)}
                </div>
                {quantity === qty && (
                  <div className="mt-2 text-xs font-semibold text-[var(--color-accent)]">Selected</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Delivery Speed */}
        <div>
          <label className="block text-sm font-semibold mb-4 text-[var(--text)]">Choose delivery speed</label>
          <p className="text-xs text-[var(--subtle)] mb-4">Select one option</p>
          <div className="space-y-3">
            <button
              onClick={() => setDeliverySpeed('standard')}
              className={cn(
                'w-full p-5 rounded-[var(--radius-card)] transition-premium flex items-center justify-between bg-[var(--surface)] border-2',
                deliverySpeed === 'standard'
                  ? 'border-[var(--color-accent)] shadow-[var(--shadow-button)] bg-[var(--color-accent-light)]'
                  : 'border-[var(--border-subtle)] hover:border-[var(--border)] hover:shadow-[var(--shadow-card)]'
              )}
            >
              <div className="flex items-center gap-3">
                <Clock className={cn(
                  'w-5 h-5 transition-premium',
                  deliverySpeed === 'standard' ? 'text-[var(--color-accent)]' : 'text-[var(--subtle)]'
                )} />
                <div className="text-left">
                  <div className={cn(
                    'font-semibold mb-1',
                    deliverySpeed === 'standard' ? 'text-[var(--color-accent)]' : 'text-[var(--text)]'
                  )}>
                    Standard (24 hours)
                  </div>
                  <div className="text-sm text-[var(--subtle)]">Included in base price</div>
                </div>
              </div>
              <div className={cn(
                'text-lg font-bold',
                deliverySpeed === 'standard' ? 'text-[var(--color-accent)]' : 'text-[var(--text)]'
              )}>
                $0
              </div>
            </button>

            <button
              onClick={() => setDeliverySpeed('rush')}
              className={cn(
                'w-full p-5 rounded-[var(--radius-card)] transition-premium flex items-center justify-between bg-[var(--surface)] border-2',
                deliverySpeed === 'rush'
                  ? 'border-[var(--color-accent)] shadow-[var(--shadow-button)] bg-[var(--color-accent-light)]'
                  : 'border-[var(--border-subtle)] hover:border-[var(--border)] hover:shadow-[var(--shadow-card)]'
              )}
            >
              <div className="flex items-center gap-3">
                <Zap className={cn(
                  'w-5 h-5 transition-premium',
                  deliverySpeed === 'rush' ? 'text-[var(--color-accent)]' : 'text-[var(--subtle)]'
                )} />
                <div className="text-left">
                  <div className={cn(
                    'font-semibold mb-1',
                    deliverySpeed === 'rush' ? 'text-[var(--color-accent)]' : 'text-[var(--text)]'
                  )}>
                    Rush (2 hours)
                  </div>
                  <div className="text-sm text-[var(--subtle)]">Get your leads fast</div>
                </div>
              </div>
              <div className={cn(
                'text-lg font-bold',
                deliverySpeed === 'rush' ? 'text-[var(--color-accent)]' : 'text-[var(--text)]'
              )}>
                +${rushFee}
              </div>
            </button>
          </div>
        </div>

        {/* Price Summary */}
        <div className="p-6 rounded-[var(--radius-card)] bg-[var(--muted)] border-0">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[var(--subtle)]">Subtotal</span>
            <span className="font-semibold">${(quantity * getPricePerLead()).toFixed(2)}</span>
          </div>
          {deliverySpeed === 'rush' && (
            <div className="flex justify-between items-center mb-4">
              <span className="text-[var(--subtle)]">Rush delivery</span>
              <span className="font-semibold">+${rushFee.toFixed(2)}</span>
            </div>
          )}
          <div className="pt-4 flex justify-between items-center">
            <span className="text-lg font-bold">Total</span>
            <span className="text-2xl font-bold text-[var(--color-accent)]">${calculatePrice().toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="secondary" onClick={onBack} className="flex-1">Back</Button>
        <Button onClick={handleNext} disabled={!isValidEmail} className="flex-1">Confirm Order</Button>
      </div>
    </Card>
  )
}

