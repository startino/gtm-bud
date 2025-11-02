import { useState } from 'react'
import { useCampaign } from '@/contexts/CampaignContext'
import { Clock, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface Step8OrderPlacementProps {
  onNext: () => void
  onBack: () => void
}

export function Step8OrderPlacement({ onNext, onBack }: Step8OrderPlacementProps) {
  const { state, updateState } = useCampaign()
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
    updateState({ quantity, deliverySpeed })
    onNext()
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-1 text-[var(--text)]">Complete your order</h2>
      <p className="text-[var(--subtle)] mb-6">Choose your lead quantity and delivery speed</p>

      <div className="space-y-6 mb-8">
        {/* Quantity Selection */}
        <div>
          <label className="block text-sm font-medium mb-3">Number of leads</label>
          <div className="grid grid-cols-3 gap-3">
            {[100, 250, 500].map((qty) => (
              <button
                key={qty}
                onClick={() => setQuantity(qty)}
                className={cn(
                  'p-4 rounded-[var(--radius-card)] transition-all bg-[var(--surface)] border-0',
                  quantity === qty
                    ? 'shadow-[var(--shadow-card)]'
                    : ''
                )}
              >
                <div className="text-2xl font-bold">{qty}</div>
                <div className="text-xs text-[var(--subtle)]">${(qty * basePricePerLead).toFixed(2)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Delivery Speed */}
        <div>
          <label className="block text-sm font-medium mb-3">Delivery speed</label>
          <div className="space-y-3">
            <button
              onClick={() => setDeliverySpeed('standard')}
              className={cn(
                'w-full p-4 rounded-[var(--radius-card)] transition-all flex items-center justify-between bg-[var(--surface)] border-0',
                deliverySpeed === 'standard'
                  ? 'shadow-[var(--shadow-card)]'
                  : ''
              )}
            >
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[var(--color-accent)]" />
                <div className="text-left">
                  <div className="font-semibold">Standard (24 hours)</div>
                  <div className="text-sm text-[var(--subtle)]">Included</div>
                </div>
              </div>
              <div className="text-lg font-bold">$0</div>
            </button>

            <button
              onClick={() => setDeliverySpeed('rush')}
              className={cn(
                'w-full p-4 rounded-[var(--radius-card)] transition-all flex items-center justify-between bg-[var(--surface)] border-0',
                deliverySpeed === 'rush'
                  ? 'shadow-[var(--shadow-card)]'
                  : ''
              )}
            >
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-[var(--color-accent)]" />
                <div className="text-left">
                  <div className="font-semibold">Rush (2 hours)</div>
                  <div className="text-sm text-[var(--subtle)]">Get your leads fast</div>
                </div>
              </div>
              <div className="text-lg font-bold">+${rushFee}</div>
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
        <Button onClick={handleNext} className="flex-1">Confirm Order</Button>
      </div>
    </Card>
  )
}

