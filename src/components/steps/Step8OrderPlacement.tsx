import { useState } from 'react'
import { useCampaign } from '@/contexts/CampaignContext'
import { Clock, Zap, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface Step8OrderPlacementProps {
  onNext: () => void
  onBack: () => void
}

export function Step8OrderPlacement({ onNext, onBack }: Step8OrderPlacementProps) {
  const { state, updateState } = useCampaign()
  const [email, setEmail] = useState(state.email || '')
  const [quantity, setQuantity] = useState(state.quantity)
  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'rush'>(state.deliverySpeed)

  const basePricePerLead = 0.5
  const rushFee = 15

  const calculatePrice = () => {
    const basePrice = quantity * basePricePerLead
    const rushPrice = deliverySpeed === 'rush' ? rushFee : 0
    return basePrice + rushPrice
  }

  const handleNext = () => {
    updateState({ email, quantity, deliverySpeed })
    onNext()
  }

  const isValidEmail = email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

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
                    ? 'border-[var(--color-accent)] shadow-[var(--shadow-button)] bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent'
                    : 'border-[var(--border-subtle)] hover:border-[var(--border)] hover:shadow-[var(--shadow-card)]'
                )}
              >
                <div className="text-2xl font-bold text-[var(--text)] mb-1">{qty}</div>
                <div className={cn(
                  'text-xs font-medium',
                  quantity === qty ? 'text-[var(--color-accent)]' : 'text-[var(--subtle)]'
                )}>
                  ${(qty * basePricePerLead).toFixed(2)}
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
                  ? 'border-[var(--color-accent)] shadow-[var(--shadow-button)] bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent'
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
                  ? 'border-[var(--color-accent)] shadow-[var(--shadow-button)] bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent'
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
            <span className="font-semibold">${(quantity * basePricePerLead).toFixed(2)}</span>
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

